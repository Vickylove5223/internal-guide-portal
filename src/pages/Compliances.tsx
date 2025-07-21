
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Compliances = () => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 px-[100px] py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliances</h1>
            <p className="text-gray-600 mb-6">Regulatory compliance updates and requirements</p>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card className="p-8 text-center bg-transparent border-0">
                  <CardContent>
                    <p className="text-gray-500">No compliance posts available at the moment.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-96">
                <div className="sticky top-6">
                  <img
                    src="/lovable-uploads/3d5b1ac3-5c8f-49a4-b3bb-872eeb6148fe.png"
                    alt="Our Products"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliances;
