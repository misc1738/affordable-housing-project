
import { useState } from "react";
import { 
  ArrowLeft, 
  BedDouble, 
  Home, 
  MapPin, 
  Maximize2, 
  Phone, 
  Share2, 
  SunMedium, 
  LandPlot,
  Calendar
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import PropertyMap from "@/components/PropertyMap";
import VerificationBadge from "@/components/VerificationBadge";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  
  // Mock property data (would typically come from API)
  const property = {
    id: 1,
    title: "Beautiful 3 Bedroom Apartment in Kilimani",
    address: "Kirichwa Road, Kilimani, Nairobi",
    price: 75000,
    bedrooms: 3,
    bathrooms: 2,
    size: 150, // square meters
    type: "Apartment",
    available: true,
    verificationStatus: "verified" as "verified" | "unverified" | "pending",
    description: "This stunning 3-bedroom apartment in the heart of Kilimani offers modern living with excellent amenities. Featuring a spacious living area, modern kitchen, and balcony with city views. The apartment is located in a secure compound with 24/7 security, swimming pool, and gym access.",
    amenities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Parking Space",
      "Backup Generator",
      "Water Storage",
      "High-speed Internet",
      "Balcony"
    ],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?q=80&w=2674&auto=format&fit=crop"
    ],
    landlord: {
      name: "Nyumba Property Management",
      phone: "+254 712 345 678",
      responseRate: "95%",
      responseTime: "Within 24 hours"
    },
    location: {
      lat: -1.2921,
      lng: 36.8219,
      nearby: [
        { name: "Yaya Centre", distance: "0.5 km" },
        { name: "Nairobi Hospital", distance: "1.2 km" },
        { name: "Central Business District", distance: "4 km" }
      ]
    }
  };

  const handleApplyNow = () => {
    // Navigate to application page with property ID
    navigate(`/apply?propertyId=${property.id}&propertyName=${encodeURIComponent(property.title)}`);
  };

  const handleScheduleViewing = () => {
    setIsViewingDialogOpen(true);
  };

  const handleSubmitViewingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Viewing Scheduled",
      description: `Your viewing request for ${property.title} has been submitted. We will contact you shortly to confirm.`,
    });
    setIsViewingDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-6">
          <Link to="/properties" className="flex items-center text-housing-600 hover:text-housing-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Link>
        </div>
        
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800">
                {property.title}
              </h1>
              <VerificationBadge type={property.verificationStatus} />
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-housing-600" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ description: "Link copied to clipboard" });
              }}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="flex items-center text-housing-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.address}</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-housing-100 text-housing-800 hover:bg-housing-200 px-3 py-1">
              KSh {property.price.toLocaleString()} per month
            </Badge>
            <div className="flex items-center gap-1 text-housing-600">
              <BedDouble className="h-4 w-4" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1 text-housing-600">
              <Home className="h-4 w-4" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-1 text-housing-600">
              <Maximize2 className="h-4 w-4" />
              <span>{property.size} sq.m</span>
            </div>
            <div className="flex items-center gap-1 text-housing-600">
              <LandPlot className="h-4 w-4" />
              <span>{property.type}</span>
            </div>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            <div className="md:col-span-8 h-[400px] overflow-hidden rounded-lg">
              <img 
                src={property.images[activeImage]} 
                alt={`${property.title} - Main Image`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-2">
              {property.images.slice(0, 3).map((image, index) => (
                <div 
                  key={index}
                  className={`h-32 overflow-hidden rounded-lg cursor-pointer ${
                    activeImage === index ? "ring-2 ring-housing-800" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Property Details Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="amenities" className="flex-1">Amenities</TabsTrigger>
                <TabsTrigger value="location" className="flex-1">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="bg-white rounded-lg p-6 shadow-sm border border-housing-200">
                <h3 className="text-xl font-semibold text-housing-800 mb-4">Property Description</h3>
                <p className="text-housing-600 leading-relaxed mb-6">
                  {property.description}
                </p>
                
                <h3 className="text-xl font-semibold text-housing-800 mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-housing-500 text-sm">Property Type</p>
                    <p className="text-housing-800 font-medium">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-housing-500 text-sm">Bedrooms</p>
                    <p className="text-housing-800 font-medium">{property.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-housing-500 text-sm">Bathrooms</p>
                    <p className="text-housing-800 font-medium">{property.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-housing-500 text-sm">Size</p>
                    <p className="text-housing-800 font-medium">{property.size} square meters</p>
                  </div>
                  <div>
                    <p className="text-housing-500 text-sm">Availability</p>
                    <p className="text-housing-800 font-medium">{property.available ? "Available Now" : "Not Available"}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="bg-white rounded-lg p-6 shadow-sm border border-housing-200">
                <h3 className="text-xl font-semibold text-housing-800 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <SunMedium className="h-4 w-4 mr-2 text-housing-600" />
                      <span className="text-housing-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="bg-white rounded-lg p-6 shadow-sm border border-housing-200">
                <h3 className="text-xl font-semibold text-housing-800 mb-4">Location</h3>
                <div className="mb-6 h-[300px] rounded-lg">
                  <PropertyMap
                    locations={[{
                      id: property.id,
                      title: property.title,
                      lat: property.location.lat,
                      lng: property.location.lng,
                      price: property.price
                    }]}
                    center={[property.location.lng, property.location.lat]}
                    zoom={15}
                  />
                </div>
                
                <h4 className="font-medium text-housing-800 mb-3">Nearby Places</h4>
                <ul className="space-y-2">
                  {property.location.nearby.map((place, index) => (
                    <li key={index} className="flex items-center text-housing-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{place.name}</span>
                      <span className="ml-auto text-housing-400 text-sm">{place.distance}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Contact Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-housing-200 sticky top-24">
              <h3 className="text-xl font-semibold text-housing-800 mb-4">Contact Property Manager</h3>
              
              <div className="mb-6">
                <p className="text-housing-600 text-sm">Listed by</p>
                <p className="font-medium text-housing-800">{property.landlord.name}</p>
                <div className="flex items-center mt-2 text-housing-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${property.landlord.phone}`} className="hover:text-housing-800">
                    {property.landlord.phone}
                  </a>
                </div>
                <div className="mt-2 text-sm text-housing-500">
                  <p>Response rate: {property.landlord.responseRate}</p>
                  <p>Typical response: {property.landlord.responseTime}</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-housing-800 hover:bg-housing-900 mb-3"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-housing-300 text-housing-700 hover:bg-housing-50"
                onClick={handleScheduleViewing}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Viewing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Viewing Dialog */}
      <Dialog open={isViewingDialogOpen} onOpenChange={setIsViewingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Viewing</DialogTitle>
            <DialogDescription>
              Complete the form below to schedule a viewing for {property.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitViewingRequest}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" required />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" required />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" required min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Input id="time" type="time" required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Schedule Viewing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;
