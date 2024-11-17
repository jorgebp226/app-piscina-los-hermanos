import React from 'react';
import { LayoutDashboard, BarChart2, Brain } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: BarChart2,
      label: 'Métricas',
      path: '/metrics',
    },
    {
      icon: Brain,
      label: 'Talkier AI',
      path: '/talkier',
    },
    {
      icon: () => (
        <div className="w-5 h-5 relative">
          <img
            src="/kS__3_-removebg-preview.png"
            alt="KeySync Tech Logo"
            className="w-full h-full object-contain"
          />
        </div>
      ),
      label: 'KeySync Tech',
      path: '/keysync',
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-8 shadow-sm z-40">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold text-lg">PLH</span>
      </div>
      
      {navigationItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <div key={index} className="relative group">
            <button
              onClick={() => navigate(item.path)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
            </button>
            
            {/* Tooltip mejorado */}
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
                          absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50">
              <div className="relative flex items-center">
                {/* Flecha del tooltip */}
                <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1"></div>
                
                {/* Contenido del tooltip */}
                <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap ml-1">
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-auto mb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors duration-200 relative group">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>

          {/* Tooltip para el botón de configuración */}
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
                        absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50">
            <div className="relative flex items-center">
              <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1"></div>
              <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap ml-1">
                Configuración
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;