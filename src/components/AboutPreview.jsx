import { Link } from 'react-router-dom'
import '../styles/AboutPreview.scss'

export default function AboutPreview() {
  return (
    <section className="about-preview" data-aos="fade-up">
      <div className="about-container">
        <div className="about-text">
          <h2>Hecho con amor</h2>
          <p>
            En Blossom buscamos que cada visita sea una experiencia deliciosa.
            Nuestra pasión es hornear cosas ricas, con ingredientes reales y mucho cariño.
          </p>
          <Link to="/nosotros" className="about-button">
            Conocenos
          </Link>
        </div>
        <div className="about-image">
          <img src="/images/about.jpg" alt="Interior de Blossom" />
        </div>
      </div>
    </section>
  )
}
