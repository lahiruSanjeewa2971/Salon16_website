import { motion } from 'framer-motion';
import { Users, CheckCircle, Calendar } from 'lucide-react';
import parallaxImage from '@/assets/home_screen_scrolling_2.jpg';

const StatCard = ({ icon: Icon, value, label, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group relative"
        >
            <div className="relative bg-white/95 dark:bg-card/95 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 
                     shadow-elegant hover:shadow-glow transition-all duration-300">
                {/* Icon */}
                <motion.div
                    className="mb-4 flex justify-center"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full gradient-primary flex items-center justify-center">
                            <Icon size={24} className="text-white" />
                        </div>
                    </div>
                </motion.div>

                {/* Value */}
                <motion.h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2
                     text-foreground
                     group-hover:scale-105 transition-transform duration-300"
                >
                    {value}
                </motion.h3>

                {/* Label */}
                <p className="text-muted-foreground text-center text-sm md:text-base font-medium">
                    {label}
                </p>

                {/* Decorative accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 
                       bg-gradient-to-r from-primary via-primary-light to-primary
                       group-hover:w-3/4 transition-all duration-500 rounded-full" />
            </div>
        </motion.div>
    );
};

const HomeParallaxSection = () => {
    const stats = [
        {
            icon: Users,
            value: '10K+',
            label: 'Happy Clients',
        },
        {
            icon: CheckCircle,
            value: '500+',
            label: 'Services Completed',
        },
        {
            icon: Calendar,
            value: '15+',
            label: 'Years Experience',
        },
    ];

  return (
    <section className="relative w-full h-[78vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] max-h-[800px] overflow-hidden my-8 sm:my-12 md:my-16">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${parallaxImage})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
      </div>

      {/* Scrolling Content - Stats Grid */}
      <div className="relative z-10 h-full flex items-center justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeParallaxSection;

