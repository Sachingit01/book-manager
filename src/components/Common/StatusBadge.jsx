import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const isAvailable = status === 'Available';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAvailable
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-orange-100 text-orange-800'
      }`}
    >
      {isAvailable ? (
        <CheckCircle className="w-3 h-3 mr-1" />
      ) : (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {status}
    </span>
  );
};
