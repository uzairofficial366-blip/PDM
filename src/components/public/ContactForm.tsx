"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccess(true);
      setForm({ name:"", email:"", phone:"", subject:"", message:"" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="bg-pdmGreen-50 border border-pdmGreen-300 rounded-2xl p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="text-xl font-bold text-pdmGreen-700 mb-2">Message Sent!</h3>
      <p className="text-pdmGreen-600 text-sm">We'll get back to you as soon as possible.</p>
      <button onClick={() => setSuccess(false)} className="mt-4 btn-primary text-sm">Send Another</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-pdmBlue-600 mb-5">Send a Message</h3>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="label">Name *</label><input required className="input-field" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
        <div><label className="label">Email *</label><input required type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="label">Phone</label><input className="input-field" placeholder="0300-0000000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
        <div><label className="label">Subject *</label><input required className="input-field" placeholder="Message subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} /></div>
      </div>
      <div className="mb-5"><label className="label">Message *</label><textarea required rows={4} className="input-field resize-none" placeholder="Your message..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></div>
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "Sending..." : "Send Message →"}</button>
    </form>
  );
}
