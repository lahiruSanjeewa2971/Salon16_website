import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-smooth border border-border"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-5 h-5"
      >
        {theme === 'light' ? (
          <Sun size={20} className="text-foreground" />
        ) : (
          <Moon size={20} className="text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

