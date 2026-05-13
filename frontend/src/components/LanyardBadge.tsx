import { useRef, useEffect, useCallback, ElementType } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

const ACCENT = "#18FFB0";
const ROPE_W = 3;
const ANCHOR_Y = 36;    // rope start (top bar center)
const BADGE_TOP_Y = 230; // where badge top sits in container

type Skill = { name: string; icon: ElementType; color: string; level: string };

interface Props {
  skills: Skill[];
  name: string;
  role: string;
}

export default function LanyardBadge({ skills, name, role }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const xVal = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartClientX = useRef(0);

  const updateRope = useCallback((x: number) => {
    if (!pathRef.current || !containerRef.current) return;
    const W = containerRef.current.offsetWidth;
    const anchorX = W / 2;
    // bezier control point: lerp toward badge
    const cpX = anchorX + x * 0.38;
    const cpY = ANCHOR_Y + (BADGE_TOP_Y - ANCHOR_Y) * 0.48;
    const badgeX = anchorX + x;
    pathRef.current.setAttribute(
      "d",
      `M ${anchorX} ${ANCHOR_Y} Q ${cpX} ${cpY} ${badgeX} ${BADGE_TOP_Y}`
    );
  }, []);

  useEffect(() => {
    // draw on mount
    updateRope(0);
    return xVal.on("change", updateRope);
  }, [xVal, updateRope]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      dragStartClientX.current = e.clientX - xVal.get();
    },
    [xVal]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const raw = e.clientX - dragStartClientX.current;
      xVal.set(Math.max(-210, Math.min(210, raw)));
    },
    [xVal]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    animate(xVal, 0, { type: "spring", stiffness: 240, damping: 22, mass: 1.3 });
  }, [xVal]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: "540px" }}
    >
      {/* ── Mounting bar ──────────────────────── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-0">
        <div
          className="rounded-full"
          style={{ width: "140px", height: "10px", backgroundColor: "#1c1c1c", boxShadow: "0 2px 12px #00000090" }}
        />
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "28px", width: "4px", height: "8px", backgroundColor: "#151515" }}
      />

      {/* ── Rope ──────────────────────────────── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#252525"
          strokeWidth={ROPE_W}
          strokeLinecap="round"
        />
      </svg>

      {/* ── Badge ─────────────────────────────── */}
      <div
        className="absolute"
        style={{ left: "50%", top: `${BADGE_TOP_Y}px`, marginLeft: "-120px" }}
      >
        <motion.div
          style={{ x: xVal }}
          className="cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          whileTap={{ scale: 1.015 }}
        >
          {/* Clip bow */}
          <div className="flex justify-center">
            <div
              style={{
                width: "28px",
                height: "14px",
                borderRadius: "14px 14px 0 0",
                border: `2px solid #2a2a2a`,
                borderBottom: "none",
                backgroundColor: "#161616",
              }}
            />
          </div>
          {/* Hole */}
          <div className="flex justify-center -mt-px">
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: `1.5px solid ${ACCENT}35`,
                backgroundColor: "#050805",
              }}
            />
          </div>

          {/* ── Card body ─────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden mt-1"
            style={{
              width: "240px",
              backgroundColor: "#0c0c0c",
              border: `1px solid ${ACCENT}18`,
              boxShadow: `0 0 0 1px #ffffff06, 0 24px 64px #00000090, 0 0 40px ${ACCENT}06`,
            }}
          >
            {/* Header */}
            <div
              className="px-5 pt-4 pb-3"
              style={{ background: `linear-gradient(135deg, #111 0%, #0d0d0d 100%)`, borderBottom: `1px solid ${ACCENT}12` }}
            >
              <div
                className="text-[8px] font-bold tracking-[0.25em] uppercase mb-1.5"
                style={{ color: ACCENT }}
              >
                Tech Stack · Skills
              </div>
              <div className="font-display font-bold text-white text-sm leading-snug">{name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#666" }}>{role}</div>
            </div>

            {/* Icons grid */}
            <div className="p-4 grid grid-cols-4 gap-2.5">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#181818", border: "1px solid #222" }}
                      title={`${skill.name} · ${skill.level}`}
                    >
                      <Icon size={20} color={skill.color} />
                    </div>
                    <span
                      className="text-center leading-tight"
                      style={{ fontSize: "7.5px", color: "#555", maxWidth: "36px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className="px-5 py-2.5 flex items-center justify-between"
              style={{ backgroundColor: "#0e0e0e", borderTop: `1px solid ${ACCENT}12` }}
            >
              <span
                className="text-[8.5px] font-semibold tracking-widest uppercase"
                style={{ color: ACCENT }}
              >
                Available for Internship
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
