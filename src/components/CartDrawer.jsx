import { useEffect, useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/CartDrawer.scss";

export default function CartDrawer() {
  const { items, total, remove, setQty, clear } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);
    window.addEventListener("open-cart", openHandler);
    window.addEventListener("close-cart", closeHandler);
    return () => {
      window.removeEventListener("open-cart", openHandler);
      window.removeEventListener("close-cart", closeHandler);
    };
  }, []);

  const makeWhatsappLink = () => {
    const lines = items.map(i => `• ${i.nombre} x${i.qty} - $${i.precio || 0}`).join("%0A");
    const totalLine = `%0A%0ATotal: $${total}`;
    const txt = `Hola Blossom! Quiero hacer este pedido:%0A${lines}${totalLine}`;
    return `https://wa.me/5492910000000?text=${txt}`;
  };

  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`}>
      <div className="header">
        <h3>Tu pedido</h3>
        <button aria-label="Cerrar" onClick={() => setOpen(false)}><FiX /></button>
      </div>

      <div className="content">
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : items.map(item => (
          <div className="row" key={item.id}>
            <img src={item.imagen} alt={item.nombre} />
            <div className="info">
              <strong>{item.nombre}</strong>
              <span>${item.precio || 0}</span>
              <div className="qty">
                <button onClick={() => setQty(item.id, item.qty - 1)}>-</button>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                />
                <button onClick={() => setQty(item.id, item.qty + 1)}>+</button>
              </div>
            </div>
            <button className="remove" onClick={() => remove(item.id)}><FiTrash2 /></button>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="totals">
          <span>Total</span><strong>${total}</strong>
        </div>
        <div className="actions">
          <button className="muted" onClick={clear}>Vaciar</button>
          <a className={`whatsapp ${items.length ? "" : "disabled"}`}
             href={items.length ? makeWhatsappLink() : "#"}
             target="_blank" rel="noopener noreferrer">
            Enviar por WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
