import {
  DashboardStats,
  DateRangeOption,
  LowStockProduct,
  OrderStatusData,
  RecentOrder,
  SalesOverviewData,
  ShopOwnerProfile,
} from "@/types/shop-owner/dashboard.types";

/**
 * BuyBee Shop Owner Dashboard Service
 * Provides typed functions to retrieve shop owner analytics, orders, and inventory data.
 * Currently backed by verified dummy data matching the reference specifications;
 * structured for drop-in backend API endpoint replacement.
 */

// Dummy Data Store
const DUMMY_SHOP_PROFILE: ShopOwnerProfile = {
  shopName: "TechPlus Store",
  ownerName: "Rahul Sharma",
  role: "Shop Owner",
  notificationCount: 12,
  unreadNotifications: true,
};

const DUMMY_DASHBOARD_STATS: DashboardStats = {
  totalRevenue: {
    amount: 485320,
    formatted: "₹4,85,320",
    growthPercentage: 12.5,
    trend: "up",
    comparisonPeriodText: "vs previous period",
  },
  totalOrders: {
    count: 1248,
    formatted: "1,248",
    growthPercentage: 8.3,
    trend: "up",
  },
  todayOrders: {
    count: 36,
    formatted: "36",
    growthPercentage: 20.0,
    trend: "up",
  },
  pendingOrders: {
    count: 12,
    formatted: "12",
  },
  totalProducts: {
    count: 642,
    formatted: "642",
    growthPercentage: 4.1,
    trend: "up",
  },
  lowStock: {
    count: 18,
    formatted: "18",
    actionLabel: "View Products",
    actionHref: "/shop-owner/inventory?filter=low-stock",
  },
};

const DUMMY_SALES_OVERVIEW: Record<DateRangeOption, SalesOverviewData> = {
  "Last 7 Days": {
    totalRevenue: 142800,
    formattedTotalRevenue: "₹1,42,800",
    growthPercentage: 9.4,
    trend: "up",
    dataPoints: [
      { date: "24 Nov", revenue: 18000, orders: 12, units: 19 },
      { date: "25 Nov", revenue: 24500, orders: 16, units: 28 },
      { date: "26 Nov", revenue: 19200, orders: 14, units: 22 },
      { date: "27 Nov", revenue: 31000, orders: 22, units: 36 },
      { date: "28 Nov", revenue: 22800, orders: 17, units: 29 },
      { date: "29 Nov", revenue: 27300, orders: 20, units: 31 },
      { date: "30 Nov", revenue: 32500, orders: 25, units: 42 },
    ],
  },
  "Last 30 Days": {
    totalRevenue: 485320,
    formattedTotalRevenue: "₹4,85,320",
    growthPercentage: 12.5,
    trend: "up",
    dataPoints: [
      { date: "1 Nov", revenue: 52000, orders: 38, units: 58 },
      { date: "5 Nov", revenue: 68000, orders: 49, units: 76 },
      { date: "9 Nov", revenue: 94000, orders: 72, units: 110 },
      { date: "13 Nov", revenue: 76000, orders: 55, units: 84 },
      { date: "17 Nov", revenue: 118000, orders: 86, units: 132 },
      { date: "21 Nov", revenue: 89000, orders: 64, units: 98 },
      { date: "25 Nov", revenue: 134000, orders: 98, units: 154 },
      { date: "30 Nov", revenue: 172000, orders: 124, units: 190 },
    ],
  },
  "Last 90 Days": {
    totalRevenue: 1390450,
    formattedTotalRevenue: "₹13,90,450",
    growthPercentage: 15.2,
    trend: "up",
    dataPoints: [
      { date: "Sep W1", revenue: 85000, orders: 62, units: 95 },
      { date: "Sep W3", revenue: 98000, orders: 71, units: 112 },
      { date: "Oct W1", revenue: 122000, orders: 89, units: 140 },
      { date: "Oct W3", revenue: 145000, orders: 105, units: 168 },
      { date: "Nov W1", revenue: 160000, orders: 116, units: 184 },
      { date: "Nov W3", revenue: 192000, orders: 138, units: 220 },
    ],
  },
  "Custom Range": {
    totalRevenue: 485320,
    formattedTotalRevenue: "₹4,85,320",
    growthPercentage: 12.5,
    trend: "up",
    dataPoints: [
      { date: "1 Nov", revenue: 52000, orders: 38, units: 58 },
      { date: "5 Nov", revenue: 68000, orders: 49, units: 76 },
      { date: "9 Nov", revenue: 94000, orders: 72, units: 110 },
      { date: "13 Nov", revenue: 76000, orders: 55, units: 84 },
      { date: "17 Nov", revenue: 118000, orders: 86, units: 132 },
      { date: "21 Nov", revenue: 89000, orders: 64, units: 98 },
      { date: "25 Nov", revenue: 134000, orders: 98, units: 154 },
      { date: "30 Nov", revenue: 172000, orders: 124, units: 190 },
    ],
  },
};

