import { motion } from 'framer-motion';
import { Calendar, Lock, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DayCard = ({ date, salonHours, isSelected, onClick, isPast }) => {
  const dateString = date.toISOString().split('T')[0];
  const dayData = salonHours?.find((h) => h.id === dateString);
  const dayOfWeek = date.getDay();
  const isTuesday = dayOfWeek === 2;

  // Determine day status
  const getDayStatus = () => {
    if (isPast) return 'past';
    if (isTuesday && !dayData) return 'tuesday-closed';
    if (dayData?.isClosed) return 'closed';
    if (dayData?.isHoliday) return 'holiday';
    if (dayData?.disableBookings) return 'booking-disabled';
    return 'available';
  };

  const status = getDayStatus();
  const isBookable = status === 'available';

  // Format day name and date
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });

  // Get time range
  const getTimeRange = () => {
    if (!isBookable) return null;
    const openTime = dayData?.openTime || '08:30';
    const closeTime = dayData?.closeTime || '21:00';
    return `${openTime} - ${closeTime}`;
  };

  const timeRange = getTimeRange();

  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'closed':
      case 'tuesday-closed':
        return { text: 'Closed', icon: XCircle, color: 'bg-red-500/10 text-red-600 border-red-500/20' };
      case 'holiday':
        return { text: 'Holiday', icon: AlertCircle, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' };
      case 'booking-disabled':
        return { text: 'No Bookings', icon: Lock, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' };
      case 'available':
        return { text: 'Available', icon: Calendar, color: 'bg-green-500/10 text-green-600 border-green-500/20' };
      default:
        return { text: 'Past', icon: XCircle, color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' };
    }
  };

  const badge = getStatusBadge();
  const BadgeIcon = badge.icon;

  const handleClick = () => {
    if (!isBookable) {
      // Will be handled by parent with toast
      return;
    }
    onClick?.(dateString, status);
  };

  return (
    <motion.div
      whileHover={isBookable ? { scale: 1.05, y: -4 } : {}}
      whileTap={isBookable ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={cn(
        'relative min-w-[120px] sm:min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-primary bg-primary/5 shadow-lg'
          : isBookable
          ? 'border-border hover:border-primary/50 bg-card hover:bg-primary/5'
          : 'border-border/50 bg-muted/50 cursor-not-allowed opacity-75',
        !isBookable && 'hover:opacity-100'
      )}
    >
      {/* Day Header */}
      <div className="text-center mb-3">
        <div className="text-xs font-medium text-muted-foreground mb-1">{dayName}</div>
        <div className="text-2xl font-bold text-foreground">{dayNumber}</div>
        <div className="text-xs text-muted-foreground">{monthName}</div>
      </div>

      {/* Time Range */}
      {timeRange && (
        <div className="text-xs text-center text-muted-foreground mb-2 font-medium">
          {timeRange}
        </div>
      )}

      {/* Status Badge */}
      <div
        className={cn(
          'flex items-center justify-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border',
          badge.color
        )}
      >
        <BadgeIcon size={12} />
        <span>{badge.text}</span>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DayCard;

