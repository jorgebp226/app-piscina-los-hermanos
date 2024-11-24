import { PoolDimensions, ParcelDimensions } from '../types';

export const parsePoolDimensions = (dimensions: string): PoolDimensions => {
  try {
    // Formato esperado: "3x7"
    const [length = '0', width = '0'] = dimensions.split('x').map(d => d.trim());
    return { length, width };
  } catch (error) {
    console.error('Error parsing pool dimensions:', error);
    return { length: '0', width: '0' };
  }
};

export const parseParcelDimensions = (dimensions: string): ParcelDimensions => {
  try {
    // Formato esperado: "400"
    return { area: dimensions.trim() };
  } catch (error) {
    console.error('Error parsing parcel dimensions:', error);
    return { area: '0' };
  }
};