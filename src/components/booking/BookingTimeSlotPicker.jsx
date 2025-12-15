import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchActiveBookingsByDate } from '@/features/bookings/bookingThunk';

const BookingTimeSlotPicker = ({ selectedDate, salonHours, serviceDuration, selectedTime, onTimeSelect }) => {
  const dispatch = useAppDispatch();
  const { bookingsByDate, isLoading } = useAppSelector((state) => state.bookings);

  // Fetch bookings when date changes
  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchActiveBookingsByDate(selectedDate));
    }
  }, [selectedDate, dispatch]);

  // Get bookings for selected date
  const existingBookings = bookingsByDate[selectedDate] || [];
  console.log("existingBookings", existingBookings);
  const hasBookings = existingBookings.length > 0;

  // Check if selected date is today
  const isToday = useMemo(() => {
    if (!selectedDate) return false;
    const today = new Date();
    const selected = new Date(selectedDate);
    return (
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate()
    );
  }, [selectedDate]);

  // Get current time in minutes (for "Today" validation)
  const currentTimeMinutes = useMemo(() => {
    if (!isToday) return 0;
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, [isToday]);

  // Convert time string (HH:MM) to minutes
  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convert minutes to time string (HH:MM)
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Check if a time slot is available
  const isSlotAvailable = (slotStartMinutes, slotEndMinutes, bookings) => {
    const BUFFER_MINUTES = 20;

    for (const booking of bookings) {
      const bookingStartMinutes = timeToMinutes(booking.time);
      const bookingEndMinutes = bookingStartMinutes + (booking.serviceDuration || 30);
      
      // Calculate buffer zones
      const bookingBufferStart = bookingStartMinutes - BUFFER_MINUTES;
      const bookingBufferEnd = bookingEndMinutes + BUFFER_MINUTES;

      // Check if slot overlaps with booking + buffer
      if (
        (slotStartMinutes >= bookingBufferStart && slotStartMinutes < bookingBufferEnd) ||
        (slotEndMinutes > bookingBufferStart && slotEndMinutes <= bookingBufferEnd) ||
        (slotStartMinutes <= bookingBufferStart && slotEndMinutes >= bookingBufferEnd)
      ) {
        return false;
      }
    }
    return true;
  };

  // Generate time slots with availability
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayData = salonHours?.find((h) => h.id === selectedDate);
    const defaultOpen = '08:30';
    const defaultClose = '21:00';

    const openTime = dayData?.openTime || defaultOpen;
    const closeTime = dayData?.closeTime || defaultClose;

    // Parse times
    const openMinutes = timeToMinutes(openTime);
    const closeMinutes = timeToMinutes(closeTime);
    const slotDuration = Math.max(serviceDuration || 30, 15); // Minimum 15 minutes

    // Calculate closing time with 20-minute buffer
    const closingTimeWithBuffer = closeMinutes - 20;

    const slots = [];
    let currentMinutes = openMinutes;

    // Filter bookings to only active ones (pending, accepted)
    const activeBookings = existingBookings.filter(
      (b) => b.status === 'pending' || b.status === 'accepted'
    );

    while (currentMinutes + slotDuration <= closingTimeWithBuffer) {
      const slotEndMinutes = currentMinutes + slotDuration;
      const timeString = minutesToTime(currentMinutes);

      // Check if slot is in the past (for "Today")
      const isPast = isToday && currentMinutes < currentTimeMinutes;

      // Check availability (only if there are bookings)
      const isAvailable = hasBookings
        ? isSlotAvailable(currentMinutes, slotEndMinutes, activeBookings)
        : true;

      slots.push({
        time: timeString,
        displayTime: new Date(2000, 0, 1, Math.floor(currentMinutes / 60), currentMinutes % 60).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        available: !isPast && isAvailable,
        isPast,
      });

      currentMinutes += slotDuration;
    }

    return slots;
  }, [selectedDate, salonHours, serviceDuration, existingBookings, hasBookings, isToday, currentTimeMinutes]);

  if (!selectedDate) {
    return (
      <div className="w-full p-8 text-center">
        <Clock className="mx-auto mb-4 text-muted-foreground" size={48} />
        <p className="text-muted-foreground">Please select a date first</p>
      </div>
    );
  }

  const handleSlotClick = (slot) => {
    if (slot.available) {
      onTimeSelect(slot.time);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Select a Time</h3>
        <p className="text-sm text-muted-foreground">
          {hasBookings
            ? 'Available slots are shown. Unavailable slots are disabled.'
            : 'Choose your preferred time slot'}
        </p>
      </div>

      {isLoading && (
        <div className="text-center py-4 text-muted-foreground">
          <p>Loading availability...</p>
        </div>
      )}

      {/* Time Slots Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {timeSlots.map((slot) => (
          <motion.button
            key={slot.time}
            whileHover={slot.available ? { scale: 1.05 } : {}}
            whileTap={slot.available ? { scale: 0.95 } : {}}
            onClick={() => handleSlotClick(slot)}
            disabled={!slot.available}
            className={cn(
              'p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium relative',
              selectedTime === slot.time
                ? 'border-primary bg-primary/10 text-primary'
                : slot.available
                ? 'border-border hover:border-primary/50 bg-card hover:bg-primary/5 text-foreground cursor-pointer'
                : 'border-border/30 bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60'
            )}
          >
            {slot.displayTime}
            {!slot.available && (
              <Lock size={12} className="absolute top-1 right-1 text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>

      {timeSlots.length === 0 && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No time slots available for this date</p>
        </div>
      )}

      {timeSlots.length > 0 && !isLoading && (
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-border bg-card" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-border/30 bg-muted/50 opacity-60" />
            <span>Unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTimeSlotPicker;
