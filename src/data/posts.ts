import { TEAM } from "./team";

const author = (slug: string) => {
  const m = TEAM.find((t) => t.slug === slug) ?? TEAM[0];
  return { name: m.name, role: m.role, avatar: m.photo, slug: m.slug };
};

// Starter posts shown until VITE_BLOG_API_URL is set (and as a fallback if the API is down).
export const SEED_POSTS = [
  {
    slug: "what-it-takes-to-build-a-fintech-app-in-nigeria",
    title: "What it really takes to build a fintech app in Nigeria",
    excerpt:
      "Licensing, payment rails, KYC, security and the product itself — a practical breakdown of the scope, timeline and team you need to launch a fintech app in Nigeria.",
    category: "Fintech Strategy",
    tags: ["Fintech", "Nigeria", "MVP", "Product Strategy"],
    featured: true,
    publishedAt: "2026-09-20T09:00:00.000Z",
    author: author("olamide-oladele"),
    metaTitle: "How to Build a Fintech App in Nigeria (2026 Guide) | KyvoLab",
    metaDescription:
      "A practical guide to building a fintech app in Nigeria: licensing, payment providers, KYC with BVN and NIN, security, timeline and the team you need to launch.",
    content: `Every week someone asks us the same question: *"How do I build an app like Opay or Kuda?"* The honest answer is that the app is the easy part. The hard part is everything around it — the licences, the payment rails, the identity checks and the trust users need before they put money in.

This guide walks through what actually goes into shipping a fintech product in Nigeria, based on the products we've designed and engineered at KyvoLab.

## 1. Start with the licence question, not the design

Before a single screen is drawn, you need to know *how* you're allowed to move money. Broadly, founders take one of three routes:

- **Partner with a licensed institution.** You build the product; a licensed bank, MMO or PSP holds the funds. This is the fastest route for most startups.
- **Use a Banking-as-a-Service provider.** Virtual accounts, transfers and cards are exposed through APIs, and the provider handles most of the regulatory surface.
- **Get your own licence.** Slower and capital-intensive, but it gives you full control once you've found product–market fit.

Your choice decides your architecture. A product sitting on a BaaS partner needs a very different ledger and reconciliation design from one holding its own float.

## 2. Pick your payment rails early

Most Nigerian fintech apps combine several providers:

| Need | Typical options |
| --- | --- |
| Card & bank collections | Paystack, Flutterwave, Interswitch |
| Transfers & virtual accounts | BaaS partners, NIBSS-connected providers |
| Airtime, data & bills (VTU) | VTU aggregators such as VTpass |
| Identity (KYC) | BVN & NIN verification, liveness providers |

Integrating one provider is straightforward. Integrating four — and keeping balances correct when one of them times out mid-transaction — is where most teams get burned. We always design for **idempotency, retries and daily reconciliation** from day one.

## 3. KYC is a product feature, not a form

Tiered KYC lets users start with a phone number and BVN, then unlock higher limits with NIN, a selfie and an address. Done well, it protects you from fraud without killing sign-up conversion. Done badly, it's where half your users drop off.

> The best onboarding flows we've shipped ask for the minimum at sign-up and request more only when the user tries to do something that needs it.

## 4. Security has to be designed in

Users are trusting you with their money. At minimum, a production fintech app needs:

1. Transaction PINs and biometric confirmation for sensitive actions
2. Device binding and session management
3. Encrypted data at rest and in transit
4. Rate limiting and fraud rules on transfers
5. Full audit logs on the admin side

## 5. What an MVP scope looks like

A realistic first release usually includes onboarding with tiered KYC, a wallet with funding and withdrawal, transfers, bill payments and airtime, transaction history, notifications, and an admin dashboard for support and compliance. With a focused team, a well-scoped MVP typically takes **10–16 weeks** from kickoff to app store.

## 6. The team you need

You don't need thirty engineers. You need a small group that has done it before: a product designer who understands financial UX, mobile and backend engineers comfortable with payment integrations, and someone who owns security. That's exactly how we've structured KyvoLab.

## Ready to build?

If you're planning a wallet, VTU platform, savings product or payments app, we'd love to hear about it. [Tell us about your project](/contact) and we'll come back with a scope, timeline and plan — or [see what we've already shipped](/work).`,
  },
  {
    slug: "kyc-in-nigeria-bvn-nin-without-killing-conversion",
    title: "KYC in Nigeria: verifying BVN and NIN without killing conversion",
    excerpt:
      "Identity checks are where most fintech apps lose users. Here's how we design tiered KYC flows that satisfy compliance and still feel effortless.",
    category: "Engineering",
    tags: ["KYC", "BVN", "NIN", "Onboarding", "Security"],
    publishedAt: "2026-09-12T09:00:00.000Z",
    author: author("igbalaye-femi"),
    metaDescription:
      "How to implement BVN and NIN verification in a Nigerian fintech app with tiered KYC, liveness checks and an onboarding flow that keeps conversion high.",
    content: `Onboarding is the first real conversation your product has with a user — and in fintech, that conversation starts with *"prove who you are."* Get it wrong and people abandon the app before they ever fund a wallet.

Here's the approach we use at KyvoLab when designing KYC for Nigerian fintech products.

## Why tiered KYC wins

Instead of asking for everything upfront, tiered KYC unlocks limits progressively:

- **Tier 1** — phone number, name, date of birth and BVN. Enough to open a wallet with low limits.
- **Tier 2** — NIN plus a selfie with a liveness check. Higher daily and balance limits.
- **Tier 3** — proof of address and additional documents for the highest limits.

Users get value in minutes, and you only ask for more when they need more.

## Designing the BVN step

The BVN step is where most drop-off happens, usually because users don't know their BVN or don't trust the app with it. A few things that help:

1. **Explain why** in one plain sentence right above the field.
2. **Show how to find it** — the *565*0# USSD code — inline, not buried in a FAQ.
3. **Prefill what you can** from the verification response and let the user confirm instead of retyping.
4. **Match names forgivingly.** Nigerian names are often ordered or spelled differently across records; strict string matching creates false rejections.

## Liveness without friction

A selfie check should take seconds. Keep the camera UI simple, give real-time guidance (*"move closer," "more light"*), and always offer a retry before routing to manual review.

## Engineering it properly

On the backend, KYC is a state machine, not a boolean. Each user moves through clearly defined states — *pending, verified, failed, under review* — and every transition is logged. That gives your compliance team an audit trail and your support team a clear answer when a user asks *"why can't I send money?"*

We also recommend:

- Caching verification results so you're not paying twice for the same lookup
- Storing only what regulation requires, encrypted
- Webhook handling that is idempotent, because providers do send duplicates

## The result

On products we've shipped, a well-designed tiered flow gets most users verified at Tier 1 in under two minutes — without compromising on compliance.

Building onboarding for a wallet, lending or savings product? [Talk to the KyvoLab team](/contact) — we've designed and engineered these flows end-to-end.`,
  },
  {
    slug: "building-a-vtu-and-bill-payment-platform-that-scales",
    title: "Building a VTU and bill payment platform that doesn't break at scale",
    excerpt:
      "Airtime, data, electricity and TV subscriptions look simple until you process thousands of transactions a day. The architecture decisions that keep a VTU platform reliable.",
    category: "Engineering",
    tags: ["VTU", "Bill Payments", "Architecture", "Fintech"],
    publishedAt: "2026-09-03T09:00:00.000Z",
    author: author("olamide-oladele"),
    metaDescription:
      "How to build a reliable VTU and bill payment app in Nigeria: provider failover, wallet ledgers, reconciliation and the architecture that holds up at scale.",
    content: `VTU (virtual top-up) and bill payment apps are one of the most popular fintech products in Nigeria — and one of the most underestimated. Selling airtime looks like a single API call. At scale, it's a distributed systems problem.

## The deceptively simple flow

A user buys ₦1,000 of data. Behind the scenes:

1. Their wallet is debited
2. A request goes to a VTU provider
3. The provider talks to the network
4. A response (or a timeout) comes back
5. The user is either credited value or refunded

Every one of those steps can fail — and the dangerous failures are the ones where you *don't know* whether the purchase went through.

## Rule 1: build a real ledger

Never store a balance as a single number you add to and subtract from. Use **double-entry ledger entries** and derive balances from them. When something goes wrong — and it will — you can reconstruct exactly what happened.

## Rule 2: treat "pending" as a first-class state

Timeouts are common. If you refund immediately on a timeout and the provider later confirms success, you've just given away free airtime. Instead:

- Mark the transaction **pending**
- Re-query the provider's status endpoint with backoff
- Only refund when the provider confirms failure, or after a defined reconciliation window

## Rule 3: multiple providers, automatic failover

No single aggregator has perfect uptime. We route through a primary provider and fail over to a secondary one per product — MTN data might go through one provider while electricity tokens go through another. The routing is configurable from the admin dashboard, so operations can switch providers without a deploy.

## Rule 4: reconcile every day

Match your ledger against every provider's report daily. Mismatches get flagged automatically for review. This single process catches more money leaks than any other.

## Rule 5: make the admin side as good as the app

Your support team will live in the admin dashboard: searching transactions, resolving disputes, reversing failed payments, and managing pricing and commissions. Investing in it early pays back quickly.

## What this means for your product

A VTU platform built on these principles can grow from hundreds to tens of thousands of daily transactions without a rewrite. We applied exactly this thinking on [DePay](/work/depay).

Planning a VTU, bill payment or wallet app? [Start a project with KyvoLab](/contact) — we'll help you get the architecture right from day one.`,
  },
];
