import { TableColumnConfig, CustomerStatus } from '@/app/customer/types/customerTypes';

export const tableConfigurations: TableColumnConfig = {
  all: [
    { header: 'Customer ID', field: 'id' },
    { header: 'Name', field: 'name', type: 'avatar' },
    { header: 'Email', field: 'email' },
    { header: 'Join Date', field: 'joinDate', type: 'date' },
    { header: 'Status', field: 'status', type: 'badge' },
    { header: 'Total Spent', field: 'totalSpent', type: 'currency' },
  ],
  banned: [
    { header: 'Customer ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Ban Date', field: 'lastPurchase', type: 'date' },
    { header: 'Reason', field: 'notes' },
    { header: 'Total Orders', field: 'totalOrders' },
  ],
  // subscription: [
  //   { header: 'Customer ID', field: 'id' },
  //   { header: 'Name', field: 'name' },
  //   { header: 'Plan', field: 'subscriptionPlan' },
  //   { header: 'Expiry Date', field: 'subscriptionExpiry', type: 'date' },
  //   { header: 'Status', field: 'status', type: 'badge' },
  //   { header: 'Total Spent', field: 'totalSpent', type: 'currency' },
  // ],
  // affiliate_withdrawal: [
  //   { header: 'Customer ID', field: 'id' },
  //   { header: 'Name', field: 'name' },
  //   { header: 'Balance', field: 'affiliateBalance', type: 'currency' },
  //   { header: 'Last Withdrawal', field: 'lastWithdrawal', type: 'date' },
  //   { header: 'Withdrawal Amount', field: 'totalSpent', type: 'currency' },
  //   { header: 'Status', field: 'status', type: 'badge' },
  // ],
  // transaction: [
  //   { header: 'Customer ID', field: 'id' },
  //   { header: 'Name', field: 'name' },
  //   { header: 'Last Transaction', field: 'lastTransaction', type: 'date' },
  //   { header: 'Amount', field: 'totalSpent', type: 'currency' },
  //   { header: 'Total Orders', field: 'totalOrders' },
  //   { header: 'Status', field: 'status', type: 'badge' },
  // ],
  // verification: [
  //   { header: 'Customer ID', field: 'id' },
  //   { header: 'Name', field: 'name' },
  //   { header: 'Verification Status', field: 'verificationStatus', type: 'badge' },
  //   { header: 'Submitted Date', field: 'joinDate', type: 'date' },
  //   { header: 'Documents', field: 'tags' }, // Assuming documents are stored in tags
  //   { header: 'Notes', field: 'notes' },
  // ],
};