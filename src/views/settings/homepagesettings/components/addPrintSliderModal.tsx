"use client";

import React, { useState } from "react";
import { FiUpload, FiX, FiChevronDown, FiCheck } from "react-icons/fi";

interface TextFieldConfig {
  text: string;
  fontSize: string;
  fontColor: string;
  animation: string;
}

interface SliderFormData {
  header: TextFieldConfig;
  title: TextFieldConfig;
  description: TextFieldConfig;
  image: File | null;
  imagePreview: string;
  link: string;
  textPosition: "left" | "center" | "right";
}

const AddSliderModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (data: SliderFormData) => void }) => {
  const [formData, setFormData] = useState<SliderFormData>({
    header: {
      text: "",
      fontSize: "24px",
      fontColor: "#000000",
      animation: "fadeIn",
    },
    title: {
      text: "",
      fontSize: "36px",
      fontColor: "#000000",
      animation: "slideUp",
    },
    description: {
      text: "",
      fontSize: "16px",
      fontColor: "#333333",
      animation: "fadeIn",
    },
    image: null,
    imagePreview: "",
    link: "",
    textPosition: "center",
  });

  const [activeSection, setActiveSection] = useState<"header" | "title" | "description" | "image">("header");

  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px", "48px"];
  const animations = ["none", "fadeIn", "slideUp", "slideDown", "slideLeft", "slideRight", "zoomIn"];
  const textPositions = ["left", "center", "right"];

  const handleTextChange = (
    field: "header" | "title" | "description",
    property: keyof TextFieldConfig,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [property]: value,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
            Add New Slider
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-sky-100 transition-all duration-200 transform hover:rotate-90"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Progress steps */}
          <div className="mb-6">
            <nav className="flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => setActiveSection("header")}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                  activeSection === "header"
                    ? "bg-sky-100 text-sky-700 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {activeSection === "header" && <FiCheck className="mr-2" />}
                Header
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("title")}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                  activeSection === "title"
                    ? "bg-sky-100 text-sky-700 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {activeSection === "title" && <FiCheck className="mr-2" />}
                Title
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("description")}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                  activeSection === "description"
                    ? "bg-sky-100 text-sky-700 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {activeSection === "description" && <FiCheck className="mr-2" />}
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("image")}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                  activeSection === "image"
                    ? "bg-sky-100 text-sky-700 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {activeSection === "image" && <FiCheck className="mr-2" />}
                Image & Settings
              </button>
            </nav>
          </div>

          {/* Header section */}
          {activeSection === "header" && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-sky-700 border-b border-sky-100 pb-2">
                Header Configuration
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="headerText" className="block text-sm font-medium text-sky-700 mb-1">
                    Header Text
                  </label>
                  <input
                    type="text"
                    id="headerText"
                    value={formData.header.text}
                    onChange={(e) => handleTextChange("header", "text", e.target.value)}
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                    placeholder="Enter header text"
                  />
                </div>

                <div>
                  <label htmlFor="headerFontSize" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Size
                  </label>
                  <div className="relative">
                    <select
                      id="headerFontSize"
                      value={formData.header.fontSize}
                      onChange={(e) => handleTextChange("header", "fontSize", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {fontSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="headerFontColor" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Color
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-sky-300">
                    <input
                      type="color"
                      id="headerFontColor"
                      value={formData.header.fontColor}
                      onChange={(e) => handleTextChange("header", "fontColor", e.target.value)}
                      className="h-10 w-10 p-1 border-0"
                    />
                    <input
                      type="text"
                      value={formData.header.fontColor}
                      onChange={(e) => handleTextChange("header", "fontColor", e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="headerAnimation" className="block text-sm font-medium text-sky-700 mb-1">
                    Animation
                  </label>
                  <div className="relative">
                    <select
                      id="headerAnimation"
                      value={formData.header.animation}
                      onChange={(e) => handleTextChange("header", "animation", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {animations.map((anim) => (
                        <option key={anim} value={anim}>
                          {anim}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Title section */}
          {activeSection === "title" && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-sky-700 border-b border-sky-100 pb-2">
                Title Configuration
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="titleText" className="block text-sm font-medium text-sky-700 mb-1">
                    Title Text
                  </label>
                  <input
                    type="text"
                    id="titleText"
                    value={formData.title.text}
                    onChange={(e) => handleTextChange("title", "text", e.target.value)}
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                    placeholder="Enter title text"
                  />
                </div>

                <div>
                  <label htmlFor="titleFontSize" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Size
                  </label>
                  <div className="relative">
                    <select
                      id="titleFontSize"
                      value={formData.title.fontSize}
                      onChange={(e) => handleTextChange("title", "fontSize", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {fontSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="titleFontColor" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Color
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-sky-300">
                    <input
                      type="color"
                      id="titleFontColor"
                      value={formData.title.fontColor}
                      onChange={(e) => handleTextChange("title", "fontColor", e.target.value)}
                      className="h-10 w-10 p-1 border-0"
                    />
                    <input
                      type="text"
                      value={formData.title.fontColor}
                      onChange={(e) => handleTextChange("title", "fontColor", e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="titleAnimation" className="block text-sm font-medium text-sky-700 mb-1">
                    Animation
                  </label>
                  <div className="relative">
                    <select
                      id="titleAnimation"
                      value={formData.title.animation}
                      onChange={(e) => handleTextChange("title", "animation", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {animations.map((anim) => (
                        <option key={anim} value={anim}>
                          {anim}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Description section */}
          {activeSection === "description" && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-sky-700 border-b border-sky-100 pb-2">
                Description Configuration
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="descriptionText" className="block text-sm font-medium text-sky-700 mb-1">
                    Description Text
                  </label>
                  <textarea
                    id="descriptionText"
                    rows={3}
                    value={formData.description.text}
                    onChange={(e) => handleTextChange("description", "text", e.target.value)}
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                    placeholder="Enter description text"
                  />
                </div>

                <div>
                  <label htmlFor="descriptionFontSize" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Size
                  </label>
                  <div className="relative">
                    <select
                      id="descriptionFontSize"
                      value={formData.description.fontSize}
                      onChange={(e) => handleTextChange("description", "fontSize", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {fontSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="descriptionFontColor" className="block text-sm font-medium text-sky-700 mb-1">
                    Font Color
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-sky-300">
                    <input
                      type="color"
                      id="descriptionFontColor"
                      value={formData.description.fontColor}
                      onChange={(e) => handleTextChange("description", "fontColor", e.target.value)}
                      className="h-10 w-10 p-1 border-0"
                    />
                    <input
                      type="text"
                      value={formData.description.fontColor}
                      onChange={(e) => handleTextChange("description", "fontColor", e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="descriptionAnimation" className="block text-sm font-medium text-sky-700 mb-1">
                    Animation
                  </label>
                  <div className="relative">
                    <select
                      id="descriptionAnimation"
                      value={formData.description.animation}
                      onChange={(e) => handleTextChange("description", "animation", e.target.value)}
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {animations.map((anim) => (
                        <option key={anim} value={anim}>
                          {anim}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image & Settings section */}
          {activeSection === "image" && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-sky-700 border-b border-sky-100 pb-2">
                Image & Settings
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-sky-700 mb-1">Slider Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sky-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {formData.imagePreview ? (
                        <div className="relative">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="mx-auto h-32 object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: "" }))}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="imageUpload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none"
                            >
                              <span>Upload an image</span>
                              <input
                                id="imageUpload"
                                name="imageUpload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="link" className="block text-sm font-medium text-sky-700 mb-1">
                    Link URL
                  </label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="textPosition" className="block text-sm font-medium text-sky-700 mb-1">
                    Text Position
                  </label>
                  <div className="relative">
                    <select
                      id="textPosition"
                      value={formData.textPosition}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          textPosition: e.target.value as "left" | "center" | "right",
                        }))
                      }
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700 appearance-none"
                    >
                      {textPositions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos.charAt(0).toUpperCase() + pos.slice(1)}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl space-y-3 sm:space-y-0 mt-6">
            {activeSection !== "image" ? (
              <button
                type="button"
                onClick={() => {
                  if (activeSection === "header") setActiveSection("title");
                  else if (activeSection === "title") setActiveSection("description");
                  else if (activeSection === "description") setActiveSection("image");
                }}
                className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-base font-medium text-white hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
              >
                <FiCheck className="mr-2" />
                Save Slider
              </button>
            )}

            {activeSection !== "header" ? (
              <button
                type="button"
                onClick={() => {
                  if (activeSection === "title") setActiveSection("header");
                  else if (activeSection === "description") setActiveSection("title");
                  else if (activeSection === "image") setActiveSection("description");
                }}
                className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSliderModal;