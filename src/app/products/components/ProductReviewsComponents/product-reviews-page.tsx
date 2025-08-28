"use client";

import React, { useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

type ReviewStatus = "Published" | "Pending" | "Flagged" | "Deleted";

interface ApiProductReview {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  review: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  product: Product;
  user: User;
}

const API_ENDPOINT = "https://testbackend.mecarviprints.com/api/admin/product-reviews";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const ProductReviewsPage = () => {
  const apiHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  };

  const apiAction = async (url: string, method: string, body?: Record<string, any>) => {
    if (!API_TOKEN) {
      throw new Error("API token is not set.");
    }

    const options: RequestInit = {
      method,
      headers: apiHeaders,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to ${method.toLowerCase()}: ${response.statusText}`);
    }
    
    return response.json();
  };

  const fetchData = useCallback(async () => {
    try {
      const result = await apiAction(API_ENDPOINT, "GET");
      return result?.data ?? [];
    } catch (err) {
      console.error("Failed to fetch product reviews:", err);
      toast.error("Failed to load reviews. Please try again.");
      return [];
    }
  }, []);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    isLoading,
    error,
    reload,
  } = useTableData<ApiProductReview>(
    fetchData,
    ["product.name", "user.name", "review", "status"],
    "status"
  );

  const handleAction = async (action: 'delete' | 'approve', id: number) => {
    const isConfirmed = window.confirm(`Are you sure you want to ${action} this review?`);
    if (!isConfirmed) return;

    try {
      if (action === 'delete') {
        await apiAction(`${API_ENDPOINT}/${id}`, "DELETE");
        toast.success("Review deleted successfully!");
      } else if (action === 'approve') {
        await apiAction(`${API_ENDPOINT}/${id}`, "PATCH", { status: "Published" });
        toast.success("Review approved successfully!");
      }
      reload();
    } catch (err) {
      console.error(`Failed to ${action} review:`, err);
      toast.error(`Failed to ${action} review. Please try again.`);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="gold" />
                <stop offset="50%" stopColor="#ccc" />
              </linearGradient>
            </defs>
            <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const columns = [
    { key: "id", header: "ID", width: "80px" },
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (item: ApiProductReview) => (
        <div className="flex items-center gap-3">
          <img src="https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY" alt={item.product.name} className="w-10 h-10 rounded-md object-cover" />
          <span className="font-medium">{item.product.name}</span>
        </div>
      ),
    },
    {
      key: "user",
      header: "Customer",
      width: "150px",
      render: (item: ApiProductReview) => (
        <div className="flex items-center gap-2">
          <img src="/images/placeholder_avatar.https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY" alt={item.user.name} className="w-8 h-8 rounded-full object-cover" />
          <span>{item.user.name}</span>
        </div>
      ),
    },
    {
      key: "review",
      header: "Review",
      width: "300px",
      render: (item: ApiProductReview) => (
        <div>
          <div className="mb-1">{renderRating(item.rating)}</div>
          <div className="text-sm text-gray-600 line-clamp-2">{item.review}</div>
        </div>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      width: "160px",
      render: (item: ApiProductReview) => (
        <span className="text-gray-600">{formatDate(item.created_at)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "160px",
      render: (item: ApiProductReview) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Published" ? "bg-green-100 text-green-600"
              : item.status === "Pending" ? "bg-yellow-100 text-yellow-600"
                : item.status === "Flagged" ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      render: (item: ApiProductReview) => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800" title="View Details">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
          {item.status === "Flagged" && (
            <button onClick={() => handleAction('approve', item.id)} className="text-green-600 hover:text-green-800" title="Approve">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {item.status !== "Deleted" && (
            <button onClick={() => handleAction('delete', item.id)} className="text-red-600 hover:text-red-800" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Published", label: "Published" },
    { value: "Pending", label: "Pending" },
    { value: "Flagged", label: "Flagged" },
    { value: "Deleted", label: "Deleted" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <button onClick={reload} className="absolute top-0 right-0 px-4 py-3 text-red-500">
            <span className="underline">Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Reviews</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          onClick={reload}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          )}
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      <CommonCustomTable<ApiProductReview>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Product Reviews"
      />
    </div>
  );
};

export default ProductReviewsPage;