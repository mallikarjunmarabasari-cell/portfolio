import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Home, Briefcase, GraduationCap, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/projects", icon: Briefcase, label: "Projects" },
  { path: "/education", icon: GraduationCap, label: "Education" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

export default function SideDock() {
  const [location] = useLocation();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3"
      aria-label="Desktop navigation"
    >
      <div className="flex flex-col items-center gap-2 bg-card/80 backdrop-blur-xl border border-border rounded-2xl px-2 py-3 shadow-xl">
        {navItems.map((item, i) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Link href={item.path}>
                  <motion.button
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={item.label}
                    className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                </Link>
              </motion.div>

              <AnimatePresence>
                {hoveredPath === item.path && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-14 pointer-events-none"
                  >
                    <div className="bg-popover text-popover-foreground text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border shadow-lg whitespace-nowrap">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="w-6 h-px bg-border my-1" />
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
