import menuData from '../data/menu.json'
import '../styles/Menu.scss'

export default function Menu() {
  return (
    <section className="menu-page">
      <h1>Nuestro Menú</h1>

      {Object.entries(menuData).map(([categoria, productos]) => (
        <div key={categoria} className="menu-section">
          <h2>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
          <div className="menu-grid">
            {productos.map((prod) => (
              <div key={prod.id} className="menu-card">
                <img src={prod.imagen} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
