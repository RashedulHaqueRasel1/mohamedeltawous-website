export interface SubscriptionInfo {
  tier: string;
  isActive: boolean;
  availableCredits: number;
  totalCredits: number;
  usedCredits: number;
  expiryDate: string | null;
}

export interface PaymentRecord {
  paymentId: string;
  tier: string;
  amount: number;
  creditsAdded: number;
  currency: string;
  status: string;
  date: string;
}

export interface DashboardData {
  inviteesCount: number;
  invitees: string[];
  subscription: SubscriptionInfo | null;
  paymentHistory: PaymentRecord[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
