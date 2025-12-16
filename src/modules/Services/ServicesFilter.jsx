import { useState } from 'react';
import { Filter as FilterIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';

const ServicesFilter = ({ onFilterChange }) => {
  const { categories, isLoading: categoriesLoading } = useAppSelector((state) => state.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categoryId) => {
    if (categoryId === selectedCategoryId) {
      // If clicking the same category, clear the filter
      setSelectedCategoryId(null);
      onFilterChange(null);
    } else {
      setSelectedCategoryId(categoryId);
      onFilterChange(categoryId);
    }
    setIsOpen(false);
  };

  const handleClearFilter = (e) => {
    e.stopPropagation();
    setSelectedCategoryId(null);
    onFilterChange(null);
  };

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

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
          <FilterIcon className="text-primary flex-shrink-0" size={18} />
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Filter by Category:
          </label>
        </div>
        
        {/* Category Picker and Clear Button Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-auto sm:min-w-[240px] justify-start text-left font-normal",
                  !selectedCategory && "text-muted-foreground"
                )}
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                {selectedCategory ? (
                  selectedCategory.name
                ) : (
                  <span>Select a category</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>
                    {categoriesLoading ? 'Loading categories...' : 'No categories found.'}
                  </CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => handleCategorySelect(category.id)}
                        className={cn(
                          "cursor-pointer",
                          selectedCategoryId === category.id && "bg-accent"
                        )}
                      >
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          {selectedCategoryId && (
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

export default ServicesFilter;

