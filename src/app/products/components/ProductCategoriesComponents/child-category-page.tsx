"use client";

import React, { useEffect, useState, useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import AddChildCategoryModal from "../../Models/AddChildCategoryModal";
import UpdateChildCategoryModal from "../../Models/UpdateChildCategoryModal";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchChildCategories } from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";

interface ChildCategory {
  id: number;
  category: {
    id: string;
    name: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  childCategory: string;
  slug: string;
  status: boolean;
}

const ChildCategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { childCategories, totalPages, loading, error } = useSelector(
    (state: RootState) => state.fetchChildCategories
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ChildCategory | null>(null);

  useEffect(() => {
    dispatch(fetchChildCategories(currentPage));
  }, [dispatch, currentPage]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);

    dispatch(fetchChildCategories(currentPage));
  };

  const fetchData = useCallback((): ChildCategory[] => {
    let filteredData: ChildCategory[] = (childCategories || []).map(
      (cat: any) => ({
        id: cat.id,
        category: {
          id: cat.product_category?.id || "",
          name: cat.product_category?.name || "N/A",
        },
        subCategory: {
          id: cat.product_sub_category?.id || "",
          name: cat.product_sub_category?.name || "N/A",
        },
        childCategory: cat.name,
        slug: cat.slug,
        status: typeof cat.status === "boolean" ? cat.status : cat.status === 1,
      })
    );

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (cat) =>
          cat.childCategory.toLowerCase().includes(term) ||
          cat.category.name.toLowerCase().includes(term) ||
          cat.subCategory.name.toLowerCase().includes(term) ||
          cat.slug.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== null) {
      filteredData = filteredData.filter((cat) => cat.status === filterStatus);
    }
    filteredData.sort((a, b) => a.id - b.id);
    return filteredData;
  }, [childCategories, searchTerm, filterStatus]);

  const columns = [
    {
      key: "category",
      header: "Category",
      render: (item: ChildCategory) => (
        <span className="font-medium">{item.category.name}</span>
      ),
    },
    {
      key: "subCategory",
      header: "Sub Category",
      render: (item: ChildCategory) => (
        <span className="font-medium">{item.subCategory.name}</span>
      ),
    },
    {
      key: "childCategory",
      header: "Child Category",
      render: (item: ChildCategory) => (
        <span className="font-medium">{item.childCategory}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (item: ChildCategory) => (
        <span className="text-gray-600 font-mono">{item.slug}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ChildCategory) => {
        const statusColor = item.status
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {item.status ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: ChildCategory) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
            onClick={() => {
              setSelectedCategory(item);
              setIsModalOpen(true);
              console.log(item);
            }}
          >
            ✏️
          </button>
          <button className="text-red-600 hover:text-red-800" title="Delete">
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: null, label: "All" },
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
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
        <h1 className="text-2xl font-bold text-gray-800">Child Categories</h1>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(fetchChildCategories(currentPage))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Child Category
          </button>
        </div>
      </div>

      <CommonCustomTable<ChildCategory>
        data={fetchData()}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={(value: string) => setSearchTerm(value)}
        onFilter={(value: boolean | "") =>
          setFilterStatus(value === "" ? null : value)
        }
        filterOptions={filterOptions}
        title="Child Categories"
        isLoading={loading}
      />

      {/* Add Modal */}
      <AddChildCategoryModal
        isOpen={isModalOpen && selectedCategory === null}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Update Modal */}
      {selectedCategory && (
        <UpdateChildCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSuccess={handleSuccess}
          childCategory={{
            id: String(selectedCategory.id),
            name: selectedCategory.childCategory,
            slug: selectedCategory.slug,
            category: selectedCategory.category?.name,
            status: selectedCategory.status,
            subCategory: selectedCategory.subCategory?.name,
            product_category_id: selectedCategory.category.id,
            product_sub_category_id: selectedCategory.subCategory.id,
            icon: undefined, // You can update this if icon is included in the payload
          }}
        />
      )}
    </div>
  );
};

export default ChildCategoryPage;
