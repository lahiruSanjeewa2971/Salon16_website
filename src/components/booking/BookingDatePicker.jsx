import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import DayCard from './DayCard';

const BookingDatePicker = ({ selectedDate, onDateSelect, salonHours }) => {
  const scrollContainerRef = useRef(null);
  const { toast } = useToast();

  // Helper function to format date as YYYY-MM-DD in local time (not UTC)
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate array of dates starting from today (next 30 days)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Helper function to check if date is bookable
  const isDateBookable = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const isTuesday = dayOfWeek === 2;
    const dayData = salonHours?.find((h) => h.id === dateString);

    if (date < new Date().setHours(0, 0, 0, 0)) return false;
    if (isTuesday && !dayData) return false;
    if (dayData?.isClosed) return false;
    if (dayData?.isHoliday) return false;
    if (dayData?.disableBookings) return false;
    return true;
  };

  // Get day status for toast message
  const getDayStatusMessage = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const isTuesday = dayOfWeek === 2;
    const dayData = salonHours?.find((h) => h.id === dateString);

    if (date < new Date().setHours(0, 0, 0, 0)) return 'This date is in the past';
    if (isTuesday && !dayData) return 'Tuesday is closed';
    if (dayData?.isClosed) return 'This day is closed';
    if (dayData?.isHoliday) return 'This is a holiday';
    if (dayData?.disableBookings) return 'Bookings are disabled for this day';
    return null;
  };

  const handleDateClick = (dateString, status) => {
    if (status !== 'available') {
      const message = getDayStatusMessage(dateString);
      toast({
        title: 'Cannot Book This Day',
        description: message || 'This day is not available for booking',
        variant: 'destructive',
      });
      return;
    }

    onDateSelect(dateString);
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Scroll to today on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Select a Date</h3>
        <p className="text-sm text-muted-foreground">Choose an available date for your booking</p>
      </div>

      {/* Scrollable Date Container */}
      <div className="relative my-4">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border border-border shadow-md hover:bg-secondary transition-colors hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Dates */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto py-4 px-1 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {dates.map((date, index) => {
            const dateString = formatDateLocal(date);
            const isPast = date < new Date().setHours(0, 0, 0, 0);
            const dayData = salonHours?.find((h) => h.id === dateString);
            const dayOfWeek = date.getDay();
            const isTuesday = dayOfWeek === 2;

            // Determine status
            let status = 'available';
            if (isPast) status = 'past';
            else if (isTuesday && !dayData) status = 'tuesday-closed';
            else if (dayData?.isClosed) status = 'closed';
            else if (dayData?.isHoliday) status = 'holiday';
            else if (dayData?.disableBookings) status = 'booking-disabled';

            return (
              <DayCard
                key={dateString}
                date={date}
                salonHours={salonHours}
                isSelected={selectedDate === dateString}
                onClick={handleDateClick}
                isPast={isPast}
              />
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border border-border shadow-md hover:bg-secondary transition-colors hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BookingDatePicker;

