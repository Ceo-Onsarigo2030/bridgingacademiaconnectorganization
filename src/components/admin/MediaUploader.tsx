import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { isVideoUrl } from "../../lib/media";

export default function MediaUploader({
  urls,
  onChange,
  max = 8,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const remaining = max - urls.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];
    for (const file of toUpload) {
      const isVideo = file.type.startsWith("video/");
      const bucket = isVideo ? "videos" : "photos";
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (!error) {
        newUrls.push(supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl);
      }
    }
    onChange([...urls, ...newUrls]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <p className="text-xs font-label text-ink/50 mb-1.5">
        Photos or videos — {urls.length}/{max} added
      </p>

      {urls.length < max && (
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-ink/15 rounded-lg p-4 cursor-pointer hover:border-gold/50 transition-colors">
          {uploading ? (
            <Loader2 size={16} className="animate-spin text-ink/40" />
          ) : (
            <UploadCloud size={16} className="text-ink/40" />
          )}
          <span className="text-xs text-ink/50">
            {uploading ? "Uploading…" : "Tap to add photos or videos"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      )}

      {urls.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {urls.map((url, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden border border-ink/10 aspect-square">
              {isVideoUrl(url) ? (
                <video src={url} className="w-full h-full object-cover bg-black" muted />
              ) : (
                <img src={url} alt="" className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => onChange(urls.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center"
                aria-label="Remove"
              >
                <X size={12} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-gold text-ink text-[9px] font-label font-semibold px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
