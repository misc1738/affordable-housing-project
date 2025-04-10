import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters, { PropertyFiltersState } from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Grid, List, Map, Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMobile } from "@/hooks/use-mobile";

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

const fetchProperties = async (filters?: Partial<PropertyFiltersState>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProperties = [...properties];
      
      if (filters) {
        if (filters.priceRange) {
          const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filteredProperties = filteredProperties.filter(
              property => property.price >= minPrice * 1000 && property.price <= maxPrice * 1000
            );
          } else if (filters.priceRange.includes('+')) {
            const minPrice = parseInt(filters.priceRange);
            filteredProperties = filteredProperties.filter(
              property => property.price >= minPrice * 1000
            );
          }
        }
        
        if (filters.bedrooms && filters.bedrooms !== 'any') {
          if (filters.bedrooms === 'studio') {
            filteredProperties = filteredProperties.filter(
              property => property.type === 'Studio'
            );
          } else {
            const bedroomCount = parseInt(filters.bedrooms);
            if (!isNaN(bedroomCount)) {
              if (filters.bedrooms === '3') {
                filteredProperties = filteredProperties.filter(
                  property => property.bedrooms >= 3
                );
              } else {
                filteredProperties = filteredProperties.filter(
                  property => property.bedrooms === bedroomCount
                );
              }
            }
          }
        }
        
        if (filters.propertyType && filters.propertyType !== 'any') {
          filteredProperties = filteredProperties.filter(
            property => property.type.toLowerCase() === filters.propertyType.toLowerCase()
          );
        }
      }
      
      resolve(filteredProperties);
    }, 500);
  });
};

const getFilteredLocations = (filteredProperties: any[]) => {
  return propertyLocations.filter(location => 
    filteredProperties.some(property => property.id === location.id)
  );
};

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [searchParams] = useSearchParams();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [filters, setFilters] = useState<Partial<PropertyFiltersState>>({});
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useMobile();
  
  useEffect(() => {
    const initialFilters: Partial<PropertyFiltersState> = {};
    
    const priceParam = searchParams.get("price");
    const bedroomsParam = searchParams.get("bedrooms");
    const propertyTypeParam = searchParams.get("type");
    const eligibilityParam = searchParams.get("eligibility");
    const incomeTypeParam = searchParams.get("income");
    
    if (priceParam) initialFilters.priceRange = priceParam;
    if (bedroomsParam) initialFilters.bedrooms = bedroomsParam;
    if (propertyTypeParam) initialFilters.propertyType = propertyTypeParam;
    if (eligibilityParam) initialFilters.eligibility = eligibilityParam;
    if (incomeTypeParam) initialFilters.incomeType = incomeTypeParam;
    
    setFilters(initialFilters);
  }, [searchParams]);
  
  const { data: propertiesData, isLoading, error, refetch } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    initialData: properties
  });

  const handleApplyFilters = (newFilters: PropertyFiltersState) => {
    setFilters(newFilters);
    refetch();
    setIsFilterDrawerOpen(false);
  };
  
  const filteredLocations = getFilteredLocations(propertiesData as any[]);
  
  const handleMarkerClick = (id: number) => {
    setSelectedPropertyId(id);
    if (viewMode !== "map") {
      setViewMode("map");
    }
    
    if (viewMode === "list") {
      const element = document.getElementById(`property-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
          
          {isMobile ? (
            <div className="mb-6">
              <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button className="w-full flex items-center justify-center">
                    <Filter className="w-4 h-4 mr-2" />
                    {Object.keys(filters).length > 0 ? "Filters Applied" : "Filter Properties"}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[90vh] overflow-y-auto">
                  <DrawerHeader>
                    <DrawerTitle>Filter Properties</DrawerTitle>
                    <DrawerDescription>Customize your property search</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <PropertyFilters 
                      initialFilters={filters}
                      onApplyFilters={handleApplyFilters}
                    />
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          ) : (
            <div className="mb-8">
              <PropertyFilters 
                initialFilters={filters}
                onApplyFilters={handleApplyFilters}
              />
            </div>
          )}
          
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <p className="text-housing-600">
                Showing <span className="font-semibold">{(propertiesData as any[])?.length || 0}</span> properties
                {Object.keys(filters).length > 0 && (
                  <Button 
                    variant="ghost" 
                    className="ml-2 h-8 px-2 py-1 text-sm" 
                    onClick={() => {
                      setFilters({});
                      window.history.replaceState({}, '', `${window.location.pathname}`);
                      refetch();
                      toast({
                        title: "Filters Cleared",
                        description: "All filters have been reset to default values."
                      });
                    }}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear filters
                  </Button>
                )}
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
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-10 h-10 bg-housing-300 rounded-full mb-4"></div>
                <div className="h-4 bg-housing-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-housing-200 rounded w-48"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading properties. Please try again.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              {(propertiesData as any[])?.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-housing-200">
                  <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                  <p className="text-housing-600 mb-4">
                    No properties match your current filter criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    onClick={() => {
                      setFilters({});
                      window.history.replaceState({}, '', `${window.location.pathname}`);
                      refetch();
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              ) : (
                <>
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(propertiesData as any[]).map((property: any) => (
                        <PropertyCard key={property.id} {...property} />
                      ))}
                    </div>
                  )}
                  
                  {viewMode === "list" && (
                    <div className="space-y-4">
                      {(propertiesData as any[]).map((property: any) => (
                        <div 
                          key={property.id} 
                          id={`property-${property.id}`}
                          className={`flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border transition-all ${
                            property.id === selectedPropertyId ? 'border-housing-500 ring-2 ring-housing-200' : 'border-housing-200'
                          } shadow-sm`}
                        >
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
                              <Button onClick={() => window.location.href = `/property/${property.id}`}>View Details</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {viewMode === "map" && (
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-housing-200">
                      <PropertyMap
                        locations={filteredLocations}
                        height="600px"
                        zoom={11}
                        interactive={true}
                        onMarkerClick={handleMarkerClick}
                      />
                      <div className="mt-4 text-sm text-housing-600">
                        <p>Click on map markers to view property details. Use zoom controls to explore different areas.</p>
                      </div>
                    </div>
                  )}
                </>
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
