"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/events", icon: "📅", label: "Events" },
  { href: "/admin/volunteers", icon: "🤝", label: "Volunteers" },
  { href: "/admin/team", icon: "👥", label: "Team Members" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <aside className="w-56 bg-pdmBlue-500 min-h-screen flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-pdmGreen-500 flex items-center justify-center text-white font-black text-xs">PDM</div>
          <span className="text-white font-black text-sm">Admin Portal</span>
        </div>
        <p className="text-white/40 text-xs">Pak Development Mission</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              pathname === item.href ? "bg-white/15 text-white border-l-2 border-pdmGreen-400" : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}>
            <span>{item.icon}</span>{item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all">
          🌐 View Website
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
