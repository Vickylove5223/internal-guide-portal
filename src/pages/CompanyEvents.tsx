import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const CompanyEvents = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 4,
      title: 'Quarterly Team Building Event',
      content: 'Join us for our quarterly team building event on January 25th. Activities include workshops, networking sessions, and celebration of team achievements.',
      author: 'Lisa Wang',
      date: '2024-01-25',
      time: '9:00 AM - 5:00 PM',
      location: 'Conference Center, Building A',
      attendees: 45,
      category: 'Company Events',
      image: '/lovable-uploads/ffe33128-72d3-4275-8536-d3aa5f60ceb6.png'
    },
    {
      id: 13,
      title: 'Annual Company Retreat 2024',
      content: 'Three-day company retreat featuring strategic planning sessions, team building activities, and recreational events in a beautiful mountain setting.',
      author: 'Sarah Johnson',
      date: '2024-02-15',
      time: '8:00 AM - 6:00 PM',
      location: 'Mountain View Resort',
      attendees: 120,
      category: 'Company Events',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
    },
    {
      id: 14,
      title: 'Q1 All-Hands Meeting',
      content: 'Quarterly all-hands meeting to review Q4 results, discuss Q1 goals, and celebrate team achievements. Includes presentations from each department.',
      author: 'Mike Chen',
      date: '2024-02-01',
      time: '2:00 PM - 4:00 PM',
      location: 'Main Auditorium',
      attendees: 200,
      category: 'Company Events'
    },
    {
      id: 15,
      title: 'Innovation Showcase',
      content: 'Annual innovation showcase where teams present their latest projects and innovative solutions. Includes demos, presentations, and networking.',
      author: 'Dr. Emily Chen',
      date: '2024-02-20',
      time: '10:00 AM - 3:00 PM',
      location: 'Innovation Lab',
      attendees: 80,
      category: 'Company Events'
    }
  ];

  const [upcomingEvent, ...otherEvents] = events;

  const handleEventClick = (eventId: number) => {
    navigate(`/post/${eventId}`);
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 px-[100px] py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Events</h1>
            <p className="text-gray-600 mb-6">Upcoming events and team activities</p>
            
            {/* Featured Upcoming Event */}
            {upcomingEvent && (
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                onClick={() => handleEventClick(upcomingEvent.id)}
              >
                <div className="flex">
                  <div className="w-24 h-32 flex-shrink-0 bg-blue-600 text-white flex flex-col items-center justify-center">
                    <div className="text-sm font-medium">{formatEventDate(upcomingEvent.date).month}</div>
                    <div className="text-2xl font-bold">{formatEventDate(upcomingEvent.date).day}</div>
                    <div className="text-sm">{formatEventDate(upcomingEvent.date).year}</div>
                  </div>
                  
                  {upcomingEvent.image && (
                    <div className="w-48 h-32 flex-shrink-0">
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
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{upcomingEvent.attendees} attending</span>
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
                        className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-transparent border-0"
                        onClick={() => handleEventClick(event.id)}
                      >
                        <div className="flex">
                          <div className="w-20 h-24 flex-shrink-0 bg-gray-600 text-white flex flex-col items-center justify-center rounded-l-lg">
                            <div className="text-xs font-medium">{formatEventDate(event.date).month}</div>
                            <div className="text-lg font-bold">{formatEventDate(event.date).day}</div>
                            <div className="text-xs">{formatEventDate(event.date).year}</div>
                          </div>
                          
                          {event.image && (
                            <div className="w-32 h-24 flex-shrink-0">
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
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{event.attendees}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEvents;
