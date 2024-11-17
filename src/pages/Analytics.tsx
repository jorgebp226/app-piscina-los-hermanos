import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { TrendingUp, Users, DollarSign, PhoneCall, Calendar } from 'lucide-react';
import Card from '../components/common/Card';

const Analytics: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const monthlyData = [
    { name: 'Ene', leads: 65, conversiones: 45 },
    { name: 'Feb', leads: 75, conversiones: 52 },
    { name: 'Mar', leads: 85, conversiones: 58 },
    { name: 'Abr', leads: 95, conversiones: 65 },
    { name: 'May', leads: 105, conversiones: 72 },
    { name: 'Jun', leads: 115, conversiones: 78 },
  ];

  const sourceData = [
    { name: 'WhatsApp', value: 35 },
    { name: 'TikTok', value: 25 },
    { name: 'Instagram', value: 20 },
    { name: 'Llamadas', value: 20 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#ef4444'];

  const conversionData = [
    { name: 'Semana 1', ratio: 65 },
    { name: 'Semana 2', ratio: 70 },
    { name: 'Semana 3', ratio: 68 },
    { name: 'Semana 4', ratio: 72 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <div className="flex gap-2">
          <select className="input max-w-xs">
            <option>Últimos 30 días</option>
            <option>Últimos 90 días</option>
            <option>Este año</option>
          </select>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="large" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Tasa de Conversión</p>
              <p className="text-2xl font-semibold text-green-700 mt-1">68.5%</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% vs mes anterior</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </Card>

        <Card padding="large" className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Leads</p>
              <p className="text-2xl font-semibold text-blue-700 mt-1">2,543</p>
              <p className="text-sm text-blue-600 mt-1">↑ 8% vs mes anterior</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </Card>

        <Card padding="large" className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Valor Promedio</p>
              <p className="text-2xl font-semibold text-orange-700 mt-1">32.500€</p>
              <p className="text-sm text-orange-600 mt-1">↑ 15% vs mes anterior</p>
            </div>
            <div className="bg-orange-200 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-700" />
            </div>
          </div>
        </Card>

        <Card padding="large" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Tiempo de Respuesta</p>
              <p className="text-2xl font-semibold text-purple-700 mt-1">2.5h</p>
              <p className="text-sm text-purple-600 mt-1">↓ 30min vs mes anterior</p>
            </div>
            <div className="bg-purple-200 p-3 rounded-lg">
              <PhoneCall className="w-6 h-6 text-purple-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendencia de Leads y Conversiones */}
        <Card className="col-span-2">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Tendencia de Leads y Conversiones</h3>
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversiones"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Distribución por Fuente */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Distribución por Fuente</h3>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {sourceData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                    <span className="text-sm font-medium ml-auto">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Ratio de Conversión Semanal */}
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Ratio de Conversión Semanal</h3>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="ratio" fill="#3b82f6">
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#3b82f6${index % 2 === 0 ? 'cc' : ''}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* KPIs Secundarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card padding="normal">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Top Zonas</h3>
            <div className="space-y-2">
              {['Pozuelo', 'Las Rozas', 'Majadahonda', 'Boadilla', 'La Moraleja'].map((zone, i) => (
                <div key={zone} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{zone}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${85 - i * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {85 - i * 10}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="normal">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Tipos de Piscina</h3>
            <div className="space-y-2">
              {[
                { name: 'Rectangular', value: 45 },
                { name: 'Forma Libre', value: 25 },
                { name: 'L-Shape', value: 15 },
                { name: 'Ovalada', value: 10 },
                { name: 'Otras', value: 5 },
              ].map((type) => (
                <div key={type.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{type.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${type.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {type.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="normal">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Materiales Preferidos</h3>
            <div className="space-y-2">
              {[
                { name: 'Gresite Classic', value: 40 },
                { name: 'Porcelánico', value: 30 },
                { name: 'Gresite Premium', value: 20 },
                { name: 'Natural Stone', value: 7 },
                { name: 'Otros', value: 3 },
              ].map((material) => (
                <div key={material.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{material.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${material.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {material.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;