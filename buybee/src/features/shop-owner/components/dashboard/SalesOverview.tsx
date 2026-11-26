"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, ArrowUpRight } from "lucide-react";
import {
  SalesMetricType,
  SalesOverviewData,
} from "@/types/shop-owner/dashboard.types";
import { cn, formatCurrency } from "@/lib/utils";

interface SalesOverviewProps {
  data: SalesOverviewData;
}

export function SalesOverview({ data }: SalesOverviewProps) {
  const [activeMetric, setActiveMetric] = useState<SalesMetricType>("revenue");

  // Format tick values for Y Axis
  const formatYAxisTick = (val: number) => {
    if (activeMetric === "revenue") {
      if (val >= 100000) return `${val / 100000}L`;
      if (val >= 1000) return `${val / 1000}K`;
      return `${val}`;
    }
    return `${val}`;
  };

  const getMetricValue = (item: (typeof data.dataPoints)[0]) => {
    switch (activeMetric) {
      case "revenue":
        return item.revenue;
      case "orders":
        return item.orders;
      case "units":
        return item.units;
    }
  };

  const chartData = data.dataPoints.map((dp) => ({
    ...dp,
    value: getMetricValue(dp),
  }));

  return (
    <div className="bg-white rounded-2xl border border-[#F2ECE4] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#F97316]" />
            </div>
            <h3 className="text-base font-bold text-gray-900 tracking-tight">
              Sales Overview
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-950">
              {data.formattedTotalRevenue}
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
              <ArrowUpRight className="w-3 h-3" />
              +{data.growthPercentage}%
            </span>
          </div>
        </div>

        {/* Metric Selector Tabs */}
        <div className="inline-flex self-start sm:self-center p-1 bg-[#F9F6F0] rounded-xl border border-[#ECE5D8]">
          <button
            type="button"
            onClick={() => setActiveMetric("revenue")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeMetric === "revenue"
                ? "bg-[#F97316] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Revenue
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("orders")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeMetric === "orders"
                ? "bg-[#F97316] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Orders
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("units")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeMetric === "units"
                ? "bg-[#F97316] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Units
          </button>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-64 sm:h-72 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={formatYAxisTick}
              dx={-4}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].value as number;
                  const displayVal =
                    activeMetric === "revenue"
                      ? formatCurrency(val)
                      : `${val.toLocaleString()} ${activeMetric}`;
                  return (
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg border border-gray-800">
                      <p className="font-medium text-gray-300">{label}</p>
                      <p className="text-sm font-bold text-[#FFC928] mt-0.5">
                        {displayVal}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#salesGrad)"
              activeDot={{
                r: 6,
                fill: "#F97316",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              dot={{
                r: 3.5,
                fill: "#F97316",
                stroke: "#FFFFFF",
                strokeWidth: 1.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
