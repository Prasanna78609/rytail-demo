"use client";

import { useSyncExternalStore } from "react";
import {
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  OFFICE_CARDS,
  QUICK_LINKS,
  SOCIAL_LINKS,
  type SocialLink,
} from "@/data/footer";
import { FooterBadge } from "./footer/FooterBadge";
import { FooterColumnGroup } from "./footer/FooterColumnGroup";
import { NewsletterBand } from "./footer/NewsletterBand";
import { OfficeCards } from "./footer/OfficeCards";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  switch (id) {
    case "linkedin":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.21 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M21.58 7.19C21.35 6.33 20.67 5.65 19.81 5.42C18.25 5 12 5 12 5C12 5 5.75 5 4.19 5.42C3.33 5.65 2.65 6.33 2.42 7.19C2 8.75 2 12 2 12C2 12 2 15.25 2.42 16.81C2.65 17.67 3.33 18.35 4.19 18.58C5.75 19 12 19 12 19C12 19 18.25 19 19.81 18.58C20.67 18.35 21.35 17.67 21.58 16.81C22 15.25 22 12 22 12C22 12 22 8.75 21.58 7.19ZM10 15V9L15.2 12L10 15Z" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

const emptySubscribe = () => () => { };

export default function Footer() {
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return (
      <footer
        className="footer-theme w-full text-[var(--ft-text)]"
        style={
          {
            "--ft-navy": "#070B09",
            "--ft-navy-deep": "#040705",
            "--ft-coral": "#10B981",
            "--ft-card": "#0F1A15",
            "--ft-text": "#FFFFFF",
            "--ft-muted": "#9CAEA4",
            "--ft-heading": "#4ADE80",
            "--ft-border": "rgba(52, 211, 153, 0.22)",
          } as React.CSSProperties
        }
      >
        {/* Part 1: Newsletter Band */}
        <NewsletterBand />

        {/* Part 2: Main Footer */}
        <div className="w-full bg-[var(--ft-navy)]">
          <div className="mx-auto max-w-[1200px] px-6 py-12">
            {/* Top Row: Brand + Placeholder Badges */}
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-heading)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    className="h-8 w-8"
                    fill="none"
                  >
                    <rect width="32" height="32" rx="8" fill="#FFFFFF" />
                    <path
                      d="M9 21L14.5 11L19 17.5L23 11.5"
                      stroke="#070B09"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="23" cy="11.5" r="2.2" fill="#10B981" />
                  </svg>
                  <span className="font-display text-xl font-bold tracking-tight text-white">
                    Rytail
                  </span>
                </a>
                <p className="mt-2.5 text-sm text-[var(--ft-muted)]">
                  Intelligent Operations, Simplified.
                </p>
              </div>

              <div className="flex flex-wrap items-stretch gap-4">
                <FooterBadge
                  label="Check us out on"
                  badges={["Review Platform"]}
                />
                <FooterBadge
                  label="Available on"
                  badges={["Cloud Marketplace A", "Cloud Marketplace B"]}
                />
              </div>
            </div>

            <hr className="my-10 border-[var(--ft-border)]" />

            {/* 6 Link Columns (Accordion < 640px) */}
            <FooterColumnGroup columns={FOOTER_COLUMNS} />

            {/* Quick Links + Enquiries Email Row */}
            <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[var(--ft-border)] pt-8 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <h3 className="shrink-0 font-display text-[15px] font-bold text-[var(--ft-heading)]">
                  Quick Links
                </h3>
                <nav aria-label="Quick Links">
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {QUICK_LINKS.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-xs text-white transition-colors duration-150 hover:text-[var(--ft-heading)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* TODO: Replace placeholder contact email with real Rytail address */}
              <p className="text-xs text-[var(--ft-muted)]">
                For product enquiries email us:{" "}
                <a
                  href="mailto:hello@yourRytail.com"
                  className="font-semibold text-white underline underline-offset-4 transition-colors duration-150 hover:text-[var(--ft-heading)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                >
                  hello@yourRytail.com
                </a>
              </p>
            </div>

            {/* Office Cards */}
            <div className="mt-8">
              <OfficeCards offices={OFFICE_CARDS} />
            </div>

            <hr className="my-8 border-[var(--ft-border)]" />

            {/* Bottom Bar */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-2">
                <p className="text-xs text-[var(--ft-muted)]">
                  Copyright {currentYear} | All Rights Reserved by Rytail
                </p>
                <nav aria-label="Legal links">
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                    {LEGAL_LINKS.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-xs text-white transition-colors duration-150 hover:text-[var(--ft-heading)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[var(--ft-muted)]">
                  Connect with us:
                </span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--ft-border)] bg-white/5 text-white transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--ft-heading)] hover:text-[var(--ft-heading)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                    >
                      <SocialIcon id={social.id} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      );
}
