import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, X, Filter as FilterIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BookingsFilter = ({ onDateFilterChange, onStatusFilterChange, selectedDate: externalSelectedDate, selectedStatus: externalSelectedStatus }) => {
  const [selectedDate, setSelectedDate] = useState(externalSelectedDate ? new Date(externalSelectedDate) : null);
  const [selectedStatus, setSelectedStatus] = useState(externalSelectedStatus || '');
  const [isDateOpenDesktop, setIsDateOpenDesktop] = useState(false);
  const [isDateOpenMobile, setIsDateOpenMobile] = useState(false);

  // Sync internal state with external props when they change
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(new Date(externalSelectedDate));
    } else {
      setSelectedDate(null);
    }
  }, [externalSelectedDate]);

  useEffect(() => {
    setSelectedStatus(externalSelectedStatus || '');
  }, [externalSelectedStatus]);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleDateSelect = (date, isMobile = false) => {
    if (date) {
      setSelectedDate(date);
      // Format date as YYYY-MM-DD for the filter
      const formattedDate = format(date, 'yyyy-MM-dd');
      onDateFilterChange(formattedDate);
      if (isMobile) {
        setIsDateOpenMobile(false);
      } else {
        setIsDateOpenDesktop(false);
      }
    } else {
      // Close popover if date is undefined (clicked outside)
      if (isMobile) {
        setIsDateOpenMobile(false);
      } else {
        setIsDateOpenDesktop(false);
      }
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    onStatusFilterChange(status);
  };

  const handleClearStatus = (e) => {
    e.stopPropagation();
    setSelectedStatus('');
    onStatusFilterChange('');
  };

  const handleClearDate = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    onDateFilterChange('');
    if (isDateOpenDesktop) setIsDateOpenDesktop(false);
    if (isDateOpenMobile) setIsDateOpenMobile(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 space-y-4"
    >
      {/* Status Filter - Mobile: Above, Desktop: Inline with date */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="p-3 sm:p-4 bg-card border border-border rounded-xl shadow-elegant sm:hidden"
      >
        <div className="flex flex-col gap-3">
          {/* Label Section */}
          <div className="flex items-center gap-2">
            <FilterIcon className="text-primary flex-shrink-0" size={18} />
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Filter by Status:
            </label>
          </div>
          
          {/* Status Select */}
          <div className="relative w-full">
            <Select value={selectedStatus} onValueChange={handleStatusSelect}>
              <SelectTrigger className={cn(
                "w-full pr-10",
                selectedStatus && "[&_svg]:hidden"
              )}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedStatus && (
              <button
                type="button"
                onClick={handleClearStatus}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors z-10"
                aria-label="Clear status filter"
              >
                <X size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Desktop: Combined Filter Container */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="hidden sm:block p-3 sm:p-4 bg-card border border-border rounded-xl shadow-elegant"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Label Section */}
          <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
            <FilterIcon className="text-primary flex-shrink-0" size={18} />
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Filters:
            </label>
          </div>
          
          {/* Filters and Clear Button Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
            {/* Status Filter - Desktop: Before Date */}
            <div className="relative w-full sm:w-auto sm:min-w-[180px]">
              <Select value={selectedStatus} onValueChange={handleStatusSelect}>
                <SelectTrigger className={cn(
                  "w-full sm:w-auto sm:min-w-[180px] pr-10",
                  selectedStatus && "[&_svg]:hidden"
                )}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStatus && (
                <button
                  type="button"
                  onClick={handleClearStatus}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors z-10"
                  aria-label="Clear status filter"
                >
                  <X size={14} className="text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Date Picker */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Popover open={isDateOpenDesktop} onOpenChange={setIsDateOpenDesktop}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full sm:w-auto sm:min-w-[240px] justify-start text-left font-normal pr-8",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => handleDateSelect(date, false)}
                  initialFocus
                  classNames={{
                    day_selected: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-semibold",
                  }}
                />
              </PopoverContent>
              </Popover>
              {selectedDate && (
                <button
                  type="button"
                  onClick={handleClearDate}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors"
                  aria-label="Clear date filter"
                >
                  <X size={14} className="text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Date Filter - Mobile: Below Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-3 sm:p-4 bg-card border border-border rounded-xl shadow-elegant sm:hidden"
      >
        <div className="flex flex-col gap-3">
          {/* Label Section */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-primary flex-shrink-0" size={18} />
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Filter by Date:
            </label>
          </div>
          
          {/* Date Picker */}
          <div className="relative w-full">
            <Popover open={isDateOpenMobile} onOpenChange={setIsDateOpenMobile}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal pr-8",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => handleDateSelect(date, true)}
                  initialFocus
                  classNames={{
                    day_selected: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-semibold",
                  }}
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <button
                type="button"
                onClick={handleClearDate}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors"
                aria-label="Clear date filter"
              >
                <X size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingsFilter;

