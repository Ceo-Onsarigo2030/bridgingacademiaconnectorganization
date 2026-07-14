import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check, MessageSquare } from "lucide-react";
import { supabase } from "../../lib/supabase";
import MediaUploader from "./MediaUploader";
import CopyLinkBox from "./CopyLinkBox";

interface Article {
  id: string;
  type: string;
  title: string;
  body: string;
  cover_image: string | null;
  published: boolean;
}

interface Comment {
  id: string;
  article_id: string;
  name: string;
  comment: string;
  approved: boolean;
}

const EMPTY: Omit<Article, "id"> = {
  type: "article",
  title: "",
  body: "",
  cover_image: null,
  published: false,
};

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | (Omit<Article, "id"> & { id?: string }) | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (data) setArticles(data as Article[]);
  }

  async function loadComments(articleId: string) {
    const { data } = await supabase
      .from("article_comments")
      .select("*")
      .eq("article_id", articleId)
      .order("created_at", { ascending: false });
    if (data) setComments(data as Comment[]);
    setShowComments(articleId);
  }

  async function approveComment(id: string) {
    await supabase.from("article_comments").update({ approved: true }).eq("id", id);
    if (showComments) loadComments(showComments);
  }

  async function deleteComment(id: string) {
    await supabase.from("article_comments").delete().eq("id", id);
    if (showComments) loadComments(showComments);
  }

  async function handleSave() {
    if (!editing || !editing.title.trim() || !editing.body.trim()) return;
    const payload = {
      type: editing.type,
      title: editing.title,
      body: editing.body,
      cover_image: editing.cover_image,
      published: editing.published,
    };
    if ("id" in editing && editing.id) {
      await supabase.from("articles").update(payload).eq("id", editing.id);
      setSavedId(editing.id);
    } else {
      const { data } = await supabase.from("articles").insert(payload).select().single();
      if (data) setSavedId(data.id);
    }
    load();
  }

  async function togglePublish(a: Article) {
    await supabase.from("articles").update({ published: !a.published }).eq("id", a.id);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this permanently?")) return;
    await supabase.from("articles").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <p className="text-sm text-ink/50 mb-4 max-w-lg">
        Articles and announcements appear on the small gallery page under Community Moments.
        Publish one to get a shareable link for push notifications, and manage comments below
        each post.
      </p>
      <button
        onClick={() => {
          setEditing({ ...EMPTY });
          setSavedId(null);
        }}
        className="btn-gold mb-6"
      >
        <Plus size={15} />
        Write article or announcement
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        {articles.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-ink/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-label text-gold-deep uppercase">{a.type}</p>
              <button
                onClick={() => togglePublish(a)}
                className={`text-[11px] font-label font-semibold px-2 py-0.5 rounded-full ${
                  a.published ? "bg-green-100 text-green-700" : "bg-ink/10 text-ink/50"
                }`}
              >
                {a.published ? "Published" : "Draft — tap to publish"}
              </button>
            </div>
            <h4 className="font-display text-base mt-1">{a.title}</h4>
            <p className="text-sm text-ink/60 mt-2 line-clamp-2">{a.body}</p>
            {a.published && (
              <div className="mt-3">
                <CopyLinkBox path={`/article/${a.id}`} />
              </div>
            )}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  setEditing(a);
                  setSavedId(null);
                }}
                className="text-ink/40 hover:text-gold-deep"
              >
                <Pencil size={14} />
              </button>
              <button onClick={() => loadComments(a.id)} className="text-ink/40 hover:text-gold-deep">
                <MessageSquare size={14} />
              </button>
              <button onClick={() => handleDelete(a.id)} className="text-ink/40 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>

            {showComments === a.id && (
              <div className="mt-3 border-t border-ink/10 pt-3 space-y-2">
                {comments.length === 0 && <p className="text-xs text-ink/40">No comments yet.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="bg-ink/5 rounded-lg p-2.5">
                    <p className="text-xs text-ink/70">{c.comment}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-[11px] text-ink/40">
                        — {c.name} · {c.approved ? "Approved" : "Pending"}
                      </p>
                      <div className="flex gap-2">
                        {!c.approved && (
                          <button onClick={() => approveComment(c.id)} className="text-green-600">
                            <Check size={13} />
                          </button>
                        )}
                        <button onClick={() => deleteComment(c.id)} className="text-red-500">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg">
                {"id" in editing && editing.id ? "Edit" : "New"} post
              </h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            {savedId && (
              <div>
                <p className="text-xs font-label text-green-700 font-semibold mb-1">
                  Saved! Publish it (toggle on the card) to get its link.
                </p>
              </div>
            )}

            <select
              value={editing.type}
              onChange={(e) => setEditing({ ...editing, type: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            >
              <option value="article">Article</option>
              <option value="announcement">Announcement</option>
            </select>
            <input
              placeholder="Title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Write the full content here"
              rows={6}
              value={editing.body}
              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
            <MediaUploader
              urls={editing.cover_image ? [editing.cover_image] : []}
              onChange={(urls) => setEditing({ ...editing, cover_image: urls[0] || null })}
              maxPhotos={1} maxVideos={0}
            />
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              />
              Publish immediately
            </label>

            <button onClick={handleSave} className="btn-gold w-full justify-center mt-2">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
