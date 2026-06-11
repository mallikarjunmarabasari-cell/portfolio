import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/projects",  label: "Projects"  },
  { path: "/education", label: "Education" },
  { path: "/notes",     label: "Notes"     },
  { path: "/contact",   label: "Contact"   },
];

export default function TopNav() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo → back to splash */}
          <Link href="/">
            <motion.span
              whileHover={{ opacity: 0.7 }}
              className="font-display font-bold text-lg text-foreground tracking-tight cursor-pointer"
              data-testid="nav-logo"
            >
              Mallikarjun
              <span style={{ color: "#18FFB0" }}>.</span>
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#18FFB0" }}
              />
              <span className="text-xs font-medium text-foreground whitespace-nowrap">Available for work</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-testid="nav-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 pt-20 px-6 bg-black/95 backdrop-blur-xl md:hidden flex flex-col gap-2"
        >
          <Link href="/home" onClick={() => setMobileOpen(false)}>
            <div className="py-4 text-2xl font-semibold font-display border-b border-white/5">Home</div>
          </Link>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setMobileOpen(false)}>
              <div className="py-4 text-2xl font-semibold font-display border-b border-white/5">{link.label}</div>
            </Link>
          ))}
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#18FFB0" }} />
            <span className="text-sm text-muted-foreground">Available for internship</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
