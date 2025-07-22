
import React, { useState, useEffect } from 'react';
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
  BookOpen,
  Briefcase,
  Scale,
  Settings,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState([]);
  const [docTypeCounts, setDocTypeCounts] = useState({});

  // Load documents from localStorage
  useEffect(() => {
    const storedDocuments = localStorage.getItem('documents');
    if (storedDocuments) {
      const docs = JSON.parse(storedDocuments);
      setDocuments(docs);
      
      // Calculate document counts by type
      const counts = docs.reduce((acc: any, doc: any) => {
        if (doc.status === 'published') {
          acc[doc.docType] = (acc[doc.docType] || 0) + 1;
        }
        return acc;
      }, {});
      setDocTypeCounts(counts);
    }
  }, []);

  const docTypes = [
    {
      name: 'Onboarding',
      description: 'New employee guides, orientation materials, and getting started resources',
      documentCount: docTypeCounts['Onboarding'] || 0,
      color: 'bg-blue-100 text-blue-800',
      icon: GraduationCap,
      slug: 'onboarding'
    },
    {
      name: 'Company Policy',
      description: 'Official company policies, rules, and regulations',
      documentCount: docTypeCounts['Company Policy'] || 0,
      color: 'bg-green-100 text-green-800',
      icon: Scale,
      slug: 'company-policy'
    },
    {
      name: 'Procedure',
      description: 'Step-by-step procedures and operational workflows',
      documentCount: docTypeCounts['Procedure'] || 0,
      color: 'bg-purple-100 text-purple-800',
      icon: Settings,
      slug: 'procedure'
    },
    {
      name: 'Guideline',
      description: 'Best practices, recommendations, and helpful guidelines',
      documentCount: docTypeCounts['Guideline'] || 0,
      color: 'bg-orange-100 text-orange-800',
      icon: Lightbulb,
      slug: 'guideline'
    },
    {
      name: 'Company Products',
      description: 'Product documentation, specifications, and user guides',
      documentCount: docTypeCounts['Company Products'] || 0,
      color: 'bg-pink-100 text-pink-800',
      icon: BookOpen,
      slug: 'company-products'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Knowledge Base
        </h1>
        <p className="text-gray-600">Access documents organized by type and category</p>
      </div>

      {/* Document Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {docTypes.map((docType) => {
          const IconComponent = docType.icon;
          return (
            <Link key={docType.name} to={`/knowledge-base/${docType.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${docType.color.replace('text-', 'bg-').replace('-800', '-500')}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {docType.documentCount} docs
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{docType.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600">
                    {docType.description}
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
