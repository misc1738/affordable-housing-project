
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    // Check if token is in localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom,
      interactive: interactive
    });

    // Add navigation controls if interactive
    if (interactive) {
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
    }

    // Add markers for property locations
    map.current.on('load', () => {
      locations.forEach(location => {
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <strong>${location.title}</strong>
            <p>KSh ${location.price.toLocaleString()}</p>
          `);
          
        new mapboxgl.Marker()
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput) {
      localStorage.setItem('mapbox_token', tokenInput);
      setMapboxToken(tokenInput);
      setShowTokenInput(false);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken, locations]);

  return (
    <div>
      {showTokenInput ? (
        <div className="border border-housing-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-housing-600 mb-2">
            To display property locations on a map, please enter your Mapbox access token. 
            You can get a free token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-housing-800 underline">Mapbox</a>.
          </p>
          <form onSubmit={handleTokenSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox access token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Apply</Button>
          </form>
        </div>
      ) : (
        <div
          ref={mapContainer}
          style={{ height, width: '100%', borderRadius: '0.5rem' }}
          className="bg-housing-100"
        />
      )}
    </div>
  );
};

export default PropertyMap;
