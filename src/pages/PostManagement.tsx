
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
  Plus, 
  Search, 
  FileEdit,
  Calendar,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Megaphone,
  Newspaper,
  BookOpen,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PostManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const allPosts = [
    {
      id: 1,
      type: 'announcement',
      title: 'Q4 Company All-Hands Meeting',
      content: 'Join us for our quarterly review and planning session...',
      author: 'Sarah Johnson',
      department: 'Company-wide',
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z',
      views: 234,
      icon: Megaphone
    },
    {
      id: 2,
      type: 'news',
      title: 'Company Wins Industry Award',
      content: 'We are proud to announce that our company has been recognized...',
      author: 'Emma Wilson',
      department: 'Company-wide',
      status: 'published',
      publishedAt: '2024-01-13T09:00:00Z',
      views: 456,
      icon: Newspaper
    },
    {
      id: 3,
      type: 'document',
      title: 'Employee Handbook 2024',
      content: 'Updated employee handbook with new policies and procedures...',
      author: 'David Kim',
      department: 'HR',
      status: 'draft',
      publishedAt: null,
      views: 0,
      icon: FileText
    },
    {
      id: 4,
      type: 'onboarding',
      title: 'New Employee Orientation Guide',
      content: 'Complete guide for new employees starting their journey...',
      author: 'Lisa Chang',
      department: 'HR',
      status: 'scheduled',
      publishedAt: null,
      views: 0,
      icon: BookOpen
    },
    {
      id: 5,
      type: 'announcement',
      title: 'IT System Maintenance Window',
      content: 'Scheduled maintenance on our internal systems will occur...',
      author: 'Alex Rodriguez',
      department: 'IT',
      status: 'scheduled',
      publishedAt: null,
      views: 0,
      icon: Megaphone
    }
  ];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || post.type === filterType;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-orange-100 text-orange-800';
      case 'onboarding': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileEdit className="h-6 w-6 mr-2" />
            Post Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage all posts across the platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Post Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const Icon = post.icon;
          return (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <Badge className={`text-xs ${getTypeColor(post.type)}`}>
                        {post.type}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-xs">
                          {post.department}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
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
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {post.views > 0 && (
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views} views
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileEdit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by creating your first post.'
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostManagement;
