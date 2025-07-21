import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const CompanyNews = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 8,
      title: 'Q4 Financial Results Announcement',
      content: 'We are pleased to announce our strongest Q4 performance in company history, with revenue growth of 35% year-over-year and expansion into three new markets.',
      author: 'Jennifer Adams',
      date: '2024-01-18',
      category: 'Company News',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
    },
    {
      id: 9,
      title: 'Strategic Partnership with Global Tech Leader',
      content: 'Our new partnership will enhance our technology capabilities and expand our reach in international markets, providing better solutions for our clients.',
      author: 'Michael Thompson',
      date: '2024-01-16',
      category: 'Company News',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png'
    },
    {
      id: 10,
      title: 'Innovation Lab Opens in Silicon Valley',
      content: 'Our new innovation lab will focus on emerging technologies including AI, blockchain, and IoT solutions to drive the next generation of our products.',
      author: 'Dr. Emily Chen',
      date: '2024-01-14',
      category: 'Company News'
    },
    {
      id: 11,
      title: 'Sustainability Initiative Launch',
      content: 'We are committed to achieving carbon neutrality by 2030 through our comprehensive sustainability program including renewable energy adoption and waste reduction.',
      author: 'Robert Green',
      date: '2024-01-12',
      category: 'Company News'
    },
    {
      id: 12,
      title: 'Customer Success Stories Feature',
      content: 'Discover how our solutions have helped clients achieve remarkable results. This month we highlight three case studies showcasing innovation and growth.',
      author: 'Amanda Martinez',
      date: '2024-01-10',
      category: 'Company News'
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
        <div className="flex-1 p-6 pr-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company News</h1>
            <p className="text-gray-600 mb-6">Latest company developments and achievements</p>
            
            {/* Featured Latest Post */}
            {latestPost && (
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden mb-8 border-0"
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
                      <CardTitle className="text-2xl hover:text-blue-600 transition-colors cursor-pointer">{latestPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {latestPost.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{latestPost.author}</span>
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
                <h2 className="text-xl font-semibold text-gray-900">More Company News</h2>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-6">
                    {otherPosts.map((post) => (
                      <Card 
                        key={post.id} 
                        className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden border-0"
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
                              <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 flex-1">
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {post.content}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyNews;
