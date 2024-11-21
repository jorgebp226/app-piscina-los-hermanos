// src/components/talky/ToneCard.tsx

import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ToneOption } from '../../types/talky';

interface ToneCardProps {
  option: ToneOption;
  selected: boolean;
  onClick: () => void;
}

const ToneCard: React.FC<ToneCardProps> = ({ option, selected, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all hover:shadow-lg ${
        selected 
        ? 'border-2 border-blue-600 bg-blue-50' 
        : 'hover:border-blue-300'
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4 flex items-start space-x-3">
      <div className="w-8 h-8 flex items-center justify-center" style={{ color: '#3b82f6' }}>
        {React.createElement(option.icon, { size: 24 })}
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{option.label}</h3>
        <p className="text-sm text-gray-600">{option.description}</p>
      </div>
    </CardContent>
  </Card>
);

export default ToneCard;
