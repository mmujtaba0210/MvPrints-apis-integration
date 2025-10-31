import { CustomInput } from "@/common/customInputField";

interface PricingFormProps {
  register: any;
  errors: any;
  allowWholesale: boolean;
  setAllowWholesale: (value: boolean) => void;
  watch: any; // ✅ to handle variant/wholesale logic dynamically
  setValue: any; // ✅ to sync state changes
}

export const PricingForm = ({
  register,
  errors,
  allowWholesale,
  setAllowWholesale,
  watch,
  setValue,
}: PricingFormProps) => {
  const selectedVariant = watch("varient");

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-900">Pricing</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* ✅ Variant (Select Field) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Variant <span className="text-red-500">*</span>
          </label>
          <select
            {...register("varient", { required: "Variant is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
            defaultValue={selectedVariant || ""}
            onChange={(e) => setValue("varient", e.target.value)}
          >
            <option value="">Select variant</option>
            <option value="per_item">Per Item</option>
            <option value="whole_order">Wholesale</option>
          </select>
          {errors.varient && (
            <p className="text-sm text-red-600">
              {errors.varient.message as string}
            </p>
          )}
        </div>

        {/* ✅ Default Retail Price */}
        <CustomInput
          label="Default Retail Price"
          name="price"
          register={register}
          required
          placeholder="0.00"
          type="number"
          errors={errors}
        />

        {/* ✅ Discount Amount */}
        <CustomInput
          label="Discount Amount"
          name="discount"
          register={register}
          placeholder="0.00"
          type="number"
          errors={errors}
        />

        {/* ✅ Stock Number */}
        <CustomInput
          label="Stock Number"
          name="stock"
          register={register}
          required
          placeholder="Enter stock quantity"
          type="number"
          errors={errors}
        />

        {/* ✅ Allow Wholesale Toggle */}
        <div className="flex items-center justify-between sm:col-span-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allow Wholesale
            </label>
            <p className="text-xs text-gray-500">Enable wholesale pricing</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allowWholesale}
              onChange={() => setAllowWholesale(!allowWholesale)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* ✅ Wholesale Fields (Visible if AllowWholesale is true) */}
        {allowWholesale && (
          <>
            <CustomInput
              label="Wholesale Quantity"
              name="wholesaleQuantity"
              register={register}
              placeholder="Minimum quantity"
              type="number"
              errors={errors}
            />

            <CustomInput
              label="Wholesale Price"
              name="wholesalePrice"
              register={register}
              placeholder="0.00"
              type="number"
              errors={errors}
            />
          </>
        )}
      </div>
    </div>
  );
};
