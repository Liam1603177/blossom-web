import { useEffect, useRef, useState } from "react";
import promos from "../data/promos.json";
import "../styles/PromoBanner.scss";

export default function PromoBanner() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIdx((i) => (i + 1) % promos.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const onMouseEnter = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const onMouseLeave = () => { timerRef.current = setInterval(next, 4500); };

  const actual = promos[idx];

  return (
    <div
      className="promo-banner"
      style={{ background: actual.color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="status"
      aria-live="polite"
    >
      <button className="prev" aria-label="Anterior" onClick={() => setIdx((i) => (i - 1 + promos.length) % promos.length)}>‹</button>
      <p>{actual.texto}</p>
      <button className="next" aria-label="Siguiente" onClick={next}>›</button>
    </div>
  );
}
