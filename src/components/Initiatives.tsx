import { Instagram, Facebook, Music2, Mail, ExternalLink } from "lucide-react";
import ReadMore from "./ReadMore";

const ABOUT = `The Inter-Universities Nexus Platform, a flagship initiative of B.A Connect Organization, is a transformative youth-centered platform created to bring together students from universities, colleges, and tertiary institutions across Kenya and beyond into one vibrant space for talent development, creativity, innovation, learning, and opportunity. It was established from a simple but powerful belief: young people possess immense potential, but many lack the right platforms, exposure, mentorship, and support systems needed to fully realize and showcase their abilities. Inter-Universities Nexus exists to bridge that gap.

The platform provides a credible and inclusive national stage where young people can discover their strengths, nurture their talents, showcase creativity, advance innovative ideas, and build practical skills that prepare them for the future. Whether in arts, leadership, entrepreneurship, technology, research, sports, advocacy, or creative industries, the platform is designed to recognize and elevate youth excellence while opening pathways to visibility, partnerships, mentorship, recognition, and meaningful opportunities for growth.

More than a showcase platform, Inter-Universities Nexus is a space for purposeful engagement and transformative dialogue. Through forums, summits, exhibitions, competitions, mentorship programs, and strategic youth events, the platform addresses pressing issues affecting students and young people today, including entrepreneurship development, employability, technology and AI integration, financial literacy, leadership and governance, mental health awareness, innovation, social inclusion, and civic education.

At its core, Inter-Universities Nexus Platform reflects B.A Connect Organization's commitment to building a generation of empowered, innovative, skilled, and socially conscious young leaders, a generation that is confident in its abilities, prepared for emerging opportunities, and ready to make meaningful contributions to Kenya's development, Africa's progress, and the global community.`;

const LINKS = [
  { label: "Website", href: "https://inter-universitynexusplatform.vercel.app/", icon: ExternalLink },
  { label: "Instagram", href: "https://www.instagram.com/uninexus_connect?igsh=MWswaWlpcHJvYW01Nw==", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590819024582&mibextid=ZbWKwL", icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com/@uninexus_connect", icon: Music2 },
  { label: "Email", href: "mailto:uninexusplatformke@gmail.com", icon: Mail },
];

export default function Initiatives() {
  return (
    <section id="initiatives" className="bg-ivory py-16 sm:py-24">
      <div className="container-page">
        <p className="eyebrow text-center">Our Flagship Initiative</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center mt-2">
          Inter-Universities Nexus Platform
        </h2>
        <p className="text-center font-label italic text-gold-deep mt-2 text-sm sm:text-base">
          Bridging Campuses. Building Futures.
        </p>

        <div className="max-w-3xl mx-auto mt-10">
          <ReadMore collapsedHeight={150}>
            {ABOUT.split("\n\n").map((p, i) => (
              <p key={i} className="text-sm sm:text-base leading-relaxed text-ink/75 mt-3 first:mt-0">
                {p}
              </p>
            ))}
          </ReadMore>

          <div className="mt-8 bg-ink rounded-2xl p-7">
            <p className="eyebrow text-gold">Core Philosophy</p>
            <p className="text-ivory/80 text-sm sm:text-base leading-relaxed mt-2 italic">
              Universities should not exist in isolation. They should collaborate, innovate, and
              grow together for the betterment of society.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-ink/70 text-sm sm:text-base mb-5">
              Ready to be part of it? Visit the platform and register to join students from
              across Kenya building this movement together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline !text-ink !border-ink/20 hover:!bg-ink hover:!text-gold"
                >
                  <l.icon size={16} />
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
