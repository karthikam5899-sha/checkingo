import { BedDouble, Luggage, Sparkles } from "lucide-react";

export default function RoomIntro() {
  return (
    <div className="room-intro" role="status" aria-live="polite" aria-label="Preparing your stay">
      <div className="room-intro-card">
        <div className="intro-room-scene" aria-hidden="true">
          <span className="intro-room-window" />
          <span className="intro-room-lamp" />
          <div className="intro-bed">
            <span className="intro-pillow" />
            <span className="intro-duvet" />
            <BedDouble className="intro-bed-icon" size={35} strokeWidth={1.5} />
          </div>
          <Luggage className="intro-luggage" size={24} strokeWidth={1.5} />
          <Sparkles className="intro-sparkle intro-sparkle-one" size={15} />
          <Sparkles className="intro-sparkle intro-sparkle-two" size={11} />
        </div>
        <img className="intro-brand-logo" src="/CheckInGo.png" alt="" />
        <p className="intro-kicker">CHECK IN GO</p>
        <h1>Preparing your stay</h1>
        <p className="intro-caption">A little comfort is on its way.</p>
        <div className="intro-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
