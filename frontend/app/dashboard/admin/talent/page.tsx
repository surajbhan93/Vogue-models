// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import ModelsTable from "./components/ModelsTable";
// import { Model } from "./components/model";

// export default function AdminModelsPage() {
//   const [models, setModels] = useState<Model[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchModels();
//   }, []);

//   const fetchModels = async () => {
//     try {
//       const response = await api.get("/admin/models", {
//         params: {
//           page: 1,
//           limit: 20,
//           search: "",
//           status: "",
//         },
//       });

//       console.log(response.data);

//       setModels(response.data.data);
//     } catch (error) {
//       console.error("Error fetching models:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-black min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6">
//         All Models
//       </h1>

//       <ModelsTable models={models} />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ModelsTable from "./components/ModelsTable";
import { Model } from "./components/model";
import { Search, Filter, RefreshCw, UserCheck, Clock, Users } from "lucide-react";

const CATEGORIES = ["All", "Model", "Actor", "Singer", "Painter", "Dancer", "Musician", "Other"];
const STATUSES = ["All", "pending", "active", "suspended", "inactive"];

export default function AdminModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchModels();
    fetchStats();
  }, [selectedCategory, selectedStatus]);

    const fetchModels = async (searchTerm = search) => {
    setLoading(true);
    try {
      const params: any = {
        page: 1,
        limit: 50,
        search: searchTerm,
      };

      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }
      if (selectedStatus !== "All") {
        params.status = selectedStatus;
      }

      const response = await api.get("/admin/models", { params });
      if (response.data?.success) {
        setModels(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching talents/talent:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/models/stats");
      if (response.data?.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchModels(search);
  };

  return (
    <div className="p-6 md:p-8 bg-black min-h-screen text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Talent Roster Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage models, actors, singers, painters, dancers & other registered talents.
          </p>
        </div>
        <button
          onClick={() => {
            fetchModels();
            fetchStats();
          }}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Quick Overview */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 font-mono">TOTAL TALENTS</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.total || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-xs text-green-400 font-mono">ACTIVE & VERIFIED</p>
            <p className="text-2xl font-bold text-green-400 mt-1">{stats.active || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-400 font-mono">PENDING APPROVAL</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-400 font-mono">SUSPENDED</p>
            <p className="text-2xl font-bold text-red-400 mt-1">{stats.suspended || 0}</p>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-yellow-500 text-black font-bold shadow-md"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          );
        })}
      </div>

      {/* Search & Status Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 text-white placeholder-gray-500 text-sm rounded-lg pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-yellow-500"
          />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white/5 text-white text-sm rounded-lg border border-white/10 px-3 py-2.5 focus:outline-none focus:border-yellow-500 cursor-pointer"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st} className="bg-neutral-900 text-white">
                Status: {st.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-mono text-sm">
          Loading talent roster...
        </div>
      ) : (
        <ModelsTable models={models} onRefresh={fetchModels} />
      )}
    </div>
  );
}