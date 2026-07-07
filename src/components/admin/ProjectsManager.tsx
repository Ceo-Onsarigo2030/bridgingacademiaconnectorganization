import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { DEPARTMENTS } from "../../lib/departmentsData";

interface Project {
  id: string;
  department: string;
  title: string;
  description: string;
  event_date: string;
  social_link: string | null;
  photos: string[];
}

const PROJECT_DEPARTMENTS = DEPARTMENTS.filter((d) => d.hasProjects);

const EMPTY: Omit<Project, "id"> = {
  department: PROJECT_DEPARTMENTS[0]?.slug || "",
  title: "",
  description: "",
  event_date: "",
  social_link: "",
  photos: [],
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | (Omit<Project, "id"> & { id?: string }) | null>(null);
  const [photoInput, setPhotoInput] = useState("");

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
      social_link: editing.social_link || null,
      photos: editing.photos,
    };
    if ("id" in editing && editing.id) {
      await supabase.from("department_projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("department_projects").insert(payload);
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project card?")) return;
    await supabase.from("department_projects").delete().eq("id", id);
    load();
  }

  function addPhoto() {
    if (!photoInput.trim() || !editing) return;
    setEditing({ ...editing, photos: [...editing.photos, photoInput.trim()] });
    setPhotoInput("");
  }

  return (
    <div>
      <button onClick={() => setEditing({ ...EMPTY })} className="btn-gold mb-6">
        <Plus size={15} />
        Add project or event
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-ink/10 p-4">
            <p className="text-xs font-label text-gold-deep uppercase">{p.department}</p>
            <h4 className="font-display text-base mt-1">{p.title}</h4>
            <p className="text-xs text-ink/50 mt-1">{p.event_date}</p>
            <p className="text-sm text-ink/60 mt-2 line-clamp-2">{p.description}</p>
            <div className="flex gap-3 mt-3">
              <button onClick={() => setEditing(p)} className="text-ink/40 hover:text-gold-deep">
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
                {"id" in editing && editing.id ? "Edit" : "New"} project / event
              </h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            <select
              value={editing.department}
              onChange={(e) => setEditing({ ...editing, department: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            >
              {PROJECT_DEPARTMENTS.map((d) => (
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
            <input
              placeholder="Date (e.g. 12 July 2026)"
              value={editing.event_date}
              onChange={(e) => setEditing({ ...editing, event_date: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
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

            <div>
              <p className="text-xs font-label text-ink/50 mb-1">
                Photo URLs (paste from Media Library, 4-7 recommended)
              </p>
              <div className="flex gap-2">
                <input
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm"
                />
                <button onClick={addPhoto} className="btn-outline !text-ink !border-ink/20 !py-2">
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {editing.photos.map((url, i) => (
                  <li key={i} className="text-xs text-ink/50 truncate flex justify-between gap-2">
                    <span className="truncate">{url}</span>
                    <button
                      onClick={() =>
                        setEditing({ ...editing, photos: editing.photos.filter((_, j) => j !== i) })
                      }
                      className="text-red-400 shrink-0"
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={handleSave} className="btn-gold w-full justify-center mt-2">
              Save project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
