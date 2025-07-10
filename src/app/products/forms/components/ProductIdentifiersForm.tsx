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
        <CustomInput
          label="Product SKU"
          name="sku"
          register={register}
          required
          placeholder="Enter SKU"
          errors={errors}
        />

        <CustomInput
          label="Manufacturer"
          name="manufacturer"
          register={register}
          required
          placeholder="Enter manufacturer"
          errors={errors}
        />

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