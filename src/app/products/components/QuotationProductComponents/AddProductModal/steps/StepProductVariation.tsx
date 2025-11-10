"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, Trash } from "lucide-react";
import { fetchAttributes } from "@/redux/slices/Product/productAttributionSlice/fetchAttributesSlice";

const StepProductVariation = ({ formik }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { attributes, loading } = useSelector(
    (state: RootState) => state.fetchAttributes
  );
  const { values, setFieldValue } = formik;

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  // ---------- SIZES (VARIATIONS) ----------
  const addSize = () => {
    setFieldValue("variations", [
      ...(values.variations || []),
      { id: null, name: "", quantity: "", price: "" },
    ]);
  };

  const removeSize = (index: number) => {
    const updated = [...values.variations];
    updated.splice(index, 1);
    setFieldValue("variations", updated);
  };

  // ---------- ATTRIBUTES ----------
  const addAttribute = () => {
    setFieldValue("attributions", [
      ...(values.attributions || []),
      {
        id: "",
        name: "",
        description: "",
        values: [],
        selected_options: { value: "", price: "", price_type: "" },
      },
    ]);
  };

  const removeAttribute = (index: number) => {
    const updated = [...values.attributions];
    updated.splice(index, 1);
    setFieldValue("attributions", updated);
  };

  const handleAttributeSelect = (attrId: number, index: number) => {
    const selectedAttr = attributes.find((a: any) => a.id === Number(attrId));
    const updated = [...values.attributions];
    updated[index] = {
      id: attrId,
      name: selectedAttr?.name || "",
      description: selectedAttr?.description || "",
      values: selectedAttr?.attribution_values || [],
      selected_options: {
        value: "",
        price: "",
        price_type: "",
      },
    };
    setFieldValue("attributions", updated);
  };

  return (
    <div className="space-y-6">
      {/* ---------- SIZE (VARIATION) SECTION ---------- */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Sizes / Variations</h2>
        {(values.variations || []).map((variation: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-3 mb-3 items-center border-b pb-2"
          >
            <Input
              placeholder="Size Name"
              value={variation.name}
              onChange={(e) =>
                setFieldValue(`variations[${index}].name`, e.target.value)
              }
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={variation.quantity}
              onChange={(e) =>
                setFieldValue(`variations[${index}].quantity`, e.target.value)
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={variation.price}
              onChange={(e) =>
                setFieldValue(`variations[${index}].price`, e.target.value)
              }
            />
            <Button variant="destructive" onClick={() => removeSize(index)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addSize} variant="primary">
          + Add Size
        </Button>
      </div>

      {/* ---------- ATTRIBUTE SECTION ---------- */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Attributes</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : (
          <>
            {(values.attributions || []).map((attr: any, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-4 bg-muted/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <Select
                    value={attr.id?.toString() || ""}
                    onValueChange={(val) =>
                      handleAttributeSelect(Number(val), index)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Attribute" />
                    </SelectTrigger>
                    <SelectContent>
                      {attributes?.map((a: any) => (
                        <SelectItem key={a.id} value={a.id.toString()}>
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="destructive"
                    onClick={() => removeAttribute(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>

                {/* Attribute Description */}
                {attr.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {attr.description}
                  </p>
                )}

                {/* Values Section */}
                {attr.values?.length > 0 && (
                  <div className="mt-3">
                    <label className="text-sm font-medium">Select Value:</label>
                    <Select
                      value={attr.selected_options?.value || ""}
                      onValueChange={(val) =>
                        setFieldValue(
                          `attributions[${index}].selected_options.value`,
                          val
                        )
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose Value" />
                      </SelectTrigger>
                      <SelectContent>
                        {attr.values.map((v: any, valIndex: number) => (
                          <SelectItem key={valIndex} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <Input
                        placeholder="Price"
                        type="number"
                        value={attr.selected_options?.price || ""}
                        onChange={(e) =>
                          setFieldValue(
                            `attributions[${index}].selected_options.price`,
                            e.target.value
                          )
                        }
                      />
                      <Select
                        value={attr.selected_options?.price_type || ""}
                        onValueChange={(type) =>
                          setFieldValue(
                            `attributions[${index}].selected_options.price_type`,
                            type
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Price Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per_item">Per Item</SelectItem>
                          <SelectItem value="whole_order">
                            Whole Order
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button onClick={addAttribute} variant="primary">
              + Add Attribute
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StepProductVariation;
