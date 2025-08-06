"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchBrands } from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBrandForm from "./UpdateBrandForm";

interface Brand {
  id: number;
  name: string;
  file_path: string;
  meta_title: string;
  meta_description: string;
}

const BrandTable = () => {
  const [showUpdate, setShowUpdate] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector(
    (state: RootState) => state.fetchBrands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const fetchData = React.useCallback(() => {
    return [...brands].sort((a, b) => a.id - b.id);
  }, [brands]);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    reload,
  } = useTableData<Brand>(
    fetchData,
    ["name", "meta_title", "meta_description"],
    undefined
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      render: (item: Brand) => (
        <div className="flex items-center">
          <span className="font-medium">{item.id}</span>
        </div>
      ),
    },
    {
      key: "name",
      header: "Brand",
      width: "200px",
      render: (item: Brand) => (
        <div className="flex items-center">
          <Image
            src={item.file_path}
            alt={item.name}
            width={32}
            height={32}
            className="rounded-full object-cover mr-3"
            unoptimized
          />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: "meta_title",
      header: "Meta Title",
      width: "200px",
      render: (item: Brand) => (
        <p className="text-sm text-gray-600 line-clamp-2">{item.meta_title}</p>
      ),
    },
    {
      key: "meta_description",
      header: "Meta Description",
      width: "250px",
      render: (item: Brand) => (
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.meta_description}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (item: Brand) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
            onClick={() => {
              console.log("Clicked brand:", selectedBrand);
              setSelectedBrand(item);
              setShowUpdate(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button onClick={reload} className="absolute top-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CommonCustomTable<Brand>
          data={paginatedData}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSearch={setSearchQuery}
          onFilter={() => null}
          filterOptions={[]}
          title="Brands List"
        />

        {showUpdate && selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-lg  p-6 w-full max-w-lg relative">
              <UpdateBrandForm
                selectedBrand={selectedBrand}
                onClose={() => {
                  setShowUpdate(false);
                  dispatch(fetchBrands());
                }}
              />
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowUpdate(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default BrandTable;
