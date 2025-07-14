
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Megaphone, 
  Newspaper, 
  BookOpen, 
  Calendar,
  FileText,
  Eye,
  User
} from 'lucide-react';

const Dashboard = () => {
  // Combined all updates from different sources
  const allUpdates = [
    {
      id: 1,
      type: 'announcement',
      title: 'Q4 Company All-Hands Meeting',
      excerpt: 'Join us for our quarterly review and planning session...',
      author: 'Sarah Johnson',
      department: 'Company-wide',
      priority: 'high',
      publishedAt: '2024-01-15T10:00:00Z',
      views: 234,
      icon: Megaphone
    },
    {
      id: 2,
      type: 'announcement',
      title: 'New Health Benefits Package',
      excerpt: 'We are excited to announce enhanced health benefits...',
      author: 'Mike Chen',
      department: 'HR',
      priority: 'medium',
      publishedAt: '2024-01-14T15:30:00Z',
      views: 189,
      icon: Megaphone
    },
    {
      id: 3,
      type: 'news',
      title: 'Company Wins Industry Award',
      excerpt: 'We are proud to announce that our company has been recognized...',
      author: 'Emma Wilson',
      department: 'Company-wide',
      priority: 'high',
      publishedAt: '2024-01-13T09:00:00Z',
      views: 456,
      icon: Newspaper
    },
    {
      id: 4,
      type: 'event',
      title: 'Team Building Event',
      excerpt: 'Join us for a fun-filled day of team building activities...',
      author: 'Alex Rodriguez',
      department: 'HR',
      priority: 'medium',
      publishedAt: '2024-01-12T14:00:00Z',
      views: 167,
      icon: Calendar
    },
    {
      id: 5,
      type: 'document',
      title: 'Employee Handbook 2024',
      excerpt: 'Updated employee handbook with new policies and procedures...',
      author: 'David Kim',
      department: 'HR',
      priority: 'medium',
      publishedAt: '2024-01-11T11:00:00Z',
      views: 298,
      icon: FileText
    },
    {
      id: 6,
      type: 'onboarding',
      title: 'New Employee Orientation Guide',
      excerpt: 'Complete guide for new employees starting their journey...',
      author: 'Lisa Chang',
      department: 'HR',
      priority: 'low',
      publishedAt: '2024-01-10T16:00:00Z',
      views: 134,
      icon: BookOpen
    },
    {
      id: 7,
      type: 'news',
      title: 'Holiday Party Celebration',
      excerpt: 'Annual holiday celebration with food, drinks, and entertainment...',
      author: 'Emma Wilson',
      department: 'Company-wide',
      priority: 'medium',
      publishedAt: '2024-01-09T12:00:00Z',
      views: 412,
      icon: Newspaper
    },
    {
      id: 8,
      type: 'document',
      title: 'Security Guidelines Update',
      excerpt: 'Important updates to our security policies and procedures...',
      author: 'John Smith',
      department: 'IT',
      priority: 'high',
      publishedAt: '2024-01-08T08:00:00Z',
      views: 223,
      icon: FileText
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-orange-100 text-orange-800';
      case 'onboarding': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Updates</h1>
        <p className="text-gray-600">Stay up to date with the latest company announcements, news, and documents</p>
      </div>

      {/* Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUpdates.map((update) => {
          const Icon = update.icon;
          return (
            <Card key={update.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <Badge className={`text-xs ${getTypeColor(update.type)}`}>
                      {update.type}
                    </Badge>
                  </div>
                  <Badge variant={getPriorityColor(update.priority)} className="text-xs">
                    {update.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{update.excerpt}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {update.author}
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {update.department}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(update.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {update.views} views
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
