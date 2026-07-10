import { useEffect, useState } from "react";
import { CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isVideoUrl } from "../lib/media";

interface Moment {
  id: string;
  title: string;
  event_date: string;
  photos: string[];
}

export default function MomentsPreview() {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("department_projects")
        .select("id, title, event_date, photos")
        .eq("department", "general-moments")
        .order("event_date", { ascending: false })
        .limit(4);
      if (data) setMoments(data as Moment[]);
    }
    load();
  }, []);

  return (
    <section className="bg-ivory py-16 sm:py-24 border-t border-ink/5">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="eyebrow">Beyond the Departments</p>
            <h2 className="font-display text-3xl sm:text-4xl mt-2">Community Moments</h2>
            <p className="text-ink/60 text-sm sm:text-base mt-2 max-w-lg">
              Photos, short videos, and everyday moments from B.A Connect, on the ground and in
              our community.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="/articles" className="btn-outline !text-ink !border-ink/20 hover:!bg-ink hover:!text-gold">
              <Newspaper size={16} />
              Articles &amp; News
            </a>
            <a href="/moments" className="btn-gold">
              Explore Gallery
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {moments.length === 0 ? (
          <div className="border border-dashed border-ink/15 rounded-xl p-8 text-center">
            <p className="text-sm text-ink/45">
              Moments from the field are on their way. Check back soon.
            </p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
            {moments.map((m) => {
              const cover = m.photos?.[0];
              return (
                <a
                  key={m.id}
                  href="/moments"
                  className="shrink-0 w-56 sm:w-64 snap-start rounded-xl overflow-hidden border border-ink/10 bg-white"
                >
                  {cover &&
                    (isVideoUrl(cover) ? (
                      <video src={cover} muted className="w-full h-36 object-cover bg-black" />
                    ) : (
                      <img src={cover} alt={m.title} className="w-full h-36 object-cover" />
                    ))}
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-label text-gold-deep">
                      <CalendarDays size={12} />
                      {m.event_date}
                    </div>
                    <p className="font-display text-sm mt-1 line-clamp-2">{m.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
