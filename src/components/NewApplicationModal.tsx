
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: any) => void;
}

const NewApplicationModal = ({ isOpen, onClose, onSave }: NewApplicationModalProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    loanType: '',
    amount: '',
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication = {
      id: `APP-${Date.now()}`,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      loanType: formData.loanType,
      amount: parseFloat(formData.amount),
      purpose: formData.purpose,
      status: 'pending' as const,
      dateSubmitted: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    onSave(newApplication);
    
    // Reset form
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      loanType: '',
      amount: '',
      purpose: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Loan Application</DialogTitle>
          <DialogDescription>
            Create a new loan application. Fill in all required information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Name *
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                className="col-span-3"
                placeholder="Full name"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="col-span-3"
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="col-span-3"
                placeholder="Phone number"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loanType" className="text-right">
                Loan Type *
              </Label>
              <Select value={formData.loanType} onValueChange={(value) => handleChange('loanType', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="education">Education Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="col-span-3"
                placeholder="Loan amount"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purpose" className="text-right">
                Purpose
              </Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                className="col-span-3"
                placeholder="Purpose of the loan"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewApplicationModal;
