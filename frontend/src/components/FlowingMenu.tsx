import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ACCENT = "#18FFB0";

interface MenuItem {
  num: string;
  label: string;
  link: string;
  sub: string;
}

const MENU_ITEMS: MenuItem[] = [
  { num: "01", label: "Portfolio",  link: "/home",      sub: "Full-Stack Developer"  },
  { num: "02", label: "Projects",   link: "/projects",  sub: "What I've Built"       },
  { num: "03", label: "Education",  link: "/education", sub: "Academic Journey"       },
  { num: "04", label: "Contact",    link: "/contact",   sub: "Let's Connect"         },
];

function FlowingItem({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const repeatText = `${item.label.toUpperCase()} · `;
  const marqueeContent = repeatText.repeat(10);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.11, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden cursor-pointer"
      style={{ flex: 1, borderBottom: "1px solid #141414" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={item.link}>
        <div
          className="h-full flex items-center justify-between px-8 md:px-16 transition-colors duration-400"
          style={{ backgroundColor: hovered ? "#070d07" : "transparent" }}
        >
          {/* Left: number + label */}
          <div className="flex items-center gap-6 md:gap-10">
            <span
              className="font-mono text-xs hidden md:block tabular-nums"
              style={{ color: "#2a2a2a" }}
            >
              {item.num}
            </span>
            <h2
              className="font-display font-bold leading-none select-none"
              style={{
                fontSize: "clamp(2rem, 6.5vw, 6.5rem)",
                color: hovered ? ACCENT : "#e8e8e8",
                transition: "color 0.28s ease",
                letterSpacing: "-0.02em",
              }}
            >
              {item.label}
            </h2>
          </div>

          {/* Right: sub + arrow */}
          <div className="flex items-center gap-5 shrink-0">
            <span
              className="hidden md:block text-[11px] tracking-[0.2em] uppercase"
              style={{ color: hovered ? "#888" : "#333", transition: "color 0.28s" }}
            >
              {item.sub}
            </span>
            <motion.div
              animate={hovered ? { x: 5, y: -5 } : { x: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ color: hovered ? ACCENT : "#2e2e2e" }}
            >
              <ArrowUpRight size={26} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>

        {/* Flowing marquee strip — slides up on hover */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? 38 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden flex items-center"
          style={{ backgroundColor: ACCENT, pointerEvents: "none" }}
        >
          <motion.div
            className="flex shrink-0 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="font-display font-black text-sm tracking-[0.15em] uppercase"
              style={{ color: "#050805" }}
            >
              {marqueeContent}
            </span>
            <span
              className="font-display font-black text-sm tracking-[0.15em] uppercase"
              style={{ color: "#050805" }}
            >
              {marqueeContent}
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function FlowingMenu() {
  return (
    <div className="flex flex-col h-full">
      {MENU_ITEMS.map((item, i) => (
        <FlowingItem key={item.link} item={item} index={i} />
      ))}
    </div>
  );
}
