"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 120) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] flex items-center justify-between px-6 md:px-10 transition-all duration-300 border-b border-border ${
        scrolled
          ? "bg-bg-primary/90 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-bg-primary/60"
      }`}
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <Link href="#hero" className="font-display text-xl font-bold tracking-tight">
        <span className="text-accent-indigo">&lt;</span>
        SS
        <span className="text-accent-indigo">/&gt;</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-9">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-indigo after:to-accent-cyan after:rounded-sm after:transition-all after:duration-300 ${
              activeSection === item.href.slice(1)
                ? "text-text-primary after:w-full"
                : "text-text-secondary hover:text-text-primary after:w-0 hover:after:w-full"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/sohaib1083"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-border text-text-secondary flex items-center justify-center text-lg transition-all hover:border-accent-indigo hover:text-accent-indigo hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github" />
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-7"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] bg-bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-50"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xl font-medium text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
