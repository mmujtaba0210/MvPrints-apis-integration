"use client";

import React, { useState } from 'react';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: { name: string; permissions: string[] }) => void;
}

const permissionCategories = [
  {
    title: "Orders",
    permissions: ["View Orders", "Manage Orders", "Process Orders"]
  },
  {
    title: "Products",
    permissions: ["View Products", "Add Products", "Edit Products", "Delete Products"]
  },
  // Add all other permission categories here...
];

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, permissions: selectedPermissions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Create New Role</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-sky-200 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-hidden flex flex-col">
          <div className="p-6 overflow-y-auto flex-grow">
            <div className="mb-6">
              <label htmlFor="role-name" className="block text-sm font-medium text-gray-700 mb-2">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter role name"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permissionCategories.map((category) => (
                  <div key={category.title} className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <h4 className="font-medium text-sky-800 mb-3">{category.title}</h4>
                    <div className="space-y-2">
                      {category.permissions.map((permission) => (
                        <div key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`perm-${permission}`}
                            checked={selectedPermissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`perm-${permission}`} className="ml-2 text-sm text-gray-700">
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;