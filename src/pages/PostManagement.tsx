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
import { DataTable } from '@/components/ui/data-table';
import { useNavigate } from 'react-router-dom';

const PostManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeSection, setActiveSection] = useState('all-posts');

  const allPosts = [
    {
      id: 1,
      type: 'events',
      title: 'Q4 Company All-Hands Meeting',
      content: 'Join us for our quarterly review and planning session...',
      author: 'Sarah Johnson',
      department: 'Company-wide',
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z',
      icon: Calendar
    },
    {
      id: 2,
      type: 'company-news',
      title: 'Company Wins Industry Award',
      content: 'We are proud to announce that our company has been recognized...',
      author: 'Emma Wilson',
      department: 'Company-wide',
      status: 'published',
      publishedAt: '2024-01-13T09:00:00Z',
      icon: Newspaper
    },
    {
      id: 3,
      type: 'finance',
      title: 'Q4 Financial Results',
      content: 'Updated financial report with quarterly results...',
      author: 'David Kim',
      department: 'Finance',
      status: 'draft',
      publishedAt: null,
      icon: FileText
    },
    {
      id: 4,
      type: 'politics-news',
      title: 'Government Policy Update',
      content: 'New regulations affecting our industry...',
      author: 'Lisa Chang',
      department: 'Legal',
      status: 'scheduled',
      publishedAt: null,
      icon: Megaphone
    }
  ];

  const internalDocs = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      content: 'Updated policies and procedures for all employees...',
      author: 'HR Team',
      department: 'Human Resources',
      status: 'published',
      publishedAt: '2024-01-10T08:00:00Z',
      type: 'handbook'
    },
    {
      id: 2,
      title: 'IT Security Guidelines',
      content: 'Comprehensive security protocols and best practices...',
      author: 'IT Security',
      department: 'Information Technology',
      status: 'published',
      publishedAt: '2024-01-05T14:30:00Z',
      type: 'guidelines'
    },
    {
      id: 3,
      title: 'Project Management Standards',
      content: 'Standard operating procedures for project management...',
      author: 'PMO',
      department: 'Operations',
      status: 'draft',
      publishedAt: null,
      type: 'standards'
    }
  ];

  const currentData = activeSection === 'all-posts' ? allPosts : internalDocs;

  const filteredData = currentData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
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
      case 'events': return 'bg-blue-100 text-blue-800';
      case 'company-news': return 'bg-green-100 text-green-800';
      case 'finance': return 'bg-orange-100 text-orange-800';
      case 'politics-news': return 'bg-pink-100 text-pink-800';
      case 'handbook': return 'bg-purple-100 text-purple-800';
      case 'guidelines': return 'bg-cyan-100 text-cyan-800';
      case 'standards': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const menuItems = [
    { id: 'all-posts', label: 'All Posts', count: allPosts.length },
    { id: 'all-internal-docs', label: 'All Internal Docs', count: internalDocs.length }
  ];

  const handleRowClick = (item: any) => {
    navigate(`/post-management/edit/${item.id}`);
  };

  const handleEdit = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    navigate(`/post-management/edit/${item.id}`);
  };

  const handleDelete = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    console.log('Delete item:', item);
  };

  const handleView = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    navigate(`/post/${item.id}`);
  };

  const columns = [
    {
      key: 'title',
      header: 'Title',
      className: 'font-medium',
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{item.content.substring(0, 60)}...</div>
        </div>
      )
    },
    {
      key: 'author',
      header: 'Author',
      render: (value: string) => (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          {value}
        </div>
      )
    },
    {
      key: 'type',
      header: 'Category',
      render: (value: string) => (
        <Badge className={`text-xs ${getTypeColor(value)}`}>
          {value.replace('-', ' ')}
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
      key: 'publishedAt',
      header: 'Date',
      render: (value: string | null) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => handleView(e, item)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleEdit(e, item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={(e) => handleDelete(e, item)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const handleNewPost = () => {
    navigate('/post-management/new');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage all posts across the platform</p>
        </div>
        <Button onClick={handleNewPost}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Sub Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 overflow-x-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeSection === item.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {item.label}
              <Badge variant="secondary" className="ml-2">
                {item.count}
              </Badge>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
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
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="politics-news">Politics News</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="company-news">Company News</SelectItem>
            {activeSection === 'all-internal-docs' && (
              <>
                <SelectItem value="handbook">Handbook</SelectItem>
                <SelectItem value="guidelines">Guidelines</SelectItem>
                <SelectItem value="standards">Standards</SelectItem>
              </>
            )}
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

      {/* Data Table */}
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          onRowClick={handleRowClick}
        />
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileEdit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by creating your first post.'
              }
            </p>
            <Button onClick={handleNewPost}>
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
