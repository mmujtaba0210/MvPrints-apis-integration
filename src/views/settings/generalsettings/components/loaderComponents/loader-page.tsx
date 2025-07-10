// app/settings/loader.tsx
"use client";

import { useState } from "react";
import LoaderUploadModal from "./loaderUploadModal";
import { FiUpload, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const LoaderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaders, setLoaders] = useState([
    {
      id: 1,
      name: "Spinner Blue",
      isActive: true,
      previewUrl: "/dummy-loader-1.gif",
    },
    {
      id: 2,
      name: "Pulse Animation",
      isActive: false,
      previewUrl: "/dummy-loader-2.gif",
    },
    {
      id: 3,
      name: "Circle Wave",
      isActive: false,
      previewUrl: "/dummy-loader-3.gif",
    },
  ]);

  const toggleLoaderStatus = (id: number) => {
    setLoaders(loaders.map(loader => ({
      ...loader,
      isActive: loader.id === id ? !loader.isActive : false
    })));
  };

  const deleteLoader = (id: number) => {
    setLoaders(loaders.filter(loader => loader.id !== id));
  };

  const handleUploadSuccess = (newLoader: any) => {
    setLoaders([...loaders, newLoader]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Custom Loaders</h2>
        <p className="text-gray-500 mt-1">Upload and manage your website loading animations</p>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Available Loaders</h3>
            <p className="text-sm text-gray-500">Active loader will be shown to your customers</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiUpload size={18} />
            Upload New Loader
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loaders.map((loader) => (
            <div 
              key={loader.id}
              className={`border rounded-xl overflow-hidden transition-all ${
                loader.isActive ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
              }`}
            >
              <div className="p-4 bg-gray-50 flex justify-center items-center h-48">
                <img 
                  src={loader.previewUrl} 
                  alt={loader.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">{loader.name}</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => deleteLoader(loader.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleLoaderStatus(loader.id)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        loader.isActive ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                          loader.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    loader.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-gray-500">
                    {loader.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loaders.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FiUpload size={40} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Loaders Found</h3>
            <p className="text-gray-500 mb-4">Upload your first loader animation</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Upload Loader
            </button>
          </div>
        )}
      </div>

      <LoaderUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default LoaderPage;