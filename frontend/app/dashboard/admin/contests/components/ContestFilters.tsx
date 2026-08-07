"use client";

import React from "react";
import { Search, Filter, RotateCcw, Calendar, Star, Layers, CheckCircle2 } from "lucide-react";
import { ContestFiltersState } from "../types";
import { STAGE_OPTIONS, STATUS_OPTIONS } from "../constants";

interface ContestFiltersProps {
  filters: ContestFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<ContestFiltersState>>;
  resetFilters: () => void;
}

export const ContestFilters: React.FC<ContestFiltersProps> = ({
  filters,
  setFilters,
  resetFilters,
}) => {
  const isFiltered =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.featured !== "all" ||
    filters.stage !== "all" ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, slug, city..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Stage Filter */}
        <div className="relative">
          <select
            value={filters.stage}
            onChange={(e) => setFilters((prev) => ({ ...prev, stage: e.target.value }))}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
          >
            <option value="all">All Stages</option>
            {STAGE_OPTIONS.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Filter */}
        <div className="relative">
          <select
            value={filters.featured}
            onChange={(e) => setFilters((prev) => ({ ...prev, featured: e.target.value }))}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
          >
            <option value="all">Featured: All</option>
            <option value="true">Featured Only</option>
            <option value="false">Standard Only</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="flex items-center">
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Date Filter Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span>Reg Start From:</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
            className="bg-slate-950/80 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Reg End Before:</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
            className="bg-slate-950/80 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
