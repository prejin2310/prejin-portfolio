import { motion } from "framer-motion";

export default function Timeline({ items }) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div
        className="absolute left-0 top-2 bottom-2 w-px"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />

      <div className="space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[1.6rem] top-1.5 w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: "rgba(8,8,8,1)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {item.current && (
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
              )}
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {item.role}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {item.company}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs shrink-0"
                  style={{
                    background: item.current ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.04)",
                    border: item.current ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(255,255,255,0.08)",
                    color: item.current ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {item.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  {item.period}
                </span>
              </div>

              <ul className="space-y-2">
                {item.responsibilities.map((resp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex gap-3 text-sm"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
                    {resp}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
