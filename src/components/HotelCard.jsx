import { Heart, MapPin, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatCurrency } from "../utils/format";
import { getFavorites, toggleFavorite } from "../utils/storage";

export default function HotelCard({ hotel, index = 0 }) {
  const [saved, setSaved] = useState(() => getFavorites().includes(hotel.id));
  function toggleSaved(event) {
    event.preventDefault();
    setSaved(toggleFavorite(hotel.id).includes(hotel.id));
  }
  return (
    <article className="hotel-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="hotel-card-image-wrap">
        <Link to={`/hotels/${hotel.id}`} aria-label={`View ${hotel.name}`}>
          <img className="hotel-card-image" src={hotel.image} alt={hotel.name} loading="lazy" />
        </Link>
        <span className="hotel-tag">{hotel.tag}</span>
        <button className={`save-button ${saved ? "saved" : ""}`} onClick={toggleSaved} aria-label={saved ? `Remove ${hotel.name} from saved stays` : `Save ${hotel.name}`} aria-pressed={saved}>
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="hotel-card-content">
        <div className="hotel-card-heading">
          <div><p className="hotel-type">{hotel.type}</p><h3><Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link></h3></div>
          <span className="rating"><Star size={14} fill="currentColor" /> {hotel.rating.toFixed(1)}</span>
        </div>
        <p className="hotel-location"><MapPin size={14} /> {hotel.location}</p>
        <div className="hotel-card-bottom">
          <div><strong>{formatCurrency(hotel.price)}</strong><span> / night</span><p className="review-count">{hotel.reviews} sample reviews · demo score</p></div>
          <Link className="round-arrow" to={`/hotels/${hotel.id}`} aria-label={`View ${hotel.name}`}><ArrowUpRight size={20} /></Link>
        </div>
      </div>
    </article>
  );
}
