
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DepartmentsManagement = () => {
  const navigate = useNavigate();

  const departments = [
    { 
      name: 'Human Resources', 
      slug: 'hr', 
      count: 12,
      description: 'Employee policies, benefits, and HR procedures',
      lastUpdated: '2024-01-15'
    },
    { 
      name: 'Information Technology', 
      slug: 'it', 
      count: 18,
      description: 'Technical guides, security protocols, and system documentation',
      lastUpdated: '2024-01-20'
    },
    { 
      name: 'Finance', 
      slug: 'finance', 
      count: 8,
      description: 'Financial policies, expense guidelines, and reporting procedures',
      lastUpdated: '2024-01-12'
    },
    { 
      name: 'Sales', 
      slug: 'sales', 
      count: 15,
      description: 'Sales processes, customer guidelines, and territory management',
      lastUpdated: '2024-01-18'
    },
    { 
      name: 'Marketing', 
      slug: 'marketing', 
      count: 10,
      description: 'Brand guidelines, campaign procedures, and marketing strategies',
      lastUpdated: '2024-01-14'
    },
    { 
      name: 'Legal', 
      slug: 'legal', 
      count: 6,
      description: 'Compliance documents, legal procedures, and regulatory guidelines',
      lastUpdated: '2024-01-10'
    },
    { 
      name: 'Operations', 
      slug: 'operations', 
      count: 11,
      description: 'Operational procedures, quality standards, and process documentation',
      lastUpdated: '2024-01-16'
    },
    { 
      name: 'Product', 
      slug: 'product', 
      count: 14,
      description: 'Product specifications, feature documentation, and development guides',
      lastUpdated: '2024-01-19'
    }
  ];

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
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/post-management')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Management
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments Management</h1>
          <p className="text-gray-600">Manage documents and content organization for each department</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Departments</p>
                <p className="text-xl font-bold">{departments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-xl font-bold">{departments.reduce((sum, dept) => sum + dept.count, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 p-2 rounded">
                <FileText className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. per Department</p>
                <p className="text-xl font-bold">{Math.round(departments.reduce((sum, dept) => sum + dept.count, 0) / departments.length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Most Active</p>
                <p className="text-xl font-bold">{departments.reduce((max, dept) => dept.count > max.count ? dept : max, departments[0]).name.split(' ')[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card 
            key={dept.slug}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(`/manage-departments/${dept.slug}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {dept.name}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {dept.count} docs
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {dept.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">
                  Last updated: {formatDate(dept.lastUpdated)}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/manage-departments/${dept.slug}`);
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Documents
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsManagement;
