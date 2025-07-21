
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Eye, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const CreateKnowledgeBase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [status, setStatus] = useState('draft');
  const [documentType, setDocumentType] = useState('');

  const departmentOptions = [
    'Human Resources',
    'Information Technology', 
    'Finance',
    'Operations',
    'Legal',
    'Marketing',
    'Sales',
    'Customer Service',
    'Research & Development',
    'Quality Assurance',
    'Procurement',
    'Administration'
  ];

  // If editing, load document data (mocked for now)
  React.useEffect(() => {
    if (id) {
      // Replace with real fetch logic as needed
      const doc = {
        title: 'Sample Document',
        content: 'Sample content',
        departments: ['HR'],
        status: 'draft',
        documentType: 'policy'
      };
      setTitle(doc.title);
      setContent(doc.content);
      setDepartments(doc.departments);
      setStatus(doc.status);
      setDocumentType(doc.documentType);
    }
  }, [id]);

  const handleSaveDocument = async () => {
    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for your knowledge base document.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Validation Error", 
        description: "Please add content to your knowledge base document.",
        variant: "destructive"
      });
      return;
    }

    if (departments.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one department for your document.",
        variant: "destructive"
      });
      return;
    }

    if (!documentType) {
      toast({
        title: "Validation Error",
        description: "Please select a document type.",
        variant: "destructive"
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving knowledge base document:', { 
        title, 
        content, 
        departments, 
        status, 
        documentType
      });
      
      toast({
        title: "Success",
        description: `Knowledge base document ${status === 'published' ? 'published' : 'saved'} successfully!`,
      });
      
      navigate('/post-management');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save knowledge base document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Preview Error",
        description: "Please add a title and content before previewing.",
        variant: "destructive"
      });
      return;
    }

    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Preview: ${title}</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              h1 { color: #333; }
              .content { line-height: 1.6; }
              .meta { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; }
              .department { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; display: inline-block; margin: 5px; }
              .document-type { background: #e0f2fe; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div>
              <span class="document-type">${documentType}</span>
            </div>
            <div>
              ${departments.map(dept => `<span class="department">${dept}</span>`).join('')}
            </div>
            <h1>${title}</h1>
            <div class="content">${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const addDepartment = (department: string) => {
    if (!departments.includes(department)) {
      setDepartments([...departments, department]);
    }
  };

  const removeDepartment = (department: string) => {
    setDepartments(departments.filter(d => d !== department));
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image', 'blockquote', 'code-block'
  ];

  const getActionText = () => {
    switch (status) {
      case 'published': return 'Publish Document';
      case 'review': return 'Submit for Review';
      default: return 'Save Document';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/post-management')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Knowledge Base</h1>
            <p className="text-gray-600">Create documentation and guides</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  placeholder="Enter document title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="documentType">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                    <SelectItem value="guideline">Guideline</SelectItem>
                    <SelectItem value="handbook">Handbook</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="departments">Departments</Label>
                <Select onValueChange={addDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem 
                        key={dept} 
                        value={dept}
                        disabled={departments.includes(dept)}
                      >
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {departments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {departments.map((dept, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {dept}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeDepartment(dept)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <div className="border rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your document content here..."
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handlePreview} className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleSaveDocument} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {getActionText()}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeBase;
