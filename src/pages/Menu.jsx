import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Menu.scss";

const API = import.meta.env.VITE_API_URL; // ej: http://localhost:4000/api
const CATS = ["tortas", "cookies", "almuerzo", "cupcake"];

export default function Menu() {
  const { add } = useCart();
  const [data, setData] = useState({
    tortas: [], cookies: [], almuerzo: [], cupcake: []
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all(
      CATS.map(cat =>
        fetch(`${API}/products?category=${cat}&limit=50&sort=createdAt:desc`)
          .then(r => r.json())
          .then(r => (r.items || []).map(p => ({ ...p, id: p._id }))) // normalizo _id -> id
      )
    )
      .then(([tortas, cookies, almuerzo, cupcake]) => {
        if (!alive) return;
        setData({ tortas, cookies, almuerzo, cupcake });
        setLoading(false);
      })
      .catch(e => {
        if (!alive) return;
        setErr("No pudimos cargar el menú");
        setLoading(false);
        console.error(e);
      });
    return () => { alive = false; };
  }, []);

  if (loading) return (
    <section className="menu-page">
      <h1>Nuestro Menú</h1>
      <p>Cargando menú…</p>
      <small style={{color:'#b77', display:'block', marginTop:8}}>
        Si es la primera vez que accedés, puede demorar unos segundos mientras el servidor despierta.
      </small>
    </section>
  );
  if (err) return <section className="menu-page"><h1>Nuestro Menú</h1><p>{err}</p></section>;

  return (
    <section className="menu-page">
      <h1>Nuestro Menú</h1>

      {CATS.map((categoria) => {
        const productos = data[categoria] || [];
        if (!productos.length) return null;
        return (
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
                      e.preventDefault();
                      e.stopPropagation();
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
        );
      })}
    </section>
  );
}
