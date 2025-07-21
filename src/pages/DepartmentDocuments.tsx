
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Search,
  FileText,
  Video,
  User,
  Clock,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const DepartmentDocuments = () => {
  const { department } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const allDocuments = [
    {
      id: 1,
      title: 'Welcome & Company Overview',
      description: 'Learn about our company culture, mission, and values',
      type: 'document',
      duration: '15 min',
      completed: true,
      required: true,
      department: 'HR',
      category: 'general',
      documents: [
        { name: 'Welcome Guide', type: 'pdf', size: '2.1 MB' },
        { name: 'Company Culture Video', type: 'video', size: '45 MB' }
      ]
    },
    {
      id: 2,
      title: 'IT Setup & Security',
      description: 'Set up your devices and learn about security protocols',
      type: 'checklist',
      duration: '30 min',
      completed: true,
      required: true,
      department: 'IT',
      category: 'departments',
      documents: [
        { name: 'IT Setup Guide', type: 'pdf', size: '1.8 MB' },
        { name: 'Security Protocols', type: 'pdf', size: '3.2 MB' }
      ]
    },
    {
      id: 3,
      title: 'HR Policies & Benefits',
      description: 'Important HR policies and your benefits package',
      type: 'document',
      duration: '20 min',
      completed: false,
      required: true,
      department: 'HR',
      category: 'departments',
      documents: [
        { name: 'Employee Handbook', type: 'pdf', size: '5.4 MB' },
        { name: 'Benefits Overview', type: 'pdf', size: '2.7 MB' }
      ]
    },
    {
      id: 4,
      title: 'Product Documentation',
      description: 'Comprehensive guides for our products and features',
      type: 'document',
      duration: '25 min',
      completed: false,
      required: false,
      department: 'Product',
      category: 'products',
      documents: [
        { name: 'Product Overview', type: 'pdf', size: '3.1 MB' },
        { name: 'Feature Guide', type: 'pdf', size: '2.8 MB' }
      ]
    },
    {
      id: 5,
      title: 'Tools & Systems Training',
      description: 'Learn to use our internal tools and systems',
      type: 'interactive',
      duration: '60 min',
      completed: false,
      required: false,
      department: 'IT',
      category: 'general',
      documents: [
        { name: 'Tool Tutorials', type: 'interactive', size: '15 MB' },
        { name: 'System Access Guide', type: 'pdf', size: '2.3 MB' }
      ]
    },
    {
      id: 6,
      title: 'Product Roadmap',
      description: 'Future plans and development timeline for products',
      type: 'document',
      duration: '15 min',
      completed: false,
      required: false,
      department: 'Product',
      category: 'products',
      documents: [
        { name: 'Q1 Roadmap', type: 'pdf', size: '1.9 MB' },
        { name: 'Long-term Vision', type: 'pdf', size: '2.1 MB' }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'checklist': return CheckCircle;
      case 'interactive': return FileText;
      case 'social': return FileText;
      default: return FileText;
    }
  };

  const handleCardClick = (docId: number) => {
    navigate(`/knowledge-base/${department}/document/${docId}`);
  };

  const departmentName = department?.charAt(0).toUpperCase() + department?.slice(1);

  const filterDocuments = (category: string) => {
    return allDocuments
      .filter(doc => doc.category === category)
      .filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const renderDocumentCards = (documents: typeof allDocuments) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {documents.map((doc, index) => {
        const TypeIcon = getTypeIcon(doc.type);
        return (
          <Card
            key={doc.id}
            className={`transition-all cursor-pointer ${
              doc.completed 
                ? 'bg-green-50 border-green-200' 
                : 'hover:bg-gray-50 border-gray-200'
            }`}
            onClick={() => handleCardClick(doc.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  doc.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {doc.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    {doc.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                    <Badge variant="outline" className="text-xs">{doc.department}</Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{doc.description}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <TypeIcon className="h-4 w-4 mr-1" />
                      {doc.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {doc.duration}
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {doc.documents.map((docFile, docIndex) => {
                      const FileIcon = getTypeIcon(docFile.type);
                      return (
                        <div key={docIndex} className="flex items-center justify-between bg-white rounded border p-2">
                          <div className="flex items-center space-x-2">
                            <FileIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900">{docFile.name}</span>
                            <span className="text-xs text-gray-500">({docFile.size})</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderEmptyState = (category: string) => (
    <Card>
      <CardContent className="p-12 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
        <p className="text-gray-600">
          {searchTerm 
            ? 'Try adjusting your search terms.'
            : `No ${category} documents available for the ${departmentName} department yet.`
          }
        </p>
      </CardContent>
    </Card>
  );

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
            {departmentName} Documentation
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

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {filterDocuments('general').length > 0 
            ? renderDocumentCards(filterDocuments('general'))
            : renderEmptyState('general')
          }
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          {filterDocuments('departments').length > 0 
            ? renderDocumentCards(filterDocuments('departments'))
            : renderEmptyState('department')
          }
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {filterDocuments('products').length > 0 
            ? renderDocumentCards(filterDocuments('products'))
            : renderEmptyState('product')
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentDocuments;
