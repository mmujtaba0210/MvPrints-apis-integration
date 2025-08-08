// BrandTable.tsx

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CommonCustomTable from "@/common/commonCustomTable";
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
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error, totalPages, currentPage } = useSelector(
    (state: RootState) => state.fetchBrands
  );

  // Fetch first page on mount
  useEffect(() => {
    dispatch(fetchBrands(1));
  }, [dispatch]);

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      render: (item: Brand) => <span className="font-medium">{item.id}</span>,
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
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => {
            setSelectedBrand(item);
            setShowUpdate(true);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <CommonCustomTable<Brand>
        data={brands}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(fetchBrands(page))}
        onSearch={() => null}
        onFilter={() => null}
        filterOptions={[]}
        isLoading={loading}
        title="Brands List"
      />

      {showUpdate && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <UpdateBrandForm
              selectedBrand={selectedBrand}
              onClose={() => {
                setShowUpdate(false);
                dispatch(fetchBrands(currentPage));
              }}
            />
          </div>
        </div>
      )}

      {error && <div className="text-red-500 p-4">{error}</div>}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default BrandTable;
