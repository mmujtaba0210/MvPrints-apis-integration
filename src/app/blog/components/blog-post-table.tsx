"use client";

import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { useForm } from "react-hook-form";
import AddBlogPostModal from "../models/AddBlogPostModal";

interface BlogPost {
  id: number;
  featuredImage: string;
  title: string;
  slug: string;
  views: number;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  publishedDate: string;
}

const mockCategories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Business" },
  { id: "3", name: "Lifestyle" },
];

const mockData: BlogPost[] = [
  {
    id: 1,
    featuredImage: "/images/chair1.jpg",
    title: "The Future of Artificial Intelligence",
    slug: "future-of-ai",
    views: 12453,
    category: "Technology",
    status: "Published",
    publishedDate: "2023-05-15",
  },
  {
    id: 2,
    featuredImage: "/images/chair1.jpg",
    title: "Top 10 Destinations for Digital Nomads",
    slug: "digital-nomad-destinations",
    views: 8765,
    category: "Travel",
    status: "Published",
    publishedDate: "2023-06-22",
  },
  {
    id: 3,
    featuredImage: "/images/chair1.jpg",
    title: "Easy Vegan Recipes for Beginners",
    slug: "vegan-recipes-beginners",
    views: 5432,
    category: "Food & Recipes",
    status: "Published",
    publishedDate: "2023-07-10",
  },
];

const BlogPostsTable = () => {
  const fetchData = React.useCallback(() => mockData, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
     const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
     const handleFormSubmit = (data: any) => {
    // Here you would call your API to create the blog post
    console.log("Form data to submit:", data);
    
    // After successful submission:
    handleSuccess();
  };

  const handleSuccess = () => {
    console.log("Blog post created successfully!");
    setIsModalOpen(false);
    reset(); // Reset form fields
    // Add any additional success handling here (e.g., refresh data, show toast)
  };

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    error,
    reload,
  } = useTableData<BlogPost>(
    fetchData,
    ["title", "category", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "featuredImage",
      header: "Featured Image",
      width: "120px",
      render: (item: BlogPost) => (
        <div className="relative w-20 h-20 rounded-md overflow-hidden">
          <Image 
            src={item.featuredImage} 
            alt={item.title}
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
      ),
    },
    {
      key: "title",
      header: "Post Title",
      width: "300px",
      render: (item: BlogPost) => (
        <div>
          <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">/{item.slug}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
              {item.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "views",
      header: "Views",
      width: "120px",
      render: (item: BlogPost) => (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className={`font-medium ${item.views > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
            {item.views.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "publishedDate",
      header: "Published",
      width: "150px",
      render: (item: BlogPost) => (
        <div className="text-sm text-gray-600">
          {item.status === "Published" ? (
            new Date(item.publishedDate).toLocaleDateString()
          ) : item.status === "Scheduled" ? (
            <span className="text-yellow-600">Scheduled: {new Date(item.publishedDate).toLocaleDateString()}</span>
          ) : (
            <span className="text-gray-400">Not published</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: BlogPost) => {
        const statusStyles = {
          Published: "bg-green-100 text-green-600",
          Draft: "bg-gray-100 text-gray-600",
          Scheduled: "bg-blue-100 text-blue-600",
        };
        
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: "options",
      header: "Options",
      width: "150px",
      render: (item: BlogPost) => (
        <div className="flex gap-2">
          <Link 
            href={`/blog/${item.slug}`}
            target="_blank"
            className="text-blue-600 hover:text-blue-800"
            title="View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          <button 
            className="text-purple-600 hover:text-purple-800"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Published", label: "Published" },
    { value: "Draft", label: "Draft" },
    { value: "Scheduled", label: "Scheduled" },
  ];

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        <button 
          onClick={reload}
          className="absolute top-0 right-0 px-4 py-3"
        >
          <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Blog Posts</h2>
        <button
           onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Post
        </button>
      </div>
      <CommonCustomTable<BlogPost>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Blog Posts Management"
      />

      <AddBlogPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        register={register}
        errors={errors}
        categories={mockCategories}
      />

      {/* Hidden form for submission handling */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="hidden">
        <button type="submit" id="hidden-submit-button"></button>
      </form>
    </div>
  );
};

export default BlogPostsTable;