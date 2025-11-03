"use client";

import React, { useState, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useFormikContext } from "formik";

interface StepSEOProps {
  formik: any;
}

export default function StepSEO({ formik }: StepSEOProps) {
  const { values, setFieldValue } = formik || useFormikContext();

  // Initialize states from nested seo object
  const [metaTags, setMetaTags] = useState<string[]>(
    values?.seo?.meta_tags || []
  );
  const [tags, setTags] = useState<string[]>(values?.seo?.tags || []);

  // ✅ Add Tag Handler (Meta or Tag)
  const handleTagKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    type: "meta" | "tag"
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = (e.target as HTMLInputElement).value.trim();

      if (!input) return;

      if (type === "meta" && !metaTags.includes(input)) {
        const updated = [...metaTags, input];
        setMetaTags(updated);
        setFieldValue("seo.meta_tags", updated);
      }

      if (type === "tag" && !tags.includes(input)) {
        const updated = [...tags, input];
        setTags(updated);
        setFieldValue("seo.tags", updated);
      }

      (e.target as HTMLInputElement).value = "";
    }
  };

  // ✅ Remove Tag
  const removeTag = (type: "meta" | "tag", index: number) => {
    if (type === "meta") {
      const updated = [...metaTags];
      updated.splice(index, 1);
      setMetaTags(updated);
      setFieldValue("seo.meta_tags", updated);
    } else {
      const updated = [...tags];
      updated.splice(index, 1);
      setTags(updated);
      setFieldValue("seo.tags", updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* ---------- TITLE + SLUG ---------- */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label className="block mb-1 font-medium">SEO Title</Label>
          <Input
            type="text"
            placeholder="Enter SEO title"
            value={values.seo?.title || ""}
            onChange={(e) => setFieldValue("seo.title", e.target.value)}
          />
        </div>

        <div>
          <Label className="block mb-1 font-medium">SEO Slug</Label>
          <Input
            type="text"
            placeholder="Enter SEO slug"
            value={values.seo?.slug || ""}
            onChange={(e) => setFieldValue("seo.slug", e.target.value)}
          />
        </div>
      </main>

      {/* ---------- KEYWORDS ---------- */}
      <div>
        <Label className="block mb-1 font-medium">SEO Keywords</Label>
        <Input
          type="text"
          placeholder="e.g. ecommerce, clothing, shoes"
          value={values.seo?.keywords || ""}
          onChange={(e) => setFieldValue("seo.keywords", e.target.value)}
        />
      </div>

      {/* ---------- META TAGS & TAGS ---------- */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Meta Tags */}
        <div>
          <Label className="block mb-2 font-medium">Meta Tags</Label>
          <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[44px]">
            {metaTags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag("meta", index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              type="text"
              onKeyDown={(e) => handleTagKeyPress(e, "meta")}
              placeholder="Press Enter or , to add"
              className="flex-1 outline-none border-none text-sm min-w-[100px]"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label className="block mb-2 font-medium">Tags</Label>
          <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[44px]">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag("tag", index)}
                  className="text-green-600 hover:text-green-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              type="text"
              onKeyDown={(e) => handleTagKeyPress(e, "tag")}
              placeholder="Press Enter or , to add"
              className="flex-1 outline-none border-none text-sm min-w-[100px]"
            />
          </div>
        </div>
      </main>

      {/* ---------- META DESCRIPTION ---------- */}
      <div>
        <Label className="block mb-1 font-medium">Meta Description</Label>
        <Textarea
          rows={4}
          placeholder="Enter meta description for better search visibility..."
          value={values.seo?.meta_description || ""}
          onChange={(e) =>
            setFieldValue("seo.meta_description", e.target.value)
          }
        />
      </div>
    </div>
  );
}
