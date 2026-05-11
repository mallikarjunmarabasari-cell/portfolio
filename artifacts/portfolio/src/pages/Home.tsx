import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDown, ExternalLink, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { personalInfo, skills, projects } from "@/data/portfolio";
import SkillsTicker from "@/components/SkillsTicker";
import ProjectCard from "@/components/ProjectCard";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background radial tint */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          {/* Animated avatar */}
          <motion.div
            variants={fadeUp}
            className="relative mb-8"
          >
            <div className="relative w-28 h-28">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(239 84% 67%), hsl(188 86% 53%), hsl(239 84% 67%))",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary font-display">M</span>
              </div>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
              />
              Actively seeking internship opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-foreground mb-4 leading-[1.1]"
          >
            {personalInfo.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground mb-8 font-medium tracking-wide"
          >
            Full-Stack Developer &nbsp;·&nbsp; CSE Student &nbsp;·&nbsp; MERN + PostgreSQL
          </motion.p>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              data-testid="link-email-hero"
              className="w-10 h-10 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
            >
              <Mail size={17} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-testid="link-linkedin-hero"
              className="w-10 h-10 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
            >
              <ExternalLink size={17} />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-testid="link-github-hero"
              className="w-10 h-10 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
            >
              <Github size={17} />
            </a>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-view-projects"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
              >
                View Projects
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-contact"
                className="px-6 py-2.5 rounded-xl border border-border bg-card hover:border-primary/40 text-foreground font-semibold text-sm transition-all duration-200"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">About</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display mb-6 text-foreground">
            Building with intent, shipping with pride.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-4">
            {personalInfo.bio}
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
            Currently in my 3rd year of B.E. CSE at BGMIT, Mudhol — I spend my evenings turning ideas into
            interfaces. My standout project, <span className="text-foreground font-medium">EduCompass</span>, integrates
            AI-powered summaries, enforced MCQ assignments, and PDF processing into a full PERN-stack application
            deployed on Vercel.
          </p>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="py-16 overflow-hidden">
        <div className="px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Skills</span>
          </motion.div>
        </div>
        <SkillsTicker />
        <div className="px-6 max-w-5xl mx-auto mt-6">
          <p className="text-xs text-muted-foreground text-center">Hover to see the stack</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Featured Projects</span>
          </div>
          <Link href="/projects">
            <button
              data-testid="link-all-projects"
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              All Projects <ExternalLink size={11} />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <span className="text-foreground font-medium">Mallikarjun S Marabasari</span>
          {" "}· React + Vite · Framer Motion
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          <a href={`mailto:${personalInfo.email}`} className="hover:text-muted-foreground transition-colors">
            {personalInfo.email}
          </a>
        </p>
      </footer>
    </motion.div>
  );
}
