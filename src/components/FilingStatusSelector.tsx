import React from 'react';
import { Users2, User } from 'lucide-react';

interface FilingStatusSelectorProps {
  isMarried: boolean;
  onChange: (isMarried: boolean) => void;
}

export function FilingStatusSelector({ isMarried, onChange }: FilingStatusSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filing Status
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange(false)}
          className={`flex items-center justify-center gap-2 p-2 rounded-md border ${
            !isMarried
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User className="w-4 h-4" />
          Single
        </button>
        <button
          onClick={() => onChange(true)}
          className={`flex items-center justify-center gap-2 p-2 rounded-md border ${
            isMarried
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Users2 className="w-4 h-4" />
          Married
        </button>
      </div>
    </div>
  );
}