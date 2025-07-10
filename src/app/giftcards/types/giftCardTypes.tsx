export interface GiftCard {
  id: number;
  customer: {
    name: string;
    avatar: string;
    email: string;
  };
  receiverName: string;
  orderDate: string;
  orderTotal: string;
  status: "Pending" | "Processed" | "Shipped" | "Delivered" | "Cancelled";
}

export interface GiftCardTransaction {
  id: number;
  senderName: string;
  senderAvatar: string;
  receiverName: string;
  orderNumber: string;
  orderDate: string;
  orderTotal: string;
  giftAmount: string;
  status: "Pending" | "Completed" | "Failed" | "Refunded" | "Expired";
}