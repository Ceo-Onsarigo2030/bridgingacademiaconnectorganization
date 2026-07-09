import { useState } from "react";
import Header from "./components/Header";
import TakeActionModal from "./components/TakeActionModal";
import EventsModal from "./components/EventsModal";
import WelcomeMarquee from "./components/WelcomeMarquee";
import PhotoBanner from "./components/PhotoBanner";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Initiatives from "./components/Initiatives";
import Departments from "./components/Departments";
import Achievements from "./components/Achievements";
import MomentsPreview from "./components/MomentsPreview";
import FeedbackWall from "./components/FeedbackWall";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import BridgeAI from "./components/BridgeAI";

export default function App() {
  const [takeActionOpen, setTakeActionOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  return (
    <div id="top">
      <Header onTakeAction={() => setTakeActionOpen(true)} onEvents={() => setEventsOpen(true)} />
      <main className="pt-16 sm:pt-20">
        <WelcomeMarquee />
        <PhotoBanner />
        <StatsBar />
        <About />
        <Pillars />
        <Initiatives />
        <Departments />
        <Achievements />
        <MomentsPreview />
        <FeedbackWall />
        <Newsletter />
      </main>
      <Footer />
      <CookieConsent />
      <BridgeAI />
      {takeActionOpen && <TakeActionModal onClose={() => setTakeActionOpen(false)} />}
      {eventsOpen && <EventsModal onClose={() => setEventsOpen(false)} />}
    </div>
  );
}
