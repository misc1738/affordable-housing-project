import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MapPin, School, ShoppingCart, Train, Umbrella, FileText, Star, Users, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from 'lucide-react';

interface Neighborhood {
  id: string;
  name: string;
  overview: string;
  imageUrl: string;
  ratings: {
    overall: number;
    safety: number;
    transportation: number;
    amenities: number;
    affordability: number;
  };
  amenities: {
    schools: {
      name: string;
      type: string;
      distance: string;
      rating?: number;
    }[];
    shopping: {
      name: string;
      type: string;
      distance: string;
    }[];
    transport: {
      name: string;
      type: string;
      distance: string;
      routes?: string[];
    }[];
    recreation: {
      name: string;
      type: string;
      distance: string;
    }[];
  };
  safety: {
    crimeIndex: number;
    policeStations: number;
    securityFeatures: string[];
  };
  housingProjects: {
    id: string;
    name: string;
    type: string;
    units: number;
    priceRange: string;
    status: "completed" | "under-construction" | "planned";
  }[];
}

const Neighborhood = () => {
  const [neighborhoods] = useState<Neighborhood[]>([
    {
      id: "kilimani",
      name: "Kilimani",
      overview: "Kilimani is a residential area in Nairobi, Kenya, known for its mix of apartment buildings and commercial establishments. It's become an increasingly popular neighborhood for affordable housing initiatives.",
      imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      ratings: {
        overall: 4.2,
        safety: 4.0,
        transportation: 3.8,
        amenities: 4.5,
        affordability: 3.2
      },
      amenities: {
        schools: [
          {
            name: "Kilimani Primary School",
            type: "Public Primary",
            distance: "0.8 km",
            rating: 4.0
          },
          {
            name: "Braeside School",
            type: "Private K-12",
            distance: "1.2 km",
            rating: 4.5
          }
        ],
        shopping: [
          {
            name: "Yaya Centre",
            type: "Shopping Mall",
            distance: "1.0 km"
          },
          {
            name: "Kilimani Market",
            type: "Local Market",
            distance: "0.5 km"
          },
          {
            name: "Carrefour Supermarket",
            type: "Supermarket",
            distance: "1.0 km"
          }
        ],
        transport: [
          {
            name: "Kilimani Matatu Stage",
            type: "Matatu Stop",
            distance: "0.3 km",
            routes: ["Route 58", "Route 23"]
          },
          {
            name: "Ngong Road",
            type: "Major Road",
            distance: "0.7 km"
          }
        ],
        recreation: [
          {
            name: "Kilimani Community Park",
            type: "Park",
            distance: "0.6 km"
          },
          {
            name: "Impala Club",
            type: "Sports Club",
            distance: "1.5 km"
          }
        ]
      },
      safety: {
        crimeIndex: 28,
        policeStations: 2,
        securityFeatures: ["Street Lighting", "Community Policing", "24/7 Security Patrols"]
      },
      housingProjects: [
        {
          id: "kil-001",
          name: "Kilimani Heights",
          type: "Apartment Complex",
          units: 120,
          priceRange: "KSh 2.5M - 4.5M",
          status: "completed"
        },
        {
          id: "kil-002",
          name: "Kilimani Green Residences",
          type: "Mixed Development",
          units: 200,
          priceRange: "KSh 3M - 6M",
          status: "under-construction"
        },
        {
          id: "kil-003",
          name: "Ngong View Apartments",
          type: "Apartment Complex",
          units: 80,
          priceRange: "KSh 2M - 3.5M",
          status: "planned"
        }
      ]
    },
    {
      id: "westlands",
      name: "Westlands",
      overview: "Westlands is a commercial and residential district in Nairobi, Kenya. It's one of the city's most affluent neighborhoods but has been developing affordable housing options in recent years.",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      ratings: {
        overall: 4.5,
        safety: 4.3,
        transportation: 4.6,
        amenities: 4.8,
        affordability: 2.8
      },
      amenities: {
        schools: [
          {
            name: "Westlands Primary School",
            type: "Public Primary",
            distance: "1.0 km",
            rating: 3.8
          },
          {
            name: "Brookhouse International School",
            type: "Private K-12",
            distance: "2.5 km",
            rating: 4.8
          }
        ],
        shopping: [
          {
            name: "Westgate Mall",
            type: "Shopping Mall",
            distance: "1.2 km"
          },
          {
            name: "Sarit Centre",
            type: "Shopping Mall",
            distance: "0.8 km"
          },
          {
            name: "Zucchini Greengrocers",
            type: "Specialty Store",
            distance: "0.6 km"
          }
        ],
        transport: [
          {
            name: "Westlands Bus Station",
            type: "Bus Terminal",
            distance: "0.5 km",
            routes: ["Route 23", "Route 58", "Route 44"]
          },
          {
            name: "Waiyaki Way",
            type: "Major Road",
            distance: "0.3 km"
          }
        ],
        recreation: [
          {
            name: "Westlands Sports Club",
            type: "Sports Club",
            distance: "1.0 km"
          },
          {
            name: "Parklands Sports Club",
            type: "Sports Club",
            distance: "1.8 km"
          }
        ]
      },
      safety: {
        crimeIndex: 22,
        policeStations: 3,
        securityFeatures: ["CCTV Surveillance", "Police Patrols", "Private Security", "Emergency Response Units"]
      },
      housingProjects: [
        {
          id: "west-001",
          name: "Westlands Affordable Towers",
          type: "Apartment Complex",
          units: 150,
          priceRange: "KSh 3M - 5M",
          status: "completed"
        },
        {
          id: "west-002",
          name: "Westpoint Heights",
          type: "Mixed Development",
          units: 180,
          priceRange: "KSh 3.5M - 7M",
          status: "under-construction"
        }
      ]
    }
  ]);

  const [activeNeighborhood, setActiveNeighborhood] = useState<string>("kilimani");
  
  const selectedNeighborhood = neighborhoods.find(n => n.id === activeNeighborhood) || neighborhoods[0];

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-amber-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "under-construction":
        return <Badge className="bg-amber-100 text-amber-800">Under Construction</Badge>;
      case "planned":
        return <Badge className="bg-blue-100 text-blue-800">Planned</Badge>;
      default:
        return null;
    }
  };

  const SafetyScore = ({ score }: { score: number }) => {
    const label = score < 30 ? "Low Crime" : score < 60 ? "Moderate Crime" : "High Crime";
    const color = score < 30 ? "text-green-600" : score < 60 ? "text-amber-600" : "text-red-600";
    
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-housing-600">Crime Index</span>
          <span className={`text-sm font-medium ${color}`}>{label}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${score < 30 ? "bg-green-500" : score < 60 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${100 - score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            Neighborhood Information
          </h1>
          <p className="text-housing-600">
            Explore neighborhoods with affordable housing options in Nairobi
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {neighborhoods.map((neighborhood) => (
            <Button 
              key={neighborhood.id}
              variant={activeNeighborhood === neighborhood.id ? "default" : "outline"}
              onClick={() => setActiveNeighborhood(neighborhood.id)}
              className="flex items-center"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {neighborhood.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-6">
              <div className="h-56 relative">
                <img 
                  src={selectedNeighborhood.imageUrl} 
                  alt={selectedNeighborhood.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h2 className="text-3xl font-display text-white mb-2">{selectedNeighborhood.name}</h2>
                    <div className="flex items-center text-white">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-lg font-medium">{selectedNeighborhood.ratings.overall.toFixed(1)}</span>
                      <span className="mx-2">•</span>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                        {selectedNeighborhood.housingProjects.length} Housing Projects
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-housing-600 mb-6">{selectedNeighborhood.overview}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-housing-50 rounded-lg">
                    <div className={`text-xl font-semibold ${getRatingColor(selectedNeighborhood.ratings.safety)}`}>
                      {selectedNeighborhood.ratings.safety.toFixed(1)}
                    </div>
                    <div className="text-sm text-housing-600">Safety</div>
                  </div>
                  
                  <div className="text-center p-3 bg-housing-50 rounded-lg">
                    <div className={`text-xl font-semibold ${getRatingColor(selectedNeighborhood.ratings.transportation)}`}>
                      {selectedNeighborhood.ratings.transportation.toFixed(1)}
                    </div>
                    <div className="text-sm text-housing-600">Transport</div>
                  </div>
                  
                  <div className="text-center p-3 bg-housing-50 rounded-lg">
                    <div className={`text-xl font-semibold ${getRatingColor(selectedNeighborhood.ratings.amenities)}`}>
                      {selectedNeighborhood.ratings.amenities.toFixed(1)}
                    </div>
                    <div className="text-sm text-housing-600">Amenities</div>
                  </div>
                  
                  <div className="text-center p-3 bg-housing-50 rounded-lg">
                    <div className={`text-xl font-semibold ${getRatingColor(selectedNeighborhood.ratings.affordability)}`}>
                      {selectedNeighborhood.ratings.affordability.toFixed(1)}
                    </div>
                    <div className="text-sm text-housing-600">Affordability</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="amenities" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="amenities" className="flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span>Amenities</span>
                </TabsTrigger>
                <TabsTrigger value="safety" className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Safety</span>
                </TabsTrigger>
                <TabsTrigger value="housing" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  <span>Housing</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-housing-800">Local Amenities</CardTitle>
                    <CardDescription>
                      Explore what {selectedNeighborhood.name} has to offer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-housing-800 mb-3 flex items-center">
                          <School className="h-5 w-5 mr-2 text-blue-600" />
                          Education
                        </h3>
                        <ul className="space-y-3">
                          {selectedNeighborhood.amenities.schools.map((school, idx) => (
                            <li key={idx} className="border-b border-gray-100 pb-3">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium text-housing-800">{school.name}</p>
                                  <p className="text-sm text-housing-500">{school.type} • {school.distance}</p>
                                </div>
                                {school.rating && (
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span>{school.rating.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-housing-800 mb-3 flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                          Shopping
                        </h3>
                        <ul className="space-y-3">
                          {selectedNeighborhood.amenities.shopping.map((shop, idx) => (
                            <li key={idx} className="border-b border-gray-100 pb-3">
                              <p className="font-medium text-housing-800">{shop.name}</p>
                              <p className="text-sm text-housing-500">{shop.type} • {shop.distance}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-housing-800 mb-3 flex items-center">
                          <Train className="h-5 w-5 mr-2 text-amber-600" />
                          Transportation
                        </h3>
                        <ul className="space-y-3">
                          {selectedNeighborhood.amenities.transport.map((transport, idx) => (
                            <li key={idx} className="border-b border-gray-100 pb-3">
                              <p className="font-medium text-housing-800">{transport.name}</p>
                              <p className="text-sm text-housing-500">{transport.type} • {transport.distance}</p>
                              {transport.routes && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {transport.routes.map((route, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {route}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-housing-800 mb-3 flex items-center">
                          <Umbrella className="h-5 w-5 mr-2 text-purple-600" />
                          Recreation
                        </h3>
                        <ul className="space-y-3">
                          {selectedNeighborhood.amenities.recreation.map((rec, idx) => (
                            <li key={idx} className="border-b border-gray-100 pb-3">
                              <p className="font-medium text-housing-800">{rec.name}</p>
                              <p className="text-sm text-housing-500">{rec.type} • {rec.distance}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="safety">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-housing-800">Safety Information</CardTitle>
                    <CardDescription>
                      Safety metrics and facilities in {selectedNeighborhood.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-housing-800 mb-3">Crime Statistics</h3>
                        <SafetyScore score={selectedNeighborhood.safety.crimeIndex} />
                        <p className="text-sm text-housing-500 mt-2">
                          Crime index is based on reported incidents. Lower is better.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-housing-800 mb-3">Security Resources</h3>
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium">{selectedNeighborhood.safety.policeStations}</span>
                          </div>
                          <div>
                            <p className="font-medium text-housing-800">Police Stations</p>
                            <p className="text-sm text-housing-500">Within 3km radius</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-housing-800 mb-3">Security Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedNeighborhood.safety.securityFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-md">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-housing-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="housing">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-housing-800">Housing Projects</CardTitle>
                    <CardDescription>
                      Affordable housing developments in {selectedNeighborhood.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedNeighborhood.housingProjects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4 hover:border-housing-300 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-housing-800">{project.name}</h3>
                              <p className="text-sm text-housing-500">{project.type}</p>
                            </div>
                            {getStatusBadge(project.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-sm text-housing-500">Units</p>
                              <p className="font-medium text-housing-800">{project.units}</p>
                            </div>
                            <div>
                              <p className="text-sm text-housing-500">Price Range</p>
                              <p className="font-medium text-housing-800">{project.priceRange}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="mb-6 sticky top-20">
              <CardHeader>
                <CardTitle className="text-xl font-display text-housing-800">Neighborhood Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-housing-500 uppercase tracking-wider mb-3">Livability Score</h3>
                    <div className="flex items-center space-x-2">
                      <div className="text-3xl font-semibold text-housing-800">{selectedNeighborhood.ratings.overall.toFixed(1)}</div>
                      <div className="flex-1">
                        <Progress value={selectedNeighborhood.ratings.overall * 20} className="h-2" />
                      </div>
                      <div className="text-sm font-medium text-housing-800">/ 5.0</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-housing-500 uppercase tracking-wider mb-3">Best For</h3>
                    <div className="space-y-2">
                      <div className="bg-housing-50 p-2 rounded-md text-housing-800 text-sm">
                        {selectedNeighborhood.id === "kilimani" ? "Young professionals and small families" : "Professionals and business-oriented individuals"}
                      </div>
                      <div className="bg-housing-50 p-2 rounded-md text-housing-800 text-sm">
                        {selectedNeighborhood.id === "kilimani" ? "Those seeking a balance of urban amenities and residential calm" : "Those looking for proximity to business districts"}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-housing-500 uppercase tracking-wider mb-3">Commute Times</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-housing-800">To CBD</span>
                          <span className="font-medium text-housing-800">{selectedNeighborhood.id === "kilimani" ? "20-30 min" : "15-25 min"}</span>
                        </div>
                        <Progress value={selectedNeighborhood.id === "kilimani" ? 65 : 75} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-housing-800">To Industrial Area</span>
                          <span className="font-medium text-housing-800">{selectedNeighborhood.id === "kilimani" ? "30-45 min" : "35-50 min"}</span>
                        </div>
                        <Progress value={selectedNeighborhood.id === "kilimani" ? 55 : 45} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-housing-800">To JKIA Airport</span>
                          <span className="font-medium text-housing-800">{selectedNeighborhood.id === "kilimani" ? "35-45 min" : "40-55 min"}</span>
                        </div>
                        <Progress value={selectedNeighborhood.id === "kilimani" ? 60 : 50} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-housing-500 uppercase tracking-wider mb-3">Resources</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Neighborhood Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Community Forum
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neighborhood;
