import { useSiteContent } from "../hooks/useSiteContent";

export default function WelcomeMarquee() {
  const { value: message } = useSiteContent<string>(
    "welcome_message",
    "Hello! Welcome to B.A Connect. B.A Connect is Home."
  );

  return (
    <div className="bg-gold text-ink overflow-hidden py-2.5 border-y border-gold-deep/30">
      <div className="flex whitespace-nowrap animate-marquee">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center shrink-0">
            {Array.from({ length: 6 }).map((_, j) => (
              <span
                key={j}
                className="mx-6 font-label text-sm sm:text-base font-semibold tracking-wide"
              >
                {message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
