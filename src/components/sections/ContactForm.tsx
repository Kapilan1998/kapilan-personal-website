import { motion } from 'framer-motion';
import { useMemo, useCallback } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => Promise<void>;
  isSubmitting: boolean;
  formData: { name: string; email: string; message: string };
  onFormDataChange: (field: string, value: string) => void;
  touched: { name: boolean; email: boolean; message: boolean };
  onBlur: (field: string) => void;
  errors: { name: string; email: string; message: string };
}

const ContactForm = ({
  onSubmit,
  isSubmitting,
  formData,
  onFormDataChange,
  touched,
  onBlur,
  errors
}: ContactFormProps) => {
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  }, [onSubmit, formData]);

  const fields = useMemo(() => [
    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name' },
    { id: 'email', label: 'Your Email', type: 'email', placeholder: 'Enter your email' },
    { id: 'message', label: 'Your Message', type: 'textarea', placeholder: 'Please describe your inquiry' },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="highlight-card glass p-6 md:p-8 rounded-2xl space-y-5 md:space-y-6">
        <input type="hidden" name="botcheck" value="" />
        
        {fields.map((field) => (
          <div key={field.id} className="relative">
            <label htmlFor={field.id} className="block text-sm font-medium mb-2">
              {field.label}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => onFormDataChange(field.id, e.target.value)}
                onBlur={() => onBlur(field.id)}
                rows={4}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => onFormDataChange(field.id, e.target.value)}
                onBlur={() => onBlur(field.id)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            )}

            {field.id === 'message' && (
              <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                {formData.message.length} / 500
              </span>
            )}

            {touched[field.id as keyof typeof touched] && errors[field.id as keyof typeof errors] ? (
              <p className="text-red-500 text-xs mt-1">{errors[field.id as keyof typeof errors]}</p>
            ) : touched[field.id as keyof typeof touched] && !errors[field.id as keyof typeof errors] ? (
              <p className="text-green-500 text-xs mt-1">Looks good!</p>
            ) : null}
          </div>
        ))}

        <motion.button
          type="submit"
          disabled={isSubmitting}
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
  );
};

export default ContactForm;