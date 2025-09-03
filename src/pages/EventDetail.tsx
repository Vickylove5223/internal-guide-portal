import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample events data (this would normally come from an API or context)
  const events = [
    {
      id: 1,
      title: "Q4 All Hands Meeting",
      description: "Join us for our quarterly company-wide meeting to discuss achievements, goals, and upcoming initiatives. This comprehensive meeting will cover our Q4 performance metrics, upcoming strategic initiatives for the next quarter, and provide an opportunity for team members to ask questions and share feedback.",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Main Conference Room",
      category: "Meeting",
      attendees: 45,
      status: "upcoming",
      organizer: "HR Department",
      agenda: [
        "Q4 Performance Review",
        "Strategic Initiatives for Q1 2024",
        "Team Announcements",
        "Q&A Session"
      ]
    },
    {
      id: 2,
      title: "Team Building Workshop",
      description: "Interactive workshop focused on improving team collaboration and communication skills. This hands-on session will include group exercises, team challenges, and practical strategies for enhancing workplace relationships.",
      date: "2024-01-20",
      time: "2:00 PM",
      location: "Training Center",
      category: "Training",
      attendees: 25,
      status: "upcoming",
      organizer: "Training Department",
      agenda: [
        "Icebreaker Activities",
        "Communication Exercises",
        "Problem-Solving Challenges",
        "Action Planning"
      ]
    },
    {
      id: 3,
      title: "Holiday Party 2024",
      description: "Annual company holiday celebration with dinner, entertainment, and awards ceremony. Join us for an evening of fun, recognition, and celebration of our achievements throughout the year.",
      date: "2024-01-25",
      time: "6:00 PM",
      location: "Grand Ballroom",
      category: "Social",
      attendees: 120,
      status: "upcoming",
      organizer: "Events Committee",
      agenda: [
        "Welcome Reception",
        "Dinner Service",
        "Awards Ceremony",
        "Entertainment & Dancing"
      ]
    },
    {
      id: 4,
      title: "Product Launch Presentation",
      description: "Unveiling our latest product features and roadmap for the upcoming quarter. Get an exclusive first look at our new offerings and learn about the strategic direction for our product line.",
      date: "2024-01-30",
      time: "11:00 AM",
      location: "Auditorium",
      category: "Meeting",
      attendees: 80,
      status: "upcoming",
      organizer: "Product Team",
      agenda: [
        "Product Demo",
        "Feature Overview",
        "Roadmap Presentation",
        "Market Strategy Discussion"
      ]
    },
    {
      id: 5,
      title: "Safety Training Session",
      description: "Mandatory safety training covering workplace protocols and emergency procedures. This essential training ensures all team members are prepared for various workplace scenarios.",
      date: "2024-02-05",
      time: "9:00 AM",
      location: "Training Room A",
      category: "Training",
      attendees: 35,
      status: "upcoming",
      organizer: "Safety Committee",
      agenda: [
        "Workplace Safety Protocols",
        "Emergency Procedures",
        "Equipment Guidelines",
        "Certification Quiz"
      ]
    },
    {
      id: 6,
      title: "Industry Conference 2024",
      description: "Annual industry conference featuring keynote speakers and networking opportunities. Connect with industry leaders and gain insights into the latest trends and innovations.",
      date: "2024-02-10",
      time: "8:00 AM",
      location: "Convention Center",
      category: "Conference",
      attendees: 200,
      status: "upcoming",
      organizer: "External Relations",
      agenda: [
        "Keynote Presentations",
        "Panel Discussions",
        "Networking Sessions",
        "Closing Remarks"
      ]
    }
  ];

  const event = events.find(e => e.id === parseInt(id || '0'));

  if (!event) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/company-events')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/company-events')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>

      {/* Event Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                {event.title}
              </CardTitle>
              <Badge className={getCategoryColor(event.category)} variant="secondary">
                {event.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Event Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{formatDate(event.date)}</p>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Attendees</p>
                <p className="font-medium">{event.attendees} registered</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Organizer */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Organizer</h3>
            <p className="text-gray-700">{event.organizer}</p>
          </div>

          {/* Agenda */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Agenda</h3>
            <ul className="space-y-2">
              {event.agenda.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              RSVP to Event
            </Button>
            <Button variant="outline">
              Add to Calendar
            </Button>
            <Button variant="outline">
              Share Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;