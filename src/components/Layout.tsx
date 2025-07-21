
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Home, 
  FileText, 
  Users, 
  BookOpen, 
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { name: 'All Updates', href: '/', current: location.pathname === '/' },
    { name: 'Onboarding', href: '/onboarding', current: location.pathname === '/onboarding' },
    { name: 'Knowledge Base', href: '/knowledge-base', current: location.pathname === '/knowledge-base' },
  ];

  const adminItems = user?.role === 'admin' ? [
    { name: 'Members', href: '/members', current: location.pathname === '/members' },
    { name: 'Management', href: '/post-management', current: location.pathname === '/post-management' },
  ] : [];

  const allItems = [...navigationItems, ...adminItems];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getUserName = () => {
    return 'Ifeoluwa Ajetomobi';
  };

  const getUserInitials = () => {
    if (!user) return <User className="h-5 w-5 text-gray-600" />;
    return 'IA';
  };

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'management':
        navigate('/post-management');
        break;
      case 'members':
        navigate('/members');
        break;
      case 'logout':
        logout();
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-transparent border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section with search, logo, and profile */}
          <div className="flex justify-between items-center h-16">
            {/* Left side - Search */}
            <div className="flex items-center">
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Search className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Search posts, documents, or members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                        autoFocus
                      />
                    </div>
                    <Button type="submit" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Center - Logo */}
            <div className="flex items-center justify-center flex-1">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/lovable-uploads/0440891b-68c1-4039-8ea8-39b9a35ce2ea.png"
                  alt="FUNDiT"
                />
              </Link>
            </div>

            {/* Right side - Profile and Mobile menu button */}
            <div className="flex items-center space-x-4">
              {/* Profile dropdown - Desktop */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={getUserName()} />
                        <AvatarFallback>
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getUserName()}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email || 'user@company.com'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuClick('management')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Management</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuClick('members')}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Members</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuClick('logout')}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="text-gray-600"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:block border-t border-gray-100 pt-4 pb-4">
            <nav className="flex justify-center space-x-8">
              {allItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {allItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.current
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Profile Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user?.avatar} alt={getUserName()} />
                    <AvatarFallback>
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@company.com'}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => {
                      handleMenuClick('management');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Management
                  </button>
                  <button
                    onClick={() => {
                      handleMenuClick('members');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </button>
                  <button
                    onClick={() => {
                      handleMenuClick('logout');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
