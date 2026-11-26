"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, HelpCircle, Store, ChevronDown, Menu } from "lucide-react";
import { ShopOwnerProfile } from "@/types/shop-owner/dashboard.types";

interface HeaderProps {
  profile?: ShopOwnerProfile;
  onOpenMobileSidebar: () => void;
}

export function Header({ profile, onOpenMobileSidebar }: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const shopName = profile?.shopName || "TechPlus Store";
  const roleName = profile?.role || "Shop Owner";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 md:px-8 bg-white/95 backdrop-blur-md border-b border-[#F5EFE6]">
      {/* Left: Mobile Menu & Search Input */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-1 text-gray-700 hover:text-black rounded-xl hover:bg-orange-50 lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Brand Logo */}
        <Link
          href="/shop-owner/dashboard"
          className="flex items-center gap-1.5 lg:hidden shrink-0 mr-1"
        >
          <div className="w-8 h-8 rounded-lg bg-white overflow-hidden border border-gray-200/60 shadow-xs p-0.5 flex items-center justify-center">
            <Image
              src="/images/buybee-logo.jpg"
              alt="BuyBee"
              width={30}
              height={30}
              className="w-full h-full object-contain rounded"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F6] border border-[#EFE8DD] rounded-xl text-sm placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
          />
        </div>
      </div>

      {/* Right: Actions & Store Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2.5 text-gray-600 hover:text-black rounded-xl hover:bg-orange-50/80 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#F97316] rounded-full ring-2 ring-white" />
        </button>

        {/* Help Circle */}
        <button
          type="button"
          className="p-2.5 text-gray-600 hover:text-black rounded-xl hover:bg-orange-50/80 transition-colors hidden sm:flex"
          aria-label="Help & Documentation"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1" />

        {/* Shop Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-orange-50/60 transition-colors text-left"
          >
            {/* Orange Shop Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Store className="w-5 h-5" />
            </div>

            {/* Shop Details */}
            <div className="hidden md:block">
              <h4 className="text-sm font-bold text-gray-900 leading-tight">
                {shopName}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-gray-500">{roleName}</span>
              </div>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block ml-0.5" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{shopName}</p>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#EA580C] transition-colors"
                >
                  Shop Settings
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#EA580C] transition-colors"
                >
                  Account Profile
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
