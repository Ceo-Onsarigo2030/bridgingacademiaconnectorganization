import { useState } from "react";
import { X } from "lucide-react";
import { PILLARS, Pillar } from "../lib/pillarsData";

export default function Pillars() {
  const [active, setActive] = useState<Pillar | null>(null);

  return (
    <section id="pillars" className="bg-ink py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-gold text-center">What Drives Us</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-ivory mt-2 max-w-3xl mx-auto">
          Our Six Core Pillars of Impact
        </h2>
        <p className="text-center text-ivory/60 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
          At B.A Connect Organization, we believe that young people are not just the future,
          they are a vital force for change today. Our work is built on six core pillars that
          respond directly to the realities facing Kenyan youth and communities, while creating
          practical solutions for empowerment, inclusion, and national development.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {PILLARS.map((p) => (
            <button
              key={p.number}
              onClick={() => setActive(p)}
              className="text-left bg-charcoal border border-gold/10 hover:border-gold/40 rounded-2xl p-6 transition-colors group"
            >
              <span className="font-display text-gold/40 text-3xl group-hover:text-gold/70 transition-colors">
                {p.number}
              </span>
              <h3 className="font-display text-lg text-ivory mt-3">{p.title}</h3>
              <p className="text-ivory/55 text-sm mt-2 leading-relaxed line-clamp-3">
                {p.summary}
              </p>
              <span className="inline-block mt-4 text-gold text-xs font-label font-semibold uppercase tracking-wide">
                Read more
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80" onClick={() => setActive(null)} />
          <div className="relative bg-ivory rounded-2xl max-w-2xl w-full mt-10 sm:mt-0 shadow-2xl">
            <div className="bg-ink rounded-t-2xl px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-gold">Pillar {active.number}</p>
                <h3 className="font-display text-xl sm:text-2xl text-ivory mt-1">{active.title}</h3>
              </div>
              <button onClick={() => setActive(null)} className="text-ivory/70 hover:text-gold shrink-0">
                <X size={22} />
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <p className="text-sm sm:text-base leading-relaxed text-ink/80">{active.summary}</p>

              <div>
                <p className="font-label text-xs font-semibold uppercase tracking-wide text-gold-deep mb-2">
                  Thematic Areas We Handle
                </p>
                <ul className="space-y-2">
                  {active.themes.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-ink/75">
                      <span className="text-gold mt-1">&bull;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink/5 rounded-xl p-5">
                <p className="font-label text-xs font-semibold uppercase tracking-wide text-gold-deep mb-2">
                  Core Philosophy
                </p>
                <p className="text-sm leading-relaxed text-ink/75">{active.philosophy}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
