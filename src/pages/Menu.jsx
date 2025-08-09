import menuData from '../data/menu.json'
import '../styles/Menu.scss'
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Menu() {
  const { add } = useCart()

  return (
    <section className="menu-page">
      <h1>Nuestro Menú</h1>

      {Object.entries(menuData).map(([categoria, productos]) => (
        <div key={categoria} className="menu-section">
          <h2>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
          <div className="menu-grid">
            {productos.map((prod) => (
              <Link key={prod.id} to={`/menu/${prod.id}`} className="menu-card">
                <img src={prod.imagen} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <button
                  className="add-mini"
                  onClick={(e) => { 
                    e.preventDefault(); e.stopPropagation();
                    add(prod, 1);
                    window.dispatchEvent(new CustomEvent("open-cart"));
                  }}
                >
                  Agregar
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
