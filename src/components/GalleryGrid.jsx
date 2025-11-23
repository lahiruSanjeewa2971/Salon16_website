import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Using placeholder images - replace with actual images later
const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1560869713-7d563b402037?w=600&h=600&fit=crop', category: "Hair Styling" },
  { id: 2, src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop', category: "Manicure" },
  { id: 3, src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop', category: "Spa Treatment" },
  { id: 4, src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop', category: "Hair Coloring" }
];

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image)}
            className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square"
          >
            <img
              src={image.src}
              alt={image.category}
              className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
              <div className="text-white">
                <p className="font-bold text-lg">{image.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
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
                className="absolute -top-12 right-0 text-white hover:text-primary-light transition-smooth"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
