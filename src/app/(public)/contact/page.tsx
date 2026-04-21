import ContactForm from "@/components/public/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-pdmBlue-500 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get In Touch</h1>
          <p className="text-white/75 text-lg">Reach out for partnerships, donations, volunteering, or general inquiries.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-pdmBlue-600 mb-6">Contact Information</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon:"📍", title:"Head Office", lines:["Chamkani Tower, Paharipura Road","Ring Road, Peshawar, KPK, Pakistan"] },
                { icon:"📞", title:"Phone", lines:["0092 – 91 – 5863189","0092 – 3018567266"] },
                { icon:"✉️", title:"Email", lines:["zertashiashah@gmail.com"] },
                { icon:"👤", title:"Contact Person", lines:["Zertashia Jamal","Executive Chief Officer (ECO)"] },
                { icon:"🏛️", title:"Registration", lines:["Reg. No: 1331/5/7464","Societies Act XXI of 1860","Registered: October 4, 2012"] },
              ].map(item=>(
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-pdmBlue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-pdmBlue-600 text-sm mb-0.5">{item.title}</h4>
                    {item.lines.map(l=><p key={l} className="text-gray-600 text-sm">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-pdmGreen-50 border border-pdmGreen-200 rounded-xl p-5">
              <h4 className="font-bold text-pdmGreen-700 mb-2">Partner With Us</h4>
              <p className="text-pdmGreen-600 text-sm leading-relaxed">PDM welcomes partnerships with international organizations, donors, and local institutions. We have active MoUs with Quick Action Foundation KP and APWA KP.</p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
