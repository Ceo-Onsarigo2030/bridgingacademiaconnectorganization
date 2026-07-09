import { Heart } from "lucide-react";

export default function PhotoBanner() {
  return (
    <section className="relative bg-ink">
      <div className="container-page">
        <figure className="py-10 sm:py-14">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/media/community-gathering.jpg"
              alt="B.A Connect community gathering, team dressed in black and gold"
              className="w-full h-[320px] sm:h-[440px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>
          <figcaption className="flex items-center justify-center gap-2.5 mt-5 font-display text-lg sm:text-2xl tracking-wide">
            <span className="text-gold">WE</span>
            <Heart size={30} className="fill-gold text-gold drop-shadow-[0_0_8px_rgba(201,162,39,0.6)]" />
            <span className="text-gold">B.A CONNECT ORGANIZATION</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
