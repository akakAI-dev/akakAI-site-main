"use client";

import { useRef, useState, useEffect } from "react";
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
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const heroImages = [
  'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=80',
  'https://images.unsplash.com/photo-1635776063328-153b13e3c245?q=80&w=1632'
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen w-screen flex flex-col justify-between px-grid pt-6 pb-grid relative overflow-hidden">
      {/* Background image carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              idx === currentImageIndex ? 'opacity-20' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-full">
          <motion.h1
            className="text-display uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sr-only">akakAI — </span>AUTONOMOUS
          </motion.h1>
          <motion.h1
            className="text-display uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            INTELLIGENCE<span className="text-muted">.</span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-12 max-w-xl aeo-speakable"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-body-lg text-text-secondary leading-relaxed">
            AI is finally worth the hype. We build for a world where
            software moves first — anticipating, adapting, acting —
            instead of waiting around to be told what to do.
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
          <span className="text-micro uppercase text-dim">Research Lab</span>
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
  const items = ["ANTICIPATE", "ADAPT", "ACT", "DIVERGE", "ANTICIPATE", "ADAPT", "ACT", "DIVERGE"];
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
            The AI you<br />were<br />promised.
          </h2>
        </RevealBlock>
        <div className="lg:col-span-1" />
        <RevealBlock className="lg:col-span-6" delay={0.2}>
          <p className="text-body-lg text-text-secondary mb-6">
            akakAI is a research lab, but nothing ships here as a paper.
            Everything we build is a product — live, in the world, doing
            real work right now.
          </p>
          <p className="text-body-lg text-text-secondary mb-6">
            Aegent gives your business its own AI workforce — autonomous
            workers that never sleep, learn as they go, and finish tasks
            without being told. Optimal plugs you into every frontier AI
            through a single chat — ChatGPT, Claude, Gemini and more,
            with the best one picked for each question, automatically.
          </p>
          <p className="text-body-lg text-text-secondary">
            Same conviction behind both: AI you wield. Not AI you wrestle.
          </p>
        </RevealBlock>
      </div>

      <RevealBlock delay={0.3} className="mt-section">
        <Ruled className="mb-16" />
        <div className="max-w-4xl">
          <blockquote className="text-headline text-white italic leading-tight mb-8">
            &ldquo;AI you wield.
            Not AI you wrestle.&rdquo;
          </blockquote>
          <p className="text-caption uppercase text-dim">
            — The core belief driving every system we build
          </p>
        </div>
      </RevealBlock>
    </section>
  );
}

function MissionSection() {
  const principles = [
    { word: "ANTICIPATE", num: "I", desc: "Already in motion before the problem is named." },
    { word: "ADAPT", num: "II", desc: "Conditions change. Our minds don't break." },
    { word: "ACT", num: "III", desc: "Thinking without doing is noise." },
    { word: "DIVERGE", num: "IV", desc: "Many minds in parallel. No convergence required." },
  ];

  return (
    <section id="mission" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="03">Mission</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-headline text-white max-w-4xl mb-16">
          Make AI worth<br />the hype.
        </h2>
      </RevealBlock>

      <RevealBlock delay={0.2} className="mb-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid max-w-4xl">
          <p className="text-body-lg text-text-secondary">
            AI got exciting. Then it got exhausting — a dozen tools,
            four subscriptions, tabs full of copy-paste, prompt tricks
            you have to Google. We&apos;re building the fix.
          </p>
          <p className="text-body-lg text-text-secondary">
            A workforce that runs itself. Every frontier AI in one chat.
            Two products, both live — built on the same wild idea:
            AI should just work.
          </p>
        </div>
      </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {principles.map((p, i) => (
          <RevealBlock key={p.word} delay={0.1 * i}>
            <div className="box-highlight px-6 py-12 h-full flex flex-col">
              <span className="text-micro text-dim block mb-6">{p.num}</span>
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white uppercase tracking-tight mb-4 flex-1">
                {p.word}
              </h3>
              <p className="text-body-lg text-text-secondary">{p.desc}</p>
            </div>
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
      img: "/zayd.jpg",
      objectPosition: "50% 65%",
      quote: "To reach the limits of the possible, you must try the impossible.",
      bio: "Zayd didn't start akakAI because AI was exciting. He started it because it was disappointing. They waited. They asked for input. They responded. They never moved first.",
    },
    {
      name: "Abhiram Vishnubhotla",
      role: "Agent Developer",
      img: "/abhi.jpg",
      objectPosition: "50% 15%",
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
        <h2 className="text-headline text-white mb-12">
          The people<br />building it.
        </h2>
      </RevealBlock>

      <div className="space-y-5">
        {team.map((person, i) => (
          <RevealBlock key={person.name} delay={0.1 * i}>
            <div className="box-highlight py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-grid items-start">
              <div className="lg:col-span-2">
                <Image
                  src={person.img}
                  alt={person.name}
                  width={120}
                  height={120}
                  style={{ objectPosition: person.objectPosition }}
                  className="w-20 h-20 lg:w-full lg:h-auto aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="lg:col-span-4">
                <p className="text-micro uppercase text-dim mb-3">{person.role}</p>
                <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white tracking-tight mb-4">
                  {person.name}
                </h3>
                <p className="text-subhead text-white/90 italic">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>
              <div className="lg:col-span-1" />
              <div className="lg:col-span-5">
                <p className="text-body-lg text-text-secondary">{person.bio}</p>
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
      name: "AEGENT",
      subtitle: "Truly Autonomous AI Workers.",
      desc: "Give any role in your business its own AI worker. It clocks in 24/7, learns your business as it goes, and finishes real work — research, outreach, reports, follow-ups, whatever. Software that actually shows up. And the longer it runs, the sharper it gets.",
      tags: ["Clocks In 24/7", "Learns As It Goes", "Finishes Real Work"],
      url: "https://aegent.akakai.com",
    },
    {
      num: "02",
      name: "OPTIMAL",
      subtitle: "Every Frontier AI. One Chat.",
      desc: "Stop paying four AI subscriptions. Optimal puts ChatGPT, Claude, Gemini and every other frontier model in one chat, then instantly routes each question to whichever one answers best. Top-tier answers, near-unlimited messages, a fraction of the cost.",
      tags: ["Every Frontier Model", "Auto-Picks the Best", "Fraction of the Cost"],
      url: "https://optimal.akakai.com",
    },
  ];

  return (
    <section id="products" className="px-grid py-section border-t border-line">
      <RevealBlock>
        <GridLabel num="01">Products</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-headline text-white mb-4">
          Production<br />solutions.
        </h2>
        <p className="text-body-lg text-text-secondary mb-section max-w-xl">
          Two products, live in the wild. No demos, no waitlists — real
          software doing real work right now. Try either one.
        </p>
      </RevealBlock>

      <div className="space-y-4">
      {products.map((product, i) => (
        <RevealBlock className="border-0" key={product.name} delay={0.15 * i}>
          <div className="box-highlight group px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid">
              <div className="lg:col-span-1">
                <span className="text-micro text-dim">{product.num}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-white uppercase tracking-tight leading-none mb-2">
                  {product.name}<span className="text-dim">.</span>
                </h3>
                <p className="text-caption uppercase text-text-secondary mt-3">{product.subtitle}</p>
              </div>
              <div className="lg:col-span-1" />
              <div className="lg:col-span-4">
                <p className="text-body-lg text-text-secondary mb-6">{product.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {product.tags.map(t => (
                    <span key={t} className="text-micro uppercase text-text-secondary border border-line px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors">
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
                  className="inline-flex items-center gap-2 text-caption uppercase text-white border border-white/40 px-5 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Visit <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      ))}
      </div>
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
            Funding the<br />frontier.
          </h2>
          <p className="text-body-lg text-text-secondary mb-8">
            We&apos;re an AI lab already shipping products people use —
            and we&apos;re just warming up. Early, focused, moving fast.
            If that&apos;s the kind of company you want to back, let&apos;s
            talk.
          </p>
          <a
            href="mailto:investments@akakai.com"
            className="inline-flex items-center gap-3 text-caption uppercase text-white border border-white/20 px-6 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            investments@akakai.com <ArrowUpRight size={12} />
          </a>
        </RevealBlock>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "What is akakAI?",
      a: "akakAI is a research lab that ships. Not papers — products. Aegent is a workforce of AI workers that finish tasks on their own. Optimal is one chat with every frontier AI in it. Both live today. Founded 2025 in Dallas, Texas.",
    },
    {
      q: "What does akakAI actually do for a business?",
      a: "Two levers. Aegent gives your team dedicated AI workers that finish tasks without supervision — research, outreach, reports, follow-ups. Optimal collapses ChatGPT, Claude, Gemini and every other frontier AI into one chat that automatically picks the best one for each question. Less busywork. Less tool sprawl. Way more shipped.",
    },
    {
      q: "How is this different from ChatGPT or other AI assistants?",
      a: "ChatGPT is one model that waits for you to type. akakAI is two products in one lab: Aegent moves first and finishes work on its own. Optimal covers ChatGPT plus every other frontier AI in a single chat — automatically picking whichever answers best.",
    },
    {
      q: "What products does akakAI offer?",
      a: "Two, both live today. Aegent gives your business its own AI workforce — dedicated workers that clock in 24/7 and get sharper the longer they run. Optimal is one chat with every frontier AI in it — ChatGPT, Claude, Gemini and more — auto-picking the best one for each question. One bill, near-unlimited messages, a fraction of the cost.",
    },
    {
      q: "Who founded akakAI?",
      a: "Zayd Malik founded akakAI and serves as CEO. akakAI operates as an independent research lab out of Dallas, Texas.",
    },
    {
      q: "Where is akakAI headquartered?",
      a: "Dallas, Texas, United States. We serve customers worldwide.",
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-grid py-section border-t border-line"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <RevealBlock>
        <GridLabel num="06">Frequently Asked</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2
          id="faq-heading"
          className="text-headline text-white mb-16 aeo-speakable"
        >
          In plain terms.
        </h2>
      </RevealBlock>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <RevealBlock key={f.q} delay={0.05 * i}>
            <div
              className="box-highlight px-6 py-10 h-full flex flex-col aeo-speakable"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <span className="text-micro text-dim block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-subhead text-white mb-4"
                itemProp="name"
              >
                {f.q}
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className="flex-1"
              >
                <p
                  className="text-body-lg text-text-secondary"
                  itemProp="text"
                >
                  {f.a}
                </p>
              </div>
            </div>
          </RevealBlock>
        ))}
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
        <GridLabel num="07">Contact</GridLabel>
      </RevealBlock>

      <RevealBlock delay={0.1}>
        <h2 className="text-display text-white uppercase mb-section">
          LET&apos;S<br />TALK<span className="text-dim">.</span>
        </h2>
      </RevealBlock>

      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contacts.map((c, i) => (
          <RevealBlock key={c.label} delay={0.1 * i}>
            <div className="box-highlight px-6 py-12 h-full flex flex-col border-t border-line border-white">
              <p className="text-micro uppercase text-dim mb-4">{c.label}</p>
              <a href={`mailto:${c.email}`} className="text-subhead text-white hover:underline underline-offset-4 block mb-3 flex-1">
                {c.email}
              </a>
              <p className="text-body-lg text-text-secondary">{c.desc}</p>
            </div>
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
              Build AI worth shipping.
            </h2>
          </div>
          <div className="lg:col-span-1" />
          <div className="lg:col-span-4">
            <p className="text-body-lg text-text-secondary mb-6">
              If you&apos;d rather build the future than write about it,
              we want you. Engineers, researchers — send us something
              you&apos;ve made.
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
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
