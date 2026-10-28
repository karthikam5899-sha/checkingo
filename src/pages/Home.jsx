import { Link, useNavigate } from "react-router-dom";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Compass, ShieldCheck, Sparkles, Headphones } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchPanel from "../components/SearchPanel";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";
import { saveSearch } from "../utils/storage";

const destinations = [
  { name: "Ooty", subtitle: "Misty mountain mornings", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80" },
  { name: "Kovalam", subtitle: "A little more ocean", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80" },
  { name: "Pondicherry", subtitle: "Colourful coastal charm", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80" },
  { name: "Kodaikanal", subtitle: "Find your quiet", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80" },
  { name: "Munnar", subtitle: "A breath of mountain air", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80" },
  { name: "Goa", subtitle: "Sunlit days, slower nights", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80" },
  { name: "Udaipur", subtitle: "Courtyards by the lake", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80" },
  { name: "Rishikesh", subtitle: "Find your flow", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80" },
  { name: "Alleppey", subtitle: "Drift through the backwaters", image: "https://images.unsplash.com/photo-1624554305378-0f440dd3a8c1?auto=format&fit=crop&w=900&q=80" }
];

export default function Home() {
  const navigate = useNavigate();
  function search(values) {
    saveSearch(values);
    navigate("/hotels", { state: { search: values } });
  }

  return <>
    <Navbar />
    <main className="home-page">
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow light-eyebrow"><span /> STAYS THAT STAY WITH YOU</div>
          <h1>Find your<br /><em>somewhere.</em></h1>
          <p className="hero-description">Beautiful places, thoughtful details, and room<br className="desktop-break" /> to make a little more of every getaway.</p>
          <a className="hero-explore" href="#popular">Explore our stays <ArrowDownRight size={17} /></a>
        </div>
        <div className="hero-note"><span>01 / 04</span><i /> A slower kind of travel</div>
      </section>

      <section className="search-section container" aria-label="Search hotels">
        <div className="search-intro"><span className="section-kicker">YOUR NEXT CHAPTER</span><h2>Where to next?</h2></div>
        <SearchPanel onSearch={search} />
        <p className="search-caption"><Sparkles size={14} /> Handpicked stays for wherever life takes you.</p>
      </section>

      <section className="section container" id="popular">
        <div className="section-heading">
          <div><span className="section-kicker">A FEW GOOD PLACES</span><h2>Stays worth the trip<span className="heading-dot">.</span></h2><p>Spaces with a little soul, picked for your next escape.</p></div>
          <Link to="/hotels" className="text-link">View all stays <ArrowUpRight size={17} /></Link>
        </div>
        <div className="hotel-grid home-hotel-grid">{hotels.filter(hotel => hotel.featured).map((hotel, i) => <HotelCard key={hotel.id} hotel={hotel} index={i} />)}</div>
      </section>

      <section className="destination-section">
        <div className="container">
          <div className="section-heading">
            <div><span className="section-kicker">GO WHERE YOU FEEL</span><h2>A change of scenery.</h2><p>Four little nudges towards somewhere wonderful.</p></div>
            <span className="destination-side-note">THE WORLD CAN WAIT.<br />YOUR WEEKEND CAN'T.</span>
          </div>
          <div className="destination-grid">{destinations.map((d, i) => <button key={d.name} className={`destination-card destination-${i}`} onClick={() => { const values = { location: d.name, checkIn: "", checkOut: "", guests: 2 }; saveSearch(values); navigate("/hotels", { state: { search: values } }); }}>
            <img src={d.image} alt={d.name} loading="lazy" /><span className="destination-overlay" /><span className="destination-text"><small>{d.subtitle}</small><strong>{d.name}</strong></span><span className="destination-arrow"><ArrowUpRight size={19} /></span>
          </button>)}</div>
        </div>
      </section>

      <section className="why-section container" id="why">
        <div className="why-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Sunlit and peaceful hotel interior" loading="lazy" /><div className="image-caption"><span>THE ART OF GETTING AWAY</span><strong>Make room for wonder.</strong></div></div>
        <div className="why-copy"><span className="section-kicker">A BETTER WAY TO GET AWAY</span><h2>Less searching.<br /><em>More feeling.</em></h2><p>We believe where you stay is part of the story. That's why every Check In Go pick is chosen for its character, comfort and the feeling it leaves you with.</p>
          <div className="benefit"><span><Compass size={20} /></span><div><strong>Places with personality</strong><p>Find characterful stays, not just another room.</p></div></div>
          <div className="benefit"><span><ShieldCheck size={20} /></span><div><strong>Clear, considered choices</strong><p>Know what to expect before you arrive.</p></div></div>
          <div className="benefit"><span><Headphones size={20} /></span><div><strong>Here for the little things</strong><p>A smoother journey from search to check-in.</p></div></div>
          <Link to="/hotels" className="button-dark">Find your stay <ArrowRight size={17} /></Link>
        </div>
      </section>
      <section className="closing-cta"><div className="container closing-inner"><span className="section-kicker">YOUR NEXT CHAPTER IS OUT THERE</span><h2>Go on. Get away.</h2><p>Even a couple of nights can change everything.</p><Link to="/hotels" className="button-light">Find a place to land <ArrowUpRight size={17} /></Link></div></section>
    </main>
    <Footer />
  </>;
}
