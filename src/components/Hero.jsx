import { Link } from 'react-router-dom'
import '../styles/Hero.scss'

export default function Hero() {
  return (
    <section className="hero" data-aos="zoom-in">
      <div className="hero-content">
        <h1>Blossom Bakery</h1>
        <p>Un rincón dulce en Bahía Blanca</p>
        <Link to="/reservas" className="hero-button">
          Reservar mesa
        </Link>
      </div>
    </section>
  )
}
