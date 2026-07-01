import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://akakai.com";
const SITE_NAME = "akakAI";
const TITLE = "akakAI — Autonomous AI Agents That Act Without Being Asked";
const DESCRIPTION =
  "akakAI builds autonomous AI agents for real business operations — systems that anticipate work, make decisions, and get outcomes done without prompting.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — akakAI",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "akakAI",
    "akak AI",
    "akakai",
    "autonomous AI agents",
    "agentic AI",
    "AI agents for business",
    "enterprise AI",
    "AI automation",
    "AI that acts without prompting",
    "AI decision engine",
    "operational AI",
    "AI for operations",
    "AI lab Dallas",
    "Aegent",
    "Optimal AI",
    "LLM router",
    "AI model router",
    "sovereign AI agents",
    "AI research lab",
    "Zayd Malik",
    "Abhiram Vishnubhotla",
  ],
  authors: [
    { name: "Zayd Malik", url: `${SITE_URL}#zayd-malik` },
    { name: "Abhiram Vishnubhotla", url: `${SITE_URL}#abhiram-vishnubhotla` },
  ],
  creator: "akakAI",
  publisher: "akakAI",
  category: "Artificial Intelligence",
  classification: "AI Research & Autonomous Agents",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-badge.png", type: "image/png" },
    ],
    shortcut: "/favicon-badge.png",
    apple: "/favicon-badge.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "akakAI — Autonomous AI Agents That Act Without Being Asked",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@akakAIhq",
    creator: "@akakAIhq",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "akakAI",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "akakAI",
      alternateName: ["akak AI", "akakai", "akak.AI"],
      legalName: "akakAI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-badge.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/opengraph.jpg`,
      description:
        "akakAI is an AI research lab building autonomous agents for business operations — systems that anticipate work, make decisions, and act on their own.",
      slogan: "AI that acts before you ask.",
      foundingDate: "2025",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dallas",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      areaServed: "Worldwide",
      industry: "Artificial Intelligence",
      knowsAbout: [
        "Autonomous AI Agents",
        "Agentic AI",
        "Enterprise AI Automation",
        "LLM Routing",
        "Multi-Agent Systems",
        "AI for Business Operations",
        "Cognitive Systems",
      ],
      founder: [
        { "@id": `${SITE_URL}#zayd-malik` },
        { "@id": `${SITE_URL}#abhiram-vishnubhotla` },
      ],
      employee: [
        { "@id": `${SITE_URL}#zayd-malik` },
        { "@id": `${SITE_URL}#abhiram-vishnubhotla` },
      ],
      sameAs: [
        "https://www.youtube.com/@real.akakAI",
        "https://www.instagram.com/real.akakai/",
        "https://x.com/akakAIhq",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@akakai.com",
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
        {
          "@type": "ContactPoint",
          contactType: "press",
          email: "media@akakai.com",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          contactType: "investor relations",
          email: "investments@akakai.com",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph.jpg`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".aeo-speakable", "h1", "h2"],
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#zayd-malik`,
      name: "Zayd Malik",
      givenName: "Zayd",
      familyName: "Malik",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": `${SITE_URL}#organization` },
      image: `${SITE_URL}/zayd.jpg`,
      description:
        "Zayd Malik is the founder and CEO of akakAI. He founded the company on the belief that intelligence should move first — not wait to be asked.",
      knowsAbout: [
        "Autonomous AI",
        "Agentic Systems",
        "AI Product Design",
        "AI Strategy",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#abhiram-vishnubhotla`,
      name: "Abhiram Vishnubhotla",
      givenName: "Abhiram",
      familyName: "Vishnubhotla",
      jobTitle: "Agent Developer",
      worksFor: { "@id": `${SITE_URL}#organization` },
      image: `${SITE_URL}/abhi.jpg`,
      description:
        "Abhiram Vishnubhotla builds the core agent runtime at akakAI — the layer responsible for goal comprehension, planning, and real-time decision-making across complex multi-system environments.",
      knowsAbout: [
        "Multi-Agent Systems",
        "Agent Runtimes",
        "Planning & Reasoning",
        "AI Systems Engineering",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://aegent.akakai.com#software",
      name: "Aegent",
      alternateName: "Aegent by akakAI",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Autonomous AI Agent Platform",
      operatingSystem: "Cloud",
      url: "https://aegent.akakai.com",
      publisher: { "@id": `${SITE_URL}#organization` },
      description:
        "Aegent is akakAI's sovereign agent platform: isolated AI entities that run continuously in the cloud with private memory, tools, and perception. Each agent learns on its own and never blends into a shared mind — divergence at scale.",
      featureList: [
        "Sovereign agent instances with isolated memory",
        "Continuous background operation",
        "Recursive learning across cycles",
        "Private tool and perception boundaries",
        "Enterprise-ready autonomy without human-in-the-loop",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://optimal.akakai.com#software",
      name: "Optimal",
      alternateName: "Optimal by akakAI",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI Model Router",
      operatingSystem: "Cloud",
      url: "https://optimal.akakai.com",
      publisher: { "@id": `${SITE_URL}#organization` },
      description:
        "Optimal is akakAI's intelligent model router — proprietary routing models that send every prompt to the strongest LLM for the job, in real time. Top-tier reasoning at a fraction of the cost, with near-unlimited access through chat or API.",
      featureList: [
        "Real-time routing to the best frontier LLM per request",
        "One interface across a dozen frontier models",
        "Chat and API access",
        "Cost-optimized without sacrificing reasoning quality",
        "Near-unlimited message throughput",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}#webpage` },
      mainEntity: [
        {
          "@type": "Question",
          name: "What is akakAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "akakAI is an AI research lab building autonomous agents that act on their own — systems that anticipate work, make decisions, and execute without prompting. Founded in 2025, headquartered in Dallas, Texas.",
          },
        },
        {
          "@type": "Question",
          name: "What does akakAI actually do for a business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "akakAI builds the AI layer beneath your operations. Instead of tools that wait for a human to click, our agents move first: monitoring signals, deciding what matters, and completing work end-to-end. Less supervision, fewer bottlenecks, more outcomes shipped.",
          },
        },
        {
          "@type": "Question",
          name: "How is akakAI different from ChatGPT or other AI assistants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Assistants respond. akakAI's agents initiate. ChatGPT waits for a prompt; akakAI systems perceive their environment, form intent, and act — closing the loop between decision and delivery without a person in the middle.",
          },
        },
        {
          "@type": "Question",
          name: "What products does akakAI offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two products, both live in production. Aegent is a sovereign agent platform — isolated, self-learning AI entities running continuously in the cloud. Optimal is an intelligent model router that sends each request to the strongest LLM for the job, at a fraction of the cost.",
          },
        },
        {
          "@type": "Question",
          name: "Who founded akakAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "akakAI was founded by Zayd Malik, who serves as CEO. The company operates as an independent research lab out of Dallas, Texas.",
          },
        },
        {
          "@type": "Question",
          name: "Where is akakAI headquartered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "akakAI is headquartered in Dallas, Texas, United States, and serves customers worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "Is akakAI hiring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. akakAI is actively hiring engineers and researchers who believe intelligence should move first. Reach out at media@akakai.com to start the conversation.",
          },
        },
        {
          "@type": "Question",
          name: "How can I invest in akakAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "akakAI works directly with strategic investors and partners. Contact investments@akakai.com to open a conversation.",
          },
        },
        {
          "@type": "Question",
          name: "How do I contact akakAI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For product and partnership, email hello@akakai.com. For press, media@akakai.com. For investors, investments@akakai.com.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="akakAI"
          href={`${SITE_URL}/rss.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
