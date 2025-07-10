// types/couponTypes.ts
export interface Coupon {
  id: number;
  code: string;
  type: "Percentage" | "Fixed";
  amount: string;
  used: string;
  status: "Active" | "Inactive" | "Expired";
}