
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Search, Eye, MessageCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';

const Suggestions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [response, setResponse] = useState('');

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Improve Office Lighting',
      category: 'Workplace Environment',
      description: 'The office lighting is too dim in the afternoon. Consider adding more natural lighting or LED lights.',
      submittedBy: 'Anonymous',
      submittedAt: '2024-01-20T10:30:00Z',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Flexible Working Hours',
      category: 'Employee Benefits',
      description: 'Allow employees to have flexible working hours to improve work-life balance.',
      submittedBy: 'John Doe',
      submittedAt: '2024-01-18T14:20:00Z',
      status: 'reviewed',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Team Building Activities',
      category: 'General Improvement',
      description: 'Organize monthly team building activities to improve team cohesion.',
      submittedBy: 'Sarah Johnson',
      submittedAt: '2024-01-15T09:15:00Z',
      status: 'reviewed',
      priority: 'low',
      response: 'Great suggestion! We will start organizing monthly team building activities starting next month.'
    },
    {
      id: 4,
      title: 'Update Software Systems',
      category: 'Technology & Systems',
      description: 'The current project management software is outdated and slow. Consider upgrading to a more modern solution.',
      submittedBy: 'Mike Wilson',
      submittedAt: '2024-01-12T11:45:00Z',
      status: 'reviewed',
      priority: 'high',
      response: 'We have evaluated this suggestion but currently lack budget for software upgrades this quarter.'
    }
  ]);

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || suggestion.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || suggestion.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'reviewed': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (suggestionId: number, newStatus: string) => {
    setSuggestions(prev => prev.map(suggestion => 
      suggestion.id === suggestionId 
        ? { ...suggestion, status: newStatus }
        : suggestion
    ));
    
    toast({
      title: "Status Updated",
      description: `Suggestion status changed to ${newStatus}`,
    });
  };

  const handleResponseSubmit = (suggestionId: number) => {
    setSuggestions(prev => prev.map(suggestion => 
      suggestion.id === suggestionId 
        ? { ...suggestion, response: response, status: 'reviewed' }
        : suggestion
    ));
    
    toast({
      title: "Response Sent",
      description: "Your response has been saved successfully",
    });
    
    setResponse('');
    setSelectedSuggestion(null);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    if (suggestion.status === 'pending') {
      handleStatusUpdate(suggestion.id, 'reviewed');
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Suggestion',
      render: (value: string, item: any) => (
        <div 
          className="cursor-pointer hover:text-blue-600"
          onClick={() => handleSuggestionClick(item)}
        >
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{item.description.substring(0, 60)}...</div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'submittedBy',
      header: 'Submitted By',
      render: (value: string) => (
        <div className="text-sm">{value}</div>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <Badge className={`text-xs ${getPriorityColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(value)}
          <Badge className={`text-xs ${getStatusColor(value)}`}>
            {value.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    {
      key: 'submittedAt',
      header: 'Date',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, item: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleSuggestionClick(item)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suggestions Management</h1>
        <p className="text-gray-600">Review and respond to employee suggestions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search suggestions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="General Improvement">General Improvement</SelectItem>
                <SelectItem value="Workplace Environment">Workplace Environment</SelectItem>
                <SelectItem value="Technology & Systems">Technology & Systems</SelectItem>
                <SelectItem value="Employee Benefits">Employee Benefits</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredSuggestions}
      />

      {/* Suggestion Detail Modal */}
      <Dialog open={!!selectedSuggestion} onOpenChange={() => setSelectedSuggestion(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedSuggestion?.title}</DialogTitle>
          </DialogHeader>
          {selectedSuggestion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p className="text-sm text-gray-600">{selectedSuggestion.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Badge className={`text-xs ${getPriorityColor(selectedSuggestion.priority)} ml-2`}>
                    {selectedSuggestion.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-gray-600 mt-1">{selectedSuggestion.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Submitted By</label>
                  <p className="text-sm text-gray-600">{selectedSuggestion.submittedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Submitted On</label>
                  <p className="text-sm text-gray-600">{formatDate(selectedSuggestion.submittedAt)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select 
                  defaultValue={selectedSuggestion.status} 
                  onValueChange={(value) => handleStatusUpdate(selectedSuggestion.id, value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedSuggestion.response && (
                <div>
                  <label className="text-sm font-medium">Previous Response</label>
                  <p className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded">{selectedSuggestion.response}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Response</label>
                <Textarea
                  placeholder="Add your response to this suggestion..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="mt-1"
                />
                <Button 
                  onClick={() => handleResponseSubmit(selectedSuggestion.id)} 
                  className="mt-2"
                  disabled={!response.trim()}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suggestions;
