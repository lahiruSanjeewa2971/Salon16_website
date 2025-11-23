import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, href, className = '', variant = 'primary' }) => {
  const baseClasses = "px-8 py-3.5 rounded-full font-medium shadow-elegant transition-smooth inline-block text-center";
  
  const variants = {
    primary: "gradient-primary text-white hover:shadow-glow",
    gold: "gradient-gold text-primary-dark hover:shadow-gold",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default GradientButton;
