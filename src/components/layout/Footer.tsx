import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-4 gap-x-8 text-base text-muted-foreground">
            <a
              href="mailto:bahubali@example.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>sriranjankapilan@gmail.com</span>
            </a>
            <a href="tel:+94771234567" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>+94 77 474 0186</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Jaffna, Sri Lanka</span>
            </span>
          </div>

          {/* Copyright Notice */}
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Kapilan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;