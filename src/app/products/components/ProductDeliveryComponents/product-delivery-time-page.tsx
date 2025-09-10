"use client";

import React, { useEffect, useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllDeliveryTimes } from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";
import AddProductDeliveryTimeModal from "../../Models/AddProductDeliveryModal";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteDeliveryTime } from "@/redux/slices/Product/DeliveryTime/deleteDeliveryTimeSlice";
import { toast } from "react-toastify";

interface ProductDeliveryTime {
  id: number;
  name: string;
  min_days: number;
  max_days: number;
  status: boolean;
}

const ProductDeliveryTimeTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { deliveryTimes, totalPages, loading, error } = useSelector(
    (state: RootState) => state.getAllDeliveryTimes
  );

  const [editData, setEditData] = useState<ProductDeliveryTime | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllDeliveryTimes(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this delivery time?")) return;

    try {
      await dispatch(deleteDeliveryTime(id)).unwrap();
      toast.success("Delivery time deleted successfully");
      dispatch(getAllDeliveryTimes(currentPage)); // refresh list
    } catch (err: any) {
      toast.error(err || "Failed to delete delivery time");
    }
  };

  const columns = [
    {
      key: "id",
      header: "Sr #",
      width: "80px",
    },
    {
      key: "name",
      header: "Delivery Option",
      width: "200px",
      render: (item: ProductDeliveryTime) => (
        <span className="font-medium text-gray-800">{item.name}</span>
      ),
    },
    {
      key: "min_days",
      header: "Min Days",
      width: "120px",
      render: (item: ProductDeliveryTime) => (
        <span className="text-sm text-gray-600">{item.min_days} days</span>
      ),
    },
    {
      key: "max_days",
      header: "Max Days",
      width: "120px",
      render: (item: ProductDeliveryTime) => (
        <span className="text-sm text-gray-600">{item.max_days} days</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: ProductDeliveryTime) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "options",
      header: "Options",
      width: "150px",
      render: (item: ProductDeliveryTime) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditData(item);
              setIsModalOpen(true);
            }}
            className="text-blue-600 text-lg cursor-pointer hover:text-blue-800"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            className="text-red-600 text-lg cursor-pointer hover:text-red-800"
            title="Delete"
            onClick={() => handleDelete(item.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Delivery Times
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditData(null);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          + Add New
        </button>
      </div>

      <CommonCustomTable<ProductDeliveryTime>
        data={deliveryTimes}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => dispatch(getAllDeliveryTimes(currentPage))}
        onSearch={() => {}}
        onFilter={() => {}}
        filterOptions={filterOptions}
        title="Product Delivery Times List"
        isLoading={loading}
      />

      <AddProductDeliveryTimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          setEditData({
            id: 0,
            name: "",
            min_days: 0,
            max_days: 0,
            status: false,
          });
          dispatch(getAllDeliveryTimes(currentPage)); // refresh list
        }}
        editData={editData}
      />
    </div>
  );
};

export default ProductDeliveryTimeTable;
