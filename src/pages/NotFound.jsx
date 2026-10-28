import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return <><Navbar/><main className="container not-found"><span className="section-kicker">404 · A LITTLE DETOUR</span><h1>This page took a wrong turn.</h1><p>Let's get you back to somewhere lovely.</p><Link to="/" className="button-dark">Back to home</Link></main><Footer/></>;
}
