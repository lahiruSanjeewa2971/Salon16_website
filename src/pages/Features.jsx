import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import PhoneMockup from '@/components/PhoneMockup';
import { features } from '@/data/mockData';
import { Check } from 'lucide-react';

const Features = () => {
  const benefits = [
    "Reduce no-shows by 70% with automated reminders",
    "Increase booking efficiency by 50%",
    "Save 10+ hours per week on admin tasks",
    "Improve customer satisfaction and retention",
    "Real-time insights for better decisions",
    "Seamless mobile and desktop experience"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-20 gradient-luxury text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Features That
              <span className="gradient-gold bg-clip-text text-transparent block mt-2">
                Power Success
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Discover the comprehensive toolkit designed to elevate every aspect of your salon business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Everything You Need,
                <span className="gradient-primary bg-clip-text text-transparent block">
                  All In One Place
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Salon16 brings together all the essential tools your beauty business needs to thrive in today's competitive market.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Seamless Integration
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Works perfectly with your existing workflow. No disruption, just enhancement.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['iOS', 'Android', 'Web', 'Tablet'].map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border hover:border-primary/50 transition-smooth"
                >
                  <div className="text-3xl mb-3">
                    {platform === 'iOS' && '📱'}
                    {platform === 'Android' && '🤖'}
                    {platform === 'Web' && '🌐'}
                    {platform === 'Tablet' && '📲'}
                  </div>
                  <p className="font-semibold text-foreground">{platform}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
