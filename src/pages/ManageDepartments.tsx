
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GripVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManageDepartments = () => {
  const { department } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for departments and their documents
  const departmentData = {
    hr: {
      name: 'HR',
      description: 'Human Resources policies, procedures, and employee information',
      documents: [
        {
          id: 1,
          title: 'Employee Handbook 2024',
          description: 'Complete guide for all employees',
          status: 'Published',
          author: 'HR Team',
          createdAt: '2024-01-15T11:30:00Z',
          order: 1
        },
        {
          id: 2,
          title: 'Performance Review Guidelines',
          description: 'Annual performance review process',
          status: 'Published',
          author: 'HR Team',
          createdAt: '2024-01-10T16:20:00Z',
          order: 2
        },
        {
          id: 3,
          title: 'Leave Policy 2024',
          description: 'Updated leave and vacation policies',
          status: 'Draft',
          author: 'HR Team',
          createdAt: '2024-01-08T09:15:00Z',
          order: 3
        }
      ]
    },
    it: {
      name: 'IT',
      description: 'Technical documentation, security protocols, and system guides',
      documents: [
        {
          id: 4,
          title: 'IT Security Guidelines',
          description: 'Security protocols and best practices',
          status: 'Published',
          author: 'IT Team',
          createdAt: '2024-01-20T14:30:00Z',
          order: 1
        },
        {
          id: 5,
          title: 'Software Installation Guide',
          description: 'Step-by-step software installation',
          status: 'Published',
          author: 'IT Team',
          createdAt: '2024-01-18T10:20:00Z',
          order: 2
        }
      ]
    },
    finance: {
      name: 'Finance',
      description: 'Financial policies, reporting guidelines, and budget information',
      documents: [
        {
          id: 6,
          title: 'Expense Policy 2024',
          description: 'Updated expense and reimbursement policies',
          status: 'Published',
          author: 'Finance Team',
          createdAt: '2024-01-12T13:45:00Z',
          order: 1
        }
      ]
    }
  };

  const currentDept = departmentData[department as keyof typeof departmentData];
  const [documents, setDocuments] = useState(currentDept?.documents || []);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  if (!currentDept) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Department Not Found</h1>
          <Button onClick={() => navigate('/post-management')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Management
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newDocuments = [...documents];
    const draggedDocument = newDocuments[draggedItem];
    
    // Remove the dragged item
    newDocuments.splice(draggedItem, 1);
    
    // Insert it at the new position
    newDocuments.splice(dropIndex, 0, draggedDocument);
    
    // Update order values
    const updatedDocuments = newDocuments.map((doc, index) => ({
      ...doc,
      order: index + 1
    }));
    
    setDocuments(updatedDocuments);
    setDraggedItem(null);
    
    toast({
      title: "Order updated",
      description: "Document order has been successfully updated.",
    });
  };

  const handleDocumentAction = (action: string, document: any) => {
    switch (action) {
      case 'view':
        navigate(`/knowledge-base/${department}/document/${document.id}`);
        break;
      case 'edit':
        navigate(`/knowledge-base/edit/${document.id}`);
        break;
      case 'delete':
        setDocuments(prev => prev.filter(d => d.id !== document.id));
        toast({
          title: "Document deleted",
          description: "The document has been successfully deleted.",
        });
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/post-management')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage {currentDept.name} Department
            </h1>
            <p className="text-gray-600">{currentDept.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {documents.length} document{documents.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Drag and drop the documents using the grip handle to reorder them. 
            The order will be saved automatically and reflected in the department page.
          </p>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No documents found in this department.</p>
            </CardContent>
          </Card>
        ) : (
          documents.map((document, index) => (
            <Card 
              key={document.id}
              className="transition-all duration-200 hover:shadow-md cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing p-1">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Order Number */}
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {document.order}
                    </Badge>
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {document.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {document.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>By {document.author}</span>
                          <span>•</span>
                          <span>{formatDate(document.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                          {document.status}
                        </Badge>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDocumentAction('view', document)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDocumentAction('edit', document)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDocumentAction('delete', document)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageDepartments;
