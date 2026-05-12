import { motion } from "framer-motion";

const items = [
  "MERN STACK",
  "·",
  "REACT",
  "·",
  "NODE.JS",
  "·",
  "POSTGRESQL",
  "·",
  "OPEN TO INTERNSHIPS",
  "·",
  "FULL-STACK DEV",
  "·",
  "AI INTEGRATION",
  "·",
  "TYPESCRIPT",
  "·",
  "REST APIs",
  "·",
  "MERN STACK",
  "·",
  "REACT",
  "·",
  "NODE.JS",
  "·",
  "POSTGRESQL",
  "·",
  "OPEN TO INTERNSHIPS",
  "·",
  "FULL-STACK DEV",
  "·",
  "AI INTEGRATION",
  "·",
  "TYPESCRIPT",
  "·",
  "REST APIs",
  "·",
];

export default function VerticalStrip() {
  return (
    <div
      className="hidden lg:flex fixed right-0 top-0 bottom-0 z-40 flex-col items-center overflow-hidden"
      style={{
        width: "36px",
        backgroundColor: "#ffffff",
        borderLeft: "1px solid #e5e5e5",
      }}
      aria-hidden="true"
    >
      {/* Scroll upward — two copies for seamless loop */}
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex flex-col items-center gap-5 py-5"
        style={{ width: "36px" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-semibold select-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: item === "·" ? "10px" : "9px",
              letterSpacing: item === "·" ? "0" : "0.18em",
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
