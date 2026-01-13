import { motion } from 'framer-motion';
import GalleryGrid from '@/components/GalleryGrid';

const Gallery = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-20 gradient-luxury text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our Work
              <span className="block mt-2 bg-clip-text">
                Speaks Volumes
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our portfolio of stunning transformations and luxurious treatments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
              Every image tells a story of expertise, care, and beauty. Browse through our collection to see the artistry and attention to detail that defines Salon16.
            </p>
          </motion.div>

          <GalleryGrid />
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our
              <span className="gradient-primary bg-clip-text text-transparent"> Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From consultation to final reveal, we ensure every step is perfect
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your vision and needs" },
              { step: "02", title: "Personalized Plan", desc: "Custom treatment designed for you" },
              { step: "03", title: "Expert Service", desc: "Professional execution with care" },
              { step: "04", title: "Perfect Results", desc: "Beautiful outcomes that exceed expectations" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Instagram CTA */}
      {/* <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Follow Our Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stay inspired with daily beauty tips and transformations on Instagram
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-block px-8 py-3.5 rounded-full gradient-gold text-primary-dark font-medium shadow-gold"
            >
              @salon16official
            </motion.a>
          </motion.div>
        </div>
      </section> */}

    </div>
  );
};

export default Gallery;
