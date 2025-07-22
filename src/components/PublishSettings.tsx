
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Save, Eye } from 'lucide-react';

interface PublishSettingsProps {
  status: string;
  setStatus: (status: string) => void;
  onPreview: () => void;
  onSave: () => void;
}

const PublishSettings: React.FC<PublishSettingsProps> = ({
  status,
  setStatus,
  onPreview,
  onSave,
}) => {
  const getButtonText = () => {
    switch (status) {
      case 'published': return 'Publish Post';
      case 'scheduled': return 'Schedule Post';
      default: return 'Save Draft';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Button variant="outline" onClick={onPreview} className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={onSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishSettings;
