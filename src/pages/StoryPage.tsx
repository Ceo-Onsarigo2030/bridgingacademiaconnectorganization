import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, ExternalLink, Instagram, Facebook, Music2, Linkedin } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isVideoUrl } from "../lib/media";
import { DEPARTMENTS } from "../lib/departmentsData";
import { useLike } from "../lib/useLike";

interface Project {
  id: string;
  department: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  social_link: string | null;
  photos: string[];
  likes: number;
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/b.a_connect_organization?igsh=a2F6c2o0a2Q4ZzVt", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/BaConnectOrg1?mibextid=ZbWKwL", icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com/@b.a_connect_organization", icon: Music2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bridging-academia-connect-organization/", icon: Linkedin },
];

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

  const { likes, liked, react } = useLike(id || "", project?.likes || 0);

  const departmentLabel =
    project?.department === "general-moments"
      ? "Community Moments"
      : DEPARTMENTS.find((d) => d.slug === project?.department)?.title || project?.department;

  const photos = project?.photos?.filter((p) => !isVideoUrl(p)) || [];
  const videos = project?.photos?.filter(isVideoUrl) || [];
  const cover = project?.photos?.[0];

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

      <div className="container-page py-8 sm:py-12 max-w-2xl">
        {loading && <p className="text-center text-ink/40 text-sm">Loading…</p>}
        {notFound && (
          <div className="border border-dashed border-ink/15 rounded-xl p-10 text-center">
            <p className="text-sm text-ink/50">This story couldn't be found.</p>
          </div>
        )}

        {project && (
          <div>
            {/* 1. Cover photo, clear and prominent */}
            {cover &&
              (isVideoUrl(cover) ? (
                <video src={cover} controls className="w-full rounded-2xl bg-black max-h-[420px]" />
              ) : (
                <img
                  src={cover}
                  alt={project.title}
                  className="w-full rounded-2xl object-cover max-h-[420px]"
                />
              ))}

            {/* 2. Title, description, date, venue right under the cover */}
            <div className="mt-5">
              <div className="flex items-center gap-1.5 text-xs font-label text-gold-deep">
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
              <p className="text-sm sm:text-base text-ink/70 mt-3 leading-relaxed">
                {project.description}
              </p>

              <button onClick={react} className="flex items-center gap-2 mt-4" aria-label="React with love">
                <span className={`text-xl transition-transform ${liked ? "scale-110" : ""}`}>💛</span>
                <span className="text-sm text-ink/50 font-label">{likes} reactions</span>
              </button>
            </div>

            {/* 3. Remaining photos, compact, clearly labeled, not taking over the page */}
            {photos.length > 1 && (
              <div className="mt-8">
                <p className="font-label text-xs uppercase tracking-wide text-ink/45 mb-2">Photos</p>
                <div className="grid grid-cols-4 gap-2">
                  {photos.slice(1).map((p, i) => (
                    <img key={i} src={p} alt="" className="h-20 w-full object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {/* 4. Videos kept in their own small section */}
            {videos.length > 0 && (
              <div className="mt-6">
                <p className="font-label text-xs uppercase tracking-wide text-ink/45 mb-2">Videos</p>
                <div className="grid grid-cols-2 gap-2">
                  {videos.map((v, i) => (
                    <video key={i} src={v} controls className="w-full h-32 object-cover rounded-lg bg-black" />
                  ))}
                </div>
              </div>
            )}

            {/* 5. Redirect link to watch/see more */}
            {project.social_link && (
              <a
                href={project.social_link}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-8"
              >
                Watch &amp; See More <ExternalLink size={14} />
              </a>
            )}

            {/* 6. Social follow block */}
            <div className="bg-ink rounded-2xl p-6 mt-10 text-center">
              <p className="font-display text-ivory text-lg">Follow B.A Connect Organization</p>
              <p className="text-ivory/60 text-sm mt-1.5">
                Follow, like, and comment — every bit of support helps us reach more people.
              </p>
              <div className="flex justify-center gap-3 mt-5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/20 text-gold/80 hover:bg-gold hover:text-ink transition-colors"
                  >
                    <s.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
