'use client'

import { useState } from 'react';
import { LogoGrid } from '@/views/settings/generalsettings/components/logoComponents/logoGrid';
import { LogoFormModal } from './logoFormModal';
import { Logo } from './../../types/logoType';

export default function LogoManagementPage() {
  // Dummy data - replace with API calls later
  const [logos, setLogos] = useState<Logo[]>([
    {
      id: '1',
      url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
      createdAt: '2023-05-15',
      isActive: true,
    },
    {
      id: '2',
      url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
      createdAt: '2023-06-20',
      isActive: true,
    },
    {
      id: '3',
      url: 'https://via.placeholder.com/150/00FF00/000000?text=Logo+3',
      createdAt: '2023-07-10',
      isActive: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);

  const handleAddLogo = (file: File) => {
    // In a real app, upload to your backend here
    const newLogo: Logo = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    setLogos([...logos, newLogo]);
  };

  const handleUpdateLogo = (file: File) => {
    if (!currentLogo) return;
    
    // In a real app, update in your backend here
    const updatedLogos = logos.map(logo => 
      logo.id === currentLogo.id 
        ? { ...logo, url: URL.createObjectURL(file) }
        : logo
    );
    setLogos(updatedLogos);
  };

  const handleDeleteLogo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this logo?')) {
      setLogos(logos.filter(logo => logo.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setLogos(logos.map(logo => 
      logo.id === id ? { ...logo, isActive: !logo.isActive } : logo
    ));
  };

  const handleEditLogo = (logo: Logo) => {
    setCurrentLogo(logo);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Logo Management</h1>
        <button
          onClick={() => {
            setCurrentLogo(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          Upload New Logo
        </button>
      </div>

      <LogoGrid
        logos={logos}
        onEdit={handleEditLogo}
        onDelete={handleDeleteLogo}
        onToggleStatus={handleToggleStatus}
      />

      <LogoFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={currentLogo ? handleUpdateLogo : handleAddLogo}
        currentLogo={currentLogo}
      />
    </div>
  );
}