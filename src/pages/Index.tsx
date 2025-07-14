
import React from 'react';
import BaseLayout from '@/components/BaseLayout';
import Layout from '@/components/Layout';
import TaskManager from '@/components/TaskManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Calendar, Clock } from 'lucide-react';

const Index = () => {
  const quickAccessCards = [
    {
      title: 'Loan Repayments',
      description: 'Track and manage loan repayments',
      icon: FileText,
      href: '/repayments',
      color: 'bg-blue-500',
    },
    {
      title: 'Financial Reports',
      description: 'View detailed financial reports',
      icon: Calendar,
      href: '/reports',
      color: 'bg-green-500',
    },
    {
      title: 'Support Materials',
      description: 'Access training and support materials',
      icon: Users,
      href: '/materials',
      color: 'bg-purple-500',
    },
  ];

  return (
    <BaseLayout>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, John Doe
                  </h1>
                  <p className="text-gray-600">
                    Administrator • Last login: Today at 9:15 AM
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    View Profile
                  </Button>
                  <Button>
                    New Application
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Task Manager */}
            <div className="lg:col-span-2">
              <TaskManager />
            </div>

            {/* Right Column - Promotion/Image Area */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>System Updates</CardTitle>
                  <CardDescription>Latest news and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">New Features Available</h3>
                        <p className="text-sm text-gray-600">
                          Discover the latest enhancements to streamline your workflow
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickAccessCards.map((card) => (
                <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform`}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {card.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-900">2,847</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-3xl font-bold text-gray-900">127</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved Today</p>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2">Great progress!</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Disbursed</p>
                    <p className="text-3xl font-bold text-gray-900">$2.1M</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-purple-600 mt-2">This month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </BaseLayout>
  );
};

export default Index;
