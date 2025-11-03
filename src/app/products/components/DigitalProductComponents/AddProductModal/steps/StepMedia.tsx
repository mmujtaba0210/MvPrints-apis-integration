"use client";

import { useState, useRef, useEffect } from "react";
import { FiUpload, FiTrash2, FiLink, FiPlus } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField";

interface StepProductMediaProps {
  formik: any;
}

export default function StepMedia({ formik }: StepProductMediaProps) {
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadType, setUploadType] = useState("file");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const values = formik.values;

  // 🧩 Convert File → Base64 for preview
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 🟢 Feature Image Upload
  const handleFeatureImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }
      const preview = await readFileAsDataURL(file);
      setFeatureImage(preview);
      formik.setFieldValue("feature_image", file);
    }
  };

  // 🟢 Gallery Upload
  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = await Promise.all(files.map(readFileAsDataURL));
      setGalleryImages((prev) => [...prev, ...previews]);
      formik.setFieldValue("gallery_images", [
        ...(values.gallery_images || []),
        ...files,
      ]);
    }
  };

  // 🟢 Remove images
  const removeFeatureImage = () => {
    setFeatureImage(null);
    formik.setFieldValue("feature_image", null);
  };

  const removeGalleryImage = (index: number) => {
    const updated = [...galleryImages];
    updated.splice(index, 1);
    setGalleryImages(updated);

    const currentFiles = [...(values.gallery_images || [])];
    currentFiles.splice(index, 1);
    formik.setFieldValue("gallery_images", currentFiles);
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerGalleryInput = () => galleryInputRef.current?.click();

  useEffect(() => {
    const media: any[] = [];

    if (values.feature_image) {
      media.push({
        type: "is_featured",
        upload_by: "upload_by_file",
        file: values.feature_image,
      });
    }

    if (values.gallery_images?.length) {
      values.gallery_images.forEach((file: File) =>
        media.push({
          type: "gallery",
          upload_by: "upload_by_file",
          file,
        })
      );
    }

    if (values.pdfs?.length) {
      media.push({
        type: "pdf",
        upload_by: "upload_by_file",
        file: values.pdfs[0],
      });
    }

    if (values.videos?.length) {
      media.push({
        type: "video",
        upload_by: "upload_by_file",
        file: values.videos[0],
      });
    }

    if (values.video_link) {
      media.push({
        type: "video",
        upload_by: "upload_by_link",
        link: values.video_link,
      });
    }

    if (values.additional_file?.length) {
      media.push({
        upload_by: "upload_by_file",
        file: values.additional_file[0],
      });
    } else if (values.additional_link) {
      media.push({
        upload_by: "upload_by_link",
        link: values.additional_link,
      });
    }

    // ✅ Prevent infinite loop
    const currentMedia = formik.values.media || [];
    const newMediaString = JSON.stringify(media);
    const oldMediaString = JSON.stringify(currentMedia);

    if (newMediaString !== oldMediaString) {
      formik.setFieldValue("media", media);
    }
  }, [
    values.feature_image,
    values.gallery_images,
    values.pdfs,
    values.videos,
    values.video_link,
    values.additional_file,
    values.additional_link,
  ]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Media</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          {/* --- Feature Image --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feature Image <span className="text-red-500">*</span>
            </label>
            {featureImage ? (
              <div className="mt-1 relative group">
                <img
                  src={featureImage}
                  alt="Feature preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeFeatureImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                className="mt-1 flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
              >
                <FiUpload className="h-10 w-10 text-gray-400" />
                <span className="mt-2 text-sm text-gray-600">
                  Upload Feature Image
                </span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFeatureImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* --- Gallery --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Set Gallery
            </label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <div
                onClick={triggerGalleryInput}
                className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
              >
                <FiPlus className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <input
              type="file"
              ref={galleryInputRef}
              onChange={handleGalleryChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* --- Video Upload --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Upload
            </label>
            <input
              type="file"
              name="videos"
              accept="video/*"
              onChange={(e) => formik.setFieldValue("videos", e.target.files)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* --- Video Link --- */}
          <CustomInput
            label="Video Link"
            name="video_link"
            value={values.video_link}
            onChange={formik.handleChange}
            placeholder="https://example.com/video.mp4"
            errors={formik.errors}
          />

          {/* --- PDF --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF Specification
            </label>
            <input
              type="file"
              name="pdfs"
              accept=".pdf"
              onChange={(e) => formik.setFieldValue("pdfs", e.target.files)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* --- Upload Type Toggle --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Upload Type
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setUploadType("file")}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  uploadType === "file"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FiUpload className="inline mr-1" /> File
              </button>
              <button
                type="button"
                onClick={() => setUploadType("link")}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  uploadType === "link"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FiLink className="inline mr-1" /> Link
              </button>
            </div>
          </div>

          {/* --- Additional File or Link --- */}
          {uploadType === "file" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                name="additional_file"
                onChange={(e) =>
                  formik.setFieldValue("additional_file", e.target.files)
                }
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          ) : (
            <CustomInput
              label="Link"
              name="additional_link"
              value={values.additional_link}
              onChange={formik.handleChange}
              placeholder="https://example.com/file.pdf"
              errors={formik.errors}
            />
          )}
        </div>
      </div>
    </div>
  );
}
