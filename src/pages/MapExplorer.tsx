import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Filter, Map, Layers, Navigation, Compass, Home, Building, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMobile } from "@/hooks/use-mobile";
import { PropertyFiltersState } from "@/components/PropertyFilters";

const propertyLocations = [
  { 
    id: 1, 
    title: "Modern Apartment in Kilimani", 
    lat: -1.2921, 
    lng: 36.8219, 
    price: 75000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    area: 120,
    amenities: ["Pool", "Gym", "Security", "Parking"],
    address: "Kirichwa Road, Kilimani, Nairobi"
  },
  { 
    id: 2, 
    title: "Cozy Studio in Westlands", 
    lat: -1.2673, 
    lng: 36.8061, 
    price: 45000,
    bedrooms: 1,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    area: 65,
    amenities: ["Security", "Parking"],
    address: "Waiyaki Way, Westlands, Nairobi"
  },
  { 
    id: 3, 
    title: "Family Home in Karen", 
    lat: -1.3184, 
    lng: 36.7111, 
    price: 120000,
    bedrooms: 3,
    type: "House",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    area: 220,
    amenities: ["Garden", "Security", "Parking", "Servant Quarters"],
    address: "Karen Road, Karen, Nairobi"
  },
  { 
    id: 4, 
    title: "Spacious Townhouse in Lavington", 
    lat: -1.2773, 
    lng: 36.7752, 
    price: 95000,
    bedrooms: 3,
    type: "Townhouse",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    area: 180,
    amenities: ["Security", "Parking", "Garden"],
    address: "James Gichuru Road, Lavington, Nairobi"
  },
  { 
    id: 5, 
    title: "Elegant Apartment in Riverside", 
    lat: -1.2740, 
    lng: 36.8058, 
    price: 85000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    area: 110,
    amenities: ["Pool", "Gym", "Security", "Parking"],
    address: "Riverside Drive, Nairobi"
  },
  { 
    id: 6, 
    title: "Budget Studio in Ngara", 
    lat: -1.2762, 
    lng: 36.8315, 
    price: 25000,
    bedrooms: 1,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55",
    area: 45,
    amenities: ["Security"],
    address: "Ngara Road, Ngara, Nairobi"
  },
  { 
    id: 7, 
    title: "Affordable Housing in Eastlands", 
    lat: -1.2855, 
    lng: 36.8601, 
    price: 35000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    area: 85,
    amenities: ["Security", "Parking"],
    address: "Jogoo Road, Eastlands, Nairobi"
  },
  { 
    id: 8, 
    title: "AHP Residence in Pangani", 
    lat: -1.2716, 
    lng: 36.8365, 
    price: 42000,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
    area: 90,
    amenities: ["Security", "Parking"],
    address: "Pangani Estate, Nairobi"
  }
];

const pointsOfInterest = [
  { id: 'poi-1', title: 'Westgate Shopping Mall', lat: -1.2565, lng: 36.8030, type: 'shopping' },
  { id: 'poi-2', title: 'Two Rivers Mall', lat: -1.2208, lng: 36.8042, type: 'shopping' },
  { id: 'poi-3', title: 'Garden City Mall', lat: -1.2426, lng: 36.8756, type: 'shopping' },
  { id: 'poi-4', title: 'Kenyatta National Hospital', lat: -1.3019, lng: 36.8080, type: 'health' },
  { id: 'poi-5', title: 'Nairobi Hospital', lat: -1.2938, lng: 36.8136, type: 'health' },
  { id: 'poi-6', title: 'University of Nairobi', lat: -1.2789, lng: 36.8171, type: 'education' },
  { id: 'poi-7', title: 'Jomo Kenyatta University', lat: -1.0918, lng: 37.0141, type: 'education' },
  { id: 'poi-8', title: 'Nairobi National Park', lat: -1.3481, lng: 36.8302, type: 'park' },
  { id: 'poi-9', title: 'Karura Forest', lat: -1.2350, lng: 36.8295, type: 'park' },
];

interface MapFilters {
  priceRange: [number, number];
  bedrooms: string;
  propertyType: string;
  amenities: string[];
  showPointsOfInterest: boolean;
  poiTypes: string[];
}

