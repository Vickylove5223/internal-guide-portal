import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useOffline } from '@/hooks/useOffline';
import { cache } from '@/utils/cache';
import { logger } from '@/utils/logger';

const CompanyEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline } = useOffline();

  const events = [
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

  useEffect(() => {
    // Simulate loading with proper loading states
    const loadEvents = async () => {
      setIsLoading(true);
      
      try {
        // Check cache first
        const cacheKey = 'company-events';
        const cachedEvents = cache.get(cacheKey);
        
        if (cachedEvents && isOnline) {
          logger.info('Loading events from cache');
          // Still show loading briefly for better UX
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <Button onClick={() => navigate('/create-event')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="all">All Categories</option>
          <option value="Meeting">Meetings</option>
          <option value="Training">Training</option>
          <option value="Social">Social Events</option>
          <option value="Conference">Conferences</option>
        </select>
      </div>

      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">You're viewing cached events. Some information may not be up to date.</p>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {event.title}
                </CardTitle>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-3">
                {event.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(event.date)} at {event.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  RSVP
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No events are currently scheduled.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyEvents;
