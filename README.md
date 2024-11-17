# Pool Lead Handler (PLH) - Sistema de Gestión de Leads para Construcción de Piscinas

## 📋 Descripción General del Proyecto

Pool Lead Handler es una aplicación web desarrollada en React que centraliza y gestiona leads provenientes de diferentes canales (TikTok, WhatsApp, Instagram, llamadas) para una empresa de construcción de piscinas. El sistema está diseñado para proporcionar una vista unificada de todos los leads y proyectos.

### 🏗 Arquitectura y Componentes

#### Estructura de Carpetas
```
src/
  ├── components/
  │   ├── common/             # Componentes reutilizables (Button, Card, Input)
  │   ├── dashboard/          # Componentes específicos del dashboard
  │   ├── layout/            # Componentes de estructura (Sidebar, Header)
  │   └── leads/             # Componentes relacionados con leads
  ├── pages/                 # Páginas principales de la aplicación
  ├── types/                 # Definiciones de TypeScript
  └── utils/                 # Utilidades y helpers
```

#### Componentes Principales

1. **Dashboard (pages/Dashboard.tsx)**
   - Componente principal que muestra el resumen de leads
   - Integra el mapa y las tarjetas de leads
   - Gestiona la vista de lista/mapa
   - Conecta con Airtable para obtener datos

2. **LeadMap (components/dashboard/LeadMap.tsx)**
   - Visualización geográfica de leads usando Mapbox
   - Muestra marcadores según el estado del lead
   - Permite interacción con popups y detalles

3. **LeadCard (components/dashboard/LeadCard.tsx)**
   - Tarjetas individuales para cada lead
   - Muestra información resumida
   - Permite acceso a detalles completos

4. **LeadDetails (components/leads/LeadDetails.tsx)**
   - Modal con información detallada del lead
   - Muestra proyectos cercanos
   - Proporciona acciones de contacto

5. **Analytics (pages/Analytics.tsx)**
   - Métricas y KPIs
   - Gráficos de rendimiento
   - Distribución de leads por fuente

## 🚀 Instalación y Configuración

### Clonar e Iniciar el Proyecto

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd pool-lead-handler
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar `.env` con las credenciales necesarias:
```env
VITE_MAPBOX_TOKEN=tu_token_de_mapbox
VITE_AIRTABLE_API_KEY=tu_api_key_de_airtable
VITE_AIRTABLE_BASE_ID=tu_base_id_de_airtable
```

4. Iniciar el proyecto:
```bash
npm run dev
```

## 🔌 Integración con Airtable

### Configuración de la Conexión

1. Instalar la dependencia de Airtable:
```bash
npm install airtable
```

2. Crear un archivo para la configuración de Airtable (`src/utils/airtable.ts`):
```typescript
import Airtable from 'airtable';

const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_API_KEY})
             .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const leadsTable = base('Leads');
export const projectsTable = base('Projects');
```

### Implementación de Fetching de Datos

1. Crear un hook personalizado para los leads (`src/hooks/useLeads.ts`):
```typescript
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
        name: record.get('name') as string,
        address: record.get('address') as string,
        poolDimensions: {
          length: record.get('poolLength') as number,
          width: record.get('poolWidth') as number,
          depth: record.get('poolDepth') as number,
        },
        parcelDimensions: {
          length: record.get('parcelLength') as number,
          width: record.get('parcelWidth') as number,
        },
        accessRating: record.get('accessRating') as number,
        material: record.get('material') as string,
        materialLink: record.get('materialLink') as string,
        estimatedBudget: record.get('estimatedBudget') as number,
        roi: record.get('roi') as number,
        status: record.get('status') as string,
        source: record.get('source') as string,
        coordinates: record.get('coordinates') as { lat: number; lng: number },
        createdAt: record.get('createdAt') as string,
        lastContact: record.get('lastContact') as string,
      }));

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
```

### Geocodificación de Direcciones

1. Crear un servicio de geocodificación (`src/services/geocoding.ts`):
```typescript
import { leadsTable } from '../utils/airtable';

const MAPBOX_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const geocodeAddress = async (address: string) => {
  try {
    const response = await fetch(
      `${MAPBOX_API}/${encodeURIComponent(address)}.json?access_token=${
        import.meta.env.VITE_MAPBOX_TOKEN
      }&country=es&types=address`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
    
    throw new Error('No se encontraron coordenadas para esta dirección');
  } catch (error) {
    console.error('Error en geocodificación:', error);
    throw error;
  }
};

// Función para actualizar coordenadas en Airtable
export const updateLeadCoordinates = async (recordId: string, coordinates: { lat: number; lng: number }) => {
  try {
    await leadsTable.update(recordId, {
      coordinates: coordinates
    });
    return true;
  } catch (error) {
    console.error('Error actualizando coordenadas:', error);
    return false;
  }
};

// Función para procesar todos los leads sin coordenadas
export const processLeadsWithoutCoordinates = async () => {
  try {
    const records = await leadsTable
      .select({
        filterByFormula: '{coordinates} = ""'
      })
      .all();

    for (const record of records) {
      const address = record.get('address') as string;
      if (address) {
        const coordinates = await geocodeAddress(address);
        await updateLeadCoordinates(record.id, coordinates);
        // Esperar 1 segundo entre solicitudes para respetar límites de API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return true;
  } catch (error) {
    console.error('Error procesando leads:', error);
    return false;
  }
};
```

2. Implementar un script de procesamiento por lotes:
```typescript
// scripts/geocodeLeads.ts
import { processLeadsWithoutCoordinates } from '../services/geocoding';

const run = async () => {
  console.log('Iniciando procesamiento de geocodificación...');
  const success = await processLeadsWithoutCoordinates();
  if (success) {
    console.log('Procesamiento completado con éxito');
  } else {
    console.log('Error durante el procesamiento');
  }
};

run();
```

## 🔑 Notas Importantes

1. Asegúrate de tener permisos adecuados en Airtable
2. Configura correctamente las variables de entorno
3. Revisa los límites de API de Mapbox para geocodificación
4. Implementa manejo de errores robusto
5. Considera implementar caché para coordenadas frecuentes

## 📚 Recursos Adicionales

- [Documentación de Airtable API](https://airtable.com/developers/web/api/introduction)
- [Documentación de Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)
- [Gestión de Estados en React](https://react.dev/learn/managing-state)