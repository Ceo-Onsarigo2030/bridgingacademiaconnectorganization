import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Ticket } from "lucide-react";
import { supabase } from "../lib/supabase";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  poster_image: string | null;
  ticket_link: string | null;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
      if (data) setEvent(data as EventItem);
      setLoading(false);
    }
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page h-16 sm:h-20 flex items-center gap-3">
          <a href="/" className="text-ivory/70 hover:text-gold">
            <ArrowLeft size={20} />
          </a>
          <div>
            <p className="eyebrow text-gold">B.A Connect</p>
            <h1 className="font-display text-lg text-ivory leading-none mt-1">Event</h1>
          </div>
        </div>
      </div>

      <div className="container-page py-10 sm:py-16 max-w-2xl">
        {loading && <p className="text-center text-ink/40 text-sm">Loading…</p>}
        {!loading && !event && (
          <div className="border border-dashed border-ink/15 rounded-xl p-10 text-center">
            <p className="text-sm text-ink/50">This event couldn't be found.</p>
          </div>
        )}

        {event && (
          <div>
            {event.poster_image && (
              <img
                src={event.poster_image}
                alt={event.title}
                className="w-full rounded-2xl object-cover max-h-[420px]"
              />
            )}
            <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep mt-6">
              <CalendarDays size={13} />
              {event.event_date}
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5 text-xs text-ink/45 mt-1">
                <MapPin size={12} />
                {event.location}
              </div>
            )}
            <h2 className="font-display text-2xl mt-2">{event.title}</h2>
            <p className="text-sm sm:text-base text-ink/70 mt-3 leading-relaxed">{event.description}</p>

            {event.ticket_link ? (
              <a
                href={event.ticket_link}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-6"
              >
                <Ticket size={16} />
                Get Ticket / Gate Pass
              </a>
            ) : (
              <div className="bg-ink/5 rounded-xl p-5 mt-6">
                <p className="text-sm text-ink/60">
                  No ticket required — reach out to us directly to reserve your spot.
                </p>
                <a href="tel:+254114675350" className="text-sm text-gold-deep font-label font-semibold mt-2 inline-block">
                  +254 114 675 350
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
