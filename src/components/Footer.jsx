import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand"><img className="brand-logo-image footer-brand-logo" src="/CheckInGo.png" alt="" aria-hidden="true" /><span className="brand-wordmark"><span className="brand-name">Check In Go</span><small>YOUR STAY, YOUR WAY</small></span></Link>
          <p>Thoughtful stays for the places<br />you can't wait to discover.</p>
        </div>
        <div><h4>Explore</h4><Link to="/hotels">Find a stay</Link><Link to="/bookings">My bookings</Link><a href="/#why">Our story</a></div>
        <div className="footer-contact"><h4>Need a hand?</h4><a href="mailto:hello@checkingo.example"><Mail size={15} /> hello@checkingo.example</a><a href="tel:+9118005550142"><Phone size={15} /> +91 1800 555 0142</a><span><MapPin size={15} /> 42 Marina View Road, Chennai, Tamil Nadu, India</span><a href="/#faq">FAQs</a></div>
        <div><h4>Follow along</h4><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube size={17} /></a><a href="https://twitter.com" aria-label="Twitter"><Twitter size={17} /></a></div><p className="footer-note">Little escapes. Big memories.</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Check In Go. Demo booking experience.</span><span>Made for slower mornings <span className="footer-heart">♥</span></span></div>
    </footer>
  );
}
