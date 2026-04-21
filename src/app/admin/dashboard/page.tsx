"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ volunteers: 0, events: 0, pending: 0, team: 0 });
  const [recentVolunteers, setRecentVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [vRes, eRes, tRes] = await Promise.all([
          fetch("/api/admin/volunteers"),
          fetch("/api/admin/events"),
          fetch("/api/admin/team"),
        ]);
        if (vRes.status === 401) { window.location.href = "/admin"; return; }
        const volunteers = await vRes.json();
        const events = await eRes.json();
        const team = await tRes.json();
        setStats({
          volunteers: volunteers.length,
          events: events.length,
          pending: volunteers.filter((v: any) => v.status === "PENDING").length,
          team: team.length,
        });
        setRecentVolunteers(volunteers.slice(0, 5));
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  const approve = async (id: string) => {
    await fetch("/api/admin/volunteers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: "APPROVED" }) });
    setRecentVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: "APPROVED" } : v));
    setStats(s => ({ ...s, pending: Math.max(0, s.pending - 1) }));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-pdmBlue-600">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Volunteers", value: stats.volunteers, color: "text-pdmGreen-500", bg: "bg-pdmGreen-50", icon: "🤝" },
                { label: "Active Events", value: stats.events, color: "text-pdmBlue-500", bg: "bg-pdmBlue-50", icon: "📅" },
                { label: "Pending Approvals", value: stats.pending, color: "text-orange-500", bg: "bg-orange-50", icon: "⏳" },
                { label: "Team Members", value: stats.team, color: "text-purple-500", bg: "bg-purple-50", icon: "👥" },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-white`}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-sm text-gray-500 font-semibold mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="font-black text-pdmBlue-600">Recent Volunteer Applications</h2>
                <Link href="/admin/volunteers" className="text-sm text-pdmGreen-600 font-bold hover:underline">View All →</Link>
              </div>
              {recentVolunteers.length === 0 ? (
                <div className="text-center py-10 text-gray-400">No volunteers yet.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentVolunteers.map(v => (
                    <div key={v.id} className="flex items-center gap-4 p-4">
                      <div className="w-9 h-9 rounded-full bg-pdmBlue-100 flex items-center justify-center text-pdmBlue-600 font-black text-sm flex-shrink-0">
                        {v.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate">{v.name}</p>
                        <p className="text-gray-400 text-xs truncate">{v.email} · {v.phone}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${v.status === "PENDING" ? "badge-pending" : v.status === "APPROVED" ? "badge-approved" : "badge-rejected"}`}>
                        {v.status}
                      </span>
                      {v.status === "PENDING" && (
                        <button onClick={() => approve(v.id)} className="text-xs bg-pdmGreen-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-pdmGreen-600 flex-shrink-0">
                          Approve
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
