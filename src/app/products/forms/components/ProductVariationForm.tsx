"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useWatch } from "react-hook-form";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField";

import { RootState, AppDispatch } from "@/redux/store/store";
import { fetchAttributes } from "@/redux/slices/Product/productAttributionSlice/fetchAttributesSlice";

interface ProductVariationFormProps {
  register: any;
  errors: any;
  control: any;
  setValue: any;
}

export const ProductVariationForm = ({
  register,
  errors,
  control,
  setValue,
}: ProductVariationFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // 🔹 Fetch attributes from Redux
  const { attributes, loading } = useSelector(
    (state: RootState) => state.fetchAttributes
  );

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  // 🔹 Watch selected attribute ID
  const selectedAttributeId = useWatch({
    control,
    name: "selectedAttributeId",
  });

  // 🔹 Find selected attribute object
  const selectedAttribute = attributes.find(
    (attr) => attr.id === Number(selectedAttributeId)
  );

  // 🔹 Field Arrays for sizes and dynamic attribute values
  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const {
    fields: attributeFields,
    append: addAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const { fields: valueFields, replace: replaceValues } = useFieldArray({
    control,
    name: "attributeValues",
  });

  // 🔹 When attribute changes, populate its values dynamically
  useEffect(() => {
    if (selectedAttribute) {
      const mappedValues = selectedAttribute.attribution_values.map((val) => ({
        value: val,
        price: "",
        price_type: "per_item",
      }));
      replaceValues(mappedValues);
    } else {
      replaceValues([]);
    }
  }, [selectedAttribute, replaceValues]);

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-900">Product Variation</h3>

      {/* ===========================
           Sizes Section (UNCHANGED)
      ============================ */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Sizes</h4>

        {sizeFields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-lg"
          >
            <CustomInput
              label="Size Name"
              name={`sizes.${index}.name`}
              placeholder="e.g. Small, Medium"
              register={register}
              required
              errors={errors}
            />

            <CustomInput
              label="Quantity"
              name={`sizes.${index}.qty`}
              placeholder="0"
              type="number"
              register={register}
              required
              errors={errors}
            />

            <div className="flex items-end gap-2">
              <CustomInput
                label="Price"
                name={`sizes.${index}.price`}
                placeholder="0.00"
                type="number"
                register={register}
                required
                errors={errors}
              />

              {sizeFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addSize({ name: "", qty: "", price: "" })}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="-ml-0.5 mr-2 h-4 w-4" />
          Add More Size
        </button>
      </div>

      {/* ===========================
           Attribute Section (UPDATED)
      ============================ */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Attributes</h4>

        {/* Select Attribute Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Attribute
          </label>
          <select
            {...register("selectedAttributeId")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select an Attribute --</option>
            {attributes.map((attr) => (
              <option key={attr.id} value={attr.id}>
                {attr.name}
              </option>
            ))}
          </select>
          {loading && (
            <p className="text-sm text-gray-500 mt-1">Loading attributes...</p>
          )}
        </div>

        {/* Show Dynamic Attribute Values */}
        {selectedAttribute && valueFields.length > 0 && (
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-700">
              {selectedAttribute.name} Values
            </h5>

            {valueFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-lg"
              >
                <CustomInput
                  label="Value"
                  name={`attributeValues.${index}.value`}
                  placeholder="Value"
                  register={register}
                  errors={errors}
                />

                <CustomInput
                  label="Price"
                  name={`attributeValues.${index}.price`}
                  placeholder="0.00"
                  type="number"
                  register={register}
                  errors={errors}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Type
                  </label>
                  <select
                    {...register(`attributeValues.${index}.price_type`)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="per_item">Per Item</option>
                    <option value="whole_order">Whole Order</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
