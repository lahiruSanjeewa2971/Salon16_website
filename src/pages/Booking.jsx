import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, X, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const bookingFrom = location.state?.from || 'home';
  const service = activeServices?.find((s) => s.id === serviceId);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Guest fields (shown only when user is not logged in)
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestErrors, setGuestErrors] = useState({ name: '', email: '' });

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

  // If no service, redirect appropriately
  if (!service) {
    // Could redirect or show error
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No service selected</p>
          <Button onClick={() => navigate(bookingFrom === 'services' ? '/services' : '/')}>
            Go to {bookingFrom === 'services' ? 'Services' : 'Home'}
          </Button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setSelectedTime(null); // Reset time when date changes

    // reset guest inputs when date changes
    setGuestName('');
    setGuestEmail('');
    setGuestErrors({ name: '', email: '' });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleRemoveSelection = () => {
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const getGuestValidationErrors = (nameInput = guestName, emailInput = guestEmail) => {
    const errors = { name: '', email: '' };
    const name = String(nameInput || '').trim();
    const email = String(emailInput || '').trim();

    if (!name) errors.name = 'Name is required.';
    else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

    const emailRe = /^\S+@\S+\.\S+$/;
    if (!email) errors.email = 'Email is required.';
    else if (!emailRe.test(email)) errors.email = 'Enter a valid email address.';

    return errors;
  };

  const validateGuest = () => {
    const errors = getGuestValidationErrors();
    setGuestErrors(errors);
    return !errors.name && !errors.email;
  };

  // Derived boolean (no hooks) — faster and avoids hook-order issues during HMR
  const errorsForCurrentInputs = getGuestValidationErrors(guestName, guestEmail);
  const isGuestFormValid = user ? true : !errorsForCurrentInputs.name && !errorsForCurrentInputs.email;

  const handleConfirmBooking = async () => {
    if (!service || !selectedDate || !selectedTime) {
      toast({
        title: 'Error',
        description: 'Please ensure all booking details are selected.',
        variant: 'destructive',
      });
      return;
    }

    // If guest, validate guest form
    if (!user) {
      const ok = validateGuest();
      if (!ok) {
        toast({
          title: 'Incomplete details',
          description: 'Please provide your name and a valid email to continue.',
          variant: 'destructive',
        });
        return;
      }
    }

    // Prepare booking data
    const customerId = user ? (user.id || user.uid || null) : null;
    const customerName = user
      ? user.displayName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.lastName || user.email || 'Customer')
      : guestName.trim();
    const customerEmail = user ? user.email : guestEmail.trim();

    const bookingData = {
      adminNote: '',
      categoryId: service.category?.id || null,
      categoryName: service.category?.name || service.category || 'General',
      customerId: customerId,
      customerName: customerName,
      customerEmail: customerEmail,
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
        
        // Reset selections + guest info
        setSelectedDate(null);
        setSelectedTime(null);
        setGuestName('');
        setGuestEmail('');
        setGuestErrors({ name: '', email: '' });
        
        // Redirect after a short delay to show the toast
        setTimeout(() => {
          navigate(bookingFrom === 'services' ? '/services' : '/');
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
                <div className="text-2xl font-bold text-foreground">Rs: {service.price}</div>
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
                {/* Guest info form for unauthenticated users */}
                {!user && (
                  <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Your details</h4>
                      <p className="text-sm text-muted-foreground">Provide your name and email to confirm the booking</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guestName">Full name</Label>
                        <Input
                          id="guestName"
                          type="text"
                          placeholder="Jane Doe"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className={guestErrors.name ? 'border-destructive' : ''}
                        />
                        {guestErrors.name && <p className="text-sm text-destructive">{guestErrors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guestEmail">Email</Label>
                        <Input
                          id="guestEmail"
                          type="email"
                          placeholder="you@example.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className={guestErrors.email ? 'border-destructive' : ''}
                        />
                        {guestErrors.email && <p className="text-sm text-destructive">{guestErrors.email}</p>}
                      </div>
                    </div>
                  </div>
                )}

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
                    disabled={isCreating || !isGuestFormValid}
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

