// app/labels/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getLabels } from "@/redux/slices/Product/Label/getLabelsSlice";
import CommonCustomTable from "@/common/commonCustomTable";
import { toast } from "react-toastify";
import LabelModal from "../../Models/AddLabelModal";
import { deleteLabel } from "@/redux/slices/Product/Label/deleteLabelSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MainProductLabelsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.getLabels
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    dispatch(getLabels({ page: currentPage }));
  }, [dispatch, currentPage]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "color", header: "Color" },
    { key: "description", header: "Description" },
    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <div className="flex gap-2">
          <button
            className="text-lg text-blue-500 hover:text-blue-700 cursor-pointer "
            onClick={() => {
              setEditData(item);
              setModalOpen(true);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="text-lg text-red-500 hover:text-red-700 cursor-pointer "
            onClick={async () => {
              await dispatch(deleteLabel(item.id)).unwrap();
              toast.success("Label deleted!");
              dispatch(getLabels({ page: currentPage }));
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
        <h1 className="text-2xl font-bold">Labels</h1>
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Label
        </button>
      </div>

      <CommonCustomTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(getLabels({ page }))}
        onSearch={(query) => console.log("Searching:", query)}
        title="Labels"
        isLoading={loading}
      />

      <LabelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => dispatch(getLabels({ page: currentPage }))}
        editData={editData}
      />
    </div>
  );
}
