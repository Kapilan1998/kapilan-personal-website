import { motion } from 'framer-motion';
import { Terminal, Mail, Phone, MapPin, Linkedin, Github, Facebook } from 'lucide-react';

const socialLinks = [
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: 'https://www.linkedin.com/in/bahubali',
    color: 'hover:text-blue-500',
    bg: 'hover:bg-blue-500/10'
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    url: 'https://github.com/bahubali',
    color: 'hover:text-foreground',
    bg: 'hover:bg-foreground/10'
  },
  { 
    name: 'Medium', 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ), 
    url: 'https://medium.com/@bahubali',
    color: 'hover:text-green-500',
    bg: 'hover:bg-green-500/10'
  },
  { 
    name: 'Facebook', 
    icon: Facebook, 
    url: 'https://facebook.com/bahubali',
    color: 'hover:text-blue-600',
    bg: 'hover:bg-blue-600/10'
  },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <a href="#" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="gradient-text">dev</span>
              <span className="text-foreground">.portfolio</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Crafting scalable backend solutions and cloud-native architectures
              with passion and precision.
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              © 2025 <span className="font-semibold text-foreground">Bahubali</span>. All rights reserved.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg glass ${social.color} ${social.bg} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-foreground mb-4">Contact Me</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:bahubali@example.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span className="p-2 rounded-lg glass group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  bahubali@example.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+94771234567" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span className="p-2 rounded-lg glass group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  +94 77 123 4567
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="p-2 rounded-lg glass">
                    <MapPin className="w-4 h-4" />
                  </span>
                  Colombo, Sri Lanka
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-foreground mb-4">Let's Connect</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to top
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;