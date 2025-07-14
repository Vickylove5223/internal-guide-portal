
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Briefcase,
  Star,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';

const CompanyNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const newsItems = [
    {
      id: 1,
      title: 'Company Reaches 1 Million Customers Milestone',
      content: 'We are thrilled to announce that our company has reached a significant milestone of serving over 1 million customers worldwide. This achievement represents years of hard work, innovation, and dedication from our entire team.',
      category: 'company-news',
      author: 'Marketing Team',
      publishedAt: '2024-01-15T14:30:00Z',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png',
      views: 1250,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: 'New Product Launch: AI-Powered Dashboard',
      content: 'Today we announced the launch of our revolutionary AI-powered dashboard that will transform how businesses analyze their data. The new platform combines machine learning with intuitive design.',
      category: 'company-news',
      author: 'Product Team',
      publishedAt: '2024-01-14T10:00:00Z',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png',
      views: 892,
      comments: 15,
      featured: false
    },
    {
      id: 3,
      title: 'Team Building Retreat 2024',
      content: 'Our annual team building retreat was a huge success! Teams participated in various activities, workshops, and collaborative sessions that strengthened our company culture.',
      category: 'events',
      author: 'HR Team',
      publishedAt: '2024-01-12T16:45:00Z',
      image: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png',
      views: 567,
      comments: 31,
      featured: false
    },
    {
      id: 4,
      title: 'Q4 Financial Results Exceed Expectations',
      content: 'We are pleased to report that our Q4 financial results have exceeded expectations, with a 25% increase in revenue compared to the previous quarter.',
      category: 'finance',
      author: 'Finance Team',
      publishedAt: '2024-01-10T09:15:00Z',
      image: null,
      views: 734,
      comments: 8,
      featured: false
    },
    {
      id: 5,
      title: 'Government Policy Changes Affecting Business',
      content: 'Recent policy changes in government regulations will impact how we operate in the coming quarters. Our legal team has prepared a comprehensive analysis.',
      category: 'politics-news',
      author: 'Legal Team',
      publishedAt: '2024-01-08T11:20:00Z',
      image: null,
      views: 456,
      comments: 12,
      featured: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'All-Hands Company Meeting',
      date: '2024-01-25',
      time: '14:00',
      location: 'Main Conference Room',
      attendees: 156,
      description: 'Quarterly review and planning session'
    },
    {
      id: 2,
      title: 'Product Demo Day',
      date: '2024-01-28',
      time: '10:00',
      location: 'Innovation Lab',
      attendees: 45,
      description: 'Showcase of latest product features'
    },
    {
      id: 3,
      title: 'New Employee Orientation',
      date: '2024-02-01',
      time: '09:00',
      location: 'Training Room B',
      attendees: 12,
      description: 'Welcome session for new team members'
    },
    {
      id: 4,
      title: 'Monthly Social Hour',
      date: '2024-02-03',
      time: '17:00',
      location: 'Office Lounge',
      attendees: 89,
      description: 'Casual networking and team bonding'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'events': return Calendar;
      case 'politics-news': return Briefcase;
      case 'finance': return Trophy;
      case 'company-news': return Star;
      default: return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'events': return 'bg-green-100 text-green-800';
      case 'politics-news': return 'bg-red-100 text-red-800';
      case 'finance': return 'bg-purple-100 text-purple-800';
      case 'company-news': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            General Info
          </h1>
          <p className="text-gray-600">Stay updated with the latest company news and upcoming events</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search news and events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest News</CardTitle>
              <CardDescription>Recent updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="politics-news">Politics News</TabsTrigger>
                  <TabsTrigger value="finance">Finance</TabsTrigger>
                  <TabsTrigger value="company-news">Company News</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                  <div className="space-y-6">
                    {filteredNews.map((item) => {
                      const CategoryIcon = getCategoryIcon(item.category);
                      return (
                        <Card key={item.id} className={`hover:shadow-md transition-shadow ${item.featured ? 'border-primary' : ''}`}>
                          {item.featured && (
                            <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                              Featured
                            </div>
                          )}
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <CategoryIcon className="h-4 w-4 text-gray-600" />
                                  <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                                    {item.category.replace('-', ' ')}
                                  </Badge>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-500">{formatDate(item.publishedAt)}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-700 mb-4">{item.content}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                      <Eye className="h-4 w-4 mr-1" />
                                      {item.views}
                                    </span>
                                    <span className="flex items-center">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      {item.comments}
                                    </span>
                                    <span>By {item.author}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-2" />
                                      Read More
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Don't miss these events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatEventDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  <Button size="sm" className="w-full mt-3">
                    RSVP
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">News Articles</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Events Hosted</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Views</span>
                <span className="font-semibold">3,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="font-semibold text-green-600">+15%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyNews;
