import { CustomInput } from "@/common/customInputField";

interface PricingFormProps {
  register: any;
  errors: any;
  allowWholesale: boolean;
  setAllowWholesale: (value: boolean) => void;
}

export const PricingForm = ({
  register,
  errors,
  allowWholesale,
  setAllowWholesale,
}: PricingFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CustomInput
          label="Default Retail Price"
          name="retailPrice"
          register={register}
          required
          placeholder="0.00"
          type="number"
          errors={errors}
        />

        <CustomInput
          label="Discount Amount"
          name="discountAmount"
          register={register}
          placeholder="0.00"
          type="number"
          errors={errors}
        />

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