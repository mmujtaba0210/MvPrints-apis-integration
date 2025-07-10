interface EstimatedDeliveryFormProps {
  register: any;
  errors: any;
}

export const EstimatedDeliveryForm = ({
  register,
  errors,
}: EstimatedDeliveryFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Estimated Delivery</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Delivery Time <span className="text-red-500">*</span>
          </label>
          <select
            {...register("deliveryTime", { required: "Delivery time is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select delivery time</option>
            <option value="instant">Instant Download</option>
            <option value="1h">Within 1 Hour</option>
            <option value="24h">Within 24 Hours</option>
            <option value="custom">Custom Delivery Time</option>
          </select>
          {errors.deliveryTime && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryTime.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};