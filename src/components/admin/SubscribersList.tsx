import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function SubscribersList() {
  const [subs, setSubs] = useState<Subscriber[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubs(data as Subscriber[]);
  }

  function exportCsv() {
    const csv = "email,subscribed_at\n" + subs.map((s) => `${s.email},${s.created_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ba-connect-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-ink/60">{subs.length} subscriber(s)</p>
        <button onClick={exportCsv} className="btn-outline !text-ink !border-ink/20 !py-2">
          <Download size={14} />
          Export CSV
        </button>
      </div>
      <div className="bg-white rounded-xl border border-ink/10 divide-y divide-ink/5">
        {subs.map((s) => (
          <div key={s.id} className="px-4 py-2.5 flex justify-between text-sm">
            <span className="text-ink/75">{s.email}</span>
            <span className="text-ink/35 text-xs">{new Date(s.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
