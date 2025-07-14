
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
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '@/hooks/use-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Validation Error", 
        description: "Please add content to your post.",
        variant: "destructive"
      });
      return;
    }

    if (!category) {
      toast({
        title: "Validation Error",
        description: "Please select a category for your post.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving post:', { title, content, category, status });
      
      toast({
        title: "Success",
        description: `Post ${status === 'published' ? 'published' : 'saved'} successfully!`,
      });
      
      navigate('/post-management');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
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

    // Create a preview window
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
              .category { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="category">${category.replace('-', ' ')}</div>
            <h1>${title}</h1>
            <div class="content">${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image'
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-600">Write and publish your content</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
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
                    placeholder="Write your post content here..."
                    style={{ minHeight: '300px' }}
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="politics-news">Politics News</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="company-news">Company News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
