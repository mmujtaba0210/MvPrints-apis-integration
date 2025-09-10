"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { toast } from "react-toastify";
import { createColor } from "@/redux/slices/Product/Color/createColorSlice";
import { updateColor } from "@/redux/slices/Product/Color/updateColorSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
}

export default function AddColorModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [colorName, setColorName] = useState("");
  const [filePath, setFilePath] = useState<File | null>(null);

  useEffect(() => {
    if (editData) {
      setColorName(editData.color_name || "");
      setFilePath(null);
    } else {
      setColorName("");
      setFilePath(null);
    }
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("color_name", colorName);
    if (filePath) fd.append("file_path", filePath);

    try {
      if (editData) {
        await dispatch(updateColor({ id: editData.id, formData: fd })).unwrap();
        toast.success("Color updated successfully!");
      } else {
        await dispatch(createColor(fd)).unwrap();
        setColorName("");
        toast.success("Color created successfully!");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("Name is already taken");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg ">
        <div className="bg-blue-500 rounded-t-lg text-white p-6">
          <h2 className="text-xl font-semibold ">
            {editData ? "Update Color" : "Create Color"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <input
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Color Name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="file"
            onChange={(e) => setFilePath(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
