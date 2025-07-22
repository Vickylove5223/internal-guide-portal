
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { useCategories } from '@/contexts/CategoryContext';

const Index = () => {
  const navigate = useNavigate();
  const { categories, updateCategoryPostCounts } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('posts/all-updates');
  const [allPosts, setAllPosts] = useState([]);
  
  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setAllPosts(JSON.parse(storedPosts));
      updateCategoryPostCounts(); // Update counts when posts load
    }
  }, [updateCategoryPostCounts]);

  // Listen for storage changes to update posts
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'posts') {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setAllPosts(JSON.parse(storedPosts));
          updateCategoryPostCounts();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateCategoryPostCounts]);

  // Map category names to slugs for filtering
  const categoryNameToSlug = Object.fromEntries(categories.map(cat => [cat.name, cat.slug]));

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'posts/all-updates' || !selectedCategory || selectedCategory === ''
    ? allPosts.filter(post => post.status === 'published') // Show only published posts in All Updates
    : allPosts.filter(post => {
        // For specific categories, show published posts that match the category
        if (post.status !== 'published') return false;
        
        // Match by category name or if the category name matches any category
        const matchingCategory = categories.find(cat => 
          cat.name === post.category || 
          cat.slug === post.category ||
          cat.name.toLowerCase().replace(/\s+/g, '-') === post.category?.toLowerCase()?.replace(/\s+/g, '-')
        );
        return matchingCategory?.slug === selectedCategory;
      });

  const [latestPost, ...otherPosts] = filteredPosts;

  const handleCardClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Find the selected category name for the heading
  const selectedCategoryName = selectedCategory === 'posts/all-updates' || !selectedCategory || selectedCategory === ''
    ? 'All Updates' 
    : categories.find(cat => cat.slug === selectedCategory)?.name || 'All Updates';

  return (
    <Layout onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory}>
      <div className="min-h-screen">
        <div className="flex">
          <div className="flex-1 px-[100px] py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCategoryName}</h1>
              <p className="text-gray-600 mb-6">Latest updates from across the company</p>
              {/* Featured Latest Post */}
              {latestPost && (
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8 bg-transparent border-0"
                  onClick={() => handleCardClick(latestPost.id)}
                >
                  <div className="flex">
                    {latestPost.image && (
                      <div className="w-48 h-full flex-shrink-0">
                        <img 
                          src={latestPost.image} 
                          alt={latestPost.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-2xl line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{latestPost.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {latestPost.content}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{latestPost.author}</span>
                          <span>•</span>
                          <span>{formatDate(latestPost.date)}</span>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )}
              {/* Other Posts with Sidebar */}
              {otherPosts.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">More Updates</h2>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-6">
                      {otherPosts.map((post) => (
                        <Card 
                          key={post.id} 
                          className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-transparent border-0"
                          onClick={() => handleCardClick(post.id)}
                        >
                          <div className="flex">
                            {post.image && (
                              <div className="w-48 h-full flex-shrink-0">
                                <img 
                                  src={post.image} 
                                  alt={post.title}
                                  className="w-full h-full object-cover rounded-l-lg"
                                />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0 flex-1">
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                  {post.content}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{post.author}</span>
                                  <span>•</span>
                                  <span>{formatDate(post.date)}</span>
                                </div>
                              </CardContent>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {/* Sidebar */}
                    <div className="w-full lg:w-96">
                      <div className="sticky top-6">
                        <img
                          src="/lovable-uploads/3d5b1ac3-5c8f-49a4-b3bb-872eeb6148fe.png"
                          alt="Our Products"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
