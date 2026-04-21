"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Volunteer = { id: string; name: string; email: string; phone: string; message?: string; status: string; createdAt: string };

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/admin/volunteers").then(async (res) => {
      if (res.status === 401) { window.location.href = "/admin"; return; }
      const data = await res.json();
      setVolunteers(data);
    }).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/volunteers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const del = async (id: string) => {
    if (!confirm("Delete this volunteer?")) return;
    await fetch(`/api/admin/volunteers?id=${id}`, { method: "DELETE" });
    setVolunteers(prev => prev.filter(v => v.id !== id));
  };

  const filtered = filter === "ALL" ? volunteers : volunteers.filter(v => v.status === filter);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-pdmBlue-600">Volunteer Applications</h1>
          <p className="text-gray-500 text-sm">{volunteers.filter(v => v.status === "PENDING").length} pending review</p>
        </div>

        <div className="flex gap-2 mb-5">
          {["ALL","PENDING","APPROVED","REJECTED"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === f ? "bg-pdmBlue-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-pdmBlue-300"}`}>
              {f} {f === "ALL" ? `(${volunteers.length})` : `(${volunteers.filter(v=>v.status===f).length})`}
            </button>
          ))}
        </div>

        {loading ? <div className="text-center py-20 text-gray-400">Loading...</div> : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No volunteers in this category.</div>}
              {filtered.map(v => (
                <div key={v.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pdmBlue-100 flex items-center justify-center text-pdmBlue-600 font-black flex-shrink-0">
                      {v.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-gray-800">{v.name}</h3>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${v.status === "PENDING" ? "badge-pending" : v.status === "APPROVED" ? "badge-approved" : "badge-rejected"}`}>{v.status}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{v.email} · {v.phone}</p>
                      {v.message && <p className="text-gray-400 text-sm mt-1 italic">"{v.message}"</p>}
                      <p className="text-gray-300 text-xs mt-1">{new Date(v.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 flex-wrap">
                      {v.status === "PENDING" && <>
                        <button onClick={() => updateStatus(v.id,"APPROVED")} className="text-xs bg-pdmGreen-500 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-pdmGreen-600">Approve</button>
                        <button onClick={() => updateStatus(v.id,"REJECTED")} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100">Reject</button>
                      </>}
                      {v.status === "APPROVED" && <button onClick={() => updateStatus(v.id,"REJECTED")} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold">Reject</button>}
                      {v.status === "REJECTED" && <button onClick={() => updateStatus(v.id,"APPROVED")} className="text-xs bg-pdmGreen-50 text-pdmGreen-700 px-3 py-1.5 rounded-lg font-bold">Approve</button>}
                      <button onClick={() => del(v.id)} className="text-xs bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
