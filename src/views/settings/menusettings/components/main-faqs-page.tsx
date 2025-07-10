"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

interface Faq {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  faqs: Faq[];
}

interface FaqsContent {
  slogan: string;
  main_title: string;
  bg_image: string;
  categories: FaqCategory[];
}

const initialFaqsData: FaqsContent = {
  bg_image: "",
  main_title: "Frequently Asked Questions",
  slogan: "FAQS",
  categories: [
    {
      title: "Inquiry",
      faqs: [
        {
          question: "What is Flowbite?",
          answer: "Flowbite is an open-source library for Tailwind CSS...",
        },
        {
          question: "How can I get started with Flowbite?",
          answer: "You can start by installing it using npm or yarn...",
        },
      ],
    },
  ],
};

export default function FaqsSectionEditor() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FaqsContent>({
    defaultValues: initialFaqsData,
  });

  const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({
    control,
    name: "categories",
  });

  const {
    fields: faqs,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: `categories.${activeTab}.faqs`,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("bg_image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FaqsContent) => {
    console.log("Updated FAQs:", data);
  };

  const watchedValues = watch();

  return (
    <div className="min-h-max sm:min-w-[97%] mt-8 sm:m-8 p-8 bg-white w-auto rounded-2xl shadow-custom max-w-[100%]">
      <h1 className="text-4xl font-bold mb-8 border-b pb-2 text-black">
        Edit FAQs Section
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-md font-semibold ${
                activeTab === index
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              {category.title || `Category ${index + 1}`}
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              appendCategory({
                title: `New Category ${categories.length + 1}`,
                faqs: [
                  { question: "", answer: "" },
                  { question: "", answer: "" },
                ],
              })
            }
            className="px-4 py-2 border rounded-md bg-green-500 text-white"
          >
            + Add Category
          </button>
          {categories.length > 1 && (
            <button
              type="button"
              onClick={() => {
                removeCategory(activeTab);
                setActiveTab((prev) => (prev > 0 ? prev - 1 : 0));
              }}
              className="px-4 py-2 border rounded-md bg-red-500 text-white"
            >
              🗑 Remove
            </button>
          )}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="slogan" className="block font-semibold text-gray-600 mb-2 ">
              Slogan
            </label>
            <input
              id="slogan"
              {...register("slogan", { required: "Slogan is required" })}
              placeholder="Enter Slogan"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.slogan && (
              <div className="text-red-500 text-sm mt-1">{errors.slogan.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="main_title" className="block font-semibold text-gray-600 mb-2">
              Main Title
            </label>
            <input
              id="main_title"
              {...register("main_title", { required: "Main title is required" })}
              placeholder="Enter Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.main_title && (
              <div className="text-red-500 text-sm mt-1">{errors.main_title.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="bg_image" className="block font-semibold text-gray-600 mb-2">
              Upload Image
            </label>
            <input
              id="bg_image"
              type="file"
              accept="image/*"
              className="file:px-2 file:rounded-md file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 text-black"
              onChange={handleImageUpload}
            />
            {watchedValues.bg_image && (
              <Image
                src={watchedValues.bg_image}
                alt="Background"
                width={300}
                height={200}
                className="mt-4 rounded-md"
              />
            )}
          </div>
        </section>

        <div className="mt-6">
          <label
            htmlFor={`categories.${activeTab}.title`}
            className="block font-semibold text-gray-600 mb-2"
          >
            Edit Category Title
          </label>
          <input
            id={`categories.${activeTab}.title`}
            {...register(`categories.${activeTab}.title`, {
              required: "Category title is required",
            })}
            placeholder="Enter category title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.categories?.[activeTab]?.title && (
            <div className="text-red-500 text-sm mt-1">
              {errors.categories[activeTab]?.title?.message}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faq.id}
              className="p-4 border rounded-md bg-gray-100 relative"
            >
              <h3 className="font-semibold mb-2 text-black">FAQ {faqIndex + 1}</h3>
              <div className="mb-4">
                <label
                  htmlFor={`categories.${activeTab}.faqs.${faqIndex}.question`}
                  className="block font-semibold text-gray-600 mb-2"
                >
                  Question
                </label>
                <input
                  id={`categories.${activeTab}.faqs.${faqIndex}.question`}
                  {...register(`categories.${activeTab}.faqs.${faqIndex}.question`, {
                    required: "Question is required",
                  })}
                  placeholder="Enter question"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                />
                {errors.categories?.[activeTab]?.faqs?.[faqIndex]?.question && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.categories[activeTab]?.faqs[faqIndex]?.question?.message}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor={`categories.${activeTab}.faqs.${faqIndex}.answer`}
                  className="block font-semibold text-gray-600 mb-2"
                >
                  Answer
                </label>
                <textarea
                  id={`categories.${activeTab}.faqs.${faqIndex}.answer`}
                  {...register(`categories.${activeTab}.faqs.${faqIndex}.answer`, {
                    required: "Answer is required",
                  })}
                  placeholder="Enter answer"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
                />
                {errors.categories?.[activeTab]?.faqs?.[faqIndex]?.answer && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.categories[activeTab]?.faqs[faqIndex]?.answer?.message}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFaq(faqIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                disabled={faqs.length <= 1}
                title="Remove FAQ"
              >
                <MdDeleteForever className="text-red-600 text-3xl" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => appendFaq({ question: "", answer: "" })}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            + Add FAQ
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
               Add Banner
            </button>
        </div>
      </form>
    </div>
  );
}