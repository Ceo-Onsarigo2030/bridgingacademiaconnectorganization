import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProjectSliderCard from "./ProjectSliderCard";

interface Moment {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  photos: string[];
  likes: number;
}

export default function MomentsPreview() {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("department_projects")
        .select("*")
        .eq("department", "general-moments")
        .order("event_date", { ascending: false });
      if (data) setMoments(data as Moment[]);
    }
    load();
  }, []);

  return (
    <section className="bg-ivory py-16 sm:py-24 border-t border-ink/5">
      <div className="container-page">
        <p className="eyebrow">Beyond the Departments</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">Special Moments &amp; Impact</h2>
        <p className="text-ink/60 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
          Relive the unforgettable moments that define B.A Connect; from community outreach,
          leadership, youth empowerment, and partnerships to celebrations, fun experiences, and
          the lasting impact we create together. Every moment tells a story of hope, purpose,
          and transformation.
        </p>

        {moments.length === 0 ? (
          <div className="border border-dashed border-ink/15 rounded-xl p-8 text-center mt-8">
            <p className="text-sm text-ink/45">
              Moments from the field are on their way. Check back soon.
            </p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x mt-8">
            {moments.map((m) => (
              <ProjectSliderCard key={m.id} project={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
