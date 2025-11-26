import { motion } from 'framer-motion';
import ServiceCard from '@/components/ServiceCard';
import GradientButton from '@/components/GradientButton';
import { services } from '@/data/mockData';

const Services = () => {
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
              Our Premium
              <span className="block mt-2 gradient-gold bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive beauty solutions tailored to perfection. Each service is crafted to exceed expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories Detail */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose
              <span className="gradient-primary bg-clip-text text-transparent"> Salon16</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium quality meets exceptional service in every appointment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Stylists",
                description: "Our team of certified professionals brings years of experience and passion to every service."
              },
              {
                title: "Premium Products",
                description: "We use only the finest, salon-grade products that are gentle yet effective for all hair and skin types."
              },
              {
                title: "Luxury Experience",
                description: "Enjoy a relaxing atmosphere with personalized attention in our beautifully designed salon space."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-elegant"
              >
                <h3 className="text-2xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Book Your Service?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Download the Salon16 app and schedule your appointment today
            </p>
            <GradientButton variant="primary">
              Download Now
            </GradientButton>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
