"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "@/lib/data";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select input
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: Replace with Resend or EmailJS integration
    // Example with EmailJS:
    // await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
    //
    // For now, simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    { icon: FaGithub, label: "GitHub", href: personalInfo.github },
    { icon: FaLinkedin, label: "LinkedIn", href: personalInfo.linkedin },
    { icon: FaXTwitter, label: "Twitter / X", href: personalInfo.twitter },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Contact
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-[var(--color-secondary)]">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-widest mb-2">
                Email
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary)] font-medium">
                  {personalInfo.email}
                </span>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-green-500"
                >
                  Email copied!
                </motion.p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
                Currently{" "}
                <span className="font-semibold text-green-500">
                  available for freelance work
                </span>{" "}
                and open to full-time opportunities. Response time is usually
                within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-[var(--color-primary)]"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-primary)] placeholder-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[var(--color-primary)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-primary)] placeholder-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-[var(--color-primary)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-primary)] placeholder-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-500 text-center"
                >
                  ✓ Message sent! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 text-center"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
