import React, { useState } from 'react';
import { Search, Plus, List, Map as MapIcon } from 'lucide-react';
import LeadCard from '../components/dashboard/LeadCard';
import LeadMap from '../components/dashboard/LeadMap';
import LeadDetails from '../components/leads/LeadDetails';
import Card from '../components/common/Card';
import { useLeads } from '../hooks/useLeads';

const Dashboard = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Usar el hook useLeads para obtener los datos
  const { leads, loading, error } = useLeads();

  // Calcular métricas del dashboard basadas en datos reales
  const metrics = {
    totalLeads: leads.length,
    convertedLeads: leads.filter(lead => lead.status === 'completed').length,
    averageBudget: leads.reduce((acc, lead) => acc + lead.estimatedBudget, 0) / leads.length || 0,
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  // Filtrar leads basado en búsqueda y estado
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          Error al cargar los leads: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Lead
        </button>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
            <p className="text-2xl font-semibold mt-2">{metrics.totalLeads}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Leads Convertidos</h3>
            <p className="text-2xl font-semibold mt-2">{metrics.convertedLeads}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Presupuesto Promedio</h3>
            <p className="text-2xl font-semibold mt-2">
              {new Intl.NumberFormat('es-ES', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(metrics.averageBudget)}
            </p>
          </div>
        </Card>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar leads..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="new">Nuevo</option>
            <option value="in_progress">En Progreso</option>
            <option value="completed">Completado</option>
          </select>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
              Lista
            </button>
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                viewMode === 'map' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setViewMode('map')}
            >
              <MapIcon className="w-4 h-4" />
              Mapa
            </button>
          </div>
        </div>
      </div>

      {/* Vista de lista o mapa */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => handleLeadClick(lead)}
            />
          ))}
        </div>
      ) : (
        <div className="h-96 rounded-lg overflow-hidden">
          <LeadMap leads={filteredLeads} onMarkerClick={handleLeadClick} />
        </div>
      )}

      {/* Modal de detalles del lead */}
      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          nearbyProjects={leads.filter(l => l.id !== selectedLead.id)}
        />
      )}
    </div>
  );
};

export default Dashboard;