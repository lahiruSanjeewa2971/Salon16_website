import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="gradient-luxury text-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-light-gold mb-4">
                Salon16
              </h3>
              <p className="text-white/90 text-base leading-relaxed max-w-sm">
                Transform your salon business with our premium management solution. Elegance meets efficiency.
              </p>
            </div>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-smooth backdrop-blur-sm border border-white/10"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-light-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-smooth text-base hover:translate-x-2 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-light-gold transition-all duration-300"></span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-light-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex-shrink-0">
                  <Phone size={18} className="text-light-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Phone</p>
                  <a href="tel:+15551234567" className="text-white/90 hover:text-white transition-smooth text-base">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex-shrink-0">
                  <Mail size={18} className="text-light-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Email</p>
                  <a href="mailto:hello@salon16.com" className="text-white/90 hover:text-white transition-smooth text-base">
                    hello@salon16.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex-shrink-0">
                  <MapPin size={18} className="text-light-gold" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Address</p>
                  <p className="text-white/90 text-base leading-relaxed">
                    123 Beauty Avenue,<br />
                    New York, NY 10001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Salon16. All rights reserved.
            </p>
            <p className="text-white/60 text-sm text-center md:text-right">
              Crafted with <span className="text-light-gold">luxury</span> in mind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

