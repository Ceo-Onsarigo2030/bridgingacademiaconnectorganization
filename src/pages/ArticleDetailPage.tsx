import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Article {
  id: string;
  type: string;
  title: string;
  body: string;
  cover_image: string | null;
}

interface Comment {
  id: string;
  name: string;
  comment: string;
  created_at: string;
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
    if (data) setArticle(data as Article);
    const { data: cData } = await supabase
      .from("article_comments")
      .select("id, name, comment, created_at")
      .eq("article_id", id)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (cData) setComments(cData as Comment[]);
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    await supabase.from("article_comments").insert({
      article_id: id,
      name: name.trim() || "Anonymous",
      comment: comment.trim(),
      approved: false,
    });
    setName("");
    setComment("");
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page h-16 sm:h-20 flex items-center gap-3">
          <a href="/articles" className="text-ivory/70 hover:text-gold">
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

      <div className="container-page py-10 sm:py-16 max-w-2xl">
        {loading && <p className="text-center text-ink/40 text-sm">Loading…</p>}

        {article && (
          <div>
            {article.cover_image && (
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full rounded-2xl object-cover max-h-[360px]"
              />
            )}
            <p className="text-xs font-label text-gold-deep uppercase mt-6">{article.type}</p>
            <h2 className="font-display text-2xl sm:text-3xl mt-2">{article.title}</h2>
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed mt-4 whitespace-pre-line">
              {article.body}
            </p>

            <div className="mt-12 border-t border-ink/10 pt-8">
              <h3 className="font-display text-lg mb-4">Comments</h3>

              {submitted ? (
                <p className="text-sm text-gold-deep bg-gold/10 rounded-lg p-3">
                  Thanks — your comment is awaiting approval and will appear here shortly.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 mb-6">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    maxLength={80}
                    className="w-full rounded-lg px-4 py-2.5 border border-ink/15 text-sm"
                  />
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    maxLength={1000}
                    rows={3}
                    className="w-full rounded-lg px-4 py-2.5 border border-ink/15 text-sm resize-none"
                  />
                  <button type="submit" className="btn-gold">
                    <Send size={14} />
                    Post comment
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {comments.length === 0 && (
                  <p className="text-sm text-ink/40 italic">No comments yet — be the first.</p>
                )}
                {comments.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl border border-ink/10 p-4">
                    <p className="text-sm text-ink/75">{c.comment}</p>
                    <p className="text-xs text-ink/40 mt-1.5">— {c.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
