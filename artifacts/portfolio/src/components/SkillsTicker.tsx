import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";

const ACCENT = "#18FFB0";

export default function SkillsTicker() {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const doubled = [...skills, ...skills];

  return (
    <div
      className="relative w-full overflow-hidden py-6 cursor-default"
      data-testid="skills-ticker"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHoveredIndex(null); }}
    >
      {/* Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #050805, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #050805, transparent)" }} />

      <div
        className={`flex gap-8 ${paused ? "animate-ticker-paused" : "animate-ticker"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={`${skill.name}-${i}`}
              className="relative shrink-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ scale: 1.18, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex flex-col items-center gap-2 select-none"
                data-testid={`skill-${skill.name}`}
              >
                {/* Icon box */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? `${skill.color}15` : "#0f0f0f",
                    border: `1px solid ${isHovered ? skill.color + "40" : "#1e1e1e"}`,
                    boxShadow: isHovered ? `0 0 24px ${skill.color}30` : "none",
                  }}
                >
                  <Icon size={26} color={skill.color} />
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.85 }}
                      transition={{ duration: 0.12 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                    >
                      <div
                        className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                        style={{
                          backgroundColor: skill.color,
                          color: "#000",
                        }}
                      >
                        {skill.name}
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                          style={{
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${skill.color}`,
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
