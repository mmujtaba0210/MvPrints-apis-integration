import React from 'react';
import CustomTable from '@/common/customTableWithFilters';
import { Customer, CustomerStatus } from '@/app/customer/types/customerTypes';
import { tableConfigurations } from '@/app/customer/configs/TableConfigs';

interface CustomerTableProps {
  activeFilter: CustomerStatus;
  data: Customer[];
  onView: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;  // Added optional edit handler
  onDelete: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  activeFilter,
  data,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <CustomTable
        columns={tableConfigurations[activeFilter]}
        data={data}
        onView={onView as (row: any) => void}
        onEdit={onEdit ? (onEdit as (row: any) => void) : undefined}
        onDelete={onDelete as (row: any) => void}
      />
    </div>
  );
};

export default CustomerTable;