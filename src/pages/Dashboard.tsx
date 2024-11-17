import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import LeadCard from '../components/dashboard/LeadCard';
import LeadMap from '../components/dashboard/LeadMap';
import StatisticsChart from '../components/dashboard/StatisticsChart';
import LeadDetails from '../components/leads/LeadDetails';
import Card from '../components/common/Card';
import { Lead, DashboardMetrics } from '../types';

const Dashboard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      address: 'Calle de Alcalá 123, Madrid',
      parcelImage: '/mock-parcel.jpg',
      poolDimensions: { length: 10, width: 5, depth: 1.8 },
      parcelDimensions: { length: 20, width: 15 },
      accessRating: 4,
      material: 'gresite',
      materialLink: 'https://example.com/material',
      estimatedBudget: 25000,
      roi: 15,
      status: 'completed',
      source: 'whatsapp',
      coordinates: { lat: 40.4168, lng: -3.7038 },
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'María García',
      address: 'Pozuelo de Alarcón, Madrid',
      parcelImage: '/mock-parcel.jpg',
      poolDimensions: { length: 12, width: 6, depth: 2 },
      parcelDimensions: { length: 25, width: 18 },
      accessRating: 5,
      material: 'porcelain',
      materialLink: 'https://example.com/material',
      estimatedBudget: 35000,
      roi: 18,
      status: 'in_progress',
      source: 'instagram',
      coordinates: { lat: 40.4357, lng: -3.8136 },
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Carlos Ruiz',
      address: 'Las Rozas, Madrid',
      parcelImage: '/mock-parcel.jpg',
      poolDimensions: { length: 8, width: 4, depth: 1.6 },
      parcelDimensions: { length: 18, width: 12 },
      accessRating: 3,
      material: 'gresite',
      materialLink: 'https://example.com/material',
      estimatedBudget: 20000,
      roi: 12,
      status: 'negotiation',
      source: 'tiktok',
      coordinates: { lat: 40.4927, lng: -3.8742 },
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Ana Martínez',
      address: 'Majadahonda, Madrid',
      parcelImage: '/mock-parcel.jpg',
      poolDimensions: { length: 15, width: 7, depth: 2.2 },
      parcelDimensions: { length: 30, width: 20 },
      accessRating: 5,
      material: 'porcelain',
      materialLink: 'https://example.com/material',
      estimatedBudget: 45000,
      roi: 20,
      status: 'new_lead',
      source: 'phone',
      coordinates: { lat: 40.4729, lng: -3.8722 },
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      address: 'Boadilla del Monte, Madrid',
      parcelImage: '/mock-parcel.jpg',
      poolDimensions: { length: 11, width: 5.5, depth: 1.9 },
      parcelDimensions: { length: 22, width: 16 },
      accessRating: 4,
      material: 'gresite',
      materialLink: 'https://example.com/material',
      estimatedBudget: 30000,
      roi: 16,
      status: 'completed',
      source: 'whatsapp',
      coordinates: { lat: 40.4053, lng: -3.8769 },
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    },
  ];

  const mockMetrics: DashboardMetrics = {
    totalLeads: 145,
    convertedLeads: 89,
    averageBudget: 28500,
    monthlyTrend: [
      { month: 'Ene', leads: 45, conversions: 28 },
      { month: 'Feb', leads: 52, conversions: 32 },
      { month: 'Mar', leads: 48, conversions: 29 },
      { month: 'Abr', leads: 55, conversions: 35 },
      { month: 'May', leads: 62, conversions: 40 },
      { month: 'Jun', leads: 58, conversions: 38 },
    ],
    sourceDistribution: [
      { source: 'WhatsApp', count: 45 },
      { source: 'TikTok', count: 35 },
      { source: 'Instagram', count: 40 },
      { source: 'Llamadas', count: 25 },
    ],
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

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

      {/* KPIs Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="large" className="bg-white">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-2xl font-semibold">{mockMetrics.totalLeads}</p>
            <p className="text-sm text-green-600">+62.9% vs. mes anterior</p>
          </div>
        </Card>

        <Card padding="large" className="bg-white">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Tasa de Conversión</p>
            <p className="text-2xl font-semibold">61.4%</p>
            <p className="text-sm text-gray-600">Meta: 35%</p>
          </div>
        </Card>

        <Card padding="large" className="bg-white">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Presupuesto Medio</p>
            <p className="text-2xl font-semibold">
              {mockMetrics.averageBudget.toLocaleString()}€
            </p>
            <p className="text-sm text-blue-600">+5.2% vs. mes anterior</p>
          </div>
        </Card>

        <Card padding="large" className="bg-white">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Leads Mensuales</p>
            <p className="text-2xl font-semibold">58</p>
            <p className="text-sm text-green-600">+12% vs. mes anterior</p>
          </div>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar leads..."
              className="pl-10 input max-w-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`btn ${
                viewMode === 'list' ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => setViewMode('list')}
            >
              Lista
            </button>
            <button
              className={`btn ${
                viewMode === 'map' ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => setViewMode('map')}
            >
              Mapa
            </button>
          </div>
        </div>
        <button className="btn btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Vista de lista o mapa */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => handleLeadClick(lead)}
            />
          ))}
        </div>
      ) : (
        <LeadMap leads={mockLeads} onMarkerClick={handleLeadClick} />
      )}

      {/* Modal de detalles del lead */}
      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          nearbyProjects={mockLeads.filter(
            (l) => l.id !== selectedLead.id
          )}
        />
      )}
    </div>
  );
};

export default Dashboard;
