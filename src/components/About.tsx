import ReadMore from "./ReadMore";

const STORY = `B.A Connect Organization is a premier youth-led platform committed to bridging the critical gap between academic excellence and professional success in Kenya. Established in response to the growing challenges of unemployment, skills mismatch, and limited access to meaningful opportunities, the organization provides a structured and sustainable ecosystem that connects students and graduates to the evolving demands of the modern workforce.

Through strategic mentorship, capacity building, research, and innovation, B.A Connect equips young people with practical skills, professional exposure, and access to internships, career pathways, and networks that accelerate their growth and competitiveness.

Beyond professional development, the organization is deeply committed to advancing social justice, gender equality, and community well-being. B.A Connect actively champions the fight against Gender-Based Violence, discrimination, and social inequalities through advocacy, policy engagement, and community-driven initiatives.

The organization further prioritizes mental health and psychosocial well-being by promoting awareness, offering support platforms, and strengthening resilience among young people and communities in Kenya.

Guided by the core values of integrity, accountability, professionalism, inclusivity, and innovation, B.A Connect Organization stands as a transformative force, shaping a generation that is empowered, resilient, socially responsible, and fully prepared to thrive in a dynamic global society.`;

const MISSION = `To empower young people through a transformative framework that provides access to structured mentorship, advanced skills development, career pathways, and strategic professional networks, equipping them with the competencies and exposure needed to thrive in a dynamic global environment, while promoting social justice, gender equality, inclusive community development, and prioritizing mental health and psychosocial well-being to foster a generation that is resilient, socially responsible, and holistically developed.`;

const PHILOSOPHY = `At B.A Connect Organization, we believe that the transformative power of youth lies at the intersection of knowledge, opportunity, and purpose. We exist to bridge the gap between academic pursuit and professional excellence, empowering young people to realize their fullest potential while fostering leadership, innovation, and social responsibility.

Guided by principles of inclusivity, integrity, equity, and mental well-being, we create platforms that nurture talent, build critical skills, and connect youth to strategic networks that amplify impact. Our philosophy is rooted in the conviction that every young person, regardless of background, deserves access to opportunities that cultivate resilience, inspire civic engagement, and drive sustainable societal progress.

Through mentorship, empowerment, and collaboration, we aim to shape a generation of socially conscious leaders equipped to transform communities and champion a more just, equitable, and thriving society.`;

function Paragraphs({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p
          key={i}
          className={`text-sm sm:text-base leading-relaxed mt-3 first:mt-0 ${
            dark ? "text-ivory/80" : "text-ink/75"
          }`}
        >
          {p}
        </p>
      ))}
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-ivory py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-center">Discover Our Story</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center mt-2 max-w-2xl mx-auto">
          Where academic pursuit meets professional purpose
        </h2>

        <div className="mt-10 max-w-3xl mx-auto">
          <ReadMore collapsedHeight={160}>
            <Paragraphs text={STORY} />
          </ReadMore>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
          <div className="bg-ink rounded-2xl p-7">
            <p className="eyebrow text-gold">Our Mission &amp; Vision</p>
            <div className="mt-3">
              <ReadMore collapsedHeight={90} dark>
                <Paragraphs text={MISSION} dark />
              </ReadMore>
            </div>
          </div>
          <div className="bg-ink rounded-2xl p-7">
            <p className="eyebrow text-gold">Our Philosophy</p>
            <div className="mt-3">
              <ReadMore collapsedHeight={90} dark>
                <Paragraphs text={PHILOSOPHY} dark />
              </ReadMore>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
