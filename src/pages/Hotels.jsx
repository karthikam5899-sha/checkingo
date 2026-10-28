import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowDownUp, SlidersHorizontal, X, Search, SlidersHorizontal as FilterIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import SearchPanel from "../components/SearchPanel";
import { hotels } from "../data/hotels";
import { getSavedSearch, saveSearch } from "../utils/storage";
import { isHotelAvailable } from "../utils/availability";

export default function Hotels() {
  const routeLocation = useLocation();
  const initial = routeLocation.state?.search || getSavedSearch() || {};
  const [search, setSearch] = useState(initial);
  const [query, setQuery] = useState(initial.location || "");
  const [maxPrice, setMaxPrice] = useState(16000);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = hotels.filter(h => {
      const matchesQuery = !query.trim() || `${h.name} ${h.location} ${h.area} ${h.type}`.toLowerCase().includes(query.toLowerCase());
      const hasDateRange = search.checkIn && search.checkOut && search.checkOut > search.checkIn;
      const matchesDates = !hasDateRange || isHotelAvailable(h, search.checkIn, search.checkOut, Number(search.guests || 1));
      return matchesQuery && h.price <= maxPrice && h.rating >= Number(minRating) && matchesDates;
    });
    if (sort === "price-low") list.sort((a,b) => a.price - b.price);
    if (sort === "price-high") list.sort((a,b) => b.price - a.price);
    if (sort === "rating") list.sort((a,b) => b.rating - a.rating);
    return list;
  }, [query, maxPrice, minRating, sort, search]);

  function handleSearch(values) {
    setSearch(values);
    setQuery(values.location);
    saveSearch(values);
  }

  return <>
    <Navbar />
    <main className="listing-page">
      <div className="listing-top"><div className="container"><div className="breadcrumb">Discover <span>/</span> Stays</div><span className="section-kicker">YOUR NEXT ESCAPE STARTS HERE</span><h1>Find a place to <em>belong.</em></h1><p>Thoughtful places, beautiful spaces. Your kind of stay is waiting.</p></div></div>
      <div className="container listing-search"><SearchPanel initial={search} compact onSearch={handleSearch} /></div>
      <div className="container listing-layout">
        <aside className={`filter-sidebar ${filtersOpen ? "filters-open" : ""}`}>
          <div className="filter-heading"><h3><SlidersHorizontal size={17} /> Filters</h3><button onClick={() => { setMaxPrice(16000); setMinRating("0"); setQuery(""); }} className="reset-filters">Reset all</button><button className="filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={18}/></button></div>
          <div className="filter-group"><h4>Destination</h4><div className="filter-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="City or hotel" /></div></div>
          <div className="filter-group"><div className="filter-label-row"><h4>Price per night</h4><strong>₹{maxPrice.toLocaleString("en-IN")}</strong></div><input className="price-range" aria-label="Maximum price per night" type="range" min="3000" max="16000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/><div className="range-labels"><span>₹3,000</span><span>₹16,000+</span></div></div>
          <div className="filter-group"><h4>Guest rating</h4>{[["0","All ratings"],["4.8","4.8+ Exceptional"],["4.6","4.6+ Excellent"],["4.4","4.4+ Very good"]].map(([value,label]) => <label className="radio-option" key={value}><input type="radio" name="rating" value={value} checked={minRating === value} onChange={e => setMinRating(e.target.value)}/><span>{label}</span></label>)}</div>
          <div className="filter-note">Showing stays selected for comfort, character and memorable little details.</div>
        </aside>
        <section className="listing-results">
          <div className="results-toolbar"><div><span className="results-count">{filtered.length} stays found</span><span className="results-subtitle">{query ? ` for “${query}”` : " for your next getaway"}</span>{search.checkIn && search.checkOut && <span className="availability-note"> · Showing stays available for your dates (demo)</span>}</div><div className="results-actions"><button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><FilterIcon size={16}/> Filters</button><label className="sort-select"><ArrowDownUp size={15}/><span>Sort:</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
          {filtered.length ? <div className="hotel-grid listing-grid">{filtered.map((hotel, i) => <HotelCard key={hotel.id} hotel={hotel} index={i}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Search size={24}/></span><h3>No stays found just yet</h3><p>Try another destination or loosen your filters to discover more places.</p><button className="button-dark" onClick={() => {setQuery(""); setMaxPrice(16000); setMinRating("0");}}>Clear filters</button></div>}
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
