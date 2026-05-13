import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const ACCENT = "#18FFB0";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string | null;
  year: string;
  image: string | null;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

function BrowserMockup({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), {
    stiffness: 200,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), {
    stiffness: 200,
    damping: 28,
  });
  const glowX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), { stiffness: 180, damping: 24 });
  const glowY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), { stiffness: 180, damping: 24 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full flex items-center justify-center py-10 px-6 overflow-hidden"
      style={{
        perspective: "900px",
        background: "radial-gradient(ellipse at 50% 80%, #0D2F3740 0%, transparent 70%)",
      }}
    >
      {/* Ambient glow behind the card */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${ACCENT}18 0%, transparent 60%)`,
        }}
      />

      {/* 3D browser frame */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Browser chrome top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ backgroundColor: "#1a1a2e", borderBottom: "1px solid #2a2a3e" }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
          </div>
          {/* URL bar */}
          <div
            className="flex-1 mx-3 px-3 py-0.5 rounded-md text-xs font-mono text-center"
            style={{ backgroundColor: "#0d0d1a", color: "#888", border: "1px solid #2a2a3e" }}
          >
            edu-compass-sigma.vercel.app
          </div>
          {/* Action icons placeholder */}
          <div className="w-4" />
        </div>

        {/* Screenshot */}
        <div style={{ transform: "translateZ(0)" }}>
          <img
            src={src}
            alt={alt}
            className="w-full block"
            style={{ display: "block" }}
            loading="lazy"
          />
        </div>

        {/* Glass sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)`,
          }}
        />

        {/* Bottom reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(5,8,5,0.6) 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const has3D = !!project.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-testid={`card-project-${project.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#0a0a0a",
        border: "1px solid #1a1a1a",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}25`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
      }}
    >
      {/* 3D image area */}
      {has3D ? (
        <BrowserMockup src={project.image!} alt={project.title} />
      ) : (
        <div
          className="aspect-video flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 40% 50%, ${ACCENT}08 0%, transparent 70%)`,
            backgroundColor: "#0d0d0d",
          }}
        >
          <span
            className="font-display font-bold select-none"
            style={{ fontSize: "4rem", color: `${ACCENT}10`, lineHeight: 1 }}
          >
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 pb-6 pt-2">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-semibold text-foreground text-lg">{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground mt-0.5">{project.year}</span>
            {project.featured && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase"
                style={{ backgroundColor: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
              >
                Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#111", border: "1px solid #222", color: "#666" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-project-${project.id}`}
              className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: ACCENT }}
            >
              <ArrowUpRight size={13} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-github-${project.id}`}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={13} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
