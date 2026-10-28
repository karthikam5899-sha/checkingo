import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, CreditCard, FileDown, Mail, MapPin, Phone, ShieldCheck, Trash2, UserRound, Users, XCircle, Pencil } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBookings, saveBookings } from "../utils/storage";
import { formatCurrency, nightsBetween, todayISO } from "../utils/format";
import { downloadBookingReceipt } from "../utils/receipt";
import { hotels } from "../data/hotels";
import { getPriceBreakdown, getRoomAvailability } from "../utils/availability";

export default function Bookings() {
  const location = useLocation();
  const [bookings, setBookings] = useState(getBookings());
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState(location.state?.justBooked ? "Your stay is reserved! Your booking details are below." : "");
  const [cancelId, setCancelId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [editError, setEditError] = useState("");
  const [receiptError, setReceiptError] = useState("");

  const visible = bookings.filter(b => filter === "all" || b.status.toLowerCase() === filter);
  const newBooking = bookings.find(b => b.id === location.state?.justBooked);
  const modalOpen = Boolean(cancelId || editDraft);
  useEffect(() => {
    if (!modalOpen) return undefined;
    const dialog = document.querySelector('[role="dialog"]');
    const focusable = dialog ? [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]')] : [];
    const previousFocus = document.activeElement;
    focusable[0]?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setCancelId(null);
        setEditDraft(null);
        setEditError("");
      } else if (event.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [modalOpen]);

  function downloadReceipt(booking) {
    try {
      downloadBookingReceipt(booking);
      setReceiptError("");
    } catch {
      setReceiptError("The PDF receipt could not be created. Please try again.");
    }
  }

  function cancelBooking(id) {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "Cancelled", cancelledAt: new Date().toISOString() } : b);
    setBookings(updated);
    saveBookings(updated);
    setCancelId(null);
    setNotice("Booking cancelled. Your booking history has been updated.");
  }

  function openEdit(booking) {
    setEditDraft({ ...booking });
    setEditError("");
  }

  function saveEdit(event) {
    event.preventDefault();
    const hotel = hotels.find(item => item.id === editDraft.hotelId);
    const room = hotel?.rooms.find(item => item.id === editDraft.roomId);
    if (!hotel || !room) {
      setEditError("We couldn't find this stay or room. Please refresh and try again.");
      return;
    }
    if (!editDraft.checkIn || !editDraft.checkOut || editDraft.checkIn < todayISO() || editDraft.checkOut <= editDraft.checkIn) {
      setEditError("Choose a valid future check-in date and a check-out date after it.");
      return;
    }
    if (editDraft.guests > room.guests) {
      setEditError(`This room accommodates up to ${room.guests} guests.`);
      return;
    }
    if (getRoomAvailability(hotel, room, editDraft.checkIn, editDraft.checkOut, editDraft.id) <= 0) {
      setEditError("That room is not available for the selected dates in this browser demo.");
      return;
    }
    const nights = nightsBetween(editDraft.checkIn, editDraft.checkOut);
    const prices = getPriceBreakdown(room.price, nights);
    const updated = bookings.map(booking => booking.id === editDraft.id ? {
      ...booking,
      roomId: room.id,
      roomName: room.name,
      pricePerNight: room.price,
      checkIn: editDraft.checkIn,
      checkOut: editDraft.checkOut,
      guests: Number(editDraft.guests),
      nights,
      subtotal: prices.subtotal,
      fees: prices.fees,
      total: prices.total,
      modifiedAt: new Date().toISOString()
    } : booking);
    setBookings(updated);
    saveBookings(updated);
    setEditDraft(null);
    setEditError("");
    setNotice("Booking updated. Your dates, room and total have been saved.");
  }

  return <>
    <Navbar />
    <main className="bookings-page">
      <div className="bookings-hero"><div className="container"><div className="breadcrumb">Your account <span>/</span> My bookings</div><span className="section-kicker">YOUR TRAVEL JOURNAL</span><h1>Every trip starts<br/>with a <em>little yes.</em></h1><p>Keep all your getaways in one easy place.</p></div></div>
      <div className="container bookings-content">
        {notice && <div className="booking-notice"><CheckCircle2 size={19}/><span>{notice}</span>{newBooking && <button className="receipt-download-button" onClick={() => downloadReceipt(newBooking)}><FileDown size={16}/> Download PDF receipt</button>}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><XCircle size={17}/></button></div>}
        {receiptError && <p className="form-error receipt-error" role="alert">{receiptError}</p>}
        <div className="bookings-toolbar"><div><h2>Your bookings</h2><p>{bookings.length} {bookings.length === 1 ? "stay" : "stays"} in your travel journal</p></div><div className="booking-filters">{[["all","All stays"],["confirmed","Confirmed"],["cancelled","Cancelled"]].map(([value,label])=><button key={value} className={filter===value?"filter-tab active-tab": "filter-tab"} onClick={()=>setFilter(value)}>{label}</button>)}</div></div>
        {visible.length ? <div className="booking-list">{visible.map(b => <article className={`booking-item ${b.status === "Cancelled" ? "booking-cancelled" : ""}`} key={b.id}>
          <div className="booking-item-image"><img src={b.hotelImage} alt={b.hotelName}/><span className={`booking-status ${b.status === "Cancelled" ? "status-cancelled" : ""}`}>{b.status === "Cancelled" ? <XCircle size={13}/> : <CheckCircle2 size={13}/>} {b.status}</span></div>
          <div className="booking-item-content"><div className="booking-item-top"><div><span className="booking-reference">BOOKING REF · {b.id}</span><h3>{b.hotelName}</h3><p className="hotel-location"><MapPin size={14}/>{b.hotelLocation}</p></div><div className="booking-item-price"><strong>{formatCurrency(b.total)}</strong><span>{b.nights} {b.nights === 1 ? "night" : "nights"}</span></div></div>
            <div className="booking-meta"><span><CalendarDays size={15}/><span><small>CHECK-IN — CHECK-OUT</small><strong>{formatDate(b.checkIn)} – {formatDate(b.checkOut)}</strong></span></span><span><Users size={15}/><span><small>GUESTS</small><strong>{b.guests} {b.guests === 1 ? "guest" : "guests"}</strong></span></span><span><Clock3 size={15}/><span><small>ROOM</small><strong>{b.roomName}</strong></span></span></div>
            <div className="booking-contact-meta"><span><UserRound size={14}/><span><small>GUEST</small><strong>{b.guestName || "—"}</strong></span></span><span><Mail size={14}/><span><small>EMAIL</small><strong>{b.guestEmail || "—"}</strong></span></span><span><Phone size={14}/><span><small>PHONE</small><strong>{b.guestPhone || "—"}</strong></span></span><span><CreditCard size={14}/><span><small>PAYMENT MODE</small><strong>{b.paymentMethod || "Not recorded"}</strong></span></span></div>
            <div className="booking-cost-summary"><span>{formatCurrency(b.pricePerNight || 0)} × {b.nights} {b.nights === 1 ? "night" : "nights"}</span><span>Estimated fees: {b.fees === undefined ? "Not itemized" : formatCurrency(b.fees)}</span><strong>Total: {formatCurrency(b.total)}</strong></div>
            <div className="booking-item-footer"><span><ShieldCheck size={15}/> {b.status === "Cancelled" ? `Cancelled on ${formatDate((b.cancelledAt || "").slice(0,10))}` : "Reservation confirmed · demo payment not processed"}</span><div className="booking-actions">{b.status === "Confirmed" && <><button className="receipt-download-button" onClick={() => openEdit(b)}><Pencil size={14}/> Modify booking</button><button className="cancel-booking-button" onClick={() => setCancelId(b.id)}><Trash2 size={14}/> Cancel booking</button></>}<button className="receipt-download-button" onClick={() => downloadReceipt(b)}><FileDown size={14}/> PDF receipt</button></div></div>
          </div>
        </article>)}</div> : <div className="empty-state booking-empty"><span className="empty-icon"><CalendarDays size={25}/></span><h3>{filter === "all" ? "Your next getaway starts here" : `No ${filter} bookings`}</h3><p>{filter === "all" ? "You haven't booked a stay yet. Find a place that makes you feel somewhere new." : "Try another filter to see your travel plans."}</p>{filter === "all" && <Link to="/hotels" className="button-dark">Explore stays <ArrowRight size={16}/></Link>}</div>}
      </div>
    </main>
    <Footer />
    {cancelId && <div className="modal-backdrop" role="presentation" onClick={() => setCancelId(null)}><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-title" onClick={e => e.stopPropagation()}><span className="modal-icon"><Trash2 size={21}/></span><h2 id="cancel-title">Cancel this stay?</h2><p>Sample policy: free until 7 days before check-in; 50% refund from 72 hours to 6 days before; no refund within 72 hours. Cancelling here only updates this browser demo; no refund is processed.</p><div className="modal-actions"><button className="button-outline" onClick={() => setCancelId(null)}>Keep booking</button><button className="button-danger" onClick={() => cancelBooking(cancelId)}>Yes, cancel</button></div></div></div>}
    {editDraft && <div className="modal-backdrop" role="presentation" onClick={() => {setEditDraft(null); setEditError("");}}><form className="confirm-modal edit-booking-modal" role="dialog" aria-modal="true" aria-labelledby="edit-booking-title" onSubmit={saveEdit} onClick={event => event.stopPropagation()}><span className="modal-icon"><Pencil size={20}/></span><h2 id="edit-booking-title">Change your stay</h2><p>Choose new dates, guests or a room. We'll recalculate the estimated total before saving.</p><label className="checkout-field"><span>Check-in</span><input type="date" min={todayISO()} value={editDraft.checkIn} onChange={event => setEditDraft({...editDraft, checkIn:event.target.value})} required/></label><label className="checkout-field"><span>Check-out</span><input type="date" min={editDraft.checkIn || todayISO()} value={editDraft.checkOut} onChange={event => setEditDraft({...editDraft, checkOut:event.target.value})} required/></label><label className="checkout-field"><span>Room</span><select value={editDraft.roomId} onChange={event => setEditDraft({...editDraft, roomId:event.target.value})}>{(hotels.find(item => item.id === editDraft.hotelId)?.rooms || []).map(room => <option value={room.id} key={room.id}>{room.name} · {formatCurrency(room.price)}/night · up to {room.guests} guests</option>)}</select></label><label className="checkout-field"><span>Guests</span><select value={editDraft.guests} onChange={event => setEditDraft({...editDraft, guests:Number(event.target.value)})}>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}</select></label>{(() => {const selectedHotel=hotels.find(item=>item.id===editDraft.hotelId);const selectedRoom=selectedHotel?.rooms.find(item=>item.id===editDraft.roomId);const prices=selectedRoom?getPriceBreakdown(selectedRoom.price,nightsBetween(editDraft.checkIn,editDraft.checkOut)):null;return prices?<div className="edit-price-summary"><span>{nightsBetween(editDraft.checkIn,editDraft.checkOut)} nights · estimated fees included</span><strong>{formatCurrency(prices.total)}</strong></div>:null;})()}{editError && <p className="form-error" role="alert">{editError}</p>}<div className="modal-actions"><button type="button" className="button-outline" onClick={() => {setEditDraft(null); setEditError("");}}>Keep current booking</button><button type="submit" className="button-danger">Save changes</button></div></form></div>}
  </>;
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
