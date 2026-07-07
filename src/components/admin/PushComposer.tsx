import { useEffect, useState, FormEvent } from "react";
import { Send, History } from "lucide-react";
import { supabase } from "../../lib/supabase";

const TYPES = ["Article", "Event", "Drive", "Newsletter", "Post", "Announcement"];

interface NotificationRecord {
  id: string;
  title: string;
  body: string;
  type: string;
  sent_to: number;
  created_at: string;
}

export default function PushComposer() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("/");
  const [type, setType] = useState(TYPES[0]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<NotificationRecord[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(15);
    if (data) setHistory(data as NotificationRecord[]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    const { data, error } = await supabase.functions.invoke("send-push", {
      body: { title, body, url, type },
    });
    setSending(false);
    if (error) {
      setResult("Something went wrong sending this push. Check the function logs.");
      return;
    }
    setResult(`Sent to ${data.sent} subscriber(s).`);
    setTitle("");
    setBody("");
    loadHistory();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-ink/10 p-5 space-y-3">
        <div className="flex gap-2 flex-wrap">
          {TYPES.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-label font-semibold ${
                type === t ? "bg-gold text-ink" : "bg-ink/5 text-ink/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          required
          placeholder="Notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
        />
        <textarea
          required
          placeholder="Short message"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
        />
        <input
          placeholder="Link to open when tapped (e.g. /#departments)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
        />
        <button type="submit" disabled={sending} className="btn-gold w-full justify-center">
          <Send size={15} />
          {sending ? "Sending…" : "Send to everyone subscribed"}
        </button>
        {result && <p className="text-xs text-ink/60">{result}</p>}
      </form>

      <div className="mt-8">
        <p className="flex items-center gap-2 text-xs font-label uppercase tracking-wide text-ink/50 mb-3">
          <History size={13} /> Recent notifications
        </p>
        <div className="space-y-2">
          {history.map((h) => (
            <div key={h.id} className="bg-white rounded-lg border border-ink/10 px-4 py-2.5 text-sm">
              <span className="text-xs font-label text-gold-deep uppercase mr-2">{h.type}</span>
              <span className="font-medium">{h.title}</span>
              <p className="text-ink/50 text-xs mt-1">
                {h.body} &middot; sent to {h.sent_to}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
