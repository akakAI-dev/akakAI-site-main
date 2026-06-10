"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Youtube, Instagram } from "lucide-react";

function Ruled({ className = "" }: { className?: string }) {
  return <div className={`h-px bg-line w-full ${className}`} />;
}

function GridLabel({ children, num }: { children: React.ReactNode; num?: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      {num && <span className="text-micro uppercase text-dim font-mono">{num}</span>}
      <span className="text-caption uppercase text-muted">{children}</span>
    </div>
  );
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const socials = [
  { href: "https://www.youtube.com/@real.akakAI", icon: <Youtube size={14} />, label: "YouTube" },
  { href: "https://www.instagram.com/real.akakai/", icon: <Instagram size={14} />, label: "Instagram" },
  { href: "https://x.com/akakAIhq", icon: <svg width="14" height="14" viewBox="0 0 24 24" className="fill-current"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" /></svg>, label: "X" },
];

const navLinks = [
  { label: "Products", id: "products" },
  { label: "About", id: "about" },
  { label: "Mission", id: "mission" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

function NavBar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-5 inset-x-0 z-[60] mx-auto w-fit flex items-center gap-5 px-6 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hidden md:flex items-center gap-5">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-micro uppercase text-dim hover:text-white px-1 py-1 transition-colors duration-300"
          >
            {link.label}
          </button>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            className="text-dim hover:text-white transition-colors duration-300" aria-label={s.label}>
            {s.icon}
          </a>
        ))}
      </div>

      <Image
        src="/logo-horizontal.png" alt="akakAI" width={80} height={20}
        style={{ filter: "brightness(0) invert(1)" }}
        className="h-3 w-auto opacity-60 md:hidden"
        priority
      />
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-dim hover:text-white transition-colors"
        aria-label="Menu"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open
            ? <path d="M4 4l8 8M12 4l-8 8" />
            : <><path d="M2 4h12" /><path d="M2 8h12" /><path d="M2 12h12" /></>
          }
        </svg>
      </button>

      {open && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-3 flex flex-col items-center gap-4 py-6 backdrop-blur-md bg-black/90"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-micro uppercase text-dim hover:text-white transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-4 mt-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-dim hover:text-white transition-colors duration-300" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-between px-grid pt-6 pb-grid relative">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-[90vw]">
          <motion.h1
            className="text-display uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            AI THAT
          </motion.h1>
          <motion.h1
            className="text-display uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            ACTS<span className="text-muted">.</span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-12 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-body-lg text-muted leading-relaxed">
            Autonomous agents that navigate complexity, make decisions,
            and deliver outcomes. No prompting. No hand-holding. Just execution.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-6">
          <span className="text-micro uppercase text-dim">Dallas, TX</span>
          <span className="text-micro uppercase text-dim">2025</span>
        </div>
        <div className="text-micro uppercase text-dim">
          Scroll
        </div>
      </motion.div>
    </section>
  );
}

