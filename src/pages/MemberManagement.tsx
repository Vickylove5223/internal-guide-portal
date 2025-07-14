
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { 
  Users, 
  Search, 
  Plus,
  UserPlus,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Activity,
  Shield,
  Filter,
  Download
} from 'lucide-react';

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const members = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      department: 'HR',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      joinDate: '2023-03-15T00:00:00Z',
      avatar: null,
      permissions: ['read', 'write', 'delete', 'admin'],
      documentAccess: 247
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'Contributor',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-01-15T14:45:00Z',
      joinDate: '2023-05-20T00:00:00Z',
      avatar: null,
      permissions: ['read', 'write'],
      documentAccess: 189
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@company.com',
      role: 'Contributor',
      department: 'HR',
      status: 'active',
      lastLogin: '2024-01-14T16:20:00Z',
      joinDate: '2023-07-10T00:00:00Z',
      avatar: null,
      permissions: ['read', 'write'],
      documentAccess: 156
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Reader',
      department: 'Finance',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      joinDate: '2023-09-05T00:00:00Z',
      avatar: null,
      permissions: ['read'],
      documentAccess: 78
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@company.com',
      role: 'Contributor',
      department: 'Sales',
      status: 'inactive',
      lastLogin: '2024-01-10T11:30:00Z',
      joinDate: '2023-11-12T00:00:00Z',
      avatar: null,
      permissions: ['read', 'write'],
      documentAccess: 93
    },
    {
      id: 6,
      name: 'Lisa Park',
      email: 'lisa.park@company.com',
      role: 'Admin',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-01-15T13:25:00Z',
      joinDate: '2023-02-28T00:00:00Z',
      avatar: null,
      permissions: ['read', 'write', 'delete', 'admin'],
      documentAccess: 312
    },
    {
      id: 7,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Reader',
      department: 'Marketing',
      status: 'pending',
      lastLogin: null,
      joinDate: '2024-01-14T00:00:00Z',
      avatar: null,
      permissions: ['read'],
      documentAccess: 0
    }
  ];

  const departments = ['HR', 'IT', 'Finance', 'Sales', 'Marketing', 'Legal', 'Operations'];
  const roles = ['Admin', 'Contributor', 'Reader'];
  const statuses = ['active', 'inactive', 'pending'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Contributor': return 'bg-blue-100 text-blue-800';
      case 'Reader': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    pending: members.filter(m => m.status === 'pending').length,
    inactive: members.filter(m => m.status === 'inactive').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Member Management
          </h1>
          <p className="text-gray-600">Manage team members and their access permissions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
            <div className="text-sm text-gray-600">Inactive</div>
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
                  placeholder="Search members by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          <CardDescription>Manage your team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getRoleColor(member.role)} variant="outline">
                          {member.role}
                        </Badge>
                        <Badge className={getStatusColor(member.status)} variant="outline">
                          {member.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                          {member.department}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <Activity className="h-4 w-4 mr-1" />
                        Last active: {formatLastLogin(member.lastLogin)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined: {formatDate(member.joinDate)}
                      </div>
                    </div>
                    
                    <div className="text-right text-sm">
                      <div className="font-medium text-gray-900">{member.documentAccess}</div>
                      <div className="text-gray-600">docs accessed</div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Permissions */}
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Permissions:</span>
                  {member.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedDepartment !== 'all' || selectedRole !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by inviting your first team member.'
                }
              </p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberManagement;
