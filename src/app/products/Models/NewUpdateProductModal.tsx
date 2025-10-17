import { AddProductForm } from "../forms/main-add-product-form";

const UpdateProductModal = ({ isOpen, product, onClose, onUpdate }: any) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-2xl bg-opacity-40 flex justify-center items-center z-50">
      <h1 className="flex justify-end text-3xl" onClick={onClose}>
        X
      </h1>
      <div className="bg-white p-6 rounded-lg w-[80%] max-h-[90vh] overflow-y-auto">
        <AddProductForm
          mode="update"
          defaultValues={product}
          onSuccess={onUpdate}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default UpdateProductModal;
