export type DateRangeOption = "Last 7 Days" | "Last 30 Days" | "Last 90 Days" | "Custom Range";

export type SalesMetricType = "revenue" | "orders" | "units";

export interface DashboardStats {
  totalRevenue: {
    amount: number;
    formatted: string;
    growthPercentage: number;
    trend: "up" | "down";
    comparisonPeriodText: string;
  };
  totalOrders: {
    count: number;
    formatted: string;
    growthPercentage: number;
    trend: "up" | "down";
  };
  todayOrders: {
    count: number;
    formatted: string;
    growthPercentage: number;
    trend: "up" | "down";
  };
  pendingOrders: {
    count: number;
    formatted: string;
  };
  totalProducts: {
    count: number;
    formatted: string;
    growthPercentage: number;
    trend: "up" | "down";
  };
  lowStock: {
    count: number;
    formatted: string;
    actionLabel: string;
    actionHref: string;
  };
}

export interface SalesChartPoint {
  date: string;
  revenue: number;
  orders: number;
  units: number;
}

export interface SalesOverviewData {
  totalRevenue: number;
  formattedTotalRevenue: string;
  growthPercentage: number;
  trend: "up" | "down";
  dataPoints: SalesChartPoint[];
}

export interface OrderStatusDistribution {
  name: string;
  key: "completed" | "processing" | "ready_for_pickup" | "pending" | "cancelled";
  percentage: number;
  count: number;
  color: string;
}

export interface OrderStatusData {
  totalOrders: number;
  formattedTotalOrders: string;
  distribution: OrderStatusDistribution[];
}

export type PaymentStatus = "Paid" | "COD" | "Failed" | "Pending";

export type OrderStatus = "Processing" | "Ready for Pickup" | "Completed" | "Pending" | "Cancelled";

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    initials: string;
    avatarBgColor?: string;
  };
  itemCount: number;
  formattedItems: string;
  amount: number;
  formattedAmount: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  date: string;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string;
  remainingQuantity: number;
  threshold: number;
  imageUrl?: string;
  category: string;
}

export interface ShopOwnerProfile {
  shopName: string;
  ownerName: string;
  role: string;
  avatarUrl?: string;
  notificationCount: number;
  unreadNotifications: boolean;
}
