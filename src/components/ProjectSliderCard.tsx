import { CalendarDays, MapPin, Images } from "lucide-react";
import { isVideoUrl } from "../lib/media";
import { useLike } from "../lib/useLike";

interface Project {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue?: string | null;
  photos: string[];
  likes?: number;
}

export default function ProjectSliderCard({ project }: { project: Project }) {
  const { likes, liked, react } = useLike(project.id, project.likes || 0);
  const cover = project.photos?.[0];

  return (
    <div className="shrink-0 w-64 sm:w-72 snap-start rounded-2xl overflow-hidden border border-ink/10 bg-white">
      <a href={`/story/${project.id}`} className="block">
        {cover &&
          (isVideoUrl(cover) ? (
            <video src={cover} muted className="w-full h-40 object-cover bg-black" />
          ) : (
            <img src={cover} alt={project.title} className="w-full h-40 object-cover" />
          ))}
      </a>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-label text-gold-deep">
          <CalendarDays size={12} />
          {project.event_date}
        </div>
        {project.venue && (
          <div className="flex items-center gap-1.5 text-[11px] text-ink/45 mt-0.5">
            <MapPin size={11} />
            {project.venue}
          </div>
        )}
        <a href={`/story/${project.id}`}>
          <p className="font-display text-sm mt-1.5 line-clamp-2">{project.title}</p>
        </a>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={react}
            className="flex items-center gap-1.5 text-sm"
            aria-label="React with love"
          >
            <span className={`text-lg transition-transform ${liked ? "scale-110" : ""}`}>💛</span>
            <span className="text-xs text-ink/50 font-label">{likes}</span>
          </button>
          <a
            href={`/story/${project.id}`}
            className="flex items-center gap-1 text-[11px] font-label font-semibold text-gold-deep hover:text-gold"
          >
            <Images size={12} />
            View Gallery
          </a>
        </div>
      </div>
    </div>
  );
}
