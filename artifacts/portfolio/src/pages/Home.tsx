import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, projects, skills } from "@/data/portfolio";
import SkillsTicker from "@/components/SkillsTicker";
import ProjectCard from "@/components/ProjectCard";

const ACCENT = "#18FFB0";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: "#050805" }}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left — portrait / atmosphere */}
        <div className="relative md:w-[48%] min-h-[50vh] md:min-h-screen shrink-0 overflow-hidden">
          {/* Dark green radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 40% 60%, #0D2F37 0%, #041718 45%, #000 100%)",
            }}
          />
          {/* Animated avatar placeholder — user replaces with real photo */}
          <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-0 md:items-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${ACCENT}00 0%, ${ACCENT}60 40%, ${ACCENT}00 60%)`,
                }}
              />
              {/* Avatar circle */}
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #1a3a3a 0%, #0a1a1a 60%, #050805 100%)",
                  border: `1px solid ${ACCENT}20`,
                }}
              >
                <span
                  className="font-display font-bold select-none"
                  style={{ fontSize: "5rem", color: `${ACCENT}30`, lineHeight: 1 }}
                >
                  M
                </span>
              </div>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${ACCENT}50` }}
              />
            </div>
          </div>
          {/* Vignette edges */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, transparent 70%, #050805 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #050805 0%, transparent 15%, transparent 80%, #050805 100%)" }} />
        </div>

        {/* Right — content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 pt-28 md:pt-0 pb-20 md:pb-0 relative z-10">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            CSE Student &amp; Full-Stack Developer
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[1.0] text-foreground mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            Building{" "}
            <span className="italic font-medium" style={{ color: `${ACCENT}` }}>
              real-world
            </span>
            <br />
            applications
            <br />
            from scratch.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="text-base text-muted-foreground max-w-sm mb-10 leading-relaxed"
          >
            Fresher actively seeking internship opportunities.
            I design and build MERN + PostgreSQL applications that users love.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary pill CTA */}
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${ACCENT}30` }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-view-work"
                className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  backgroundColor: "#0D1F1A",
                  color: ACCENT,
                  border: `1px solid ${ACCENT}30`,
                }}
              >
                View my work
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: ACCENT, color: "#000" }}
                >
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </motion.button>
            </Link>

            {/* Ghost CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ color: ACCENT }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-contact"
                className="text-sm font-medium text-muted-foreground transition-colors"
              >
                Get in touch →
              </motion.button>
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 mt-12"
          >
            {[
              { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
              { href: personalInfo.github, icon: Github, label: "GitHub" },
              { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                data-testid={`link-${label.toLowerCase()}-hero`}
                className="text-muted-foreground transition-colors"
                style={{ ["--hover-color" as string]: ACCENT }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "")}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="px-8 md:px-20 py-28 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
          style={{ color: ACCENT }}
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-foreground leading-[1.1] mb-8"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          A 3rd-year CSE student who doesn't
          <br />
          wait to graduate to build{" "}
          <span style={{ color: ACCENT }}>real things.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground leading-relaxed text-base max-w-2xl"
        >
          {personalInfo.bio} My standout project,{" "}
          <a
            href="https://edu-compass-sigma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: ACCENT }}
            className="underline underline-offset-4 decoration-dotted"
          >
            EduCompass
          </a>
          , is a full PERN-stack AI education platform — combining resource organization, enforced MCQ
          assignments, AI-powered summaries, and PDF processing with AI content generation.
        </motion.p>
      </section>

      {/* ── SKILLS TICKER ───────────────────────────────────── */}
      <section className="py-12 overflow-hidden border-y" style={{ borderColor: "#18FFB015" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-center mb-8"
          style={{ color: ACCENT }}
        >
          Tech Stack — hover to inspect
        </motion.p>
        <SkillsTicker />
      </section>

      {/* ── FEATURED PROJECTS ───────────────────────────────── */}
      <section className="px-8 md:px-20 py-28 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-foreground"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
            >
              Featured Projects
            </motion.h2>
          </div>
          <Link href="/projects">
            <motion.button
              whileHover={{ color: ACCENT }}
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground font-medium transition-colors"
            >
              All projects <ArrowUpRight size={14} />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <Link href="/projects">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: `0 0 24px ${ACCENT}20` }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-all-projects"
            className="md:hidden mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all"
            style={{ backgroundColor: "#0D1F1A", color: ACCENT, border: `1px solid ${ACCENT}30` }}
          >
            All projects <ArrowUpRight size={14} />
          </motion.button>
        </Link>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
        style={{ borderColor: "#18FFB015" }}
      >
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mallikarjun S Marabasari · Built with React + Vite
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-xs transition-colors"
          style={{ color: ACCENT }}
        >
          {personalInfo.email}
        </a>
      </footer>
    </motion.div>
  );
}
