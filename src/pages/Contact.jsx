import { useState } from 'react';
import { motion } from 'framer-motion';
import GradientButton from '@/components/GradientButton';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "123 Beauty Avenue, New York, NY 10001"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@salon16.com"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Get In
              <span className="block mt-2 gradient-gold bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We'd love to hear from you. Reach out and let's start a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
                <h2 className="text-3xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="+1 (555) 123-4567"
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

                  <GradientButton variant="primary" className="w-full">
                    Send Message
                  </GradientButton>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-border shadow-elegant hover:shadow-glow transition-smooth"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{info.details}</p>
                  </div>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-elegant h-64 bg-secondary flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Map Location</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Quick
              <span className="gradient-primary bg-clip-text text-transparent"> Answers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about Salon16
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "How do I get started with Salon16?",
                a: "Simply download our app from the App Store or Google Play, create an account, and start exploring our features."
              },
              {
                q: "Is there a free trial available?",
                a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required."
              },
              {
                q: "Can I migrate my existing data?",
                a: "Absolutely. Our team provides white-glove migration service to ensure a smooth transition from your current system."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
