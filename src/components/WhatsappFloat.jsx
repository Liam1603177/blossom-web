// src/components/WhatsappFloat.jsx
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappFloat() {
  return (
    <a
      href="https://wa.me/5492910000000?text=Hola%20quiero%20hacer%20una%20consulta%20a%20Blossom!"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        background: "#25d366",
        color: "#fff",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        zIndex: 1000,
        boxShadow: "0 4px 12px #0002",
        transition: "background 0.2s"
      }}
      title="Consultanos por WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
