import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getHomeData() {
  try {
    const [events, volunteers, teamCount] = await Promise.all([
      prisma.event.findMany({ where: { published: true }, orderBy: { date: "asc" }, take: 3 }),
      prisma.volunteer.count(),
      prisma.teamMember.count(),
    ]);
    return { events, volunteerCount: volunteers, teamCount };
  } catch {
    return { events: [], volunteerCount: 0, teamCount: 0 };
  }
}

export default async function HomePage() {
  const { events, volunteerCount } = await getHomeData();

  const focusAreas = [
    { icon: "👩‍👧", title: "Women & Child Rights", desc: "Primary healthcare, reproductive health, and economic empowerment programs for women and children in marginalized communities.", bg: "bg-green-50" },
    { icon: "🏘️", title: "Community Development", desc: "Comprehensive socioeconomic programs covering health, water, sanitation, education, agriculture, and micro-credits.", bg: "bg-blue-50" },
    { icon: "📚", title: "Education", desc: "Grassroots education programs, teacher training, and adult literacy with strong community participation.", bg: "bg-yellow-50" },
    { icon: "🚨", title: "Emergency Relief", desc: "Rapid volunteer-led response providing NFIs, food packages, and shelter support to disaster-affected communities.", bg: "bg-red-50" },
    { icon: "💊", title: "Health for All", desc: "Mother and child healthcare in coordination with provincial health departments for sustainable impact.", bg: "bg-purple-50" },
    { icon: "💼", title: "Youth Empowerment", desc: "Soft skills training, financial literacy, leadership development, and entrepreneurship programs for youth.", bg: "bg-teal-50" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-hero-pattern text-white pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block bg-pdmGreen-500/20 border border-pdmGreen-400/40 text-pdmGreen-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Est. 2009 · Registered 2012
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Empowering Communities,<br />
            <span className="text-pdmGreen-400">Building a Better Pakistan</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Pak Development Mission works tirelessly for the progress of marginalized communities in Khyber Pakhtunkhwa through capacity building, self-reliance, and social development.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/volunteer" className="btn-primary text-base px-8 py-4">Become a Volunteer</Link>
            <Link href="/about" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">Our Story →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {[
            { num: "200+", label: "Active Volunteers" },
            { num: "55,000+", label: "People Reached" },
            { num: "15+", label: "Years of Service" },
            { num: "20+", label: "Programs Completed" },
          ].map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <div className="text-3xl md:text-4xl font-black text-pdmGreen-500">{s.num}</div>
              <div className="text-sm text-gray-500 font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Mission & Vision</h2>
            <div className="w-12 h-1 bg-pdmGreen-500 rounded mx-auto mt-3"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-pdmBlue-50 border-l-4 border-pdmBlue-500 rounded-2xl p-8">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-pdmBlue-600 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To work tirelessly for the progress of people, recognizing their needs, and implementing efficient programs to humanize the marginalized sections of society through a positive, enlightened, and moderate approach.</p>
            </div>
            <div className="bg-pdmGreen-50 border-l-4 border-pdmGreen-500 rounded-2xl p-8">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-pdmGreen-600 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">To create a world where development and empowerment are achieved with the highest social values, resulting in improved living standards for marginalized communities across Pakistan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Core Focus Areas</h2>
            <p className="section-subtitle mx-auto">We address critical social issues through practical and effective solutions</p>
            <div className="w-12 h-1 bg-pdmGreen-500 rounded mx-auto mt-3"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <div key={area.title} className="card p-6">
                <div className={`w-12 h-12 ${area.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>{area.icon}</div>
                <h3 className="font-bold text-pdmBlue-600 text-lg mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Upcoming Events</h2>
              <div className="w-12 h-1 bg-pdmGreen-500 rounded mx-auto mt-3"></div>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="card p-6 flex gap-4 items-start">
                  <div className="bg-pdmBlue-500 text-white rounded-xl p-3 text-center min-w-[60px] flex-shrink-0">
                    <div className="text-2xl font-black">{new Date(event.date).getDate()}</div>
                    <div className="text-xs font-bold opacity-80">{new Date(event.date).toLocaleString("default",{month:"short"})}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-pdmBlue-600 text-lg mb-1">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>📍 {event.location}</span>
                      <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/events" className="btn-secondary">View All Events →</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 bg-pdmGreen-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/80 text-lg mb-8">Join our {volunteerCount > 0 ? `${volunteerCount}+` : "200+"} volunteers working to transform communities across Khyber Pakhtunkhwa.</p>
          <Link href="/volunteer" className="bg-white text-pdmGreen-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-block">Join as Volunteer Today →</Link>
        </div>
      </section>
    </>
  );
}
