import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProjectSliderCard from "./ProjectSliderCard";

interface Project {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  photos: string[];
  likes: number;
}

export default function DepartmentProjects({ department }: { department: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("department_projects")
        .select("*")
        .eq("department", department)
        .order("event_date", { ascending: false });
      if (active) {
        if (!error && data) setProjects(data as Project[]);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [department]);

  if (loading) {
    return <p className="text-sm text-ink/40 italic">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 rounded-xl p-6 text-center">
        <p className="text-sm text-ink/50">
          New stories from the ground are on their way. Check back soon, or follow our social
          pages for the latest updates from this department.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x mt-2">
      {projects.map((p) => (
        <ProjectSliderCard key={p.id} project={p} />
      ))}
    </div>
  );
}
