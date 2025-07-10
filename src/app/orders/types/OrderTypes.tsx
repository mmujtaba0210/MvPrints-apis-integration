export type OrderStatus = 
  | 'all' 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'cancelled' 
  | 'declined' 
  | 'return' 
  | 'replacement' 
  // | 'verification';

export type Order = {
  id: number;
  customer: string;
  date: string;
  status: string;
  amount: number;
  daysPending?: number;
  urgency?: string;
  stage?: string;
  progress?: number;
  rating?: string;
  reason?: string;
  refundStatus?: string;
  refundId?: string;
  returnId?: string;
  replacementId?: string;
  verificationId?: string;
  items?: string;
  documents?: string;
};

export type FilterOption = {
  label: string;
  value: OrderStatus;
};

export type TableColumnConfig = {
  [key in OrderStatus]: TableColumn[];
};

export type TableColumn = {
  header: string;
  field: string;
  type?: 'text' | 'badge' | 'progress' | 'date' | 'avatar' | 'currency';
};