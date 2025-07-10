import { FilterOption, OrderStatus } from '@/app/orders/types/OrderTypes';

export const filters: FilterOption[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Declined', value: 'declined' },
  { label: 'Return Requests', value: 'return' },
  { label: 'Order Replacement', value: 'replacement' },
];