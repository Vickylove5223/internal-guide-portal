
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
  Database, 
  Search, 
  Folder,
  FileText,
  Video,
  Image,
  Download,
  Star,
  Clock,
  User,
  Eye,
  ThumbsUp,
  MessageCircle,
  Filter,
  Plus,
  FolderOpen
} from 'lucide-react';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list or grid

  const departments = [
    { name: 'HR', count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'IT', count: 67, color: 'bg-green-100 text-green-800' },
    { name: 'Finance', count: 23, color: 'bg-purple-100 text-purple-800' },
    { name: 'Sales', count: 34, color: 'bg-orange-100 text-orange-800' },
    { name: 'Marketing', count: 28, color: 'bg-pink-100 text-pink-800' },
    { name: 'Legal', count: 12, color: 'bg-red-100 text-red-800' },
    { name: 'Operations', count: 19, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Product', count: 41, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const documents = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      description: 'Complete guide to company policies, procedures, and benefits',
      department: 'HR',
      type: 'document',
      author: 'Sarah Johnson',
      lastUpdated: '2024-01-15T10:30:00Z',
      version: '3.2',
      status: 'approved',
      size: '5.2 MB',
      views: 1247,
      likes: 89,
      comments: 12,
      tags: ['policies', 'benefits', 'procedures'],
      featured: true
    },
    {
      id: 2,
      title: 'Security Best Practices',
      description: 'Essential security guidelines and protocols for all employees',
      department: 'IT',
      type: 'document',
      author: 'Mike Chen',
      lastUpdated: '2024-01-14T16:45:00Z',
      version: '2.1',
      status: 'approved',
      size: '3.8 MB',
      views: 892,
      likes: 67,
      comments: 8,
      tags: ['security', 'protocols', 'guidelines'],
      featured: false
    },
    {
      id: 3,
      title: 'Onboarding Training Video',
      description: 'Welcome video for new employees covering company culture and values',
      department: 'HR',
      type: 'video',
      author: 'Emma Wilson',
      lastUpdated: '2024-01-10T14:20:00Z',
      version: '1.0',
      status: 'approved',
      size: '125 MB',
      views: 567,
      likes: 45,
      comments: 23,
      tags: ['onboarding', 'culture', 'welcome'],
      featured: true
    },
    {
      id: 4,
      title: 'Financial Reporting Guidelines',
      description: 'Step-by-step guide for monthly and quarterly financial reporting',
      department: 'Finance',
      type: 'document',
      author: 'David Kim',
      lastUpdated: '2024-01-12T11:15:00Z',
      version: '1.8',
      status: 'draft',
      size: '2.1 MB',
      views: 234,
      likes: 12,
      comments: 5,
      tags: ['finance', 'reporting', 'guidelines'],
      featured: false
    },
    {
      id: 5,
      title: 'Sales Process Flowchart',
      description: 'Visual guide to our sales process from lead to close',
      department: 'Sales',
      type: 'image',
      author: 'Alex Rodriguez',
      lastUpdated: '2024-01-08T09:30:00Z',
      version: '2.0',
      status: 'approved',
      size: '1.2 MB',
      views: 445,
      likes: 34,
      comments: 7,
      tags: ['sales', 'process', 'flowchart'],
      featured: false
    },
    {
      id: 6,
      title: 'API Documentation',
      description: 'Complete technical documentation for our internal APIs',
      department: 'IT',
      type: 'document',
      author: 'Lisa Park',
      lastUpdated: '2024-01-13T13:25:00Z',
      version: '4.1',
      status: 'approved',
      size: '8.7 MB',
      views: 678,
      likes: 78,
      comments: 15,
      tags: ['api', 'technical', 'documentation'],
      featured: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || doc.department === selectedDepartment;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Database className="h-6 w-6 mr-2" />
            Knowledge Base
          </h1>
          <p className="text-gray-600">Searchable repository of company documents and resources</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.name} value={dept.name}>
                    {dept.name} ({dept.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Departments Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Folder className="h-5 w-5 mr-2" />
                Departments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    selectedDepartment === dept.name 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedDepartment(dept.name)}
                >
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm font-medium">{dept.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dept.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Documents</span>
                <span className="font-semibold">269</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold">+23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Most Popular</span>
                <span className="font-semibold text-blue-600">HR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Views</span>
                <span className="font-semibold">542</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredDocuments.map((doc) => {
              const TypeIcon = getTypeIcon(doc.type);
              return (
                <Card key={doc.id} className={`hover:shadow-md transition-shadow ${doc.featured ? 'border-primary' : ''}`}>
                  {doc.featured && (
                    <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      <Star className="h-3 w-3 inline mr-1" />
                      Featured
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <TypeIcon className="h-5 w-5 text-gray-600" />
                          <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                          <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{doc.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {doc.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(doc.lastUpdated)}
                          </div>
                          <Badge className={departments.find(d => d.name === doc.department)?.color}>
                            {doc.department}
                          </Badge>
                          <span>v{doc.version}</span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {doc.views}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {doc.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {doc.comments}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedDepartment !== 'all' || selectedType !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Get started by adding your first document.'
                  }
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
