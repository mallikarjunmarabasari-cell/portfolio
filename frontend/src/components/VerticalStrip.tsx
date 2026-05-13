import { useScroll, useTransform, motion } from "framer-motion";

const items = [
  "CREATIVE THINKER",
  "·",
  "PROBLEM SOLVER",
  "·",
  "FAST LEARNER",
  "·",
  "DETAIL ORIENTED",
  "·",
  "TEAM PLAYER",
  "·",
  "AVAILABLE FOR WORK",
  "·",
  "PASSIONATE ABOUT CODE",
  "·",
  "BUILDING REAL IMPACT",
  "·",
  "OPEN TO OPPORTUNITIES",
  "·",
  "CREATIVE THINKER",
  "·",
  "PROBLEM SOLVER",
  "·",
  "FAST LEARNER",
  "·",
  "DETAIL ORIENTED",
  "·",
  "TEAM PLAYER",
  "·",
  "AVAILABLE FOR WORK",
  "·",
  "PASSIONATE ABOUT CODE",
  "·",
  "BUILDING REAL IMPACT",
  "·",
  "OPEN TO OPPORTUNITIES",
  "·",
];

export default function VerticalStrip() {
  const { scrollYProgress } = useScroll();

  // As user scrolls from 0→1, strip moves up by ~260px
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-260px"]);

  return (
    <div
      className="hidden lg:flex fixed right-0 top-0 bottom-0 z-40 flex-col items-center overflow-hidden"
      style={{
        width: "36px",
        backgroundColor: "#ffffff",
        borderLeft: "1px solid #e0e0e0",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{ y, width: "36px" }}
        className="flex flex-col items-center gap-6 pt-6 pb-10"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-semibold select-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: item === "·" ? "11px" : "8.5px",
              letterSpacing: item === "·" ? "0" : "0.2em",
              color: item === "·" ? "#18FFB0" : "#050805",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
