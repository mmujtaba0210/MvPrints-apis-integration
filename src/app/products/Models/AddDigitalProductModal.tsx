"use client";

import DigitalProductModal from "../components/DigitalProductComponents/AddProductModal/DigitalProductModal";
import ProductModal from "../pages/AddProductModal/ProductModal";

interface AddProductModalProps {
  isOpen: boolean;
  initialValues?: any;
  mode: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddDigitalProductModal = ({
  isOpen,
  onClose,
  mode,
  onSuccess,
  initialValues,
}: AddProductModalProps) => {
  return (
    <DigitalProductModal
      open={isOpen}
      mode={mode}
      onClose={onClose}
      isEditMode={false}
      initialValues={initialValues}
    />
  );
};
