import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Eye, Edit, Trash2, MoreHorizontal, FileText, BookOpen, MessageSquare, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateContentModal } from '@/components/CreateContentModal';
import { ManageCategoriesModal } from '@/components/ManageCategoriesModal';
import { useToast } from '@/hooks/use-toast';

const PostManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [knowledgeSearchTerm, setKnowledgeSearchTerm] = useState('');
  const [knowledgeFilterStatus, setKnowledgeFilterStatus] = useState('all');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [eventFilterStatus, setEventFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showDepartmentsModal, setShowDepartmentsModal] = useState(false);
  const [managementType, setManagementType] = useState<'categories' | 'departments'>('categories');

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Company Quarterly Results',
      category: 'Company News',
      status: 'Published',
      author: 'John Smith',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'New Employee Benefits Package',
      category: 'HR Updates',
      status: 'Draft',
      author: 'Sarah Johnson',
      createdAt: '2024-01-19T14:20:00Z'
    },
    {
      id: 3,
      title: 'Annual Company Retreat',
      category: 'Company Events',
      status: 'Published',
      author: 'Mike Wilson',
      createdAt: '2024-01-18T09:15:00Z'
    }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Employee Handbook 2024',
      category: 'HR',
      status: 'Published',
      author: 'HR Team',
      createdAt: '2024-01-15T11:30:00Z'
    },
    {
      id: 2,
      title: 'IT Security Guidelines',
      category: 'IT',
      status: 'Published',
      author: 'IT Team',
      createdAt: '2024-01-10T16:20:00Z'
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Company Retreat 2024',
      category: 'Company Events',
      status: 'Published',
      author: 'HR Team',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'Quarterly All-Hands Meeting',
      category: 'Company Events',
      status: 'Published',
      author: 'Executive Team',
      createdAt: '2024-01-18T14:20:00Z'
    },
    {
      id: 3,
      title: 'Team Building Workshop',
      category: 'HR Events',
      status: 'Draft',
      author: 'HR Team',
      createdAt: '2024-01-15T09:15:00Z'
    }
  ]);

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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(knowledgeSearchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || doc.category === filterDepartment;
    const matchesStatus = knowledgeFilterStatus === 'all' || doc.status.toLowerCase() === knowledgeFilterStatus.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(eventSearchTerm.toLowerCase());
    const matchesStatus = eventFilterStatus === 'all' || event.status.toLowerCase() === eventFilterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
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

  const handlePostAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        navigate(`/post/${item.id}`);
        break;
      case 'edit':
        navigate(`/post-management/edit/${item.id}`);
        break;
      case 'delete':
        setPosts(prev => prev.filter(p => p.id !== item.id));
        toast({
          title: "Post deleted",
          description: "The post has been successfully deleted.",
        });
        break;
    }
  };

  const handleDocumentAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        navigate(`/knowledge-base/document/${item.id}`);
        break;
      case 'edit':
        navigate(`/knowledge-base/edit/${item.id}`);
        break;
      case 'delete':
        setDocuments(prev => prev.filter(d => d.id !== item.id));
        toast({
          title: "Document deleted",
          description: "The document has been successfully deleted.",
        });
        break;
    }
  };

  const handleEventAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        navigate(`/events/${item.id}`);
        break;
      case 'edit':
        navigate(`/events/edit/${item.id}`);
        break;
      case 'delete':
        setEvents(prev => prev.filter(e => e.id !== item.id));
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted.",
        });
        break;
    }
  };

  const handleSuggestionAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        navigate(`/suggestions`);
        break;
      case 'review':
        navigate(`/suggestions`);
        break;
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
            <DropdownMenuItem onClick={() => handlePostAction('view', item)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePostAction('edit', item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handlePostAction('delete', item)}
            >
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
            <DropdownMenuItem onClick={() => handleDocumentAction('view', item)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDocumentAction('edit', item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleDocumentAction('delete', item)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const eventColumns = [
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
            <DropdownMenuItem onClick={() => handleEventAction('view', item)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEventAction('edit', item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleEventAction('delete', item)}
            >
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
      render: (value: any, item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSuggestionAction('view', item)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSuggestionAction('review', item)}>
              <Edit className="h-4 w-4 mr-2" />
              Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const handleShowCategoriesModal = (type: 'categories' | 'departments') => {
    setManagementType(type);
    if (type === 'categories') {
      setShowCategoriesModal(true);
    } else {
      setShowDepartmentsModal(true);
    }
  };

  const departments = [
    { name: 'HR', slug: 'hr', count: 45 },
    { name: 'IT', slug: 'it', count: 67 },
    { name: 'Finance', slug: 'finance', count: 23 },
    { name: 'Sales', slug: 'sales', count: 34 },
    { name: 'Marketing', slug: 'marketing', count: 28 },
    { name: 'Legal', slug: 'legal', count: 12 },
    { name: 'Operations', slug: 'operations', count: 19 },
    { name: 'Product', slug: 'product', count: 41 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Management</h1>
          <p className="text-gray-600">Manage posts, documents, events, and suggestions</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All Posts
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex justify-between items-center">
            <div></div>
            <Button 
              variant="link" 
              className="text-sm text-blue-600 hover:underline p-0"
              onClick={() => handleShowCategoriesModal('categories')}
            >
              Manage Categories
            </Button>
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

          {/* Posts Table */}
          <DataTable
            columns={postColumns}
            data={filteredPosts}
          />
        </TabsContent>

        <TabsContent value="knowledge-base" className="space-y-6">
          <div className="flex justify-between items-center">
            <div></div>
            <Button 
              variant="link" 
              className="text-sm text-blue-600 hover:underline p-0"
              onClick={() => handleShowCategoriesModal('departments')}
            >
              Manage Departments
            </Button>
          </div>

          {/* Departments Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Departments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <Card 
                  key={dept.slug}
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/manage-departments/${dept.slug}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {dept.count} docs
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/manage-departments/${dept.slug}`);
                      }}
                    >
                      Manage Documents
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Knowledge Base Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search knowledge base..."
                  value={knowledgeSearchTerm}
                  onChange={(e) => setKnowledgeSearchTerm(e.target.value)}
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
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={knowledgeFilterStatus} onValueChange={setKnowledgeFilterStatus}>
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

          {/* Knowledge Base Documents Table */}
          <DataTable
            columns={documentColumns}
            data={filteredDocuments}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <div></div>
          </div>

          {/* Events Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={eventSearchTerm}
                  onChange={(e) => setEventSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={eventFilterStatus} onValueChange={setEventFilterStatus}>
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

          {/* Events Table */}
          <DataTable
            columns={eventColumns}
            data={filteredEvents}
          />
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <div className="flex justify-between items-center">
            <div></div>
            <Button 
              variant="link" 
              className="text-sm text-blue-600 hover:underline p-0"
              onClick={() => handleShowCategoriesModal('categories')}
            >
              Manage Categories
            </Button>
          </div>

          {/* Suggestions Table */}
          <DataTable
            columns={suggestionColumns}
            data={suggestions}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreateContentModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
      
      <ManageCategoriesModal 
        open={showCategoriesModal} 
        onOpenChange={setShowCategoriesModal} 
        type="categories" 
      />
      
      <ManageCategoriesModal 
        open={showDepartmentsModal} 
        onOpenChange={setShowDepartmentsModal} 
        type="departments" 
      />
    </div>
  );
};

export default PostManagement;
