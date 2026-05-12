import { motion } from "framer-motion";

const words = [
  "MERN Stack",
  "★",
  "React",
  "★",
  "Node.js",
  "★",
  "PostgreSQL",
  "★",
  "Full-Stack Dev",
  "★",
  "AI Integration",
  "★",
  "TypeScript",
  "★",
  "REST APIs",
  "★",
  "Open to Internships",
  "★",
  "MERN Stack",
  "★",
  "React",
  "★",
  "Node.js",
  "★",
  "PostgreSQL",
  "★",
  "Full-Stack Dev",
  "★",
  "AI Integration",
  "★",
  "TypeScript",
  "★",
  "REST APIs",
  "★",
  "Open to Internships",
  "★",
];

export default function BrandStrip() {
  return (
    <div
      className="w-full overflow-hidden py-4 select-none"
      style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="text-sm font-semibold tracking-widest uppercase"
            style={{
              color: word === "★" ? "#18FFB0" : "#050805",
              fontSize: word === "★" ? "10px" : "13px",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
