
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const allPosts = [
    {
      id: 8,
      title: 'Q4 Financial Results Announcement',
      content: 'We are pleased to announce our strongest Q4 performance in company history, with revenue growth of 35% year-over-year and expansion into three new markets.',
      author: 'Jennifer Adams',
      date: '2024-01-18',
      category: 'All Updates',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
    },
    {
      id: 1,
      title: 'Welcome to Our New Company Portal',
      content: 'We are excited to announce the launch of our new company portal. This platform will serve as your central hub for all company communications, updates, and resources.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Announcements',
      image: '/lovable-uploads/57896a25-fe3a-4385-9a9d-a634bdd46940.png'
    },
    {
      id: 9,
      title: 'Strategic Partnership with Global Tech Leader',
      content: 'Our new partnership will enhance our technology capabilities and expand our reach in international markets, providing better solutions for our clients.',
      author: 'Michael Thompson',
      date: '2024-01-16',
      category: 'All Updates',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png'
    },
    {
      id: 10,
      title: 'Innovation Lab Opens in Silicon Valley',
      content: 'Our new innovation lab will focus on emerging technologies including AI, blockchain, and IoT solutions to drive the next generation of our products.',
      author: 'Dr. Emily Chen',
      date: '2024-01-14',
      category: 'All Updates'
    },
    {
      id: 2,
      title: 'New Employee Benefits Package',
      content: 'Starting February 1st, we are introducing enhanced benefits including improved health insurance, flexible working arrangements, and professional development stipends.',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'HR Updates',
      image: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png'
    },
    {
      id: 11,
      title: 'Sustainability Initiative Launch',
      content: 'We are committed to achieving carbon neutrality by 2030 through our comprehensive sustainability program including renewable energy adoption and waste reduction.',
      author: 'Robert Green',
      date: '2024-01-12',
      category: 'All Updates'
    },
    {
      id: 3,
      title: 'Technology Infrastructure Upgrade',
      content: 'Our IT team has completed a major infrastructure upgrade that will improve system performance by 40% and enhance security protocols across all platforms.',
      author: 'David Rodriguez',
      date: '2024-01-10',
      category: 'Business News',
      image: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png'
    },
    {
      id: 12,
      title: 'Customer Success Stories Feature',
      content: 'Discover how our solutions have helped clients achieve remarkable results. This month we highlight three case studies showcasing innovation and growth.',
      author: 'Amanda Martinez',
      date: '2024-01-10',
      category: 'All Updates'
    },
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

  const [latestPost, ...otherPosts] = allPosts;

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Updates</h1>
            <p className="text-gray-600 mb-6">Latest updates from across the company</p>
            
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
  );
};

export default Index;
