import { useEffect, useState, FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function FeedbackWall() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("feedback")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(12);
    if (data) setItems(data as Feedback[]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    await supabase.from("feedback").insert({
      name: name.trim() || "Anonymous",
      message: message.trim(),
      approved: false,
    });
    setName("");
    setMessage("");
    setSubmitting(false);
  }

  return (
    <section id="feedback" className="bg-ivory py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-center">In Your Words</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center mt-2">
          Feedback &amp; Suggestions Wall
        </h2>
        <p className="text-center text-ink/60 max-w-xl mx-auto mt-3 text-sm sm:text-base">
          Tell us what B.A Connect means to you, or share an idea for how we can serve our
          communities better. Approved messages appear on this wall.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-8 bg-white rounded-2xl border border-ink/10 p-6 space-y-3"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={80}
            className="w-full rounded-lg px-4 py-2.5 border border-ink/15 text-sm focus:outline-none focus:border-gold"
          />
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your feedback or suggestion..."
            maxLength={1000}
            rows={3}
            className="w-full rounded-lg px-4 py-2.5 border border-ink/15 text-sm focus:outline-none focus:border-gold resize-none"
          />
          <button type="submit" disabled={submitting} className="btn-gold w-full justify-center">
            <Send size={15} />
            {submitting ? "Sending…" : "Submit feedback"}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto">
          {items.length === 0 ? (
            <p className="col-span-full text-center text-ink/40 text-sm italic">
              Be the first to share your thoughts with us.
            </p>
          ) : (
            items.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border border-ink/10 p-5">
                <MessageCircle className="text-gold-deep" size={18} />
                <p className="text-sm text-ink/75 mt-2 leading-relaxed">{f.message}</p>
                <p className="text-xs font-label text-ink/40 mt-3">&mdash; {f.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
