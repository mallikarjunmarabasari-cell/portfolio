import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Linkedin, Send, AlertCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-20 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">Say Hello</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-muted-foreground text-base leading-relaxed"
        >
          I'm actively looking for internship opportunities. Whether you have a role, a project, or just want to say hi — my inbox is open.
        </motion.p>
      </div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-2 gap-4 mb-10"
      >
        <a
          href={`mailto:${personalInfo.email}`}
          data-testid="link-email-contact"
          className="group flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Mail size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] text-muted-foreground mb-0.5">Email</div>
            <div className="text-xs font-medium text-foreground truncate">{personalInfo.email}</div>
          </div>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-linkedin-contact"
          className="group flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Linkedin size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] text-muted-foreground mb-0.5">LinkedIn</div>
            <div className="text-xs font-medium text-foreground truncate">mallikarjunsmarabasari</div>
          </div>
        </a>
      </motion.div>

      {/* Backend not wired notice */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="flex items-start gap-3 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 mb-8"
      >
        <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Backend not wired yet</span> — Form submissions are currently mocked. Use the email or LinkedIn links above to reach out directly.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.38 }}
      >
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5"
            >
              <Send size={24} className="text-primary" />
            </motion.div>
            <h2 className="text-xl font-semibold font-display text-foreground mb-2">Thanks for reaching out!</h2>
            <p className="text-sm text-muted-foreground">
              (This is a mocked response — please use email or LinkedIn for actual contact.)
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  data-testid="input-name"
                  className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  data-testid="input-email"
                  className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">Subject</label>
              <input
                id="subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="Internship opportunity / Collaboration / Just saying hi"
                data-testid="input-subject"
                className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-muted-foreground">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about the opportunity, project, or anything on your mind..."
                data-testid="input-message"
                className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              data-testid="button-submit"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
            >
              <Send size={14} />
              Send Message
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
