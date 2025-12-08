import { motion } from 'framer-motion';
import heroImage from '@/assets/hero_version3.png';
import HomeServicesSection from './HomeServicesSection';
import HomeStatsSection from './HomeStatsSection';
import HomeParallaxSection from './HomeParallaxSection';
import HomeContactSection from './HomeContactSection';

// Mock services data
const mockServices = [
  {
    id: 1,
    name: 'Premium Haircut',
    price: 75,
    duration: '45 min',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a2a4c3b8e?w=800&h=600&fit=crop',
    description: 'Expert haircut tailored to your style and face shape. Includes consultation, precision cut, and styling.',
  },
  {
    id: 2,
    name: 'Hair Coloring',
    price: 150,
    duration: '2 hours',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
    description: 'Professional hair coloring with premium products. Full color, highlights, or balayage techniques available.',
  },
  {
    id: 3,
    name: 'Hair Styling',
    price: 60,
    duration: '30 min',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop',
    description: 'Beautiful styling for any occasion. From elegant updos to modern waves, we create the perfect look.',
  },
  {
    id: 4,
    name: 'Beard Trim & Style',
    price: 40,
    duration: '25 min',
    category: 'Beard',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
    description: 'Professional beard trimming and styling. Precision shaping with hot towel treatment included.',
  },
  {
    id: 5,
    name: 'Full Beard Grooming',
    price: 65,
    duration: '40 min',
    category: 'Beard',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=800&h=600&fit=crop',
    description: 'Complete beard grooming experience. Includes trim, shape, hot towel, and premium beard oil treatment.',
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Image Section */}
      <section className="relative w-full h-[66vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] max-h-[800px] overflow-visible">
        <img
          src={heroImage}
          alt="Salon16 Hero"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />

        {/* Welcome Text - Desktop: Left bottom, Mobile: Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-0 md:-bottom-28 lg:-bottom-28 xl:-bottom-28 left-0 md:left-8 lg:left-12 xl:left-16 
                     w-full md:w-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl
                     px-6 py-6 md:py-8 lg:py-10
                     transform md:translate-y-1/4 lg:translate-y-0 xl:translate-y-0"
        >
          <div className="relative bg-background/95 dark:bg-background/90 backdrop-blur-md 
                         border border-border/50 rounded-2xl 
                         shadow-elegant p-6 md:p-8 lg:p-10
                         border-l-4 border-l-primary">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl 
                        text-foreground leading-relaxed
                        font-serif font-medium
                        text-center md:text-left"
            >
              <span className="text-primary dark:text-primary-light font-bold">
                Welcome to Salon16
              </span>
              {' — '}
              <span className="text-foreground">
                where luxury meets modern beauty care. Explore curated services, effortless booking, and a personalized experience designed for your style.
              </span>
            </motion.p>

            {/* Decorative accent */}
            <div className="absolute -left-1 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-primary-light to-primary rounded-full opacity-80" />
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-border/50" />

      {/* Our Services Section */}
      <HomeServicesSection services={mockServices} />

      {/* Divider */}
      {/* <div className="w-full border-t border-border/50" /> */}

      {/* Stats/Numbers Section */}
      <HomeStatsSection />

      {/* Divider */}
      <div className="w-full border-t border-border/50" />

      {/* Parallax Section */}
      <HomeParallaxSection />

      {/* Divider */}
      <div className="w-full border-t border-border/50" />

      {/* Contact/Location Section */}
      <HomeContactSection />
    </div>
  );
};

export default Home;

