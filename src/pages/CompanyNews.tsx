
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Search, 
  Clock,
  User,
  Calendar,
  Tag
} from 'lucide-react';

const CompanyNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsCategories = ['all', 'events', 'politics', 'finance', 'company'];

  const newsItems = [
    {
      id: 1,
      title: 'Q4 Financial Results Exceed Expectations',
      excerpt: 'Our company has achieved record-breaking results in the fourth quarter, surpassing all projected targets and setting a new benchmark for future growth.',
      category: 'finance',
      author: 'Finance Team',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: '3 min read',
      image: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png',
      tags: ['Finance', 'Results', 'Growth']
    },
    {
      id: 2,
      title: 'Annual Company Retreat 2024',
      excerpt: 'Join us for our annual company retreat where we will discuss strategic initiatives, team building activities, and celebrate our achievements.',
      category: 'events',
      author: 'HR Department',
      publishedAt: '2024-01-14T16:45:00Z',
      readTime: '2 min read',
      image: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png',
      tags: ['Events', 'Team Building', 'Retreat']
    },
    {
      id: 3,
      title: 'New Government Regulations Impact',
      excerpt: 'Recent changes in government policies will affect our operations. Here\'s what you need to know about compliance and implementation.',
      category: 'politics',
      author: 'Legal Team',
      publishedAt: '2024-01-13T14:20:00Z',
      readTime: '5 min read',
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png',
      tags: ['Politics', 'Regulations', 'Compliance']
    },
    {
      id: 4,
      title: 'Welcome New Team Members',
      excerpt: 'We are excited to introduce our new team members who have joined us this month. Get to know their backgrounds and expertise.',
      category: 'company',
      author: 'HR Department',
      publishedAt: '2024-01-12T11:15:00Z',
      readTime: '4 min read',
      image: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png',
      tags: ['Company', 'Team', 'Welcome']
    },
    {
      id: 5,
      title: 'Industry Conference Highlights',
      excerpt: 'Key takeaways from the recent industry conference, including new trends, networking opportunities, and strategic insights.',
      category: 'events',
      author: 'Marketing Team',
      publishedAt: '2024-01-10T09:30:00Z',
      readTime: '6 min read',
      image: '/lovable-uploads/57896a25-fe3a-4385-9a9d-a634bdd46940.png',
      tags: ['Events', 'Conference', 'Industry']
    }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            General Info
          </h1>
          <p className="text-gray-600 mb-6">Stay updated with the latest company news and announcements</p>
          
          {/* Search Bar - No background */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search news and updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-gray-300"
            />
          </div>
        </div>
        
        {/* Image on the right side */}
        <div className="ml-8">
          <img 
            src="/lovable-uploads/ffe33128-72d3-4275-8536-d3aa5f60ceb6.png" 
            alt="Company Products" 
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* News Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="politics">Politics News</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="company">Company News</TabsTrigger>
        </TabsList>

        {newsCategories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6">
              {filteredNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 mb-3 line-clamp-2">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {item.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(item.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.readTime}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredNews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms.'
                : 'No news available for this category.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyNews;
