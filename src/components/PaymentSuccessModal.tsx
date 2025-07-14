
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Share } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  payment
}) => {
  const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handleDownloadReceipt = () => {
    // Implementation for downloading receipt
    console.log('Downloading receipt...');
  };

  const handleShareReceipt = () => {
    // Implementation for sharing receipt
    console.log('Sharing receipt...');
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Payment Successful!</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Completed Successfully
            </h3>
            <p className="text-gray-600">
              Your payment has been processed and your loan account has been updated.
            </p>
          </div>

          {/* Payment Details */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium">{generateTransactionId()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment #</span>
                  <span className="font-medium">{payment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-bold text-green-600">₦{payment.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Debit Card</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                className="flex-1 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Receipt</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShareReceipt}
                className="flex-1 flex items-center space-x-2"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Button onClick={onClose} className="w-full">
              Continue
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p>
              A confirmation email has been sent to your registered email address.
              If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
