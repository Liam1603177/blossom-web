import { useParams, Link } from 'react-router-dom'
import menuData from '../data/menu.json'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"

export default function ProductDetail() {
  const { id } = useParams()
  const { add } = useCart()

  // Buscar el producto por ID en todas las categorías
  let producto
  for (const categoria of Object.values(menuData)) {
    producto = categoria.find(item => String(item.id) === id)
    if (producto) break
  }

  if (!producto) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', margin: '4rem 0' }}
      >
        <h2>Producto no encontrado</h2>
        <Link to="/menu" style={{ color: "#d9a1a1", textDecoration: "underline" }}>Volver al menú</Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 480,
        margin: "4rem auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 4px 24px #0001",
        padding: "2rem",
        textAlign: "center"
      }}
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{
          width: "100%",
          borderRadius: 16,
          marginBottom: "1.2rem",
          objectFit: "cover"
        }}
      />
      <h2 style={{ margin: "0 0 0.5rem" }}>{producto.nombre}</h2>
      {/* Opcional: descripción si está en tu JSON */}
      {producto.descripcion && (
        <p style={{ margin: "0.5rem 0 1.5rem", color: "#555" }}>{producto.descripcion}</p>
      )}
      {/* Opcional: ingredientes */}
      {producto.ingredientes && (
        <ul style={{ textAlign: "left", margin: "0 auto 1.5rem", maxWidth: 320, color: "#444" }}>
          {producto.ingredientes.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      )}
      {/* Opcional: precio */}
      {producto.precio && (
        <div style={{ fontSize: "1.2rem", margin: "1rem 0", color: "#d9a1a1", fontWeight: "bold" }}>
          ${producto.precio}
        </div>
      )}
      <button
        style={{
          background: "#d9a1a1",
          color: "#fff",
          border: "none",
          borderRadius: 30,
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
          boxShadow: "0 2px 8px #d9a1a150",
          cursor: "pointer",
          transition: "background 0.2s",
          marginRight: "1rem"
        }}
        onClick={() => {
          add(producto, 1)
          toast.success(`${producto.nombre} agregado al carrito`)
          window.dispatchEvent(new CustomEvent("open-cart"))
        }}
      >
        Agregar al carrito
      </button>
      <a
        href={`https://wa.me/5492915088400?text=Hola! Quiero pedir una porción de ${producto.nombre}.`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          margin: '1.5rem 0 0',
          background: "#25d366",
          color: "#fff",
          borderRadius: 30,
          padding: "0.7rem 2rem",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0 2px 8px #25d36633",
          transition: "background 0.2s"
        }}
      >
        💬 Ordenar por WhatsApp
      </a>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/menu" style={{ color: "#d9a1a1", textDecoration: "underline", fontWeight: 600 }}>Volver al menú</Link>
      </div>
    </motion.div>
  )
}
