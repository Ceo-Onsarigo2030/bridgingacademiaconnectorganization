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
    <section className="bg-ivory py-10 sm:py-14">
      <div className="container-page">
        <div className="bg-ink rounded-2xl overflow-hidden border border-gold/20">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => {
              const isRightColMobile = i % 2 === 0;
              const isTopRowMobile = i < 2;
              const isLastCol = i === STATS.length - 1;
              return (
                <div
                  key={s.label}
                  className={`px-5 py-7 sm:py-9 text-center border-gold/15
                    ${isRightColMobile ? "border-r" : ""}
                    ${isTopRowMobile ? "border-b" : ""}
                    lg:border-b-0
                    ${!isLastCol ? "lg:border-r" : "lg:border-r-0"}
                  `}
                >
                  <p className="font-display text-2xl sm:text-3xl text-gold">{s.value}</p>
                  <p className="font-label text-[11px] sm:text-xs uppercase tracking-wider text-ivory/70 mt-2">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
