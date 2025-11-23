import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const FeatureCard = ({ feature, index }) => {
  const IconComponent = Icons[feature.icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="group"
    >
      <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-elegant hover:shadow-glow transition-smooth overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-smooth" />
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
            <IconComponent size={28} className="text-white" />
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-foreground">
            {feature.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
