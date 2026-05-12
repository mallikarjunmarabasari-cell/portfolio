import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/ProjectCard";
import { ArrowUpRight } from "lucide-react";

const ACCENT = "#18FFB0";

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-8 md:px-20"
      style={{ backgroundColor: "#050805" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="text-muted-foreground text-base max-w-xl leading-relaxed"
          >
            Things I've built, shipped, and learned from — ranging from full AI-powered platforms
            to real-time collaborative tools.
          </motion.p>
        </div>

        {/* EduCompass callout */}
        <motion.a
          href="https://edu-compass-sigma.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          whileHover={{ borderColor: `${ACCENT}50` }}
          className="flex items-center justify-between p-5 rounded-2xl border mb-12 transition-all duration-300 group"
          style={{ borderColor: `${ACCENT}20`, backgroundColor: "#0D1F1A20" }}
          data-testid="link-educompass-callout"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>
              Flagship Project
            </p>
            <p className="font-display font-semibold text-foreground text-lg">
              EduCompass — Live on Vercel
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              edu-compass-sigma.vercel.app
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </div>
        </motion.a>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
