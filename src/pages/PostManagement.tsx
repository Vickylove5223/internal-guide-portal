import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Eye, Edit, Trash2, MoreHorizontal, FileText, BookOpen, MessageSquare, Calendar, Settings } from 'lucide-react';
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
import { useCategories } from '@/contexts/CategoryContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const PAGE_SIZE = 15;

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
  const { categories } = useCategories();

  // Pagination state for each tab
  const [postPage, setPostPage] = useState(1);
  const [docPage, setDocPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [suggestionPage, setSuggestionPage] = useState(1);

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
      description: 'Complete guide for all employees including policies, procedures, and benefits',
      category: 'HR',
      status: 'Published',
      author: 'HR Team',
      createdAt: '2024-01-15T11:30:00Z'
    },
    {
      id: 2,
      title: 'IT Security Guidelines',
      description: 'Security protocols and best practices for system access',
      category: 'IT',
      status: 'Published',
      author: 'IT Team',
      createdAt: '2024-01-10T16:20:00Z'
    },
    {
      id: 3,
      title: 'Performance Review Guidelines',
      description: 'Annual performance review process and evaluation criteria',
      category: 'HR',
      status: 'Published',
      author: 'HR Team',
      createdAt: '2024-01-08T09:15:00Z'
    },
    {
      id: 4,
      title: 'Expense Policy 2024',
      description: 'Updated expense and reimbursement policies',
      category: 'Finance',
      status: 'Published',
      author: 'Finance Team',
      createdAt: '2024-01-12T13:45:00Z'
    },
    {
      id: 5,
      title: 'Software Installation Guide',
      description: 'Step-by-step software installation procedures',
      category: 'IT',
      status: 'Draft',
      author: 'IT Team',
      createdAt: '2024-01-05T11:20:00Z'
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

  const [suggestions, setSuggestions] = useState([
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
  ]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Load documents and events from localStorage on mount
  useEffect(() => {
    const storedDocs = localStorage.getItem('documents');
    if (storedDocs) setDocuments(JSON.parse(storedDocs));
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) setEvents(JSON.parse(storedEvents));
  }, []);

  // Save documents and events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Load suggestions from localStorage on mount
  useEffect(() => {
    const storedSuggestions = localStorage.getItem('suggestions');
    if (storedSuggestions) setSuggestions(JSON.parse(storedSuggestions));
  }, []);

  // Save suggestions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(knowledgeSearchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(knowledgeSearchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || doc.category === filterDepartment;
    const matchesStatus = knowledgeFilterStatus === 'all' || doc.status.toLowerCase() === knowledgeFilterStatus.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(eventSearchTerm.toLowerCase());
    const matchesStatus = eventFilterStatus === 'all' || event.status.toLowerCase() === eventFilterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const paginatedPosts = filteredPosts.slice((postPage - 1) * PAGE_SIZE, postPage * PAGE_SIZE);
  const paginatedDocuments = filteredDocuments.slice((docPage - 1) * PAGE_SIZE, docPage * PAGE_SIZE);
  const paginatedEvents = filteredEvents.slice((eventPage - 1) * PAGE_SIZE, eventPage * PAGE_SIZE);
  const paginatedSuggestions = suggestions.slice((suggestionPage - 1) * PAGE_SIZE, suggestionPage * PAGE_SIZE);

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
        // Open edit modal with post data
        setEditingPost(item);
        setShowEditModal(true);
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

  // Add/Edit Post Modal logic
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const handleSavePost = (post: any) => {
    if (editingPost) {
      // Edit existing
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...editingPost, ...post } : p));
    } else {
      // Add new
      setPosts(prev => [
        ...prev,
        { ...post, id: Date.now(), status: 'Published', author: 'Admin', createdAt: new Date().toISOString() }
      ]);
    }
    setShowEditModal(false);
    setEditingPost(null);
  };

  // Add/Edit Document Modal logic
  const [showEditDocModal, setShowEditDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);
  const handleSaveDoc = (doc: any) => {
    if (editingDoc) {
      setDocuments(prev => prev.map(d => d.id === editingDoc.id ? { ...editingDoc, ...doc } : d));
    } else {
      setDocuments(prev => [
        ...prev,
        { ...doc, id: Date.now(), status: 'Published', author: 'Admin', createdAt: new Date().toISOString() }
      ]);
    }
    setShowEditDocModal(false);
    setEditingDoc(null);
  };

  // Add/Edit Event Modal logic
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const handleSaveEvent = (event: any) => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...editingEvent, ...event } : e));
    } else {
      setEvents(prev => [
        ...prev,
        { ...event, id: Date.now(), status: 'Published', author: 'Admin', createdAt: new Date().toISOString() }
      ]);
    }
    setShowEditEventModal(false);
    setEditingEvent(null);
  };

  // Add/Edit Suggestion Modal logic
  const [showEditSuggestionModal, setShowEditSuggestionModal] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState<any | null>(null);
  const handleSaveSuggestion = (suggestion: any) => {
    if (editingSuggestion) {
      setSuggestions(prev => prev.map(s => s.id === editingSuggestion.id ? { ...editingSuggestion, ...suggestion } : s));
    } else {
      setSuggestions(prev => [
        ...prev,
        { ...suggestion, id: Date.now(), status: 'Pending', submittedBy: 'Anonymous', submittedAt: new Date().toISOString() }
      ]);
    }
    setShowEditSuggestionModal(false);
    setEditingSuggestion(null);
  };

  // Update handleDocumentAction and handleEventAction
  const handleDocumentAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        navigate(`/knowledge-base/document/${item.id}`);
        break;
      case 'edit':
        setEditingDoc(item);
        setShowEditDocModal(true);
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
        setEditingEvent(item);
        setShowEditEventModal(true);
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

  // Update handleSuggestionAction
  const handleSuggestionAction = (action: string, item: any) => {
    switch (action) {
      case 'view':
        setViewingSuggestion(item);
        setShowViewSuggestionModal(true);
        break;
      case 'review':
        setEditingSuggestion(item);
        setShowEditSuggestionModal(true);
        break;
      case 'delete':
        setDeletingSuggestion(item);
        setShowDeleteSuggestionConfirm(true);
        break;
    }
  };
  const confirmDeleteSuggestion = () => {
    setSuggestions(prev => prev.filter(s => s.id !== deletingSuggestion.id));
    setShowDeleteSuggestionConfirm(false);
    setDeletingSuggestion(null);
    toast({
      title: "Suggestion deleted",
      description: "The suggestion has been successfully deleted.",
    });
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

  const eventColumns = [
    {
      key: 'title',
      header: 'Title',
      className: 'font-medium',
      render: (value: string) => <span className="font-medium">{value}</span>
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
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleSuggestionAction('delete', item)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
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
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
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
            data={paginatedPosts}
          />
          {filteredPosts.length > PAGE_SIZE && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={postPage === 1} onClick={() => setPostPage(postPage - 1)}>Previous</Button>
              <span className="px-2 py-1 text-sm">Page {postPage} of {Math.ceil(filteredPosts.length / PAGE_SIZE)}</span>
              <Button variant="outline" size="sm" disabled={postPage === Math.ceil(filteredPosts.length / PAGE_SIZE)} onClick={() => setPostPage(postPage + 1)}>Next</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="knowledge-base" className="space-y-6">
          <div className="flex justify-between items-center">
            <div></div>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate('/departments-management')}
            >
              <Settings className="h-4 w-4" />
              Manage Departments
            </Button>
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

          {/* Knowledge Base Table */}
          <DataTable
            columns={[
              {
                key: 'title',
                header: 'Title',
                className: 'font-medium',
                render: (value: string) => <span className="font-medium">{value}</span>
              },
              {
                key: 'category',
                header: 'Department',
                render: (value: string) => <span className="text-sm text-gray-900">{value}</span>
              },
              {
                key: 'status',
                header: 'Status',
                render: (value: string) => <Badge className={`text-xs ${getStatusColor(value)}`}>{value}</Badge>
              },
              {
                key: 'author',
                header: 'Author',
                render: (value: string) => <span className="text-sm text-gray-600">{value}</span>
              },
              {
                key: 'createdAt',
                header: 'Created',
                render: (value: string) => <div className="text-sm text-gray-600">{formatDate(value)}</div>
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
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDocumentAction('delete', item)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
            ]}
            data={paginatedDocuments}
          />
          {filteredDocuments.length > PAGE_SIZE && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={docPage === 1} onClick={() => setDocPage(docPage - 1)}>Previous</Button>
              <span className="px-2 py-1 text-sm">Page {docPage} of {Math.ceil(filteredDocuments.length / PAGE_SIZE)}</span>
              <Button variant="outline" size="sm" disabled={docPage === Math.ceil(filteredDocuments.length / PAGE_SIZE)} onClick={() => setDocPage(docPage + 1)}>Next</Button>
            </div>
          )}
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
            data={paginatedEvents}
          />
          {filteredEvents.length > PAGE_SIZE && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={eventPage === 1} onClick={() => setEventPage(eventPage - 1)}>Previous</Button>
              <span className="px-2 py-1 text-sm">Page {eventPage} of {Math.ceil(filteredEvents.length / PAGE_SIZE)}</span>
              <Button variant="outline" size="sm" disabled={eventPage === Math.ceil(filteredEvents.length / PAGE_SIZE)} onClick={() => setEventPage(eventPage + 1)}>Next</Button>
            </div>
          )}
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
            data={paginatedSuggestions}
          />
          {suggestions.length > PAGE_SIZE && (
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={suggestionPage === 1} onClick={() => setSuggestionPage(suggestionPage - 1)}>Previous</Button>
              <span className="px-2 py-1 text-sm">Page {suggestionPage} of {Math.ceil(suggestions.length / PAGE_SIZE)}</span>
              <Button variant="outline" size="sm" disabled={suggestionPage === Math.ceil(suggestions.length / PAGE_SIZE)} onClick={() => setSuggestionPage(suggestionPage + 1)}>Next</Button>
            </div>
          )}
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

      {/* Add/Edit Post Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Add Post'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSavePost({
                title: formData.get('title'),
                content: formData.get('content'),
                category: formData.get('category'),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editingPost?.title || ''} required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Input id="content" name="content" defaultValue={editingPost?.content || ''} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={editingPost?.category || categories[0]?.name}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add/Edit Document Modal */}
      <Dialog open={showEditDocModal} onOpenChange={setShowEditDocModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDoc ? 'Edit Document' : 'Add Document'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveDoc({
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editingDoc?.title || ''} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={editingDoc?.description || ''} required />
            </div>
            <div>
              <Label htmlFor="category">Department</Label>
              <Input id="category" name="category" defaultValue={editingDoc?.category || ''} required />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add/Edit Event Modal */}
      <Dialog open={showEditEventModal} onOpenChange={setShowEditEventModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveEvent({
                title: formData.get('title'),
                category: formData.get('category'),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editingEvent?.title || ''} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={editingEvent?.category || ''} required />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add/Edit Suggestion Modal */}
      <Dialog open={showEditSuggestionModal} onOpenChange={setShowEditSuggestionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSuggestion ? 'Edit Suggestion' : 'Add Suggestion'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveSuggestion({
                title: formData.get('title'),
                category: formData.get('category'),
                status: formData.get('status'),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editingSuggestion?.title || ''} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={editingSuggestion?.category || ''} required />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue={editingSuggestion?.status || 'Pending'} required />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* View Suggestion Modal */}
      <Dialog open={showViewSuggestionModal} onOpenChange={setShowViewSuggestionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Suggestion</DialogTitle>
          </DialogHeader>
          {viewingSuggestion && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <div className="p-2 bg-gray-100 rounded">{viewingSuggestion.title}</div>
              </div>
              <div>
                <Label>Category</Label>
                <div className="p-2 bg-gray-100 rounded">{viewingSuggestion.category}</div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="p-2 bg-gray-100 rounded">{viewingSuggestion.status}</div>
              </div>
              <div>
                <Label>Submitted By</Label>
                <div className="p-2 bg-gray-100 rounded">{viewingSuggestion.submittedBy}</div>
              </div>
              <div>
                <Label>Submitted At</Label>
                <div className="p-2 bg-gray-100 rounded">{formatDate(viewingSuggestion.submittedAt)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Delete Suggestion Confirmation */}
      <Dialog open={showDeleteSuggestionConfirm} onOpenChange={setShowDeleteSuggestionConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Suggestion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this suggestion?</p>
          <DialogFooter>
            <Button onClick={confirmDeleteSuggestion} variant="destructive">Delete</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostManagement;
