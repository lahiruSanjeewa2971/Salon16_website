import { motion } from 'framer-motion';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { useState } from 'react';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  // Placeholder state - will be replaced with actual auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAuthenticated(false)}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth text-sm font-medium w-full ${isMobile ? '' : 'w-auto'}`}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </motion.button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {/* Handle login */}}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-secondary transition-smooth text-sm font-medium ${isMobile ? 'w-full' : ''}`}
      >
        <LogIn size={16} />
        <span>Login</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {/* Handle register */}}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white hover:shadow-glow transition-smooth text-sm font-medium ${isMobile ? 'w-full' : ''}`}
      >
        <UserPlus size={16} />
        <span>Register</span>
      </motion.button>
    </div>
  );
};

export default AuthButtons;

