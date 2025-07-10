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
  const [sizes, setSizes] = useState<Size[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newAttribute, setNewAttribute] = useState("");
  const [newOption, setNewOption] = useState("");

  const addSize = () => {
    setSizes([...sizes, { name: "", qty: "", price: "" }]);
  };

  const removeSize = (index: number) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = (index: number, field: keyof Size, value: string) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addAttribute = () => {
    if (newAttribute.trim()) {
      setAttributes([...attributes, { name: newAttribute, options: [] }]);
      setNewAttribute("");
    }
  };

  const addOption = (attrIndex: number) => {
    if (newOption.trim()) {
      const newAttributes = [...attributes];
      newAttributes[attrIndex].options.push(newOption);
      setAttributes(newAttributes);
      setNewOption("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Variation</h3>
      
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Sizes</h4>
        {sizes.map((size, index) => (
          <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Size Name</label>
              <input
                type="text"
                value={size.name}
                onChange={(e) => handleSizeChange(index, "name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size Qty</label>
              <input
                type="number"
                value={size.qty}
                onChange={(e) => handleSizeChange(index, "qty", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Size Price</label>
                <input
                  type="number"
                  value={size.price}
                  onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
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

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Attributes</h4>
        {attributes.map((attr, attrIndex) => (
          <div key={attrIndex} className="space-y-2 p-4 border border-gray-200 rounded-lg">
            <div className="font-medium">{attr.name}</div>
            <div className="flex flex-wrap gap-2">
              {attr.options.map((option, optionIndex) => (
                <span key={optionIndex} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {option}
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addOption(attrIndex)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newAttribute}
            onChange={(e) => setNewAttribute(e.target.value)}
            placeholder="Enter attribute name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addAttribute}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Attribute
          </button>
        </div>
      </div>
    </div>
  );
};