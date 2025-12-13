import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const BookingTimeSlotPicker = ({ selectedDate, salonHours, serviceDuration, selectedTime, onTimeSelect }) => {
  // Generate time slots for the selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayData = salonHours?.find((h) => h.id === selectedDate);
    const defaultOpen = '08:30';
    const defaultClose = '21:00';

    const openTime = dayData?.openTime || defaultOpen;
    const closeTime = dayData?.closeTime || defaultClose;

    // Parse times
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);

    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;
    const slotDuration = serviceDuration || 30; // Default 30 minutes

    const slots = [];
    let currentMinutes = openMinutes;

    while (currentMinutes + slotDuration <= closeMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      slots.push({
        time: timeString,
        displayTime: new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });

      currentMinutes += slotDuration;
    }

    return slots;
  }, [selectedDate, salonHours, serviceDuration]);

  if (!selectedDate) {
    return (
      <div className="w-full p-8 text-center">
        <Clock className="mx-auto mb-4 text-muted-foreground" size={48} />
        <p className="text-muted-foreground">Please select a date first</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Select a Time</h3>
        <p className="text-sm text-muted-foreground">Choose your preferred time slot</p>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {timeSlots.map((slot) => (
          <motion.button
            key={slot.time}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTimeSelect(slot.time)}
            className={cn(
              'p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium',
              selectedTime === slot.time
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50 bg-card hover:bg-primary/5 text-foreground'
            )}
          >
            {slot.displayTime}
          </motion.button>
        ))}
      </div>

      {timeSlots.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No time slots available for this date</p>
        </div>
      )}
    </div>
  );
};

export default BookingTimeSlotPicker;

