import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, X, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createBooking } from '@/features/bookings/bookingThunk';
import BookingServiceInfo from '@/components/booking/BookingServiceInfo';
import BookingDatePicker from '@/components/booking/BookingDatePicker';
import BookingTimeSlotPicker from '@/components/booking/BookingTimeSlotPicker';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import ScreenSkeleton from '@/components/common/ScreenSkeleton';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { salonHours } = useAppSelector((state) => state.calendar);
  const { activeServices } = useAppSelector((state) => state.services);
  const { user } = useAppSelector((state) => state.auth);
  const { isCreating } = useAppSelector((state) => state.bookings);

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

  const handleConfirmBooking = async () => {
    console.log("selectedDate", selectedDate);
    console.log("selectedTime", selectedTime);
    if (!user || !service || !selectedDate || !selectedTime) {
      toast({
        title: 'Error',
        description: 'Please ensure all booking details are selected.',
        variant: 'destructive',
      });
      return;
    }

    // Prepare booking data
    // User object from Redux has 'id' property (not 'uid')
    const customerId = user.id || user.uid || null;
    const customerName = user.displayName || 
      (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 
       user.firstName || user.lastName || user.email || 'Customer');

    if (!customerId) {
      toast({
        title: 'Error',
        description: 'User information is missing. Please login again.',
        variant: 'destructive',
      });
      return;
    }

    const bookingData = {
      adminNote: '',
      categoryId: service.category?.id || null,
      categoryName: service.category?.name || service.category || 'General',
      customerId: customerId,
      customerName: customerName,
      date: selectedDate,
      notes: '',
      rescheduledCount: 0,
      serviceDuration: service.duration || 30,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      status: 'pending',
      time: selectedTime,
    };

    try {
      const result = await dispatch(createBooking(bookingData));
      
      if (createBooking.fulfilled.match(result)) {
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        
        toast({
          title: 'Booking Confirmed!',
          description: `Your booking for ${service.name} on ${formattedDate} at ${formattedTime} has been confirmed.`,
        });
        
        // Reset selections
        setSelectedDate(null);
        setSelectedTime(null);
        
        // Redirect to home screen after a short delay to show the toast
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (createBooking.rejected.match(result)) {
        toast({
          title: 'Booking Failed',
          description: result.payload || 'Failed to create booking. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
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
                    disabled={isCreating}
                    className="w-full lg:w-auto px-8 py-6 text-lg"
                    size="lg"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Booking...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
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

