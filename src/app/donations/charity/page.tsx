"use client";

import { useState } from "react";
import CharityForm from "../components/charityForm";
import { Charity } from "../types/charityTypes";
import CharitiesTable from "../components/charityTable";

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [editingCharity, setEditingCharity] = useState<Charity | null>(null);

  const handleEdit = (charity: Charity) => {
    setEditingCharity(charity);
  };

  const handleDelete = (id: string) => {
    setCharities((prev) => prev.filter((charity) => charity.id !== id));
    if (editingCharity?.id === id) {
      setEditingCharity(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCharity(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Charity Management
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <CharityForm
                initialData={editingCharity || undefined}
                onCancel={editingCharity ? handleCancelEdit : undefined}
                isEditing={!!editingCharity}
              />
            </div>

            <div>
              <CharitiesTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
