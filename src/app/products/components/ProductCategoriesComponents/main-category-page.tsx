"use client";

import React, { useEffect, useState, useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import AddProductCategoryModal from "../../Models/AddProductCatgeoryModal";
import UpdateProductCategoryModal from "../../Models/UpdateProductMainCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";

interface Category {
  id: number;
  name: string;
  ordering: number;
  status: boolean;
  slug: string;
}

const MainCategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { categories, totalPages, loading, error } = useSelector(
    (state: RootState) => state.getAllCategories
  );

  useEffect(() => {
    dispatch(getCategories(currentPage));
  }, [dispatch, currentPage]);

  const fetchData = useCallback((): Category[] => {
    let filteredData = (categories || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      ordering: cat.ordering,
      status: typeof cat.status === "boolean" ? cat.status : cat.status === 1,
      slug: cat.slug,
    }));

    // Apply search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (cat) =>
          cat.name.toLowerCase().includes(term) ||
          cat.slug.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (filterStatus !== null) {
      filteredData = filteredData.filter((cat) => cat.status === filterStatus);
    }

    return filteredData;
  }, [categories, searchTerm, filterStatus]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    dispatch(getCategories(currentPage));
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      width: "200px",
      render: (item: Category) => (
        <span className="font-medium">{item.name}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      width: "250px",
      render: (item: Category) => (
        <span className="text-gray-600 font-mono">{item.slug}</span>
      ),
    },
    {
      key: "ordering",
      header: "Order",
      width: "170px",
      render: (item: Category) => (
        <span className="font-semibold">{item.ordering}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "170px",
      render: (item: Category) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === true
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status === true ? "Active" : "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: Category) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            title="Edit Category"
            onClick={() => {
              setSelectedCategory(item);
              setIsModalOpen(true);
            }}
          >
            ✏️
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete Category"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: null, label: "All" },
    { value: true, label: "Active" },
    { value: false, label: "Pending" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Main Categories</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            onClick={() => dispatch(getCategories(currentPage))}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
          >
            + Add Main Category
          </button>
        </div>
      </div>

      <CommonCustomTable<Category>
        data={fetchData()}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={(searchTerm: string) => {
          setSearchTerm(searchTerm);
        }}
        onFilter={(filterValue: boolean | "") => {
          setFilterStatus(filterValue === "" ? null : filterValue);
        }}
        filterOptions={filterOptions}
        title="Main Categories"
        isLoading={loading}
      />

      <AddProductCategoryModal
        isOpen={isModalOpen && selectedCategory === null}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {selectedCategory && (
        <UpdateProductCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSuccess={handleSuccess}
          category={{
            ...selectedCategory,
            title: selectedCategory.name,
            product_category_id: selectedCategory.id,
          }}
        />
      )}
    </div>
  );
};

export default MainCategoryPage;
