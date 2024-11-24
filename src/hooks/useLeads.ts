import { useState, useEffect } from 'react';
import { leadsTable } from '../utils/airtable';
import { Lead, PoolDimensions, ParcelDimensions } from '../types';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFsa3kiLCJhIjoiY20zbGl2a3Y3MG9lbTJzcGVncDhvNmsyeCJ9.jFzKCjyTBC-3SS5jltZ3JQ';

interface GeocodingResponse {
  features: Array<{
    center: [number, number];
  }>;
}

const parsePoolDimensions = (dimensions: string): PoolDimensions => {
  try {
    // Formato esperado: "3x7"
    const [length = '0', width = '0'] = dimensions.split('x').map(d => d.trim());
    return { length, width };
  } catch (error) {
    console.error('Error parsing pool dimensions:', error);
    return { length: '0', width: '0' };
  }
};

const parseParcelDimensions = (dimensions: string): ParcelDimensions => {
  try {
    // Formato esperado: "400"
    return { area: dimensions.trim() };
  } catch (error) {
    console.error('Error parsing parcel dimensions:', error);
    return { area: '0' };
  }
};

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const geocodeAddress = async (address: string): Promise<{lng: number; lat: number} | null> => {
    try {
      const query = encodeURIComponent(`${address}, Madrid, España`);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}&country=ES&types=address&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Error en la geocodificación');
      }

      const data: GeocodingResponse = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return { lng, lat };
      }
      
      return null;
    } catch (error) {
      console.error('Error geocodificando dirección:', error);
      return null;
    }
  };

  const fetchLeads = async () => {
    try {
      const records = await leadsTable
        .select({
          view: "Grid view",
          sort: [{ field: "Created_At", direction: "desc" }]
        })
        .all();

      const formattedLeads = await Promise.all(
        records.map(async (record) => {
          const address = record.get('Ubicacion') as string;
          const coordinates = await geocodeAddress(address);
          
          // Parseamos las dimensiones usando las nuevas funciones
          const poolDims = parsePoolDimensions(record.get('Dimension_Piscina') as string);
          const parcelDims = parseParcelDimensions(record.get('Dimension_Parcela') as string);

          // Formateamos el lead con los nuevos tipos de dimensiones
          return {
            id: record.id,
            name: record.get('Nombre_Completo') as string,
            email: record.get('Mail') as string,
            phone: record.get('Numero_Telefono') as string,
            address: address,
            poolDimensions: poolDims,
            parcelDimensions: parcelDims,
            accessRating: record.get('Acceso_Parcela') as string,
            material: record.get('Material') as string,
            estimatedBudget: Number(record.get('Presupuesto')) || 0,
            conversationSummary: record.get('Resumen_Conversacion') as string,
            createdAt: record.get('Created_At') as string,
            status: (record.get('Status') as string || 'new_lead') as Lead['status'],
            coordinates: coordinates || { 
              // Coordenadas por defecto (centro de Madrid)
              lng: -3.7038, 
              lat: 40.4168 
            },
            // Campos opcionales
            lastContact: record.get('Last_Contact') as string || undefined,
            materialLink: record.get('Material_Link') as string || undefined,
            parcelImage: record.get('Parcel_Image') as string || undefined,
            roi: record.get('ROI') ? Number(record.get('ROI')) : undefined
          };
        })
      );

      setLeads(formattedLeads);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener leads cercanos a una ubicación
  const getNearbyLeads = (lead: Lead, maxDistance: number = 2) => {
    return leads.filter(otherLead => {
      if (otherLead.id === lead.id) return false;
      
      // Cálculo de distancia usando la fórmula de Haversine
      const R = 6371; // Radio de la Tierra en km
      const dLat = (otherLead.coordinates.lat - lead.coordinates.lat) * Math.PI / 180;
      const dLon = (otherLead.coordinates.lng - lead.coordinates.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lead.coordinates.lat * Math.PI / 180) * Math.cos(otherLead.coordinates.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      return distance <= maxDistance;
    });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { 
    leads, 
    loading, 
    error, 
    refetch: fetchLeads,
    getNearbyLeads 
  };
};