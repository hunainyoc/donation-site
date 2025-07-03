/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Donation website types
 */
export interface Appeal {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  goal: number;
  raised: number;
  urgency: "low" | "medium" | "high" | "critical";
  featured: boolean;
  location: string;
  createdAt: string;
  endDate?: string;
}

export interface DonationItem {
  appealId: string;
  amount: number;
  quantity: number;
  frequency: "onetime" | "monthly" | "yearly";
  appeal: Appeal;
}

export interface Cart {
  items: DonationItem[];
  total: number;
}

export interface DonationRequest {
  items: DonationItem[];
  donorInfo: {
    name: string;
    email: string;
    anonymous?: boolean;
  };
  paymentMethod: "card" | "paypal" | "bank";
}
