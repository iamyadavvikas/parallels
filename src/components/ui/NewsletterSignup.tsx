"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email");
      return;
    }

    setStatus("loading");

    // Simulate API call (in production, connect to Mailchimp, Resend, etc.)
    await new Promise((r) => setTimeout(r, 800));

    // Store in localStorage for now
    const stored = JSON.parse(localStorage.getItem("parallels-subscribers") || "[]");
    if (!stored.includes(email)) {
      stored.push(email);
      localStorage.setItem("parallels-subscribers", JSON.stringify(stored));
    }

    setStatus("success");
    setMessage("You're subscribed! Check your inbox for a welcome email.");
    setEmail("");
  }

  return (
    <section className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 shrink-0">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary font-display tracking-tight">
            Verse of the Week
          </h3>
          <p className="mt-1 text-sm text-text-muted font-body">
            Get a weekly cross-tradition comparison delivered to your inbox.
            No spam, unsubscribe anytime.
          </p>

          {status === "success" ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <Check className="h-4 w-4" />
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border/40 bg-bg-secondary/80 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all font-body"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-void hover:bg-accent/90 transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-2 text-sm text-red-400">{message}</p>
          )}

          <p className="mt-3 text-[10px] text-text-muted/50">
            Join 500+ readers exploring wisdom across traditions
          </p>
        </div>
      </div>
    </section>
  );
}
