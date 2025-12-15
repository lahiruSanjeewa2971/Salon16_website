import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingCard from './BookingCard';

const BookingsList = ({ bookings, onCancel, onDelete, onReschedule, isLoading, isDeleting }) => {
  const navigate = useNavigate();

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="mx-auto mb-4 text-muted-foreground" size={64} />
        <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Yet</h3>
        <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
        <Button onClick={() => navigate('/')}>Browse Services</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile: List View */}
      <div className="lg:hidden space-y-4">
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            index={index}
            onCancel={onCancel}
            onDelete={onDelete}
            onReschedule={onReschedule}
            isLoading={isLoading}
            isDeleting={isDeleting}
            isMobile={true}
          />
        ))}
      </div>

      {/* Desktop: Card Grid View */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            index={index}
            onCancel={onCancel}
            onDelete={onDelete}
            onReschedule={onReschedule}
            isLoading={isLoading}
            isDeleting={isDeleting}
            isMobile={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingsList;

