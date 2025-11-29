import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LuxuryPropertyCard, { LuxuryProperty } from "@/components/LuxuryPropertyCard";
import PropertyFilters, { PropertyFiltersState } from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Grid, List, Map, Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import BouncingText from "@/components/animations/BouncingText";
import PROPERTIES, { getAvailableProperties } from "@/data/properties";
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

// Fetch properties - using shared data source
const fetchProperties = async (filters?: Partial<PropertyFiltersState>): Promise<LuxuryProperty[]> => {
  // In production, this would be an API call
  // For now, return available properties from shared data, applying filters
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProperties = getAvailableProperties();

      if (filters) {
        if (filters.priceRange) {
          const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filteredProperties = filteredProperties.filter(
              property => (property.price as number) >= minPrice * 1000000 && (property.price as number) <= maxPrice * 1000000
            );
          } else if (filters.priceRange.includes('+')) {
            const minPrice = parseInt(filters.priceRange);
            filteredProperties = filteredProperties.filter(
              property => (property.price as number) >= minPrice * 1000000
            );
          }
        }

        if (filters.bedrooms && filters.bedrooms !== 'any') {
          const bedroomCount = parseInt(filters.bedrooms);
          if (!isNaN(bedroomCount)) {
            if (filters.bedrooms === '5+') {
              filteredProperties = filteredProperties.filter(
                property => property.beds >= 5
              );
            } else {
              filteredProperties = filteredProperties.filter(
                property => property.beds === bedroomCount
              );
            }
          }
        }

        if (filters.propertyType && filters.propertyType !== 'any') {
          filteredProperties = filteredProperties.filter(
            property => property.type?.toLowerCase() === filters.propertyType?.toLowerCase()
          );
        }
      }

      resolve(filteredProperties);
    }, 500);
  });
};

const getFilteredLocations = (filteredProperties: any[]) => {
  // Generate location data from properties for map view
  return filteredProperties.map(property => ({
    id: property.id,
    title: property.title,
    lat: -1.2921 + (Math.random() - 0.5) * 0.1, // Mock coordinates around Nairobi
    lng: 36.8219 + (Math.random() - 0.5) * 0.1,
    price: typeof property.price === 'number' ? property.price : 0
  }));
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

    if (priceParam) initialFilters.priceRange = priceParam;
    if (bedroomsParam) initialFilters.bedrooms = bedroomsParam;
    if (propertyTypeParam) initialFilters.propertyType = propertyTypeParam;

    setFilters(initialFilters);
  }, [searchParams]);

  const { data: propertiesData, isLoading, error, refetch } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    initialData: getAvailableProperties()
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
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Properties Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/hero_luxury_nairobi.png"
            alt="Luxury Properties"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            <BouncingText text="Our Exclusive Portfolio" className="text-4xl md:text-6xl font-display font-bold text-white mb-4" />
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
              Discover a curated selection of Kenya's most prestigious addresses.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="py-16">
        <div className="container mx-auto px-4">

          {isMobile ? (
            <div className="mb-6">
              <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button className="w-full flex items-center justify-center rounded-full h-12">
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
            <div className="mb-12">
              <div className="bg-white/50 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] shadow-sm">
                <PropertyFilters
                  initialFilters={filters}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center mb-8">
            <div>
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{(propertiesData as any[])?.length || 0}</span> properties
                {Object.keys(filters).length > 0 && (
                  <Button
                    variant="ghost"
                    className="ml-2 h-8 px-2 py-1 text-sm hover:bg-destructive/10 hover:text-destructive"
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

            <div className="flex items-center space-x-2 bg-secondary/30 p-1 rounded-full border border-white/20">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`flex items-center rounded-full ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "hover:bg-white/50"}`}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`flex items-center rounded-full ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "hover:bg-white/50"}`}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={`flex items-center rounded-full ${viewMode === "map" ? "bg-white text-primary shadow-sm" : "hover:bg-white/50"}`}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary rounded-full mb-4"></div>
                <div className="h-4 bg-secondary rounded w-32 mb-2"></div>
                <div className="h-3 bg-secondary rounded w-48"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">Error loading properties. Please try again.</p>
              <Button
                variant="outline"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              {(propertiesData as any[])?.length === 0 ? (
                <div className="text-center py-20 bg-secondary/10 rounded-[2rem] border border-dashed border-secondary">
                  <h3 className="text-xl font-display font-bold mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-6">
                    No properties match your current filter criteria. Try adjusting your filters.
                  </p>
                  <Button
                    onClick={() => {
                      setFilters({});
                      window.history.replaceState({}, '', `${window.location.pathname}`);
                      refetch();
                    }}
                    className="rounded-full"
                  >
                    Reset All Filters
                  </Button>
                </div>
              ) : (
                <>
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(propertiesData as any[])?.map((property: any, index: number) => (
                        <LuxuryPropertyCard key={property.id} property={property} index={index} />
                      ))}
                    </div>
                  )}

                  {viewMode === "list" && (
                    <div className="space-y-6">
                      {(propertiesData as any[])?.map((property: any, index: number) => (
                        <LuxuryPropertyCard key={property.id} property={property} index={index} className="h-auto md:h-[300px] flex-row" />
                      ))}
                    </div>
                  )}

                  {viewMode === "map" && (
                    <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-white/20 overflow-hidden">
                      <PropertyMap
                        locations={filteredLocations}
                        height="600px"
                        zoom={11}
                        interactive={true}
                        onMarkerClick={handleMarkerClick}
                      />
                      <div className="mt-4 text-sm text-muted-foreground text-center">
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

      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Affordable Abode</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Connecting discerning clients with Kenya's most exceptional properties. Experience the pinnacle of modern living.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white tracking-wide uppercase text-sm">Quick Links</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/properties" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="/apply" className="hover:text-white transition-colors">Apply for Housing</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white tracking-wide uppercase text-sm">Contact Us</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>support@affordableabode.co.ke</li>
                <li>+254 712 345 678</li>
                <li>Mon-Fri: 9am - 5pm EAT</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white tracking-wide uppercase text-sm">Legal</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Affordable Abode Kenya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default Properties;
