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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Megaphone,
  Calendar,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Q4 Company All-Hands Meeting',
      content: 'Join us for our quarterly review and planning session. We will discuss our achievements, challenges, and goals for the next quarter.',
      author: 'Sarah Johnson',
      department: 'Company-wide',
      priority: 'high',
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z',
      scheduledFor: null,
      views: 234,
      attachments: 1
    },
    {
      id: 2,
      title: 'New Health Benefits Package Available',
      content: 'We are excited to announce enhanced health benefits starting next month. This includes dental, vision, and mental health coverage.',
      author: 'Mike Chen',
      department: 'HR',
      priority: 'medium',
      status: 'published',
      publishedAt: '2024-01-14T15:30:00Z',
      scheduledFor: null,
      views: 189,
      attachments: 2
    },
    {
      id: 3,
      title: 'IT System Maintenance Window',
      content: 'Scheduled maintenance on our internal systems will occur this Saturday from 11 PM to 3 AM. Some services may be unavailable.',
      author: 'Alex Rodriguez',
      department: 'IT',
      priority: 'low',
      status: 'scheduled',
      publishedAt: null,
      scheduledFor: '2024-01-20T23:00:00Z',
      views: 0,
      attachments: 0
    },
    {
      id: 4,
      title: 'Holiday Party Celebration',
      content: 'Join us for our annual holiday celebration! Food, drinks, and entertainment will be provided. Please RSVP by Friday.',
      author: 'Emma Wilson',
      department: 'Company-wide',
      priority: 'medium',
      status: 'published',
      publishedAt: '2024-01-12T09:00:00Z',
      scheduledFor: null,
      views: 312,
      attachments: 0
    },
    {
      id: 5,
      title: 'New Security Protocols',
      content: 'Important updates to our security policies. All employees must review and acknowledge the new protocols by month end.',
      author: 'David Kim',
      department: 'Security',
      priority: 'high',
      status: 'draft',
      publishedAt: null,
      scheduledFor: null,
      views: 0,
      attachments: 3
    }
  ];

  const departments = ['Company-wide', 'HR', 'IT', 'Security', 'Sales', 'Marketing'];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || announcement.department === filterDepartment;
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    
    return matchesSearch && matchesDepartment && matchesPriority;
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Megaphone className="h-6 w-6 mr-2" />
          Announcements
        </h1>
        <p className="text-gray-600">View company-wide announcements and communications</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                      {announcement.priority}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(announcement.status)}`}>
                      {announcement.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {announcement.author}
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {announcement.department}
                      </Badge>
                    </div>
                    {announcement.publishedAt && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(announcement.publishedAt)}
                      </div>
                    )}
                    {announcement.scheduledFor && (
                      <div className="flex items-center text-blue-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        Scheduled: {formatDate(announcement.scheduledFor)}
                      </div>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{announcement.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  {announcement.views > 0 && (
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {announcement.views} views
                    </span>
                  )}
                  {announcement.attachments > 0 && (
                    <span>{announcement.attachments} attachment{announcement.attachments > 1 ? 's' : ''}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterDepartment !== 'all' || filterPriority !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'No announcements available at the moment.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Announcements;
