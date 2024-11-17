import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DashboardMetrics } from '../../types';

interface StatisticsChartProps {
  metrics: DashboardMetrics;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ metrics }) => {
  const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <p className="text-2xl font-semibold mt-2">{metrics.totalLeads}</p>
          <div className="mt-2 text-sm text-green-600">
            +{((metrics.totalLeads / metrics.convertedLeads - 1) * 100).toFixed(1)}% vs. mes anterior
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Tasa de Conversión</h3>
          <p className="text-2xl font-semibold mt-2">
            {((metrics.convertedLeads / metrics.totalLeads) * 100).toFixed(1)}%
          </p>
          <div className="mt-2 text-sm text-green-600">
            Meta: 35%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Presupuesto Medio</h3>
          <p className="text-2xl font-semibold mt-2">
            {metrics.averageBudget.toLocaleString()}€
          </p>
          <div className="mt-2 text-sm text-blue-600">
            +5.2% vs. mes anterior
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Leads Mensuales</h3>
          <p className="text-2xl font-semibold mt-2">
            {metrics.monthlyTrend[metrics.monthlyTrend.length - 1].leads}
          </p>
          <div className="mt-2 text-sm text-green-600">
            +12% vs. mes anterior
          </div>
        </div>
      </div>

      {/* Gráfico de tendencia */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Tendencia de Leads y Conversiones</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.monthlyTrend}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#3b82f6"
                fill="url(#colorLeads)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#22c55e"
                fill="url(#colorConversions)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución por fuente */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Distribución por Fuente</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={metrics.sourceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="count"
              >
                {metrics.sourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {metrics.sourceDistribution.map((source, index) => (
            <div key={source.source} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-600 capitalize">{source.source}</span>
              <span className="text-sm font-medium ml-auto">
                {((source.count / metrics.totalLeads) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs adicionales */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-4">KPIs de Rendimiento</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Tasa de Respuesta</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Tiempo Medio de Respuesta</span>
              <span className="text-sm font-medium">2.5h</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Satisfacción del Cliente</span>
              <span className="text-sm font-medium">4.8/5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-orange-500 rounded-full" style={{ width: '96%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;