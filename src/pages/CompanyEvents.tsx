import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import MobilePagination from '@/components/MobilePagination';
import { useNavigate } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useOffline } from '@/hooks/useOffline';
import { cache } from '@/utils/cache';
import { logger } from '@/utils/logger';

const CompanyEvents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const { isOnline } = useOffline();
  
  const ITEMS_PER_PAGE = 15;

  // Generate more events for pagination demo
  const generateEvents = () => {
    const baseEvents = [
      {
        id: 1,
        title: "Q4 All Hands Meeting",
        description: "Join us for our quarterly company-wide meeting to discuss achievements, goals, and upcoming initiatives.",
        date: "2024-01-15",
        time: "10:00 AM",
        location: "Main Conference Room",
        category: "Meeting",
        attendees: 45,
        status: "upcoming"
      },
      {
        id: 2,
        title: "Team Building Workshop",
        description: "Interactive workshop focused on improving team collaboration and communication skills.",
        date: "2024-01-20",
        time: "2:00 PM",
        location: "Training Center",
        category: "Training",
        attendees: 25,
        status: "upcoming"
      },
      {
        id: 3,
        title: "Holiday Party 2024",
        description: "Annual company holiday celebration with dinner, entertainment, and awards ceremony.",
        date: "2024-01-25",
        time: "6:00 PM",
        location: "Grand Ballroom",
        category: "Social",
        attendees: 120,
        status: "upcoming"
      },
      {
        id: 4,
        title: "Product Launch Presentation",
        description: "Unveiling our latest product features and roadmap for the upcoming quarter.",
        date: "2024-01-30",
        time: "11:00 AM",
        location: "Auditorium",
        category: "Meeting",
        attendees: 80,
        status: "upcoming"
      },
      {
        id: 5,
        title: "Safety Training Session",
        description: "Mandatory safety training covering workplace protocols and emergency procedures.",
        date: "2024-02-05",
        time: "9:00 AM",
        location: "Training Room A",
        category: "Training",
        attendees: 35,
        status: "upcoming"
      },
      {
        id: 6,
        title: "Industry Conference 2024",
        description: "Annual industry conference featuring keynote speakers and networking opportunities.",
        date: "2024-02-10",
        time: "8:00 AM",
        location: "Convention Center",
        category: "Conference",
        attendees: 200,
        status: "upcoming"
      }
    ];

    // Generate additional events for pagination
    const additionalEvents = [];
    const eventTypes = ["Workshop", "Meeting", "Training", "Conference", "Social"];
    const locations = ["Conference Room A", "Training Center", "Main Hall", "Auditorium", "Office 101"];
    
    for (let i = 7; i <= 25; i++) {
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      additionalEvents.push({
        id: i,
        title: `${randomType} ${i}`,
        description: `This is a sample ${randomType.toLowerCase()} event for demonstration purposes.`,
        date: `2024-0${Math.floor(Math.random() * 2) + 2}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        location: randomLocation,
        category: randomType,
        attendees: Math.floor(Math.random() * 100) + 10,
        status: "upcoming"
      });
    }

    return [...baseEvents, ...additionalEvents];
  };

  useEffect(() => {
    // Simulate loading with proper loading states
    const loadEvents = async () => {
      setIsLoading(true);
      
      try {
        const events = generateEvents();
        // Check cache first
        const cacheKey = 'company-events';
        const cachedEvents = cache.get(cacheKey);
        
        if (cachedEvents && isOnline) {
          logger.info('Loading events from cache');
          setAllEvents(cachedEvents as any[]);
          // Still show loading briefly for better UX
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          setAllEvents(events);
          // Cache the events
          cache.set(cacheKey, events, 10 * 60 * 1000); // 10 minutes
        }
      } catch (error) {
        logger.error('Failed to load events', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [isOnline]);

  // Calculate pagination
  const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = allEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Meeting: 'bg-blue-100 text-blue-800',
      Training: 'bg-green-100 text-green-800',
      Social: 'bg-purple-100 text-purple-800',
      Conference: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="h-10 w-full md:w-80 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <LoadingSkeleton type="card" count={3} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Events</h1>
          <p className="text-gray-600 mt-1">Stay updated with our latest events and activities</p>
        </div>
      </div>

      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">You're viewing cached events. Some information may not be up to date.</p>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {currentEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {event.title}
                    </CardTitle>
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(event.date)} at {event.time}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    RSVP
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentEvents.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">No events are currently scheduled.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <MobilePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CompanyEvents;
