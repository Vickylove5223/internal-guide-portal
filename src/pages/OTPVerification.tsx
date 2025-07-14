
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PasscodeKeypad from '@/components/PasscodeKeypad';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();
  const { toast } = useToast();

  const email = location.state?.email || 'your email';

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await verifyOTP(otp);
      
      if (success) {
        toast({
          title: "OTP Verified",
          description: "Your OTP has been verified successfully.",
        });
        navigate('/set-new-password');
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={() => navigate('/reset-password')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <CardTitle className="text-2xl text-center mt-8">
              Enter Verification Code
            </CardTitle>
            <p className="text-center text-gray-600">
              We've sent a 6-digit code to {email}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                  <InputOTPSlot index={1} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                  <InputOTPSlot index={2} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                  <InputOTPSlot index={3} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                  <InputOTPSlot index={4} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                  <InputOTPSlot index={5} className="w-14 h-14 text-lg border-2 border-gray-300 focus:border-smartcash-blue" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Keypad */}
            <div className="mt-6">
              <PasscodeKeypad 
                onNumberPress={(num) => {
                  if (otp.length < 6) {
                    setOtp(prev => prev + num);
                  }
                }}
                onBackspace={() => {
                  setOtp(prev => prev.slice(0, -1));
                }}
                onClear={() => setOtp('')}
              />
            </div>

            <Button
              className="w-full bg-smartcash-blue hover:bg-blue-600"
              onClick={handleVerify}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResendOTP}
                  className="text-smartcash-blue hover:underline font-medium"
                >
                  Resend Code
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;
