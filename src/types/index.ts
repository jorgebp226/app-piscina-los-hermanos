export type LeadStatus = 'completed' | 'in_progress' | 'negotiation' | 'new_lead';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  poolDimensions: string;
  parcelDimensions: string;
  accessRating: string;
  material: string;
  estimatedBudget: number;
  conversationSummary: string;
  createdAt: string;
  status: string;
  coordinates: {
    lng: number;
    lat: number;
  };
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