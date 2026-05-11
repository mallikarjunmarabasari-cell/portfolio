import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function SkillsTicker() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const doubled = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-4" data-testid="skills-ticker">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div
        className={`flex gap-6 ${hoveredSkill ? "" : "animate-ticker"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          const isHovered = hoveredSkill === `${skill.name}-${i}`;
          return (
            <div
              key={`${skill.name}-${i}`}
              className="relative flex-shrink-0"
              onMouseEnter={() => setHoveredSkill(`${skill.name}-${i}`)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex flex-col items-center gap-2 cursor-default select-none"
                data-testid={`skill-${skill.name}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-border bg-card/60 backdrop-blur-sm transition-all duration-200"
                  style={{
                    boxShadow: isHovered
                      ? `0 0 20px ${skill.color}40, 0 4px 12px rgba(0,0,0,0.2)`
                      : undefined,
                    borderColor: isHovered ? `${skill.color}60` : undefined,
                  }}
                >
                  <Icon
                    size={24}
                    color={skill.name === "Express.js" ? undefined : skill.color}
                    className={skill.name === "Express.js" ? "text-foreground" : ""}
                  />
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                    >
                      <div
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap text-white shadow-lg"
                        style={{ backgroundColor: skill.color === "#000000" ? "#1a1a1a" : skill.color }}
                      >
                        {skill.name}
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                          style={{ borderTopColor: skill.color === "#000000" ? "#1a1a1a" : skill.color }}
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
