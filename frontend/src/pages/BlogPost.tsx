import { motion } from "framer-motion";
import { Calendar, ChevronLeft, Tag } from "lucide-react";
import { useRoute, Link } from "wouter";
import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getBlogPostBySlug } from "@/lib/blog";

const ACCENT = "#18FFB0";
const syntaxTheme: Record<string, CSSProperties> = dracula as unknown as Record<string, CSSProperties>;
const CodeHighlighter: any = SyntaxHighlighter;
const MarkdownRenderer: any = ReactMarkdown;

const markdownComponents: any = {
  code: (({ className, children }: any) => {
    const match = /language-(\w+)/.exec(className ?? "");

    if (match) {
      return (
        <CodeHighlighter
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: "1rem",
            padding: "1.25rem",
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            overflowX: "auto",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </CodeHighlighter>
      );
    }

    return <code className="rounded-md px-1.5 py-0.5 bg-white/5 text-[#8ef8d0]">{children}</code>;
  }) as any,
};

export default function BlogPost() {
  const [match, params] = useRoute("/notes/:slug");
  const slug = params?.slug;

  if (!match || !slug) {
    return null;
  }

  const post = getBlogPostBySlug(slug);
  const tags: string[] = ((post as any).tags ?? []) as string[];

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen pt-28 pb-24 px-8 md:px-20"
        style={{ backgroundColor: "#050805" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-4">Post not found.</p>
          <Link href="/notes" className="text-sm font-medium" style={{ color: ACCENT }}>
            Back to notes
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-8 md:px-20"
      style={{ backgroundColor: "#050805" }}
    >
      <div className="max-w-3xl mx-auto">
        <Link href="/notes">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ChevronLeft size={16} />
            Back to notes
          </span>
        </Link>

        <header className="mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: ACCENT }}>
            Note
          </p>
          <h1 className="font-display font-bold text-foreground mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {post.description}
          </p>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-display prose-a:text-[#18FFB0] prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-p:leading-8 prose-li:leading-8 prose-pre:bg-transparent prose-pre:p-0">
          <MarkdownRenderer remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </MarkdownRenderer>
        </div>
      </div>
    </motion.article>
  );
}