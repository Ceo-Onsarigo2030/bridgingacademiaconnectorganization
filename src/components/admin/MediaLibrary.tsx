import { useEffect, useState } from "react";
import { UploadCloud, Trash2, Copy } from "lucide-react";
import { supabase } from "../../lib/supabase";

const BUCKETS = ["photos", "videos", "articles"] as const;
type Bucket = (typeof BUCKETS)[number];

interface FileItem {
  name: string;
  url: string;
}

export default function MediaLibrary() {
  const [bucket, setBucket] = useState<Bucket>("photos");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    load();
  }, [bucket]);

  async function load() {
    const { data } = await supabase.storage.from(bucket).list("", { limit: 100 });
    const items = (data || [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
      }));
    setFiles(items);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    setUploading(false);
    if (error) {
      alert("Upload failed: " + error.message);
      return;
    }
    load();
  }

  async function handleDelete(name: string) {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    await supabase.storage.from(bucket).remove([name]);
    load();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {BUCKETS.map((b) => (
          <button
            key={b}
            onClick={() => setBucket(b)}
            className={`px-4 py-2 rounded-full text-xs font-label font-semibold capitalize ${
              bucket === b ? "bg-gold text-ink" : "bg-ink/5 text-ink/60"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-ink/15 rounded-xl p-8 cursor-pointer hover:border-gold/50 transition-colors">
        <UploadCloud size={20} className="text-ink/40" />
        <span className="text-sm text-ink/50">
          {uploading ? "Uploading…" : `Click to upload a ${bucket.slice(0, -1)}`}
        </span>
        <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {files.map((f) => (
          <div key={f.name} className="rounded-xl border border-ink/10 overflow-hidden bg-white">
            {bucket === "photos" ? (
              <img src={f.url} alt={f.name} className="w-full h-28 object-cover" />
            ) : (
              <div className="w-full h-28 bg-ink/5 flex items-center justify-center text-xs text-ink/40 p-2 text-center">
                {f.name}
              </div>
            )}
            <div className="flex items-center justify-between px-2 py-1.5">
              <button onClick={() => copyUrl(f.url)} className="text-ink/40 hover:text-gold-deep">
                <Copy size={14} />
              </button>
              <button onClick={() => handleDelete(f.name)} className="text-ink/40 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
