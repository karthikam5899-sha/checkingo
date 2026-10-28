import { useState } from "react";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { todayISO } from "../utils/format";

function addDays(date, days) {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function SearchPanel({ initial = {}, onSearch, compact = false }) {
  const today = todayISO();
  const [location, setLocation] = useState(initial.location || "");
  const [checkIn, setCheckIn] = useState(initial.checkIn || today);
  const [checkOut, setCheckOut] = useState(initial.checkOut || addDays(today, 2));
  const [guests, setGuests] = useState(Number(initial.guests || 2));
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError("");
    onSearch({ location: location.trim(), checkIn, checkOut, guests });
  }

  return (
    <form className={`search-panel ${compact ? "search-panel-compact" : ""}`} onSubmit={submit}>
      <label className="search-field location-field">
        <span className="field-icon"><MapPin size={19} /></span>
        <span className="field-copy"><span className="field-label">Destination</span>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Where do you want to go?" aria-label="Destination" />
        </span>
      </label>
      <label className="search-field">
        <span className="field-icon"><CalendarDays size={19} /></span>
        <span className="field-copy"><span className="field-label">Check in</span>
          <input type="date" min={today} value={checkIn} onChange={e => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1)); }} aria-label="Check in" required />
        </span>
      </label>
      <label className="search-field">
        <span className="field-icon"><CalendarDays size={19} /></span>
        <span className="field-copy"><span className="field-label">Check out</span>
          <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} aria-label="Check out" required />
        </span>
      </label>
      <label className="search-field guests-field">
        <span className="field-icon"><Users size={19} /></span>
        <span className="field-copy"><span className="field-label">Guests</span>
          <select value={guests} onChange={e => setGuests(Number(e.target.value))} aria-label="Guests">
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
          </select>
        </span>
      </label>
      <button className="search-submit" type="submit"><Search size={19} /><span>Search stays</span></button>
      {error && <p className="form-error search-error">{error}</p>}
    </form>
  );
}
