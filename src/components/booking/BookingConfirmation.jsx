import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';

const BookingConfirmation = ({ service, selectedDate, selectedTime, salonHours }) => {
  if (!service || !selectedDate || !selectedTime) return null;

  const dayData = salonHours?.find((h) => h.id === selectedDate);
  const date = new Date(selectedDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time
  const [hours, minutes] = selectedTime.split(':').map(Number);
  const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Calculate end time
  const endTime = new Date(2000, 0, 1, hours, minutes);
  endTime.setMinutes(endTime.getMinutes() + (service.duration || 30));
  const formattedEndTime = endTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10">
          <CheckCircle className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Confirm Your Booking</h3>
          <p className="text-sm text-muted-foreground">Review your booking details</p>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Service</h4>
          <p className="text-lg font-semibold text-foreground">{service.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm font-semibold text-foreground">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-semibold text-foreground">
                {formattedTime} - {formattedEndTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-semibold text-foreground">{service.duration} minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Price</p>
              <p className="text-lg font-bold text-foreground">${service.price}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;

