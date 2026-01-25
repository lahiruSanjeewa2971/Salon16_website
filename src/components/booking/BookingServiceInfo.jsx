import { motion } from 'framer-motion';
import { Clock, DollarSign } from 'lucide-react';

const BookingServiceInfo = ({ service }) => {
  if (!service) return null;

  return (
    <div className="w-full">
      {/* Service Image */}
      <div className="relative h-64 lg:h-[500px] rounded-2xl overflow-hidden mb-6 lg:mb-0">
        <motion.img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
          {service.category?.name || service.category || 'General'}
        </div>
      </div>

      {/* Service Details - Mobile only */}
      <div className="lg:hidden space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{service.name}</h2>
          <p className="text-muted-foreground">{service.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Clock size={18} />
            <span className="text-sm font-medium">{service.duration} min</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            {/* <DollarSign size={20} /> */}
            <span className="text-2xl font-bold">Rs: {service.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingServiceInfo;

