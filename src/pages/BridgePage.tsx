import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, ShieldCheck, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const INTRO: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Bridge AI. I'm here for two things B.A Connect cares about deeply: gender-based issues like GBV, harassment, or harmful practices, and mental health or wellness support. Whatever brought you here, you can talk to me freely and it stays between us. What's on your mind?",
};

export default function BridgePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("bridge-ai", {
        body: { messages: nextMessages.filter((m) => m !== INTRO) },
      });
      if (error) throw error;
      setMessages([
        ...nextMessages,
        { role: "assistant", content: data.reply || "I'm here, but I couldn't form a reply just now. Could you try rephrasing that?" },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. If this is urgent, please call the national GBV helpline 1195, Befrienders Kenya on +254 722 178 177, or 999/112 for emergencies.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <div className="bg-charcoal px-5 py-4 flex items-center gap-3 border-b border-gold/10">
        <a href="/" className="text-ivory/60 hover:text-gold">
          <ArrowLeft size={20} />
        </a>
        <ShieldCheck className="text-gold" size={22} />
        <div>
          <p className="font-display text-gold text-base leading-none">Bridge AI</p>
          <p className="text-ivory/40 text-[11px] mt-1">Gender support &amp; mental wellness</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-0 py-6">
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gold text-ink ml-auto rounded-br-sm"
                  : "bg-white/5 text-ivory/85 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="bg-white/5 text-ivory/50 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[60%]">
              Typing…
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gold/10 max-w-2xl w-full mx-auto flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here, this is a safe space..."
          maxLength={2000}
          className="flex-1 bg-white/5 rounded-full px-5 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 w-11 rounded-full bg-gold text-ink flex items-center justify-center shrink-0 disabled:opacity-50"
          aria-label="Send"
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
}
