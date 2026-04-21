"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Event = { id: string; title: string; description: string; date: string; location: string; image?: string; published: boolean };
const empty: Omit<Event,"id"> = { title:"", description:"", date:"", location:"", image:"", published:true };

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<Omit<Event,"id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/events");
    if (res.status === 401) { window.location.href = "/admin"; return; }
    setEvents(await res.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (e: Event) => { setEditing(e); setForm({ title:e.title, description:e.description, date:e.date.slice(0,10), location:e.location, image:e.image||"", published:e.published }); setShowModal(true); };

  const save = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/events", { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
    await load();
    setShowModal(false);
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-2xl font-black text-pdmBlue-600">Events</h1><p className="text-gray-500 text-sm">Create and manage events</p></div>
          <button onClick={openAdd} className="btn-primary">+ Add Event</button>
        </div>

        {loading ? <div className="text-center py-20 text-gray-400">Loading...</div> : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {events.length === 0 && <div className="text-center py-16 text-gray-400">No events yet. Add your first event!</div>}
              {events.map(e => (
                <div key={e.id} className="flex items-start gap-4 p-5">
                  <div className="bg-pdmBlue-500 text-white rounded-xl p-3 text-center min-w-[52px] flex-shrink-0">
                    <div className="text-lg font-black">{new Date(e.date).getDate()}</div>
                    <div className="text-xs opacity-80">{new Date(e.date).toLocaleString("default",{month:"short"})}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-800">{e.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.published ? "bg-pdmGreen-100 text-pdmGreen-700" : "bg-gray-100 text-gray-500"}`}>{e.published ? "Published" : "Draft"}</span>
                    </div>
                    <p className="text-gray-500 text-sm truncate">{e.description}</p>
                    <p className="text-gray-400 text-xs mt-1">📍 {e.location}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(e)} className="text-xs bg-pdmBlue-50 text-pdmBlue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-pdmBlue-100">Edit</button>
                    <button onClick={() => del(e.id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-xl font-black text-pdmBlue-600 mb-5">{editing ? "Edit Event" : "Add New Event"}</h2>
              <div className="space-y-3">
                <div><label className="label">Title *</label><input className="input-field" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
                <div><label className="label">Description *</label><textarea rows={3} className="input-field resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label">Date *</label><input type="date" className="input-field" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></div>
                  <div><label className="label">Location *</label><input className="input-field" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} /></div>
                </div>
                <div><label className="label">Image URL</label><input className="input-field" placeholder="https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} /></div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} className="w-4 h-4 accent-pdmGreen-500" />
                  <span className="text-sm font-semibold text-gray-700">Published</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={save} disabled={saving} className="btn-primary flex-1 disabled:opacity-60">{saving ? "Saving..." : "Save Event"}</button>
                <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-3 font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
