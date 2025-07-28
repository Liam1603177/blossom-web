import '../styles/Footer.scss'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Blossom · Cocina feliz en Bahía Blanca</p>
      <div className="social-icons">
        <a href="https://www.instagram.com/blossombahia/" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/Blossom.bhi" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://wa.me/5492915088400" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  )
}
