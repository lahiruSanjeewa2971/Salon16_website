import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SALON_COORDINATES = {
  latitude: 7.44552427675218,
  longitude: 80.34418654232829,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const HomeContactSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Visit{' '}
            <span className="bg-clip-text ">
              Us
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find us at our location and experience luxury beauty care
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-elegant hover:shadow-glow transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Salon 16, Malpitiya, Boyagane
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-elegant hover:shadow-glow transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">Contact</h3>
                  <a
                    href="tel:+94789109693"
                    className="text-primary hover:text-primary-light transition-colors text-lg font-medium"
                  >
                    0789109693
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-elegant hover:shadow-glow transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Working Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="font-medium">Mon, Wed-Sun:</span>
                      <span>8:30 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground/70">
                      <span className="font-medium">Tuesday:</span>
                      <span className="text-red-500 dark:text-red-400">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-elegant border border-border/50"
          >
            <MapContainer
              center={[SALON_COORDINATES.latitude, SALON_COORDINATES.longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%', zIndex: 0 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[SALON_COORDINATES.latitude, SALON_COORDINATES.longitude]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">Salon 16</h3>
                    <p className="text-sm text-gray-600">Malpitiya, Boyagane</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;

