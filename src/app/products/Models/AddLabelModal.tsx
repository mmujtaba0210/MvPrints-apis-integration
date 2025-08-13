// components/LabelModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { toast } from "react-toastify";
import { updateLabel } from "@/redux/slices/Product/Label/updateLabelSlice";
import { createLabel } from "@/redux/slices/Product/Label/createLabelSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
}

export default function LabelModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    color: "",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        color: editData.color || "",
        description: editData.description || "",
      });
    } else {
      setFormData({ name: "", color: "", description: "" });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("color", formData.color);
    fd.append("description", formData.description);

    try {
      if (editData) {
        await dispatch(updateLabel({ id: editData.id, formData: fd })).unwrap();
        toast.success("Label updated successfully!");
      } else {
        await dispatch(createLabel(fd)).unwrap();
        toast.success("Label created successfully!");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-lg ">
        <div className=" bg-blue-500 text-white p-6 rounded-t-lg">
          <h2 className="text-xl font-semibold ">
            {editData ? "Update Label" : "Create Label"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Label Name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Label Color"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
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
