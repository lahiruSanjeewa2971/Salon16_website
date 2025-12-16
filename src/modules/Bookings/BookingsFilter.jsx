import { useState } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BookingsFilter = ({ onFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      // Format date as YYYY-MM-DD for the filter
      const formattedDate = format(date, 'yyyy-MM-dd');
      onFilterChange(formattedDate);
      setIsOpen(false);
    }
  };

  const handleClearFilter = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    onFilterChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 p-3 sm:p-4 bg-card border border-border rounded-xl shadow-elegant"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Label Section */}
        <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
          <CalendarIcon className="text-primary flex-shrink-0" size={18} />
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Filter by Date:
          </label>
        </div>
        
        {/* Date Picker and Clear Button Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-auto sm:min-w-[240px] justify-start text-left font-normal",
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
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {selectedDate && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilter}
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[40px] sm:min-h-0"
            >
              <X size={16} />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingsFilter;

