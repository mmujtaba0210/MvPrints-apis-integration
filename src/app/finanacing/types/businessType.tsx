export interface Business {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  percentage: string;
  allowedBalance: string;
  usedBalance: string;
  status: "Active" | "Block" | "Pending" | "Completed";
}

export interface BusinessVerification {
  businessName: string;
  businessEmail: string;
  description: string;
  status: "Verified" | "Pending" | "Rejected" | "In Review";
}

export interface BusinessPreferredVerification {
  businessName: string;
  businessEmail: string;
  description: string;
  status: "Verified" | "Pending" | "Rejected" | "In Review";
}