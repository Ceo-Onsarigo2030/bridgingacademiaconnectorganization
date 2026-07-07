import { useSiteContent } from "../hooks/useSiteContent";

interface Stat {
  value: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: "27 Mar 2025", label: "Founded" },
  { value: "4", label: "Organization Departments" },
  { value: "6", label: "Active Initiatives" },
  { value: "1,000+", label: "Communities & Youths Empowered" },
];

export default function StatsBar() {
  const { value: STATS } = useSiteContent<Stat[]>("stats", DEFAULT_STATS);
  return (
    <section className="bg-ivory border-b border-ink/5">
      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`text-center lg:text-left ${i < 3 ? "lg:border-r lg:border-ink/10 lg:pr-6" : ""}`}
            >
              <p className="font-display text-2xl sm:text-3xl text-gold-deep">{s.value}</p>
              <p className="font-label text-xs sm:text-sm uppercase tracking-wide text-ink/60 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
