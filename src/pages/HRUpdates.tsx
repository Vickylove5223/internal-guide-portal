import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Calendar,
  User
} from 'lucide-react';

const HRUpdates = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 2,
      title: 'New Employee Benefits Package',
      content: 'Starting February 1st, we are introducing enhanced benefits including improved health insurance, flexible working arrangements, and professional development stipends.',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'HR Updates',
      image: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png'
    }
  ];

  const [latestPost, ...otherPosts] = posts;

  const handleCardClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 p-6 pr-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Updates</h1>
            <p className="text-gray-600 mb-6">Human resources news and policy updates</p>
            
            {/* Featured Latest Post */}
            {latestPost && (
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8"
                onClick={() => handleCardClick(latestPost.id)}
              >
                <div className="flex flex-col">
                  {latestPost.image && (
                    <div className="w-full h-64">
                      <img 
                        src={latestPost.image} 
                        alt={latestPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xl">{latestPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {latestPost.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{latestPost.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(latestPost.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )}

            {/* Other Posts Listing */}
            {otherPosts.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">More HR Updates</h2>
                {otherPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                    onClick={() => handleCardClick(post.id)}
                  >
                    <div className="flex">
                      {post.image && (
                        <div className="w-48 h-32 flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 flex flex-col">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1">
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-96 p-6">
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
  );
};

export default HRUpdates;
