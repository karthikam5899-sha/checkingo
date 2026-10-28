const BOOKINGS_KEY = "stayhaven_bookings_v1";
const SEARCH_KEY = "stayhaven_search_v1";
const FAVORITES_KEY = "stayhaven_favorites_v1";

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function getSavedSearch() {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveSearch(search) {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(search));
}

export function getFavorites() {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(favorites) ? favorites.filter(id => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(hotelId) {
  const favorites = getFavorites();
  const updated = favorites.includes(hotelId)
    ? favorites.filter(id => id !== hotelId)
    : [...favorites, hotelId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function makeId() {
  return `SH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
