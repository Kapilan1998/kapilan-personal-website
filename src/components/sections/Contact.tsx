import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect, lazy, Suspense } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

// Lazy load the popup component since it's only shown conditionally
const ContactPopup = lazy(() => import('./ContactPopup'));

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const popupTimeoutRef = useRef<NodeJS.Timeout>();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupMessage, setPopupMessage] = useState('');

  // Environment variable
  const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB_ACCESS_TOKEN;

  // Validation function
  const validateField = useCallback((field: string, value: string) => {
    if (field === 'name') {
      if (!value.trim()) return 'Name is required.';
      if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name should contain only letters and spaces.';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
    }
    if (field === 'message') {
      if (!value.trim()) return 'Message cannot be empty.';
      if (value.length > 500) return 'Message cannot exceed 500 characters.';
    }
    return '';
  }, []);

  // Form validation helper
  const validateForm = useCallback(() => {
    return {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
  }, [formData, validateField]);

  // Event handlers
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ 
      ...prev, 
      [field]: validateField(field, formData[field as keyof typeof formData]) 
    }));
  }, [formData, validateField]);

  const handleChange = useCallback((field: string, value: string) => {
    if (field === 'message' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }, [touched, validateField]);

  const handleSubmit = useCallback(async (formDataToSubmit: { name: string; email: string; message: string }) => {
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate all fields
    const newErrors = validateForm();
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some((err) => err)) {
      setPopupType('error');
      setPopupMessage('Please fix the errors in the form before submitting.');
      setShowPopup(true);
      
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      popupTimeoutRef.current = setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData 
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
      formDataToSend.append('name', formDataToSubmit.name);
      formDataToSend.append('email', formDataToSubmit.email);
      formDataToSend.append('message', formDataToSubmit.message);
      formDataToSend.append('subject', `New Contact Form Message from ${formDataToSubmit.name}`);
      formDataToSend.append('from_name', 'Portfolio Contact Form');

      // Send data to Web3Forms as FormData
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        // Successful submission
        setPopupType('success');
        setPopupMessage("Thank you for your message! I'll get back to you as soon as possible. 😊");
        
        // Reset form fields after successful submission
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
      } else {
        // Error from Web3Forms
        setPopupType('error');
        
        // Handle different error cases
        if (result.message?.toLowerCase().includes('access_key')) {
          setPopupMessage('Form configuration error. Please contact the website administrator.');
        } else if (result.message?.toLowerCase().includes('rate limit')) {
          setPopupMessage('Too many submission attempts. Please try again in a few minutes.');
        } else if (result.message?.toLowerCase().includes('quota')) {
          setPopupMessage('Form submission quota exceeded. Please try again tomorrow.');
        } else if (result.message?.toLowerCase().includes('spam')) {
          setPopupMessage('Submission flagged as spam. Please ensure your message is valid.');
        } else {
          setPopupMessage(result.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      // Network or other errors
      console.error('Form submission error:', error);
      setPopupType('error');
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setPopupMessage('Network error. Please check your internet connection and try again.');
      } else {
        setPopupMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      // Show popup
      setShowPopup(true);
      setIsSubmitting(false);
      
      // Automatically hide popup after 5 seconds
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [validateForm, WEB3FORMS_ACCESS_KEY]);

  // Cleanup effect for timeouts
  useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-primary mb-3 sm:mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <ContactForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formData={formData}
            onFormDataChange={handleChange}
            touched={touched}
            onBlur={handleBlur}
            errors={errors}
          />

          {/* Contact Info */}
          <ContactInfo isInView={isInView} />
        </div>
      </div>

      {/* Lazy loaded popup */}
      <Suspense fallback={null}>
        <ContactPopup
          showPopup={showPopup}
          popupType={popupType}
          popupMessage={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      </Suspense>
    </section>
  );
};

export default Contact;