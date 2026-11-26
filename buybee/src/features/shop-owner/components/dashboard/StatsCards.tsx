"use client";

import React from "react";
import {
  Coins,
  ShoppingCart,
  ShoppingBag,
  Clock,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { DashboardStats } from "@/types/shop-owner/dashboard.types";

interface StatsCardsProps {
  stats: DashboardStats;
  onViewProducts?: () => void;
}

export function StatsCards({ stats, onViewProducts }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
      {/* 1. Total Revenue (Standout Card) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F97316] via-[#F97316] to-[#EA580C] text-white p-5 shadow-lg shadow-orange-500/20 flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:-translate-y-0.5">
        {/* Background decorative chart wave */}
        <div className="absolute right-0 bottom-2 w-32 h-16 opacity-30 pointer-events-none">
          <svg viewBox="0 0 100 50" fill="none" className="w-full h-full">
            <path
              d="M0 45 C 20 40, 40 25, 60 30 C 80 35, 90 10, 100 5"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-orange-100 uppercase tracking-wider">
            Total Revenue
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-white">
            {stats.totalRevenue.formatted}
          </h3>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-white/15 text-xs text-orange-100">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/20 font-bold text-white">
            <ArrowUpRight className="w-3 h-3" />
            +{stats.totalRevenue.growthPercentage}%
          </span>
          <span className="truncate text-orange-100/90 text-[11px]">
            {stats.totalRevenue.comparisonPeriodText}
          </span>
        </div>
      </div>

      {/* 2. Total Orders */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F2ECE4] p-5 shadow-xs flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div>
          <div className="w-9 h-9 rounded-xl bg-[#FFF8DC] flex items-center justify-center mb-3">
            <ShoppingCart className="w-5 h-5 text-[#F97316]" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Orders
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-gray-900">
            {stats.totalOrders.formatted}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
            <ArrowUpRight className="w-3 h-3" />
            +{stats.totalOrders.growthPercentage}%
          </span>
        </div>
      </div>

      {/* 3. Today's Orders */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F2ECE4] p-5 shadow-xs flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        {/* Ambient bottom-right yellow/orange glow */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-100/60 rounded-full blur-xl pointer-events-none" />

        <div>
          <div className="w-9 h-9 rounded-xl bg-[#FFF0E5] flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5 text-[#EA580C]" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Today&apos;s Orders
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-gray-900">
            {stats.todayOrders.formatted}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
            <ArrowUpRight className="w-3 h-3" />
            +{stats.todayOrders.growthPercentage}%
          </span>
        </div>
      </div>

      {/* 4. Pending Orders */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F2ECE4] p-5 shadow-xs flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div>
          <div className="w-9 h-9 rounded-xl bg-[#FFF0E5] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-[#EA580C]" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pending Orders
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-[#EA580C]">
            {stats.pendingOrders.formatted}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <span className="text-[11px] font-medium text-gray-400">Requires fulfillment</span>
        </div>
      </div>

      {/* 5. Total Products */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F2ECE4] p-5 shadow-xs flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        {/* Ambient bottom-right yellow/orange glow */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-100/60 rounded-full blur-xl pointer-events-none" />

        <div>
          <div className="w-9 h-9 rounded-xl bg-[#FFF0E5] flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-[#F97316]" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Products
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-gray-900">
            {stats.totalProducts.formatted}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
            <ArrowUpRight className="w-3 h-3" />
            +{stats.totalProducts.growthPercentage}%
          </span>
        </div>
      </div>

      {/* 6. Low Stock */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#F2ECE4] p-5 shadow-xs flex flex-col justify-between min-h-[175px] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div>
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Low Stock
          </span>
          <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight mt-1 text-red-600">
            {stats.lowStock.formatted}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onViewProducts}
            className="group flex items-center gap-1 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            <span>{stats.lowStock.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
