
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

interface Category {
  id: number;
  name: string;
  contentCount: number;
}

interface ManageCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'categories' | 'departments';
}

export const ManageCategoriesModal: React.FC<ManageCategoriesModalProps> = ({
  open,
  onOpenChange,
  type,
}) => {
  const { toast } = useToast();
  
  // Default categories based on type
  const getDefaultCategories = () => {
    if (type === 'departments') {
      return [
        { id: 1, name: 'HR', contentCount: 5 },
        { id: 2, name: 'IT', contentCount: 3 },
        { id: 3, name: 'Finance', contentCount: 8 },
        { id: 4, name: 'Marketing', contentCount: 2 },
        { id: 5, name: 'Operations', contentCount: 4 },
        { id: 6, name: 'Legal', contentCount: 1 },
      ];
    } else {
      // Categories for posts and suggestions
      return [
        { id: 1, name: 'Company News', contentCount: 5 },
        { id: 2, name: 'HR Updates', contentCount: 3 },
        { id: 3, name: 'Company Events', contentCount: 8 },
        { id: 4, name: 'General Improvement', contentCount: 2 },
        { id: 5, name: 'Workplace Environment', contentCount: 4 },
        { id: 6, name: 'Technology & Systems', contentCount: 1 },
        { id: 7, name: 'Process Improvement', contentCount: 6 },
        { id: 8, name: 'Employee Benefits', contentCount: 3 },
        { id: 9, name: 'Training & Development', contentCount: 2 },
        { id: 10, name: 'Communication', contentCount: 1 },
        { id: 11, name: 'Other', contentCount: 0 },
      ];
    }
  };

  const [categories, setCategories] = useState<Category[]>(getDefaultCategories());
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [reassignTo, setReassignTo] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName,
      contentCount: 0,
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
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: editName }
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
