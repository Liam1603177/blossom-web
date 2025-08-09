import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import '../styles/Navbar.scss'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="navbar">
      <h1 className="logo">🌸 Blossom <span>Bakery</span></h1>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
      <ul className={menuOpen ? 'nav-links active' : 'nav-links'}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/menu" onClick={toggleMenu}>Menú</Link></li>
        <li><Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link></li>
        <li><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>
        <li><Link to="/reservas" onClick={toggleMenu}>Reservas</Link></li>
      </ul>
      <button
        className="cart-btn"
        onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
        aria-label="Abrir carrito"
      >
        <FiShoppingCart />
        {count > 0 && <span className="badge">{count}</span>}
      </button>
    </nav>
  )
}
