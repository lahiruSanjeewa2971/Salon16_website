import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, X, CalendarClock, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BookingCard = ({ booking, index, onCancel, onDelete, onReschedule, isLoading, isDeleting, isMobile = false }) => {
  // Check if booking date and time have passed
  const isPastBooking = () => {
    const bookingDate = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':').map(Number);
    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    return bookingDateTime < now;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: 'Pending', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
      accepted: { text: 'Accepted', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
      rejected: { text: 'Rejected', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
      cancelled: { text: 'Cancelled', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const hasPassed = isPastBooking();
  
  // Check if cancelled booking is in the future (should show Remove button)
  const isCancelledFuture = () => {
    if (booking.status !== 'cancelled') return false;
    return !isPastBooking(); // If not past, it's future
  };
  
  const showRemoveForPending = booking.status === 'pending' && hasPassed;
  const showRemoveForCancelled = isCancelledFuture();

  const statusBadge = getStatusBadge(booking.status);

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-card border border-border rounded-xl p-4 space-y-3"
      >
        {/* Service Name & Status */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{booking.serviceName}</h3>
            <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border', statusBadge.color)}>
              {statusBadge.text}
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span>{formatDate(booking.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span>{formatTime(booking.time)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign size={16} />
            <span className="font-semibold text-foreground">${booking.servicePrice}</span>
          </div>
        </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCancel(booking.id)}
                            disabled={isLoading}
                            className="flex-1"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </Button>
                          {showRemoveForPending ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDelete(booking.id)}
                              disabled={isDeleting}
                              className="flex-1"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader2 size={16} className="mr-2 animate-spin" />
                                  Removing...
                                </>
                              ) : (
                                <>
                                  <Trash2 size={16} className="mr-2" />
                                  Remove
                                </>
                              )}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onReschedule(booking.id)}
                              disabled
                              className="flex-1"
                            >
                              <CalendarClock size={16} className="mr-2" />
                              Reschedule
                            </Button>
                          )}
                        </>
                      )}
                      {booking.status === 'rejected' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(booking.id)}
                          disabled={isDeleting}
                          className="w-full"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 size={16} className="mr-2 animate-spin" />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 size={16} className="mr-2" />
                              Remove
                            </>
                          )}
                        </Button>
                      )}
                      {showRemoveForCancelled && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(booking.id)}
                          disabled={isDeleting}
                          className="w-full"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 size={16} className="mr-2 animate-spin" />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 size={16} className="mr-2" />
                              Remove
                            </>
                          )}
                        </Button>
                      )}
                    </div>
      </motion.div>
    );
  }

  // Desktop view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow"
    >
      {/* Service Name & Status */}
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-foreground flex-1">{booking.serviceName}</h3>
        <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border', statusBadge.color)}>
          {statusBadge.text}
        </div>
      </div>

      {/* Date & Time */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Calendar size={18} />
          <span className="text-sm">{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Clock size={18} />
          <span className="text-sm">{formatTime(booking.time)}</span>
          <span className="text-xs">({booking.serviceDuration} min)</span>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign size={18} className="text-muted-foreground" />
          <span className="text-lg font-bold text-foreground">${booking.servicePrice}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        {booking.status === 'pending' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.id)}
              disabled={isLoading}
              className="flex-1"
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            {showRemoveForPending ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(booking.id)}
                disabled={isDeleting}
                className="flex-1"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} className="mr-2" />
                    Remove
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReschedule(booking.id)}
                disabled
                className="flex-1"
              >
                <CalendarClock size={16} className="mr-2" />
                Reschedule
              </Button>
            )}
          </>
        )}
        {booking.status === 'rejected' && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(booking.id)}
            disabled={isDeleting}
            className="w-full"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" />
                Remove
              </>
            )}
          </Button>
        )}
        {showRemoveForCancelled && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(booking.id)}
            disabled={isDeleting}
            className="w-full"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" />
                Remove
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default BookingCard;

