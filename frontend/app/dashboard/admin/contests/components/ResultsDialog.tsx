// "use client";

// import React, { useState } from "react";
// import { Contest } from "../types";
// import { Award, X, Trophy, Plus, Trash2 } from "lucide-react";

// interface ResultsDialogProps {
//   contest: Contest | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (id: string, winner: string, runnerUp: string, top10: string[]) => Promise<boolean>;
// }

// // Sample candidate pool for selection demo
// const SAMPLE_MODELS = [
//   { id: "mod-101", name: "Aarav Sharma (ID: mod-101)" },
//   { id: "mod-102", name: "Vikram Malhotra (ID: mod-102)" },
//   { id: "mod-103", name: "Rohan Kapoor (ID: mod-103)" },
//   { id: "mod-104", name: "Siddharth Verma (ID: mod-104)" },
//   { id: "mod-105", name: "Aditya Roy (ID: mod-105)" },
//   { id: "mod-106", name: "Karan Singhania (ID: mod-106)" },
//   { id: "mod-107", name: "Devendra Rathore (ID: mod-107)" },
//   { id: "mod-108", name: "Manish Joshi (ID: mod-108)" },
//   { id: "mod-109", name: "Varun Dhawan (ID: mod-109)" },
//   { id: "mod-110", name: "Kabir Khan (ID: mod-110)" },
// ];

// export const ResultsDialog: React.FC<ResultsDialogProps> = ({
//   contest,
//   isOpen,
//   onClose,
//   onConfirm,
// }) => {
//   const [winner, setWinner] = useState<string>("mod-101");
//   const [runnerUp, setRunnerUp] = useState<string>("mod-102");
//   const [top10, setTop10] = useState<string[]>(["mod-103", "mod-104", "mod-105"]);
//   const [newTop10Id, setNewTop10Id] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   React.useEffect(() => {
//     if (contest?.results) {
//       setWinner(contest.results.winner || "mod-101");
//       setRunnerUp(contest.results.runnerUp || "mod-102");
//       setTop10(contest.results.top10 || ["mod-103", "mod-104", "mod-105"]);
//     }
//   }, [contest]);

//   if (!isOpen || !contest) return null;

//   const addTop10Model = () => {
//     if (newTop10Id && !top10.includes(newTop10Id)) {
//       setTop10([...top10, newTop10Id]);
//       setNewTop10Id("");
//     }
//   };

//   const removeTop10Model = (id: string) => {
//     setTop10(top10.filter((item) => item !== id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     const success = await onConfirm(contest.id, winner, runnerUp, top10);
//     setLoading(false);
//     if (success) onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
//       <div className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-5">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
//               <Award className="w-6 h-6" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-slate-100">Declare Contest Results</h3>
//               <p className="text-xs text-slate-400">Select Winner, 1st Runner-up, and Top 10 Finalists.</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4 text-xs">
//           {/* Winner */}
//           <div>
//             <label className="block text-amber-400 font-bold mb-1 flex items-center gap-1">
//               <Trophy className="w-3.5 h-3.5" /> Winner (1st Place)
//             </label>
//             <select
//               value={winner}
//               onChange={(e) => setWinner(e.target.value)}
//               className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-purple-500"
//             >
//               {SAMPLE_MODELS.map((model) => (
//                 <option key={model.id} value={model.id}>
//                   {model.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Runner Up */}
//           <div>
//             <label className="block text-slate-300 font-bold mb-1">Runner-Up (2nd Place)</label>
//             <select
//               value={runnerUp}
//               onChange={(e) => setRunnerUp(e.target.value)}
//               className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-purple-500"
//             >
//               {SAMPLE_MODELS.map((model) => (
//                 <option key={model.id} value={model.id}>
//                   {model.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Top 10 List */}
//           <div className="space-y-2">
//             <label className="block text-slate-300 font-bold">Top 10 Finalists</label>
//             <div className="flex gap-2">
//               <select
//                 value={newTop10Id}
//                 onChange={(e) => setNewTop10Id(e.target.value)}
//                 className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
//               >
//                 <option value="">Select Candidate to add...</option>
//                 {SAMPLE_MODELS.filter((m) => !top10.includes(m.id)).map((model) => (
//                   <option key={model.id} value={model.id}>
//                     {model.name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={addTop10Model}
//                 className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2 pt-2">
//               {top10.map((id) => (
//                 <span
//                   key={id}
//                   className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
//                 >
//                   <span>{id}</span>
//                   <button
//                     type="button"
//                     onClick={() => removeTop10Model(id)}
//                     className="text-rose-400 hover:text-rose-300"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 font-semibold text-slate-400 hover:text-white transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-5 py-2 font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-lg shadow-purple-600/30 transition"
//             >
//               {loading ? "Saving..." : "Publish Final Results"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


"use client";

import React, { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Contest } from "../types";
import { Award, X, Trophy, Plus, Sparkles } from "lucide-react";

