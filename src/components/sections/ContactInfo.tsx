import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useMemo } from 'react';

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

interface ContactInfoProps {
  isInView: boolean;
}

const ContactInfo = ({ isInView }: ContactInfoProps) => {
  const contactInfo = useMemo(() => [
    { icon: Mail, label: 'Email', value: 'sriranjankapilan@gmail.com', href: 'mailto:sriranjankapilan@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 774740186', href: 'tel:+94774740186' },
    { icon: MapPin, label: 'Location', value: 'Jaffna, Sri Lanka', href: null },
  ], []);

  const socialLinks = useMemo(() => socialLinksData, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="space-y-6 md:space-y-8"
    >
      {/* Contact Info Card */}
      <div className="highlight-card glass p-6 md:p-8 rounded-2xl">
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
      <div className="highlight-card glass p-6 md:p-6 rounded-2xl">
        <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-4">Follow Me</h3>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-card flex items-center gap-3 px-4 py-3 glass rounded-xl hover:border-primary/50 transition-all group"
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
  );
};

export default ContactInfo;