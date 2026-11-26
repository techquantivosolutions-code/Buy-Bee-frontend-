"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ShopOwnerProfile } from "@/types/shop-owner/dashboard.types";

interface ShopOwnerLayoutProps {
  children: React.ReactNode;
  profile?: ShopOwnerProfile;
}

export function ShopOwnerLayout({ children, profile }: ShopOwnerLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#171717]">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Container (Shifted right on desktop by sidebar width) */}
      <div className="lg:pl-64 md:lg:pl-68 flex flex-col min-h-screen transition-all duration-300">
        {/* Top Header */}
        <Header
          profile={profile}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
