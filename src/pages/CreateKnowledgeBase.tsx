
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
import { ArrowLeft, Save, Eye, Upload, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const CreateKnowledgeBase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('draft');
  const [documentType, setDocumentType] = useState('');
  const [tags, setTags] = useState('');
  const [summary, setSummary] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSave = async () => {
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

    if (!department) {
      toast({
        title: "Validation Error",
        description: "Please select a department for your document.",
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
        department, 
        status, 
        documentType, 
        tags, 
        summary,
        attachments: attachments.map(f => f.name)
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
              .department { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-bottom: 10px; }
              .document-type { background: #e0f2fe; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-left: 10px; }
              .summary { font-style: italic; margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #2196f3; }
            </style>
          </head>
          <body>
            <div>
              <span class="department">${department}</span>
              <span class="document-type">${documentType}</span>
            </div>
            <h1>${title}</h1>
            ${summary ? `<div class="summary">${summary}</div>` : ''}
            <div class="content">${content}</div>
            ${tags ? `<div class="meta"><strong>Tags:</strong> ${tags}</div>` : ''}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/post-management')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Knowledge Base Document</h1>
            <p className="text-gray-600">Create documentation and guides</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Document
          </Button>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
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
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of the document..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                />
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

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use tags to help others find this document (e.g., onboarding, security, benefits)
                </p>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Upload Files</Label>
                <div className="mt-2">
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeBase;
