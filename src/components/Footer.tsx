import { Instagram, Facebook, Music2, Linkedin, Mail } from "lucide-react";
import NotifyOptIn from "./NotifyOptIn";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/b.a_connect_organization?igsh=a2F6c2o0a2Q4ZzVt", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/BaConnectOrg1?mibextid=ZbWKwL", icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com/@b.a_connect_organization", icon: Music2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bridging-academia-connect-organization/", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-ink pt-14 pb-8">
      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="B.A Connect Organization" className="h-14 w-14 object-contain" />
          <h3 className="font-display text-gold text-xl mt-3">B.A Connect Organization</h3>

          <a
            href="mailto:b.aconnect254@gmail.com"
            className="flex items-center gap-2 text-ivory/70 text-sm mt-3 hover:text-gold"
          >
            <Mail size={15} />
            b.aconnect254@gmail.com
          </a>

          <div className="flex gap-4 mt-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/20 text-gold/80 hover:bg-gold hover:text-ink transition-colors"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>

          <div className="mt-5">
            <NotifyOptIn />
          </div>

          <p className="text-ivory/50 text-sm max-w-xl mt-8 leading-relaxed">
            Bridging the gap between education and professional growth, building empowered and
            skilled youth and stronger communities through mentorship and outreach.
          </p>

          <div className="w-full border-t border-ivory/10 mt-8 pt-6">
            <p className="text-ivory/35 text-xs">
              &copy; {new Date().getFullYear()} B.A Connect Organization. All rights reserved.
            </p>
            <a href="/admin" className="text-ivory/20 text-[11px] hover:text-ivory/50 mt-1 inline-block">
              B.A CONNECT IS HOME
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
