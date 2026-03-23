import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionTitle({ number, title, titleLight, eyebrow }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      {/* Section label row */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="section-label"
      >
        <span className="section-label__num">{number || "01"}</span>
        <div className="section-label__line" />
        <span className="section-label__text">{eyebrow}</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="section-h"
      >
        {title}
        {titleLight && <><br /><span>{titleLight}</span></>}
      </motion.h1>
    </div>
  );
}
