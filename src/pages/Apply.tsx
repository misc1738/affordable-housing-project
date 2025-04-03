
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Apply = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted",
        description: "Your housing application has been received. We will review it and get back to you within 5-7 business days.",
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
                Apply for Affordable Housing
              </h1>
              <p className="text-housing-600">
                Complete this form to apply for affordable housing programs in Kenya
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-housing-200 p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-housing-800">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required placeholder="Enter your first name" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required placeholder="Enter your email address" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" required placeholder="Enter your phone number" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID/Passport Number</Label>
                      <Input id="idNumber" required placeholder="Enter your ID or passport number" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-housing-800">Housing Preferences</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Preferred Location</Label>
                        <Select>
                          <SelectTrigger id="location">
                            <SelectValue placeholder="Select preferred location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nairobi-cbd">Nairobi CBD</SelectItem>
                            <SelectItem value="kilimani">Kilimani</SelectItem>
                            <SelectItem value="westlands">Westlands</SelectItem>
                            <SelectItem value="parklands">Parklands</SelectItem>
                            <SelectItem value="karen">Karen</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="housingType">Housing Type</Label>
                        <Select>
                          <SelectTrigger id="housingType">
                            <SelectValue placeholder="Select housing type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="1br">1 Bedroom</SelectItem>
                            <SelectItem value="2br">2 Bedroom</SelectItem>
                            <SelectItem value="3br">3 Bedroom</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Monthly Budget (KES)</Label>
                        <Input id="budget" type="number" required placeholder="Enter your monthly budget" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                        <Input id="moveInDate" type="date" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="program">Affordable Housing Program</Label>
                      <Select>
                        <SelectTrigger id="program">
                          <SelectValue placeholder="Select a program to apply for" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahp">Affordable Housing Program (AHP)</SelectItem>
                          <SelectItem value="firstTimeOwner">First-Time Home Ownership Scheme</SelectItem>
                          <SelectItem value="tenantPurchase">Tenant Purchase Scheme</SelectItem>
                          <SelectItem value="saccoHousing">SACCO Housing Scheme</SelectItem>
                          <SelectItem value="social">Social Housing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-housing-800">Additional Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="employment">Employment Status</Label>
                      <Select>
                        <SelectTrigger id="employment">
                          <SelectValue placeholder="Select your employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="income">Monthly Income (KES)</Label>
                      <Input id="income" type="number" required placeholder="Enter your monthly income" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea 
                        id="additionalInfo" 
                        placeholder="Please provide any additional information that might support your application"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-housing-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Affordable Abode</h3>
              <p className="text-housing-300 text-sm">
                Connecting Kenyans with affordable housing options tailored to their needs and budget.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Quick Links</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/properties" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="/apply" className="hover:text-white transition-colors">Apply for Housing</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Contact Us</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li>support@affordableabode.co.ke</li>
                <li>+254 712 345 678</li>
                <li>Mon-Fri: 9am - 5pm EAT</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Legal</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-housing-700 pt-8 text-center">
            <p className="text-housing-400 text-sm">
              © {new Date().getFullYear()} Affordable Abode Kenya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Apply;
