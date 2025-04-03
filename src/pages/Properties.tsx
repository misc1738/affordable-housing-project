
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Grid, List, Map } from "lucide-react";

// Sample properties data with Kenyan context
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Kilimani",
    address: "Kirichwa Road, Kilimani, Nairobi",
    price: 75000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: 2,
    title: "Cozy Studio in Westlands",
    address: "Waiyaki Way, Westlands, Nairobi",
    price: 45000,
    bedrooms: 1,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    id: 3,
    title: "Family Home in Karen",
    address: "Karen Road, Karen, Nairobi",
    price: 120000,
    bedrooms: 3,
    type: "House",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 4,
    title: "Spacious Townhouse in Lavington",
    address: "James Gichuru Road, Lavington, Nairobi",
    price: 95000,
    bedrooms: 3,
    type: "Townhouse",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    id: 5,
    title: "Elegant Apartment in Riverside",
    address: "Riverside Drive, Nairobi",
    price: 85000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    id: 6,
    title: "Budget Studio in Ngara",
    address: "Ngara Road, Ngara, Nairobi",
    price: 25000,
    bedrooms: 1,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55",
  },
  {
    id: 7,
    title: "Affordable Housing in Eastlands",
    address: "Jogoo Road, Eastlands, Nairobi",
    price: 35000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 8,
    title: "AHP Residence in Pangani",
    address: "Pangani Estate, Nairobi",
    price: 42000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
  },
];

// Property locations for map
const propertyLocations = [
  { id: 1, title: "Modern Apartment in Kilimani", lat: -1.2921, lng: 36.8219, price: 75000 },
  { id: 2, title: "Cozy Studio in Westlands", lat: -1.2673, lng: 36.8061, price: 45000 },
  { id: 3, title: "Family Home in Karen", lat: -1.3184, lng: 36.7111, price: 120000 },
  { id: 4, title: "Spacious Townhouse in Lavington", lat: -1.2773, lng: 36.7752, price: 95000 },
  { id: 5, title: "Elegant Apartment in Riverside", lat: -1.2740, lng: 36.8058, price: 85000 },
  { id: 6, title: "Budget Studio in Ngara", lat: -1.2762, lng: 36.8315, price: 25000 },
  { id: 7, title: "Affordable Housing in Eastlands", lat: -1.2855, lng: 36.8601, price: 35000 },
  { id: 8, title: "AHP Residence in Pangani", lat: -1.2716, lng: 36.8365, price: 42000 },
];

// Fetch properties (simulated API call)
const fetchProperties = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(properties), 500);
  });
};

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  
  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
              Find Your Affordable Home in Kenya
            </h1>
            <p className="text-housing-600 max-w-3xl">
              Browse through our curated collection of affordable housing options across Kenya. 
              Filter by location, price, and amenities to find your perfect match.
            </p>
          </div>
          
          <div className="mb-8">
            <PropertyFilters />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-housing-600">
                Showing <span className="font-semibold">{properties.length}</span> properties
              </p>
            </div>
            
            <div className="flex items-center space-x-2 bg-white p-1 rounded-md border border-housing-200">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center"
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center"
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center"
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading properties...</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              )}
              
              {viewMode === "list" && (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border border-housing-200 shadow-sm">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={property.imageUrl} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-housing-800 mb-2">{property.title}</h3>
                          <p className="text-housing-600 mb-4">{property.address}</p>
                          <div className="flex items-center space-x-4 text-housing-600">
                            <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{property.type}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xl font-bold text-housing-800">KES {property.price.toLocaleString()}/mo</p>
                          <Button>View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {viewMode === "map" && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-housing-200">
                  <PropertyMap
                    locations={propertyLocations}
                    height="600px"
                    zoom={11}
                  />
                </div>
              )}
            </>
          )}
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

export default Properties;
