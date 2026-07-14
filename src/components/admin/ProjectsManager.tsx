import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { DEPARTMENTS } from "../../lib/departmentsData";
import MediaUploader from "./MediaUploader";
import CopyLinkBox from "./CopyLinkBox";

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

const DESTINATIONS = [
  ...DEPARTMENTS.map((d) => ({ slug: d.slug, title: d.title })),
  { slug: "general-moments", title: "★ General / Moments Gallery (homepage)" },
];

const EMPTY: Omit<Project, "id"> = {
  department: DESTINATIONS[0].slug,
  title: "",
  description: "",
  event_date: "",
  venue: "",
  social_link: "",
  photos: [],
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | (Omit<Project, "id"> & { id?: string }) | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("department_projects")
      .select("*")
      .order("event_date", { ascending: false });
    if (data) setProjects(data as Project[]);
  }

  async function handleSave() {
    if (!editing || !editing.title.trim()) return;
    const payload = {
      department: editing.department,
      title: editing.title,
      description: editing.description,
      event_date: editing.event_date,
      venue: editing.venue,
      social_link: editing.social_link || null,
      photos: editing.photos,
    };
    if ("id" in editing && editing.id) {
      await supabase.from("department_projects").update(payload).eq("id", editing.id);
      setSavedId(editing.id);
    } else {
      const { data } = await supabase.from("department_projects").insert(payload).select().single();
      if (data) setSavedId(data.id);
    }
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project card?")) return;
    await supabase.from("department_projects").delete().eq("id", id);
    load();
  }

  function destinationLabel(slug: string) {
    return DESTINATIONS.find((d) => d.slug === slug)?.title || slug;
  }

  return (
    <div>
      <p className="text-sm text-ink/50 mb-4 max-w-lg">
        Use this for both department stories and the general Moments gallery on the homepage.
        Pick where each upload belongs, add up to 8 photos or videos, and you'll get a shareable
        link when you save — paste that into Push Notifications to announce it immediately.
      </p>
      <button
        onClick={() => {
          setEditing({ ...EMPTY });
          setSavedId(null);
        }}
        className="btn-gold mb-6"
      >
        <Plus size={15} />
        Add photo, video or project
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-ink/10 p-4">
            <p className="text-xs font-label text-gold-deep uppercase">{destinationLabel(p.department)}</p>
            <h4 className="font-display text-base mt-1">{p.title}</h4>
            <p className="text-xs text-ink/50 mt-1">
              {p.event_date} {p.venue ? `· ${p.venue}` : ""}
            </p>
            <p className="text-sm text-ink/60 mt-2 line-clamp-2">{p.description}</p>
            <div className="mt-3">
              <CopyLinkBox path={`/story/${p.id}`} />
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  setEditing(p);
                  setSavedId(null);
                }}
                className="text-ink/40 hover:text-gold-deep"
              >
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-ink/40 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg">
                {"id" in editing && editing.id ? "Edit" : "New"} upload
              </h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            {savedId && (
              <div>
                <p className="text-xs font-label text-green-700 font-semibold mb-1">
                  Saved! Here's the link to use in a push notification:
                </p>
                <CopyLinkBox path={`/story/${savedId}`} />
              </div>
            )}

            <label className="block text-xs font-label text-ink/50">Where does this belong?</label>
            <select
              value={editing.department}
              onChange={(e) => setEditing({ ...editing, department: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.title}
                </option>
              ))}
            </select>
            <input
              placeholder="Title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Date (e.g. 12 July 2026)"
                value={editing.event_date}
                onChange={(e) => setEditing({ ...editing, event_date: e.target.value })}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <input
                placeholder="Venue"
                value={editing.venue}
                onChange={(e) => setEditing({ ...editing, venue: e.target.value })}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Short description of what happened"
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <input
              placeholder="Social media video link (optional)"
              value={editing.social_link || ""}
              onChange={(e) => setEditing({ ...editing, social_link: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />

            <MediaUploader
              urls={editing.photos}
              onChange={(photos) => setEditing({ ...editing, photos })}
              maxPhotos={13}
              maxVideos={2}
            />

            <button onClick={handleSave} className="btn-gold w-full justify-center mt-2">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
