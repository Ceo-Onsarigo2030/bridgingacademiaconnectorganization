import { Newspaper, ArrowRight } from "lucide-react";

export default function ArticlesTeaser() {
  return (
    <section className="bg-charcoal py-14 sm:py-20">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Newspaper className="text-gold" size={22} />
            <p className="eyebrow text-gold">Articles &amp; News</p>
          </div>
          <p className="text-ivory/70 text-sm sm:text-base mt-2 max-w-md">
            Official updates, stories, and announcements.
          </p>
        </div>
        <a href="/articles" className="btn-gold shrink-0">
          Read Articles &amp; News
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
