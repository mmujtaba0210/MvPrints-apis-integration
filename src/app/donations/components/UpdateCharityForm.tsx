"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { toast } from "react-toastify";
import { updateCharity } from "@/redux/slices/Charities/updateCharitySlice"; // <-- Make sure this slice exists

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
}

export default function UpdateCharityModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState<File | null>(null);

  // Prefill form if editing
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setDescription(editData.description || "");
      setFilePath(null);
    } else {
      setName("");
      setDescription("");
      setFilePath(null);
    }
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    if (filePath) fd.append("file_path", filePath);

    try {
      if (editData) {
        await dispatch(
          updateCharity({ id: editData.id, formData: fd })
        ).unwrap();
        toast.success("Charity updated successfully!");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update charity");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="bg-blue-600 text-white rounded-t-lg p-4">
          <h2 className="text-lg font-semibold">Update Charity</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Charity Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e) => setFilePath(e.target.files?.[0] || null)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer hove:bg-blue-700 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
