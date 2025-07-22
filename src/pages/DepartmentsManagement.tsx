
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, FileText, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

const DepartmentsManagement = () => {
  const navigate = useNavigate();
  const departments = [
    { 
      name: 'Human Resources', 
      slug: 'hr', 
      count: 12,
      description: 'Employee policies, benefits, and HR procedures',
      lastUpdated: '2024-01-15'
    },
    { 
      name: 'Information Technology', 
      slug: 'it', 
      count: 18,
      description: 'Technical guides, security protocols, and system documentation',
      lastUpdated: '2024-01-20'
    },
    { 
      name: 'Finance', 
      slug: 'finance', 
      count: 8,
      description: 'Financial policies, expense guidelines, and reporting procedures',
      lastUpdated: '2024-01-12'
    },
    { 
      name: 'Sales', 
      slug: 'sales', 
      count: 15,
      description: 'Sales processes, customer guidelines, and territory management',
      lastUpdated: '2024-01-18'
    },
    { 
      name: 'Marketing', 
      slug: 'marketing', 
      count: 10,
      description: 'Brand guidelines, campaign procedures, and marketing strategies',
      lastUpdated: '2024-01-14'
    },
    { 
      name: 'Legal', 
      slug: 'legal', 
      count: 6,
      description: 'Compliance documents, legal procedures, and regulatory guidelines',
      lastUpdated: '2024-01-10'
    },
    { 
      name: 'Operations', 
      slug: 'operations', 
      count: 11,
      description: 'Operational procedures, quality standards, and process documentation',
      lastUpdated: '2024-01-16'
    },
    { 
      name: 'Product', 
      slug: 'product', 
      count: 14,
      description: 'Product specifications, feature documentation, and development guides',
      lastUpdated: '2024-01-19'
    }
  ];
  const [depts, setDepts] = React.useState(departments);
  const [editingDept, setEditingDept] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [deleteDept, setDeleteDept] = React.useState(null);

  // Load departments from localStorage on mount
  useEffect(() => {
    const storedDepts = localStorage.getItem('departments');
    if (storedDepts) setDepts(JSON.parse(storedDepts));
  }, []);
  // Save departments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(depts));
  }, [depts]);

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setShowEditModal(true);
  };
  const handleDelete = (dept) => {
    setDeleteDept(dept);
  };
  const confirmDelete = () => {
    setDepts(depts.filter(d => d.slug !== deleteDept.slug));
    setDeleteDept(null);
  };

  const handleSaveEdit = (dept: any) => {
    setDepts(depts.map(d => d.slug === editingDept.slug ? { ...editingDept, ...dept } : d));
    setShowEditModal(false);
    setEditingDept(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/post-management')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments Management</h1>
          <p className="text-gray-600">Manage documents and content organization for each department</p>
        </div>
      </div>
      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {depts.map((dept) => (
          <Card 
            key={dept.slug}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(`/manage-departments/${dept.slug}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {dept.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {dept.count} docs
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={e => { e.stopPropagation(); handleEdit(dept); }}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={e => { e.stopPropagation(); handleDelete(dept); }}>
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {dept.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">
                  Last updated: {formatDate(dept.lastUpdated)}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                onClick={e => { e.stopPropagation(); navigate(`/manage-departments/${dept.slug}`); }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Documents
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveEdit({
                name: formData.get('name'),
                description: formData.get('description'),
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={editingDept?.name || ''} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={editingDept?.description || ''} required />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Edit and Delete Modals (implement as needed) */}
    </div>
  );
};

export default DepartmentsManagement;
