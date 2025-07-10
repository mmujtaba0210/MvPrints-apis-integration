import { FilterOption, CustomerStatus } from '@/app/customer/types/customerTypes';

export const filters: FilterOption[] = [
  { label: 'All Customers', value: 'all' },
  { label: 'Banned Customers', value: 'banned' },
];