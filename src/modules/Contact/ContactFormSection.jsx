import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Loader2 } from 'lucide-react';
import GradientButton from '@/components/GradientButton';
import { useToast } from '@/components/ui/use-toast';
import ContactInfoSection from './ContactInfoSection';

const ContactFormSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      // Get these values from your EmailJS dashboard after setting up a service
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Initialize EmailJS with your public key
      emailjs.init(publicKey);

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        to_email: import.meta.env.VITE_CONTACT_EMAIL || 'your-email@example.com', // Your email address
      });

      // Success
      toast({
        title: 'Message Sent!',
        description: 'Thank you for your message! We will get back to you soon.',
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect p-8 sm:p-10 rounded-3xl border border-border shadow-elegant">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="0789109693"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3.5 rounded-full font-medium shadow-elegant transition-smooth gradient-primary text-white hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <ContactInfoSection />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

