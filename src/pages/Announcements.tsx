
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

const Announcements = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: 'Q4 Company Performance Review',
      content: 'We are excited to share our outstanding Q4 results. Revenue increased by 23% compared to last quarter, and we successfully onboarded 50 new team members across all departments.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Announcements',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
    },
    {
      id: 5,
      title: 'Sustainability Initiative Launch',
      content: 'We are proud to announce our new sustainability initiative aimed at reducing our carbon footprint by 30% over the next two years through various green practices.',
      author: 'Emma Thompson',
      date: '2024-01-05',
      category: 'Announcements',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png'
    }
  ];

  const handleCardClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 pr-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
            <p className="text-gray-600 mb-6">Company announcements and important updates</p>
            
            <div className="space-y-6">
              {posts.map((post) => (
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

export default Announcements;
