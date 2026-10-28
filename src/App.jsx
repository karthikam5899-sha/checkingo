import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RoomIntro from "./components/RoomIntro";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {introVisible && <RoomIntro />}
  </>;
}
