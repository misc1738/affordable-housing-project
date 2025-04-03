
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Circle, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming" | "blocked";
  estimatedTime?: string;
  documents?: string[];
  tips?: string[];
}

interface TimelineProcess {
  id: string;
  title: string;
  description: string;
  steps: TimelineStep[];
}

const HousingTimeline = () => {
  const [processes] = useState<TimelineProcess[]>([
    {
      id: "rental",
      title: "Rental Application Process",
      description: "The process for applying to affordable rental units",
      steps: [
        {
          id: 1,
          title: "Check Eligibility",
          description: "Determine if you qualify based on income and other criteria",
          status: "completed",
          estimatedTime: "1 day",
          documents: ["Proof of income", "ID/Passport"],
          tips: ["Use our eligibility calculator to check if you qualify"]
        },
        {
          id: 2,
          title: "Submit Application",
          description: "Complete and submit the rental application form",
          status: "completed",
          estimatedTime: "1-2 days",
          documents: ["Application form", "Application fee payment"],
          tips: ["Double-check all information before submitting", "Keep copies of all submitted documents"]
        },
        {
          id: 3,
          title: "Document Verification",
          description: "Housing authority verifies your submitted documents",
          status: "current",
          estimatedTime: "7-14 days",
          documents: ["ID verification", "Income verification", "Background check consent"],
          tips: ["Respond promptly to any requests for additional information"]
        },
        {
          id: 4,
          title: "Application Review",
          description: "Your application is reviewed by the selection committee",
          status: "upcoming",
          estimatedTime: "14-21 days",
          tips: ["No action required during this stage", "You can check your application status online"]
        },
        {
          id: 5,
          title: "Property Viewing",
          description: "Visit and inspect the property if your application is shortlisted",
          status: "upcoming",
          estimatedTime: "1 day",
          tips: ["Prepare questions about the property", "Consider taking photos (with permission)"]
        },
        {
          id: 6,
          title: "Lease Signing",
          description: "Sign the lease agreement and pay initial deposits",
          status: "upcoming",
          estimatedTime: "1-2 days",
          documents: ["Lease agreement", "Deposit payment"],
          tips: ["Read the entire lease carefully before signing", "Clarify any terms you don't understand"]
        },
        {
          id: 7,
          title: "Move In",
          description: "Receive keys and move into your new home",
          status: "upcoming",
          estimatedTime: "1 day",
          documents: ["Move-in checklist", "Utility setup forms"],
          tips: ["Document the condition of the unit with photos", "Set up utilities before moving in"]
        }
      ]
    },
    {
      id: "purchase",
      title: "Home Purchase Process",
      description: "The process for purchasing an affordable housing unit",
      steps: [
        {
          id: 1,
          title: "Check Eligibility",
          description: "Determine if you qualify based on income and first-time buyer status",
          status: "completed",
          estimatedTime: "1 day",
          documents: ["Proof of income", "ID/Passport", "First-time buyer declaration"],
          tips: ["Use our eligibility calculator to check if you qualify"]
        },
        {
          id: 2,
          title: "Financial Pre-Qualification",
          description: "Get pre-qualified for a mortgage or housing finance",
          status: "completed",
          estimatedTime: "3-7 days",
          documents: ["Bank statements", "Tax returns", "Credit report"],
          tips: ["Shop around for the best interest rates", "Consider government-backed loans"]
        },
        {
          id: 3,
          title: "Submit Purchase Application",
          description: "Complete and submit the home purchase application",
          status: "current",
          estimatedTime: "1-2 days",
          documents: ["Application form", "Pre-qualification letter", "Application fee payment"],
          tips: ["Double-check all information before submitting", "Keep copies of all submitted documents"]
        },
        {
          id: 4,
          title: "Application Review",
          description: "Your application is reviewed by the selection committee",
          status: "upcoming",
          estimatedTime: "21-30 days",
          tips: ["No action required during this stage", "You can check your application status online"]
        },
        {
          id: 5,
          title: "Property Selection",
          description: "If approved, select from available units based on your priority number",
          status: "upcoming",
          estimatedTime: "1-7 days",
          tips: ["Research available units beforehand", "Consider location, size, and amenities"]
        },
        {
          id: 6,
          title: "Mortgage Processing",
          description: "Finalize mortgage application and await approval",
          status: "upcoming",
          estimatedTime: "14-30 days",
          documents: ["Mortgage application", "Property appraisal", "Insurance quotes"],
          tips: ["Avoid making large purchases during this time", "Don't change jobs if possible"]
        },
        {
          id: 7,
          title: "Closing",
          description: "Sign final paperwork and pay closing costs",
          status: "upcoming",
          estimatedTime: "1 day",
          documents: ["Closing disclosure", "Deed", "Title insurance"],
          tips: ["Review all documents carefully before signing", "Bring government-issued ID to closing"]
        },
        {
          id: 8,
          title: "Move In",
          description: "Receive keys and move into your new home",
          status: "upcoming",
          estimatedTime: "1 day",
          tips: ["Document the condition of the unit with photos", "Change locks and security codes"]
        }
      ]
    }
  ]);

  const getStatusIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-600" />;
      case "current":
        return <Circle className="h-6 w-6 text-blue-600 fill-blue-100" />;
      case "blocked":
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };

  const getStatusClass = (status: TimelineStep['status']) => {
    switch (status) {
      case "completed":
        return "border-green-600";
      case "current":
        return "border-blue-600";
      case "blocked":
        return "border-red-600";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            Housing Application Timeline
          </h1>
          <p className="text-housing-600">
            Understand the step-by-step process of obtaining affordable housing
          </p>
        </div>

        <Tabs defaultValue="rental" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="rental">Rental Process</TabsTrigger>
            <TabsTrigger value="purchase">Purchase Process</TabsTrigger>
          </TabsList>
          
          {processes.map(process => (
            <TabsContent key={process.id} value={process.id}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-housing-800">{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Vertical line connecting timeline items */}
                    <div className="absolute left-3 top-3 h-full w-0.5 bg-gray-200 z-0" />
                    
                    <div className="space-y-12 relative z-10">
                      {process.steps.map((step) => (
                        <div key={step.id} className="relative pl-12">
                          {/* Step indicator */}
                          <div className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${getStatusClass(step.status)} bg-white`}>
                            {getStatusIcon(step.status)}
                          </div>
                          
                          {/* Step content */}
                          <div className={`border rounded-lg p-5 ${step.status === 'current' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                              <h3 className="text-lg font-medium text-housing-800">
                                {step.id}. {step.title}
                              </h3>
                              {step.estimatedTime && (
                                <span className="text-sm text-housing-500 mt-1 sm:mt-0">
                                  Est. time: {step.estimatedTime}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-housing-600 mb-4">{step.description}</p>
                            
                            {(step.documents || step.tips) && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {step.documents && (
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <h4 className="font-medium text-housing-800 mb-2">Required Documents</h4>
                                    <ul className="space-y-1 text-sm">
                                      {step.documents.map((doc, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <ArrowRight className="h-3 w-3 text-housing-600 mr-2 mt-1 flex-shrink-0" />
                                          <span>{doc}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {step.tips && (
                                  <div className="bg-amber-50 p-3 rounded-md">
                                    <h4 className="font-medium text-housing-800 mb-2">Helpful Tips</h4>
                                    <ul className="space-y-1 text-sm">
                                      {step.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <HelpCircle className="h-3 w-3 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                                          <span className="text-amber-800">{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <p className="text-housing-600 mb-4">
                  Have questions about the {process.id === 'rental' ? 'rental' : 'purchase'} process?
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline">Contact Housing Support</Button>
                  <Button>Schedule Consultation</Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default HousingTimeline;
