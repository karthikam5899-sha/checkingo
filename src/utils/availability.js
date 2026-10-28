import { getBookings } from "./storage";

export const DEMO_TAX_RATE = 0.08;

export function getRoomAvailability(hotel, room, checkIn, checkOut, excludeBookingId) {
  const inventory = room.inventory ?? (hotel.type === "Private houseboat" ? 1 : 2);
  if (!checkIn || !checkOut || checkOut <= checkIn) return inventory;

  const booked = getBookings().filter(booking =>
    booking.id !== excludeBookingId &&
    booking.status === "Confirmed" &&
    booking.hotelId === hotel.id &&
    booking.roomId === room.id &&
    booking.checkIn < checkOut &&
    booking.checkOut > checkIn
  ).length;

  return Math.max(0, inventory - booked);
}

export function isHotelAvailable(hotel, checkIn, checkOut, guests) {
  return hotel.rooms.some(room =>
    room.guests >= guests &&
    getRoomAvailability(hotel, room, checkIn, checkOut) > 0
  );
}

export function getPriceBreakdown(pricePerNight, nights) {
  const subtotal = pricePerNight * nights;
  const fees = Math.round(subtotal * DEMO_TAX_RATE);
  return { subtotal, fees, total: subtotal + fees };
}
