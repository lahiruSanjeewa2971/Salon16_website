import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '../ThemeToggle';
import AuthButtons from '../AuthButtons';
import logoIcon from '@/assets/icon-192x192.png';
import { useAppSelector } from '@/store/hooks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, isMobile]);

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    // { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const authedLinks = [
    { name: 'Bookings', path: '/bookings' },
    { name: 'Reviews', path: '/reviews' },
  ];

  const navLinks = user ? [...baseLinks, ...authedLinks] : baseLinks;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background w-full max-w-full ${isScrolled
          ? 'backdrop-blur-lg shadow-elegant border-b border-border/50'
          : 'backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${isMobile ? 'h-20 py-3' : 'h-24 py-4'}`}>
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logoIcon}
              alt="Salon16 Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain rounded-full"
            />
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text"
            >
              Salon16
            </motion.h1>
          </Link>

          {/* Desktop: Navigation Links (only show on desktop) */}
          {!isMobile && (
            <>
              {/* Middle: Navigation Links */}
              <div className="flex items-center justify-center flex-1 px-8">
                <div className="flex items-center space-x-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-5 py-2.5 text-sm font-medium transition-smooth rounded-lg hover:bg-secondary/50 ${location.pathname === link.path ? 'text-primary' : 'text-foreground'
                        }`}
                    >
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="underline"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 gradient-primary rounded-full"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right: Theme Toggle + Auth Buttons */}
              <div className="flex items-center gap-4 flex-shrink-0 pl-4">
                <ThemeToggle />
                <AuthButtons />
              </div>
            </>
          )}

          {/* Mobile: Right side buttons + Menu toggle (only show on mobile) */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-smooth"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (only show on mobile/tablet devices) - Rendered via Portal */}
      {isMobile && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[55]"
              />

              {/* Full Screen Menu */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-background z-[60] flex flex-col overflow-y-auto"
              >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
                  <h2 className="text-xl font-bold text-foreground">
                    Salon 16
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary transition-smooth text-foreground"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Centered Navigation Links */}
                <div className="flex-1 flex items-center justify-center min-h-0 py-8">
                  <div className="w-full max-w-md px-4 sm:px-6 space-y-3">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`block py-4 px-6 rounded-lg transition-smooth font-medium text-lg text-center ${location.pathname === link.path
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'hover:bg-secondary text-foreground'
                            }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Auth Buttons at Bottom */}
                <div className="w-full px-4 sm:px-6 pb-6 sm:pb-8 pt-6 border-t border-border bg-muted/30 flex-shrink-0">
                  <AuthButtons isMobile={true} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
};

export default Navbar;

