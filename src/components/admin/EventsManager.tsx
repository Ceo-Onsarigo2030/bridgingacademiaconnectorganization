import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

const EMPTY: Omit<EventItem, "id"> = {
  title: "",
  description: "",
  event_date: "",
  location: "",
};

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<EventItem | (Omit<EventItem, "id"> & { id?: string }) | null>(
    null
  );

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    if (data) setEvents(data as EventItem[]);
  }

  async function handleSave() {
    if (!editing || !editing.title.trim()) return;
    const payload = {
      title: editing.title,
      description: editing.description,
      event_date: editing.event_date,
      location: editing.location,
    };
    if ("id" in editing && editing.id) {
      await supabase.from("events").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("events").insert(payload);
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <button onClick={() => setEditing({ ...EMPTY })} className="btn-gold mb-6">
        <Plus size={15} />
        Add event or program
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        {events.map((e) => (
          <div key={e.id} className="bg-white rounded-xl border border-ink/10 p-4">
            <p className="text-xs text-ink/50">{e.event_date}</p>
            <h4 className="font-display text-base mt-1">{e.title}</h4>
            {e.location && <p className="text-xs text-ink/40 mt-1">{e.location}</p>}
            <p className="text-sm text-ink/60 mt-2 line-clamp-2">{e.description}</p>
            <div className="flex gap-3 mt-3">
              <button onClick={() => setEditing(e)} className="text-ink/40 hover:text-gold-deep">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(e.id)} className="text-ink/40 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg">
                {"id" in editing && editing.id ? "Edit" : "New"} event
              </h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>
            <input
              placeholder="Title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <input
              placeholder="Date (e.g. 20 August 2026)"
              value={editing.event_date}
              onChange={(e) => setEditing({ ...editing, event_date: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <input
              placeholder="Location (optional)"
              value={editing.location}
              onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Short description"
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <button onClick={handleSave} className="btn-gold w-full justify-center mt-2">
              Save event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
