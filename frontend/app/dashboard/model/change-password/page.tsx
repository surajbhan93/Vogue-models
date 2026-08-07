"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put("/models/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err: any) {
      alert(
        err.response?.data?.message ||
        "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      <div className="bg-zinc-900 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Change Password
        </h1>

        <form
          onSubmit={changePassword}
          className="space-y-5"
        >

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <button
            disabled={loading}
            className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-600"
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
}