import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertCircle, FiUpload, FiImage } from 'react-icons/fi';
import { CustomInput } from '@/common/customInputField';

type FormData = {
  title: string;
  slogan: string;
  description: string;
  howItWorksDescription: string;
  currentBackgroundImage?: FileList;
};

const BrandAmbassadorForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Brand Ambassador Program</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid Section - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Title Field */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <CustomInput
              label="Title"
              name="title"
              register={register}
              required
              placeholder="Enter program title"
              errors={errors}
              validation={{
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters"
                }
              }}
            />
          </div>

          {/* Slogan Field */}
          <div className="col-span-1">
            <CustomInput
              label="Slogan"
              name="slogan"
              register={register}
              required
              placeholder="Enter a catchy slogan"
              errors={errors}
            />
          </div>

          {/* Empty grid cell for spacing - could be used for another field */}
          <div className="col-span-1 hidden lg:block"></div>
        </div>

        {/* Grid Section - Second Row (Description Fields) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description Field */}
          <div className="col-span-1">
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              {errors.description && (
                <span className="inline-flex items-center text-xs text-red-500">
                  <FiAlertCircle className="mr-1" />
                  {errors.description.message || "This field is required"}
                </span>
              )}
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Enter detailed description of the program"
                rows={5}
                className={`block w-full px-4 py-3 border ${
                  errors.description
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
              />
            </div>
          </div>

          {/* How It Works Description Field */}
          <div className="col-span-1">
            <div className="space-y-2">
              <label htmlFor="howItWorksDescription" className="block text-sm font-medium text-gray-700">
                How It Works <span className="text-red-500">*</span>
              </label>
              {errors.howItWorksDescription && (
                <span className="inline-flex items-center text-xs text-red-500">
                  <FiAlertCircle className="mr-1" />
                  {errors.howItWorksDescription.message || "This field is required"}
                </span>
              )}
              <textarea
                id="howItWorksDescription"
                {...register("howItWorksDescription", { required: "How it works description is required" })}
                placeholder="Explain how the program works"
                rows={5}
                className={`block w-full px-4 py-3 border ${
                  errors.howItWorksDescription
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
              />
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-3">
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-lg font-medium text-gray-700">
                Background Image
              </label>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Image Preview */}
                <div className="w-full md:w-1/3">
                  {previewImage ? (
                    <div className="w-full h-48 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 space-y-2">
                      <FiImage className="w-10 h-10" />
                      <span className="text-sm">No image selected</span>
                    </div>
                  )}
                </div>
                
                {/* Upload Controls */}
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentBackgroundImage" className="block text-sm font-medium text-gray-700">
                      Upload New Image
                    </label>
                    <label className="block">
                      <div className="relative">
                        <input
                          type="file"
                          id="currentBackgroundImage"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          {...register("currentBackgroundImage")}
                          onChange={handleImageChange}
                        />
                        <div className="px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-100 transition-colors bg-white">
                          <FiUpload className="w-5 h-5" />
                          <span>Choose File</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Image Requirements</h4>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Recommended size: 1200×600px</li>
                      <li>• Max file size: 2MB</li>
                      <li>• Formats: JPG, PNG, or SVG</li>
                      <li>• High quality, professional images only</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-start-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-md hover:shadow-lg"
            >
              Save Program Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BrandAmbassadorForm;