"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pdmGreen-500 to-pdmBlue-500 flex items-center justify-center text-white font-black text-xl mx-auto mb-4">PDM</div>
          <h1 className="text-2xl font-black text-pdmBlue-600">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage PDM content</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input required type="email" className="input-field" placeholder="admin@pdm.org.pk" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            </div>
            <div>
              <label className="label">Password</label>
              <input required type="password" className="input-field" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">Default: admin@pdm.org.pk / admin123</p>
        </div>
      </div>
    </div>
  );
}
