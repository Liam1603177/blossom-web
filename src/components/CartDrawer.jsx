import { useEffect, useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import "../styles/CartDrawer.scss";
import toast from "react-hot-toast"; // <-- Agrega esta línea

export default function CartDrawer() {
  const { items, total, remove, setQty, clear } = useCart();
  const [open, setOpen] = useState(false);

  // Datos del checkout (cliente)
  const [checkout, setCheckout] = useState({
    nombre: "",
    metodo: "retiro", // retiro | envio
    horario: "",
    notas: ""
  });

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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCheckout((c) => ({ ...c, [name]: value }));
  };

  const makeWhatsappLink = () => {
    const lines = items.map(i => `• ${i.nombre} x${i.qty} - ${formatPrice(i.precio || 0)}`).join("\n");
    const totalLine = `\n\nTotal: ${formatPrice(total)}`;
    const datos = [
      `Nombre: ${checkout.nombre || "-"}`,
      `Método: ${checkout.metodo}`,
      `Horario: ${checkout.horario || "-"}`,
      checkout.notas ? `Notas: ${checkout.notas}` : null
    ].filter(Boolean).join("\n");

    const text = `Hola Blossom! Quiero hacer este pedido:\n${lines}${totalLine}\n\n${datos}`;
    const phone = import.meta.env.VITE_WPP_NUMBER || "5492910000000";
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const canSend = items.length > 0 && checkout.nombre.trim().length >= 2;

  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="header">
        <h3>Tu pedido</h3>
        <button aria-label="Cerrar" onClick={() => setOpen(false)}><FiX /></button>
      </div>

      <div className="content">
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          items.map(item => (
            <div className="row" key={item.id}>
              <img src={item.imagen} alt={item.nombre} />
              <div className="info">
                <strong>{item.nombre}</strong>
                <span>{formatPrice(item.precio || 0)}</span>
                <div className="qty">
                  <button onClick={() => { setQty(item.id, item.qty - 1); toast.dismiss(); }}>
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                  />
                  <button onClick={() => { setQty(item.id, item.qty + 1); toast.dismiss(); }}>
                    +
                  </button>
                </div>
              </div>
              <button className="remove" aria-label="Quitar" onClick={() => { remove(item.id); toast("Producto eliminado"); }}>
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout */}
      <div className="checkout">
        <input
          name="nombre"
          placeholder="Tu nombre*"
          value={checkout.nombre}
          onChange={onChange}
        />
        <div className="row-2">
          <select name="metodo" value={checkout.metodo} onChange={onChange}>
            <option value="retiro">Retiro en local</option>
            <option value="envio">Envío</option>
          </select>
          <input
            name="horario"
            placeholder="Horario estimado"
            value={checkout.horario}
            onChange={onChange}
          />
        </div>
        <textarea
          name="notas"
          placeholder="Notas (sin TACC, sin nueces, vela, etc.)"
          rows={2}
          value={checkout.notas}
          onChange={onChange}
        />
      </div>

      <div className="footer">
        <div className="totals">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <div className="actions">
          <button className="muted" onClick={() => { clear(); toast("Carrito vacío"); }} disabled={!items.length}>
            Vaciar
          </button>
          <a
            className={`whatsapp ${canSend ? "" : "disabled"}`}
            href={canSend ? makeWhatsappLink() : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canSend}
            title={canSend ? "Enviar por WhatsApp" : "Completá tu nombre para continuar"}
          >
            Enviar por WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}