
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DocumentManager from "@/components/DocumentManager";
import PropertyAlerts from "@/components/PropertyAlerts";
import PropertyComparison from "@/components/PropertyComparison";
import MPesaPayment from "@/components/MPesaPayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Bell, 
  Home, 
  CreditCard, 
  Settings,
  User,
  BarChart3
} from "lucide-react";

// Sample properties for comparison
const sampleProperties = [
  {
    id: 1,
    title: "Modern Apartment in Kilimani",
    address: "Kirichwa Road, Kilimani, Nairobi",
    price: 75000,
    bedrooms: 2,
    bathrooms: 2,
    size: 85,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking"]
  },
  {
    id: 2,
    title: "Cozy Studio in Westlands",
    address: "Waiyaki Way, Westlands, Nairobi",
    price: 45000,
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    amenities: ["Wifi", "Parking", "Water Storage"]
  }
];

const UserDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  
  const handleViewDetails = (id: number) => {
    navigate(`/property/${id}`);
  };
  
  const handleApply = (id: number, name: string) => {
    navigate(`/apply?propertyId=${id}&propertyName=${encodeURIComponent(name)}`);
  };
  
  const handleViewProfile = () => {
    toast({
      title: "Profile Information",
      description: "This feature will be available soon. Stay tuned!",
    });
  };
  
  const handleNotificationSettings = () => {
    toast({
      title: "Notification Settings",
      description: "This feature will be available soon. Stay tuned!",
    });
  };
  
  const handlePreferences = () => {
    navigate('/quiz');
  };
  
  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            User Dashboard
          </h1>
          <p className="text-housing-600">
            Manage your account, documents, and property preferences
          </p>
        </div>
        
        <PropertyComparison properties={sampleProperties} />
        
        <Tabs defaultValue="documents" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents">
            <DocumentManager />
          </TabsContent>
          
          <TabsContent value="alerts">
            <PropertyAlerts />
          </TabsContent>
          
          <TabsContent value="payments">
            {showPayment ? (
              <MPesaPayment 
                amount={15000} 
                description="Application fee for Modern Apartment in Kilimani" 
                onSuccess={() => {
                  setShowPayment(false);
                  toast({
                    title: "Payment Successful",
                    description: "Your payment has been processed successfully."
                  });
                }}
                onCancel={() => setShowPayment(false)}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-housing-800">
                    Payments & Transactions
                  </CardTitle>
                  <CardDescription>
                    View your payment history and make new payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-housing-800 mb-3">Recent Transactions</h3>
                    <div className="bg-white rounded-lg border border-housing-200 divide-y divide-housing-100">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-housing-800">Application Fee</p>
                          <p className="text-sm text-housing-500">May 15, 2023</p>
                        </div>
                        <span className="font-semibold text-housing-800">KSh 5,000</span>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-housing-800">Rental Deposit</p>
                          <p className="text-sm text-housing-500">April 2, 2023</p>
                        </div>
                        <span className="font-semibold text-housing-800">KSh 45,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-housing-800 mb-3">Make a Payment</h3>
                    <p className="text-housing-600 mb-4">
                      Securely pay your fees or deposits using M-Pesa
                    </p>
                    <Button onClick={() => setShowPayment(true)}>
                      Make Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display text-housing-800">
                  My Properties
                </CardTitle>
                <CardDescription>
                  View and manage your saved and applied properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-housing-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-housing-800">Applications</h3>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="border rounded-md p-3">
                        <p className="font-medium text-housing-800">Modern Apartment in Kilimani</p>
                        <p className="text-sm text-housing-500">Applied on May 10, 2023</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm" className="text-xs" onClick={() => handleViewDetails(1)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-housing-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-housing-800">Saved Properties</h3>
                      <span className="text-sm text-housing-500">3 properties</span>
                    </div>
                    <div className="space-y-3">
                      <div className="border rounded-md p-3">
                        <p className="font-medium text-housing-800">Family Home in Karen</p>
                        <p className="text-sm text-housing-500">Saved on May 5, 2023</p>
                        <div className="flex justify-end mt-2 gap-2">
                          <Button variant="outline" size="sm" className="text-xs" onClick={() => handleViewDetails(3)}>
                            View
                          </Button>
                          <Button variant="default" size="sm" className="text-xs" onClick={() => handleApply(3, "Family Home in Karen")}>
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display text-housing-800">
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your profile, preferences, and account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center" onClick={handleViewProfile}>
                    <User className="h-8 w-8 mb-2 text-housing-600" />
                    <span className="font-medium text-housing-800">Profile Information</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center" onClick={handleNotificationSettings}>
                    <Bell className="h-8 w-8 mb-2 text-housing-600" />
                    <span className="font-medium text-housing-800">Notification Settings</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center" onClick={handlePreferences}>
                    <BarChart3 className="h-8 w-8 mb-2 text-housing-600" />
                    <span className="font-medium text-housing-800">Preferences</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
