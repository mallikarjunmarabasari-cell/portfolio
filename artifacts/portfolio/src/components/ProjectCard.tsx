import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className = "w-full h-full flex items-center justify-center";
                placeholder.innerHTML = `<span class="text-3xl font-bold text-muted-foreground/30">${project.title.charAt(0)}</span>`;
                parent.appendChild(placeholder);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-lg">{project.title.charAt(0)}</span>
              </div>
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{project.year}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border bg-muted/50 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-project-${project.id}`}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink size={13} />
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
