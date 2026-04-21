import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

const pillars = [
  { icon: "👩‍⚕️", label: "Women & Child Rights" },
  { icon: "🏘️", label: "Community Development" },
  { icon: "💪", label: "Women Empowerment" },
  { icon: "🚑", label: "Emergency Relief" },
  { icon: "❤️", label: "Health for All" },
  { icon: "📚", label: "Education" },
  { icon: "🧠", label: "Psychosocial Support" },
  { icon: "📊", label: "Monitoring & Evaluation" },
  { icon: "🤝", label: "Volunteerism" },
];

const achievements = [
  { icon: "💰", title: "National Financial Literacy Program", desc: "Reached 55,000+ individuals across KPK in partnership with State Bank of Pakistan & Asian Development Bank." },
  { icon: "🏆", title: "Khyber Excellence Awards", desc: "Recognized 50 outstanding youth from 150+ applications across various fields in KPK." },
  { icon: "🍱", title: "Ramzan Relief Packages", desc: "Distributed food packages to 130+ families in need across Peshawar, Charsadda, and Mardan." },
  { icon: "📜", title: "MoU with APWA & QAF KP", desc: "Formal partnerships signed for long-term collaboration on relief and development programs." },
  { icon: "🎵", title: "Sheenkhaly Night", desc: "Cultural event celebrating Pashto music and youth talent, launching new songs by Tamash Band." },
  { icon: "🌊", title: "Flood Relief Operations", desc: "Rapid emergency response providing food, shelter, and NFIs to flood-affected communities." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-pdmBlue-500 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Pak Development Mission</h1>
          <p className="text-white/75 text-lg leading-relaxed">A group of intellectuals, academicians, and youth united by the vision of a better Pakistan</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-14">
            <div>
              <h2 className="text-2xl font-black text-pdmBlue-600 mb-6">Organization Profile</h2>
              <div className="space-y-3">
                {[
                  ["Full Name","Pak Development Mission"],["Short Name","PDM"],["Founded","2009"],
                  ["Registered","October 4, 2012"],["Reg. No","1331/5/7464"],
                  ["Act","Societies Act XXI of 1860"],["Type","Non-Profit / NGO"],
                  ["Province","Khyber Pakhtunkhwa, Pakistan"],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500 font-medium">{k}</span>
                    <span className="font-bold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-pdmBlue-600 mb-6">Contact Information</h2>
              <div className="space-y-3">
                {[
                  ["Head Office","Peshawar, KPK"],["Address","Chamkani Tower, Paharipura Road, Ring Road"],
                  ["Phone","0092-91-5863189"],["Mobile","0092-3018567266"],
                  ["Email","zertashiashah@gmail.com"],["ECO","Zertashia Jamal"],
                  ["Facebook","@pakdevelopmentmission"],["Coverage","KPK & Newly Merged Districts"],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-500 font-medium">{k}</span>
                    <span className="font-bold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-14">
            <h2 className="text-2xl font-black text-pdmBlue-600 mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Pak Development Mission (PDM) was established in 2009 by a passionate group of intellectuals, academicians, and youth who shared a common vision — to contribute meaningfully to the development of Pakistan's most marginalized communities.</p>
              <p>Formally registered on October 4, 2012 under the Societies Act XXI of 1860 (Reg. No. 1331/5/7464), PDM has since grown into a trusted non-profit organization with over 200 volunteers operating across Khyber Pakhtunkhwa and the Newly Merged Districts.</p>
              <p>Through programs in women's empowerment, emergency relief, education, health, financial literacy, and community development, PDM has directly reached over 55,000 individuals — creating lasting change in the lives of those who need it most.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-pdmBlue-600 mb-6 text-center">Our Philosophical Pillars</h2>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-14">
            {pillars.map(p=>(
              <div key={p.label} className="bg-pdmGreen-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="text-xs font-bold text-pdmGreen-700 leading-tight">{p.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-pdmBlue-600 mb-8 text-center">Key Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(a=>(
              <div key={a.title} className="card p-6">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-bold text-pdmBlue-600 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
