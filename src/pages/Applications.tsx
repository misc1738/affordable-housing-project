
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ApplicationTracker from "@/components/ApplicationTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, ListChecks } from "lucide-react";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Sample application data
  const activeApplications = [
    {
      id: "APP-2023-001",
      property: "Modern Apartment in Kilimani",
      steps: [
        {
          id: 1,
          title: "Application Submitted",
          description: "Your application has been received",
          status: "completed" as const,
          date: "April 10, 2023"
        },
        {
          id: 2,
          title: "Document Verification",
          description: "Your documents are being reviewed",
          status: "current" as const,
          date: "April 15, 2023"
        },
        {
          id: 3,
          title: "Background Check",
          description: "Verifying employment and references",
          status: "upcoming" as const
        },
        {
          id: 4,
          title: "Final Decision",
          description: "Application approval or decline",
          status: "upcoming" as const
        }
      ]
    }
  ];

  const pastApplications = [
    {
      id: "APP-2022-053",
      property: "Garden View Apartment in Westlands",
      steps: [
        {
          id: 1,
          title: "Application Submitted",
          description: "Your application has been received",
          status: "completed" as const,
          date: "November 5, 2022"
        },
        {
          id: 2,
          title: "Document Verification",
          description: "Your documents are being reviewed",
          status: "completed" as const,
          date: "November 12, 2022"
        },
        {
          id: 3,
          title: "Background Check",
          description: "Verifying employment and references",
          status: "completed" as const,
          date: "November 20, 2022"
        },
        {
          id: 4,
          title: "Final Decision",
          description: "Application declined due to income requirements",
          status: "completed" as const,
          date: "December 2, 2022"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            My Applications
          </h1>
          <p className="text-housing-600">
            Track and manage your housing applications
          </p>
        </div>

        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Active Applications</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Past Applications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 gap-6">
              {activeApplications.length > 0 ? (
                activeApplications.map((app) => (
                  <ApplicationTracker 
                    key={app.id}
                    applicationId={app.id}
                    property={app.property}
                    steps={app.steps}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-housing-500">You don't have any active applications.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 gap-6">
              {pastApplications.length > 0 ? (
                pastApplications.map((app) => (
                  <ApplicationTracker 
                    key={app.id}
                    applicationId={app.id}
                    property={app.property}
                    steps={app.steps}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-housing-500">You don't have any past applications.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Applications;
