"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TouristPlace, CATEGORY_COLORS } from '@/lib/tourism-data';
import { MapPin } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import { cn } from '@/lib/utils';

interface TourismMapProps {
  places: TouristPlace[];
  selectedPlaces: string[];
  onPlaceClick: (place: TouristPlace) => void;
  source?: string;
  destination?: string;
}

// Component to handle map view updates
const MapController = ({ center, zoom, bounds }: { center: [number, number], zoom: number, bounds?: L.LatLngBoundsExpression }) => {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, zoom);
    }
  }, [center, zoom, bounds, map]);
  return null;
};

const TourismMap = ({ places, selectedPlaces, onPlaceClick, source, destination }: TourismMapProps) => {
  // Default center (between Hyderabad and Bangalore)
  const defaultCenter: [number, number] = [15.0, 78.0];
  
  // Create custom icon for markers
  const createCustomIcon = (place: TouristPlace) => {
    const isSelected = selectedPlaces.includes(place.id);
    const colorClass = CATEGORY_COLORS[place.category];
    
    const iconHtml = renderToString(
      <div className="relative flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all border-2 border-white",
          colorClass,
          isSelected ? "ring-4 ring-primary/40 scale-110" : "hover:scale-110"
        )}>
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white z-10" />
        )}
      </div>
    );

    return L.divIcon({
      html: iconHtml,
      className: 'custom-leaflet-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  // Calculate bounds if we have places
  const bounds = places.length > 0 
    ? L.latLngBounds(places.map(p => [p.lat, p.lng])) 
    : undefined;

  // Route polyline (simplified straight-ish line for demo)
  const routePath: [number, number][] = [
    [17.3850, 78.4867], // Hyderabad
    [15.8285, 78.0330], // Kurnool
    [15.1023, 78.1130], // Belum
    [12.9716, 77.5946], // Bangalore
  ];

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-200 relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={defaultCenter} zoom={6} bounds={bounds} />

        {/* Route Polyline */}
        <Polyline 
          positions={routePath} 
          pathOptions={{ 
            color: '#6366f1', 
            weight: 4, 
            opacity: 0.6,
            dashArray: '10, 10'
          }} 
        />

        {places.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.lat, place.lng]} 
            icon={createCustomIcon(place)}
            eventHandlers={{
              click: () => onPlaceClick(place),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <p className="font-black text-slate-900 text-sm m-0">{place.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase m-0">{place.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-xl p-1 rounded-2xl shadow-2xl border border-slate-200 flex flex-col">
          <button 
            className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 font-black text-xl"
            onClick={() => { /* Handled by Leaflet default or custom hook if needed */ }}
          >
            +
          </button>
          <div className="h-px bg-slate-100 mx-2" />
          <button 
            className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 font-black text-xl"
            onClick={() => { /* Handled by Leaflet default or custom hook if needed */ }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourismMap;