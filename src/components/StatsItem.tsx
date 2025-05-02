
import React from 'react';

interface StatsItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatsItem: React.FC<StatsItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="text-brand-purple mr-3">
        {icon}
      </div>
      <div className="flex flex-1 justify-between">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
};

export default StatsItem;
