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
    <footer className="gradient-luxury text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-gold bg-clip-text text-transparent">
              Salon16
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Transform your salon business with our premium management solution. Elegance meets efficiency.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-smooth backdrop-blur-sm"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-light-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-smooth text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-light-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-white/80">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/80">
                <Mail size={16} />
                <span>hello@salon16.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/80">
                <MapPin size={16} />
                <span>123 Beauty Avenue, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-light-gold">Stay Updated</h4>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-light-gold text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 rounded-full bg-light-gold text-primary-dark font-medium hover:bg-accent transition-smooth text-sm"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Salon16. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
