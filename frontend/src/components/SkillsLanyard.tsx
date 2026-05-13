import { useRef, useEffect, useCallback, ElementType, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

const ACCENT = "#18FFB0";

const CONTAINER_W = 86;
const GAP = 12;
const BADGE_W = 72;
const BADGE_OFFSET_L = (CONTAINER_W - BADGE_W) / 2;
const ANCHOR_X = CONTAINER_W / 2;
const ANCHOR_Y = 16;
const BADGE_TOP_Y = 110;

type Skill = { name: string; icon: ElementType; color: string; level: string };

function SingleLanyard({ skill }: { skill: Skill }) {
  const pathRef = useRef<SVGPathElement>(null);
  const xVal = useMotionValue(0);
  const isDragging = useRef(false);
  const startClientX = useRef(0);

  const updateRope = useCallback((x: number) => {
    if (!pathRef.current) return;
    const endX = ANCHOR_X + x;
    const cpX = ANCHOR_X + x * 0.38;
    const cpY = ANCHOR_Y + (BADGE_TOP_Y - ANCHOR_Y) * 0.5;
    pathRef.current.setAttribute(
      "d",
      `M ${ANCHOR_X} ${ANCHOR_Y} Q ${cpX} ${cpY} ${endX} ${BADGE_TOP_Y}`
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
      xVal.set(Math.max(-120, Math.min(120, raw)));
    },
    [xVal]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    animate(xVal, 0, { type: "spring", stiffness: 260, damping: 24, mass: 1 });
  }, [xVal]);

  const Icon = skill.icon;
  const zVal = useTransform(xVal, [-120, 0, 120], [-12, 0, -12]);

  return (
    <div
      className="relative shrink-0"
      style={{ width: CONTAINER_W, height: 195, overflow: "visible", perspective: 700 }}
    >
      {/* Rope */}
      <svg
        aria-hidden
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: CONTAINER_W, height: 195, overflow: "visible" }}
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
      <div className="absolute" style={{ left: BADGE_OFFSET_L, top: BADGE_TOP_Y }}>
        <motion.div
          style={{ x: xVal, z: zVal, transformStyle: "preserve-3d" }}
          className="cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          whileTap={{ scale: 1.07 }}
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
    </div>
  );
}

export default function SkillsLanyard({ skills }: { skills: Skill[] }) {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];
  // Each unit width = CONTAINER_W + GAP
  const unitW = CONTAINER_W + GAP;
  // Total width of one full set
  const totalW = skills.length * unitW;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mounting bar */}
      <div
        className="absolute left-0 right-0 top-4 z-10 pointer-events-none"
        style={{ height: "8px", backgroundColor: "#181818", boxShadow: "0 2px 10px #00000070" }}
      />

      {/* Scrolling row */}
      <motion.div
        className="flex pt-2 pb-6"
        style={{ gap: GAP, width: "max-content" }}
        animate={{ x: paused ? undefined : [0, -totalW] }}
        transition={
          paused
            ? {}
            : {
                x: {
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }
        }
      >
        {doubled.map((skill, i) => (
          <SingleLanyard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
}
