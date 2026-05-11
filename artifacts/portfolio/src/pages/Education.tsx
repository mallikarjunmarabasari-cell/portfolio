import { motion } from "framer-motion";
import { education } from "@/data/portfolio";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-20 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">Background</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4"
        >
          Education
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-muted-foreground text-base"
        >
          A timeline of where the foundation was built — and where it's still being built.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="absolute left-5 top-0 bottom-0 w-px bg-border origin-top"
        />

        <div className="flex flex-col gap-10 relative">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex gap-8"
            >
              {/* Dot */}
              <div className="relative flex-shrink-0 flex items-start pt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12, type: "spring" }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 z-10 ${
                    i === 0
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <GraduationCap size={17} />
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex-1 rounded-2xl border p-5 mb-2 ${
                  i === 0
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-foreground text-base leading-tight">
                    {edu.institution}
                  </h3>
                  {i === 0 && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary shrink-0">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-muted-foreground mb-3">{edu.degree}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={11} className="shrink-0" />
                    {edu.year}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={11} className="shrink-0" />
                    {edu.location}
                  </div>
                  {edu.details && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Award size={11} className="shrink-0" />
                      {edu.details}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 p-6 rounded-2xl border border-border bg-card text-center"
      >
        <p className="text-muted-foreground text-sm italic leading-relaxed">
          "The best way to predict the future is to build it."
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">— Alan Kay</p>
      </motion.div>
    </motion.div>
  );
}
