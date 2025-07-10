import { TableColumnConfig, OrderStatus } from '@/app/orders/types/OrderTypes';

export const tableConfigurations: TableColumnConfig = {
  all: [
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Date', field: 'date', type: 'date' },
    { header: 'Status', field: 'status', type: 'badge' },
    { header: 'Amount', field: 'amount', type: 'text' },
  ],
  pending: [
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Pending Since', field: 'date', type: 'date' },
    { header: 'Days Pending', field: 'daysPending' },
    { header: 'Amount', field: 'amount' },
    { header: 'Urgency', field: 'urgency', type: 'badge' },
  ],
  processing: [
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Started Processing', field: 'date', type: 'date' },
    { header: 'Current Stage', field: 'stage', type: 'badge' },
    { header: 'Progress', field: 'progress', type: 'progress' },
  ],
  completed: [
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Completion Date', field: 'date', type: 'date' },
    { header: 'Rating', field: 'rating' },
    { header: 'Amount', field: 'amount' },
  ],
  cancelled: [
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Cancellation Date', field: 'date', type: 'date' },
    { header: 'Reason', field: 'reason' },
    { header: 'Refund Status', field: 'refundStatus', type: 'badge' },
  ],
  declined: [
    { header: 'Refund ID', field: 'refundId' },
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Amount', field: 'amount' },
    { header: 'Status', field: 'status', type: 'badge' },
    { header: 'Request Date', field: 'date', type: 'date' },
  ],
  return: [
    { header: 'Return ID', field: 'returnId' },
    { header: 'Order ID', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Items', field: 'items' },
    { header: 'Status', field: 'status', type: 'badge' },
    { header: 'Request Date', field: 'date', type: 'date' },
  ],
  replacement: [
    { header: 'Replacement ID', field: 'replacementId' },
    { header: 'Original Order', field: 'id' },
    { header: 'Customer', field: 'customer' },
    { header: 'Status', field: 'status', type: 'badge' },
    { header: 'Request Date', field: 'date', type: 'date' },
  ],
};