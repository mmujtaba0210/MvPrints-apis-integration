"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllDeliveryTimes } from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";
import { CustomInput } from "@/common/customInputField";

interface ShippingFormProps {
  register: any;
  errors: any;
  freeShipping: boolean;
  setFreeShipping: (value: boolean) => void;
}

export const ShippingForm = ({
  register,
  errors,
  freeShipping,
  setFreeShipping,
}: ShippingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get delivery times from redux
  const { deliveryTimes, loading } = useSelector(
    (state: RootState) => state.getAllDeliveryTimes
  );

  useEffect(() => {
    dispatch(getAllDeliveryTimes(1));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Shipping</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Free Shipping toggle */}
        <div className="flex items-center justify-between sm:col-span-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Free Shipping
            </label>
            <p className="text-xs text-gray-500">
              Enable free shipping for this product
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={() => setFreeShipping(!freeShipping)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
              after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>

        {/* Delivery Time dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Delivery Time
          </label>
          <select
            {...register("deliveryTimeId", { required: true })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select delivery time</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              deliveryTimes.map((time: any) => (
                <option key={time.id} value={time.id}>
                  {time.min_days}-{time.max_days} days
                </option>
              ))
            )}
          </select>
          {errors.deliveryTimeId && (
            <p className="text-xs text-red-500">Delivery time is required</p>
          )}
        </div>

        {/* Shipping cost only if not free */}
        {!freeShipping && (
          <CustomInput
            label="Shipping Cost"
            name="shippingCost"
            register={register}
            placeholder="0.00"
            type="number"
            errors={errors}
          />
        )}

        {/* Shipping Location */}
        <div className="space-y-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Shipping Location
          </label>
          <select
            {...register("shippingLocation")}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select shipping location</option>
            <option value="worldwide">Worldwide</option>
            <option value="domestic">Domestic Only</option>
            <option value="specific">Specific Countries</option>
          </select>
        </div>
      </div>
    </div>
  );
};
