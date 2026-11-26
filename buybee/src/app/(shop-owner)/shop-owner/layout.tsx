import React, { Suspense } from "react";
import { ShopOwnerLayout } from "@/features/shop-owner/components/layout/ShopOwnerLayout";
import { ShopOwnerDashboardService } from "@/services/shop-owner/dashboard.service";

export const metadata = {
  title: "Shop Owner Dashboard | BuyBee",
  description: "Manage your store sales, inventory, orders, and performance on BuyBee Marketplace.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await ShopOwnerDashboardService.getShopProfile();

  return (
    <ShopOwnerLayout profile={profile}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-[#F97316] rounded-full animate-spin" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ShopOwnerLayout>
  );
}
