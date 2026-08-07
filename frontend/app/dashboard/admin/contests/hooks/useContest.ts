"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "@/lib/api";
import { Contest, ContestFiltersState } from "../types";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export function useContest() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Filter state
  const [filters, setFilters] = useState<ContestFiltersState>({
    search: "",
    status: "all",
    featured: "all",
    stage: "all",
    startDate: "",
    endDate: "",
  });

  // Sorting & Pagination
  const [sortField, setSortField] = useState<keyof Contest>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Toast Notification helper
  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 1. GET /contests/admin/all (Auto-loaded when page opens)
  const fetchContests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      try {
        res = await api.get("/contests/admin/all");
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.get("/api/contests/admin/all");
        } else {
          throw err;
        }
      }
      const payload = res.data;
      let list: Contest[] = [];

      if (Array.isArray(payload)) {
        list = payload;
      } else if (Array.isArray(payload?.data)) {
        list = payload.data;
      } else if (payload?.data && typeof payload.data === "object") {
        const d = payload.data;
        list = [
          ...(Array.isArray(d.upcoming) ? d.upcoming : []),
          ...(Array.isArray(d.ongoing) ? d.ongoing : []),
          ...(Array.isArray(d.past) ? d.past : []),
        ];
      } else if (Array.isArray(payload?.contests)) {
        list = payload.contests;
      }

      setContests(list);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to load contests from server";
      setError(errMsg);
      addToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  // 2. POST /contests (Create Contest)
  const createContest = async (contestData: Partial<Contest>) => {
    try {
      let res;
      try {
        res = await api.post("/contests", contestData);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.post("/api/contests", contestData);
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest created successfully!";
      addToast(msg, "success");
      await fetchContests(); // Auto refetch
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to create contest";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 3. PUT /contests/:id (Update Contest)
  const updateContest = async (id: string, contestData: Partial<Contest>) => {
    try {
      let res;
      try {
        res = await api.put(`/contests/${id}`, contestData);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.put(`/api/contests/${id}`, contestData);
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest updated successfully!";
      addToast(msg, "success");
      await fetchContests(); // Auto refetch
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to update contest";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 4. PATCH /contests/:id/publish (Publish Contest)
  const publishContest = async (id: string) => {
    setContests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "active", currentStage: "Published" } : c))
    );
    try {
      let res;
      try {
        res = await api.patch(`/contests/${id}/publish`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contests/${id}/publish`);
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest published successfully!";
      addToast(msg, "success");
      await fetchContests();
      return true;
    } catch (err: any) {
      await fetchContests(); // Rollback
      const errMsg = err.response?.data?.message || err.message || "Failed to publish contest";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 5. PATCH /contests/:id/advance-stage (Advance Stage)
  const advanceStage = async (id: string, currentStage: string, status?: string) => {
    try {
      let res;
      try {
        res = await api.patch(`/contests/${id}/advance-stage`, { currentStage, status });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contests/${id}/advance-stage`, { currentStage, status });
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || `Contest stage updated to ${currentStage}`;
      addToast(msg, "success");
      await fetchContests();
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to advance stage";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 6. PATCH /contests/:id/cancel (Cancel Contest)
  const cancelContest = async (id: string) => {
    try {
      let res;
      try {
        res = await api.patch(`/contests/${id}/cancel`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contests/${id}/cancel`);
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest has been cancelled";
      addToast(msg, "info");
      await fetchContests();
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to cancel contest";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 7. PATCH /contests/:id/select-round/:roundNumber (Select Round Participants)
  const selectRoundParticipants = async (id: string, roundNumber: number, selectedModelIds: string[], nextStage: string) => {
    try {
      let res;
      try {
        res = await api.patch(`/contests/${id}/select-round/${roundNumber}`, {
          selectedModelIds,
          nextStage,
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contests/${id}/select-round/${roundNumber}`, {
            selectedModelIds,
            nextStage,
          });
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || `Selected ${selectedModelIds.length} models for Round ${roundNumber}`;
      addToast(msg, "success");
      await fetchContests();
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to select round participants";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 8. PATCH /contests/:id/declare-results (Declare Results)
  const declareResults = async (id: string, winner: string, runnerUp: string, top10: string[]) => {
    try {
      let res;
      try {
        res = await api.patch(`/contests/${id}/declare-results`, {
          winner,
          runnerUp,
          top10,
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.patch(`/api/contests/${id}/declare-results`, {
            winner,
            runnerUp,
            top10,
          });
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest results successfully declared!";
      addToast(msg, "success");
      await fetchContests();
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to declare results";
      addToast(errMsg, "error");
      return false;
    }
  };

  // 9. DELETE /contests/:id (Delete Contest)
  const deleteContest = async (id: string) => {
    setContests((prev) => prev.filter((c) => c.id !== id));
    try {
      let res;
      try {
        res = await api.delete(`/contests/${id}`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.delete(`/api/contests/${id}`);
        } else {
          throw err;
        }
      }
      const msg = res.data?.message || "Contest deleted successfully";
      addToast(msg, "info");
      await fetchContests();
      return true;
    } catch (err: any) {
      await fetchContests();
      const errMsg = err.response?.data?.message || err.message || "Failed to delete contest";
      addToast(errMsg, "error");
      return false;
    }
  };

  // Derived filtered & sorted contests
  const filteredContests = useMemo(() => {
    return contests.filter((contest) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = contest.title?.toLowerCase().includes(query);
        const matchesSlug = contest.slug?.toLowerCase().includes(query);
        const matchesCity = contest.location?.city?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSlug && !matchesCity) return false;
      }

      // Status
      if (filters.status !== "all" && contest.status !== filters.status) {
        return false;
      }

      // Featured
      if (filters.featured !== "all") {
        const isFeat = filters.featured === "true";
        if (contest.isFeatured !== isFeat) return false;
      }

      // Stage
      if (filters.stage !== "all" && contest.currentStage !== filters.stage) {
        return false;
      }

      // Start Date
      if (filters.startDate) {
        if (new Date(contest.registrationStart) < new Date(filters.startDate)) {
          return false;
        }
      }

      // End Date
      if (filters.endDate) {
        if (new Date(contest.registrationEnd) > new Date(filters.endDate)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [contests, filters, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredContests.length / pageSize) || 1;
  const paginatedContests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContests.slice(start, start + pageSize);
  }, [filteredContests, currentPage, pageSize]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = contests.length;
    const active = contests.filter((c) => c.status === "active" || c.status === "ongoing").length;
    const draft = contests.filter((c) => c.status === "draft").length;
    const completed = contests.filter((c) => c.status === "completed").length;
    return { total, active, draft, completed };
  }, [contests]);

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "all",
      featured: "all",
      stage: "all",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
  }, []);

  return {
    contests: paginatedContests,
    allContests: contests,
    totalCount: filteredContests.length,
    stats,
    loading,
    error,
    toasts,
    filters,
    setFilters,
    resetFilters,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchContests,
    createContest,
    updateContest,
    publishContest,
    advanceStage,
    cancelContest,
    selectRoundParticipants,
    declareResults,
    deleteContest,
    addToast,
    removeToast,
  };
}
