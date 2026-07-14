import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export function useLike(projectId: string, initialLikes: number) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${projectId}`) === "1");
  }, [projectId]);

  async function react() {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
    localStorage.setItem(`liked:${projectId}`, "1");
    const { data, error } = await supabase.rpc("increment_project_likes", { project_id: projectId });
    if (!error && typeof data === "number") setLikes(data);
  }

  return { likes, liked, react };
}
