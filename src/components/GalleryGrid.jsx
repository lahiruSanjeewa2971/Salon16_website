import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Using placeholder images - at least 15 images for gallery
const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop', category: "Hair Styling", description: "Elegant hair styling transformation" },
  { id: 2, src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop', category: "Manicure", description: "Beautiful nail art design" },
  { id: 3, src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop', category: "Spa Treatment", description: "Relaxing spa experience" },
  { id: 4, src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop', category: "Hair Coloring", description: "Vibrant hair color transformation" },
  { id: 5, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop', category: "Haircut", description: "Professional haircut service" },
  { id: 6, src: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&h=800&fit=crop', category: "Facial Treatment", description: "Rejuvenating facial care" },
  { id: 7, src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop', category: "Pedicure", description: "Luxurious pedicure service" },
  { id: 8, src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop', category: "Hair Treatment", description: "Deep conditioning treatment" },
  { id: 9, src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop', category: "Makeup", description: "Professional makeup application" },
  { id: 10, src: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&h=800&fit=crop', category: "Hair Styling", description: "Wedding hair styling" },
  { id: 11, src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=800&fit=crop', category: "Nail Art", description: "Creative nail art design" },
  { id: 12, src: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=600&fit=crop', category: "Hair Extensions", description: "Natural-looking hair extensions" },
  { id: 13, src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop', category: "Manicure", description: "Classic French manicure" },
  { id: 14, src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop', category: "Hair Coloring", description: "Balayage hair coloring" },
  { id: 15, src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop', category: "Makeup", description: "Bridal makeup look" },
];

// Define grid layout patterns for staggered/asymmetric grid
// Each image gets a size class: 'small', 'medium', 'large', 'wide', 'tall'
const gridLayouts = [
  { size: 'large', span: 'col-span-2 row-span-2' },    // Large featured
  { size: 'medium', span: 'col-span-1 row-span-1' },  // Medium
  { size: 'small', span: 'col-span-1 row-span-1' },   // Small
  { size: 'wide', span: 'col-span-2 row-span-1' },    // Wide
  { size: 'tall', span: 'col-span-1 row-span-2' },     // Tall
  { size: 'medium', span: 'col-span-1 row-span-1' },
  { size: 'small', span: 'col-span-1 row-span-1' },
  { size: 'large', span: 'col-span-2 row-span-2' },
  { size: 'medium', span: 'col-span-1 row-span-1' },
  { size: 'wide', span: 'col-span-2 row-span-1' },
  { size: 'tall', span: 'col-span-1 row-span-2' },
  { size: 'small', span: 'col-span-1 row-span-1' },
  { size: 'medium', span: 'col-span-1 row-span-1' },
  { size: 'small', span: 'col-span-1 row-span-1' },
  { size: 'medium', span: 'col-span-1 row-span-1' },
];

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // ============================================
  // OPTION 1: Staggered/Asymmetric Grid (ACTIVE)
  // ============================================
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((image, index) => {
          const layout = gridLayouts[index % gridLayouts.length];
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              onClick={() => setSelectedImage(image)}
              className={`group cursor-pointer relative overflow-hidden rounded-xl md:rounded-2xl ${layout.span} ${
                layout.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                layout.size === 'wide' ? 'md:col-span-2' :
                layout.size === 'tall' ? 'md:row-span-2' :
                ''
              }`}
            >
              <img
                src={image.src}
                alt={image.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <div className="text-white">
                  <p className="font-bold text-sm md:text-lg mb-1">{image.category}</p>
                  <p className="text-xs md:text-sm text-white/80 line-clamp-2">{image.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      // Lightbox Modal
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-light transition-smooth z-10"
              >
                <X size={32} />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.category}
                className="w-full rounded-2xl shadow-2xl"
              />
              
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImage.category}</h3>
                <p className="text-white/80 mt-2">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // ============================================
  // OPTION 2: 3D Card Flip Gallery (COMMENTED)
  // ============================================
  /*
  const [flippedCards, setFlippedCards] = useState(new Set());

  const toggleFlip = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {images.map((image, index) => {
          const isFlipped = flippedCards.has(image.id);
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative h-[200px] sm:h-[250px] md:h-[300px] perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => toggleFlip(image.id)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                // Front of card
                <div className="absolute inset-0 backface-hidden rounded-xl md:rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src={image.src}
                    alt={image.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-white font-bold text-sm md:text-base">{image.category}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs">
                    Click to flip
                  </div>
                </div>

                // Back of card
                <div 
                  className="absolute inset-0 backface-hidden rounded-xl md:rounded-2xl bg-card border border-border shadow-elegant p-4 md:p-6 flex flex-col justify-center items-center text-center"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{image.category}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">{image.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm"
                  >
                    View Full
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      // Lightbox Modal
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-light transition-smooth z-10"
              >
                <X size={32} />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.category}
                className="w-full rounded-2xl shadow-2xl"
              />
              
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImage.category}</h3>
                <p className="text-white/80 mt-2">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  */

  // ============================================
  // OPTION 3: Parallax Scrolling Gallery (COMMENTED)
  // ============================================
  /*
  return (
    <>
      <div className="space-y-8 md:space-y-12">
        {images.map((image, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                className={`flex ${isEven ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} gap-6 md:gap-8 items-center`}
              >
                // Image Container with Parallax Effect
                <motion.div
                  className={`relative ${isEven ? 'md:w-2/3' : 'md:w-2/3'} w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-elegant group cursor-pointer`}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ y: 0 }}
                  whileInView={{
                    y: [0, isEven ? -20 : 20, 0],
                  }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="font-bold text-xl mb-2">{image.category}</p>
                      <p className="text-white/80">{image.description}</p>
                    </div>
                  </div>
                </motion.div>

                // Content Card
                <motion.div
                  className={`hidden md:flex ${isEven ? 'md:w-1/3' : 'md:w-1/3'} flex-col justify-center p-6 md:p-8 bg-card border border-border rounded-2xl shadow-elegant`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{image.category}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">{image.description}</p>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium self-start"
                  >
                    View Full Image
                  </button>
                </motion.div>
              </motion.div>

              // Mobile Content
              <div className="md:hidden mt-4 p-4 bg-card border border-border rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-foreground">{image.category}</h3>
                <p className="text-muted-foreground">{image.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      // Lightbox Modal
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-light transition-smooth z-10"
              >
                <X size={32} />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.category}
                className="w-full rounded-2xl shadow-2xl"
              />
              
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImage.category}</h3>
                <p className="text-white/80 mt-2">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  */
};

export default GalleryGrid;
