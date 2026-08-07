"use client";

import React, { useState } from "react";
import { useContest } from "./hooks/useContest";
import { Contest, ViewMode } from "./types";
import { ContestStats } from "./components/ContestStats";
import { ContestFilters } from "./components/ContestFilters";
import { ContestTable } from "./components/ContestTable";
import { ContestCard } from "./components/ContestCard";
import { EmptyState } from "./components/EmptyState";
import { CreateContestDialog } from "./components/CreateContestDialog";
import { EditContestDialog } from "./components/EditContestDialog";
import { PublishDialog } from "./components/PublishDialog";
import { DeleteDialog } from "./components/DeleteDialog";
import { AdvanceStageDialog } from "./components/AdvanceStageDialog";
import { ResultsDialog } from "./components/ResultsDialog";
import { ParticipantsDialog } from "./components/ParticipantsDialog";
import {
  Trophy,
  Plus,
  LayoutGrid,
  Table,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminContestsPage() {
  const {
    contests,
    totalCount,
    stats,
    loading,
    error,
    toasts,
    filters,
    setFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    createContest,
    updateContest,
    publishContest,
    advanceStage,
    cancelContest,
    declareResults,
    deleteContest,
    removeToast,
  } = useContest();

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Modal dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [publishingContest, setPublishingContest] = useState<Contest | null>(null);
  const [deletingContest, setDeletingContest] = useState<Contest | null>(null);
  const [advancingContest, setAdvancingContest] = useState<Contest | null>(null);
  const [resultsContest, setResultsContest] = useState<Contest | null>(null);
  const [participantsContest, setParticipantsContest] = useState<Contest | null>(null);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-2xl backdrop-blur-md text-xs font-semibold animate-slide-in ${
              toast.type === "success"
                ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
                : toast.type === "error"
                ? "bg-rose-950/90 text-rose-300 border-rose-500/40"
                : "bg-blue-950/90 text-blue-300 border-blue-500/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {toast.type === "error" && <AlertCircle className="w-4 h-4 text-rose-400" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Trophy className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Contest Management
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Create, manage modeling hunts, configure rounds, advance stages, and declare winners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Card Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Table className="w-3.5 h-3.5" /> Data Table
            </button>
          </div>

          {/* Create Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Create Contest
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <ContestStats stats={stats} />

      {/* Filters Section */}
      <ContestFilters
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />

      {/* Main Listing Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
          <Sparkles className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-xs font-medium">Fetching contests from API...</p>
        </div>
      ) : contests.length === 0 ? (
        <EmptyState
          title={filters.search ? "No matching contests" : "No Contests Available"}
          description={
            filters.search
              ? "Try adjusting your search filters or dates."
              : "Get started by creating your first contest competition."
          }
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          {viewMode === "table" ? (
            <ContestTable
              contests={contests}
              onEdit={(c) => setEditingContest(c)}
              onPublish={(c) => setPublishingContest(c)}
              onAdvanceStage={(c) => setAdvancingContest(c)}
              onDeclareResults={(c) => setResultsContest(c)}
              onViewParticipants={(c) => setParticipantsContest(c)}
              onCancel={(c) => cancelContest(c.id)}
              onDelete={(c) => setDeletingContest(c)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onEdit={(c) => setEditingContest(c)}
                  onPublish={(c) => setPublishingContest(c)}
                  onAdvanceStage={(c) => setAdvancingContest(c)}
                  onDeclareResults={(c) => setResultsContest(c)}
                  onViewParticipants={(c) => setParticipantsContest(c)}
                  onCancel={(c) => cancelContest(c.id)}
                  onDelete={(c) => setDeletingContest(c)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span>
                Showing Page <strong className="text-slate-200">{currentPage}</strong> of{" "}
                <strong className="text-slate-200">{totalPages}</strong> ({totalCount} total contests)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-semibold transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white disabled:opacity-40 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dialog Modals */}
      <CreateContestDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={createContest}
      />

      <EditContestDialog
        contest={editingContest}
        isOpen={!!editingContest}
        onClose={() => setEditingContest(null)}
        onSubmit={updateContest}
      />

      <PublishDialog
        contest={publishingContest}
        isOpen={!!publishingContest}
        onClose={() => setPublishingContest(null)}
        onConfirm={publishContest}
      />

      <DeleteDialog
        contest={deletingContest}
        isOpen={!!deletingContest}
        onClose={() => setDeletingContest(null)}
        onConfirm={deleteContest}
      />

      <AdvanceStageDialog
        contest={advancingContest}
        isOpen={!!advancingContest}
        onClose={() => setAdvancingContest(null)}
        onConfirm={advanceStage}
      />

      <ResultsDialog
        contest={resultsContest}
        isOpen={!!resultsContest}
        onClose={() => setResultsContest(null)}
        onConfirm={declareResults}
      />

      <ParticipantsDialog
        contest={participantsContest}
        isOpen={!!participantsContest}
        onClose={() => setParticipantsContest(null)}
      />
    </div>
  );
}