interface CandidateModel {
  id: string;
  name: string;
  email: string;
  currentStage?: string;
}

interface ResultsDialogProps {
  contest: Contest | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, winner: string, runnerUp: string, top10: string[]) => Promise<boolean>;
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  contest,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [candidateModels, setCandidateModels] = useState<CandidateModel[]>([]);
  const [fetchingModels, setFetchingModels] = useState<boolean>(true);

  const [winner, setWinner] = useState<string>("");
  const [runnerUp, setRunnerUp] = useState<string>("");
  const [top10, setTop10] = useState<string[]>([]);
  const [newTop10Id, setNewTop10Id] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch real registered participants for this contest
  const fetchParticipants = useCallback(async () => {
    if (!contest) return;
    const contestId = contest.id || (contest as any)._id;
    setFetchingModels(true);
    try {
      let res;
      try {
        res = await api.get(`/contest-participation/contest/${contestId}`);
      } catch (err: any) {
        if (err.response?.status === 404) {
          res = await api.get(`/api/contest-participation/contest/${contestId}`);
        } else {
          throw err;
        }
      }
      const rawList = res.data?.data || res.data || [];
      const formatted: CandidateModel[] = rawList
        .filter((p: any) => p.model && p.model._id)
        .map((p: any) => ({
          id: p.model._id,
          name: p.model.name || "Model Candidate",
          email: p.model.email || "",
          currentStage: p.currentStage || "Registered",
        }));

      setCandidateModels(formatted);

      // Auto-select defaults from existing results or first candidates
      if (contest?.results) {
        setWinner(contest.results.winner || (formatted[0]?.id || ""));
        setRunnerUp(contest.results.runnerUp || (formatted[1]?.id || ""));
        setTop10(contest.results.top10 || []);
      } else {
        if (formatted.length > 0) setWinner(formatted[0].id);
        if (formatted.length > 1) setRunnerUp(formatted[1].id);
      }
    } catch (err: any) {
      console.error("Failed to fetch contest candidates for results:", err);
    } finally {
      setFetchingModels(false);
    }
  }, [contest]);

  useEffect(() => {
    if (isOpen && contest) {
      fetchParticipants();
    }
  }, [isOpen, contest, fetchParticipants]);

  if (!isOpen || !contest) return null;

  const addTop10Model = () => {
    if (newTop10Id && !top10.includes(newTop10Id)) {
      setTop10([...top10, newTop10Id]);
      setNewTop10Id("");
    }
  };

  const removeTop10Model = (id: string) => {
    setTop10(top10.filter((item) => item !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const contestId = contest.id || (contest as any)._id;
    const success = await onConfirm(contestId, winner, runnerUp, top10);
    setLoading(false);
    if (success) onClose();
  };

  const getModelLabel = (id: string) => {
    const found = candidateModels.find((m) => m.id === id);
    return found ? `${found.name} (${found.email})` : id;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Declare Contest Results</h3>
              <p className="text-xs text-slate-400">{contest.title} • Select Winners from Real Candidates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {fetchingModels ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs font-medium">Fetching contest candidates from server...</p>
          </div>
        ) : candidateModels.length === 0 ? (
          <div className="py-8 text-center text-xs text-rose-400 bg-rose-950/20 border border-rose-900/40 rounded-xl">
            No registered models found for this contest yet.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Winner */}
            <div>
              <label className="block text-amber-400 font-bold mb-1 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 fill-amber-400" /> Winner (1st Place Title)
              </label>
              <select
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
              >
                <option value="">Select Winner Candidate...</option>
                {candidateModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    🏆 {model.name} — {model.email} [{model.currentStage}]
                  </option>
                ))}
              </select>
            </div>

            {/* Runner Up */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">Runner-Up (2nd Place)</label>
              <select
                value={runnerUp}
                onChange={(e) => setRunnerUp(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-purple-500 cursor-pointer font-medium"
              >
                <option value="">Select Runner-Up Candidate...</option>
                {candidateModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    🥈 {model.name} — {model.email} [{model.currentStage}]
                  </option>
                ))}
              </select>
            </div>

            {/* Top 10 List */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Top Finalists List</label>
              <div className="flex gap-2">
                <select
                  value={newTop10Id}
                  onChange={(e) => setNewTop10Id(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="">Select Candidate to add to Top Finalists...</option>
                  {candidateModels
                    .filter((m) => !top10.includes(m.id))
                    .map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} — {model.email}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addTop10Model}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {top10.map((id) => (
                  <span
                    key={id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-200 font-semibold"
                  >
                    <span>{getModelLabel(id)}</span>
                    <button
                      type="button"
                      onClick={() => removeTop10Model(id)}
                      className="text-rose-400 hover:text-rose-300 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 font-extrabold text-white bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 rounded-xl shadow-lg shadow-purple-600/30 transition"
              >
                {loading ? "Publishing..." : "Publish Final Results"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResultsDialog;
