import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, X } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import BookingServiceInfo from '@/components/booking/BookingServiceInfo';
import BookingDatePicker from '@/components/booking/BookingDatePicker';
import BookingTimeSlotPicker from '@/components/booking/BookingTimeSlotPicker';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import ScreenSkeleton from '@/components/common/ScreenSkeleton';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { salonHours } = useAppSelector((state) => state.calendar);
  const { activeServices } = useAppSelector((state) => state.services);

  // Get service from location state or find by ID
  const serviceId = location.state?.serviceId;
  const service = activeServices?.find((s) => s.id === serviceId);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when component mounts or service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button Skeleton */}
          <div className="mb-6">
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          </div>

          {/* Main Content Skeleton */}
          <ScreenSkeleton
            layout="split"
            showImage={true}
            showTitle={true}
            showDescription={true}
            showForm={true}
            formFields={4}
            showGrid={true}
            gridItems={6}
          />
        </div>
      </div>
    );
  }

  // If no service, redirect to home
  if (!service) {
    // Could redirect or show error
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No service selected</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleRemoveSelection = () => {
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirmBooking = () => {
    // TODO: Implement booking creation
    console.log('Booking confirmed:', {
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 lg:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Main Booking Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Service Info (Desktop) / Top (Mobile) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingServiceInfo service={service} />
          </div>

          {/* Right: Booking Form (Desktop) / Bottom (Mobile) */}
          <div className="space-y-8">
            {/* Service Details - Desktop only */}
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold text-foreground mb-2">{service.name}</h1>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={18} />
                  <span className="text-sm font-medium">{service.duration} min</span>
                </div>
                <div className="text-2xl font-bold text-foreground">${service.price}</div>
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Select Date & Time</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred booking slot</p>
                </div>
                {(selectedDate || selectedTime) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveSelection}
                    className="flex items-center gap-2"
                  >
                    <X size={16} />
                    Remove Selection
                  </Button>
                )}
              </div>
              <BookingDatePicker
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                salonHours={salonHours}
              />
            </div>

            {/* Time Slot Picker */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookingTimeSlotPicker
                  selectedDate={selectedDate}
                  salonHours={salonHours}
                  serviceDuration={service.duration}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
              </motion.div>
            )}

            {/* Confirmation Section */}
            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookingConfirmation
                  service={service}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  salonHours={salonHours}
                />

                {/* Confirm Button */}
                <div className="mt-6">
                  <Button
                    onClick={handleConfirmBooking}
                    className="w-full lg:w-auto px-8 py-6 text-lg"
                    size="lg"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

