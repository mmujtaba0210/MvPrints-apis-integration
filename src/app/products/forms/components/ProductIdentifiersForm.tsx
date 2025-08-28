import { CustomInput } from "@/common/customInputField";

interface ProductIdentifiersFormProps {
  register: any;
  errors: any;
}

export const ProductIdentifiersForm = ({
  register,
  errors,
}: ProductIdentifiersFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Identifiers</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

        {/* ✅ Variant (Select Field) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Variant <span className="text-red-500">*</span>
          </label>
          <select
            {...register("variant", { required: "Variant is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select variant</option>
            <option value="per_item">Per Item</option>
            <option value="whole_order">Wholesale</option>
          </select>
          {errors.variant && (
            <p className="text-sm text-red-600">
              {errors.variant.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
