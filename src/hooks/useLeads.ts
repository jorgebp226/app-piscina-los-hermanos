import { useState, useEffect } from 'react';
import { leadsTable } from '../utils/airtable';
import { Lead } from '../types';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLeads = async () => {
    try {
      const records = await leadsTable
        .select({
          view: "Grid view",
          sort: [{ field: "createdAt", direction: "desc" }]
        })
        .all();

      const formattedLeads = records.map(record => ({
        id: record.id,
        name: record.get('Nombre_Completo') as string,
        address: record.get('Ubicacion') as string,
      /*poolDimensions: {
          length: record.get('poolLength') as number,
          width: record.get('poolWidth') as number,
          depth: record.get('poolDepth') as number,
        }*/
        poolDimensions: record.get('Dimension_Parcela') as string,
        /*parcelDimensions: {
          length: record.get('parcelLength') as number,
          width: record.get('parcelWidth') as number,
        }*/
        parcelDimensions: record.get('Dimension_Piscina') as string,
        accessRating: record.get('Acceso_Parcela') as number,
        material: record.get('Material') as string,
        //materialLink: record.get('materialLink') as string,
        estimatedBudget: record.get('Presupuesto') as number,
        //roi: record.get('roi') as number,
        status: record.get('status') as string,
        source: record.get('source') as string,
        //coordinates: record.get('coordinates') as { lat: number; lng: number },
        createdAt: record.get('created_At') as string,
        //lastContact: record.get('lastContact') as string,
      }));

      setLeads(formattedLeads);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
