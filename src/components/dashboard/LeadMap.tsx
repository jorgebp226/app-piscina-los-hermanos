import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Lead } from '../../types';

interface LeadMapProps {
  leads: Lead[];
  onMarkerClick: (lead: Lead) => void;
}

const LeadMap: React.FC<LeadMapProps> = ({ leads, onMarkerClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  mapboxgl.accessToken = 'pk.eyJ1IjoidGFsa3kiLCJhIjoiY20zbGl2a3Y3MG9lbTJzcGVncDhvNmsyeCJ9.jFzKCjyTBC-3SS5jltZ3JQ';

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#22c55e'; // verde
      case 'in_progress':
        return '#f97316'; // naranja
      case 'negotiation':
        return '#ef4444'; // rojo
      case 'new_lead':
        return '#3b82f6'; // azul
      default:
        return '#6b7280';
    }
  };

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-3.7038, 40.4168],
        zoom: 9,
        maxZoom: 16,
        minZoom: 5
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.setMaxBounds([
        [-4.5766, 39.8880],
        [-3.0526, 40.9507]
      ]);
    }

    // Limpiar marcadores anteriores
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Añadir nuevos marcadores
    leads.forEach(lead => {
      const markerEl = document.createElement('div');
      markerEl.className = 'marker';

      const size = 36;
      // Crear un contenedor para el marcador que manejará la transformación
      markerEl.innerHTML = `
        <div class="marker-container" style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${getMarkerColor(lead.status)};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 12px;
          transition: all 0.2s ease;
          transform-origin: center center;
        ">
          ${lead.status === 'completed' ? '✓' : 
            lead.status === 'in_progress' ? '⚡' :
            lead.status === 'negotiation' ? '💬' : '🎯'}
        </div>
      `;

      // Obtener el contenedor interno para las animaciones
      const markerContainer = markerEl.querySelector('.marker-container') as HTMLElement;

      // Crear el popup con más información
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        className: 'custom-popup'
      }).setHTML(`
        <div class="p-3">
          <h3 class="font-semibold text-gray-900">${lead.name}</h3>
          <p class="text-sm text-gray-600 mt-1">${lead.address}</p>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-sm font-medium">${lead.estimatedBudget.toLocaleString()}€</span>
            <span class="text-xs px-2 py-1 rounded-full ${
              lead.status === 'completed' ? 'bg-green-100 text-green-800' :
              lead.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
              lead.status === 'negotiation' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }">
              ${lead.status === 'completed' ? 'Completado' :
                lead.status === 'in_progress' ? 'En Provisión' :
                lead.status === 'negotiation' ? 'En Negociación' :
                'Nuevo Lead'}
            </span>
          </div>
        </div>
      `);

      // Crear y añadir el marcador
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([lead.coordinates.lng, lead.coordinates.lat])
        .addTo(map.current!);

      // Eventos del marcador
      markerContainer.addEventListener('mouseenter', () => {
        markerContainer.style.transform = 'scale(1.2)';
        popup.addTo(map.current!);
      });

      markerContainer.addEventListener('mouseleave', () => {
        markerContainer.style.transform = 'scale(1)';
        popup.remove();
      });

      markerContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        onMarkerClick(lead);
        popup.remove();
      });

      markers.current.push(marker);
    });

    // Ajustar el mapa para mostrar todos los marcadores
    if (leads.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      leads.forEach(lead => {
        bounds.extend([lead.coordinates.lng, lead.coordinates.lat]);
      });
      map.current?.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 13,
      });
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [leads, onMarkerClick]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <div ref={mapContainer} className="w-full h-[600px]" />
      
      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Estado de los Leads</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">Realizados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-sm text-gray-600">En provisión</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">En negociación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">Nuevos leads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMap;