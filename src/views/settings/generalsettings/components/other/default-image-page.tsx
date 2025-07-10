// app/settings/images/page.tsx
"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { FaUpload, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

type ImageType = 'error-page' | 'customer';
type ImageItem = {
  id: string;
  type: ImageType;
  url: string;
  name: string;
  size: string;
  uploadedAt: string;
};

const DefaultImagePage = () => {
  const [activeTab, setActiveTab] = useState<ImageType>('error-page');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - replace with your actual data fetching logic
  const mockImages: ImageItem[] = [
    {
      id: '1',
      type: 'error-page',
      url: '/images/chair1.jpg',
      name: '404-page.jpg',
      size: '1.2 MB',
      uploadedAt: '2023-05-15',
    },
    {
      id: '2',
      type: 'error-page',
      url: '/images/chair1.jpg',
      name: '500-page.jpg',
      size: '1.5 MB',
      uploadedAt: '2023-06-20',
    },
    {
      id: '3',
      type: 'customer',
      url: '/images/chair1.jpg',
      name: 'default-avatar.jpg',
      size: '0.8 MB',
      uploadedAt: '2023-07-10',
    },
  ];

  // Initialize with mock data
  useState(() => {
    setImages(mockImages);
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          setPreviewImage(event.target.result as string);
          
          // Create a new image item for preview (not saved yet)
          const newImage: ImageItem = {
            id: Date.now().toString(),
            type: activeTab,
            url: event.target.result as string,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadedAt: new Date().toISOString().split('T')[0],
          };

          setEditingImage(newImage);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (editingImage) {
      if (editingImage.id.startsWith('new')) {
        // Add new image
        setImages([...images, editingImage]);
      } else {
        // Update existing image
        setImages(images.map(img => img.id === editingImage.id ? editingImage : img));
      }
      setEditingImage(null);
      setPreviewImage(null);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    if (editingImage?.id === id) {
      setEditingImage(null);
      setPreviewImage(null);
    }
  };

  const handleEditImage = (image: ImageItem) => {
    setEditingImage(image);
    setPreviewImage(image.url);
  };

  const filteredImages = images.filter(img => img.type === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Image Management</h1>
        <p className="text-gray-600">Upload and manage default error pages and customer images</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'error-page' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('error-page')}
          >
            Error Page Images
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'customer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('customer')}
          >
            Customer Images
          </button>
        </div>

        <div className="p-6">
          {/* Upload/Edit Section */}
          <div className="mb-8 p-6 border border-dashed border-gray-300 rounded-lg text-black">
            <h2 className="text-lg font-semibold mb-4 text-black">
              {editingImage ? 'Edit Image' : 'Upload New Image'}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Preview */}
              <div className="w-full md:w-1/2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-64 flex items-center justify-center">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-500">No image selected</p>
                      <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Controls */}
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === 'error-page' ? 'Error Page Image' : 'Customer Image'}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center justify-center"
                  >
                    <FaUpload className="mr-2" />
                    {previewImage ? 'Change Image' : 'Select Image'}
                  </button>
                </div>

                {previewImage && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Name
                      </label>
                      <input
                        type="text"
                        value={editingImage?.name || ''}
                        onChange={(e) => editingImage && setEditingImage({
                          ...editingImage,
                          name: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter image name"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleSaveImage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        <FaSave className="mr-2" />
                        {editingImage?.id.startsWith('new') ? 'Upload Image' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => {
                          setPreviewImage(null);
                          setEditingImage(null);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Image List */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-black">
              {activeTab === 'error-page' ? 'Error Page Images' : 'Customer Images'}
            </h2>
            
            {filteredImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No images found. Upload your first image.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img 
                        src={image.url} 
                        alt={image.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium truncate text-black">{image.name}</h3>
                        <span className="text-xs text-gray-500">{image.size}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>Uploaded: {image.uploadedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditImage(image)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center text-sm"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center text-sm"
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultImagePage;