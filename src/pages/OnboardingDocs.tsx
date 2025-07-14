
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
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Search, 
  CheckCircle, 
  Clock, 
  Play,
  FileText,
  Video,
  Download,
  User,
  Users,
  Building,
  Star,
  Award
} from 'lucide-react';

const OnboardingDocs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const onboardingSteps = [
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

  const roleSpecificDocs = [
    {
      role: 'Engineering',
      icon: Building,
      docs: [
        'Code Style Guide',
        'Development Environment Setup',
        'Git Workflow',
        'Code Review Process'
      ]
    },
    {
      role: 'Sales',
      icon: Users,
      docs: [
        'Sales Process Overview',
        'CRM Training',
        'Product Knowledge Base',
        'Customer Communication Guidelines'
      ]
    },
    {
      role: 'Marketing',
      icon: Star,
      docs: [
        'Brand Guidelines',
        'Marketing Tools Overview',
        'Campaign Process',
        'Social Media Policies'
      ]
    },
    {
      role: 'HR',
      icon: User,
      docs: [
        'Recruitment Process',
        'Employee Relations',
        'Performance Management',
        'Compliance Training'
      ]
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const totalSteps = onboardingSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'checklist': return CheckCircle;
      case 'interactive': return Play;
      case 'social': return Users;
      default: return FileText;
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'interactive': return Play;
      default: return FileText;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            Onboarding Documentation
          </h1>
          <p className="text-gray-600">Your guide to getting started at the company</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-lg font-semibold">{completedSteps}/{totalSteps} completed</p>
          </div>
          <div className="w-20">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search onboarding materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Onboarding Steps */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Checklist</CardTitle>
              <CardDescription>Follow these steps to complete your onboarding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingSteps.map((step, index) => {
                const TypeIcon = getTypeIcon(step.type);
                return (
                  <div
                    key={step.id}
                    className={`border rounded-lg p-4 transition-all ${
                      step.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          {step.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">{step.department}</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{step.description}</p>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <TypeIcon className="h-4 w-4 mr-1" />
                            {step.type}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {step.duration}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {step.documents.map((doc, docIndex) => {
                            const FileIcon = getFileTypeIcon(doc.type);
                            return (
                              <div key={docIndex} className="flex items-center justify-between bg-white rounded border p-2">
                                <div className="flex items-center space-x-2">
                                  <FileIcon className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-900">{doc.name}</span>
                                  <span className="text-xs text-gray-500">({doc.size})</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex space-x-2 mt-4">
                          {step.completed ? (
                            <Button variant="outline" size="sm" disabled>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">{completedSteps} steps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-medium">{totalSteps - completedSteps} steps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated time left</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-Specific Docs */}
          <Card>
            <CardHeader>
              <CardTitle>Role-Specific Resources</CardTitle>
              <CardDescription>Documents tailored to your department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleSpecificDocs.map((roleDoc) => {
                const RoleIcon = roleDoc.icon;
                return (
                  <div key={roleDoc.role} className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <RoleIcon className="h-4 w-4 text-primary" />
                      <h3 className="font-medium text-gray-900">{roleDoc.role}</h3>
                    </div>
                    <div className="space-y-1">
                      {roleDoc.docs.map((doc, index) => (
                        <div key={index} className="text-sm text-gray-600 hover:text-primary cursor-pointer">
                          • {doc}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Meet Your Team
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Employee Handbook
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Office Tour
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Company Benefits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDocs;
