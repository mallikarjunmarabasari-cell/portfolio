import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Linkedin, ArrowUpRight, Send, AlertCircle } from "lucide-react";

const ACCENT = "#18FFB0";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Failed to send message.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-8 md:px-20"
      style={{ backgroundColor: "#050805" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: ACCENT }}
          >
            Say Hello
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-foreground mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Let's{" "}
            <span className="italic font-medium" style={{ color: ACCENT }}>
              talk.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            I'm actively seeking internship opportunities. Whether you have a role, a project,
            or just want to say hi — reach out below.
          </motion.p>
        </div>

        {/* Quick contact links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
        >
          {[
            {
              href: `mailto:${personalInfo.email}`,
              icon: Mail,
              label: "Email",
              value: personalInfo.email,
              target: undefined,
            },
            {
              href: personalInfo.linkedin,
              icon: Linkedin,
              label: "LinkedIn",
              value: "mallikarjunsmarabasari",
              target: "_blank",
            },
          ].map(({ href, icon: Icon, label, value, target }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target ? "noopener noreferrer" : undefined}
              data-testid={`link-${label.toLowerCase()}-contact`}
              className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300"
              style={{ borderColor: "#1a1a1a", backgroundColor: "#0a0a0a" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${ACCENT}30`;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${ACCENT}05`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0a0a0a";
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${ACCENT}10`, color: ACCENT }}
                >
                  <Icon size={16} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">{label}</div>
                  <div className="text-xs font-medium text-foreground truncate">{value}</div>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground transition-colors group-hover:text-foreground shrink-0" />
            </a>
          ))}
        </motion.div>

        {/* Backend notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="flex items-start gap-3 p-4 rounded-2xl border mb-8"
          style={{ borderColor: "#18FFB020", backgroundColor: "#18FFB020" }}
        >
          <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Contact form is now wired</span> — submissions
            go through the backend and can be delivered by email.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
              >
                <Send size={22} style={{ color: ACCENT }} />
              </motion.div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">Message received!</h2>
              <p className="text-sm text-muted-foreground">
                (Mocked — please use email or LinkedIn for real contact.)
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs underline underline-offset-4 transition-colors"
                style={{ color: ACCENT }}
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "name", type: "text", label: "Name", placeholder: "Your name", half: true },
                { id: "email", type: "email", label: "Email", placeholder: "you@example.com", half: true },
                { id: "subject", type: "text", label: "Subject", placeholder: "Internship / Collaboration / Hello", half: false },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label htmlFor={field.id} className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                    placeholder={field.placeholder}
                    data-testid={`input-${field.id}`}
                    className="px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #1a1a1a",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = `${ACCENT}40`)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the opportunity, project, or anything on your mind..."
                  data-testid="input-message"
                  className="px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-200 resize-none"
                  style={{ backgroundColor: "#0a0a0a", border: "1px solid #1a1a1a" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = `${ACCENT}40`)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: isSubmitting ? "none" : `0 0 24px ${ACCENT}20` }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                type="submit"
                disabled={isSubmitting}
                data-testid="button-submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "#0D1F1A", color: ACCENT, border: `1px solid ${ACCENT}30` }}
              >
                {isSubmitting ? "Sending..." : "Send message"} <ArrowUpRight size={15} />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
