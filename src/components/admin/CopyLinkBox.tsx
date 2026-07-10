import { useState } from "react";
import { Copy, Check, Link2 } from "lucide-react";

export default function CopyLinkBox({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  function copy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 flex items-center gap-2">
      <Link2 size={15} className="text-gold-deep shrink-0" />
      <span className="text-xs text-ink/70 truncate flex-1">{url}</span>
      <button
        onClick={copy}
        className="shrink-0 flex items-center gap-1 text-xs font-label font-semibold text-gold-deep hover:text-gold"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
