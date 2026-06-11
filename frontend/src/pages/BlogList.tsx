import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/lib/blog";

const ACCENT = "#18FFB0";

export default function BlogList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-8 md:px-20"
      style={{ backgroundColor: "#050805" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            Notes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Markdown posts
            <br />
            from the codebase.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="text-muted-foreground text-base max-w-2xl leading-relaxed"
          >
            This section is powered by local `.md` files, so every post ships with the site and stays fast, portable, and easy to update.
          </motion.p>
        </div>

        <div className="grid gap-4">
          {blogPosts.map((post, index) => {
            const tags: string[] = ((post as any).tags ?? []) as string[];

            return (
              <Link key={post.slug} href={`/notes/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="rounded-3xl border p-6 md:p-7 transition-all duration-300 group"
                  style={{ borderColor: index === 0 ? `${ACCENT}20` : "#1a1a1a", backgroundColor: index === 0 ? "#0b120f" : "#0a0a0a" }}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    {tags.length > 0 && (
                      <span className="inline-flex items-center gap-1.5">
                        <Tag size={12} />
                        {tags.join(" · ")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display font-semibold text-foreground text-2xl mb-3 group-hover:text-white">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {post.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: ACCENT, color: "#000" }}>
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}