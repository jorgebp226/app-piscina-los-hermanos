import React from 'react';
import { Phone, Mail, MapPin, Clock, TrendingUp, Calendar } from 'lucide-react';
import { Lead } from '../../types';
import dayjs from 'dayjs';
import { Badge } from '../../ui/badge';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-orange-100 text-orange-800';
    case 'negotiation':
      return 'bg-red-100 text-red-800';
    case 'new_lead':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'in_progress':
      return 'En Progreso';
    case 'negotiation':
      return 'En Negociación';
    case 'new_lead':
      return 'Nuevo Lead';
    default:
      return 'Estado Desconocido';
  }
};

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const sourceIcons = {
    tiktok: '🎵',
    whatsapp: '💬',
    instagram: '📸',
    phone: '📞'
  };

  return (
    <div 
      onClick={() => onClick(lead)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.phone}</p>
        </div>
        <Badge variant={getStatusVariant(lead.status)}>
          {getStatusLabel(lead.status)}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
          <span className="text-gray-600 flex-1">{lead.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-xs text-gray-500">Presupuesto est.</span>
            <p className="font-semibold text-gray-900">
              {new Intl.NumberFormat('es-ES', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(lead.estimatedBudget)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-xs text-gray-500">Dimensiones</span>
            <p className="font-semibold text-gray-900">{lead.poolDimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;