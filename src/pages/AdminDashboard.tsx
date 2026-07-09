import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  FolderKanban,
  MessageSquare,
  Mail,
  BellRing,
  CalendarClock,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import ContentEditor from "../components/admin/ContentEditor";
import MediaLibrary from "../components/admin/MediaLibrary";
import ProjectsManager from "../components/admin/ProjectsManager";
import EventsManager from "../components/admin/EventsManager";
import FeedbackModeration from "../components/admin/FeedbackModeration";
import SubscribersList from "../components/admin/SubscribersList";
import PushComposer from "../components/admin/PushComposer";

const TABS = [
  { key: "content", label: "Site Content", icon: FileText },
  { key: "media", label: "Media Library", icon: Image },
  { key: "projects", label: "Projects & Events", icon: FolderKanban },
  { key: "events", label: "Events & Programs", icon: CalendarClock },
  { key: "feedback", label: "Feedback Wall", icon: MessageSquare },
  { key: "subscribers", label: "Newsletter", icon: Mail },
  { key: "push", label: "Push Notifications", icon: BellRing },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>("content");
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin");
      setChecking(false);
    });
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  if (checking) return null;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-ink">
        <div className="container-page flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-gold" size={20} />
            <span className="font-display text-ivory text-lg">B.A Connect Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-ivory/60 hover:text-gold text-sm"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-full text-sm font-label font-medium transition-colors ${
                tab === t.key ? "bg-ink text-gold" : "bg-white text-ink/60 border border-ink/10"
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "content" && <ContentEditor />}
        {tab === "media" && <MediaLibrary />}
        {tab === "projects" && <ProjectsManager />}
        {tab === "events" && <EventsManager />}
        {tab === "feedback" && <FeedbackModeration />}
        {tab === "subscribers" && <SubscribersList />}
        {tab === "push" && <PushComposer />}
      </div>
    </div>
  );
}
