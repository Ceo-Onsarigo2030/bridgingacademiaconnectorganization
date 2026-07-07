import { X, Phone, Landmark, CalendarDays } from "lucide-react";
import ReadMore from "./ReadMore";
import { useSiteContent } from "../hooks/useSiteContent";

interface DriveInfo {
  title: string;
  dateRange: string;
  phone: string;
  till: string;
}

const DEFAULT_DRIVE: DriveInfo = {
  title: "Sanitary Pads & Menstrual Hygiene Drive",
  dateRange: "1st October — 31st October",
  phone: "+254 114 675 350",
  till: "3463959",
};

export default function TakeActionModal({ onClose }: { onClose: () => void }) {
  const { value: drive } = useSiteContent<DriveInfo>("take_action_drive", DEFAULT_DRIVE);
  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-ivory rounded-2xl max-w-2xl w-full mt-16 sm:mt-0 shadow-2xl animate-fadeUp">
        <div className="bg-ink rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div>
            <p className="eyebrow text-gold">Community Drive · October</p>
            <h3 className="font-display text-xl sm:text-2xl text-ivory mt-1">
              {drive.title}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ivory/70 hover:text-gold">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-2 text-sm font-label text-gold-deep">
            <CalendarDays size={16} />
            {drive.dateRange}
          </div>

          <ReadMore collapsedHeight={110}>
            <p className="text-sm sm:text-base leading-relaxed text-ink/80">
              Every month, thousands of girls across our streets and orphanages miss school,
              withdraw from friends, or go without basic dignity simply because they cannot
              access sanitary pads or accurate information about their own bodies. This October,
              B.A Connect is walking into streets and girls' orphanages to change that story.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-ink/80 mt-3">
              Through the Sanitary Pads and Menstrual Hygiene Drive, our teams will spend the
              month teaching menstrual hygiene, reproductive health, and self-worth to girls who
              rarely get to ask these questions in a safe space. We will distribute sanitary
              pads and hygiene packages, open honest conversations about the changes happening in
              their bodies, and remind every girl we meet that her health and her dignity are not
              negotiable.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-ink/80 mt-3">
              This drive also marks the beginning of our preparations for the November 16 Days
              of Activism, as we work to build safe spaces where girls and women can speak up,
              heal, and be protected from violence and neglect. None of this happens without
              hands joining ours. Whether you can give an hour, a packet of pads, or a
              contribution towards this drive, you become part of the reason a girl stays in
              school this month.
            </p>
          </ReadMore>

          <div className="bg-ink/5 rounded-xl p-5 space-y-3">
            <p className="font-label text-sm font-semibold text-ink/70 uppercase tracking-wide">
              Join hands with a donation
            </p>
            <div className="flex items-center gap-3 text-ink/80">
              <Phone size={18} className="text-gold-deep shrink-0" />
              <span className="text-sm sm:text-base">M-Pesa / Call: {drive.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-ink/80">
              <Landmark size={18} className="text-gold-deep shrink-0" />
              <span className="text-sm sm:text-base">Buy Goods / Till Number: {drive.till}</span>
            </div>
          </div>

          <a href="#footer" onClick={onClose} className="btn-gold w-full justify-center">
            Get in touch about this drive
          </a>
        </div>
      </div>
    </div>
  );
}
