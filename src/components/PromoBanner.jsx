import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import promos from "../data/promos.json";
import "../styles/PromoBanner.scss";

export default function PromoBanner() {
  const [idx, setIdx] = useState(0);
  const t = useRef(null);
  const next = () => setIdx((i) => (i + 1) % promos.length);

  useEffect(() => {
    t.current = setInterval(next, 4500);
    return () => clearInterval(t.current);
  }, []);
  const pause = () => (t.current ? clearInterval(t.current) : null);
  const resume = () => (t.current = setInterval(next, 4500));

  const actual = promos[idx];

  return (
    <div
      className="promo-banner"
      style={{ background: actual.color }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      role="status"
      aria-live="polite"
    >
      <button
        className="prev"
        aria-label="Anterior"
        onClick={() => setIdx((i) => (i - 1 + promos.length) % promos.length)}
      >
        ‹
      </button>

      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.p
            key={actual.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {actual.texto}
          </motion.p>
        </AnimatePresence>
      </div>

      <button className="next" aria-label="Siguiente" onClick={next}>
        ›
      </button>
    </div>
  );
}
