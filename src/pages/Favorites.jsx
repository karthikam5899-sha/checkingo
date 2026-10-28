import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";
import { getFavorites } from "../utils/storage";

export default function Favorites() {
  const savedIds = getFavorites();
  const savedHotels = hotels.filter(hotel => savedIds.includes(hotel.id));

  return <>
    <Navbar />
    <main className="favorites-page">
      <div className="bookings-hero"><div className="container"><div className="breadcrumb">Your account <span>/</span> Saved stays</div><span className="section-kicker">YOUR LITTLE BLACK BOOK</span><h1>Places to keep<br/>in <em>mind.</em></h1><p>Your saved getaways, ready when you are.</p></div></div>
      <div className="container favorites-content">
        {savedHotels.length
          ? <div className="hotel-grid listing-grid">{savedHotels.map((hotel, index) => <HotelCard key={hotel.id} hotel={hotel} index={index} />)}</div>
          : <div className="empty-state"><span className="empty-icon"><Heart size={24}/></span><h3>No saved stays yet</h3><p>Tap the heart on a stay you love to keep it here.</p><Link to="/hotels" className="button-dark">Explore stays <ArrowRight size={16}/></Link></div>}
      </div>
    </main>
    <Footer />
  </>;
}
