
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

interface ApplicationTrackerProps {
  applicationId: string;
  property: string;
  steps: ApplicationStep[];
}

const ApplicationTracker = ({
  applicationId,
  property,
  steps,
}: ApplicationTrackerProps) => {
  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm border-housing-200">
      <CardHeader>
        <CardTitle className="text-xl font-display text-housing-800">
          Application #{applicationId}
        </CardTitle>
        <CardDescription>
          {property}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical line for the timeline */}
          <div className="absolute left-[15px] top-1 h-full w-[2px] bg-housing-200" />
          
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-10">
                {/* Step indicator */}
                <div 
                  className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 
                    ${step.status === 'completed' 
                      ? 'bg-housing-800 border-housing-800 text-white' 
                      : step.status === 'current'
                        ? 'bg-white border-housing-800 text-housing-800'
                        : 'bg-white border-housing-200 text-housing-400'
                    }`}
                >
                  {step.status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                
                {/* Step content */}
                <div>
                  <h4 className={`text-lg font-semibold
                    ${step.status === 'completed' 
                      ? 'text-housing-800' 
                      : step.status === 'current'
                        ? 'text-housing-800'
                        : 'text-housing-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className={`text-sm
                    ${step.status === 'completed' || step.status === 'current'
                      ? 'text-housing-600' 
                      : 'text-housing-400'
                    }`}
                  >
                    {step.description}
                  </p>
                  {step.date && (
                    <p className="text-xs text-housing-400 mt-1">
                      {step.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