const DUMMY_ORDER_STATUS: OrderStatusData = {
  totalOrders: 1248,
  formattedTotalOrders: "1,248",
  distribution: [
    {
      name: "Completed",
      key: "completed",
      percentage: 76,
      count: 948,
      color: "#F97316", // Primary Orange
    },
    {
      name: "Processing",
      key: "processing",
      percentage: 10,
      count: 124,
      color: "#171717", // Dark Black
    },
    {
      name: "Ready for Pickup",
      key: "ready_for_pickup",
      percentage: 6,
      count: 74,
      color: "#FFC928", // Primary Yellow
    },
    {
      name: "Pending",
      key: "pending",
      percentage: 5,
      count: 62,
      color: "#FB923C", // Light Amber/Orange
    },
    {
      name: "Cancelled",
      key: "cancelled",
      percentage: 3,
      count: 40,
      color: "#FED7AA", // Soft Peach
    },
  ],
};

const DUMMY_RECENT_ORDERS: RecentOrder[] = [
  {
    id: "ord_10458",
    orderNumber: "#BB10458",
    customer: {
      name: "Rahul Kumar",
      initials: "RK",
      avatarBgColor: "bg-[#FFC928] text-white",
    },
    itemCount: 2,
    formattedItems: "2 items",
    amount: 4998,
    formattedAmount: "₹4,998",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    date: "2026-11-26T04:30:00Z",
  },
  {
    id: "ord_10457",
    orderNumber: "#BB10457",
    customer: {
      name: "Sneha P",
      initials: "SP",
      avatarBgColor: "bg-[#F97316] text-white",
    },
    itemCount: 1,
    formattedItems: "1 item",
    amount: 1299,
    formattedAmount: "₹1,299",
    paymentStatus: "Paid",
    orderStatus: "Ready for Pickup",
    date: "2026-11-26T03:15:00Z",
  },
  {
    id: "ord_10456",
    orderNumber: "#BB10456",
    customer: {
      name: "Arjun R",
      initials: "AR",
      avatarBgColor: "bg-[#EA580C] text-white",
    },
    itemCount: 3,
    formattedItems: "3 items",
    amount: 7490,
    formattedAmount: "₹7,490",
    paymentStatus: "Paid",
    orderStatus: "Completed",
    date: "2026-11-25T18:40:00Z",
  },
  {
    id: "ord_10455",
    orderNumber: "#BB10455",
    customer: {
      name: "Meera Das",
      initials: "MD",
      avatarBgColor: "bg-[#FFC928] text-white",
    },
    itemCount: 1,
    formattedItems: "1 item",
    amount: 2199,
    formattedAmount: "₹2,199",
    paymentStatus: "COD",
    orderStatus: "Pending",
    date: "2026-11-25T14:10:00Z",
  },
];

const DUMMY_LOW_STOCK_PRODUCTS: LowStockProduct[] = [
  {
    id: "prod_001",
    name: "Wireless Headphones",
    sku: "TP-WH-001",
    remainingQuantity: 5,
    threshold: 10,
    imageUrl: "/products/headphones.svg",
    category: "Electronics",
  },
  {
    id: "prod_002",
    name: "USB-C Charging Cable",
    sku: "TP-CB-014",
    remainingQuantity: 8,
    threshold: 15,
    imageUrl: "/products/cable.svg",
    category: "Accessories",
  },
  {
    id: "prod_003",
    name: "Bluetooth Speaker",
    sku: "TP-BS-007",
    remainingQuantity: 9,
    threshold: 15,
    imageUrl: "/products/speaker.svg",
    category: "Audio",
  },
];

export class ShopOwnerDashboardService {
  /**
   * Fetch Shop Owner Profile
   */
  static async getShopProfile(): Promise<ShopOwnerProfile> {
    return Promise.resolve(DUMMY_SHOP_PROFILE);
  }

  /**
   * Fetch 6 KPI statistics cards data
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    return Promise.resolve(DUMMY_DASHBOARD_STATS);
  }

  /**
   * Fetch Sales Overview chart data based on date range and metric
   */
  static async getSalesOverview(
    dateRange: DateRangeOption = "Last 30 Days"
  ): Promise<SalesOverviewData> {
    return Promise.resolve(
      DUMMY_SALES_OVERVIEW[dateRange] || DUMMY_SALES_OVERVIEW["Last 30 Days"]
    );
  }

  /**
   * Fetch Order Status distribution data
   */
  static async getOrderStatusDistribution(): Promise<OrderStatusData> {
    return Promise.resolve(DUMMY_ORDER_STATUS);
  }

  /**
   * Fetch Recent Orders list
   */
  static async getRecentOrders(): Promise<RecentOrder[]> {
    return Promise.resolve(DUMMY_RECENT_ORDERS);
  }

  /**
   * Fetch Low Stock Alert Products
   */
  static async getLowStockProducts(): Promise<LowStockProduct[]> {
    return Promise.resolve(DUMMY_LOW_STOCK_PRODUCTS);
  }
}
