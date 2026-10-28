# Check In Go — Hotel Management Frontend

A responsive hotel discovery and booking UI built with React, Vite and React Router. It includes search, filters, sorting, hotel details, room selection, live price calculation, booking history, cancellation, and localStorage persistence.

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm
- Internet connection for remote Unsplash photos and Google Fonts

## Run locally

1. Extract the ZIP file.
2. Open the project folder in VS Code.
3. Open a terminal in the project root.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the Vite development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Folder structure

```text
stayhaven-hotel-management/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Footer.jsx
    │   ├── HotelCard.jsx
    │   ├── Navbar.jsx
    │   └── SearchPanel.jsx
    ├── data/
    │   └── hotels.js
    ├── pages/
    │   ├── Bookings.jsx
    │   ├── Favorites.jsx
    │   ├── Home.jsx
    │   ├── HotelDetails.jsx
    │   ├── Hotels.jsx
    │   └── NotFound.jsx
    └── utils/
        ├── availability.js
        ├── format.js
        └── storage.js
```

## Features

- **Home:** hero section, hotel search, featured stays, destination cards and highlights across 13 curated stays.
- **Hotel listing:** destination and date-aware demo availability search, max-price and minimum-rating filters, sorting, and saved stays.
- **Hotel details:** image gallery, amenities, room photos and selection, guest/date/contact validation, demo payment-mode selection, price and estimated-fee breakdown, cancellation terms, check-in/out information, map links, and clearly labeled sample guest notes.
- **Favorites:** save stays across visits and view them from the Saved stays page.
- **Bookings:** persisted booking and guest details, payment-mode history, date/room changes with updated totals, cancellation terms, status filters, and downloadable itemized PDF receipts.
- **Accessibility:** visible keyboard focus, descriptive image/button labels, and reduced-motion support.
- **Responsive UI:** mobile navigation, responsive grids, filter drawer and reduced-layout views, with an editorial travel-journal visual theme.
- **Motion and feedback:** a five-second animated room intro on initial app load, royal ambient background lighting, staggered card entrances, image zoom, hover lift and button feedback, with reduced-motion preferences respected.
- **Local storage:** booking records are stored under `stayhaven_bookings_v1`, saved stays under `stayhaven_favorites_v1`, and the last search under `stayhaven_search_v1`.

## Functional testing checklist

1. Start the app and search for `Ooty`; confirm matching stays appear.
2. On `/hotels`, lower the maximum price and verify results update.
3. Change the rating filter and sorting option.
4. Open a hotel, change the room and dates, and verify the total recalculates.
5. Search for dates and verify stays with no demo availability are filtered out.
6. Save a stay, open **Saved stays**, and verify it remains saved after refresh.
7. Try check-out on or before check-in; the form should prevent booking.
8. Submit checkout without guest details and verify required fields block booking.
9. Complete a demo booking, choose a payment mode, and confirm guest details and itemized costs appear on **My bookings**.
10. Modify dates or room and verify availability checks and totals update.
11. Download the PDF receipt and verify it contains the booking, price breakdown, and payment-mode details.
12. Refresh the page and verify saved stays and bookings remain.
13. Cancel a confirmed booking and verify its status changes to **Cancelled**.
14. Navigate by keyboard and test at desktop width and a mobile viewport.

## Notes / scope

This is a frontend demonstration. It does not connect to a real hotel inventory, payment provider, authentication service or backend API. Availability is simulated from a small per-room inventory and bookings in the current browser only; it is not live or shared between devices. Ratings, review counts, the 8% taxes-and-fees line, cancellation terms and guest notes are demo/sample content—not verified reviews, a tax quote or property contract. Payment modes are recorded for the demo only; no payment is processed. Favorites and booking actions are stored in the current browser's localStorage, and PDF receipts are generated in the browser. Remote hotel photos and map links require internet access. For production, move booking, pricing, availability and cancellation validation to a trusted backend, verify all property details, and add authentication and payment integration.
