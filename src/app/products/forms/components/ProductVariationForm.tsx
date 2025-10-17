import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Size {
  name: string;
  qty: string;
  price: string;
}

interface Attribute {
  name: string;
  options: string[];
}

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
  // Default one size & one attribute with one option input
  const [sizes, setSizes] = useState<Size[]>([
    { name: "", qty: "", price: "" },
  ]);
  const [attributes, setAttributes] = useState<Attribute[]>([
    { name: "", options: [] },
  ]);

  const [optionInputs, setOptionInputs] = useState<{ [key: number]: string }>({
    0: "",
  });

  // --- Size Handlers ---
  const addSize = () => {
    setSizes([...sizes, { name: "", qty: "", price: "" }]);
  };

  const removeSize = (index: number) => {
    const updated = [...sizes];
    updated.splice(index, 1);
    setSizes(updated);
  };

  const handleSizeChange = (
    index: number,
    field: keyof Size,
    value: string
  ) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  // --- Attribute Handlers ---
  const addAttribute = () => {
    const updated = [...attributes, { name: "", options: [] }];
    setAttributes(updated);
    setOptionInputs({ ...optionInputs, [updated.length - 1]: "" });
  };

  const removeAttribute = (index: number) => {
    const updated = [...attributes];
    updated.splice(index, 1);
    setAttributes(updated);
  };

  const handleAttributeNameChange = (index: number, value: string) => {
    const updated = [...attributes];
    updated[index].name = value;
    setAttributes(updated);
  };

  const handleOptionInputChange = (index: number, value: string) => {
    setOptionInputs({ ...optionInputs, [index]: value });
  };

  const handleAddOption = (index: number) => {
    const newOption = optionInputs[index]?.trim();
    if (!newOption) return;
    const updated = [...attributes];
    updated[index].options.push(newOption);
    setAttributes(updated);
    setOptionInputs({ ...optionInputs, [index]: "" });
  };

  const handleRemoveOption = (attrIndex: number, optionIndex: number) => {
    const updated = [...attributes];
    updated[attrIndex].options.splice(optionIndex, 1);
    setAttributes(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Variation</h3>

      {/* Sizes Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Sizes</h4>

        {sizes.map((size, index) => (
          <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size Name
              </label>
              <input
                type="text"
                value={size.name}
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
                placeholder="e.g. Small, Medium"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={size.qty}
                onChange={(e) => handleSizeChange(index, "qty", e.target.value)}
                placeholder="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={size.price}
                  onChange={(e) =>
                    handleSizeChange(index, "price", e.target.value)
                  }
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSize}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="-ml-0.5 mr-2 h-4 w-4" />
          Add More Size
        </button>
      </div>

      {/* Attributes Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Attributes</h4>

        {attributes.map((attr, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeNameChange(index, e.target.value)
                }
                placeholder="Attribute Name (e.g. Color)"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {attributes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addAttribute}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="-ml-0.5 mr-2 h-4 w-4" />
          Attribute
        </button>
      </div>
    </div>
  );
};
