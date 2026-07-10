import { useEffect, useState } from "react";
import { X, CalendarClock, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  poster_image: string | null;
}

export default function EventsModal({ onClose }: { onClose: () => void }) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      if (!error && data) setEvents(data as EventItem[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-ivory rounded-2xl max-w-2xl w-full mt-16 sm:mt-0 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="bg-ink rounded-t-2xl px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <p className="eyebrow text-gold">Upcoming</p>
            <h3 className="font-display text-xl sm:text-2xl text-ivory mt-1">
              Events &amp; Programs
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ivory/70 hover:text-gold">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {loading && <p className="text-sm text-ink/40 italic">Loading events…</p>}

          {!loading && events.length === 0 && (
            <div className="border border-dashed border-ink/15 rounded-xl p-6 text-center">
              <p className="text-sm text-ink/50">
                Nothing scheduled just yet. Check back soon, or reach out below to ask what's
                coming up.
              </p>
            </div>
          )}

          {events.map((e) => (
            <a
              key={e.id}
              href={`/event/${e.id}`}
              className="block bg-white rounded-xl border border-ink/10 p-5 hover:border-gold/40 transition-colors"
            >
              {e.poster_image && (
                <img src={e.poster_image} alt={e.title} className="w-full h-32 object-cover rounded-lg mb-3" />
              )}
              <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep">
                <CalendarClock size={13} />
                {e.event_date}
              </div>
              <h4 className="font-display text-lg mt-1">{e.title}</h4>
              {e.location && (
                <div className="flex items-center gap-1.5 text-xs text-ink/50 mt-1">
                  <MapPin size={12} />
                  {e.location}
                </div>
              )}
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{e.description}</p>
            </a>
          ))}

          <div className="bg-ink/5 rounded-xl p-5 space-y-3">
            <p className="font-label text-sm font-semibold text-ink/70 uppercase tracking-wide">
              Reserve your spot
            </p>
            <a href="tel:+254114675350" className="flex items-center gap-3 text-ink/80 hover:text-gold-deep">
              <Phone size={17} className="text-gold-deep shrink-0" />
              <span className="text-sm sm:text-base">+254 114 675 350</span>
            </a>
            <a
              href="mailto:b.aconnect254@gmail.com"
              className="flex items-center gap-3 text-ink/80 hover:text-gold-deep"
            >
              <Mail size={17} className="text-gold-deep shrink-0" />
              <span className="text-sm sm:text-base">b.aconnect254@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
