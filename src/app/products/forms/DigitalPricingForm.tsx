import { CustomInput } from "@/common/customInputField";

interface DigitalPricingFormProps {
  register: any;
  errors: any;
}

export const DigitalPricingForm = ({
  register,
  errors,
}: DigitalPricingFormProps) => {
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
      </div>
    </div>
  );
};