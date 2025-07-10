import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface CustomInputProps {
  label: string;
  name: string;
  register?: any;
  required?: boolean;
  placeholder: string;
  type?: string;
  errors?: any;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  validation?: Record<string, any>; // New validation prop
}

export const CustomInput = ({
  label,
  name,
  register,
  required = false,
  placeholder,
  type = "text",
  errors = {},
  value,
  className = "",
  onChange,
  containerClass = "",
  icon,
  disabled = false,
  autoComplete = "off",
  validation = {}, // Default empty object
}: CustomInputProps) => {
  // Helper function to get nested error
  const getError = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getError(errors, name);
  const hasError = Boolean(error);

  // Combine required with other validation rules if register exists
  const registerProps = register 
    ? register(name, { 
        required: required ? "This field is required" : false,
        ...validation 
      })
    : {};

  return (
    <div className={`space-y-2 ${containerClass}`}>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {hasError && (
          <span className="inline-flex items-center text-xs text-red-500">
            <FiAlertCircle className="mr-1" />
            {error.message || "This field is required"}
          </span>
        )}
      </div>
      
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`block w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${className}`}
          {...(register ? registerProps : {})}
        />
      </div>
    </div>
  );
};