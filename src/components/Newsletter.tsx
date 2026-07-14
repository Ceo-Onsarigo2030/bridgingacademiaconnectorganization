import { useState, FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setStatus(error ? "error" : "done");
  }

  return (
    <section className="bg-charcoal py-14">
      <div className="container-page">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="mx-auto text-gold" size={26} />
          <h3 className="font-display text-xl sm:text-2xl text-ivory mt-3">
            Stay close to our work
          </h3>
          <p className="text-ivory/60 text-sm mt-2">
            Get our newsletter with stories, event dates, and drives you can be part of.
          </p>

          {status === "done" ? (
            <div className="flex items-center justify-center gap-2 mt-6 text-gold">
              <CheckCircle2 size={18} />
              <span className="text-sm font-label">You're subscribed. Thank you for joining us.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
              <input
                type="email"
                maxLength={200}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-full px-5 py-3 bg-ink border border-gold/20 text-ivory placeholder:text-ivory/30 text-sm focus:outline-none focus:border-gold"
              />
              <button type="submit" disabled={status === "loading"} className="btn-gold justify-center">
                {status === "loading" ? "Joining…" : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-400 text-xs mt-3">
              Something went wrong. Please try again in a moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
