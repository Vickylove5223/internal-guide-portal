
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  FileText,
  User,
  Clock,
  Eye,
  Share2
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
      <p>This handbook contains important information about our company policies, procedures, and benefits. Please read through it carefully and keep it for future reference.</p>
      
      <h3>Company Mission</h3>
      <p>Our mission is to create innovative solutions that make a positive impact on our customers and communities. We strive for excellence in everything we do while maintaining the highest standards of integrity and professionalism.</p>
      
      <h3>Core Values</h3>
      <ul>
        <li><strong>Innovation:</strong> We embrace new ideas and technologies to drive progress</li>
        <li><strong>Integrity:</strong> We conduct business with honesty and transparency</li>
        <li><strong>Collaboration:</strong> We work together to achieve common goals</li>
        <li><strong>Excellence:</strong> We strive for the highest quality in all our work</li>
        <li><strong>Respect:</strong> We treat everyone with dignity and respect</li>
      </ul>
      
      <h3>Employment Policies</h3>
      <p>Our employment policies are designed to ensure a fair, safe, and productive work environment for all employees. These policies apply to all employees regardless of their position or department.</p>
      
      <h4>Work Hours</h4>
      <p>Standard work hours are Monday through Friday, 9:00 AM to 5:00 PM. Flexible work arrangements may be available based on business needs and supervisor approval.</p>
      
      <h4>Attendance</h4>
      <p>Regular attendance is essential for the success of our business. Employees are expected to be punctual and present for all scheduled work hours.</p>
      
      <h3>Benefits</h3>
      <p>We offer a comprehensive benefits package to support our employees' health, financial security, and work-life balance.</p>
      
      <h4>Health Insurance</h4>
      <p>Company-sponsored health insurance is available to all full-time employees and their families. Coverage begins on the first day of the month following 30 days of employment.</p>
      
      <h4>Paid Time Off</h4>
      <p>Full-time employees accrue paid time off based on their length of service. PTO can be used for vacation, personal time, or illness.</p>
      
      <h3>Code of Conduct</h3>
      <p>All employees are expected to conduct themselves professionally and ethically. This includes treating colleagues, customers, and business partners with respect and courtesy.</p>
    `,
    author: 'Sarah Johnson',
    lastUpdated: '2024-01-15T10:30:00Z',
    version: '3.2',
    views: 1247
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const departmentName = department?.charAt(0).toUpperCase() + department?.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to={`/knowledge-base/${department}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{document.title}</h1>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Document Meta */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-gray-600">Author:</span>
              <span className="ml-1 font-medium">{document.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-gray-600">Updated:</span>
              <span className="ml-1 font-medium">{formatDate(document.lastUpdated)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-gray-600">Views:</span>
              <span className="ml-1 font-medium">{document.views}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700">{document.description}</p>
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
