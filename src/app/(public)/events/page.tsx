import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({ where: { published: true }, orderBy: { date: "asc" } });
  } catch {}

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now);
  const past = events.filter(e => new Date(e.date) < now);

  const EventCard = ({ event, isPast }: { event: any; isPast: boolean }) => (
    <div className="card p-6 flex gap-5 items-start">
      <div className={`${isPast ? "bg-gray-400" : "bg-pdmBlue-500"} text-white rounded-xl p-3 text-center min-w-[64px] flex-shrink-0`}>
        <div className="text-2xl font-black">{new Date(event.date).getDate()}</div>
        <div className="text-xs font-bold opacity-80">{new Date(event.date).toLocaleString("default",{month:"short"})}</div>
        <div className="text-xs opacity-60">{new Date(event.date).getFullYear()}</div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-bold text-pdmBlue-600 text-lg">{event.title}</h3>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isPast ? "bg-gray-100 text-gray-500" : "bg-pdmGreen-100 text-pdmGreen-700"}`}>
            {isPast ? "Completed" : "Upcoming"}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span>📍 {event.location}</span>
          <span>📅 {new Date(event.date).toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-pdmBlue-500 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Events & Programs</h1>
          <p className="text-white/75 text-lg">Upcoming activities and past achievements of Pak Development Mission</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {upcoming.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-black text-pdmBlue-600 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-pdmGreen-500 rounded-full"></span> Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcoming.map(e => <EventCard key={e.id} event={e} isPast={false} />)}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-pdmBlue-600 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Past Events
              </h2>
              <div className="space-y-4">
                {past.map(e => <EventCard key={e.id} event={e} isPast={true} />)}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-lg font-semibold">No events yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
