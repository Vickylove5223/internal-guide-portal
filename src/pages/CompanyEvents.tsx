import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { SafeStorage } from '@/utils/storage';
import { logger } from '@/utils/logger';

interface Event {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
  author: string;
  image?: string;
}

const CompanyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load events from localStorage
  useEffect(() => {
    try {
      logger.info('Loading company events');
      const storedEvents = SafeStorage.get<Event[]>('events', []);
      setEvents(storedEvents);
      logger.info('Company events loaded successfully', { count: storedEvents.length });
    } catch (error) {
      logger.error('Failed to load company events', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [upcomingEvent, ...otherEvents] = events;

  const handleEventClick = (eventId: number) => {
    logger.info('Navigating to event detail', { eventId });
    navigate(`/post/${eventId}`);
  };

  const formatEventDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = date.getDate();
      const year = date.getFullYear();
      return { month, day, year };
    } catch (error) {
      logger.warn('Failed to format event date', { dateString, error });
      return { month: 'JAN', day: 1, year: 2024 };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="flex">
          <div className="flex-1 px-[100px] py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Events</h1>
              <p className="text-gray-600 mb-6">Loading events...</p>
              <div className="animate-pulse space-y-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 px-[100px] py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Events</h1>
            <p className="text-gray-600 mb-6">Upcoming events and team activities</p>
            
            {events.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
                  <p className="text-gray-600">Check back soon for upcoming company events and activities.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Featured Upcoming Event */}
                {upcomingEvent && (
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 h-40"
                    onClick={() => handleEventClick(upcomingEvent.id)}
                  >
                    <div className="flex h-full">
                      <div className="w-24 h-full flex-shrink-0 bg-blue-600 text-white flex flex-col items-center justify-center">
                        <div className="text-sm font-medium">{formatEventDate(upcomingEvent.date).month}</div>
                        <div className="text-2xl font-bold">{formatEventDate(upcomingEvent.date).day}</div>
                        <div className="text-sm">{formatEventDate(upcomingEvent.date).year}</div>
                      </div>
                      
                      {upcomingEvent.image && (
                        <div className="w-48 h-full flex-shrink-0">
                          <img 
                            src={upcomingEvent.image} 
                            alt={upcomingEvent.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 flex flex-col">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">UPCOMING</span>
                          </div>
                          <CardTitle className="text-2xl line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{upcomingEvent.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1">
                          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                            {upcomingEvent.content}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{upcomingEvent.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{upcomingEvent.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Organized by {upcomingEvent.author}</span>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Other Events */}
                {otherEvents.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">More Events</h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-6">
                        {otherEvents.map((event) => (
                          <Card 
                            key={event.id} 
                            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-transparent border-0 h-24"
                            onClick={() => handleEventClick(event.id)}
                          >
                            <div className="flex h-full">
                              <div className="w-20 h-full flex-shrink-0 bg-gray-600 text-white flex flex-col items-center justify-center rounded-l-lg">
                                <div className="text-xs font-medium">{formatEventDate(event.date).month}</div>
                                <div className="text-lg font-bold">{formatEventDate(event.date).day}</div>
                                <div className="text-xs">{formatEventDate(event.date).year}</div>
                              </div>
                              
                              {event.image && (
                                <div className="w-32 h-full flex-shrink-0">
                                  <img 
                                    src={event.image} 
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="flex-1 flex flex-col">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0 flex-1">
                                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                    {event.content}
                                  </p>
                                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{event.location}</span>
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <span>By {event.author}</span>
                                  </div>
                                </CardContent>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Sidebar */}
                      <div className="w-full lg:w-96">
                        <div className="sticky top-6">
                          <img
                            src="/lovable-uploads/3d5b1ac3-5c8f-49a4-b3bb-872eeb6148fe.png"
                            alt="Our Products"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEvents;
