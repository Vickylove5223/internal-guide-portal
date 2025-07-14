
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  FileText,
  Video,
  Image,
  Clock,
  User,
} from 'lucide-react';

const DepartmentDocuments = () => {
  const { department } = useParams();

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
      department: 'sales'
    }
  ];

  const departmentDocuments = documents.filter(doc => doc.department === department);

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

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentDocuments.map((doc) => {
          const TypeIcon = getTypeIcon(doc.type);
          return (
            <Link key={doc.id} to={`/knowledge-base/${department}/${doc.id}`}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="flex-shrink-0">
                      <TypeIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {doc.title}
                      </h3>
                      <Badge className={`text-xs ${getStatusColor(doc.status)} mb-2`}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{doc.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{doc.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(doc.lastUpdated)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>v{doc.version}</span>
                      <span>{doc.size}</span>
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
              No documents available for the {departmentName} department yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentDocuments;
