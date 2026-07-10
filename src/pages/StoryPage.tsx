import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isVideoUrl } from "../lib/media";
import { DEPARTMENTS } from "../lib/departmentsData";

interface Project {
  id: string;
  department: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  social_link: string | null;
  photos: string[];
}

export default function StoryPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("department_projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        setNotFound(true);
      } else {
        setProject(data as Project);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const departmentLabel =
    project?.department === "general-moments"
      ? "Community Moments"
      : DEPARTMENTS.find((d) => d.slug === project?.department)?.title || project?.department;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page h-16 sm:h-20 flex items-center gap-3">
          <a href="/" className="text-ivory/70 hover:text-gold">
            <ArrowLeft size={20} />
          </a>
          <div>
            <p className="eyebrow text-gold">B.A Connect</p>
            <h1 className="font-display text-lg text-ivory leading-none mt-1">{departmentLabel}</h1>
          </div>
        </div>
      </div>

      <div className="container-page py-10 sm:py-16 max-w-2xl">
        {loading && <p className="text-center text-ink/40 text-sm">Loading…</p>}
        {notFound && (
          <div className="border border-dashed border-ink/15 rounded-xl p-10 text-center">
            <p className="text-sm text-ink/50">This story couldn't be found.</p>
          </div>
        )}

        {project && (
          <div>
            {project.photos?.[0] &&
              (isVideoUrl(project.photos[0]) ? (
                <video src={project.photos[0]} controls className="w-full rounded-2xl bg-black max-h-[420px]" />
              ) : (
                <img
                  src={project.photos[0]}
                  alt={project.title}
                  className="w-full rounded-2xl object-cover max-h-[420px]"
                />
              ))}

            {project.photos && project.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {project.photos.slice(1).map((p, i) =>
                  isVideoUrl(p) ? (
                    <video key={i} src={p} muted className="h-20 w-full object-cover rounded-lg bg-black" />
                  ) : (
                    <img key={i} src={p} alt="" className="h-20 w-full object-cover rounded-lg" />
                  )
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep mt-6">
              <CalendarDays size={13} />
              {project.event_date}
            </div>
            {project.venue && (
              <div className="flex items-center gap-1.5 text-xs text-ink/45 mt-1">
                <MapPin size={12} />
                {project.venue}
              </div>
            )}
            <h2 className="font-display text-2xl mt-2">{project.title}</h2>
            <p className="text-sm sm:text-base text-ink/70 mt-3 leading-relaxed">{project.description}</p>

            {project.social_link && (
              <a
                href={project.social_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-label font-semibold text-gold-deep mt-4 hover:text-gold"
              >
                Watch on social media <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
