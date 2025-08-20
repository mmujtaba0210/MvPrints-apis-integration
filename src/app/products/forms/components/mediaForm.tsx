import { useState, useRef } from "react";
import { FiUpload, FiTrash2, FiImage, FiLink } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField";
import { FiPlus } from "react-icons/fi";
interface MediaFormProps {
  register: any;
  errors: any;
  setValue: any;
}

export const MediaForm = ({ register, errors, setValue }: MediaFormProps) => {
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadType, setUploadType] = useState("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFeatureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeatureImage(reader.result as string);
        setValue("featureImage", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = await Promise.all(files.map(readFileAsDataURL));
      setGalleryImages((prev) => [...prev, ...newImages]);
      setValue("galleryImages", [...(galleryImages || []), ...files]);
    }
  };

  const removeFeatureImage = () => {
    setFeatureImage(null);
    setValue("featureImage", null);
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    setGalleryImages(newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerGalleryInput = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Media</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Upload
            </label>
            <input
              type="file"
              {...register("videoUpload")}
              accept="video/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <CustomInput
            label="Video Link"
            name="videoLink"
            register={register}
            placeholder="https://example.com/video.mp4"
            errors={errors}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF Specification
            </label>
            <input
              type="file"
              {...register("pdfSpecification")}
              accept=".pdf"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

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

          {uploadType === "file" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                {...register("additionalFile")}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          ) : (
            <CustomInput
              label="Link"
              name="additionalLink"
              register={register}
              placeholder="https://example.com/file.pdf"
              errors={errors}
            />
          )}
        </div>
      </div>
    </div>
  );
};
