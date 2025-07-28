import '../styles/About.scss'

export default function About() {
  return (
    <section className="about-page">
      <div className="about-header">
        <h1>Sobre Blossom</h1>
        <p>
          Somos una confitería joven en Bahía Blanca, nacida del amor por los sabores reales,
          el buen café y los encuentros que valen la pena. Creemos que cada detalle importa:
          desde la calidad de los ingredientes hasta la calidez en la atención.
        </p>
      </div>

      <div className="about-image">
        <img src="/images/cafe.jpg" alt="Cafe de Blossom" />
      </div>

      <div className="about-extra">
        <h2>¿Qué nos diferencia?</h2>
        <ul>
          <li>🥐 Productos caseros hechos todos los días</li>
          <li>☕ Café de especialidad preparado con amor</li>
          <li>🌿 Opción veggie & sin TACC</li>
          <li>👋 Atención cercana y ambiente relajado</li>
        </ul>
      </div>
    </section>
  )
}
