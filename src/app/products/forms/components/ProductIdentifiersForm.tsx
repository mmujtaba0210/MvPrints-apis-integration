import { CustomInput } from "@/common/customInputField";
import { RootState } from "@/redux/store/store";
import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";

interface ProductIdentifiersFormProps {
  register: any;
  errors: any;
}

export const ProductIdentifiersForm = ({
  register,
  errors,
}: ProductIdentifiersFormProps) => {
  const { brands } = useSelector((state: RootState) => state.fetchBrands);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl  font-bold text-gray-900">Product Identifiers</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Product Brand */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Brand <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("product_brand_id", {
                required: "Product brand is required",
              })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none"
            >
              <option value="">Select brand</option>
              {brands?.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.product_brand_id && (
            <p className="text-sm text-red-600">
              {errors.product_brand_id.message as string}
            </p>
          )}
        </div>
        {/* SKU */}
        <CustomInput
          label="Product SKU"
          name="sku"
          register={register}
          required
          placeholder="Enter SKU"
          errors={errors}
        />

        {/* Manufacturer */}
        <CustomInput
          label="Manufacturer"
          name="manufacturer"
          register={register}
          required
          placeholder="Enter manufacturer"
          errors={errors}
        />

        {/* Model */}
        <CustomInput
          label="Model"
          name="model"
          register={register}
          required
          placeholder="Enter model"
          errors={errors}
        />
      </div>
    </div>
  );
};
