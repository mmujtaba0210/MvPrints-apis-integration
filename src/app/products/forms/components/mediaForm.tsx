import { useState, useRef, useEffect } from "react";
import { FiUpload, FiTrash2, FiLink, FiPlus } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField";

interface MediaFormProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
  existingMedia?: any; // 🟩 New: existing product media for edit mode
}

export const MediaForm = ({
  register,
  errors,
  setValue,
  watch,
  existingMedia = {},
}: MediaFormProps) => {
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadType, setUploadType] = useState("file");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Watch current form fields
  const videoUpload = watch("videos");
  const videoLink = watch("videoLink");
  const pdfSpecification = watch("pdfs");
  const additionalFile = watch("additionalFile");
  const additionalLink = watch("additionalLink");

  // 🟩 Load existing media on edit
  useEffect(() => {
    if (existingMedia?.media?.length) {
      const featured = existingMedia.media.find(
        (m: any) => m.type === "is_featured"
      );
      const gallery = existingMedia.media.filter(
        (m: any) => m.type === "gallery"
      );

      if (featured?.file_path) setFeatureImage(featured.file_path);
      if (gallery?.length)
        setGalleryImages(gallery.map((g: any) => g.file_path));
    }
  }, [existingMedia]);

  // 🧩 Helper: Convert file to base64 for preview
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 🟩 Handlers
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
      setValue("images", file);
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = await Promise.all(files.map(readFileAsDataURL));
      setGalleryImages((prev) => [...prev, ...newImages]);
      setValue("galleryImages", [...(watch("gallery_images") || []), ...files]);
    }
  };

  const removeFeatureImage = () => {
    setFeatureImage(null);
    setValue("images", null);
  };

  const removeGalleryImage = (index: number) => {
    const newPreview = [...galleryImages];
    newPreview.splice(index, 1);
    setGalleryImages(newPreview);

    const currentFiles = watch("gallery_images") || [];
    currentFiles.splice(index, 1);
    setValue("galleryImages", currentFiles);
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerGalleryInput = () => galleryInputRef.current?.click();

  // 🧠 Build media array dynamically for API
  useEffect(() => {
    const media: any[] = [];

    const featureFile = watch("images");
    if (featureFile) {
      media.push({
        type: "is_featured",
        upload_by: "upload_by_file",
        file: featureFile,
      });
    } else if (featureImage && featureImage.startsWith("http")) {
      media.push({
        type: "is_featured",
        file_path: featureImage,
      });
    }

    const galleryFiles = watch("galleryImages") || [];
    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file: File) => {
        media.push({
          type: "gallery",
          upload_by: "upload_by_file",
          file,
        });
      });
    } else if (galleryImages.length && galleryImages[0].startsWith("http")) {
      galleryImages.forEach((path) =>
        media.push({
          type: "gallery",
          file_path: path,
        })
      );
    }

    if (pdfSpecification && pdfSpecification[0]) {
      media.push({
        type: "pdf",
        upload_by: "upload_by_file",
        file: pdfSpecification[0],
      });
    }

    if (videoUpload && videoUpload[0]) {
      media.push({
        type: "video",
        upload_by: "upload_by_file",
        file: videoUpload[0],
      });
    }

    if (videoLink) {
      media.push({
        type: "video",
        upload_by: "upload_by_link",
        link: videoLink,
      });
    }

    if (additionalFile && additionalFile[0]) {
      media.push({
        upload_by: "upload_by_file",
        file: additionalFile[0],
      });
    } else if (additionalLink) {
      media.push({
        type: "file",
        upload_by: "upload_by_link",
        link: additionalLink,
      });
    }

    setValue("media", media);
  }, [
    featureImage,
    galleryImages,
    videoUpload,
    videoLink,
    pdfSpecification,
    additionalFile,
    additionalLink,
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
              {...register("videos")}
              accept="video/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* --- Video Link --- */}
          <CustomInput
            label="Video Link"
            name="videoLink"
            register={register}
            placeholder="https://example.com/video.mp4"
            errors={errors}
          />

          {/* --- PDF --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF Specification
            </label>
            <input
              type="file"
              {...register("pdfs")}
              accept=".pdf"
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
