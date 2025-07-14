
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Megaphone, 
  Newspaper, 
  BookOpen, 
  Users, 
  Calendar,
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Documents', value: '1,247', icon: FileText, change: '+12%' },
    { name: 'Active Members', value: '156', icon: Users, change: '+3%' },
    { name: 'Announcements', value: '23', icon: Megaphone, change: '+8%' },
    { name: 'Upcoming Events', value: '5', icon: Calendar, change: '+2%' },
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: 'Q4 Company All-Hands Meeting',
      excerpt: 'Join us for our quarterly review and planning session...',
      time: '2 hours ago',
      priority: 'high',
      department: 'Company-wide'
    },
    {
      id: 2,
      title: 'New Health Benefits Package',
      excerpt: 'We are excited to announce enhanced health benefits...',
      time: '1 day ago',
      priority: 'medium',
      department: 'HR'
    },
    {
      id: 3,
      title: 'IT System Maintenance',
      excerpt: 'Scheduled maintenance on Saturday night...',
      time: '2 days ago',
      priority: 'low',
      department: 'IT'
    }
  ];

  const recentDocs = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      department: 'HR',
      lastUpdated: '3 hours ago',
      status: 'Updated'
    },
    {
      id: 2,
      title: 'Security Guidelines',
      department: 'IT',
      lastUpdated: '1 day ago',
      status: 'New'
    },
    {
      id: 3,
      title: 'Sales Process Documentation',
      department: 'Sales',
      lastUpdated: '2 days ago',
      status: 'Updated'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Building Event',
      date: 'Tomorrow, 2:00 PM',
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Product Launch Meeting',
      date: 'Dec 20, 10:00 AM',
      location: 'Virtual'
    },
    {
      id: 3,
      title: 'Holiday Party',
      date: 'Dec 22, 6:00 PM',
      location: 'Office Lounge'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your company.</p>
        </div>
        <div className="flex space-x-3">
          <Button size="sm" variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Recent Activity
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Announcements */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2" />
                Recent Announcements
              </CardTitle>
              <CardDescription>Latest company announcements</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/announcements">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                      <Badge 
                        variant={announcement.priority === 'high' ? 'destructive' : 
                               announcement.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{announcement.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{announcement.time}</span>
                      <span>•</span>
                      <span>{announcement.department}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Don't miss these events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                <p className="text-xs text-gray-500">{event.location}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/company-news">View All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Updated Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recently Updated Documents
            </CardTitle>
            <CardDescription>Latest document updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{doc.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">{doc.department}</Badge>
                    <span className="text-xs text-gray-500">{doc.lastUpdated}</span>
                  </div>
                </div>
                <Badge 
                  variant={doc.status === 'New' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {doc.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/knowledge-base">Browse Knowledge Base</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="ghost" asChild>
              <Link to="/onboarding">
                <BookOpen className="h-4 w-4 mr-2" />
                View Onboarding Guide
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="ghost" asChild>
              <Link to="/knowledge-base">
                <FileText className="h-4 w-4 mr-2" />
                Search Documents
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="ghost" asChild>
              <Link to="/members">
                <Users className="h-4 w-4 mr-2" />
                View Team Directory
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="ghost" asChild>
              <Link to="/company-news">
                <Newspaper className="h-4 w-4 mr-2" />
                Read Company News
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
