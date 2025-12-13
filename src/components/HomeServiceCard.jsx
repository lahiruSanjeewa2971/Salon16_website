import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import GradientButton from './GradientButton';

const HomeServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-card border border-border/50 rounded-2xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <motion.img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold"
          >
            {service.category?.name || service.category || 'General'}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Service Name */}
          <motion.h3
            className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            {service.name}
          </motion.h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 flex-1">
            {service.description}
          </p>

          {/* Price and Duration */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2 text-primary">
              <Clock size={18} />
              <span className="text-sm font-medium">{service.duration}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                ${service.price}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GradientButton
              variant="primary"
              className="w-full group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                Book Now
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </span>
            </GradientButton>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-primary/0 transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default HomeServiceCard;

