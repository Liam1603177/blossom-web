import { Link } from 'react-router-dom'
import '../styles/MenuPreview.scss'

export default function MenuPreview() {
  // Productos simulados por ahora, más adelante los podemos traer desde un JSON o backend
const destacados = [
  { id: 1, nombre: 'Cheesecake de frutos rojos', imagen: '/images/blossom.jpg' },
  { id: 2, nombre: 'Croissant de almendras', imagen: '/images/croissant.jpg' },
  { id: 3, nombre: 'Tostadas con palta', imagen: '/images/palta.jpg' },
]

  return (
    <section className="menu-preview" data-aos="fade-up">
      <h2>Nuestros favoritos</h2>
      <div className="menu-cards">
        {destacados.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
          </div>
        ))}
      </div>
      <Link to="/menu" className="menu-button">
        Ver menú completo
      </Link>
    </section>
  )
}
