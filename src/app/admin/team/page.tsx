"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Member = { id: string; name: string; designation: string; description: string; image?: string; order: number };
const empty: Omit<Member,"id"> = { name:"", designation:"", description:"", image:"", order:0 };
const avatarColors = ["bg-pdmBlue-500","bg-pdmGreen-500","bg-purple-500","bg-orange-500","bg-cyan-500","bg-rose-500"];

export default function AdminTeam() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Omit<Member,"id">>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/team");
    if (res.status === 401) { window.location.href = "/admin"; return; }
    setMembers(await res.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (m: Member) => { setEditing(m); setForm({ name:m.name, designation:m.designation, description:m.description, image:m.image||"", order:m.order }); setShowModal(true); };

  const save = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/team", { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
    await load();
    setShowModal(false);
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-2xl font-black text-pdmBlue-600">Team Members</h1><p className="text-gray-500 text-sm">Manage your organization's team</p></div>
          <button onClick={openAdd} className="btn-primary">+ Add Member</button>
        </div>

        {loading ? <div className="text-center py-20 text-gray-400">Loading...</div> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.length === 0 && <div className="col-span-3 text-center py-16 text-gray-400">No team members yet.</div>}
            {members.map((m, i) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-4 border-pdmGreen-100" />
                ) : (
                  <div className={`w-16 h-16 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xl font-black mx-auto mb-3`}>
                    {m.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                )}
                <h3 className="font-bold text-pdmBlue-600">{m.name}</h3>
                <p className="text-pdmGreen-600 text-sm font-semibold mb-2">{m.designation}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{m.description}</p>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => openEdit(m)} className="text-xs bg-pdmBlue-50 text-pdmBlue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-pdmBlue-100">Edit</button>
                  <button onClick={() => del(m.id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-xl font-black text-pdmBlue-600 mb-5">{editing ? "Edit Member" : "Add Team Member"}</h2>
              <div className="space-y-3">
                <div><label className="label">Full Name *</label><input className="input-field" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div><label className="label">Designation *</label><input className="input-field" placeholder="e.g. Program Director" value={form.designation} onChange={e=>setForm({...form,designation:e.target.value})} /></div>
                <div><label className="label">Description *</label><textarea rows={3} className="input-field resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
                <div><label className="label">Photo URL</label><input className="input-field" placeholder="https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} /></div>
                <div><label className="label">Display Order</label><input type="number" className="input-field" value={form.order} onChange={e=>setForm({...form,order:Number(e.target.value)})} /></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={save} disabled={saving} className="btn-primary flex-1 disabled:opacity-60">{saving ? "Saving..." : "Save Member"}</button>
                <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-3 font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
