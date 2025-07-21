
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const BusinessNews = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 3,
      title: 'Technology Infrastructure Upgrade',
      content: 'Our IT team has completed a major infrastructure upgrade that will improve system performance by 40% and enhance security protocols across all platforms.',
      author: 'David Rodriguez',
      date: '2024-01-10',
      category: 'Business News',
      image: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png'
    }
  ];

  const [latestPost, ...otherPosts] = posts;

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

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 px-[100px] py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business News</h1>
            <p className="text-gray-600 mb-6">Technology updates and business developments</p>
            
            {/* Featured Latest Post */}
            {latestPost && (
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8 bg-transparent border-0"
                onClick={() => handleCardClick(latestPost.id)}
              >
                <div className="flex">
                  {latestPost.image && (
                    <div className="w-48 h-32 flex-shrink-0">
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
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{latestPost.author}</span>
                        <span>{formatDate(latestPost.date)}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )}

            {/* Other Posts Listing */}
            {otherPosts.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">More Business News</h2>
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
                            <div className="w-48 h-32 flex-shrink-0">
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
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{post.author}</span>
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
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {otherPosts.length === 0 && (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <Card className="p-8 text-center bg-transparent border-0">
                    <CardContent>
                      <p className="text-gray-500">No additional business news available at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Sidebar */}
                <div className="w-full lg:w-96">
                  <div className="sticky top-6">
                    <img
                      src="/lovable-uploads/3d5b1ac3-5c8f-49a4-b3bb-872eeb6148fe.png"
                      alt="Our Products"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessNews;
