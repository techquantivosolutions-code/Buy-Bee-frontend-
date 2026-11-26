"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { OrderStatusData } from "@/types/shop-owner/dashboard.types";

interface OrderStatusProps {
  data: OrderStatusData;
}

export function OrderStatus({ data }: OrderStatusProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-[#F2ECE4] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2">
        <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] flex items-center justify-center shrink-0">
          <PieChartIcon className="w-4 h-4 text-[#F97316]" />
        </div>
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Order Status
        </h3>
      </div>

      {/* Donut Chart & Legend Container */}
      <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 my-auto pt-2">
        {/* Left: Donut with Center Text (compact, proportional, non-overlapping) */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.distribution}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={66}
                paddingAngle={2}
                dataKey="count"
                strokeWidth={0}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                cursor="pointer"
              >
                {data.distribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    style={{ transition: "opacity 0.2s ease, transform 0.2s ease" }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Donut Label (permanently visible, no tooltip obstruction) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-none">
              {data.formattedTotalOrders}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
              Orders
            </span>
          </div>
        </div>

        {/* Right: Legend Items (strictly single line, no text wrapping or overflow) */}
        <div className="flex-1 min-w-0 space-y-2.5">
          {data.distribution.map((item, index) => (
            <div
              key={item.key}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-center justify-between gap-2 text-xs sm:text-sm cursor-pointer rounded-lg px-1.5 py-0.5 transition-colors ${
                activeIndex === index ? "bg-orange-50/70" : "hover:bg-gray-50"
              }`}
            >
              {/* Status color dot and name */}
              <div className="flex items-center gap-2 min-w-0 shrink">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-700 whitespace-nowrap truncate">
                  {item.name}
                </span>
              </div>

              {/* Percentage and count */}
              <div className="text-right font-semibold text-gray-900 shrink-0 whitespace-nowrap pl-1">
                <span>{item.percentage}%</span>
                <span className="text-gray-400 font-normal ml-1">
                  ({item.count})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
