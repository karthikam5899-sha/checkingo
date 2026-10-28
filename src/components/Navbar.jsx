import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <Link to="/" className="brand" onClick={close}>
          <img className="brand-logo-image" src="/CheckInGo.png" alt="" aria-hidden="true" />
          <span className="brand-wordmark"><span className="brand-name">Check In Go</span><small>YOUR STAY, YOUR WAY</small></span>
        </Link>
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          <NavLink to="/" onClick={close} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Discover</NavLink>
          <NavLink to="/hotels" onClick={close} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Stays</NavLink>
          <a className="nav-link" href="/#why" onClick={close}>Our story</a>
          <NavLink to="/bookings" onClick={close} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>My bookings</NavLink>
          <NavLink to="/favorites" onClick={close} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Saved stays</NavLink>
          <Link className="nav-cta" to="/hotels" onClick={close}>Find a stay <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
