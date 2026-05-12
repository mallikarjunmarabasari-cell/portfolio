import { useRef, useEffect, useCallback, ElementType } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

const ACCENT = "#18FFB0";

const CONTAINER_W = 82;
const BADGE_W = 70;
const BADGE_OFFSET_L = (CONTAINER_W - BADGE_W) / 2; // 6px
const ANCHOR_X = CONTAINER_W / 2;                   // 41px
const ANCHOR_Y = 18;                                 // rope start (mid-bar)
const BADGE_TOP_Y = 108;                             // rope end / badge top
const CLIP_H = 20;                                   // clip + hole height above card

type Skill = { name: string; icon: ElementType; color: string; level: string };

function SingleLanyard({ skill, delay }: { skill: Skill; delay: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const xVal = useMotionValue(0);
  const isDragging = useRef(false);
  const startClientX = useRef(0);

  const updateRope = useCallback((x: number) => {
    if (!pathRef.current) return;
    const endX = ANCHOR_X + x;
    const endY = BADGE_TOP_Y;
    const cpX = ANCHOR_X + x * 0.35;
    const cpY = ANCHOR_Y + (endY - ANCHOR_Y) * 0.5;
    pathRef.current.setAttribute(
      "d",
      `M ${ANCHOR_X} ${ANCHOR_Y} Q ${cpX} ${cpY} ${endX} ${endY}`
    );
  }, []);

  useEffect(() => {
    updateRope(0);
    return xVal.on("change", updateRope);
  }, [xVal, updateRope]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      e.stopPropagation();
      isDragging.current = true;
      startClientX.current = e.clientX - xVal.get();
    },
    [xVal]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const raw = e.clientX - startClientX.current;
      xVal.set(Math.max(-130, Math.min(130, raw)));
    },
    [xVal]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    animate(xVal, 0, { type: "spring", stiffness: 260, damping: 24, mass: 1 });
  }, [xVal]);

  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative shrink-0"
      style={{ width: CONTAINER_W, height: 200, overflow: "visible" }}
    >
      {/* Rope SVG */}
      <svg
        aria-hidden
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: CONTAINER_W, height: 200, overflow: "visible" }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#2c2c2c"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>

      {/* Badge */}
      <div
        className="absolute"
        style={{ left: BADGE_OFFSET_L, top: BADGE_TOP_Y }}
      >
        <motion.div
          style={{ x: xVal }}
          className="cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          whileTap={{ scale: 1.06 }}
        >
          {/* Clip bow */}
          <div className="flex justify-center">
            <div
              style={{
                width: 18,
                height: 10,
                borderRadius: "10px 10px 0 0",
                border: "1.5px solid #2e2e2e",
                borderBottom: "none",
                backgroundColor: "#161616",
              }}
            />
          </div>
          {/* Hole */}
          <div className="flex justify-center -mt-px">
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: `1px solid ${ACCENT}30`,
                backgroundColor: "#050805",
              }}
            />
          </div>

          {/* Card */}
          <div
            className="rounded-xl flex flex-col items-center gap-2 pt-3 pb-2.5 px-2 mt-0.5"
            style={{
              width: BADGE_W,
              backgroundColor: "#0d0d0d",
              border: `1px solid ${ACCENT}15`,
              boxShadow: `0 8px 32px #00000070, 0 0 0 1px #ffffff05`,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #242424" }}
            >
              <Icon size={22} color={skill.color} />
            </div>
            <span
              className="text-center font-medium leading-tight"
              style={{ fontSize: "8px", color: "#888", maxWidth: 62, wordBreak: "break-word" }}
            >
              {skill.name}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsLanyard({ skills }: { skills: Skill[] }) {
  return (
    <div className="relative w-full">
      {/* Horizontal mounting bar */}
      <div
        className="absolute left-0 right-0 top-0 z-10"
        style={{ height: "10px", backgroundColor: "#181818", boxShadow: "0 2px 12px #00000080" }}
      />
      {/* Screws on the bar */}
      {[10, 30, 50, 70, 90].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 z-20 flex items-center justify-center"
          style={{
            left: `${pct}%`,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#222",
            border: "1px solid #2e2e2e",
          }}
        />
      ))}

      {/* Lanyard row */}
      <div
        className="flex flex-wrap justify-center gap-x-3 gap-y-6 pt-2 pb-8 px-4"
        style={{ paddingTop: "2px" }}
      >
        {skills.map((skill, i) => (
          <SingleLanyard key={skill.name} skill={skill} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}