const MapExplorer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();
  const [searchParams] = useSearchParams();
  
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(propertyLocations);
  
  const [filters, setFilters] = useState<MapFilters>({
    priceRange: [0, 150000],
    bedrooms: "any",
    propertyType: "any",
    amenities: [],
    showPointsOfInterest: true,
    poiTypes: ["shopping", "health", "education", "park"]
  });
  
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const propertyType = searchParams.get("type");
    const amenities = searchParams.get("amenities");
    
    const newFilters = { ...filters };
    
    if (minPrice && maxPrice) {
      newFilters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
    }
    
    if (bedrooms) {
      newFilters.bedrooms = bedrooms;
    }
    
    if (propertyType) {
      newFilters.propertyType = propertyType;
    }
    
    if (amenities) {
      newFilters.amenities = amenities.split(',');
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  }, [searchParams]);
  
  const applyFilters = (currentFilters: MapFilters) => {
    let results = [...propertyLocations];
    
    results = results.filter(property => 
      property.price >= currentFilters.priceRange[0] && 
      property.price <= currentFilters.priceRange[1]
    );
    
    if (currentFilters.bedrooms !== "any") {
      if (currentFilters.bedrooms === "studio") {
        results = results.filter(property => property.type === "Studio");
      } else if (currentFilters.bedrooms === "3+") {
        results = results.filter(property => property.bedrooms >= 3);
      } else {
        const bedroomCount = parseInt(currentFilters.bedrooms);
        results = results.filter(property => property.bedrooms === bedroomCount);
      }
    }
    
    if (currentFilters.propertyType !== "any") {
      results = results.filter(property => 
        property.type.toLowerCase() === currentFilters.propertyType.toLowerCase()
      );
    }
    
    if (currentFilters.amenities.length > 0) {
      results = results.filter(property => 
        currentFilters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    setFilteredLocations(results);
    
    toast({
      title: `${results.length} Properties Found`,
      description: `Showing ${results.length} properties matching your criteria.`,
    });
  };
  
  const handleFilterSubmit = () => {
    applyFilters(filters);
    setIsFilterDrawerOpen(false);
    
    const params = new URLSearchParams();
    params.set("minPrice", filters.priceRange[0].toString());
    params.set("maxPrice", filters.priceRange[1].toString());
    
    if (filters.bedrooms !== "any") {
      params.set("bedrooms", filters.bedrooms);
    }
    
    if (filters.propertyType !== "any") {
      params.set("type", filters.propertyType);
    }
    
    if (filters.amenities.length > 0) {
      params.set("amenities", filters.amenities.join(','));
    }
    
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };
  
  const handleResetFilters = () => {
    const defaultFilters: MapFilters = {
      priceRange: [0, 150000],
      bedrooms: "any",
      propertyType: "any",
      amenities: [],
      showPointsOfInterest: true,
      poiTypes: ["shopping", "health", "education", "park"]
    };
    
    setFilters(defaultFilters);
    applyFilters(defaultFilters);
    
    window.history.replaceState({}, '', window.location.pathname);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };
  
  const handleAmenityToggle = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      setFilters(prev => ({
        ...prev,
        amenities: prev.amenities.filter(a => a !== amenity)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
  };
  
  const handlePoiTypeToggle = (poiType: string) => {
    if (filters.poiTypes.includes(poiType)) {
      setFilters(prev => ({
        ...prev,
        poiTypes: prev.poiTypes.filter(t => t !== poiType)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        poiTypes: [...prev.poiTypes, poiType]
      }));
    }
  };
  
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };
  
  const currentPointsOfInterest = filters.showPointsOfInterest 
    ? pointsOfInterest.filter(poi => filters.poiTypes.includes(poi.type))
    : [];
  
  const mapLocations = [
    ...filteredLocations,
    ...currentPointsOfInterest.map(poi => ({
      id: parseInt(poi.id.split('-')[1]),
      title: poi.title,
      lat: poi.lat,
      lng: poi.lng,
      price: 0,
      isPOI: true,
      poiType: poi.type
    }))
  ];

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
              Interactive Map Explorer
            </h1>
            <p className="text-housing-600 max-w-3xl">
              Discover affordable housing options across Kenya using our interactive map. 
              Filter properties, explore neighborhoods, and find points of interest nearby.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Property Map</CardTitle>
                    
                    <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="outline">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter Map
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="max-h-[90vh] overflow-y-auto">
                        <DrawerHeader>
                          <DrawerTitle>Map Filters</DrawerTitle>
                        </DrawerHeader>
                        
                        <div className="px-4 pb-8">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label>Price Range</Label>
                              <div className="pt-4 pb-2 px-2">
                                <Slider
                                  value={filters.priceRange}
                                  min={0}
                                  max={150000}
                                  step={5000}
                                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                                />
                              </div>
                              <div className="flex justify-between text-sm text-housing-600">
                                <span>{formatPrice(filters.priceRange[0])}</span>
                                <span>{formatPrice(filters.priceRange[1])}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="bedrooms">Bedrooms</Label>
                              <Select
                                value={filters.bedrooms}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
                                <SelectTrigger id="bedrooms">
                                  <SelectValue placeholder="Number of bedrooms" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Any</SelectItem>
                                  <SelectItem value="studio">Studio</SelectItem>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3+">3+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="property-type">Property Type</Label>
                              <Select
                                value={filters.propertyType}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                                <SelectTrigger id="property-type">
                                  <SelectValue placeholder="Property type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Any</SelectItem>
                                  <SelectItem value="apartment">Apartment</SelectItem>
                                  <SelectItem value="house">House</SelectItem>
                                  <SelectItem value="studio">Studio</SelectItem>
                                  <SelectItem value="townhouse">Townhouse</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Amenities</Label>
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                {["Security", "Parking", "Pool", "Gym", "Garden", "Servant Quarters"].map((amenity) => (
                                  <div key={amenity} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`amenity-${amenity}`} 
                                      checked={filters.amenities.includes(amenity)}
                                      onCheckedChange={() => handleAmenityToggle(amenity)}
                                    />
                                    <label htmlFor={`amenity-${amenity}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                      {amenity}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="show-poi"
                                  checked={filters.showPointsOfInterest}
                                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showPointsOfInterest: !!checked }))}
                                />
                                <Label htmlFor="show-poi">Show Points of Interest</Label>
                              </div>
                              
                              {filters.showPointsOfInterest && (
                                <div className="grid grid-cols-2 gap-2 pt-2 pl-6">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="poi-shopping"
                                      checked={filters.poiTypes.includes("shopping")}
                                      onCheckedChange={() => handlePoiTypeToggle("shopping")}
                                    />
                                    <label htmlFor="poi-shopping" className="text-sm font-medium leading-none">
                                      Shopping Malls
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="poi-health"
                                      checked={filters.poiTypes.includes("health")}
                                      onCheckedChange={() => handlePoiTypeToggle("health")}
                                    />
                                    <label htmlFor="poi-health" className="text-sm font-medium leading-none">
                                      Hospitals
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="poi-education"
                                      checked={filters.poiTypes.includes("education")}
                                      onCheckedChange={() => handlePoiTypeToggle("education")}
                                    />
                                    <label htmlFor="poi-education" className="text-sm font-medium leading-none">
                                      Universities
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="poi-park"
                                      checked={filters.poiTypes.includes("park")}
                                      onCheckedChange={() => handlePoiTypeToggle("park")}
                                    />
                                    <label htmlFor="poi-park" className="text-sm font-medium leading-none">
                                      Parks
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <Button onClick={handleFilterSubmit} className="flex-1">
                                Apply Filters
                              </Button>
                              <Button 
                                onClick={handleResetFilters} 
                                variant="outline" 
                                className="flex-1"
                              >
                                Reset Filters
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pb-0">
                  <PropertyMap
                    locations={mapLocations as any[]}
                    height="600px"
                    zoom={12}
                    interactive={true}
                    onMarkerClick={(id) => {
                      const selectedProperty = filteredLocations.find(p => p.id === id);
                      if (selectedProperty) {
                        setSelectedPropertyId(id);
                      }
                    }}
                  />
                </CardContent>
                <CardFooter className="pt-4 flex-col items-start">
                  <div className="text-sm text-housing-600">
                    <p>Showing {filteredLocations.length} properties and {currentPointsOfInterest.length} points of interest</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-xs text-housing-600">Properties</span>
                    </div>
                    {filters.showPointsOfInterest && filters.poiTypes.includes("shopping") && (
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                        <span className="text-xs text-housing-600">Shopping</span>
                      </div>
                    )}
                    {filters.showPointsOfInterest && filters.poiTypes.includes("health") && (
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-xs text-housing-600">Health</span>
                      </div>
                    )}
                    {filters.showPointsOfInterest && filters.poiTypes.includes("education") && (
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        <span className="text-xs text-housing-600">Education</span>
                      </div>
                    )}
                    {filters.showPointsOfInterest && filters.poiTypes.includes("park") && (
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-xs text-housing-600">Parks</span>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:w-1/3 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Available Properties
                    <span className="ml-2 text-sm font-normal text-housing-600">
                      ({filteredLocations.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[600px] overflow-y-auto px-4 pt-2">
                  {filteredLocations.length === 0 ? (
                    <div className="text-center py-8">
                      <Building className="w-12 h-12 mx-auto text-housing-300 mb-2" />
                      <h3 className="text-lg font-semibold text-housing-700 mb-1">No Properties Found</h3>
                      <p className="text-housing-500 text-sm">
                        Try adjusting your filters to see more results
                      </p>
                      <Button className="mt-4" variant="outline" onClick={handleResetFilters}>
                        Reset All Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredLocations.map(property => (
                        <Card key={property.id} className={`overflow-hidden transition-all ${
                          property.id === selectedPropertyId ? 'ring-2 ring-housing-500' : ''
                        }`}>
                          <div className="flex">
                            <div className="w-1/3">
                              <img
                                src={property.imageUrl}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-2/3 p-3 space-y-2">
                              <h3 className="font-semibold text-sm line-clamp-1">{property.title}</h3>
                              <div className="flex items-center text-xs text-housing-600">
                                <DollarSign className="w-3 h-3 mr-1" />
                                <span>KSh {property.price.toLocaleString()}/mo</span>
                              </div>
                              <div className="flex items-center text-xs text-housing-600">
                                <Home className="w-3 h-3 mr-1" />
                                <span>{property.bedrooms} bed • {property.type}</span>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full mt-2 h-8 text-xs"
                                onClick={() => navigate(`/property/${property.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="link" className="p-0" onClick={() => navigate("/properties")}>
                    View All Properties
                  </Button>
                </CardFooter>
              </Card>
              
              {filters.showPointsOfInterest && currentPointsOfInterest.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                      Points of Interest
                      <span className="ml-2 text-sm font-normal text-housing-600">
                        ({currentPointsOfInterest.length})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[300px] overflow-y-auto px-4 pt-2">
                    <div className="space-y-2">
                      {currentPointsOfInterest.map(poi => (
                        <div key={poi.id} className="flex items-center p-2 border rounded hover:bg-housing-50">
                          {poi.type === 'shopping' && (
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                              <Layers className="w-4 h-4 text-orange-600" />
                            </div>
                          )}
                          {poi.type === 'health' && (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600"><path d="M8 19h8a4 4 0 0 0 0-8h-8a4 4 0 0 0 0 8Z"/><path d="M8 19H6c-1.1 0-2-.9-2-2v-1.1A2 2 0 0 1 4.5 14h1a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5H8"/><path d="M8 11V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v5"/></svg>
                            </div>
                          )}
                          {poi.type === 'education' && (
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-600"><path d="m2 7 8-5 12 5-12 5Z"/><path d="M5 10v4a6 6 0 0 0 12 0v-4"/></svg>
                            </div>
                          )}
                          {poi.type === 'park' && (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-600"><path d="M18 8c0 6-6 11-6 11s-6-5-6-11a6 6 0 0 1 12 0Z"/><circle cx="12" cy="8" r="2"/></svg>
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-medium">{poi.title}</h4>
                            <p className="text-xs text-housing-600 capitalize">{poi.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-housing-800 text-white py-12 mt-8">
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
                <li><a href="/map-explorer" className="hover:text-white transition-colors">Map Explorer</a></li>
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

export default MapExplorer;
