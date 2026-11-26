"use client";

import React from "react";
import Image from "next/image";
import { Package, ArrowRight } from "lucide-react";
import { LowStockProduct } from "@/types/shop-owner/dashboard.types";
import { cn } from "@/lib/utils";

interface LowStockProductsProps {
  products: LowStockProduct[];
  onViewAll?: () => void;
}

export function LowStockProducts({ products, onViewAll }: LowStockProductsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#F2ECE4] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] flex items-center justify-center">
            <Package className="w-4 h-4 text-[#F97316]" />
          </div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Low Stock Products
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="group flex items-center gap-1 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-3.5">
        {products.map((product) => {
          const isCritical = product.remainingQuantity <= 5;
          return (
            <div
              key={product.id}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FFFDFC] border border-transparent hover:border-[#F7EFE4] transition-all"
            >
              {/* Product Info with Thumbnail */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200/60 p-1">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {product.name}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium">
                    SKU: {product.sku}
                  </span>
                </div>
              </div>

              {/* Quantity Warning Badge */}
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                  isCritical
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-[#FFF8DC] text-amber-700 border border-amber-300/60"
                )}
              >
                {product.remainingQuantity} left
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
