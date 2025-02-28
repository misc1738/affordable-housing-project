
import { useState } from "react";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProgramType {
  id: string;
  name: string;
  description: string;
  requirements: {
    maxIncome: number;
    minIncome: number;
    citizenshipRequired: boolean;
    otherRequirements: string[];
  };
}

const EligibilityChecker = () => {
  const [step, setStep] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [county, setCounty] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramType[]>([]);
  
  // Kenyan housing programs
  const housingPrograms: ProgramType[] = [
    {
      id: "affordable-housing",
      name: "Boma Yangu - Affordable Housing Program",
      description: "Government initiative to provide affordable housing units for low and middle-income Kenyans",
      requirements: {
        maxIncome: 150000,
        minIncome: 15000,
        citizenshipRequired: true,
        otherRequirements: [
          "Must be at least 18 years of age",
          "Must have a Kenya Revenue Authority (KRA) PIN",
          "Must register on the Boma Yangu portal"
        ]
      }
    },
    {
      id: "civil-servants",
      name: "Civil Servants Housing Scheme",
      description: "Housing mortgage scheme for Kenyan civil servants with preferential rates",
      requirements: {
        maxIncome: 200000,
        minIncome: 25000,
        citizenshipRequired: true,
        otherRequirements: [
          "Must be a civil servant",
          "Must have served for at least 3 years",
          "Must have a clean credit history"
        ]
      }
    },
    {
      id: "nhcf",
      name: "National Housing Corporation Fund",
      description: "Provides affordable housing finance options to Kenyans through various schemes",
      requirements: {
        maxIncome: 100000,
        minIncome: 10000,
        citizenshipRequired: true,
        otherRequirements: [
          "Must be a contributor to the NHCF",
          "Must not own a house already financed by the NHCF",
          "Must have maintained regular contributions"
        ]
      }
    },
    {
      id: "tenant-purchase",
      name: "Tenant Purchase Scheme",
      description: "Allows tenants to gradually purchase their rented property through monthly installments",
      requirements: {
        maxIncome: 120000,
        minIncome: 20000,
        citizenshipRequired: false,
        otherRequirements: [
          "Must have a regular income source",
          "Must be able to provide a down payment",
          "Must have a good rental payment history"
        ]
      }
    }
  ];

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Kiambu", 
    "Machakos", "Kajiado", "Kilifi", "Uasin Gishu", "Other"
  ];

  const checkEligibility = () => {
    const income = parseInt(monthlyIncome, 10);
    
    const eligible = housingPrograms.filter(program => {
      // Check income requirements
      const meetsIncomeReq = income >= program.requirements.minIncome && 
                            income <= program.requirements.maxIncome;
      
      // Check citizenship requirement if the program requires it
      const meetsCitizenshipReq = program.requirements.citizenshipRequired ? 
                                 citizenship === "yes" : true;
      
      return meetsIncomeReq && meetsCitizenshipReq;
    });
    
    setEligiblePrograms(eligible);
    setHasChecked(true);
    setStep(3);
  };

  const resetForm = () => {
    setMonthlyIncome("");
    setCitizenship("");
    setEmploymentStatus("");
    setCounty("");
    setHasChecked(false);
    setStep(1);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-housing-200">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-housing-800">
          Housing Program Eligibility Checker
        </CardTitle>
        <CardDescription>
          Find out which Kenyan housing programs you may qualify for
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-income">Monthly Income (KSh)</Label>
              <Input
                id="monthly-income"
                type="number"
                placeholder="e.g. 50000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="citizenship">Are you a Kenyan citizen?</Label>
              <Select value={citizenship} onValueChange={setCitizenship}>
                <SelectTrigger id="citizenship">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full mt-4 bg-housing-800 hover:bg-housing-900"
              onClick={() => setStep(2)}
              disabled={!monthlyIncome || !citizenship}
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employment-status">Employment Status</Label>
              <RadioGroup 
                value={employmentStatus} 
                onValueChange={setEmploymentStatus}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employed" id="employed" />
                  <Label htmlFor="employed">Employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self-employed" id="self-employed" />
                  <Label htmlFor="self-employed">Self-Employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="civil-servant" id="civil-servant" />
                  <Label htmlFor="civil-servant">Civil Servant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other-employment" />
                  <Label htmlFor="other-employment">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="county">County of Residence</Label>
              <Select value={county} onValueChange={setCounty}>
                <SelectTrigger id="county">
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
                <SelectContent>
                  {counties.map((countyName) => (
                    <SelectItem key={countyName} value={countyName.toLowerCase()}>
                      {countyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-housing-800 hover:bg-housing-900"
                onClick={checkEligibility}
                disabled={!employmentStatus || !county}
              >
                Check Eligibility
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && hasChecked && (
          <div className="space-y-6">
            <div className="text-center py-2">
              {eligiblePrograms.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-housing-800 mb-1">
                    Good news!
                  </h3>
                  <p className="text-housing-600">
                    You may be eligible for {eligiblePrograms.length} housing program{eligiblePrograms.length !== 1 ? 's' : ''}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-housing-800 mb-1">
                    Not eligible
                  </h3>
                  <p className="text-housing-600">
                    Based on your information, you don't appear to qualify for the listed programs
                  </p>
                </div>
              )}
            </div>
            
            {eligiblePrograms.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-housing-800 mb-3">
                  Programs you may qualify for:
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {eligiblePrograms.map((program) => (
                    <AccordionItem key={program.id} value={program.id}>
                      <AccordionTrigger className="text-housing-700 hover:text-housing-900">
                        {program.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-2 space-y-3">
                          <p className="text-housing-600 text-sm">
                            {program.description}
                          </p>
                          <h4 className="font-medium text-housing-800 text-sm">Requirements:</h4>
                          <ul className="text-sm text-housing-600 list-disc pl-5 space-y-1">
                            <li>Income between KSh {program.requirements.minIncome.toLocaleString()} - KSh {program.requirements.maxIncome.toLocaleString()} per month</li>
                            {program.requirements.citizenshipRequired && <li>Kenyan citizenship required</li>}
                            {program.requirements.otherRequirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            
            <div className="pt-4 text-sm text-housing-500 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              <p>
                This is a preliminary check. Actual eligibility may vary based on additional criteria. 
                Contact the respective program administrators for definitive information.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={resetForm}
            >
              Start Over
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityChecker;
