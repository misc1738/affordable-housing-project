
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Home, MapPin, User, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ScheduleViewing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("");

  // Mock property data - in a real app this would come from API based on the ID
  const property = {
    id: id || "1",
    title: "Beautiful 3 Bedroom Apartment in Kilimani",
    address: "Kirichwa Road, Kilimani, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Viewing Scheduled",
        description: `Your viewing request for ${property.title} has been submitted. We will contact you shortly to confirm.`,
      });
      navigate(`/property/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display text-housing-800">
                Schedule a Viewing
              </CardTitle>
              <CardDescription>
                Complete this form to schedule a viewing for {property.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-md overflow-hidden">
                    <img 
                      src={property.imageUrl} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-housing-800">{property.title}</h3>
                    <p className="text-sm text-housing-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.address}
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-housing-800">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-housing-500 h-4 w-4" />
                          <Input id="name" className="pl-10" placeholder="Enter your full name" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-housing-500 h-4 w-4" />
                          <Input id="phone" className="pl-10" placeholder="Enter your phone number" required />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-housing-500 h-4 w-4" />
                        <Input 
                          id="email" 
                          type="email" 
                          className="pl-10" 
                          placeholder="Enter your email address" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-housing-800">Viewing Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-housing-500 h-4 w-4" />
                          <Input 
                            id="date" 
                            type="date" 
                            className="pl-10" 
                            required 
                            min={new Date().toISOString().split('T')[0]} 
                            value={viewingDate}
                            onChange={(e) => setViewingDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-housing-500 h-4 w-4" />
                          <Input 
                            id="time" 
                            type="time" 
                            className="pl-10" 
                            required 
                            value={viewingTime}
                            onChange={(e) => setViewingTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="viewingType">Type of Viewing</Label>
                      <Select>
                        <SelectTrigger id="viewingType">
                          <SelectValue placeholder="Select viewing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inPerson">In-Person Viewing</SelectItem>
                          <SelectItem value="virtual">Virtual Tour</SelectItem>
                          <SelectItem value="group">Group Viewing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Any specific questions or requirements for the viewing?" 
                        rows={3} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(`/property/${id}`)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Schedule Viewing"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewing;
