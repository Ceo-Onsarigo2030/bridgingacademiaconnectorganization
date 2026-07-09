import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isVideoUrl } from "../lib/media";

interface Moment {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  photos: string[];
}

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("department_projects")
        .select("*")
        .eq("department", "general-moments")
        .order("event_date", { ascending: false });
      if (data) setMoments(data as Moment[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page h-16 sm:h-20 flex items-center gap-3">
          <a href="/" className="text-ivory/70 hover:text-gold">
            <ArrowLeft size={20} />
          </a>
          <div>
            <p className="eyebrow text-gold">B.A Connect</p>
            <h1 className="font-display text-lg text-ivory leading-none mt-1">Community Moments</h1>
          </div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        {loading && <p className="text-center text-ink/40 text-sm">Loading gallery…</p>}

        {!loading && moments.length === 0 && (
          <div className="border border-dashed border-ink/15 rounded-xl p-10 text-center max-w-lg mx-auto">
            <p className="text-sm text-ink/50">
              This gallery is just getting started. Moments from the field will appear here soon.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((m) => {
            const cover = m.photos?.[0];
            return (
              <div key={m.id} className="rounded-2xl overflow-hidden border border-ink/10 bg-white">
                {cover &&
                  (isVideoUrl(cover) ? (
                    <video src={cover} controls className="w-full h-52 object-cover bg-black" />
                  ) : (
                    <img src={cover} alt={m.title} className="w-full h-52 object-cover" />
                  ))}
                {m.photos && m.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-0.5 bg-ink/5 p-0.5">
                    {m.photos.slice(1, 4).map((p, i) =>
                      isVideoUrl(p) ? (
                        <video key={i} src={p} muted className="h-16 w-full object-cover bg-black" />
                      ) : (
                        <img key={i} src={p} alt="" className="h-16 w-full object-cover" />
                      )
                    )}
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep">
                    <CalendarDays size={13} />
                    {m.event_date}
                  </div>
                  {m.venue && (
                    <div className="flex items-center gap-1.5 text-xs text-ink/45 mt-0.5">
                      <MapPin size={12} />
                      {m.venue}
                    </div>
                  )}
                  <h3 className="font-display text-lg mt-2">{m.title}</h3>
                  <p className="text-sm text-ink/65 mt-1.5 leading-relaxed">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
