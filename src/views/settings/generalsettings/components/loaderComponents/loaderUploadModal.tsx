// app/settings/components/LoaderUploadModal.tsx
"use client";

import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

interface LoaderUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (loader: any) => void;
}

const LoaderUploadModal = ({ isOpen, onClose, onSuccess }: LoaderUploadModalProps) => {
  const [loaderName, setLoaderName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const newLoader = {
        id: Math.floor(Math.random() * 1000),
        name: loaderName || "New Loader",
        isActive: false,
        previewUrl: previewUrl || "/default-loader.gif",
      };
      onSuccess(newLoader);
      resetForm();
      setIsUploading(false);
    }, 1500);
  };

  const resetForm = () => {
    setLoaderName("");
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Upload New Loader</h3>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loader Name
            </label>
            <input
              type="text"
              value={loaderName}
              onChange={(e) => setLoaderName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter loader name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loader Animation File
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                previewUrl ? "border-blue-200 bg-blue-50" : "border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".gif,.png,.svg,.json"
                className="hidden"
              />
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-40 max-w-full object-contain mb-4"
                  />
                  <p className="text-blue-600 font-medium">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <FiUpload className="text-blue-500" size={20} />
                  </div>
                  <p className="text-gray-600">
                    <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    GIF, PNG, SVG or Lottie JSON (Max 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!previewUrl || isUploading}
              className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                !previewUrl || isUploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload size={16} />
                  Upload Loader
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoaderUploadModal;