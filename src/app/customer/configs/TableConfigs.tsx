import {
  TableColumnConfig,
  CustomerStatus,
} from "@/app/customer/types/customerTypes";

export const tableConfigurations: TableColumnConfig = {
  all: [
    { header: "Customer ID", field: "id" },
    { header: "Name", field: "name", type: "avatar" },
    { header: "Email", field: "email" },
    { header: "Join Date", field: "joinDate", type: "date" },
    { header: "Status", field: "status", type: "badge" },
    { header: "Total Spent", field: "totalSpent", type: "currency" },
  ],
  banned: [
    { header: "Customer ID", field: "id" },
    { header: "Name", field: "name" },
    { header: "Ban Date", field: "lastPurchase", type: "date" },
    { header: "Reason", field: "notes" },
    { header: "Total Orders", field: "totalOrders" },
  ],
  deactivated: [],
  active: [],
};
