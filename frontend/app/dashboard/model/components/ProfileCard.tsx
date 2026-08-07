"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    User,
    Settings,
    Lock,
    LogOut
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-72 bg-black border-r border-zinc-800">

            <div className="h-20 flex items-center justify-center border-b border-zinc-800">

                <h1 className="text-3xl font-serif text-yellow-500">
                    VOGUE
                </h1>

            </div>

            <nav className="p-5 space-y-2">

                <Link
                    href="/dashboard/model"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900"
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>

                <Link
                    href="/dashboard/model/profile"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900"
                >
                    <User size={20} />
                    My Profile
                </Link>

                <Link
                    href="/dashboard/model/edit-profile"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900"
                >
                    <Settings size={20} />
                    Edit Profile
                </Link>

                <Link
                    href="/dashboard/model/change-password"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900"
                >
                    <Lock size={20} />
                    Change Password
                </Link>

                <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 mt-10"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </nav>

        </aside>
    );
}