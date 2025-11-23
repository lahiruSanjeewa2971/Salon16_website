import { motion } from 'framer-motion';
// Using placeholder image - replace with actual phone mockup image later
const phoneMockup = 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=800&fit=crop';

const PhoneMockup = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <img
            src={phoneMockup}
            alt="Salon16 App Interface"
            className="w-full max-w-sm mx-auto drop-shadow-2xl"
          />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl -z-10" />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 -left-10 w-24 h-24 gradient-gold rounded-full opacity-20 blur-2xl"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-10 -right-10 w-32 h-32 gradient-primary rounded-full opacity-20 blur-2xl"
      />
    </div>
  );
};

export default PhoneMockup;
