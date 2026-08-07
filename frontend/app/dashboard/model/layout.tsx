// ❌ DELETE THIS LINE FROM app/dashboard/model/layout.tsx:
// import './global.css'; 

// ✅ Keep only this in app/dashboard/model/layout.tsx:
"use client";

import React from "react";
import Sidebar from "./components/Sidebar"; // or "@/components/layout/Sidebar"
import Topbar from "./components/Topbar";

export default function ModelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Sidebar />
      <div className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <Topbar />
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}