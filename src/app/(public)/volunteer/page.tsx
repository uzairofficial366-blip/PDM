import VolunteerForm from "@/components/public/VolunteerForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return (
    <>
      <section className="bg-pdmGreen-500 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Join Our Volunteer Team</h1>
          <p className="text-white/80 text-lg">Be part of 200+ dedicated volunteers making a real difference in communities across KPK</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[["🤝","Community Impact","Work directly with communities in need"],["📚","Learn & Grow","Develop real-world skills and experience"],["🏆","Be Recognized","Receive certificates and letters of appreciation"]].map(([icon,title,desc])=>(
              <div key={title} className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-bold text-pdmBlue-600 text-sm mb-1">{title}</div>
                <div className="text-gray-500 text-xs">{desc}</div>
              </div>
            ))}
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
