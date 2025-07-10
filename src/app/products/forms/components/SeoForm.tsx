import { CustomInput } from "./../../../../common/customInputField";

interface SEOFormProps {
  register: any;
  errors: any;
}

export const SEOForm = ({
  register,
  errors,
}: SEOFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">SEO</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CustomInput
          label="Title"
          name="seoTitle"
          register={register}
          placeholder="SEO title"
          errors={errors}
        />

        <CustomInput
          label="Slug"
          name="slug"
          register={register}
          placeholder="product-slug"
          errors={errors}
        />

        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            {...register("keywords")}
            placeholder="comma, separated, keywords"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500">Separate keywords with commas</p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Meta Tags
          </label>
          <textarea
            {...register("metaTags")}
            rows={2}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Meta tags"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            {...register("tags")}
            placeholder="tag1, tag2, tag3"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500">Separate tags with commas</p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            {...register("metaDescription")}
            rows={4}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Meta description for search engines"
          />
        </div>
      </div>
    </div>
  );
};