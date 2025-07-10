// app/maintenance-texts/page.tsx
"use client";

import React, { useState } from 'react';
import { FiEdit2, FiSave, FiTrash2, FiPlus } from 'react-icons/fi';

interface MaintenanceText {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
}

const MaintenanceTextsPage = () => {
  const [texts, setTexts] = useState<MaintenanceText[]>([
    {
      id: 1,
      title: 'Website Maintenance Notice',
      content: 'Our website will be undergoing scheduled maintenance on June 30th from 2:00 AM to 6:00 AM EST. During this time, the site may be temporarily unavailable.',
      isActive: true
    },
    {
      id: 2,
      title: 'Payment System Update',
      content: 'We are upgrading our payment processing system to provide better service. Some payment methods may be temporarily unavailable during this update.',
      isActive: false
    },
    {
      id: 3,
      title: 'New Feature Announcement',
      content: 'Exciting new features are coming to our platform next week! Stay tuned for updates on our enhanced dashboard and reporting tools.',
      isActive: true
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState<Omit<MaintenanceText, 'id'>>({ 
    title: '', 
    content: '', 
    isActive: true 
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    // In a real app, you would save to your backend here
  };

  const handleDelete = (id: number) => {
    setTexts(texts.filter(text => text.id !== id));
  };

  const handleToggle = (id: number) => {
    setTexts(texts.map(text => 
      text.id === id ? { ...text, isActive: !text.isActive } : text
    ));
  };

  const handleAddNew = () => {
    setTexts([...texts, { ...newText, id: Math.max(...texts.map(t => t.id), 0) + 1 }]);
    setIsAddingNew(false);
    setNewText({ title: '', content: '', isActive: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Texts</h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Text
        </button>
      </div>

      {isAddingNew && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Maintenance Text</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newText.title}
                onChange={(e) => setNewText({...newText, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newText.content}
                onChange={(e) => setNewText({...newText, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                placeholder="Enter content"
              />
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newText.isActive}
                  onChange={(e) => setNewText({...newText, isActive: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {newText.isActive ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={!newText.title || !newText.content}
              >
                <FiSave className="mr-2" />
                Save Text
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {texts.map((text) => (
          <div 
            key={text.id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${text.isActive ? 'border-blue-500' : 'border-gray-300'}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                {editingId === text.id ? (
                  <input
                    type="text"
                    value={text.title}
                    onChange={(e) => setTexts(texts.map(t => 
                      t.id === text.id ? { ...t, title: e.target.value } : t
                    ))}
                    className="text-xl font-semibold w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-800">{text.title}</h2>
                )}
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={text.isActive}
                      onChange={() => handleToggle(text.id)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {text.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </div>
              </div>

              {editingId === text.id ? (
                <textarea
                  value={text.content}
                  onChange={(e) => setTexts(texts.map(t => 
                    t.id === text.id ? { ...t, content: e.target.value } : t
                  ))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{text.content}</p>
              )}

              <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                {editingId === text.id ? (
                  <>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(text.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleDelete(text.id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => handleEdit(text.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTextsPage;