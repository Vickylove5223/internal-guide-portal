
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
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
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
  Search,
  MessageSquare,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/contexts/CategoryContext';
import { ManageCategoriesModal, getDefaultCategories } from '@/components/ManageCategoriesModal';

interface LayoutProps {
  children: React.ReactNode;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

const Layout = ({ children, onCategorySelect, selectedCategory }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = categories.map(cat => ({
    name: cat.name,
    href: `/${cat.slug}`,
    slug: cat.slug,
    current: selectedCategory === cat.slug,
  }));

  const allItems = navigationItems;

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
      case 'suggestions':
        navigate('/suggestions');
        break;
      case 'knowledge-base':
        navigate('/knowledge-base');
        break;
      case 'suggestion-box':
        navigate('/suggestion-box');
        break;
      case 'login':
        navigate('/sign-in');
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-transparent border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section with search, logo, and mobile menu */}
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

            {/* Right side - Mobile Menu */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuItem onClick={() => handleMenuClick('knowledge-base')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Knowledge Base</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMenuClick('suggestion-box')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Suggestion Box</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{getUserName()}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || 'user@company.com'}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {user?.role === 'admin' && (
                        <>
                          <DropdownMenuItem onClick={() => handleMenuClick('management')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Management</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMenuClick('members')}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Members</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem onClick={() => handleMenuClick('logout')}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => handleMenuClick('login')}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:block border-t-2 border-gray-300 pt-4 pb-4">
            <nav className="flex justify-center space-x-8">
              {allItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCategorySelect && onCategorySelect(item.slug)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === item.slug
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile/Tablet Navigation Carousel */}
          <div className="md:hidden border-t-2 border-gray-300 pt-4 pb-4">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {allItems.map((item) => (
                  <CarouselItem key={item.name} className="pl-2 md:pl-4 basis-auto">
                    <button
                      onClick={() => onCategorySelect && onCategorySelect(item.slug)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap block ${
                        selectedCategory === item.slug
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 FUNDiT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
