import { 
  SiMongodb, 
  SiReact, 
  SiNodedotjs, 
  SiPostgresql, 
  SiExpress, 
  SiPython, 
  SiC, 
  SiJavascript, 
  SiHtml5, 
  SiCss,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";

export const personalInfo = {
  name: "Mallikarjun S Marabasari",
  tagline: "Full-Stack Developer · Fresher · Seeking Internship",
  email: "mallikarjunsmarabasari@gmail.com",
  linkedin: "https://www.linkedin.com/in/mallikarjunsmarabasari",
  github: "https://github.com/mallikarjunmarabasari-cell",
  status: "Fresher, actively looking for internship opportunities",
  bio: "A focused, ambitious CSE engineering student building production-ready applications. Specializing in MERN + PostgreSQL stacks, with a strong interest in AI-powered tools and modern user experiences."
};

export const education = [
  {
    institution: "BGMIT",
    degree: "B.E. Computer Science & Engineering",
    location: "Mudhol, Bagalkot, Karnataka",
    year: "2023–Present",
    details: "3rd Year, Current"
  },
  {
    institution: "BIPS PU Science College",
    degree: "Pre-University Education",
    location: "Vidyagiri, Bagalkot",
    year: "2023",
    details: "82%"
  },
  {
    institution: "Adarsha Vidyalaya (RMSA)",
    degree: "High School",
    location: "Navanagar, Bagalkot",
    year: "2020",
    details: "84%"
  }
];

export const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB", level: "Advanced" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: "Advanced" },
  { name: "Express.js", icon: SiExpress, color: "#888888", level: "Advanced", darkColor: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: "Advanced" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: "Advanced" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: "Intermediate" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: "Lower-Intermediate" },
  { name: "Python", icon: SiPython, color: "#3776AB", level: "Lower-Intermediate" },
  { name: "C", icon: SiC, color: "#A8B9CC", level: "Intermediate" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: "Advanced" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: "Advanced" },
  { name: "CSS3", icon: SiCss, color: "#1572B6", level: "Advanced" },
];

export const projects = [
  {
    id: "educompass",
    title: "EduCompass",
    description: "A comprehensive, modern web application designed to help students master their learning by combining resource organization, enforced MCQ assignments, AI-powered summaries, intelligent analytics, and PDF processing with AI content generation.",
    tech: ["PostgreSQL", "Express", "React", "Node.js", "AI", "Tailwind"],
    link: "https://edu-compass-sigma.vercel.app/",
    github: null,
    year: "2025",
    image: "/educompass.png",
    featured: true
  },
  {
    id: "taskflow",
    title: "TaskFlow Pro",
    description: "A real-time collaborative task management tool with drag-and-drop kanban boards, role-based access control, and activity tracking.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    link: "#",
    github: "https://github.com/mallikarjunmarabasari-cell",
    year: "2024",
    image: null,
    featured: true
  },
  {
    id: "weathersense",
    title: "WeatherSense",
    description: "Location-based weather dashboard with interactive maps, 7-day forecasting, and extreme weather alerts using external APIs.",
    tech: ["React", "TypeScript", "Tailwind", "OpenWeather API"],
    link: "#",
    github: "https://github.com/mallikarjunmarabasari-cell",
    year: "2024",
    image: null,
    featured: false
  },
  {
    id: "chat-sync",
    title: "ChatSync",
    description: "End-to-end encrypted messaging application with support for media sharing, group chats, and online status indicators.",
    tech: ["MERN", "Socket.io", "WebRTC", "JWT Auth"],
    link: "#",
    github: "https://github.com/mallikarjunmarabasari-cell",
    year: "2023",
    image: null,
    featured: false
  }
];
