
import { useState } from 'react';
import { Phone, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

interface MPesaPaymentProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const MPesaPayment = ({ 
  amount, 
  description,
  onSuccess,
  onCancel
}: MPesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'input' | 'processing' | 'complete'>('input');
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Format phone number as user types
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    // Format for Kenyan phone numbers
    let formattedValue = value;
    if (value.length > 0) {
      // If it starts with 0, replace with 254
      if (value.startsWith('0')) {
        formattedValue = '254' + value.substring(1);
      }
      // If it doesn't start with 254, add it
      else if (!value.startsWith('254')) {
        formattedValue = '254' + value;
      }
    }
    
    setPhoneNumber(formattedValue);
    setError('');
  };

  // Validate phone number
  const validatePhoneNumber = () => {
    // Basic validation for Kenyan numbers
    const kenyanNumberRegex = /^254[17]\d{8}$/;
    if (!kenyanNumberRegex.test(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number (e.g., 254712345678)');
      return false;
    }
    return true;
  };

  // Handle payment request
  const handlePaymentRequest = () => {
    if (!validatePhoneNumber()) return;
    
    setStep('processing');
    
    // Simulate M-Pesa STK push
    setTimeout(() => {
      // Simulate successful payment (in a real app, this would be a callback from M-Pesa API)
      setStep('complete');
      
      toast({
        title: "Payment successful",
        description: `KSh ${amount.toLocaleString()} has been paid via M-Pesa`,
      });
      
      if (onSuccess) onSuccess();
    }, 3000);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <CreditCard className="mr-2 h-5 w-5 text-green-600" />
          M-Pesa Payment
        </CardTitle>
        <CardDescription>
          Pay securely using M-Pesa mobile money
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 'input' && (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="text-sm text-housing-600 mb-1">Amount</div>
              <div className="text-xl font-semibold text-housing-800">KSh {amount.toLocaleString()}</div>
              <div className="text-xs text-housing-500 mt-1">{description}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number (M-Pesa)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-housing-500" />
                </div>
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="254712345678"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={`pl-10 ${error ? 'border-red-500' : ''}`}
                />
              </div>
              {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
              <p className="text-xs text-housing-500 mt-1">
                Enter the M-Pesa registered phone number to receive the payment prompt
              </p>
            </div>
          </div>
        )}
        
        {step === 'processing' && (
          <div className="py-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-housing-600 mb-4" />
            <h3 className="text-lg font-medium text-housing-800 mb-2">
              Processing Payment
            </h3>
            <p className="text-housing-600">
              Please check your phone for the M-Pesa payment prompt
            </p>
          </div>
        )}
        
        {step === 'complete' && (
          <div className="py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-housing-800 mb-2">
              Payment Successful
            </h3>
            <p className="text-housing-600 mb-4">
              Your payment of KSh {amount.toLocaleString()} has been received
            </p>
            <div className="bg-gray-50 rounded p-3 inline-block mx-auto">
              <p className="text-xs text-housing-500">
                M-Pesa Confirmation: MK78YHGT90
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step === 'input' && (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handlePaymentRequest}>
              Pay with M-Pesa
            </Button>
          </>
        )}
        
        {step === 'processing' && (
          <Button variant="outline" className="w-full" onClick={handleCancel}>
            Cancel Payment
          </Button>
        )}
        
        {step === 'complete' && (
          <Button className="w-full" onClick={onSuccess}>
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MPesaPayment;
