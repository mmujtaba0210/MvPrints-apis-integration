'use client'

import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Logo } from './../../types/logoType';

interface LogoCardProps {
  logo: Logo;
  onEdit: (logo: Logo) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const LogoCard = ({ logo, onEdit, onDelete, onToggleStatus }: LogoCardProps) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Logo Image */}
      <div className="p-4 flex justify-center items-center h-40 bg-gray-50">
        <img 
          src={logo.url} 
          alt="Logo" 
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onToggleStatus(logo.id)}
          className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-100"
          title={logo.isActive ? 'Deactivate' : 'Activate'}
        >
          {logo.isActive ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-400" />}
        </button>
        
        <button
          onClick={() => onEdit(logo)}
          className="p-2 bg-white rounded-full shadow text-blue-600 hover:bg-blue-50"
          title="Edit"
        >
          <FaEdit />
        </button>
        
        <button
          onClick={() => onDelete(logo.id)}
          className="p-2 bg-white rounded-full shadow text-red-600 hover:bg-red-50"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>

      {/* Status Badge */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
        logo.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {logo.isActive ? 'Active' : 'Inactive'}
      </div>
    </div>
  );
};