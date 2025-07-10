export type CustomerStatus = 
  | 'all' 
  | 'banned' 

export type Customer = {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
  affiliateBalance?: number;
  lastWithdrawal?: string;
  lastTransaction?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  lastPurchase?: string;
  tier?: string;
  location?: string;
  phone?: string;
  notes?: string;
  tags?: string[];
  avatar?: string;
};

export type FilterOption = {
  label: string;
  value: CustomerStatus;
};

export type TableColumn = {
  header: string;
  field: string;
  type?: 'text' | 'badge' | 'progress' | 'date' | 'avatar' | 'currency';
  filterable?: boolean;
};

export type TableColumnConfig = {
  [key in CustomerStatus]: TableColumn[];
};