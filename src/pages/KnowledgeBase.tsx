
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Users,
  Building,
  DollarSign,
  Briefcase,
  Scale,
  Settings,
  Lightbulb
} from 'lucide-react';

const KnowledgeBase = () => {
  const departments = [
    {
      name: 'HR',
      description: 'Human Resources policies, procedures, and employee information',
      documentCount: 45,
      color: 'bg-blue-100 text-blue-800',
      icon: Users,
      slug: 'hr'
    },
    {
      name: 'IT',
      description: 'Technical documentation, security protocols, and system guides',
      documentCount: 67,
      color: 'bg-green-100 text-green-800',
      icon: Settings,
      slug: 'it'
    },
    {
      name: 'Finance',
      description: 'Financial policies, reporting guidelines, and budget information',
      documentCount: 23,
      color: 'bg-purple-100 text-purple-800',
      icon: DollarSign,
      slug: 'finance'
    },
    {
      name: 'Sales',
      description: 'Sales processes, customer guidelines, and performance metrics',
      documentCount: 34,
      color: 'bg-orange-100 text-orange-800',
      icon: Briefcase,
      slug: 'sales'
    },
    {
      name: 'Marketing',
      description: 'Brand guidelines, campaign processes, and marketing materials',
      documentCount: 28,
      color: 'bg-pink-100 text-pink-800',
      icon: Lightbulb,
      slug: 'marketing'
    },
    {
      name: 'Legal',
      description: 'Legal documents, contracts, and compliance information',
      documentCount: 12,
      color: 'bg-red-100 text-red-800',
      icon: Scale,
      slug: 'legal'
    },
    {
      name: 'Operations',
      description: 'Operational procedures, workflows, and standard practices',
      documentCount: 19,
      color: 'bg-yellow-100 text-yellow-800',
      icon: Building,
      slug: 'operations'
    },
    {
      name: 'Product',
      description: 'Product specifications, development guides, and roadmaps',
      documentCount: 41,
      color: 'bg-indigo-100 text-indigo-800',
      icon: FileText,
      slug: 'product'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Knowledge Base
        </h1>
        <p className="text-gray-600">Access department-specific documents and resources</p>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {departments.map((dept) => {
          const IconComponent = dept.icon;
          return (
            <Link key={dept.name} to={`/knowledge-base/${dept.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${dept.color.replace('text-', 'bg-').replace('-800', '-500')}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {dept.documentCount} docs
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {dept.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeBase;
