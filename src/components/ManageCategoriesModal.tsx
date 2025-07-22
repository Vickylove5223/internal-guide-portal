import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/contexts/CategoryContext';
import { Category } from '@/contexts/CategoryContext';

interface ManageCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'categories' | 'departments';
}

export function getDefaultCategories(type = 'categories') {
  if (type === 'departments') {
    const depts = [
      'HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Legal', 'Sales', 'Customer Service', 'Research & Development', 'Quality Assurance', 'Administration', 'Procurement'
    ];
    return depts.map((name, i) => ({
      id: i + 1,
      name,
      contentCount: 0,
      slug: `departments/${name.toLowerCase().replace(/\s+/g, '-')}`
    }));
  } else {
    const cats = [
      'Announcements',
      'HR Updates',
      'Business News',
      'Political News'
    ];
    return cats.map((name, i) => ({
      id: i + 1,
      name,
      contentCount: 0,
      slug: `posts/${name.toLowerCase().replace(/\s+/g, '-')}`
    }));
  }
}

export const ManageCategoriesModal: React.FC<ManageCategoriesModalProps> = ({
  open,
  onOpenChange,
  type,
}) => {
  const { toast } = useToast();
  const { categories, setCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [reassignTo, setReassignTo] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const slugBase = type === 'departments' ? 'departments' : 'posts';
    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName,
      contentCount: 0,
      slug: `${slugBase}/${newCategoryName.toLowerCase().replace(/\s+/g, '-')}`
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    toast({
      title: "Success",
      description: `${type === 'departments' ? 'Department' : 'Category'} added successfully!`,
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editingCategory) return;
    const slugBase = type === 'departments' ? 'departments' : 'posts';
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: editName, slug: `${slugBase}/${editName.toLowerCase().replace(/\s+/g, '-')}` }
        : cat
    ));
    setEditingCategory(null);
    setEditName('');
    toast({
      title: "Success",
      description: `${type === 'departments' ? 'Department' : 'Category'} updated successfully!`,
    });
  };

  const handleDeleteCategory = (category: Category) => {
    if (category.contentCount > 0) {
      setDeleteCategory(category);
    } else {
      setCategories(categories.filter(cat => cat.id !== category.id));
      toast({
        title: "Success",
        description: `${type === 'departments' ? 'Department' : 'Category'} deleted successfully!`,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteCategory) return;
    
    if (reassignTo && deleteCategory.contentCount > 0) {
      // In a real app, you would reassign the content here
      toast({
        title: "Success",
        description: `Content reassigned and ${type === 'departments' ? 'department' : 'category'} deleted successfully!`,
      });
    }
    
    setCategories(categories.filter(cat => cat.id !== deleteCategory.id));
    setDeleteCategory(null);
    setReassignTo('');
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Manage {type === 'departments' ? 'Departments' : 'Categories'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Add new category */}
            <div className="flex gap-2">
              <Input
                placeholder={`Enter ${type === 'departments' ? 'department' : 'category'} name`}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            {/* Categories list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    {editingCategory?.id === category.id ? (
                      <div className="flex gap-2 items-center">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                        />
                        <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingCategory(null)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-600">
                            {category.contentCount} items
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(category)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {type === 'departments' ? 'Department' : 'Category'}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteCategory?.contentCount > 0 ? (
                <div className="space-y-4">
                  <p>
                    This {type === 'departments' ? 'department' : 'category'} has {deleteCategory.contentCount} items. 
                    Please select where to reassign them:
                  </p>
                  <div>
                    <Label htmlFor="reassign">Reassign to:</Label>
                    <Select value={reassignTo} onValueChange={setReassignTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter(cat => cat.id !== deleteCategory.id)
                          .map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                `Are you sure you want to delete "${deleteCategory?.name}"? This action cannot be undone.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              disabled={deleteCategory?.contentCount > 0 && !reassignTo}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
