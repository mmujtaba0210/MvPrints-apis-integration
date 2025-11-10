"use client";

import ProductModal from "../pages/AddProductModal/ProductModal";

interface AddProductModalProps {
  isOpen: boolean;
  initialValues?: any;
  mode: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProductModal = ({
  isOpen,
  onClose,
  mode,
  onSuccess,
  initialValues,
}: AddProductModalProps) => {
  return (
    <ProductModal
      open={isOpen}
      mode={mode}
      onClose={onClose}
      isEditMode={false}
      initialValues={initialValues}
    />
  );
};
