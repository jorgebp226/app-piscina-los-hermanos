export type LeadStatus = 'completed' | 'in_progress' | 'negotiation' | 'new_lead';

export interface Lead {
  id: string;
  name: string;
  address: string;
  parcelImage: string;
  poolDimensions: {
    length: number;
    width: number;
    depth: number;
  };
  parcelDimensions: {
    length: number;
    width: number;
  };
  accessRating: number; // 1-5
  material: 'gresite' | 'porcelain';
  materialLink: string;
  estimatedBudget: number;
  roi: number;
  status: LeadStatus;
  source: 'tiktok' | 'whatsapp' | 'instagram' | 'phone';
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  lastContact: string;
  nearbyProjects?: string[];
}

export interface DashboardMetrics {
  totalLeads: number;
  convertedLeads: number;
  averageBudget: number;
  monthlyTrend: {
    month: string;
    leads: number;
    conversions: number;
  }[];
  sourceDistribution: {
    source: string;
    count: number;
  }[];
}