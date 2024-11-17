import React from 'react';
import { Phone, Mail, MapPin, Clock, TrendingUp, Calendar } from 'lucide-react';
import { Lead } from '../../types';
import dayjs from 'dayjs';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-orange-100 text-orange-800',
    negotiation: 'bg-red-100 text-red-800',
    new_lead: 'bg-blue-100 text-blue-800'
  };

  const sourceIcons = {
    tiktok: '🎵',
    whatsapp: '💬',
    instagram: '📸',
    phone: '📞'
  };

  return (
    <div 
      onClick={() => onClick(lead)}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              {sourceIcons[lead.source]}
              <span className="capitalize">{lead.source}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {dayjs(lead.createdAt).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
          {lead.status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
          <span className="text-gray-600 flex-1">{lead.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-xs text-gray-500">Presupuesto est.</span>
            <p className="font-semibold text-gray-900">{lead.estimatedBudget.toLocaleString()}€</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-xs text-gray-500">ROI esperado</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="font-semibold text-gray-900">{lead.roi}%</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={lead.parcelImage} 
              alt="Parcela" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600">
              <p>Piscina: {lead.poolDimensions.length}x{lead.poolDimensions.width}m</p>
              <p>Parcela: {lead.parcelDimensions.length}x{lead.parcelDimensions.width}m</p>
              <p>Material: {lead.material}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-50">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-50">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver detalles →
        </button>
      </div>
    </div>
  );
};

export default LeadCard;