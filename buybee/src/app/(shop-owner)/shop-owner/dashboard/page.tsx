"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";
import {
  DashboardStats,
  DateRangeOption,
  LowStockProduct,
  OrderStatusData,
  RecentOrder,
  SalesOverviewData,
} from "@/types/shop-owner/dashboard.types";
import { ShopOwnerDashboardService } from "@/services/shop-owner/dashboard.service";
import { StatsCards } from "@/features/shop-owner/components/dashboard/StatsCards";
import { SalesOverview } from "@/features/shop-owner/components/dashboard/SalesOverview";
import { OrderStatus } from "@/features/shop-owner/components/dashboard/OrderStatus";
import { RecentOrders } from "@/features/shop-owner/components/dashboard/RecentOrders";
import { LowStockProducts } from "@/features/shop-owner/components/dashboard/LowStockProducts";
import { cn } from "@/lib/utils";

const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "Custom Range",
];

export default function ShopOwnerDashboardPage() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>("Last 30 Days");
  const [isRangeDropdownOpen, setIsRangeDropdownOpen] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [salesOverview, setSalesOverview] = useState<SalesOverviewData | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatusData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data from service
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [statsData, salesData, statusData, ordersData, stockData] =
          await Promise.all([
            ShopOwnerDashboardService.getDashboardStats(),
            ShopOwnerDashboardService.getSalesOverview(selectedRange),
            ShopOwnerDashboardService.getOrderStatusDistribution(),
            ShopOwnerDashboardService.getRecentOrders(),
            ShopOwnerDashboardService.getLowStockProducts(),
          ]);

        setStats(statsData);
        setSalesOverview(salesData);
        setOrderStatus(statusData);
        setRecentOrders(ordersData);
        setLowStockProducts(stockData);
      } catch (err) {
        console.error("Failed to load shop owner dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedRange]);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[450px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-[#F97316] rounded-full animate-spin" />
          <span className="text-sm font-medium text-gray-500">
            Loading your dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 sm:space-y-7 pb-10">
      {/* Top Ambient Golden / Orange Glow (Desktop reference match) */}
      <div className="absolute -top-10 right-0 w-96 h-48 bg-gradient-to-bl from-amber-200/35 via-orange-100/25 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Welcome & Date Range Header */}
      <section className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Good Morning!</span>
            <span className="inline-block animate-wiggle origin-bottom-right">👋</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your shop today.
          </p>
        </div>

        {/* Date-Range Selector Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsRangeDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E9E2D8] rounded-xl text-sm font-semibold text-gray-800 shadow-xs hover:border-[#F97316] hover:bg-[#FFFCF8] transition-all"
            aria-expanded={isRangeDropdownOpen}
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{selectedRange}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform duration-200",
                isRangeDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {isRangeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {DATE_RANGE_OPTIONS.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setSelectedRange(range);
                    setIsRangeDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left transition-colors",
                    selectedRange === range
                      ? "text-[#F97316] font-bold bg-orange-50/60"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{range}</span>
                  {selectedRange === range && (
                    <Check className="w-4 h-4 text-[#F97316]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Cards (6 KPIs) */}
      {stats && <StatsCards stats={stats} />}

      {/* Middle Row: Sales Overview (60%) & Order Status (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-7 flex flex-col">
          {salesOverview && <SalesOverview data={salesOverview} />}
        </div>
        <div className="lg:col-span-5 flex flex-col">
          {orderStatus && <OrderStatus data={orderStatus} />}
        </div>
      </section>

      {/* Bottom Row: Recent Orders (60%) & Low Stock Products (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-7 flex flex-col">
          <RecentOrders orders={recentOrders} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <LowStockProducts products={lowStockProducts} />
        </div>
      </section>
    </div>
  );
}
