"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { getAllDeliveryTimes } from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";

interface StepShippingProps {
  formik: any;
}

export default function StepShipping({ formik }: StepShippingProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { deliveryTimes, loading } = useSelector(
    (state: RootState) => state.getAllDeliveryTimes
  );

  // ✅ Fetch delivery times on mount
  useEffect(() => {
    dispatch(getAllDeliveryTimes(1));
  }, [dispatch]);

  // ✅ Prefill logic: when deliveryTimes are fetched, set current delivery time if it exists
  useEffect(() => {
    if (
      deliveryTimes?.length > 0 &&
      formik.values.delivery_time &&
      !deliveryTimes.find(
        (time: any) => String(time.id) === String(formik.values.delivery_time)
      )
    ) {
      const matchedTime = deliveryTimes.find(
        (time: any) => String(time.id) === String(formik.values.delivery_time)
      );
      if (matchedTime) {
        formik.setFieldValue("delivery_time", String(matchedTime.id));
      }
    }
  }, [deliveryTimes, formik.values.delivery_time]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-3">Delivery</h3>

      <main className="grid grid-cols-1  gap-3">
        {/* ✅ Delivery Time Dropdown */}
        <div className="w-full">
          <Label className="block mb-1 font-medium">Delivery Time</Label>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin w-4 h-4" /> Loading delivery
              times...
            </div>
          ) : (
            <Select
              onValueChange={(value) =>
                formik.setFieldValue("delivery_time", value)
              }
              value={formik.values.delivery_time || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery time" />
              </SelectTrigger>
              <SelectContent>
                {deliveryTimes?.length > 0 ? (
                  deliveryTimes.map((time: any) => (
                    <SelectItem key={time.id} value={String(time.id)}>
                      {time.name
                        ? `${time.name} (${time.min_days}-${time.max_days} days)`
                        : `(${time.min_days}-${time.max_days} days)`}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="">
                    No delivery times found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </main>
    </div>
  );
}
