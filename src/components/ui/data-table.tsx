import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface TableColumn {
  key: string;
  header: string;
  className?: string;
  render?: (value: any, item: any) => React.ReactNode;
}

export interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (item: any) => void;
  getStatusBadge?: (status: string) => React.ReactNode;
  mobileCardRender?: (item: any, index: number) => React.ReactNode;
}

const defaultGetStatusBadge = (status: string) => {
  const statusStyles = {
    'Running': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'Completed': 'bg-green-100 text-green-700 hover:bg-green-100',
    'Defaulted': 'bg-red-100 text-red-700 hover:bg-red-100',
    'Pending': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    'Paid': 'bg-green-100 text-green-700 hover:bg-green-100',
    'Active': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'Overdue': 'bg-red-100 text-red-700 hover:bg-red-100',
  };
  
  return (
    <Badge className={statusStyles[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-100'}>
      {status}
    </Badge>
  );
};

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onRowClick,
  getStatusBadge = defaultGetStatusBadge,
  mobileCardRender,
}) => {
  const defaultMobileCardRender = (item: any, index: number) => (
    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {columns.slice(0, 4).map((column) => {
            const value = item[column.key];
            if (!value && value !== 0) return null;
            
            return (
              <div key={column.key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{column.header}</span>
                <span className="font-medium">
                  {column.render ? column.render(value, item) : value}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key} className={`font-medium text-gray-700 ${column.className || ''}`}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => {
                      const value = item[column.key];
                      return (
                        <TableCell key={column.key} className={column.className || ''}>
                          {column.render ? column.render(value, item) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((item, index) => (
          <div key={index} onClick={() => onRowClick?.(item)}>
            {mobileCardRender ? mobileCardRender(item, index) : defaultMobileCardRender(item, index)}
          </div>
        ))}
      </div>
    </>
  );
};