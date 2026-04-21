import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pdmBlue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pdmGreen-500 to-pdmBlue-300 flex items-center justify-center">
                <span className="text-white font-black text-sm">PDM</span>
              </div>
              <div>
                <div className="font-black text-lg leading-tight">Pak Development Mission</div>
                <div className="text-pdmGreen-400 text-sm">Empowering Communities Since 2009</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              A non-profit organization working towards social development and empowerment of marginalized communities in Khyber Pakhtunkhwa, Pakistan.
            </p>
            <p className="text-white/40 text-xs mt-3">Reg. No: 1331/5/7464 | Societies Act XXI of 1860</p>
          </div>
          <div>
            <h4 className="font-bold text-pdmGreen-400 uppercase tracking-wider text-xs mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[["Home","/"],["About","/about"],["Events","/events"],["Our Team","/team"],["Volunteer","/volunteer"],["Contact","/contact"]].map(([label,href])=>(
                <Link key={href} href={href} className="block text-sm text-white/60 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-pdmGreen-400 uppercase tracking-wider text-xs mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>📞 0092-91-5863189</p>
              <p>📱 0092-3018567266</p>
              <p>✉️ zertashiashah@gmail.com</p>
              <p>📍 Chamkani Tower, Ring Road, Peshawar, KPK</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Pak Development Mission. All rights reserved.</p>
          <Link href="/admin" className="text-white/30 text-xs hover:text-white/60 transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}
