import { useState } from 'react'
import '../styles/Reservas.scss'

export default function Reservas() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    hora: '',
    personas: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Reserva enviada. ¡Nos vemos pronto!')
    setFormData({ nombre: '', email: '', fecha: '', hora: '', personas: '' })

    if (Object.values(formData).some((v) => v.trim() === '')) {
  alert('Por favor completá todos los campos.')
  return
}
  }


  return (
    <section className="reservas-page">
      <h1>Reservá tu mesa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="personas"
          placeholder="Cantidad de personas"
          value={formData.personas}
          onChange={handleChange}
          required
        />
        <button type="submit">Reservar</button>
      </form>
    </section>
  )
}
