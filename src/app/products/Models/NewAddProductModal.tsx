import { AddProductForm } from "../forms/main-add-product-form";

export const AddProductModal = ({ isOpen, onClose, onSuccess }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <AddProductForm mode="add" onSuccess={onSuccess} onClose={onClose} />
      </div>
    </div>
  );
};
