import { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

const FIELDS = [
  {
    key: "welcome_message",
    label: "Top moving welcome message",
    type: "text" as const,
    default: "Hello! Welcome to B.A Connect. B.A Connect is Home.",
  },
  {
    key: "take_action_drive",
    label: "Take Action drive (title / dates / phone / till)",
    type: "json" as const,
    default: {
      title: "Sanitary Pads & Menstrual Hygiene Drive",
      dateRange: "1st October — 31st October",
      phone: "+254 114 675 350",
      till: "3463959",
    },
  },
  {
    key: "stats",
    label: "Stats bar (founded / departments / initiatives / impact)",
    type: "json" as const,
    default: [
      { value: "27 Mar 2025", label: "Founded" },
      { value: "4", label: "Organization Departments" },
      { value: "6", label: "Active Initiatives" },
      { value: "1,000+", label: "Communities & Youths Empowered" },
    ],
  },
];

export default function ContentEditor() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("site_content").select("key, value");
    const map: Record<string, string> = {};
    for (const f of FIELDS) {
      const row = data?.find((d) => d.key === f.key);
      map[f.key] =
        f.type === "json"
          ? JSON.stringify(row?.value ?? f.default, null, 2)
          : (row?.value as string) ?? (f.default as string);
    }
    setValues(map);
    setLoading(false);
  }

  async function save(key: string, type: "text" | "json") {
    let parsed: unknown = values[key];
    if (type === "json") {
      try {
        parsed = JSON.parse(values[key]);
      } catch {
        alert("That field isn't valid JSON. Please check formatting (brackets, quotes, commas).");
        return;
      }
    }
    await supabase.from("site_content").upsert({ key, value: parsed });
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  if (loading) return <p className="text-ink/40 text-sm">Loading content…</p>;

  return (
    <div className="space-y-6">
      {FIELDS.map((f) => (
        <div key={f.key} className="bg-white rounded-xl border border-ink/10 p-5">
          <label className="font-label text-xs uppercase tracking-wide text-ink/50">
            {f.label}
          </label>
          <textarea
            value={values[f.key] || ""}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            rows={f.type === "json" ? 6 : 2}
            className="w-full mt-2 rounded-lg border border-ink/15 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gold"
          />
          <button
            onClick={() => save(f.key, f.type)}
            className="mt-3 inline-flex items-center gap-2 text-xs font-label font-semibold text-gold-deep hover:text-gold"
          >
            {saved === f.key ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saved === f.key ? "Saved" : "Save changes"}
          </button>
        </div>
      ))}
    </div>
  );
}
