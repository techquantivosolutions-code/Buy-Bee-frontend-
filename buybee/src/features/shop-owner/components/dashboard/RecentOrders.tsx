"use client";

import React from "react";
import { ShoppingCart, ArrowRight, Eye, MoreHorizontal } from "lucide-react";
import { RecentOrder } from "@/types/shop-owner/dashboard.types";
import { cn } from "@/lib/utils";

interface RecentOrdersProps {
  orders: RecentOrder[];
  onViewAll?: () => void;
  onViewOrder?: (orderId: string) => void;
}

export function RecentOrders({
  orders,
  onViewAll,
  onViewOrder,
}: RecentOrdersProps) {
  // Payment status styling
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200/60";
      case "COD":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-amber-50 text-amber-600 border border-amber-200/60";
    }
  };

  // Order status styling
  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200/60";
      case "Processing":
        return "bg-orange-50 text-[#EA580C] border border-orange-200/60";
      case "Ready for Pickup":
        return "bg-[#FFF8DC] text-amber-700 border border-amber-200/70";
      case "Pending":
        return "bg-amber-50 text-amber-600 border border-amber-200/60";
      case "Cancelled":
        return "bg-red-50 text-red-600 border border-red-200/60";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F2ECE4] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-[#F97316]" />
          </div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Recent Orders
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="group flex items-center gap-1 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-[#FFF8DC]/60 text-gray-700 text-xs font-semibold rounded-xl">
              <th className="py-3 px-3.5 rounded-l-xl">Order ID</th>
              <th className="py-3 px-3.5">Customer</th>
              <th className="py-3 px-3.5">Products</th>
              <th className="py-3 px-3.5">Amount</th>
              <th className="py-3 px-3.5">Payment</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#FFFCF8] transition-colors"
              >
                {/* Order ID */}
                <td className="py-3.5 px-3.5 font-semibold text-gray-900">
                  <span className="text-[#EA580C]">{order.orderNumber}</span>
                </td>

                {/* Customer */}
                <td className="py-3.5 px-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                        order.customer.avatarBgColor || "bg-[#FFC928] text-white"
                      )}
                    >
                      {order.customer.initials}
                    </div>
                    <span className="font-medium text-gray-900">
                      {order.customer.name}
                    </span>
                  </div>
                </td>

                {/* Products count */}
                <td className="py-3.5 px-3.5 text-gray-600">
                  {order.formattedItems}
                </td>

                {/* Amount */}
                <td className="py-3.5 px-3.5 font-bold text-gray-900">
                  {order.formattedAmount}
                </td>

                {/* Payment badge */}
                <td className="py-3.5 px-3.5">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold inline-block",
                      getPaymentBadge(order.paymentStatus)
                    )}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* Order Status badge */}
                <td className="py-3.5 px-3.5">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold inline-block",
                      getOrderStatusBadge(order.orderStatus)
                    )}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-gray-400">
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Order"
                      aria-label={`View order ${order.orderNumber}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="More Actions"
                      aria-label="More actions"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
