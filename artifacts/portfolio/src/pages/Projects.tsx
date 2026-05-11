import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/ProjectCard";
import { Sparkles } from "lucide-react";

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-20 max-w-5xl mx-auto"
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
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">Work</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-muted-foreground text-base max-w-xl"
        >
          Things I've built, shipped, and learned from — ranging from full AI-powered platforms to real-time tools.
        </motion.p>
      </div>

      {/* Featured callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-10 p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center gap-3"
      >
        <Sparkles size={16} className="text-primary shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">EduCompass</span> is my flagship project — a full PERN-stack AI education platform, live at{" "}
          <a
            href="https://edu-compass-sigma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            edu-compass-sigma.vercel.app
          </a>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
