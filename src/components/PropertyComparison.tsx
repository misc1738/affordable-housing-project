
import { useState, useEffect } from 'react';
import { X, Plus, Home, BedDouble, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  type: string;
  imageUrl: string;
  bathrooms?: number;
  size?: number;
  amenities?: string[];
}

interface PropertyComparisonProps {
  properties?: Property[];
}

const PropertyComparison = ({ properties = [] }: PropertyComparisonProps) => {
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const { toast } = useToast();

  // Load compared properties from localStorage on mount
  useEffect(() => {
    const savedProperties = localStorage.getItem('comparedProperties');
    if (savedProperties) {
      try {
        setComparedProperties(JSON.parse(savedProperties));
      } catch (e) {
        console.error('Error loading compared properties', e);
      }
    }
  }, []);

  // Save compared properties to localStorage when they change
  useEffect(() => {
    localStorage.setItem('comparedProperties', JSON.stringify(comparedProperties));
  }, [comparedProperties]);

  const addToComparison = (property: Property) => {
    if (comparedProperties.some(p => p.id === property.id)) {
      toast({
        title: "Already in comparison",
        description: "This property is already in your comparison list",
        variant: "destructive",
      });
      return;
    }

    if (comparedProperties.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 properties at a time. Remove one to add another.",
        variant: "destructive",
      });
      return;
    }

    setComparedProperties([...comparedProperties, property]);
    toast({
      title: "Added to comparison",
      description: "Property has been added to your comparison list",
    });
  };

  const removeFromComparison = (propertyId: number) => {
    setComparedProperties(comparedProperties.filter(p => p.id !== propertyId));
    toast({
      title: "Removed from comparison",
      description: "Property has been removed from your comparison list",
    });
  };

  const clearComparison = () => {
    setComparedProperties([]);
    toast({
      title: "Comparison cleared",
      description: "All properties have been removed from your comparison list",
    });
  };

  const toggleComparison = () => {
    setIsComparisonOpen(!isComparisonOpen);
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <>
      {comparedProperties.length > 0 && (
        <div className="fixed bottom-0 right-0 z-50 p-4">
          <Button 
            onClick={toggleComparison} 
            className="bg-housing-800 hover:bg-housing-900 shadow-lg"
          >
            {isComparisonOpen ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Home className="mr-2 h-4 w-4" />
            )}
            Compare ({comparedProperties.length})
          </Button>
        </div>
      )}

      {isComparisonOpen && comparedProperties.length > 0 && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-4 bg-black/60">
          <Card className="w-full max-w-6xl max-h-[80vh] bg-white rounded-lg shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-housing-800">Property Comparison</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearComparison}>Clear All</Button>
                <Button variant="ghost" size="sm" onClick={toggleComparison}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="max-h-[calc(80vh-80px)]">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* Property headers */}
                  <div className="col-span-1 pr-4 space-y-4">
                    <div className="h-40 flex items-center justify-center">
                      <span className="text-housing-500 font-medium">Property</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Price</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Location</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Type</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Bedrooms</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Bathrooms</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Size</span>
                    </div>
                    <div className="py-3 border-t border-housing-200">
                      <span className="font-medium text-housing-700">Amenities</span>
                    </div>
                  </div>
                  
                  {/* Property data columns */}
                  {comparedProperties.map((property) => (
                    <div key={property.id} className="col-span-1 flex flex-col">
                      <div className="h-40 relative">
                        <img 
                          src={property.imageUrl} 
                          alt={property.title} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => removeFromComparison(property.id)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-housing-700" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2">
                          <Link to={`/property/${property.id}`}>
                            <h3 className="text-sm font-medium text-white bg-black/60 p-2 rounded line-clamp-2">
                              {property.title}
                            </h3>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <span className="font-semibold text-housing-800">{formatPrice(property.price)}/mo</span>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <span className="text-sm text-housing-600">{property.address}</span>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <Badge className="bg-housing-100 text-housing-800 hover:bg-housing-200">{property.type}</Badge>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <div className="flex items-center">
                          <BedDouble className="h-4 w-4 mr-1 text-housing-600" />
                          <span>{property.bedrooms}</span>
                        </div>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <span>{property.bathrooms || "N/A"}</span>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        <span>{property.size ? `${property.size} sq.m` : "N/A"}</span>
                      </div>
                      
                      <div className="py-3 border-t border-housing-200">
                        {property.amenities ? (
                          <div className="space-y-1">
                            {property.amenities.slice(0, 3).map((amenity, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                                <span className="text-housing-600">{amenity}</span>
                              </div>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="text-xs text-housing-400">+{property.amenities.length - 3} more</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-housing-400 text-sm">No amenities listed</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add property column if less than 3 */}
                  {comparedProperties.length < 3 && (
                    <div className="col-span-1 border-2 border-dashed border-housing-200 rounded-lg flex flex-col items-center justify-center h-40">
                      <Plus className="h-10 w-10 text-housing-300 mb-2" />
                      <span className="text-housing-500 text-sm">Add property to compare</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}
    </>
  );
};

export default PropertyComparison;
