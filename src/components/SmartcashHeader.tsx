
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const SmartcashHeader = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAuthPage = ['/sign-in', '/reset-password', '/otp-verification', '/set-new-password'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-light">
      {!isAuthPage && (
        <>
          {/* Desktop Header */}
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/0440891b-68c1-4039-8ea8-39b9a35ce2ea.png" 
                      alt="FUNDiT" 
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 p-1">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-smartcash-blue text-white text-sm">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>
        </>
      )}

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default SmartcashHeader;
