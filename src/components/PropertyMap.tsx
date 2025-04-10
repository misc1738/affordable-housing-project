
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Map, Building, Navigation, Search, Plus, Minus, Locate, Eye, Map as MapIcon, List, MapPin, Layers, Route, Compass, Filter, Satellite } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PropertyLocation {
  id: number;
  title: string;
  lat: number;
  lng: number;
  price: number;
  isPOI?: boolean;
  poiType?: string;
}

interface PropertyMapProps {
  locations?: PropertyLocation[];
  height?: string;
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
  onMarkerClick?: (id: number) => void;
}

const PropertyMap = ({
  locations = [],
  height = "400px",
  center = [36.8219, -1.2921], // Default to Nairobi
  zoom = 12,
  interactive = true,
  onMarkerClick
}: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const mapInstanceId = useRef<string>(`map-${Math.random().toString(36).substring(2, 15)}`);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState<'map' | 'satellite' | 'hybrid'>('map');
  const [selectedLocation, setSelectedLocation] = useState<PropertyLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [routeDistance, setRouteDistance] = useState<string | null>(null);
  const [routeTime, setRouteTime] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const MAPQUEST_API_KEY = "VGAXuFI8Sfc8Mikujxr9Z0paCJ5GEgpe";
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Load the MapQuest API script
  useEffect(() => {
    // Only load script if it hasn't been loaded yet
    if (!window.L && !document.getElementById('mapquest-api')) {
      const script = document.createElement('script');
      script.id = 'mapquest-api';
      script.src = `https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js`;
      script.async = true;
      script.onload = () => setApiLoaded(true);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css';
      
      document.head.appendChild(link);
      document.body.appendChild(script);
    } else {
      // Script already exists, just update the state
      setApiLoaded(!!window.L);
    }

    // Cleanup function to set the map reference to null
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.log("Map was already removed or cleanup failed", error);
        }
        mapRef.current = null;
      }
    };
  }, []);

  // Initialize and update the map
  useEffect(() => {
    // Don't proceed if the API is not loaded or the container is not available
    if (!apiLoaded || !mapContainer.current || !window.L) return;
    
    try {
      // Set the MapQuest API key
      window.L.mapquest.key = MAPQUEST_API_KEY;
      
      // Check if map instance already exists and clean it up
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.log("Failed to remove existing map", error);
        }
      }

      // Create a unique ID for the container to avoid conflicts
      mapContainer.current.id = mapInstanceId.current;
      
      // Create a new map instance
      mapRef.current = window.L.mapquest.map(mapContainer.current, {
        center: [center[1], center[0]],
        layers: window.L.mapquest.tileLayer(mapStyle),
        zoom: zoom,
        zoomControl: false
      });
      
      // Create markers for each location
      const markers: any[] = [];
      locations.forEach(location => {
        let markerIcon;
        
        if (location.isPOI) {
          let color = '#3B82F6'; // Default blue
          
          switch(location.poiType) {
            case 'shopping':
              color = '#F59E0B'; // Orange
              break;
            case 'health':
              color = '#EF4444'; // Red
              break;
            case 'education':
              color = '#8B5CF6'; // Purple
              break;
            case 'park':
              color = '#10B981'; // Green
              break;
          }
          
          markerIcon = window.L.mapquest.icons.marker({
            primaryColor: color,
            secondaryColor: '#1E293B',
            shadow: true,
            size: 'sm'
          });
        } else {
          markerIcon = window.L.mapquest.icons.marker({
            primaryColor: '#3B82F6',
            secondaryColor: '#1E40AF',
            shadow: true,
            size: 'md'
          });
        }
        
        const marker = window.L.marker([location.lat, location.lng], {
          icon: markerIcon,
          draggable: false,
          title: location.title
        });
        
        if (!location.isPOI) {
          marker.bindPopup(`
            <div class="font-sans">
              <h3 class="font-bold text-sm mb-1">${location.title}</h3>
              <p class="text-sm mb-2">KSh ${location.price?.toLocaleString() || 'N/A'}</p>
              <button 
                class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                onclick="window.mapMarkerClicked(${location.id})"
              >
                View Details
              </button>
            </div>
          `);
        } else {
          marker.bindPopup(`
            <div class="font-sans">
              <h3 class="font-bold text-sm mb-1">${location.title}</h3>
              <p class="text-sm mb-2">${location.poiType?.charAt(0).toUpperCase() + location.poiType?.slice(1) || ''}</p>
            </div>
          `);
        }
        
        marker.addTo(mapRef.current);
        markers.push(marker);
        
        marker.on('click', () => {
          if (!location.isPOI) {
            setSelectedLocation(location);
            
            if (onMarkerClick) {
              onMarkerClick(location.id);
            }
          }
        });
      });
      
      // Define global marker click handler for the popup buttons
      window.mapMarkerClicked = (id) => {
        if (onMarkerClick) {
          onMarkerClick(id);
        } else {
          navigate(`/property/${id}`);
        }
      };
      
      // Add user location marker if available
      if (currentLocation) {
        const userMarker = window.L.marker([currentLocation[1], currentLocation[0]], {
          icon: window.L.mapquest.icons.marker({
            primaryColor: '#10B981',
            secondaryColor: '#065F46',
            symbol: '•',
            shadow: true
          })
        });
        
        userMarker.bindPopup('<b>Your Location</b>').addTo(mapRef.current);
      }
      
      // Add map controls if interactive mode is enabled
      if (interactive) {
        addInteractiveControls();
      }
      
      // Cluster markers if there are many
      if (locations.length > 10 && window.L.markerClusterGroup) {
        try {
          const clusterGroup = window.L.markerClusterGroup();
          markers.forEach(marker => clusterGroup.addLayer(marker));
          mapRef.current.addLayer(clusterGroup);
        } catch (error) {
          console.log("Marker clustering not available or failed", error);
        }
      }
    } catch (error) {
      console.error('Error initializing MapQuest map:', error);
      toast({
        title: "Map Error",
        description: "There was a problem loading the map. Please try again.",
        variant: "destructive"
      });
    }
    
    // Cleanup function
    return () => {
      // Remove the click handler from window to avoid memory leaks
      delete window.mapMarkerClicked;
    };
  }, [apiLoaded, locations, center, zoom, interactive, currentLocation, mapStyle]);

  // Add interactive controls to the map
  const addInteractiveControls = () => {
    if (!mapRef.current || !window.L) return;

    // Add zoom controls
    const zoomControl = window.L.control({
      position: 'topright'
    });
    
    zoomControl.onAdd = function() {
      const div = window.L.DomUtil.create('div', 'map-custom-controls flex flex-col');
      div.innerHTML = `
        <button id="zoom-in" class="bg-white p-2 mb-1 rounded-md shadow hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
        <button id="zoom-out" class="bg-white p-2 rounded-md shadow hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
        </button>
      `;
      
      window.L.DomEvent.on(div.querySelector('#zoom-in'), 'click', function(e) {
        window.L.DomEvent.stopPropagation(e);
        mapRef.current.zoomIn();
      });
      
      window.L.DomEvent.on(div.querySelector('#zoom-out'), 'click', function(e) {
        window.L.DomEvent.stopPropagation(e);
        mapRef.current.zoomOut();
      });
      
      return div;
    };
    
    zoomControl.addTo(mapRef.current);
    
    // Add layer controls
    const layerControl = window.L.control({
      position: 'bottomleft'
    });
    
    layerControl.onAdd = function() {
      const div = window.L.DomUtil.create('div', 'map-layer-control bg-white p-2 rounded-md shadow');
      div.innerHTML = `
        <div class="flex space-x-1 text-xs font-medium">
          <button id="map-style-map" class="px-2 py-1 ${mapStyle === 'map' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} rounded transition-colors">Map</button>
          <button id="map-style-satellite" class="px-2 py-1 ${mapStyle === 'satellite' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} rounded transition-colors">Satellite</button>
          <button id="map-style-hybrid" class="px-2 py-1 ${mapStyle === 'hybrid' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'} rounded transition-colors">Hybrid</button>
        </div>
      `;
      
      window.L.DomEvent.on(div.querySelector('#map-style-map'), 'click', function(e) {
        window.L.DomEvent.stopPropagation(e);
        changeMapStyle('map');
      });
      
      window.L.DomEvent.on(div.querySelector('#map-style-satellite'), 'click', function(e) {
        window.L.DomEvent.stopPropagation(e);
        changeMapStyle('satellite');
      });
      
      window.L.DomEvent.on(div.querySelector('#map-style-hybrid'), 'click', function(e) {
        window.L.DomEvent.stopPropagation(e);
        changeMapStyle('hybrid');
      });
      
      return div;
    };
    
    layerControl.addTo(mapRef.current);
  };

  // Handle showing directions
  useEffect(() => {
    if (showDirections && selectedLocation && currentLocation && mapRef.current && window.L) {
      try {
        // Clear existing routes
        if (mapRef.current.directions) {
          mapRef.current.directions.setRoute(null);
        }

        // Initialize directions if not already done
        if (!mapRef.current.directions) {
          mapRef.current.directions = window.L.mapquest.directions();
        }

        // Get directions
        window.L.mapquest.directions().route({
          start: `${currentLocation[1]},${currentLocation[0]}`,
          end: `${selectedLocation.lat},${selectedLocation.lng}`,
          options: {
            enhancedNarrative: true,
            maxRoutes: 1,
            timeOverage: 25
          }
        }, function(err, response) {
          if (err) {
            console.error('Error getting directions:', err);
            toast({
              title: "Directions Error",
              description: "Could not calculate directions. Please try again.",
              variant: "destructive"
            });
            setShowDirections(false);
            return;
          }

          // Create the route
          window.L.mapquest.directions().setLayerOptions({
            startMarker: {
              icon: window.L.mapquest.icons.marker({
                primaryColor: '#10B981',
                secondaryColor: '#065F46',
                shadow: true,
                size: 'sm'
              }),
              draggable: false,
              title: 'Your Location'
            },
            endMarker: {
              icon: window.L.mapquest.icons.marker({
                primaryColor: '#3B82F6',
                secondaryColor: '#1E40AF',
                shadow: true,
                size: 'sm'
              }),
              title: selectedLocation.title
            },
            routeRibbon: {
              color: '#4338CA',
              opacity: 0.7,
              showTraffic: true
            }
          });
          
          window.L.mapquest.directions().route({
            start: `${currentLocation[1]},${currentLocation[0]}`,
            end: `${selectedLocation.lat},${selectedLocation.lng}`,
          });

          // Extract route information
          if (response.route && response.route.distance && response.route.formattedTime) {
            setRouteDistance(response.route.distance.toFixed(1) + ' km');
            setRouteTime(response.route.formattedTime);
            
            toast({
              title: "Directions Ready",
              description: `Distance: ${response.route.distance.toFixed(1)} km, Time: ${response.route.formattedTime}`,
            });
          }
        });
      } catch (error) {
        console.error('Error setting up directions:', error);
        toast({
          title: "Directions Error",
          description: "Could not calculate directions. Please try again.",
          variant: "destructive"
        });
        setShowDirections(false);
      }
    } else if (!showDirections && mapRef.current && mapRef.current.directions) {
      // Clear directions when showDirections is toggled off
      mapRef.current.directions.setRoute(null);
      setRouteDistance(null);
      setRouteTime(null);
    }
  }, [showDirections, selectedLocation, currentLocation]);

  // Change the map style
  const changeMapStyle = (style: 'map' | 'satellite' | 'hybrid') => {
    setMapStyle(style);
    
    if (mapRef.current && window.L) {
      try {
        const layerManager = mapRef.current.layerManager;
        if (layerManager && layerManager.getLayer('map')) {
          mapRef.current.removeLayer(layerManager.getLayer('map'));
        } else {
          // If layerManager not available, try different approach
          const layers = mapRef.current._layers;
          if (layers) {
            // Find and remove tile layers
            Object.keys(layers).forEach(key => {
              const layer = layers[key];
              if (layer._url && layer._url.includes('mapquest.com')) {
                mapRef.current.removeLayer(layer);
              }
            });
          }
        }
        
        // Add new layer
        mapRef.current.addLayer(window.L.mapquest.tileLayer(style));
        
        toast({
          title: "Map Style Changed",
          description: `Map view updated to ${style} style.`,
        });
      } catch (error) {
        console.error('Error changing map style:', error);
      }
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    if (window.L && mapRef.current) {
      window.L.mapquest.geocoding().geocode(searchQuery, (error: any, response: any) => {
        if (!error && response.results && response.results[0].locations && response.results[0].locations.length) {
          const location = response.results[0].locations[0];
          const { latLng } = location;
          
          mapRef.current.setView([latLng.lat, latLng.lng], 14);
          
          const searchMarker = window.L.marker([latLng.lat, latLng.lng], {
            icon: window.L.mapquest.icons.marker({
              primaryColor: '#EF4444',
              secondaryColor: '#B91C1C',
              symbol: '•'
            })
          });
          
          searchMarker.bindPopup(`
            <b>${location.street || ''}</b><br>
            ${location.adminArea5 || ''}, ${location.adminArea3 || ''}<br>
            ${location.adminArea1 || ''}
          `).addTo(mapRef.current).openPopup();
          
          setTimeout(() => {
            if (mapRef.current) {
              mapRef.current.removeLayer(searchMarker);
            }
          }, 5000);
          
          toast({
            title: "Location Found",
            description: `Showing results for ${searchQuery}`,
          });
        } else {
          toast({
            title: "Search Error",
            description: "Could not find the location. Please try a different search.",
            variant: "destructive"
          });
        }
      });
    }
  };

  // Get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Finding Your Location",
        description: "Please wait while we locate you...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
          
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 14);
            
            const userMarker = window.L.marker([latitude, longitude], {
              icon: window.L.mapquest.icons.marker({
                primaryColor: '#10B981',
                secondaryColor: '#065F46',
                symbol: '•',
                shadow: true
              })
            });
            
            userMarker.bindPopup('<b>Your Location</b>').addTo(mapRef.current).openPopup();
            
            toast({
              title: "Location Found",
              description: "The map has been centered to your current location.",
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          
          toast({
            title: "Location Error",
            description: "Could not access your location. Please check your browser settings.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive"
      });
    }
  };

  // Show all properties on the map
  const viewAllProperties = () => {
    if (locations.length === 0 || !mapRef.current) return;
    
    const bounds = window.L.latLngBounds();
    
    locations.forEach(location => {
      bounds.extend([location.lat, location.lng]);
    });
    
    mapRef.current.fitBounds(bounds, {
      padding: [50, 50]
    });
    
    toast({
      title: "View Updated",
      description: "Showing all available properties on the map.",
    });
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainer.current?.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen Error",
          description: "Could not enter fullscreen mode: " + err.message,
          variant: "destructive"
        });
      });
      
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Toggle directions
  const toggleDirections = () => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please get your current location first to show directions.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedLocation) {
      toast({
        title: "Property Selection Required",
        description: "Please select a property first to show directions.",
        variant: "destructive"
      });
      return;
    }
    
    setShowDirections(prev => !prev);
    
    if (showDirections) {
      toast({
        title: "Directions Removed",
        description: "Route directions have been removed from the map.",
      });
    }
  };

  // Property detail component
  const PropertyDetail = () => {
    if (!selectedLocation) return null;
    
    const content = (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{selectedLocation.title}</h3>
        <p className="text-2xl font-bold text-housing-800">
          KSh {selectedLocation.price?.toLocaleString() || 'N/A'}/mo
        </p>
        <div className="flex items-center space-x-2 text-housing-600">
          <MapPin className="w-4 h-4" />
          <span>
            Lat: {selectedLocation.lat.toFixed(4)}, 
            Lng: {selectedLocation.lng.toFixed(4)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={() => navigate(`/property/${selectedLocation.id}`)}
            variant="default"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          <Button
            onClick={toggleDirections}
            variant={showDirections ? "destructive" : "outline"}
            disabled={!currentLocation}
          >
            <Route className="w-4 h-4 mr-2" />
            {showDirections ? "Hide Route" : "Get Directions"}
          </Button>
          
          {showDirections && routeDistance && routeTime && (
            <div className="col-span-2 bg-housing-50 p-3 rounded-md text-sm">
              <p className="font-medium">Route Information:</p>
              <div className="flex justify-between mt-1">
                <span>Distance: {routeDistance}</span>
                <span>Time: {routeTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    
    if (isMobile) {
      return (
        <Drawer open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Property Information</DrawerTitle>
              <DrawerDescription>Details about the selected property</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              {content}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Property Information</DialogTitle>
            <DialogDescription>Details about the selected property</DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-4">
      {interactive && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10"
            />
            <Button 
              size="sm" 
              variant="ghost" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Map Tools</span>
                  <span className="sm:hidden">Tools</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid grid-cols-1 gap-1">
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={getCurrentLocation}
                  >
                    <Locate className="h-4 w-4 mr-2" />
                    My Location
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={viewAllProperties}
                  >
                    <MapIcon className="h-4 w-4 mr-2" />
                    View All Properties
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={() => changeMapStyle('map')}
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Standard Map
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={() => changeMapStyle('satellite')}
                  >
                    <Satellite className="h-4 w-4 mr-2" />
                    Satellite View
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={() => changeMapStyle('hybrid')}
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Hybrid View
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start h-9"
                    onClick={toggleFullscreen}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={getCurrentLocation}
            >
              <Locate className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Location</span>
              <span className="sm:hidden">Locate</span>
            </Button>
          </div>
        </div>
      )}
      
      <div
        ref={mapContainer}
        style={{ height, width: '100%', borderRadius: '0.5rem' }}
        className="bg-housing-100 relative shadow-md"
      />
      
      {!apiLoaded && (
        <div className="flex items-center justify-center p-4 h-40 absolute inset-0">
          <div className="flex flex-col items-center">
            <Map className="animate-pulse h-8 w-8 text-housing-500 mb-2" />
            <p className="text-housing-600">Loading map...</p>
          </div>
        </div>
      )}
      
      {showDirections && selectedLocation && currentLocation && (
        <div className="bg-white p-3 rounded border mt-2 text-sm">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Directions</h4>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={toggleDirections}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center text-housing-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Distance: {routeDistance || '...'}</span>
            </div>
            <div className="flex items-center text-housing-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Time: {routeTime || '...'}</span>
            </div>
          </div>
        </div>
      )}
      
      <PropertyDetail />
    </div>
  );
};

declare global {
  interface Window {
    mapMarkerClicked: (id: number) => void;
    L: any;
  }
}

export default PropertyMap;
