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

const CompanyEvents = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 4,
      title: 'Quarterly Team Building Event',
      content: 'Join us for our quarterly team building event on January 25th. Activities include workshops, networking sessions, and celebration of team achievements.',
      author: 'Lisa Wang',
      date: '2024-01-08',
      category: 'Company Events',
      image: '/lovable-uploads/ffe33128-72d3-4275-8536-d3aa5f60ceb6.png'
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Events</h1>
            <p className="text-gray-600 mb-6">Upcoming events and team activities</p>
            
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
                <h2 className="text-xl font-semibold text-gray-900">More Company Events</h2>
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

export default CompanyEvents;
