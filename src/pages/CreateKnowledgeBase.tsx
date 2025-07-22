
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
  const [docType, setDocType] = useState('');
  const [status, setStatus] = useState('draft');
  const [author, setAuthor] = useState('');
  const [departmentTags, setDepartmentTags] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const docTypeOptions = [
    'Onboarding',
    'Company Policy',
    'Procedure',
    'Guideline',
    'Company Products'
  ];

  const userOptions = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Jessica Miller',
    'Robert Taylor',
    'Amanda Anderson',
    'Christopher Lee',
    'Lisa Garcia'
  ];

  const departmentOptions = [
    'Human Resources',
    'Information Technology',
    'Finance',
    'Sales',
    'Marketing',
    'Legal',
    'Operations',
    'Product'
  ];

  // If editing, load document data from localStorage
  React.useEffect(() => {
    if (id) {
      const documents = JSON.parse(localStorage.getItem('documents') || '[]');
      const doc = documents.find((d: any) => d.id === parseInt(id));
      if (doc) {
        setTitle(doc.title);
        setContent(doc.content);
        setDocType(doc.docType || '');
        setStatus(doc.status);
        setAuthor(doc.author || '');
        setDepartmentTags(doc.departmentTags || []);
      }
    }
  }, [id]);

  const handleAddDepartmentTag = () => {
    if (selectedDepartment && !departmentTags.includes(selectedDepartment)) {
      setDepartmentTags([...departmentTags, selectedDepartment]);
      setSelectedDepartment('');
    }
  };

  const handleRemoveDepartmentTag = (tagToRemove: string) => {
    setDepartmentTags(departmentTags.filter(tag => tag !== tagToRemove));
  };

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

    if (!docType) {
      toast({
        title: "Validation Error",
        description: "Please select a document type.",
        variant: "destructive"
      });
      return;
    }

    if (!author) {
      toast({
        title: "Validation Error",
        description: "Please select an author.",
        variant: "destructive"
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing documents
      const existingDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
      
      const documentData = {
        id: id ? parseInt(id) : Date.now(),
        title: title.trim(),
        content: content.trim(),
        docType: docType,
        status: status,
        author: author,
        departmentTags: departmentTags,
        createdAt: id ? existingDocuments.find((d: any) => d.id === parseInt(id))?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let updatedDocuments;
      if (id) {
        // Update existing document
        updatedDocuments = existingDocuments.map((d: any) => 
          d.id === parseInt(id) ? documentData : d
        );
      } else {
        // Add new document
        updatedDocuments = [documentData, ...existingDocuments];
      }
      
      // Save to localStorage
      localStorage.setItem('documents', JSON.stringify(updatedDocuments));
      
      console.log('Saving knowledge base document:', documentData);
      
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
              .doc-type { background: #e0f2fe; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-bottom: 10px; }
              .author { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; display: inline-block; margin: 5px; }
            </style>
          </head>
          <body>
            <div class="meta">
              <span class="doc-type">Type: ${docType}</span>
              <span class="author">Author: ${author}</span>
            </div>
            <h1>${title}</h1>
            <div class="content">${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  // Removed department functions as we're now using document types

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
                <Label htmlFor="docType">Document Type</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {docTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Select value={author} onValueChange={setAuthor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    {userOptions.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="departmentTags">Department Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      onClick={handleAddDepartmentTag}
                      disabled={!selectedDepartment || departmentTags.includes(selectedDepartment)}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  {departmentTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {departmentTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveDepartmentTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
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
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  onClick={handleSaveDocument}
                  className="w-full"
                >
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
