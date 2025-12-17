import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fetchUserBookings, cancelBooking, deleteBooking } from '@/features/bookings/bookingThunk';
import ScreenSkeleton from '@/components/common/ScreenSkeleton';
import BookingsList from './BookingsList';
import BookingsFilter from './BookingsFilter';

const Bookings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const { userBookings, isLoading, isDeleting } = useAppSelector((state) => state.bookings);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch user bookings on mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [dispatch, user?.id]);

  // Filter and sort bookings by date and time (latest first)
  const filteredAndSortedBookings = useMemo(() => {
    if (!userBookings || userBookings.length === 0) return [];

    // Apply filters
    let filtered = userBookings;

    // Filter by date if filterDate is set
    if (filterDate) {
      filtered = filtered.filter((booking) => {
        // Compare dates only (ignore time)
        const bookingDate = new Date(booking.date);
        const filterDateObj = new Date(filterDate);
        
        // Set both to start of day for comparison
        bookingDate.setHours(0, 0, 0, 0);
        filterDateObj.setHours(0, 0, 0, 0);
        
        return bookingDate.getTime() === filterDateObj.getTime();
      });
    }

    // Filter by status if filterStatus is set
    if (filterStatus) {
      filtered = filtered.filter((booking) => {
        return booking.status === filterStatus;
      });
    }

    // Sort by date and time (latest first)
    return [...filtered].sort((a, b) => {
      // First, compare dates
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (dateA.getTime() !== dateB.getTime()) {
        // If dates are different, sort by date (descending - latest first)
        return dateB.getTime() - dateA.getTime();
      }
      
      // If dates are the same, sort by time (descending - latest first)
      const [hoursA, minutesA] = a.time.split(':').map(Number);
      const [hoursB, minutesB] = b.time.split(':').map(Number);
      const timeA = hoursA * 60 + minutesA; // Convert to minutes for easy comparison
      const timeB = hoursB * 60 + minutesB;
      
      return timeB - timeA;
    });
  }, [userBookings, filterDate, filterStatus]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const result = await dispatch(cancelBooking(bookingId));
      if (cancelBooking.fulfilled.match(result)) {
        toast({
          title: 'Booking Cancelled',
          description: 'Your booking has been cancelled successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.payload || 'Failed to cancel booking.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const result = await dispatch(deleteBooking(bookingId));
      if (deleteBooking.fulfilled.match(result)) {
        toast({
          title: 'Booking Removed',
          description: 'The rejected booking has been removed.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.payload || 'Failed to remove booking.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleRescheduleBooking = (bookingId) => {
    // TODO: Implement reschedule logic
    console.log('Reschedule booking:', bookingId);
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please login to view your bookings</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your service bookings</p>
          </div>
          <ScreenSkeleton
            layout="default"
            showTitle={true}
            showDescription={true}
            showForm={false}
            showGrid={false}
            className="space-y-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your service bookings</p>
        </div>

        {/* Filters */}
        {!isLoading && userBookings.length > 0 && (
          <BookingsFilter 
            onDateFilterChange={setFilterDate}
            onStatusFilterChange={setFilterStatus}
            selectedDate={filterDate}
            selectedStatus={filterStatus}
          />
        )}

        {/* Bookings List */}
        <BookingsList
          bookings={filteredAndSortedBookings}
          onCancel={handleCancelBooking}
          onDelete={handleDeleteBooking}
          onReschedule={handleRescheduleBooking}
          isLoading={isLoading}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default Bookings;

