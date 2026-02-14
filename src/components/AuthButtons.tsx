import { motion } from 'framer-motion';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/features/auth/authThunk';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user, isLoading } = useAppSelector((state: any) => state.auth);
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
      navigate('/');
    } else {
      toast({
        title: 'Logout failed',
        description: (result as any)?.payload || 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  if (isAuthenticated) {
    if (!isMobile) {
      // Desktop: show user dropdown
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-smooth"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </span>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoading}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Mobile: simple logout button
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth text-sm font-medium w-full"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </motion.button>
    );
  }

  // Not authenticated
  return (
    <div className={`flex items-center gap-2 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
      <Link to="/login" className={isMobile ? 'w-full' : ''}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-secondary transition-smooth text-sm font-medium ${isMobile ? 'w-full' : ''}`}
        >
          <LogIn size={16} />
          <span>Login</span>
        </motion.button>
      </Link>
      <Link to="/register" className={isMobile ? 'w-full' : ''}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white hover:shadow-glow transition-smooth text-sm font-medium ${isMobile ? 'w-full' : ''}`}
        >
          <UserPlus size={16} />
          <span>Register</span>
        </motion.button>
      </Link>
    </div>
  );
};

export default AuthButtons;

