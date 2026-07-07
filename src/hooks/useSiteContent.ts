import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Every editable block of text on the site is stored in the `site_content`
 * table as { key, value }. This hook fetches the live value for a key and
 * falls back to the default copy shipped in code, so the site still looks
 * complete before an admin has edited anything.
 */
export function useSiteContent<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (active) {
        if (!error && data?.value) {
          setValue(data.value as T);
        }
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [key]);

  return { value, loading };
}
