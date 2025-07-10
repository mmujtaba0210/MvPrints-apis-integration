interface ProductDetailsFormProps {
  register: any;
  errors: any;
}

export const ProductDetailsForm = ({
  register,
  errors,
}: ProductDetailsFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Detailed product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specifications
          </label>
          <textarea
            {...register("specifications")}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Product specifications"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Return/Refund Policy
          </label>
          <textarea
            {...register("returnPolicy")}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Return and refund policy"
          />
        </div>
      </div>
    </div>
  );
};