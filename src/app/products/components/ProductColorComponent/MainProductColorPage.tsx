"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getColors } from "@/redux/slices/Product/Color/getColorSlice";
import { deleteColor } from "@/redux/slices/Product/Color/deleteColorSlice";
import CommonCustomTable from "@/common/commonCustomTable";
import AddColorModal from "../../Models/AddColorModal";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MainProductColorsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.getColor
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    dispatch(getColors({ page: currentPage }));
  }, [dispatch, currentPage]);
  const IMAGE_BASE =
    process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
  const columns = [
    { key: "color_name", header: "Color Name" },
    {
      key: "file_path",
      header: "Image",
      render: (item: any) => (
        <div className="flex ">
          {item.file_path ? (
            <Image
              src={`${IMAGE_BASE}${item.file_path}`}
              alt={item.color_name}
              width={50}
              height={50}
              className="rounded border"
            />
          ) : (
            <span className="text-gray-400 italic">No Image</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-yellow-500 text-white rounded"
            onClick={() => {
              setEditData(item);
              setModalOpen(true);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={async () => {
              await dispatch(deleteColor(item.id)).unwrap();
              toast.success("Color deleted!");
              dispatch(getColors({ page: currentPage }));
            }}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Colors</h1>
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Color
        </button>
      </div>

      <CommonCustomTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(getColors({ page }))}
        onSearch={() => {}}
        title="Colors"
        isLoading={loading}
      />

      <AddColorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => dispatch(getColors({ page: currentPage }))}
        editData={editData}
      />
    </div>
  );
}
