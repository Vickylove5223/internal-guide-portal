
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderOpen, 
  Search, 
  Upload,
  Download,
  Eye,
  Trash2,
  Share2,
  MoreHorizontal,
  Grid,
  List,
  FileText,
  Image,
  Video,
  File,
  Calendar,
  User,
  HardDrive,
  Filter
} from 'lucide-react';

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const mediaFiles = [
    {
      id: 1,
      name: 'Company Logo 2024',
      type: 'image',
      format: 'PNG',
      size: '2.1 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-15T10:30:00Z',
      department: 'Marketing',
      tags: ['logo', 'branding', 'official'],
      url: '/lovable-uploads/0440891b-68c1-4039-8ea8-39b9a35ce2ea.png',
      thumbnail: '/lovable-uploads/0440891b-68c1-4039-8ea8-39b9a35ce2ea.png',
      downloads: 45,
      views: 234
    },
    {
      id: 2,
      name: 'Onboarding Welcome Video',
      type: 'video',
      format: 'MP4',
      size: '125 MB',
      uploadedBy: 'Emma Wilson',
      uploadedAt: '2024-01-10T14:20:00Z',
      department: 'HR',
      tags: ['onboarding', 'welcome', 'training'],
      url: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png',
      thumbnail: '/lovable-uploads/b2ecc921-4815-458d-9cca-04946e0dcd22.png',
      downloads: 23,
      views: 567
    },
    {
      id: 3,
      name: 'Q4 Financial Report',
      type: 'document',
      format: 'PDF',
      size: '3.8 MB',
      uploadedBy: 'David Kim',
      uploadedAt: '2024-01-12T11:15:00Z',
      department: 'Finance',
      tags: ['financial', 'report', 'q4'],
      url: null,
      thumbnail: null,
      downloads: 67,
      views: 189
    },
    {
      id: 4,
      name: 'Team Building Photos',
      type: 'image',
      format: 'JPG',
      size: '15.2 MB',
      uploadedBy: 'Mike Chen',
      uploadedAt: '2024-01-08T16:45:00Z',
      department: 'HR',
      tags: ['team building', 'photos', 'event'],
      url: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png',
      thumbnail: '/lovable-uploads/7124d00e-de42-4a9f-9389-2253760ab3cf.png',
      downloads: 31,
      views: 145
    },
    {
      id: 5,
      name: 'Product Demo Presentation',
      type: 'document',
      format: 'PPTX',
      size: '8.7 MB',
      uploadedBy: 'Alex Rodriguez',
      uploadedAt: '2024-01-13T13:25:00Z',
      department: 'Sales',
      tags: ['product', 'demo', 'presentation'],
      url: null,
      thumbnail: null,
      downloads: 28,
      views: 98
    },
    {
      id: 6,
      name: 'Security Training Video',
      type: 'video',
      format: 'MP4',
      size: '89 MB',
      uploadedBy: 'Lisa Park',
      uploadedAt: '2024-01-14T09:10:00Z',
      department: 'IT',
      tags: ['security', 'training', 'mandatory'],
      url: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png',
      thumbnail: '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png',
      downloads: 156,
      views: 445
    },
    {
      id: 7,
      name: 'Brand Guidelines',
      type: 'document',
      format: 'PDF',
      size: '12.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-11T15:30:00Z',
      department: 'Marketing',
      tags: ['brand', 'guidelines', 'design'],
      url: null,
      thumbnail: null,
      downloads: 89,
      views: 267
    },
    {
      id: 8,
      name: 'Office Floor Plan',
      type: 'image',
      format: 'PNG',
      size: '4.3 MB',
      uploadedBy: 'Emma Wilson',
      uploadedAt: '2024-01-09T12:00:00Z',
      department: 'Operations',
      tags: ['office', 'floor plan', 'layout'],
      url: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png',
      thumbnail: '/lovable-uploads/9fc527b2-adcd-4fa9-b4bc-1c6bb1fe93bb.png',
      downloads: 34,
      views: 123
    }
  ];

  const departments = ['Marketing', 'HR', 'Finance', 'Sales', 'IT', 'Operations'];
  const fileTypes = ['image', 'video', 'document'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return FileText;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || file.type === selectedType;
    const matchesDepartment = selectedDepartment === 'all' || file.department === selectedDepartment;
    
    return matchesSearch && matchesType && matchesDepartment;
  });

  const totalSize = mediaFiles.reduce((acc, file) => {
    const sizeInMB = parseFloat(file.size.replace(' MB', ''));
    return acc + sizeInMB;
  }, 0);

  const typeStats = {
    image: mediaFiles.filter(f => f.type === 'image').length,
    video: mediaFiles.filter(f => f.type === 'video').length,
    document: mediaFiles.filter(f => f.type === 'document').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FolderOpen className="h-6 w-6 mr-2" />
            Media Library
          </h1>
          <p className="text-gray-600">Manage your company's media assets and documents</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{mediaFiles.length}</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{typeStats.image}</div>
            <div className="text-sm text-gray-600">Images</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{typeStats.video}</div>
            <div className="text-sm text-gray-600">Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{typeStats.document}</div>
            <div className="text-sm text-gray-600">Documents</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search files by name or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage Info Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                Storage Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Used</span>
                  <span>{totalSize.toFixed(1)} MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min((totalSize / 1000) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.min((totalSize / 1000) * 100, 100).toFixed(1)}% of 1 GB used
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">File Types</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Image className="h-4 w-4 mr-1 text-green-600" />
                      Images
                    </span>
                    <span>{typeStats.image}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Video className="h-4 w-4 mr-1 text-blue-600" />
                      Videos
                    </span>
                    <span>{typeStats.video}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-purple-600" />
                      Documents
                    </span>
                    <span>{typeStats.document}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Files Display */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredFiles.map((file) => {
                const TypeIcon = getTypeIcon(file.type);
                return (
                  <Card key={file.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {file.thumbnail ? (
                          <img 
                            src={file.thumbnail} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <TypeIcon className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-gray-900 truncate">{file.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getTypeColor(file.type)}`}>
                            {file.format}
                          </Badge>
                          <span className="text-xs text-gray-500">{file.size}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {file.views}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {file.downloads}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredFiles.map((file, index) => {
                    const TypeIcon = getTypeIcon(file.type);
                    return (
                      <div key={file.id} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${index !== filteredFiles.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {file.thumbnail ? (
                              <img 
                                src={file.thumbnail} 
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <TypeIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{file.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Badge className={`text-xs ${getTypeColor(file.type)}`}>
                                {file.format}
                              </Badge>
                              <span>•</span>
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.department}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm text-gray-600">
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {file.views}
                              </span>
                              <span className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                {file.downloads}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <User className="h-3 w-3 mr-1" />
                              <span className="text-xs">{file.uploadedBy}</span>
                              <span className="text-xs ml-2">{formatDate(file.uploadedAt)}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {filteredFiles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedType !== 'all' || selectedDepartment !== 'all'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Get started by uploading your first file.'
                  }
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
