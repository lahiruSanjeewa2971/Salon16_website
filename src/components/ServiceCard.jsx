import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const IconComponent = Icons[service.icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="glass-effect p-8 rounded-3xl shadow-elegant hover:shadow-glow transition-smooth border border-border/50 backdrop-blur-xl">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
          style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}
        >
          <IconComponent size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-smooth">
          {service.name}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>

        <motion.div
          className="mt-6 text-primary font-medium text-sm flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-smooth"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>Learn More</span>
          <Icons.ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
