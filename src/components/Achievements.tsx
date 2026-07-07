import ReadMore from "./ReadMore";

const PHOTOS = [
  "/media/gvea-trophy.jpg",
  "/media/gvea-award-win.jpg",
  "/media/gvea-team-1.jpg",
  "/media/gvea-team-2.jpg",
];

export default function Achievements() {
  return (
    <section id="achievements" className="bg-ink py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-gold text-center">Milestones</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-ivory mt-2 max-w-2xl mx-auto">
          The Best Organization, 2026 Award Winners
        </h2>
        <p className="text-center font-label text-gold-deep text-sm mt-2">
          A Milestone of Excellence &middot; 2026 GVEA NGO / Company of the Year
        </p>

        <div className="max-w-3xl mx-auto mt-8 text-center">
          <ReadMore collapsedHeight={100}>
            <p className="text-sm sm:text-base leading-relaxed text-ivory/75">
              At Bridging Academia Connect Organization, our heartbeat is the progress of the
              people we empower. We are humbled to have been named the NGO/Company of the Year
              at the 2026 Golden Voices East Africa Awards. More than a trophy, this recognition
              belongs to the students, professionals, and communities who believe in our vision.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-ivory/75 mt-3">
              As we celebrate this achievement, we remain dedicated to nurturing the vital synergy
              between education and industry, ensuring that innovation and opportunity flourish
              hand-in-hand across Kenya and East Africa.
            </p>
          </ReadMore>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {PHOTOS.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src={src} alt="B.A Connect award celebration" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
