import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function ReadMore({
  children,
  collapsedHeight = 120,
  label = "Read more",
  dark = false,
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
  label?: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        ref={ref}
        className="read-more-body"
        style={{
          maxHeight: open ? ref.current?.scrollHeight ?? 2000 : collapsedHeight,
        }}
      >
        {children}
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`mt-3 inline-flex items-center gap-1 font-label text-sm font-semibold transition-colors ${
          dark ? "text-gold hover:text-gold-light" : "text-gold-deep hover:text-gold"
        }`}
      >
        {open ? "Show less" : label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
