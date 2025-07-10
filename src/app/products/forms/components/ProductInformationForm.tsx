import { CustomInput } from "@/common/customInputField";
import { FiChevronDown } from "react-icons/fi";

interface ProductInformationFormProps {
  control: any;
  register: any;
  errors: any;
  categories: any[];
  subCategories: any[];
  childCategories: any[];
  setValue: any;
}

export const ProductInformationForm = ({
  register,
  errors,
  categories,
  subCategories,
  childCategories,
  setValue,
}: ProductInformationFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Information</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CustomInput
          label="Product Name"
          name="productName"
          register={register}
          required
          placeholder="Enter product name"
          errors={errors}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Listing Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("listingType", { required: "Listing type is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select listing type</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
          {errors.listingType && (
            <p className="mt-1 text-sm text-red-600">{errors.listingType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Labels
          </label>
          <div className="flex flex-wrap gap-2">
            {['Featured', 'Best Seller', 'New Arrival', 'On Sale'].map(label => (
              <button
                key={label}
                type="button"
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  // Add logic to handle label selection
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("category", { required: "Category is required" })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sub Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("subCategory", { required: "Sub category is required" })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">Select sub category</option>
              {subCategories.map(subCat => (
                <option key={subCat.id} value={subCat.id}>
                  {subCat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.subCategory && (
            <p className="mt-1 text-sm text-red-600">{errors.subCategory.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Child Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("childCategory", { required: "Child category is required" })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">Select child category</option>
              {childCategories.map(childCat => (
                <option key={childCat.id} value={childCat.id}>
                  {childCat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.childCategory && (
            <p className="mt-1 text-sm text-red-600">{errors.childCategory.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};