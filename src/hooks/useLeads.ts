import { useState, useEffect } from 'react';
import { leadsTable } from '../utils/airtable';
import { Lead } from '../types';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFsa3kiLCJhIjoiY20zbGl2a3Y3MG9lbTJzcGVncDhvNmsyeCJ9.jFzKCjyTBC-3SS5jltZ3JQ';

interface GeocodingResponse {
  features: Array<{
    center: [number, number];
  }>;
}

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

      // Procesar todos los leads en paralelo con Promise.all
      const formattedLeads = await Promise.all(
        records.map(async (record) => {
          const address = record.get('Ubicacion') as string;
          const coordinates = await geocodeAddress(address);

          return {
            id: record.id,
            name: record.get('Nombre_Completo') as string,
            email: record.get('Mail') as string,
            phone: record.get('Numero_Telefono') as string,
            address: address,
            poolDimensions: record.get('Dimension_Piscina') as string,
            parcelDimensions: record.get('Dimension_Parcela') as string,
            accessRating: record.get('Acceso_Parcela') as string,
            material: record.get('Material') as string,
            estimatedBudget: Number(record.get('Presupuesto')) || 0,
            conversationSummary: record.get('Resumen_Conversacion') as string,
            createdAt: record.get('Created_At') as string,
            status: record.get('Status') as string || 'new_lead',
            coordinates: coordinates || { 
              // Coordenadas por defecto (centro de Madrid)
              lng: -3.7038, 
              lat: 40.4168 
            }
          };
        })
      );

      setLeads(formattedLeads);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, loading, error, refetch: fetchLeads };
};