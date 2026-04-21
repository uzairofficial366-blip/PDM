import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Team" };

const avatarColors = [
  "from-pdmBlue-500 to-pdmBlue-700",
  "from-pdmGreen-500 to-pdmGreen-700",
  "from-purple-500 to-purple-700",
  "from-orange-500 to-orange-700",
  "from-cyan-500 to-cyan-700",
  "from-rose-500 to-rose-700",
  "from-teal-500 to-teal-700",
  "from-indigo-500 to-indigo-700",
];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

export default async function TeamPage() {
  let members: any[] = [];
  try {
    members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  } catch {}

  return (
    <>
      <section className="bg-pdmBlue-500 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Team</h1>
          <p className="text-white/75 text-lg">Dedicated professionals working to make a difference across Khyber Pakhtunkhwa</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {members.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, i) => (
                <div key={member.id} className="card p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-pdmGreen-100" />
                  ) : (
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-2xl font-black mx-auto mb-4`}>
                      {getInitials(member.name)}
                    </div>
                  )}
                  <h3 className="font-bold text-pdmBlue-600 text-xl mb-1">{member.name}</h3>
                  <p className="text-pdmGreen-600 font-bold text-sm mb-4">{member.designation}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">👥</div>
              <p className="text-lg font-semibold">Team members coming soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
