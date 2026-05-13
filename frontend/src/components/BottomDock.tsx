import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Home, Briefcase, GraduationCap, Mail } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/projects", icon: Briefcase, label: "Projects" },
  { path: "/education", icon: GraduationCap, label: "Education" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

export default function BottomDock() {
  const [location] = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around bg-card/90 backdrop-blur-xl border-t border-border px-4 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <motion.button
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                whileTap={{ scale: 0.88 }}
                aria-label={item.label}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-active"
                    className="absolute -bottom-0 w-8 h-0.5 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
