import { motion } from "framer-motion";
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

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      data-testid={`card-project-${project.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#0a0a0a",
        border: "1px solid #1a1a1a",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px #000a`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "#0d0d0d" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        {/* Placeholder / overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 40% 50%, ${ACCENT}08 0%, transparent 70%)`,
            opacity: project.image ? 0 : 1,
          }}
        >
          <span
            className="font-display font-bold select-none"
            style={{ fontSize: "4rem", color: `${ACCENT}10`, lineHeight: 1 }}
          >
            {project.title.charAt(0)}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
              style={{ backgroundColor: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-semibold text-foreground text-base">{project.title}</h3>
          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{project.year}</span>
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
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: ACCENT }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
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
