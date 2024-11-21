import Airtable from 'airtable';

const airtable = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || 'patrrPVxVfCgixiwx.49a05aaa6901a41beedf74176f6ebbaa41f980622a190bc432a2d05d0ff375c2'
});

const base = airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID || 'appwvlp8KVk47mfk9');
const TABLE_NAME = 'PiscinasLosHermanos';

export const leadsTable = base(TABLE_NAME);
export const fetchLeadsFromAirtable = async () => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta de Airtable:', errorText);
      throw new Error(`Error en la llamada a Airtable: ${response.status}`);
    }

    const data = await response.json();
    return data.records.map(record => ({
      id: record.id,
      name: record.fields.Nombre_Completo || '',
      email: record.fields.Mail || '',
      phone: record.fields.Numero_Telefono || '',
      address: record.fields.Ubicacion || '',
      poolDimensions: record.fields.Dimension_Piscina || '',
      parcelDimensions: record.fields.Dimension_Parcela || '',
      accessRating: record.fields.Acceso_Parcela || '',
      material: record.fields.Material || '',
      estimatedBudget: Number(record.fields.Presupuesto) || 0,
      conversationSummary: record.fields.Resumen_Conversacion || '',
      createdAt: record.fields.Created_At || new Date().toISOString(),
      status: 'new_lead'
    }));
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    throw error;
  }
};