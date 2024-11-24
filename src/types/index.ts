export type LeadStatus = 'completed' | 'in_progress' | 'negotiation' | 'new_lead';

export interface PoolDimensions {
  length: string;
  width: string;
}

export interface ParcelDimensions {
  area: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  poolDimensions: PoolDimensions;
  parcelDimensions: ParcelDimensions;
  accessRating: string;
  material: string;
  estimatedBudget: number;
  conversationSummary: string;
  createdAt: string;
  status: LeadStatus;
  coordinates: {
    lng: number;
    lat: number;
  };
}