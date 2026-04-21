"use client";
import { useState } from "react";

export default function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccess(true);
      setForm({ name:"", email:"", phone:"", message:"" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="bg-pdmGreen-50 border border-pdmGreen-300 rounded-2xl p-8 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-2xl font-bold text-pdmGreen-700 mb-2">Application Submitted!</h3>
      <p className="text-pdmGreen-600">Thank you! Our team will review your application and contact you soon.</p>
      <button onClick={() => setSuccess(false)} className="mt-6 btn-primary">Submit Another</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-pdmBlue-600 mb-2">Volunteer Registration</h2>
      <p className="text-gray-500 text-sm mb-6">Fill in the form below and our team will review your application.</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label">Full Name *</label>
          <input required className="input-field" placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        </div>
        <div>
          <label className="label">Email Address *</label>
          <input required type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
      </div>
      <div className="mb-4">
        <label className="label">Phone Number *</label>
        <input required className="input-field" placeholder="0300-0000000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
      </div>
      <div className="mb-6">
        <label className="label">Why do you want to volunteer? *</label>
        <textarea required rows={4} className="input-field resize-none" placeholder="Tell us about your motivation and how you'd like to contribute..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-60">
        {loading ? "Submitting..." : "Submit Application →"}
      </button>
    </form>
  );
}
