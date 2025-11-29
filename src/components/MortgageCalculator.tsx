import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import FadeIn from './animations/FadeIn';

const MortgageCalculator = () => {
  const [price, setPrice] = useState(15000000);
  const [downPayment, setDownPayment] = useState(3000000);
  const [interestRate, setInterestRate] = useState(14);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && interestRate > 0 && loanTerm > 0) {
      const mortgage =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(mortgage);
    } else {
      setMonthlyPayment(0);
    }
  }, [price, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <FadeIn>
      <Card className="w-full bg-white/5 backdrop-blur-md border-gold/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-display text-gold">
            <Calculator className="w-6 h-6" />
            Mortgage Calculator
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Estimate your monthly payments for this property.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground/80">Property Price (KES)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-9 border-gold/20 focus:border-gold bg-white/50"
              />
            </div>
            <Slider
              value={[price]}
              min={1000000}
              max={100000000}
              step={100000}
              onValueChange={(vals) => setPrice(vals[0])}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment" className="text-foreground/80">Down Payment (KES)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="pl-9 border-gold/20 focus:border-gold bg-white/50"
              />
            </div>
            <div className="text-xs text-muted-foreground text-right">
              {((downPayment / price) * 100).toFixed(1)}% of price
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-foreground/80">Interest Rate (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="pl-9 border-gold/20 focus:border-gold bg-white/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm" className="text-foreground/80">Loan Term (Years)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="pl-9 border-gold/20 focus:border-gold bg-white/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/10">
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground font-medium">Monthly Payment</span>
              <span className="text-3xl font-bold text-gold font-display">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default MortgageCalculator;
