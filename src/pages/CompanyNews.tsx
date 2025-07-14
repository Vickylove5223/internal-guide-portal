
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Calendar,
  User
} from 'lucide-react';

const CompanyNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'Q4 Company Performance Review',
      content: 'We are excited to share our outstanding Q4 results. Revenue increased by 23% compared to last quarter, and we successfully onboarded 50 new team members across all departments.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Company Updates',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
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
      id: 3,
      title: 'Technology Infrastructure Upgrade',
      content: 'Our IT team has completed a major infrastructure upgrade that will improve system performance by 40% and enhance security protocols across all platforms.',
      author: 'David Rodriguez',
      date: '2024-01-10',
      category: 'Tech Updates',
      image: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png'
    },
    {
      id: 4,
      title: 'Quarterly Team Building Event',
      content: 'Join us for our quarterly team building event on January 25th. Activities include workshops, networking sessions, and celebration of team achievements.',
      author: 'Lisa Wang',
      date: '2024-01-08',
      category: 'Events',
      image: '/lovable-uploads/ffe33128-72d3-4275-8536-d3aa5f60ceb6.png'
    },
    {
      id: 5,
      title: 'Sustainability Initiative Launch',
      content: 'We are proud to announce our new sustainability initiative aimed at reducing our carbon footprint by 30% over the next two years through various green practices.',
      author: 'Emma Thompson',
      date: '2024-01-05',
      category: 'Company Updates',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png'
    }
  ];

  const categories = ['all', 'Company Updates', 'HR Updates', 'Tech Updates', 'Events'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || post.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header with Image */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Updates</h1>
              <p className="text-gray-600 mb-6">Stay informed with the latest company news and announcements</p>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex space-x-1 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeTab === category ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Image */}
            <div className="ml-8">
              <img
                src="/lovable-uploads/57896a25-fe3a-4385-9a9d-a634bdd46940.png"
                alt="Company Updates"
                className="w-64 h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCardClick(post.id)}
              >
                {post.image && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyNews;
