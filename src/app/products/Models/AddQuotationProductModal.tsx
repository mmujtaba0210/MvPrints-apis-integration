"use client";

import QuotationProductModal from "../components/QuotationProductComponents/AddProductModal/ProductModal";

interface AddProductModalProps {
  isOpen: boolean;
  initialValues?: any;
  mode: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddQuotationProductModal = ({
  isOpen,
  onClose,
  mode,
  onSuccess,
  initialValues,
}: AddProductModalProps) => {
  return (
    <QuotationProductModal
      open={isOpen}
      mode={mode}
      onClose={onClose}
      isEditMode={false}
      initialValues={initialValues}
    />
  );
};
