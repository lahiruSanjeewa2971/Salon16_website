import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Smartphone } from 'lucide-react';
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

const ContactInfoSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "Salon 16, Malpitiya, Boyagane"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "0789109693"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@salon16.com"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon, Wed-Sun: 8:30 AM - 8:00 PM\nTuesday: Closed"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      details: "Download our mobile app for Android and iOS. Installable APKs will be available soon on this website.",
      isApp: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {contactInfo.map((info, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-border shadow-elegant hover:shadow-glow transition-smooth"
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <info.icon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{info.title}</h3>
            {info.title === "Phone" ? (
              <a
                href="tel:+94789109693"
                className="text-primary hover:text-primary-light transition-colors text-base font-medium"
              >
                {info.details}
              </a>
            ) : info.isApp ? (
              <div className="space-y-2">
                <p className="text-muted-foreground whitespace-pre-line">{info.details}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Android
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    iOS
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-line">{info.details}</p>
            )}
          </div>
        </motion.div>
      ))}

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl overflow-hidden shadow-elegant h-64 bg-secondary flex items-center justify-center"
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
    </motion.div>
  );
};

export default ContactInfoSection;

