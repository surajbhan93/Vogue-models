"use client";

import Link from "next/link";
import { Model } from "./model";

interface ModelsTableProps {
  models: Model[];
  onRefresh?: () => void;
}

export default function ModelsTable({ models, onRefresh }: ModelsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {models.map((model) => (
            <tr key={model._id} className="border-t border-gray-700">
              <td className="p-3">{model.name}</td>
              <td className="p-3">{model.email}</td>
              <td className="p-3">{model.status}</td>

              <td className="p-3">
                <Link
  href={`/dashboard/admin/talent/${model._id}`}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
>
  View
</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}