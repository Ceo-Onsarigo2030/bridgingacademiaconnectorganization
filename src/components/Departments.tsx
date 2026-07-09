import { useState } from "react";
import { X } from "lucide-react";
import { DEPARTMENTS, Department } from "../lib/departmentsData";
import DepartmentProjects from "./DepartmentProjects";

export default function Departments() {
  const [active, setActive] = useState<Department | null>(null);

  return (
    <section id="departments" className="bg-ivory py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-center">The Heart of B.A Connect</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center mt-2">Our Departments</h2>

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {DEPARTMENTS.map((d, i) => (
            <button
              key={d.slug}
              onClick={() => setActive(d)}
              className="text-left bg-ink border border-gold/10 hover:border-gold/40 rounded-2xl p-7 transition-colors group"
            >
              <span className="font-label text-xs text-gold/60">Department 0{i + 1}</span>
              <h3 className="font-display text-xl text-ivory mt-2">{d.title}</h3>
              <p className="font-label italic text-gold-deep text-sm mt-1">{d.tagline}</p>
              <p className="text-ivory/55 text-sm mt-3 leading-relaxed line-clamp-3">
                {d.summary}
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
                <p className="eyebrow text-gold">{active.tagline}</p>
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

              <div>
                <p className="font-label text-xs font-semibold uppercase tracking-wide text-gold-deep mb-2">
                  Projects &amp; Events
                </p>
                <DepartmentProjects department={active.slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
