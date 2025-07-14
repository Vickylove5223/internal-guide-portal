
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  CheckCircle, 
  Clock, 
  FileText,
  Video,
  Eye,
  Search
} from 'lucide-react';

const OnboardingDocumentationDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const allOnboardingDocs = [
    {
      id: 1,
      title: 'Welcome & Company Overview',
      description: 'Learn about our company culture, mission, and values',
      type: 'document',
      duration: '15 min',
      completed: true,
      required: true,
      department: 'HR',
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
      documents: [
        { name: 'Employee Handbook', type: 'pdf', size: '5.4 MB' },
        { name: 'Benefits Overview', type: 'pdf', size: '2.7 MB' }
      ]
    },
    {
      id: 4,
      title: 'Role-Specific Training',
      description: 'Training materials specific to your role and department',
      type: 'video',
      duration: '45 min',
      completed: false,
      required: true,
      department: 'Various',
      documents: [
        { name: 'Department Overview', type: 'video', size: '120 MB' },
        { name: 'Role Guidelines', type: 'pdf', size: '1.9 MB' }
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
      documents: [
        { name: 'Tool Tutorials', type: 'interactive', size: '15 MB' },
        { name: 'System Access Guide', type: 'pdf', size: '2.3 MB' }
      ]
    },
    {
      id: 6,
      title: 'Meet Your Team',
      description: 'Get to know your colleagues and team structure',
      type: 'social',
      duration: '30 min',
      completed: false,
      required: false,
      department: 'HR',
      documents: [
        { name: 'Team Directory', type: 'pdf', size: '1.2 MB' },
        { name: 'Org Chart', type: 'pdf', size: '800 KB' }
      ]
    }
  ];

  const filteredDocs = allOnboardingDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDocumentClick = (doc: any) => {
    navigate(`/knowledge-base/${doc.department.toLowerCase()}/document/${doc.id}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button variant="ghost" onClick={() => navigate('/onboarding')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            All Onboarding Documentation
          </h1>
          <p className="text-gray-600">Complete guide to getting started at the company</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documentation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredDocs.map((doc, index) => {
          const TypeIcon = getTypeIcon(doc.type);
          return (
            <Card
              key={doc.id}
              className={`transition-all cursor-pointer ${
                doc.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleDocumentClick(doc)}
            >
              <CardContent className="p-4 sm:p-6">
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
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{doc.title}</h3>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{doc.department}</Badge>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">{doc.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-600">
                        <TypeIcon className="h-4 w-4 mr-1" />
                        {doc.type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {doc.duration}
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {doc.documents.map((document, docIndex) => {
                        const FileIcon = getTypeIcon(document.type);
                        return (
                          <div key={docIndex} className="flex items-center justify-between bg-white rounded border p-2">
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              <FileIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm text-gray-900 truncate">{document.name}</span>
                              <span className="text-xs text-gray-500 flex-shrink-0">({document.size})</span>
                            </div>
                            <Button variant="ghost" size="sm" className="flex-shrink-0">
                              <Eye className="h-4 w-4" />
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
    </div>
  );
};

export default OnboardingDocumentationDetail;
