
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  FileText,
  Video,
  Image,
  Clock,
  User,
  Eye,
} from 'lucide-react';

const DocumentView = () => {
  const { department, documentId } = useParams();

  // Sample document data - in real app this would come from API
  const document = {
    id: 1,
    title: 'Employee Handbook 2024',
    description: 'Complete guide to company policies, procedures, and benefits',
    content: `
      <h2>Welcome to Our Company</h2>
      <p>This handbook contains important information about our company policies, procedures, and benefits. Please read through it carefully and keep it as a reference.</p>
      
      <h3>Company Mission</h3>
      <p>Our mission is to create innovative solutions that make a positive impact on our customers and communities.</p>
      
      <h3>Core Values</h3>
      <ul>
        <li>Integrity: We conduct business with honesty and transparency</li>
        <li>Innovation: We continuously seek new and better ways to serve our customers</li>
        <li>Collaboration: We work together to achieve common goals</li>
        <li>Excellence: We strive for the highest quality in everything we do</li>
      </ul>
      
      <h3>Work Schedule</h3>
      <p>Our standard work hours are Monday through Friday, 9:00 AM to 5:00 PM. We offer flexible work arrangements to support work-life balance.</p>
      
      <h3>Benefits Package</h3>
      <p>We provide comprehensive benefits including:</p>
      <ul>
        <li>Health insurance coverage</li>
        <li>Dental and vision insurance</li>
        <li>Retirement savings plan with company matching</li>
        <li>Paid time off and holidays</li>
        <li>Professional development opportunities</li>
      </ul>
      
      <h3>Code of Conduct</h3>
      <p>All employees are expected to maintain the highest standards of professional conduct and treat colleagues with respect and dignity.</p>
    `,
    type: 'document',
    author: 'Sarah Johnson',
    lastUpdated: '2024-01-15T10:30:00Z',
    version: '3.2',
    status: 'approved',
    size: '5.2 MB',
    views: 1247,
    department: 'hr'
  };

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
      month: 'long',
      day: 'numeric'
    });
  };

  const TypeIcon = getTypeIcon(document.type);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to={`/knowledge-base/${department}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <TypeIcon className="h-12 w-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {document.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{document.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <Badge className={getStatusColor(document.status)} variant="outline">
                  {document.status}
                </Badge>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{document.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(document.lastUpdated)}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{document.views} views</span>
                </div>
                <span>v{document.version}</span>
                <span>{document.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
