"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchCharities } from "@/redux/slices/Charities/getCharitiesSlice";
import {
  deleteCharity,
  resetDeleteCharity,
} from "@/redux/slices/Charities/deleteCharitySlice";
import { toast } from "react-toastify";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCharityModal from "./UpdateCharityForm"; // <-- Import modal

interface Charity {
  id: number;
  name: string;
  description: string;
  file_path: string;
  status: "Active" | "Inactive" | "Pending";
}

const CharitiesTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux states
  const {
    charities,
    loading: fetchLoading,
    error: fetchError,
  } = useSelector((state: RootState) => state.getCharities);

  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state: RootState) => state.deleteCharity);

  // Local states for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCharity, setEditCharity] = useState<Charity | null>(null);

  // Fetch charities when page loads
  useEffect(() => {
    dispatch(fetchCharities());
  }, [dispatch]);

  // Handle delete success/error
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Charity deleted successfully!");
      dispatch(fetchCharities());
      dispatch(resetDeleteCharity());
    }
    if (deleteError) {
      toast.error(deleteError);
    }
  }, [deleteSuccess, deleteError, dispatch]);

  // Prepare table data
  const fetchData = useCallback(() => charities, [charities]);
  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
  } = useTableData<Charity>(fetchData, ["name"], "status");

  // Open modal with selected charity data
  const handleEdit = (id: number) => {
    const selected = charities.find((c) => c.id === id);
    if (selected) {
      setEditCharity(selected);
      setIsModalOpen(true);
    } else {
      toast.error("Charity not found!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;
      await dispatch(deleteCharity(id)).unwrap();
    } catch (err: any) {
      toast.error(err || "Failed to delete charity");
    }
  };

  const columns = [
    {
      key: "name",
      header: "Charity Name",
      width: "250px",
      render: (item: Charity) => (
        <div className="flex items-center gap-3">
          <img
            src={item.file_path}
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      width: "250px",
      render: (item: Charity) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">{item.description}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: Charity) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item.id)}
            className="text-blue-600 cursor-pointer transition-all duration-700 hover:scale-110 hover:text-blue-800"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 cursor-pointer transition-all duration-700 hover:scale-110 hover:text-red-800"
            title="Delete"
            disabled={deleteLoading}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Pending", label: "Pending" },
  ];

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600">Loading charities...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center">
        <p className="text-red-600">Failed to fetch charities 😢</p>
        <button
          onClick={() => dispatch(fetchCharities())}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <CommonCustomTable<Charity>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Charity List"
      />

      {/* 🧩 Update Charity Modal */}
      <UpdateCharityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => dispatch(fetchCharities())}
        editData={editCharity}
      />
    </div>
  );
};

export default CharitiesTable;
