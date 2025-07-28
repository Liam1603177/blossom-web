import '../styles/Contact.scss'

export default function Contact() {
  return (
    <section className="contact-page">
      <h1>Contacto</h1>
      <div className="contact-container">
        <div className="contact-info">
          <p><strong>📍 Dirección:</strong> Av. Alem 1234, Bahía Blanca</p>
          <p><strong>📞 Teléfono:</strong> 291-000-0000</p>
          <p><strong>✉️ Email:</strong> blossom@gmail.com</p>
          <p><strong>🕒 Horarios:</strong> Lunes a Domingo de 8:00 a 20:00</p>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.1155717449556!2d-62.2592176!3d-38.7151555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eda35320f5ed69%3A0x29e4668a902e13e4!2sBlossom!5e0!3m2!1ses-419!2sar!4v1753744990081!5m2!1ses-419!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Blossom"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
