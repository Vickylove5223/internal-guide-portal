
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  ThumbsUp,
  Share2,
  Calendar,
  User
} from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);

  // Sample post data - in real app this would come from API
  const post = {
    id: 1,
    title: 'Q4 Company Performance Review',
    content: `
      <p>We are excited to share our outstanding Q4 results with all team members. This quarter has been exceptional in many ways, and we want to take a moment to celebrate our collective achievements.</p>
      
      <h3>Financial Performance</h3>
      <p>Revenue increased by 23% compared to the previous quarter, surpassing our initial projections by 8%. This growth can be attributed to several key factors:</p>
      <ul>
        <li>Successful launch of our new product line</li>
        <li>Expansion into three new markets</li>
        <li>Improved customer retention rates</li>
        <li>Enhanced operational efficiency</li>
      </ul>
      
      <h3>Team Growth</h3>
      <p>We successfully onboarded 50 new team members across all departments, bringing fresh perspectives and valuable expertise to our organization. Our HR team has done an outstanding job ensuring smooth integration of new hires.</p>
      
      <h3>Looking Ahead</h3>
      <p>As we move into the new quarter, we're focusing on:</p>
      <ul>
        <li>Scaling our operations to meet growing demand</li>
        <li>Investing in technology infrastructure</li>
        <li>Expanding our customer support capabilities</li>
        <li>Developing new strategic partnerships</li>
      </ul>
      
      <p>Thank you to everyone for your hard work and dedication. These results are a testament to our team's commitment to excellence.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Company Updates',
    image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png'
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
