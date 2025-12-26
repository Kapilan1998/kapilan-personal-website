import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo, useCallback, useEffect, lazy, Suspense } from 'react';
import { Mail, MapPin, Send, Phone, ExternalLink, X } from 'lucide-react';

// Lazy load hCaptcha
const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'));

// Memoized social links data
const socialLinksData = [
  {
    name: 'GitHub',
    href: 'https://github.com/Kapilan1998',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sriranjan-kapilan-4772351bb/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@sriranjankapilan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/14QGhBDBFFF/?mibextid=wwXIfr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const popupTimeoutRef = useRef<NodeJS.Timeout>();
  const hcaptchaRef = useRef<any>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupMessage, setPopupMessage] = useState('');

  // Environment variables
  const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB_ACCESS_TOKEN;
  const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

  // Memoized static data
  const contactInfo = useMemo(() => [
    { icon: Mail, label: 'Email', value: 'sriranjankapilan@gmail.com', href: 'mailto:sriranjankapilan@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 774740186', href: 'tel:+94774740186' },
    { icon: MapPin, label: 'Location', value: 'Jaffna, Sri Lanka', href: null },
  ], []);

  const socialLinks = useMemo(() => socialLinksData, []);

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

  const handleHcaptchaVerify = useCallback((token: string) => {
    setHcaptchaToken(token);
  }, []);

  const handleHcaptchaExpire = useCallback(() => {
    setHcaptchaToken(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check hCaptcha
    if (!hcaptchaToken) {
      setPopupType('error');
      setPopupMessage('Please complete the security verification.');
      setShowPopup(true);
      
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      popupTimeoutRef.current = setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    
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
      // Prepare data for Web3Forms
      const formPayload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `New Contact Form Message from ${formData.name}`,
        from_name: 'Portfolio Contact Form',
        botcheck: '',
        'h-captcha-response': hcaptchaToken,
      };

      // Send data to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const result = await response.json();

      if (result.success) {
        // Successful submission
        setPopupType('success');
        setPopupMessage('Thank you for your message! I will get back to you soon.');
        
        // Reset form fields after successful submission
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
        setHcaptchaToken(null);
        
        // Reset hCaptcha
        if (hcaptchaRef.current) {
          hcaptchaRef.current.resetCaptcha();
        }
      } else {
        // Error from Web3Forms
        setPopupType('error');
        
        // Handle different error cases
        if (result.message?.includes('access_key')) {
          setPopupMessage('Form configuration error. Please contact the website administrator.');
        } else if (result.message?.includes('rate limit')) {
          setPopupMessage('Too many submission attempts. Please try again in a few minutes.');
        } else if (result.message?.includes('quota')) {
          setPopupMessage('Form submission quota exceeded. Please try again tomorrow.');
        } else if (result.message?.includes('spam')) {
          setPopupMessage('Submission flagged as spam. Please ensure your message is valid.');
        } else if (result.message?.includes('captcha') || result.message?.includes('hCaptcha')) {
          setPopupMessage('Security verification failed. Please complete the hCaptcha again.');
        } else {
          setPopupMessage(result.message || 'Failed to send message. Please try again.');
        }
        
        // Reset hCaptcha on error
        setHcaptchaToken(null);
        if (hcaptchaRef.current) {
          hcaptchaRef.current.resetCaptcha();
        }
      }
    } catch (error) {
      // Network or other error
      console.error('Form submission error:', error);
      setPopupType('error');
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setPopupMessage('Network error. Please check your internet connection and try again.');
      } else {
        setPopupMessage('An unexpected error occurred. Please try again later.');
      }
      
      // Reset hCaptcha on error
      setHcaptchaToken(null);
      if (hcaptchaRef.current) {
        hcaptchaRef.current.resetCaptcha();
      }
    } finally {
      // Show popup
      setShowPopup(true);
      setIsSubmitting(false);
      
      // Auto-hide popup after 5 seconds
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [formData, hcaptchaToken, validateForm, WEB3FORMS_ACCESS_KEY]);

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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-2xl space-y-5 md:space-y-6">
              {/* Hidden input for Web3Forms bot protection */}
              <input type="hidden" name="botcheck" value="" />
              
              {['name', 'email', 'message'].map((field) => (
                <div key={field} className="relative">
                  <label htmlFor={field} className="block text-sm font-medium mb-2">
                    {field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Your Message'}
                  </label>

                  {field === 'message' ? (
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onBlur={() => handleBlur(field)}
                      rows={4}
                      placeholder="Please describe your inquiry"
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  ) : (
                    <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onBlur={() => handleBlur(field)}
                      placeholder={field === 'name' ? 'Enter your name' : 'Enter your email'}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  )}

                  {/* Character count for message */}
                  {field === 'message' && (
                    <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                      {formData.message.length} / 500
                    </span>
                  )}

                  {touched[field as keyof typeof touched] && errors[field as keyof typeof errors] ? (
                    <p className="text-red-500 text-xs mt-1">{errors[field as keyof typeof errors]}</p>
                  ) : touched[field as keyof typeof touched] && !errors[field as keyof typeof errors] ? (
                    <p className="text-green-500 text-xs mt-1">Looks good!</p>
                  ) : null}
                </div>
              ))}

              {/* hCaptcha */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.4 }}
                className="py-2"
              >
                <Suspense fallback={
                  <div className="h-20 bg-secondary/50 animate-pulse rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Loading security verification...</span>
                  </div>
                }>
                  <HCaptcha
                    ref={hcaptchaRef}
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={handleHcaptchaVerify}
                    onExpire={handleHcaptchaExpire}
                    theme="dark"
                    size="normal"
                  />
                </Suspense>
                <p className="text-xs text-muted-foreground mt-2">
                  This helps prevent automated spam submissions.
                </p>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !hcaptchaToken}
                className="w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Contact Info Card */}
            <div className="glass p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-sm md:text-base hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-sm md:text-base">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 glass rounded-xl hover:border-primary/50 transition-all group"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{link.icon}</span>
                    <span className="font-medium text-sm">{link.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Centered Popup with Purple Text */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <div 
              className={`relative px-8 py-6 rounded-2xl shadow-2xl text-center max-w-md mx-4 ${
                popupType === 'success' 
                  ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700' 
                  : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-purple-100 hover:text-white transition-colors z-10"
                onClick={() => setShowPopup(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg ${
                  popupType === 'success' ? 'bg-emerald-400/30' : 'bg-red-400/30'
                }`}>
                  {popupType === 'success' ? (
                    <Send className="w-6 h-6 text-purple-200" />
                  ) : (
                    <X className="w-6 h-6 text-purple-200" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-purple-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {popupType === 'success' ? 'Message Sent!' : 'Error!'}
                </h3>
                <p className="text-lg text-purple-200 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {popupMessage}
                </p>
              </div>
              
              {/* Timing progress bar */}
              <div className="mt-6 h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`h-full ${
                    popupType === 'success' 
                      ? 'bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100' 
                      : 'bg-gradient-to-r from-red-300 via-red-200 to-red-100'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;