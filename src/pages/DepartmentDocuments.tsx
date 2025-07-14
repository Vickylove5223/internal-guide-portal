
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
  User,
  Clock
} from 'lucide-react';

const DepartmentDocuments = () => {
  const { department } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

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
            <ArrowLeft className="h-4 w-4" />
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

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentDocuments.map((doc) => {
          const TypeIcon = getTypeIcon(doc.type);
          return (
            <Link key={doc.id} to={`/knowledge-base/${department}/document/${doc.id}`}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-5 w-5 text-gray-600" />
                      <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                      <p className="text-gray-700 text-sm line-clamp-3">{doc.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {doc.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(doc.lastUpdated)}
                      </div>
                      <div>v{doc.version}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
