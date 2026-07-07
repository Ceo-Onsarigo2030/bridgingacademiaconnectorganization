import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Feedback {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}

export default function FeedbackModeration() {
  const [items, setItems] = useState<Feedback[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as Feedback[]);
  }

  async function approve(id: string) {
    await supabase.from("feedback").update({ approved: true }).eq("id", id);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this feedback permanently?")) return;
    await supabase.from("feedback").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-ink/40 text-sm">No feedback submitted yet.</p>}
      {items.map((f) => (
        <div key={f.id} className="bg-white rounded-xl border border-ink/10 p-4 flex justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-ink/75">{f.message}</p>
            <p className="text-xs text-ink/40 mt-1">
              &mdash; {f.name} &middot; {f.approved ? "Published" : "Pending review"}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {!f.approved && (
              <button
                onClick={() => approve(f.id)}
                className="h-8 w-8 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center hover:bg-green-500/20"
                aria-label="Approve"
              >
                <Check size={14} />
              </button>
            )}
            <button
              onClick={() => remove(f.id)}
              className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
