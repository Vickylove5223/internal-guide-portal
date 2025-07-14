

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Car, 
  FileText, 
  Shield, 
  Receipt, 
  Link, 
  Smartphone, 
  User, 
  TrendingUp 
} from 'lucide-react';

const Overview = () => {
  const products = [
    {
      name: 'Digiit',
      description: 'Personal loans for company staff with competitive rates.',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      category: 'Personal Finance'
    },
    {
      name: 'Public Sector Loan',
      description: 'Specialized financing for government employees.',
      icon: Building2,
      color: 'bg-green-100 text-green-600',
      category: 'Government'
    },
    {
      name: 'Asset Financing',
      description: 'Business asset and equipment financing solutions.',
      icon: Car,
      color: 'bg-purple-100 text-purple-600',
      category: 'Business'
    },
    {
      name: 'LPO Financing',
      description: 'Local Purchase Order financing with secure funding.',
      icon: FileText,
      color: 'bg-orange-100 text-orange-600',
      category: 'Business'
    },
    {
      name: 'Proof of Fund Financing',
      description: 'Proof of funds management for corporate clients.',
      icon: Shield,
      color: 'bg-teal-100 text-teal-600',
      category: 'Corporate'
    },
    {
      name: 'Invoice Discounting',
      description: 'Business cash flow solutions with competitive rates.',
      icon: Receipt,
      color: 'bg-red-100 text-red-600',
      category: 'Business'
    },
    {
      name: 'Contract/Bridge Financing',
      description: 'Short-term contract financing with flexible terms.',
      icon: Link,
      color: 'bg-indigo-100 text-indigo-600',
      category: 'Corporate'
    },
    {
      name: 'Device Financing',
      description: 'Smartphone and tablet financing with instant approvals.',
      icon: Smartphone,
      color: 'bg-pink-100 text-pink-600',
      category: 'Technology'
    },
    {
      name: 'Personal Loan',
      description: 'Personal loans with competitive rates and quick decisions.',
      icon: User,
      color: 'bg-yellow-100 text-yellow-600',
      category: 'Personal Finance'
    },
    {
      name: 'Investments',
      description: 'Portfolio management with performance tracking.',
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-600',
      category: 'Investment'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          FUNDiT Stakeholder Portal
        </h1>
        <p className="text-gray-600">
          Secure access to all FUNDiT financial products and services. Use your master login credentials to access and manage any product platform below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <Card key={product.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${product.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-smartcash-blue text-smartcash-blue hover:bg-blue-50"
                  >
                    Access Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
