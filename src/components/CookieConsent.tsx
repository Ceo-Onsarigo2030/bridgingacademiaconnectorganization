import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("ba_connect_cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookie("ba_connect_cookie_consent", "accepted", 365);
    setVisible(false);
  }

  function decline() {
    setCookie("ba_connect_cookie_consent", "essential-only", 365);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-sm z-50 bg-ink border border-gold/20 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-start gap-3">
        <Cookie className="text-gold shrink-0 mt-0.5" size={20} />
        <p className="text-ivory/75 text-sm leading-relaxed">
          We use cookies to keep your visit smooth and to understand how our community uses this
          site. You can accept all cookies or continue with essential ones only.
        </p>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={decline} className="flex-1 text-xs font-label text-ivory/60 hover:text-ivory">
          Essential only
        </button>
        <button onClick={accept} className="flex-1 btn-gold justify-center !py-2 !text-xs">
          Accept all
        </button>
      </div>
    </div>
  );
}
