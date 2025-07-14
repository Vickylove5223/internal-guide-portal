import React from 'react';
import { Badge } from '@/components/ui/badge';

export interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'loan' | 'payment';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const getStatusStyles = () => {
    const statusMap = {
      // Loan statuses
      'Running': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      'Active': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      'Completed': 'bg-green-100 text-green-700 hover:bg-green-100',
      'Paid': 'bg-green-100 text-green-700 hover:bg-green-100',
      'Defaulted': 'bg-red-100 text-red-700 hover:bg-red-100',
      'Overdue': 'bg-red-100 text-red-700 hover:bg-red-100',
      'Pending': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
      'Processing': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
      'Approved': 'bg-green-100 text-green-700 hover:bg-green-100',
      'Rejected': 'bg-red-100 text-red-700 hover:bg-red-100',
      'Declined': 'bg-red-100 text-red-700 hover:bg-red-100',
    };

    return statusMap[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  };

  return (
    <Badge className={getStatusStyles()}>
      {status}
    </Badge>
  );
};