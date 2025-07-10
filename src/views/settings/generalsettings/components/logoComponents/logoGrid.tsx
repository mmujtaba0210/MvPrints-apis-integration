'use client'

import { Logo } from './../../types/logoType';
import { LogoCard } from './logoCard';

interface LogoGridProps {
  logos: Logo[];
  onEdit: (logo: Logo) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const LogoGrid = ({ logos, onEdit, onDelete, onToggleStatus }: LogoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {logos.map((logo) => (
        <LogoCard
          key={logo.id}
          logo={logo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};