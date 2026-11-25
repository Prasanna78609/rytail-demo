"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterBand() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Please enter a valid email address.");
      setSubscribed(false);
      return;
    }

    setError(null);
    // TODO: Connect newsletter subscription to backend API endpoint.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, var(--ft-coral) 0%, var(--ft-navy) 100%)",
      }}
      className="w-full pt-[56px] pb-[40px]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
        }
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2"
      >
        <div>
          <h2 className="font-display text-[30px] font-bold leading-tight tracking-tight text-white">
            Newsletter
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/95">
            Be the first to hear about product updates, platform releases and
            operations insights.
          </p>
        </div>

        <div>
          {subscribed ? (
            <div
              role="status"
              className="flex items-center gap-2.5 rounded-[12px] border border-white/25 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white backdrop-blur-xs"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[#0B1220]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>Thanks, you&apos;re subscribed</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-2 rounded-[12px] bg-white p-[6px] shadow-md sm:flex-row sm:items-center"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Email Address"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "footer-newsletter-error" : undefined}
                className="w-full flex-1 rounded-lg bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-navy)]"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--ft-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--ft-navy-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-navy)]"
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--ft-coral)]"
                />
                <span>Subscribe Now</span>
              </button>
            </form>
          )}

          {error && (
            <p
              id="footer-newsletter-error"
              role="alert"
              className="mt-2 text-xs font-medium text-white"
            >
              {error}
            </p>
          )}

          <p className="mt-2.5 text-xs text-white/90">
            By submitting this form, you agree to our{" "}
            <a
              href="#privacy-policy"
              className="underline underline-offset-4 transition-colors duration-150 hover:text-[var(--ft-heading)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              privacy policy
            </a>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
