import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import ContactPopup from "./components/ContactPopup";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f8faff",
        color: "#0b1e3a",
        fontFamily: "'DM Sans', 'Instrument Sans', system-ui, sans-serif",
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Registration />
      <ContactPopup />
      <Footer />
    </div>
  );
}
