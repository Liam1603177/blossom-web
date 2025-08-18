import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function AdminReservas() {
  const [items, setItems] = useState([]);


  function cargar() {
    fetch(`${API}/reservations`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("admintoken")}` }
    })
      .then(async r => {
        if (!r.ok) {
          const err = await r.text();
          throw new Error(err || `Error ${r.status}`);
        }
        return r.json();
      })
      .then(d => {
        console.log("Respuesta reservas API:", d);
        setItems(d.items || []);
      })
      .catch(e => {
        toast.error(e.message || "Error al cargar reservas");
      });
  }

  useEffect(() => { cargar(); }, []);

  async function borrarReserva(id) {
    if (!window.confirm("¿Seguro que querés borrar esta reserva?")) return;
    try {
      const res = await fetch(`${API}/reservations/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admintoken")}` }
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "No se pudo borrar");
      }
      toast.success("Reserva eliminada");
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <section style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h2>Reservas</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Fecha</th><th>Hora</th><th>Nombre</th><th>Personas</th><th>Email</th><th>Notas</th><th>Creada</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(r => (
            <tr key={r._id}>
              <td>{r.fecha}</td>
              <td>{r.hora}</td>
              <td>{r.nombre}</td>
              <td>{r.personas}</td>
              <td>{r.email || "-"}</td>
              <td>{r.notas || "-"}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => borrarReserva(r._id)} style={{color: "#c00", border: "none", background: "none", cursor: "pointer"}}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
