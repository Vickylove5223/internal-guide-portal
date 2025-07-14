
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  Search,
  FileText,
  Video,
  Image,
  Download,
  Eye,
  Clock,
  User,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';

const DepartmentDocuments = () => {
  const { department } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample documents data - in real app this would come from API
  const documents = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      description: 'Complete guide to company policies, procedures, and benefits',
      type: 'document',
      author: 'Sarah Johnson',
      lastUpdated: '2024-01-15T10:30:00Z',
      version: '3.2',
      status: 'approved',
      size: '5.2 MB',
      views: 1247,
      likes: 89,
      comments: 12,
      department: 'hr'
    },
    {
      id: 2,
      title: 'Security Best Practices',
      description: 'Essential security guidelines and protocols for all employees',
      type: 'document',
      author: 'Mike Chen',
      lastUpdated: '2024-01-14T16:45:00Z',
      version: '2.1',
      status: 'approved',
      size: '3.8 MB',
      views: 892,
      likes: 67,
      comments: 8,
      department: 'it'
    },
    {
      id: 3,
      title: 'Financial Reporting Guidelines',
      description: 'Step-by-step guide for monthly and quarterly financial reporting',
      type: 'document',
      author: 'David Kim',
      lastUpdated: '2024-01-12T11:15:00Z',
      version: '1.8',
      status: 'approved',
      size: '2.1 MB',
      views: 234,
      likes: 12,
      comments: 5,
      department: 'finance'
    },
    {
      id: 4,
      title: 'Sales Process Training Video',
      description: 'Complete walkthrough of our sales process from lead to close',
      type: 'video',
      author: 'Alex Rodriguez',
      lastUpdated: '2024-01-08T09:30:00Z',
      version: '2.0',
      status: 'approved',
      size: '125 MB',
      views: 445,
      likes: 34,
      comments: 7,
      department: 'sales'
    }
  ];

  const departmentDocuments = documents.filter(doc => 
    doc.department === department &&
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const departmentName = department?.charAt(0).toUpperCase() + department?.slice(1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/knowledge-base">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {departmentName} Documents
          </h1>
          <p className="text-gray-600">Browse documents and resources for the {departmentName} department</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {departmentDocuments.map((doc) => {
          const TypeIcon = getTypeIcon(doc.type);
          return (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
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
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {doc.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(doc.lastUpdated)}
                      </div>
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

      {departmentDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms.'
                : `No documents available for the ${departmentName} department yet.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentDocuments;
