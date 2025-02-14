
import { Calculator, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const AffordabilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateAffordability = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const maxRent = (income - debts) * 0.3; // 30% rule
    setResult(Math.max(0, maxRent));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-housing-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-housing-600" />
          <CardTitle className="text-2xl font-display text-housing-800">
            Affordability Calculator
          </CardTitle>
        </div>
        <CardDescription>
          Find out how much rent you can comfortably afford
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-housing-400" />
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="0.00"
              className="pl-9"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyDebts">Monthly Debts</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-housing-400" />
            <Input
              id="monthlyDebts"
              type="number"
              placeholder="0.00"
              className="pl-9"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(e.target.value)}
            />
          </div>
        </div>
        <Button 
          onClick={calculateAffordability}
          className="w-full bg-housing-800 hover:bg-housing-900"
        >
          Calculate
        </Button>
        {result !== null && (
          <div className="p-4 bg-housing-50 rounded-lg border border-housing-200">
            <p className="text-housing-600 text-sm">Recommended Maximum Monthly Rent:</p>
            <p className="text-housing-900 text-2xl font-semibold">
              ${result.toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffordabilityCalculator;