function TickerStrip() {
  const items = ["ANTICIPATE", "ADAPT", "ACT", "SCALE", "ANTICIPATE", "ADAPT", "ACT", "SCALE"];
  return (
    <div className="border-y border-line py-4 overflow-hidden">
      <div className="animate-ticker whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-caption uppercase text-dim mx-8 inline-flex items-center gap-4">
            {item}
            <span className="w-1.5 h-1.5 bg-dim inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-grid py-section">
      <RevealBlock>
        <GridLabel num="02">What We Are</GridLabel>
      </RevealBlock>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid">
        <RevealBlock className="lg:col-span-5" delay={0.1}>
          <h2 className="text-headline text-white mb-8">
            A new class<br />of intelligent<br />systems.
          </h2>
        </RevealBlock>
        <div className="lg:col-span-1" />
        <RevealBlock className="lg:col-span-6" delay={0.2}>
          <p className="text-body-lg text-muted mb-6">
            akakAI is building AI agents that don&apos;t just respond to instructions.
            They think independently, take initiative, and execute tasks with purpose.
          </p>
          <p className="text-body-lg text-muted mb-6">
            Not assistants. Not autocomplete. Agents that understand what needs to happen,
            decide how to make it happen, and then do it.
          </p>
          <p className="text-body-lg text-muted">
            Operating at a level of autonomy that changes what&apos;s possible.
          </p>
        </RevealBlock>
      </div>

      <RevealBlock delay={0.3} className="mt-section">
        <Ruled className="mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid">
          <div className="lg:col-span-5">
            <blockquote className="text-subhead text-white italic">
              &ldquo;AI shouldn&apos;t wait for direction. It should anticipate, adapt, and act.&rdquo;
            </blockquote>
          </div>
          <div className="lg:col-span-1" />
          <div className="lg:col-span-6 flex items-end">
            <p className="text-caption uppercase text-dim">
              The core belief driving everything we build
            </p>
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}

function MissionSection() {
  const principles = [
    { word: "ANTICIPATE", num: "I", desc: "Already in motion before the problem is named." },
    { word: "ADAPT", num: "II", desc: "Conditions change. Our agents don't break." },
    { word: "ACT", num: "III", desc: "Thinking without doing is noise." },
    { word: "SCALE", num: "IV", desc: "Intelligent action without compounding cost." },
  ];

  return (
    <section id="mission" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="03">Mission</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-headline text-white max-w-4xl mb-16">
          Make action the default,<br />not the exception.
        </h2>
      </RevealBlock>

      <RevealBlock delay={0.2} className="mb-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid max-w-4xl">
          <p className="text-body-lg text-muted">
            We exist at the intersection of ambition and execution, building
            systems that let ideas become outcomes without the human bottleneck.
          </p>
          <p className="text-body-lg text-muted">
            No intermediary. No endless iteration. No prompting.
            Just outcomes delivered by agents that understand what matters.
          </p>
        </div>
      </RevealBlock>

      <Ruled />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <RevealBlock key={p.word} delay={0.1 * i} className="border-r border-line last:border-r-0 py-12 pr-grid">
            <span className="text-micro text-dim block mb-6">{p.num}</span>
            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white uppercase tracking-tight mb-4">
              {p.word}
            </h3>
            <p className="text-body-lg text-muted">{p.desc}</p>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: "Zayd Malik",
      role: "Founder & CEO",
      img: "/zayd.png",
      quote: "AI should act, not just react.",
      bio: "Zayd didn't start akakAI because AI was exciting. He started it because it was disappointing. They waited. They asked for input. They responded. They never moved first.",
    },
    {
      name: "Abhiram Vishnubhotla",
      role: "Agent Developer",
      img: "/abhi.jpg",
      quote: "Agents that don't just execute. They understand.",
      bio: "Abhiram architects the core agent runtime — the layer responsible for goal comprehension, dynamic planning, and real-time decision-making across complex, multi-system environments.",
    },
  ];

  return (
    <section id="team" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="04">Team</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-headline text-white mb-section">
          The people<br />building it.
        </h2>
      </RevealBlock>

      <div className="space-y-0">
        {team.map((person, i) => (
          <RevealBlock key={person.name} delay={0.1 * i}>
            <div className="border-t border-line py-12 grid grid-cols-1 lg:grid-cols-12 gap-grid items-start">
              <div className="lg:col-span-2">
                <Image
                  src={person.img}
                  alt={person.name}
                  width={120}
                  height={120}
                  className="w-20 h-20 lg:w-full lg:h-auto aspect-square object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="lg:col-span-4">
                <p className="text-micro uppercase text-dim mb-3">{person.role}</p>
                <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white tracking-tight mb-4">
                  {person.name}
                </h3>
                <p className="text-subhead text-white/80 italic">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>
              <div className="lg:col-span-1" />
              <div className="lg:col-span-5">
                <p className="text-body-lg text-muted">{person.bio}</p>
              </div>
            </div>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

function ProductsSection() {
  const products = [
    {
      num: "01",
      name: "OPTIMAL",
      subtitle: "Intelligent Model Router",
      desc: "Optimal is a series of proprietary routing models that intelligently direct each prompt to the best LLM, delivering top-tier performance at a fraction of the cost. One interface, a dozen models, near-unlimited access, through chat or API. Send us a gazillion requests, we won't flinch.",
      tags: ["Multi-Model", "Real-Time Routing", "Unlimited Messages"],
      url: "https://optimal.akakai.com",
    },
    {
      num: "02",
      name: "AEGENT",
      subtitle: "Autonomous Agent Platform",
      desc: "A no-code platform for building autonomous AI agents that listen to real-world triggers and act through a community-built integration library.",
      tags: ["Recursive Learning", "Unlimited Connections", "Always On"],
      url: "https://aegent.akakai.com",
    },
    {
      num: "03",
      name: "EMAIL",
      subtitle: "Autonomous Email Agent",
      desc: "Integrates directly with Gmail and Outlook, drafting autonomous email replies without prompts or commands. It reads, understands, and responds.",
      tags: ["Gmail", "Outlook", "Calendar", "Cognitive Context"],
      url: "https://email.akakai.com",
    },
  ];

  return (
    <section id="products" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="01">Products</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-headline text-white mb-4">
          What we&apos;ve built.
        </h2>
        <p className="text-body-lg text-muted mb-section max-w-xl">
          Many products. One conviction. Agents that understand, decide, and act.
        </p>
      </RevealBlock>

      {products.map((product, i) => (
        <RevealBlock key={product.name} delay={0.15 * i}>
          <div className="border-t border-line group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid py-12 lg:py-16">
              <div className="lg:col-span-1">
                <span className="text-micro text-dim">{product.num}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-white uppercase tracking-tight leading-none mb-2">
                  {product.name}<span className="text-dim">.</span>
                </h3>
                <p className="text-caption uppercase text-muted mt-3">{product.subtitle}</p>
              </div>
              <div className="lg:col-span-1" />
              <div className="lg:col-span-4">
                <p className="text-body-lg text-muted mb-6">{product.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {product.tags.map(t => (
                    <span key={t} className="text-micro uppercase text-dim border border-line px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 flex lg:items-center lg:justify-end">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-caption uppercase text-white border border-white/20 px-5 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Visit <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      ))}
    </section>
  );
}

function InvestmentsSection() {
  return (
    <section className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="05">Investments</GridLabel>

      </RevealBlock>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid">
        <RevealBlock className="lg:col-span-6" delay={0.1}>
          <h2 className="text-headline text-white mb-8">
            Backing the<br />next wave.
          </h2>
          <p className="text-body-lg text-muted mb-8">
            akakAI is building the infrastructure for autonomous AI action.
            Early, intentional, and moving fast.
          </p>
          <a
            href="mailto:investments@akakai.com"
            className="inline-flex items-center gap-3 text-caption uppercase text-white border border-white/20 px-6 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            investments@akakai.com <ArrowUpRight size={12} />
          </a>
        </RevealBlock>
        <div className="lg:col-span-1" />
        <RevealBlock className="lg:col-span-5" delay={0.2}>
          <div className="border-l border-line pl-grid">
            <p className="text-micro uppercase text-dim mb-4">Press Release</p>
            <h3 className="text-subhead text-white mb-4">
              akakAI Secures Pre-Seed Funding
            </h3>
            <p className="text-body-lg text-muted mb-4">
              Valued at $1.5 million. Founded by Zayd Malik.
              First product: an AI email agent that integrates directly
              with Gmail and Outlook.
            </p>
            <div className="flex gap-8 mt-8">
              <div>
                <p className="text-micro uppercase text-dim mb-1">Valuation</p>
                <p className="text-subhead text-white font-bold">$1.5M</p>
              </div>
              <div>
                <p className="text-micro uppercase text-dim mb-1">Stage</p>
                <p className="text-subhead text-white font-bold">Pre-Seed</p>
              </div>
              <div>
                <p className="text-micro uppercase text-dim mb-1">Date</p>
                <p className="text-subhead text-white font-bold">Jul 2025</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    { label: "General", email: "hello@akakai.com", desc: "Product, partnership, and general" },
    { label: "Press", email: "media@akakai.com", desc: "Media, stories, and interviews" },
    { label: "Investors", email: "investments@akakai.com", desc: "Funding and strategic partners" },
  ];

  return (
    <section id="contact" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="06">Contact</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-display text-white uppercase mb-section">
          LET&apos;S<br />TALK<span className="text-dim">.</span>
        </h2>
      </RevealBlock>

      <Ruled />

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {contacts.map((c, i) => (
          <RevealBlock key={c.label} delay={0.1 * i} className="border-r border-line last:border-r-0 py-12 pr-grid">
            <p className="text-micro uppercase text-dim mb-4">{c.label}</p>
            <a href={`mailto:${c.email}`} className="text-subhead text-white hover:underline underline-offset-4 block mb-3">
              {c.email}
            </a>
            <p className="text-body-lg text-muted">{c.desc}</p>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

function HiringStrip() {
  return (
    <section className="border-t border-line">
      <RevealBlock>
        <div className="px-grid py-section grid grid-cols-1 lg:grid-cols-12 gap-grid items-center">
          <div className="lg:col-span-7">
            <h2 className="text-headline text-white">
              Build what comes after passive AI.
            </h2>
          </div>
          <div className="lg:col-span-1" />
          <div className="lg:col-span-4">
            <p className="text-body-lg text-muted mb-6">
              If you believe AI should move first and deliver without hand-holding, we want to talk.
            </p>
            <a
              href="mailto:media@akakai.com"
              className="inline-flex items-center gap-3 text-caption uppercase text-black bg-white px-6 py-4 hover:bg-white/90 transition-all duration-300"
            >
              Get in touch <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-grid py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Image src="/logo-horizontal.png" alt="akakAI" width={80} height={20}
            style={{ filter: "brightness(0) invert(1)" }} className="h-4 w-auto opacity-40" />
          <span className="text-micro uppercase text-dim">2026</span>
        </div>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-dim hover:text-white transition-colors duration-300" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function CompanyPage() {
  return (
    <main className="bg-surface min-h-screen page-scroll overflow-y-auto scroll-smooth">
      <NavBar />

      <HeroSection />
      <TickerStrip />
      <ProductsSection />
      <AboutSection />
      <MissionSection />
      <TeamSection />
      <InvestmentsSection />
      <HiringStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
