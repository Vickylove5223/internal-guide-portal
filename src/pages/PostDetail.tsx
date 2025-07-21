
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  ThumbsUp,
  Share2,
  Calendar,
  User,
  MapPin,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);
  const [isRSVPed, setIsRSVPed] = useState(false);

  // Sample post/event data - in real app this would come from API
  const getPostData = (postId: string) => {
    // Event data
    if (postId === '4' || postId === '13' || postId === '14' || postId === '15') {
      return {
        id: parseInt(postId),
        title: postId === '4' ? 'Quarterly Team Building Event' : 
               postId === '13' ? 'Annual Company Retreat 2024' :
               postId === '14' ? 'Q1 All-Hands Meeting' : 'Innovation Showcase',
        content: `
          <p>Join us for an exciting company event that will bring our team together for collaboration, learning, and celebration.</p>
          
          <h3>Event Highlights</h3>
          <ul>
            <li>Interactive workshops and team building activities</li>
            <li>Networking opportunities with colleagues</li>
            <li>Celebration of recent achievements</li>
            <li>Refreshments and catered lunch</li>
          </ul>
          
          <h3>Agenda</h3>
          <ul>
            <li><strong>9:00 AM - 9:30 AM:</strong> Registration and welcome coffee</li>
            <li><strong>9:30 AM - 11:00 AM:</strong> Opening session and team activities</li>
            <li><strong>11:00 AM - 12:30 PM:</strong> Workshop sessions</li>
            <li><strong>12:30 PM - 1:30 PM:</strong> Lunch break</li>
            <li><strong>1:30 PM - 3:00 PM:</strong> Collaborative projects</li>
            <li><strong>3:00 PM - 4:30 PM:</strong> Presentations and recognition</li>
            <li><strong>4:30 PM - 5:00 PM:</strong> Closing remarks and networking</li>
          </ul>
          
          <p>Please RSVP by clicking the button below. We look forward to seeing you there!</p>
        `,
        author: 'Lisa Wang',
        date: '2024-01-25',
        time: '9:00 AM - 5:00 PM',
        location: 'Conference Center, Building A',
        attendees: 45,
        category: 'Company Events',
        image: '/lovable-uploads/ffe33128-72d3-4275-8536-d3aa5f60ceb6.png',
        isEvent: true
      };
    }
    
    // Regular post data
    return {
      id: parseInt(postId || '1'),
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
      image: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png',
      isEvent: false
    };
  };

  const post = getPostData(id || '1');

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    toast({
      title: liked ? "Removed like" : "Liked!",
      description: liked ? "You unliked this post" : "Thanks for liking this post",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.content.substring(0, 100) + '...',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: "Post shared successfully",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Post link copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share failed",
        description: "Unable to share this post",
        variant: "destructive"
      });
    }
  };

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    toast({
      title: isRSVPed ? "RSVP Cancelled" : "RSVP Confirmed!",
      description: isRSVPed ? "You've cancelled your RSVP for this event" : "Thanks for confirming your attendance",
    });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-[100px] py-8">
        {/* Back Button */}
        <Link to={post.isEvent ? "/company-events" : "/"}>
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {post.isEvent ? "Events" : "All Updates"}
          </Button>
        </Link>

        {/* Post/Event Header */}
        <div className="mb-8">
          {post.isEvent && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Company Event</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span>{formatEventDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span>{post.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>{post.location}</span>
                </div>
              </div>
              {post.attendees && (
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span>{post.attendees} people attending</span>
                </div>
              )}
            </div>
          )}

          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>By {post.author}</span>
            </div>
            {!post.isEvent && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
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
            {post.isEvent && (
              <Button
                variant={isRSVPed ? "default" : "outline"}
                size="sm"
                onClick={handleRSVP}
                className="flex items-center space-x-2"
              >
                {isRSVPed ? <CheckCircle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                <span>{isRSVPed ? 'RSVP Confirmed' : 'RSVP'}</span>
              </Button>
            )}
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

        {/* Post/Event Content */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div 
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-center space-x-4 bg-white rounded-lg p-6 shadow-sm">
          <Button
            variant={liked ? "default" : "outline"}
            onClick={handleLike}
            className="flex items-center space-x-2"
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{liked ? 'Liked' : 'Like'} ({likes})</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          {post.isEvent && (
            <Button
              variant={isRSVPed ? "default" : "outline"}
              onClick={handleRSVP}
              className="flex items-center space-x-2"
            >
              {isRSVPed ? <CheckCircle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              <span>{isRSVPed ? 'RSVP Confirmed' : 'RSVP for Event'}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
