import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isVideoUrl } from "../lib/media";

interface Project {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string | null;
  social_link: string | null;
  photos: string[];
}

export default function DepartmentProjects({ department }: { department: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("department_projects")
        .select("*")
        .eq("department", department)
        .order("event_date", { ascending: false });
      if (active) {
        if (!error && data) setProjects(data as Project[]);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [department]);

  if (loading) {
    return <p className="text-sm text-ink/40 italic">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 rounded-xl p-6 text-center">
        <p className="text-sm text-ink/50">
          New stories from the ground are on their way. Check back soon, or follow our social
          pages for the latest updates from this department.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4">
      {projects.map((p) => {
        const cover = p.photos?.[0];
        return (
          <div key={p.id} className="rounded-xl overflow-hidden border border-ink/10 bg-white">
            {cover &&
              (isVideoUrl(cover) ? (
                <video src={cover} controls className="w-full h-40 object-cover bg-black" />
              ) : (
                <img src={cover} alt={p.title} className="w-full h-40 object-cover" />
              ))}
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep">
                <CalendarDays size={13} />
                {p.event_date}
              </div>
              {p.venue && (
                <div className="flex items-center gap-1.5 text-xs text-ink/45 mt-0.5">
                  <MapPin size={12} />
                  {p.venue}
                </div>
              )}
              <h4 className="font-display text-base mt-1">{p.title}</h4>
              <p className="text-sm text-ink/65 mt-1 leading-relaxed">{p.description}</p>
              {p.social_link && (
                <a
                  href={p.social_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-label font-semibold text-gold-deep mt-2 hover:text-gold"
                >
                  Watch / view <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
