import React, { useEffect } from 'react';
import { Lead } from '../../types';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ExternalLink,
  Ruler,
  Home,
  CheckCircle,
  Share2
} from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  nearbyProjects?: Lead[];
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, onClose, nearbyProjects }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const statusConfig = {
    completed: {
      bg: 'bg-success-100',
      text: 'text-success-600',
      label: 'Completado'
    },
    in_progress: {
      bg: 'bg-warning-100',
      text: 'text-warning-600',
      label: 'En Provisión'
    },
    negotiation: {
      bg: 'bg-danger-100',
      text: 'text-danger-600',
      label: 'En Negociación'
    },
    new_lead: {
      bg: 'bg-primary-100',
      text: 'text-primary-600',
      label: 'Nuevo Lead'
    }
  };

  const currentStatus = statusConfig[lead.status];

  return (
    <div className="fixed inset-0 bg-secondary-900/75 z-50 flex items-start justify-center overflow-y-auto pt-4 pb-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full my-auto shadow-xl animate-slide-in mx-4">
        {/* Header fijo */}
        <div className="sticky top-0 z-10 bg-white border-b border-secondary-200 rounded-t-2xl">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">{lead.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-secondary-500">
                  <MapPin className="w-4 h-4" />
                  <span>{lead.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                  {currentStatus.label}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary-100 text-secondary-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Grid de información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary-500">
                  <Ruler className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Medidas de Piscina</h3>
                </div>
                <p className="text-secondary-900">
                  {lead.poolDimensions.length}x{lead.poolDimensions.width}m 
                  <span className="text-secondary-500"> (Prof. {lead.poolDimensions.depth}m)</span>
                </p>
              </div>

              <div className="card p-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary-500">
                  <Home className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Medidas de Parcela</h3>
                </div>
                <p className="text-secondary-900">
                  {lead.parcelDimensions.length}x{lead.parcelDimensions.width}m
                </p>
              </div>

              <div className="card p-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary-500">
                  <CheckCircle className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Material</h3>
                </div>
                <p className="text-secondary-900 capitalize">{lead.material}</p>
              </div>

              <div className="card p-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary-500">
                  <Share2 className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Valoración de Acceso</h3>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-6 rounded-sm transition-colors ${
                        i < lead.accessRating ? 'bg-primary-500' : 'bg-secondary-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Imagen de la parcela */}
            <div className="card p-4">
              <h3 className="text-sm font-medium text-secondary-500 mb-3">Imagen de la Parcela</h3>
              <div className="relative rounded-lg overflow-hidden h-48">
                <img
                  src={lead.parcelImage}
                  alt="Parcela"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Presupuesto y ROI */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4">
                <h3 className="text-sm font-medium text-secondary-500">Presupuesto Estimado</h3>
                <p className="text-2xl font-semibold text-secondary-900 mt-2">
                  {lead.estimatedBudget.toLocaleString()}€
                </p>
              </div>
              
              <div className="card p-4">
                <h3 className="text-sm font-medium text-secondary-500">ROI Esperado</h3>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-5 h-5 text-success-500" />
                  <p className="text-2xl font-semibold text-secondary-900">{lead.roi}%</p>
                </div>
              </div>
            </div>

            {/* Información de contacto y seguimiento */}
            <div className="card p-4 space-y-4">
              <h3 className="text-sm font-medium text-secondary-500">Información de Seguimiento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-500">Creado el</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-500">Último contacto</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {new Date(lead.lastContact).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proyectos cercanos */}
            {nearbyProjects && nearbyProjects.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-secondary-500">Proyectos Cercanos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {nearbyProjects.map((project) => (
                    <div key={project.id} className="card p-3">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={project.parcelImage} 
                            alt="Proyecto cercano" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-secondary-900 truncate">{project.name}</p>
                          <p className="text-sm text-secondary-500 truncate">{project.address}</p>
                          <p className="text-sm font-medium text-secondary-900 mt-1">
                            {project.estimatedBudget.toLocaleString()}€
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer con acciones */}
          <div className="sticky bottom-0 bg-white border-t border-secondary-200 p-4 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button className="btn btn-primary">
                  <Phone className="w-4 h-4" />
                  Llamar
                </button>
                <button className="btn btn-primary">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
              <a 
                href={lead.materialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <ExternalLink className="w-4 h-4" />
                Ver material
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;