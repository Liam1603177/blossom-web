import { useState } from "react";
import toast from "react-hot-toast";
import '../styles/Reservas.scss';

const API = import.meta.env.VITE_API_URL;

export default function Reservas() {
  const [form, setForm] = useState({
    nombre: "", email: "", fecha: "", hora: "", personas: 2, notas: "",
  });
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.fecha || !form.hora || !form.personas) {
      toast.error("Completá los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo enviar la reserva");
      toast.success("¡Reserva enviada! Te contactamos a la brevedad.");
      setForm({ nombre: "", email: "", fecha: "", hora: "", personas: 2, notas: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="reservas-page">
      <h1>Reservá tu mesa</h1>

      <form onSubmit={onSubmit} className="reserva-form">
        <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Tu nombre *" required />
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Tu email" />

        <input type="date" name="fecha" value={form.fecha} onChange={onChange} required />
        <input type="time" name="hora" value={form.hora} onChange={onChange} required />

        <input type="number" min="1" max="50" name="personas" value={form.personas} onChange={onChange} required />

        <textarea name="notas" value={form.notas} onChange={onChange} placeholder="Notas (sin TACC, sin nueces, etc.)" />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Reservar"}
        </button>
      </form>
    </section>
  );
}
