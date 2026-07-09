import { useState, useEffect } from "react";
import { Menu, X, HeartHandshake, CalendarClock } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Our Pillars", href: "#pillars" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Departments", href: "#departments" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#footer" },
];

export default function Header({
  onTakeAction,
  onEvents,
}: {
  onTakeAction: () => void;
  onEvents: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur shadow-lg shadow-black/20" : "bg-ink"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 sm:h-20 py-2">
        <a href="#top" className="shrink-0">
          <img src="/logo.png" alt="B.A Connect Organization" className="h-11 w-11 sm:h-12 sm:w-12 object-contain" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label text-sm text-ivory/80 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onEvents}
            className="hidden sm:inline-flex items-center gap-1.5 border border-gold/50 text-gold font-label font-semibold text-xs px-3.5 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors"
          >
            <CalendarClock size={14} />
            Events
          </button>
          <button
            onClick={onTakeAction}
            className="hidden sm:inline-flex items-center gap-1.5 bg-gold text-ink font-label font-semibold text-xs px-3.5 py-2 rounded-full hover:bg-gold-light transition-colors"
          >
            <HeartHandshake size={14} />
            Take Action
          </button>
          <button
            className="lg:hidden text-ivory"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ink border-t border-gold/10 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-label text-sm text-ivory/80 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 sm:hidden">
            <button
              onClick={() => {
                setMobileOpen(false);
                onEvents();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gold/50 text-gold font-label font-semibold text-xs px-3.5 py-2.5 rounded-full"
            >
              <CalendarClock size={14} />
              Events
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onTakeAction();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gold text-ink font-label font-semibold text-xs px-3.5 py-2.5 rounded-full"
            >
              <HeartHandshake size={14} />
              Take Action
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
