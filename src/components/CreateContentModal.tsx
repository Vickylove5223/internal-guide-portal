
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateContentModal: React.FC<CreateContentModalProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();

  const handleCreateContent = (type: 'post' | 'knowledge' | 'event') => {
    onOpenChange(false);
    switch (type) {
      case 'post':
        navigate('/post-management/new');
        break;
      case 'knowledge':
        navigate('/knowledge-base/new');
        break;
      case 'event':
        navigate('/events/new');
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleCreateContent('post')}>
            <CardContent className="flex items-center gap-4 p-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Create Post</h3>
                <p className="text-sm text-gray-600">Create a new blog post or announcement</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleCreateContent('knowledge')}>
            <CardContent className="flex items-center gap-4 p-4">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-medium">Create Knowledge Base</h3>
                <p className="text-sm text-gray-600">Add a new document to knowledge base</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleCreateContent('event')}>
            <CardContent className="flex items-center gap-4 p-4">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-medium">Create Event</h3>
                <p className="text-sm text-gray-600">Schedule a new event or meeting</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
