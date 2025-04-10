
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Map, Building, Navigation, Search, Plus, Minus, Locate, Eye, Map as MapIcon, List } from 'lucide-react';
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
import { useToast } from "@/components/ui/use-toast";
import { useMobile } from '@/hooks/use-mobile';

interface PropertyLocation {
  id: number;
  title: string;
  lat: number;
  lng: number;
  price: number;
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
  const [apiLoaded, setApiLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState<'map' | 'satellite' | 'hybrid'>('map');
  const [selectedLocation, setSelectedLocation] = useState<PropertyLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const MAPQUEST_API_KEY = "VGAXuFI8Sfc8Mikujxr9Z0paCJ5GEgpe";
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();

  useEffect(() => {
    // Load MapQuest API script
    if (!document.getElementById('mapquest-api')) {
      const script = document.createElement('script');
      script.id = 'mapquest-api';
      script.src = `https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js`;
      script.async = true;
      script.onload = () => setApiLoaded(true);
      
      // Add MapQuest CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css';
      
      document.head.appendChild(link);
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  }, []);

  // Initialize and update map
  useEffect(() => {
    if (apiLoaded && mapContainer.current && window.L) {
      try {
        // Initialize map
        window.L.mapquest.key = MAPQUEST_API_KEY;
        
        if (mapRef.current) {
          mapRef.current.remove();
        }
        
        mapRef.current = window.L.mapquest.map(mapContainer.current, {
          center: [center[1], center[0]], // MapQuest uses [lat, lng] order
          layers: window.L.mapquest.tileLayer(mapStyle),
          zoom: zoom,
          zoomControl: false
        });
        
        // Add markers for property locations
        locations.forEach(location => {
          const marker = window.L.marker([location.lat, location.lng], {
            icon: window.L.mapquest.icons.marker({
              primaryColor: '#3B82F6',
              secondaryColor: '#1E40AF',
              shadow: true,
              size: 'md'
            }),
            draggable: false,
            title: location.title
          });
          
          // Add popup and click handler
          marker.bindPopup(`
            <div class="font-sans">
              <h3 class="font-bold text-sm mb-1">${location.title}</h3>
              <p class="text-sm mb-2">KSh ${location.price.toLocaleString()}</p>
              <button 
                class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                onclick="window.mapMarkerClicked(${location.id})"
              >
                View Details
              </button>
            </div>
          `);
          
          marker.addTo(mapRef.current);
          
          // Handle marker click
          marker.on('click', () => {
            setSelectedLocation(location);
            
            if (onMarkerClick) {
              onMarkerClick(location.id);
            }
          });
        });
        
        // Define global function for marker buttons
        window.mapMarkerClicked = (id) => {
          if (onMarkerClick) {
            onMarkerClick(id);
          } else {
            navigate(`/property/${id}`);
          }
        };
        
        // Add current location marker if available
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
        
        // Add custom controls if interactive
        if (interactive) {
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
            
            // Add event listeners
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
          
          // Add layer control
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
            
            // Add event listeners
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
        }
      } catch (error) {
        console.error('Error initializing MapQuest map:', error);
        toast({
          title: "Map Error",
          description: "There was a problem loading the map. Please try again.",
          variant: "destructive"
        });
      }
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      
      // Clean up global function
      if (window.mapMarkerClicked) {
        delete window.mapMarkerClicked;
      }
    };
  }, [apiLoaded, locations, center, zoom, interactive, currentLocation, mapStyle]);

  // Function to change map style
  const changeMapStyle = (style: 'map' | 'satellite' | 'hybrid') => {
    setMapStyle(style);
    
    if (mapRef.current) {
      mapRef.current.removeLayer(mapRef.current.layerManager.getLayer('map'));
      mapRef.current.addLayer(window.L.mapquest.tileLayer(style));
      
      toast({
        title: "Map Style Changed",
        description: `Map view updated to ${style} style.`,
      });
    }
  };

  // Function to handle location search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    if (window.L && mapRef.current) {
      window.L.mapquest.geocoding().geocode(searchQuery, (error: any, response: any) => {
        if (!error && response.results && response.results[0].locations && response.results[0].locations.length) {
          const location = response.results[0].locations[0];
          const { latLng } = location;
          
          mapRef.current.setView([latLng.lat, latLng.lng], 14);
          
          // Add a temporary marker
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
          
          // Remove after 5 seconds
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

  // Function to get current location
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

  // Function to view all properties
  const viewAllProperties = () => {
    if (locations.length === 0 || !mapRef.current) return;
    
    // Create a bounds object
    const bounds = window.L.latLngBounds();
    
    // Add all location coordinates to the bounds
    locations.forEach(location => {
      bounds.extend([location.lat, location.lng]);
    });
    
    // Fit the map to these bounds with some padding
    mapRef.current.fitBounds(bounds, {
      padding: [50, 50]
    });
    
    toast({
      title: "View Updated",
      description: "Showing all available properties on the map.",
    });
  };
  
  // Property detail dialog/drawer component based on mobile state
  const PropertyDetail = () => {
    if (!selectedLocation) return null;
    
    const content = (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{selectedLocation.title}</h3>
        <p className="text-2xl font-bold text-housing-800">
          KSh {selectedLocation.price.toLocaleString()}/mo
        </p>
        <div className="flex items-center space-x-2 text-housing-600">
          <MapPin className="w-4 h-4" />
          <span>
            Lat: {selectedLocation.lat.toFixed(4)}, 
            Lng: {selectedLocation.lng.toFixed(4)}
          </span>
        </div>
        <div className="pt-4">
          <Button 
            className="w-full"
            onClick={() => navigate(`/property/${selectedLocation.id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Property Details
          </Button>
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
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={getCurrentLocation}
            >
              <Locate className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Location</span>
              <span className="sm:hidden">Locate</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={viewAllProperties}
            >
              <MapIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
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
      
      {/* Property detail dialog/drawer */}
      <PropertyDetail />
    </div>
  );
};

// Add a global type declaration for the mapMarkerClicked function
declare global {
  interface Window {
    mapMarkerClicked: (id: number) => void;
    L: any;
  }
}

export default PropertyMap;
