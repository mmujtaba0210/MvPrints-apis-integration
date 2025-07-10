// types/quotation.ts
export interface Quotation {
  id: number;
  name: string;
  avatar: string;
  quoteNo: string;
  date: string;
  price: string;
  status: "Active" | "Block" | "Pending" | "Completed";
}