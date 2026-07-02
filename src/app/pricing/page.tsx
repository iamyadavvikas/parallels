"use client";

import { Check, X, Sparkles, Zap, Crown } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    color: "text-text-muted",
    bgColor: "bg-bg-tertiary/30",
    borderColor: "border-border/40",
    features: [
      { text: "Browse all 6 holy books", included: true },
      { text: "Semantic search with concept expansion", included: true },
      { text: "Sacred Perspectives panel", included: true },
      { text: "Compare Fusion Chamber", included: true },
      { text: "Bookmarks & notes (local)", included: true },
      { text: "50 AI explanations / month", included: true },
      { text: "Light & dark mode", included: true },
      { text: "Export to PDF", included: false },
      { text: "Cloud sync", included: false },
      { text: "Unlimited AI explanations", included: false },
    ],
    cta: "Get Started",
    ctaStyle: "bg-bg-tertiary/50 text-text-primary hover:bg-bg-tertiary",
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/5",
    borderColor: "border-accent/30",
    popular: true,
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited AI explanations", included: true },
      { text: "Export to PDF / Markdown", included: true },
      { text: "Cloud sync across devices", included: true },
      { text: "Advanced search filters", included: true },
      { text: "Priority support", included: true },
      { text: "Custom topic collections", included: true },
      { text: "API access", included: false },
      { text: "Institutional licensing", included: false },
      { text: "Bulk export", included: false },
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-accent text-bg-primary hover:bg-accent/90 font-semibold",
  },
  {
    name: "Scholar",
    price: "$9.99",
    period: "/month",
    icon: Crown,
    color: "text-purple-400",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/30",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "API access (10K requests/mo)", included: true },
      { text: "Bulk export (all verses)", included: true },
      { text: "Institutional licensing", included: true },
      { text: "Custom verse collections", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Dedicated support", included: true },
      { text: "Early access to new features", included: true },
      { text: "White-label option", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-purple-500 text-white hover:bg-purple-600 font-semibold",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-[80vh] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-text-primary font-display tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-text-muted font-body max-w-2xl mx-auto">
            Start free, upgrade when you need more. All plans include access to the core comparison tools.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border ${tier.borderColor} ${tier.bgColor} p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-bg-primary">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tier.bgColor}`}>
                  <tier.icon className={`h-5 w-5 ${tier.color}`} />
                </div>
                <h2 className="text-xl font-bold text-text-primary font-display">{tier.name}</h2>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-text-primary font-display">{tier.price}</span>
                  <span className="text-sm text-text-muted font-body">{tier.period}</span>
                </div>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-sm font-body">
                    {f.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted/40" />
                    )}
                    <span className={f.included ? "text-text-secondary" : "text-text-muted/50"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${tier.ctaStyle}`}
                disabled
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-muted font-body">
            All paid plans include a 7-day free trial. Cancel anytime.
            <br />
            For institutional or bulk licensing, <a href="mailto:vkyadav.iitkgp@gmail.com" className="text-accent hover:underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
