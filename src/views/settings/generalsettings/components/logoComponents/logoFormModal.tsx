'use client'

import { useState, useRef, ChangeEvent } from 'react';
import { FaUpload, FaSave, FaTimes } from 'react-icons/fa';
import { Logo } from './../../types/logoType';

interface LogoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
  currentLogo?: Logo | null;
}

export const LogoFormModal = ({ isOpen, onClose, onSubmit, currentLogo }: LogoFormModalProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(currentLogo?.url || null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">
            {currentLogo ? 'Update Logo' : 'Upload New Logo'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="max-h-40 max-w-full mx-auto mb-4"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FaUpload className="text-3xl text-gray-400" />
                  <p className="text-gray-500">Click to upload logo</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                required={!currentLogo}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file && !currentLogo}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
            >
              <FaSave className="mr-2" />
              {currentLogo ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};