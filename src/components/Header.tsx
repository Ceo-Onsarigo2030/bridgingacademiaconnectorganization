import { useState, useEffect } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Our Pillars", href: "#pillars" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Departments", href: "#departments" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#footer" },
];

export default function Header({ onTakeAction }: { onTakeAction: () => void }) {
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
      <div className="container-page flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="B.A Connect Organization" className="h-12 w-12 object-contain" />
          <span className="font-display text-gold text-lg sm:text-xl tracking-wide leading-tight">
            B.A Connect
            <span className="block text-[10px] font-label tracking-[0.3em] text-ivory/60 uppercase">
              Organization
            </span>
          </span>
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

        <div className="flex items-center gap-3">
          <button onClick={onTakeAction} className="hidden sm:inline-flex btn-gold">
            <HeartHandshake size={16} />
            Take Action
          </button>
          <button
            className="lg:hidden text-ivory"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
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
          <button
            onClick={() => {
              setMobileOpen(false);
              onTakeAction();
            }}
            className="btn-gold justify-center sm:hidden"
          >
            <HeartHandshake size={16} />
            Take Action
          </button>
        </div>
      )}
    </header>
  );
}
