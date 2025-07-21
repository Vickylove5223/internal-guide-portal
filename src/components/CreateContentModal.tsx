
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, BookOpen } from 'lucide-react';
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

  const handleCreateContent = (type: 'post' | 'knowledge-base' | 'event') => {
    onOpenChange(false);
    
    switch (type) {
      case 'post':
        navigate('/create-post');
        break;
      case 'knowledge-base':
        navigate('/create-knowledge-base');
        break;
      case 'event':
        navigate('/create-event');
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 py-4 flex-row justify-center">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={() => handleCreateContent('post')}
          >
            <FileText className="h-8 w-8" />
            <span>Create Post</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={() => handleCreateContent('knowledge-base')}
          >
            <BookOpen className="h-8 w-8" />
            <span>Create Knowledge Base</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={() => handleCreateContent('event')}
          >
            <Calendar className="h-8 w-8" />
            <span>Create Event</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
