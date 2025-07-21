import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Eye, Edit, Trash2, MoreHorizontal, FileText, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PostManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'Company Quarterly Results',
      category: 'Company News',
      status: 'Published',
      author: 'John Smith',
      createdAt: '2024-01-20T10:30:00Z',
      views: 1250
    },
    {
      id: 2,
      title: 'New Employee Benefits Package',
      category: 'HR Updates',
      status: 'Draft',
      author: 'Sarah Johnson',
      createdAt: '2024-01-19T14:20:00Z',
      views: 0
    },
    {
      id: 3,
      title: 'Annual Company Retreat',
      category: 'Company Events',
      status: 'Published',
      author: 'Mike Wilson',
      createdAt: '2024-01-18T09:15:00Z',
      views: 890
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      category: 'HR',
      status: 'Published',
      author: 'HR Team',
      createdAt: '2024-01-15T11:30:00Z',
      downloads: 45
    },
    {
      id: 2,
      title: 'IT Security Guidelines',
      category: 'IT',
      status: 'Published',
      author: 'IT Team',
      createdAt: '2024-01-10T16:20:00Z',
      downloads: 23
    }
  ];

  const suggestions = [
    {
      id: 1,
      title: 'Improve Office Lighting',
      category: 'Workplace Environment',
      status: 'Pending',
      submittedBy: 'Anonymous',
      submittedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'Flexible Working Hours',
      category: 'Employee Benefits',
      status: 'Reviewed',
      submittedBy: 'John Doe',
      submittedAt: '2024-01-18T14:20:00Z'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const postColumns = [
    {
      key: 'title',
      header: 'Title',
      className: 'font-medium',
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge className={`text-xs ${getStatusColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'author',
      header: 'Author',
      render: (value: string) => <span className="text-sm text-gray-600">{value}</span>
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'views',
      header: 'Views',
      render: (value: number) => (
        <div className="text-sm text-gray-600">{value.toLocaleString()}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
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
      )
    }
  ];

  const documentColumns = [
    {
      key: 'title',
      header: 'Title',
      className: 'font-medium',
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge className={`text-xs ${getStatusColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'author',
      header: 'Author',
      render: (value: string) => <span className="text-sm text-gray-600">{value}</span>
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'downloads',
      header: 'Downloads',
      render: (value: number) => (
        <div className="text-sm text-gray-600">{value}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
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
      )
    }
  ];

  const suggestionColumns = [
    {
      key: 'title',
      header: 'Title',
      className: 'font-medium',
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge className={`text-xs ${getStatusColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'submittedBy',
      header: 'Submitted By',
      render: (value: string) => <span className="text-sm text-gray-600">{value}</span>
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage posts, documents, and suggestions</p>
        </div>
        <Link to="/post-management/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All Posts
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4 bg-gray-50">
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
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Company News">Company News</SelectItem>
                    <SelectItem value="HR Updates">HR Updates</SelectItem>
                    <SelectItem value="Company Events">Company Events</SelectItem>
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
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts Table */}
          <DataTable
            columns={postColumns}
            data={filteredPosts}
            onRowClick={(post) => console.log('Edit post:', post)}
          />
        </TabsContent>

        <TabsContent value="knowledge-base" className="space-y-6">
          {/* Knowledge Base Documents Table */}
          <DataTable
            columns={documentColumns}
            data={documents}
            onRowClick={(doc) => console.log('Edit document:', doc)}
          />
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          {/* Suggestions Table */}
          <DataTable
            columns={suggestionColumns}
            data={suggestions}
            onRowClick={(suggestion) => console.log('View suggestion:', suggestion)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostManagement;
