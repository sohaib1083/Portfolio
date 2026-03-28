"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const mailto = `mailto:sohaib1083@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailto, "_blank");

    setSent(true);
    setTimeout(() => {
      setSent(false);
      form.reset();
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 glass p-8 md:p-10 rounded-2xl">
      {/* Name */}
      <div className="relative">
        <input
          type="text"
          name="name"
          required
          placeholder=" "
          className="form-input w-full pt-4 pb-2 bg-transparent border-b border-border text-text-primary outline-none text-sm transition-all"
        />
        <label className="form-label absolute top-4 left-0 text-sm text-text-muted pointer-events-none transition-all">
          Your Name
        </label>
        <div className="form-line absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-accent-indigo to-accent-cyan transition-all duration-400" />
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          required
          placeholder=" "
          className="form-input w-full pt-4 pb-2 bg-transparent border-b border-border text-text-primary outline-none text-sm transition-all"
        />
        <label className="form-label absolute top-4 left-0 text-sm text-text-muted pointer-events-none transition-all">
          Your Email
        </label>
        <div className="form-line absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-accent-indigo to-accent-cyan transition-all duration-400" />
      </div>

      {/* Subject */}
      <div className="relative">
        <input
          type="text"
          name="subject"
          required
          placeholder=" "
          className="form-input w-full pt-4 pb-2 bg-transparent border-b border-border text-text-primary outline-none text-sm transition-all"
        />
        <label className="form-label absolute top-4 left-0 text-sm text-text-muted pointer-events-none transition-all">
          Subject
        </label>
        <div className="form-line absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-accent-indigo to-accent-cyan transition-all duration-400" />
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          name="message"
          rows={5}
          required
          placeholder=" "
          className="form-input w-full pt-4 pb-2 bg-transparent border-b border-border text-text-primary outline-none text-sm transition-all resize-none font-[inherit]"
        />
        <label className="form-label absolute top-4 left-0 text-sm text-text-muted pointer-events-none transition-all">
          Your Message
        </label>
        <div className="form-line absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-accent-indigo to-accent-cyan transition-all duration-400" />
      </div>

      <button
        type="submit"
        className={`w-full py-3.5 px-8 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          sent
            ? "bg-linear-to-r from-green-500 to-green-600 text-white"
            : "bg-linear-to-r from-accent-indigo to-accent-cyan text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
        }`}
      >
        <span>{sent ? "Message Sent!" : "Send Message"}</span>
        <i className={sent ? "fa-solid fa-check" : "fa-solid fa-paper-plane"} />
      </button>
    </form>
  );
}
