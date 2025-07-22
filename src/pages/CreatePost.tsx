
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/contexts/CategoryContext';
import PostForm from '@/components/PostForm';
import PublishSettings from '@/components/PublishSettings';

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCategoryPostCounts } = useCategories();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('');

  // If editing, load post data from localStorage
  React.useEffect(() => {
    if (id) {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      const post = posts.find((p: any) => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setStatus(post.status);
        setFeaturedImagePreview(post.featuredImage || '');
      }
    }
  }, [id]);

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing posts
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      
      const postData = {
        id: id ? parseInt(id) : Date.now(),
        title: title.trim(),
        content: content.trim(),
        category: category,
        status: status,
        featuredImage: featuredImagePreview,
        author: 'Current User', // You can get this from auth context
        createdAt: id ? existingPosts.find((p: any) => p.id === parseInt(id))?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let updatedPosts;
      if (id) {
        // Update existing post
        updatedPosts = existingPosts.map((p: any) => 
          p.id === parseInt(id) ? postData : p
        );
      } else {
        // Add new post
        updatedPosts = [postData, ...existingPosts];
      }
      
      // Save to localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      // Update category counts
      updateCategoryPostCounts();
      
      console.log('Saving post:', postData);
      
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
              .featured-image { width: 100%; max-width: 600px; height: auto; margin: 20px 0; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="category">${category.replace('-', ' ')}</div>
            <h1>${title}</h1>
            ${featuredImagePreview ? `<img src="${featuredImagePreview}" alt="Featured Image" class="featured-image" />` : ''}
            <div class="content">${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-600">Write and publish your content</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <PostForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            category={category}
            setCategory={setCategory}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            featuredImagePreview={featuredImagePreview}
            setFeaturedImagePreview={setFeaturedImagePreview}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PublishSettings
            status={status}
            setStatus={setStatus}
            onPreview={handlePreview}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
