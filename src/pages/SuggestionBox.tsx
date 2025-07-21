
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Send, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SuggestionBox = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    category: '',
    description: '',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    'General Improvement',
    'Workplace Environment',
    'Technology & Systems',
    'Process Improvement',
    'Employee Benefits',
    'Training & Development',
    'Communication',
    'Other'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnonymousChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      anonymous: checked,
      fullName: checked ? '' : prev.fullName
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.anonymous && !formData.fullName) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name or select anonymous submission.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log('Submitting suggestion:', formData);
      
      // Reset form
      setFormData({
        fullName: '',
        title: '',
        category: '',
        description: '',
        anonymous: false
      });

      toast({
        title: "Suggestion Submitted",
        description: "Thank you for your suggestion! We'll review it and get back to you.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your suggestion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Suggestion Box</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We value your feedback and ideas. Help us improve by sharing your suggestions, 
          concerns, or innovative ideas for making our workplace better.
        </p>
      </div>

      {/* Suggestion Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submit a Suggestion</CardTitle>
              <CardDescription>
                Your input helps us create a better workplace for everyone.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Tip
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Suggestion Guidelines</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Be specific and clear in your suggestion</p>
                  <p>• Explain the problem or opportunity you've identified</p>
                  <p>• Suggest a solution or improvement</p>
                  <p>• Consider the potential impact and benefits</p>
                  <p>• All suggestions are reviewed by management</p>
                  <p>• You'll receive feedback on your suggestion within 5-7 business days</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name or Anonymous */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => handleAnonymousChange(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="anonymous">Submit anonymously</Label>
              </div>
              
              {!formData.anonymous && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required={!formData.anonymous}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Suggestion Title *</Label>
              <Input
                id="title"
                placeholder="Brief title for your suggestion"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your suggestion in detail. What problem does it solve? How would it improve things?"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Suggestion
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionBox;
