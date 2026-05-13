import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowingMenu from "@/components/FlowingMenu";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-helix": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}

const ACCENT = "#18FFB0";

function HelixLoader() {
  useEffect(() => {
    import("ldrs").then(({ helix }) => helix.register()).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">
      {/* Name above loader */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div
          className="font-display font-bold tracking-tight mb-1"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", color: "#e8e8e8" }}
        >
          MSM<span style={{ color: ACCENT }}>.</span>
        </div>
        <p
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "#333" }}
        >
          CSE Student · Full-Stack Developer
        </p>
      </motion.div>

      {/* DNA Helix */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        {/* @ts-expect-error - ldrs custom element */}
        <l-helix size="72" speed="2.6" color={ACCENT} />
      </motion.div>

    </div>
  );
}

export default function Splash() {
  const [phase, setPhase] = useState<"loading" | "menu">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("menu"), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: "#050805", zIndex: 100 }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 md:px-14 py-5 shrink-0"
        style={{ borderBottom: "1px solid #111" }}
      >
        <span
          className="font-display font-bold text-base tracking-tight"
          style={{ color: "#e8e8e8" }}
        >
          MSM<span style={{ color: ACCENT }}>.</span>
        </span>
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#2e2e2e" }}
        >
          Portfolio · 2025
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loader"
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
            >
              <HelixLoader />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FlowingMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-8 md:px-14 py-4 shrink-0 text-[10px] tracking-[0.18em] uppercase"
        style={{ borderTop: "1px solid #111", color: "#2a2a2a" }}
      >
        <span>Mallikarjun S Marabasari</span>
        <span className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
          />
          Available for internship
        </span>
      </div>
    </motion.div>
  );
}
