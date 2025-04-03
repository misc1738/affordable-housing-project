
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Map, Building, Navigation } from 'lucide-react';

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
}

const PropertyMap = ({
  locations = [],
  height = "400px",
  center = [36.8219, -1.2921], // Default to Nairobi
  zoom = 12,
  interactive = true
}: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const MAPQUEST_API_KEY = "VGAXuFI8Sfc8Mikujxr9Z0paCJ5GEgpe";

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
          layers: window.L.mapquest.tileLayer('map'),
          zoom: zoom,
          zoomControl: interactive
        });
        
        // Add markers for property locations
        locations.forEach(location => {
          const marker = window.L.marker([location.lat, location.lng], {
            icon: window.L.mapquest.icons.marker(),
            draggable: false
          });
          
          marker.bindPopup(`
            <strong>${location.title}</strong>
            <p>KSh ${location.price.toLocaleString()}</p>
          `).addTo(mapRef.current);
        });
        
        // Add navigation controls if interactive
        if (interactive) {
          window.L.control.zoom({
            position: 'topright'
          }).addTo(mapRef.current);
        }
      } catch (error) {
        console.error('Error initializing MapQuest map:', error);
      }
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [apiLoaded, locations, center, zoom, interactive]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ height, width: '100%', borderRadius: '0.5rem' }}
        className="bg-housing-100"
      />
      {!apiLoaded && (
        <div className="flex items-center justify-center p-4 h-40">
          <div className="flex flex-col items-center">
            <Map className="animate-pulse h-8 w-8 text-housing-500 mb-2" />
            <p className="text-housing-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
