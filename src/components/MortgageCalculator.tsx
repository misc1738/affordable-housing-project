
import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MortgageCalculator = () => {
  // Kenyan typical mortgage rates and terms
  const [propertyPrice, setPropertyPrice] = useState(5000000); // 5 million KSh
  const [downPayment, setDownPayment] = useState(1000000); // 1 million KSh
  const [interestRate, setInterestRate] = useState(13.5); // Average Kenyan mortgage rate
  const [loanTerm, setLoanTerm] = useState(20); // Years
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Calculate loan metrics
  useEffect(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);

    if (isFinite(monthly)) {
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setTotalInterest(monthly * numberOfPayments - principal);
    } else {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace('KES', 'KSh');
  };

  // Handle down payment percentage
  const handleDownPaymentPercent = (percent: number) => {
    setDownPayment(Math.round(propertyPrice * (percent / 100)));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-housing-200">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-display text-housing-800">
          <Calculator className="mr-2 h-5 w-5" />
          Mortgage Calculator
        </CardTitle>
        <CardDescription>
          Plan your home purchase with current Kenyan mortgage rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-housing-700">Property Price</Label>
                  <div className="text-sm font-medium text-housing-900">
                    {formatCurrency(propertyPrice)}
                  </div>
                </div>
                <Slider
                  value={[propertyPrice]}
                  min={1000000}
                  max={50000000}
                  step={500000}
                  onValueChange={(value) => setPropertyPrice(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-housing-500 mt-1">
                  <span>KSh 1M</span>
                  <span>KSh 50M</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label className="text-housing-700">Down Payment</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-housing-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Most banks in Kenya require a minimum down payment of 10-20% of the property value.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-sm font-medium text-housing-900">
                    {formatCurrency(downPayment)} ({Math.round((downPayment / propertyPrice) * 100)}%)
                  </div>
                </div>
                <Slider
                  value={[downPayment]}
                  min={0}
                  max={propertyPrice}
                  step={50000}
                  onValueChange={(value) => setDownPayment(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between gap-2 mt-2">
                  {[10, 20, 30, 40].map((percent) => (
                    <Button 
                      key={percent}
                      variant="outline" 
                      size="sm"
                      className="flex-1 text-xs h-8"
                      onClick={() => handleDownPaymentPercent(percent)}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-housing-700">Interest Rate (%)</Label>
                  <div className="text-sm font-medium text-housing-900">
                    {interestRate.toFixed(1)}%
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  min={7}
                  max={24}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-housing-500 mt-1">
                  <span>7%</span>
                  <span>24%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-housing-700">Loan Term (Years)</Label>
                  <div className="text-sm font-medium text-housing-900">
                    {loanTerm} years
                  </div>
                </div>
                <Slider
                  value={[loanTerm]}
                  min={5}
                  max={25}
                  step={1}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-housing-500 mt-1">
                  <span>5 years</span>
                  <span>25 years</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-housing-50 border-housing-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-housing-600">Monthly Payment</div>
                      <div className="text-3xl font-bold text-housing-900 mt-1">
                        {formatCurrency(monthlyPayment)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-housing-50 border-housing-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-housing-600">Principal</div>
                        <div className="text-xl font-bold text-housing-900 mt-1">
                          {formatCurrency(propertyPrice - downPayment)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-housing-50 border-housing-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-housing-600">Interest</div>
                        <div className="text-xl font-bold text-housing-900 mt-1">
                          {formatCurrency(totalInterest)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-housing-50 border-housing-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-housing-600">Total Payment</div>
                      <div className="text-xl font-bold text-housing-900 mt-1">
                        {formatCurrency(totalPayment)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-xs text-housing-500 text-center">
                  <p>This is an estimate based on the information provided. Contact your bank for accurate rates and terms.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
