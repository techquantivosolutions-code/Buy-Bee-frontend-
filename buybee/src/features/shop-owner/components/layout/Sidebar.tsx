"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Store,
  Package,
  LayoutGrid,
  Layers,
  ShoppingCart,
  Truck,
  CreditCard,
  Tag,
  BarChart3,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [shopManagementOpen, setShopManagementOpen] = useState(true);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 md:w-68 bg-[#171717] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none select-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Header & Brand */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 space-y-6">
          {/* Logo Bar */}
          <div className="flex items-center justify-between px-2">
            <Link href="/shop-owner/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform overflow-hidden p-0.5 border border-white/20 shrink-0">
                <Image
                  src="/images/buybee-logo.jpg"
                  alt="BuyBee Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-lg"
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Buy<span className="text-[#FFC928]">Bee</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30 rounded-full tracking-wide">
                  Seller
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 lg:hidden"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {/* Dashboard (Active) */}
            <Link
              href="/shop-owner/dashboard"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-medium shadow-md shadow-orange-600/25 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">Dashboard</span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-80" />
            </Link>

            {/* Shop Management (Collapsible Group) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShopManagementOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium">Shop Management</span>
                </div>
                {shopManagementOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {/* Nested Sub-links */}
              {shopManagementOpen && (
                <div className="pl-6 pr-1 mt-1 space-y-1 border-l-2 border-neutral-800 ml-5">
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-neutral-800/60 cursor-pointer transition-colors"
                  >
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>Products</span>
                  </div>
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-neutral-800/60 cursor-pointer transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4 text-gray-400" />
                    <span>Categories</span>
                  </div>
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-neutral-800/60 cursor-pointer transition-colors"
                  >
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span>Inventory</span>
                  </div>
                </div>
              )}
            </div>

            {/* Orders with Badge */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Orders</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold bg-[#FFC928] text-[#171717] rounded-full">
                12
              </span>
            </div>

            {/* Delivery */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <Truck className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Delivery</span>
            </div>

            {/* Payments & Settlements */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Payments & Settlements</span>
            </div>

            {/* Offers & Discounts */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <Tag className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Offers & Discounts</span>
            </div>

            {/* Reports */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <BarChart3 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Reports</span>
            </div>

            {/* Notifications */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] ring-4 ring-[#171717]" />
            </div>

            {/* Shop Settings */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Shop Settings</span>
            </div>

            {/* Account Settings */}
            <div
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors group"
            >
              <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Account Settings</span>
            </div>
          </nav>
        </div>

        {/* Decorative Orange Wave at Sidebar Bottom (Desktop reference match) */}
        <div className="relative w-full h-24 overflow-hidden pointer-events-none">
          <svg
            className="absolute bottom-0 left-0 w-full h-24 opacity-80"
            viewBox="0 0 280 100"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sidebarWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFC928" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="sidebarWaveDark" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9A3412" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M0 70 C 60 40, 140 100, 280 60 L 280 100 L 0 100 Z"
              fill="url(#sidebarWaveDark)"
            />
            <path
              d="M0 80 C 80 50, 180 95, 280 75 L 280 100 L 0 100 Z"
              fill="url(#sidebarWaveGrad)"
            />
          </svg>
        </div>
      </aside>
    </>
  );
}
