import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/GradientButton';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactFormSection from './ContactFormSection';
import ContactInfoSection from './ContactInfoSection';
import ContactFAQSection from './ContactFAQSection';

const Contact = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Get In Touch
              {/* <span className="block mt-2 bg-clip-text">
                Touch
              </span> */}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We'd love to hear from you. Reach out and let's start a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <ContactFormSection />

      {/* FAQ Section */}
      <ContactFAQSection />
    </div>
  );
};

export default Contact;

