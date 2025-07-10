export interface LoyalityPointsManagement {
  id: number;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  totalPoints: number;
  pointsBalance: number;
  status: "Active" | "Inactive" | "Suspended" | "Expired";
}