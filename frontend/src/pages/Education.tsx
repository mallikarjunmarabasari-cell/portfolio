import { motion } from "framer-motion";
import { education } from "@/data/portfolio";
import { MapPin, Calendar, Award } from "lucide-react";

const ACCENT = "#18FFB0";

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-8 md:px-20"
      style={{ backgroundColor: "#050805" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            Background
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Education
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            A timeline of where the foundation was built — and where it's still being built.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="absolute left-[1.1rem] top-4 bottom-4 w-px origin-top"
            style={{ backgroundColor: `${ACCENT}15` }}
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex gap-8 pb-14 last:pb-0"
            >
              {/* Dot */}
              <div className="shrink-0 pt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 + i * 0.12 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center z-10 relative"
                  style={{
                    backgroundColor: i === 0 ? `${ACCENT}15` : "#111",
                    border: `1px solid ${i === 0 ? ACCENT : "#1e1e1e"}`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: i === 0 ? ACCENT : "#333" }}
                  />
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex-1 rounded-2xl p-6 border transition-all duration-300"
                style={{
                  borderColor: i === 0 ? `${ACCENT}20` : "#1a1a1a",
                  backgroundColor: i === 0 ? `${ACCENT}05` : "#0a0a0a",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {edu.institution}
                  </h3>
                  {i === 0 && (
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 tracking-wider uppercase"
                      style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-4">{edu.degree}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={11} />
                    {edu.year}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={11} />
                    {edu.location}
                  </div>
                  {edu.details && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Award size={11} />
                      {edu.details}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
