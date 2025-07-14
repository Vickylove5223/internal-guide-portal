
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
  Plus, 
  Search, 
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/ui/data-table';

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const members = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      joinDate: '2023-01-15',
      avatar: '/avatars/john-smith.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Editor',
      department: 'HR',
      status: 'Active',
      joinDate: '2023-02-20',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'Viewer',
      department: 'Finance',
      status: 'Inactive',
      joinDate: '2023-03-10',
      avatar: '/avatars/mike-chen.jpg'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@company.com',
      role: 'Editor',
      department: 'Marketing',
      status: 'Active',
      joinDate: '2023-04-05',
      avatar: '/avatars/emma-wilson.jpg'
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === 'all' || member.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Member',
      className: 'font-medium',
      render: (value: string, item: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (value: string) => (
        <Badge className={`text-xs ${getRoleColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'department',
      header: 'Department',
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge className={`text-xs ${getStatusColor(value)}`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      render: (value: string) => (
        <div className="text-sm text-gray-600">{formatDate(value)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Member
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            {item.status === 'Active' ? (
              <DropdownMenuItem>
                <UserX className="h-4 w-4 mr-2" />
                Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <UserCheck className="h-4 w-4 mr-2" />
                Activate
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Member Management
          </h1>
          <p className="text-gray-600">Manage team members and their access permissions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <DataTable
        columns={columns}
        data={filteredMembers}
        onRowClick={(member) => console.log('Edit member:', member)}
      />

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterRole !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by adding your first team member.'
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberManagement;
