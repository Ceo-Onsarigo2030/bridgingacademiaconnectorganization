import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Article {
  id: string;
  type: string;
  title: string;
  body: string;
  cover_image: string | null;
  created_at: string;
}

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setArticles(data as Article[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page h-16 sm:h-20 flex items-center gap-3">
          <a href="/" className="text-ivory/70 hover:text-gold">
            <ArrowLeft size={20} />
          </a>
          <div>
            <p className="eyebrow text-gold">B.A Connect</p>
            <h1 className="font-display text-lg text-ivory leading-none mt-1">
              Articles &amp; Announcements
            </h1>
          </div>
        </div>
      </div>

      <div className="container-page py-10 sm:py-16">
        {loading && <p className="text-center text-ink/40 text-sm">Loading…</p>}
        {!loading && articles.length === 0 && (
          <div className="border border-dashed border-ink/15 rounded-xl p-10 text-center max-w-lg mx-auto">
            <p className="text-sm text-ink/50">Nothing published yet. Check back soon.</p>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <a
              key={a.id}
              href={`/article/${a.id}`}
              className="rounded-2xl overflow-hidden border border-ink/10 bg-white block hover:shadow-lg transition-shadow"
            >
              {a.cover_image && (
                <img src={a.cover_image} alt={a.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-5">
                <p className="text-[11px] font-label text-gold-deep uppercase">{a.type}</p>
                <h3 className="font-display text-lg mt-1">{a.title}</h3>
                <p className="text-sm text-ink/60 mt-2 line-clamp-3">{a.body}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
