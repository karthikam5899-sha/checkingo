import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, ChevronRight, Coffee, Heart, MapPin, ShieldCheck, Star, Users, Wifi, Waves, Car, Dumbbell, Sparkles, Wind, Trees, Utensils, CircleParking, Tv, ConciergeBell, Anchor, Ship } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { hotels } from "../data/hotels";
import { getSavedSearch, getBookings, getFavorites, makeId, saveBookings, toggleFavorite } from "../utils/storage";
import { formatCurrency, nightsBetween, todayISO } from "../utils/format";
import { getPriceBreakdown, getRoomAvailability } from "../utils/availability";

function addDaysISO(date, days) {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const iconMap = {
  "Free Wi-Fi": Wifi, "Breakfast included": Coffee, "Breakfast": Coffee, "Mountain view": Trees,
  "Restaurant": Utensils, "Parking": CircleParking, "Room service": ConciergeBell, "Beach access": Waves,
  "Pool": Waves, "Spa": Sparkles, "Airport shuttle": Car, "Courtyard": Trees, "Bicycle rental": Car,
  "Air conditioning": Wind, "Fireplace": Sparkles, "Garden": Trees, "Work desk": Tv, "24-hour reception": ConciergeBell,
  "Concierge": ConciergeBell, "Backwater cruise": Waves, "Private deck": Anchor, "All meals included": Utensils,
  "Crew service": ConciergeBell, "Sunset views": Sparkles, "Houseboat stay": Ship
};

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = hotels.find(h => h.id === id);
  const navigate = useNavigate();
  const saved = getSavedSearch() || {};
  const today = todayISO();
  const [checkIn, setCheckIn] = useState(saved.checkIn && saved.checkIn >= today ? saved.checkIn : today);
  const [checkOut, setCheckOut] = useState(saved.checkOut && saved.checkOut > (saved.checkIn || today) ? saved.checkOut : addDaysISO(today, 2));
  const [guests, setGuests] = useState(Number(saved.guests || 2));
  const [selectedRoom, setSelectedRoom] = useState(hotel?.rooms[0]?.id || "");
  const [error, setError] = useState("");
  const [savedHotel, setSavedHotel] = useState(() => hotel ? getFavorites().includes(hotel.id) : false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI (demo)");

  const room = hotel?.rooms.find(r => r.id === selectedRoom) || hotel?.rooms[0];
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  if (!hotel) return <><Navbar/><main className="container not-found"><h1>We couldn't find that stay.</h1><Link to="/hotels" className="button-dark">Browse all stays</Link></main><Footer/></>;

  const availability = room ? getRoomAvailability(hotel, room, checkIn, checkOut) : 0;
  const breakdown = room ? getPriceBreakdown(room.price, nights) : { subtotal: 0, fees: 0, total: 0 };
  function toggleSavedHotel() {
    setSavedHotel(toggleFavorite(hotel.id).includes(hotel.id));
  }

  function bookNow(event) {
    event.preventDefault();
    if (!checkIn || !checkOut || checkOut <= checkIn) { setError("Please choose a valid check-in and check-out date."); return; }
    if (checkIn < today) { setError("Check-in cannot be in the past."); return; }
    if (guests > room.guests) { setError(`This room accommodates up to ${room.guests} guests. Choose another room or reduce guests.`); return; }
    if (getRoomAvailability(hotel, room, checkIn, checkOut) <= 0) { setError("This room is no longer available for those dates. Please choose another room or date range."); return; }
    if (!guestName.trim()) { setError("Enter the guest's full name."); return; }
    const phoneDigits = guestPhone.replace(/\D/g, "").length;
    if (phoneDigits < 8 || phoneDigits > 15) { setError("Enter a phone number with 8 to 15 digits."); return; }
    const booking = {
      id: makeId(), hotelId: hotel.id, hotelName: hotel.name, hotelImage: hotel.image, hotelLocation: hotel.location,
      roomId: room.id, roomName: room.name, checkIn, checkOut, guests, nights,
      guestName: guestName.trim(), guestEmail: guestEmail.trim(), guestPhone: guestPhone.trim(),
      paymentMethod, paymentStatus: "Not processed (demo)",
      pricePerNight: room.price, subtotal: breakdown.subtotal, fees: breakdown.fees, total: breakdown.total,
      bookedAt: new Date().toISOString(), status: "Confirmed"
    };
    saveBookings([booking, ...getBookings()]);
    navigate("/bookings", { state: { justBooked: booking.id } });
  }

  return <>
    <Navbar />
    <main className="details-page">
      <div className="container">
        <div className="breadcrumb details-breadcrumb"><Link to="/hotels"><ArrowLeft size={14}/> All stays</Link><span>/</span>{hotel.name}</div>
        <div className="details-title-row"><div><span className="hotel-type">{hotel.type}</span><h1>{hotel.name}</h1><p className="hotel-location"><MapPin size={15}/>{hotel.location}<span className="location-separator">·</span><Star size={15} fill="currentColor" className="star-inline"/> <strong>{hotel.rating.toFixed(1)}</strong> <span>({hotel.reviews} sample reviews · demo score)</span></p></div><button className={`share-save ${savedHotel ? "saved" : ""}`} onClick={toggleSavedHotel} aria-pressed={savedHotel}><Heart size={17} fill={savedHotel ? "currentColor" : "none"}/>{savedHotel ? "Saved" : "Save stay"}</button></div>
        <div className="gallery-grid"><div className="gallery-main"><img src={hotel.gallery[0]} alt={`${hotel.name} main view`}/></div><div className="gallery-side"><img src={hotel.gallery[1]} alt={`${hotel.name} room view`}/><img src={hotel.gallery[2]} alt={`${hotel.name} interior view`}/></div><span className="gallery-label"><Sparkles size={14}/> A STAY WITH SOUL</span></div>
        <div className="details-columns">
          <div className="details-main">
            <section className="details-intro"><span className="section-kicker">THE STAY</span><h2>A little place to feel at home.</h2><p>{hotel.description}</p><div className="intro-highlights"><span><ShieldCheck size={17}/> Carefully selected</span><span><Sparkles size={17}/> Thoughtful details</span><span><Heart size={17}/> Guest loved</span></div></section>
            <section className="amenities-section"><span className="section-kicker">MADE FOR COMFORT</span><h2>What this place offers</h2><div className="amenities-grid">{hotel.amenities.map(item => {const Icon = iconMap[item] || Check; return <div className="amenity" key={item}><Icon size={19}/><span>{item}</span></div>;})}</div></section>
            <section className="stay-info-section"><span className="section-kicker">GOOD TO KNOW</span><h2>Before you arrive</h2><div className="stay-info-grid"><div><strong>Check-in</strong><span>From 3:00 PM</span></div><div><strong>Check-out</strong><span>By 11:00 AM</span></div><div><strong>Cancellation</strong><span>Free until 7 days before check-in; 50% refund from 72 hours to 6 days before; no refund within 72 hours.</span></div></div><p className="demo-policy-note">Sample policy for this demo; confirm actual terms with the property before travel.</p><a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${hotel.location}`)}`} target="_blank" rel="noreferrer"><MapPin size={16}/> View {hotel.location} on Google Maps <ArrowRight size={15}/></a></section>
            <section className="guest-notes-section"><span className="section-kicker">GUEST IMPRESSIONS</span><h2>Why guests choose this stay</h2><p className="demo-policy-note">Sample guest notes for preview only; these are not verified customer reviews.</p><div className="guest-note-grid"><blockquote>“A lovely base for slowing down and enjoying the destination.”</blockquote><blockquote>“Thoughtful details made the stay feel easy from the start.”</blockquote><blockquote>“The kind of place we would happily recommend to friends.”</blockquote></div></section>
            <section className="rooms-section"><span className="section-kicker">MAKE IT YOURS</span><h2>Choose your room</h2><p className="section-description">Pick the space that feels right for your trip.</p><div className="room-list">{hotel.rooms.map((r, index) => <button key={r.id} className={`room-option ${selectedRoom === r.id ? "room-selected" : ""}`} onClick={() => setSelectedRoom(r.id)} aria-pressed={selectedRoom === r.id}><img className="room-photo" src={r.image || hotel.gallery[Math.min(index + 1, hotel.gallery.length - 1)] || hotel.image} alt={`${r.name} at ${hotel.name}`} loading="lazy"/><span className="room-radio">{selectedRoom === r.id && <span/>}</span><span className="room-copy"><strong>{r.name}</strong><small>{r.description}</small><span className="room-capacity"><Users size={14}/> Up to {r.guests} guests</span></span><span className="room-price"><strong>{formatCurrency(r.price)}</strong><small>per night</small></span></button>)}</div></section>
          </div>
          <aside className="booking-card"><form className="checkout-form" onSubmit={bookNow}><div className="booking-card-price"><strong>{formatCurrency(room.price)}</strong><span> / night</span></div><div className="booking-rating"><Star size={14} fill="currentColor"/> {hotel.rating} <span>· demo score</span></div><p className={`availability-status ${availability ? "" : "availability-sold-out"}`} role="status">{availability ? `${availability} ${availability === 1 ? "room" : "rooms"} available for these dates · demo` : "No rooms available for these dates"}</p>
            <div className="booking-dates"><label><span>CHECK-IN</span><input type="date" min={today} value={checkIn} onChange={e => {setCheckIn(e.target.value); if(checkOut <= e.target.value) {const d = new Date(`${e.target.value}T00:00:00`); d.setDate(d.getDate()+1); setCheckOut(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`);}}} required/></label><label><span>CHECK-OUT</span><input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} required/></label></div>
            <label className="booking-guests"><span>GUESTS</span><select value={guests} onChange={e => setGuests(Number(e.target.value))}>{[1,2,3,4,5,6,7,8].map(n=><option value={n} key={n}>{n} {n===1?"guest":"guests"}</option>)}</select></label>
            <div className="checkout-guest-details"><span className="checkout-section-label">GUEST DETAILS</span><label className="checkout-field"><span>Full name</span><input value={guestName} onChange={e => setGuestName(e.target.value)} autoComplete="name" required/></label><label className="checkout-field"><span>Email</span><input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} autoComplete="email" required/></label><label className="checkout-field"><span>Phone</span><input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} autoComplete="tel" pattern="[+]?[0-9 ]{8,18}" title="Enter 8 to 15 digits, optionally prefixed with +. Spaces are allowed." required/></label></div>
            <label className="booking-guests payment-method-field"><span>PAYMENT MODE</span><select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}><option>UPI (demo)</option><option>Credit/debit card (demo)</option><option>Pay at property</option></select></label>
            <p className="payment-disclaimer">Demo checkout only. No payment details are collected and no payment is processed.</p>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="price-breakdown"><div><span>{formatCurrency(room.price)} × {nights} {nights === 1 ? "night" : "nights"}</span><strong>{formatCurrency(breakdown.subtotal)}</strong></div><div><span>Estimated taxes &amp; fees (8%)</span><strong>{formatCurrency(breakdown.fees)}</strong></div><div className="price-total"><span>Total</span><strong>{formatCurrency(breakdown.total)}</strong></div><p className="price-estimate-note">Demo estimate only; not a tax quote.</p></div>
            <button className="booking-button" type="submit" disabled={!availability}>Confirm booking <ArrowRight size={17}/></button>
            <p className="booking-safe"><ShieldCheck size={15}/> Reservation details saved on this device</p>
          </form></aside>
        </div>
        <div className="details-back-link"><Link to="/hotels"><ArrowLeft size={16}/> Explore more stays</Link></div>
      </div>
    </main>
    <Footer />
  </>;
}
