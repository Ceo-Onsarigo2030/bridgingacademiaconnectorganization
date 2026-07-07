import { useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { subscribeToPush } from "../lib/push";

export default function NotifyOptIn() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      await subscribeToPush();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 text-gold text-xs font-label">
        <BellRing size={14} />
        Notifications on
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className="inline-flex items-center gap-1.5 text-ivory/50 hover:text-gold text-xs font-label transition-colors"
    >
      <Bell size={14} />
      {status === "loading" ? "Enabling…" : status === "error" ? "Couldn't enable, tap to retry" : "Get notified of news & events"}
    </button>
  );
}
