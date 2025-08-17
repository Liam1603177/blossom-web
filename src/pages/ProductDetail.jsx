import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL; // ej: http://localhost:4000/api

export default function ProductDetail() {
  const { id } = useParams();                 // id = _id de Mongo
  const { add } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    fetch(`${API}/products/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const p = await r.json();
        // Normalizo _id -> id para que el carrito funcione igual
        const norm = { ...p, id: p._id, precio: Number(p.precio || 0) };
        if (alive) setProducto(norm);
      })
      .catch(() => alive && setProducto(null))
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <section style={{ textAlign: "center", margin: "4rem 0" }}>
        <h2>Cargando…</h2>
      </section>
    );
  }

  if (!producto) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", margin: "4rem 0" }}
      >
        <h2>Producto no encontrado</h2>
        <Link to="/menu" style={{ color: "#d9a1a1", textDecoration: "underline" }}>
          Volver al menú
        </Link>
      </motion.div>
    );
  }

  const msgWA = encodeURIComponent(
    `¡Hola! Quiero pedir una porción de ${producto.nombre} de Blossom.`
  );

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

      {producto.descripcion && (
        <p style={{ margin: "0.5rem 0 1.5rem", color: "#555" }}>{producto.descripcion}</p>
      )}

      {Array.isArray(producto.ingredientes) && producto.ingredientes.length > 0 && (
        <ul style={{ textAlign: "left", margin: "0 auto 1.5rem", maxWidth: 320, color: "#444" }}>
          {producto.ingredientes.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      )}

      {producto.precio > 0 && (
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
          add(producto, 1);
          toast.success(`${producto.nombre} agregado al carrito`);
          window.dispatchEvent(new CustomEvent("open-cart"));
        }}
      >
        Agregar al carrito
      </button>

      <a
        href={`https://wa.me/5492915088400?text=${msgWA}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          margin: "1.5rem 0 0",
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
        <Link to="/menu" style={{ color: "#d9a1a1", textDecoration: "underline", fontWeight: 600 }}>
          Volver al menú
        </Link>
      </div>
    </motion.div>
  );
}
