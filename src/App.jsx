import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoBanner from "./components/PromoBanner";
import CartDrawer from "./components/CartDrawer";
import WhatsappFloat from "./components/WhatsappFloat";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reservas from "./pages/Reservas";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <div className="app-wrapper">
      <PromoBanner />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />   {/* <- agrega esta */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<ProductDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsappFloat />
    </div>
  );
}
