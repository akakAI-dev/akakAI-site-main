import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://akakai.com";
const SITE_NAME = "akakAI";
const TITLE = "akakAI — The AI You Were Promised";
const DESCRIPTION =
  "akakAI is a research lab that ships. Aegent: a workforce of AI workers that finish tasks on their own. Optimal: one chat with every frontier AI in it. Both live today.";

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
        alt: "akakAI — The AI You Were Promised",
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
        "akakAI is an AI research lab that ships. Aegent is a workforce of AI workers that finish tasks on their own. Optimal is one chat with every frontier AI in it. Both live today.",
      slogan: "AI you wield. Not AI you wrestle.",
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
        "Aegent gives your business its own AI workforce — dedicated workers that clock in 24/7, learn your business as they go, and finish real work without supervision. Software that actually shows up.",
      featureList: [
        "Dedicated AI worker for any role in your business",
        "Clocks in 24/7 in the cloud, no supervision needed",
        "Learns your business as it goes",
        "Finishes real work end-to-end",
        "Gets sharper the longer it runs",
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
        "Optimal puts ChatGPT, Claude, Gemini and every frontier AI in one chat, then instantly routes each question to whichever model answers best. One login, one bill, near-unlimited messages, a fraction of the cost.",
      featureList: [
        "Every frontier AI in one chat",
        "Auto-picks the best model for each question",
        "One login, one bill",
        "Near-unlimited messages",
        "A fraction of the cost of stacking subscriptions",
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
            text: "akakAI is a research lab that ships. Not papers — products. Aegent is a workforce of AI workers that finish tasks on their own. Optimal is one chat with every frontier AI in it. Both live today. Founded 2025 in Dallas, Texas.",
          },
        },
        {
          "@type": "Question",
          name: "What does akakAI actually do for a business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two levers. Aegent gives your team dedicated AI workers that finish tasks without supervision — research, outreach, reports, follow-ups. Optimal collapses ChatGPT, Claude, Gemini and every other frontier AI into one chat that automatically picks the best one for each question. Less busywork. Less tool sprawl. Way more shipped.",
          },
        },
        {
          "@type": "Question",
          name: "How is akakAI different from ChatGPT or other AI assistants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT is one model that waits for you to type. akakAI is two products in one lab: Aegent moves first and finishes work on its own. Optimal covers ChatGPT plus every other frontier AI in a single chat — automatically picking whichever answers best.",
          },
        },
        {
          "@type": "Question",
          name: "What products does akakAI offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Two, both live today. Aegent gives your business its own AI workforce — dedicated workers that clock in 24/7 and get sharper the longer they run. Optimal is one chat with every frontier AI in it — ChatGPT, Claude, Gemini and more — auto-picking the best one for each question. One bill, near-unlimited messages, a fraction of the cost.",
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
