import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ACCENT = "#18FFB0";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/education", label: "Education" },
  { path: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative min-h-screen flex flex-col justify-between px-8 md:px-20 pt-20 pb-10"
      style={{ backgroundColor: "#020402" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)` }} />

      {/* Main footer content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Big CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            Let's connect
          </p>
          <h2
            className="font-display font-bold text-white leading-[1.0] mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            Have an opportunity
            <br />
            or a project in{" "}
            <span className="italic font-medium" style={{ color: ACCENT }}>
              mind?
            </span>
          </h2>
          <a
            href={`mailto:${personalInfo.email}`}
            data-testid="link-email-footer"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: `0 0 32px ${ACCENT}30` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                backgroundColor: "#0D1F1A",
                color: ACCENT,
                border: `1px solid ${ACCENT}30`,
              }}
            >
              {personalInfo.email}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: ACCENT, color: "#000" }}
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </motion.button>
          </a>
        </motion.div>

        {/* Nav + socials row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-20"
        >
          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Github size={13} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Linkedin size={13} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={13} /> Email
                </a>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Status
            </p>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-sm text-white/60">Available for internship</span>
            </div>
            <p className="text-xs text-white/30 mt-3 leading-relaxed">
              3rd year CSE student at BGMIT, Mudhol, Karnataka.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t"
        style={{ borderColor: "#ffffff0a" }}
      >
        <p className="text-xs" style={{ color: "#ffffff20" }}>
          © {year} Mallikarjun S Marabasari
        </p>
      </div>
    </footer>
  );
}
