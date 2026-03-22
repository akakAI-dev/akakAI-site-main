"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Youtube, Instagram, Twitter, ChevronDown } from "lucide-react";

type Tab = "about" | "mission" | "team" | "investments";

/* ── Scroll-reveal ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  root,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  root: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05, root: root.current }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [root]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Section wrapper — adds divider above every section except first ── */
function Section({
  children,
  first = false,
  root,
  delay = 0,
}: {
  children: React.ReactNode;
  first?: boolean;
  root: React.RefObject<HTMLDivElement | null>;
  delay?: number;
}) {
  return (
    <Reveal root={root} delay={delay} className={`py-14 ${first ? "" : "border-t border-gray-100"}`}>
      {children}
    </Reveal>
  );
}

/* ── Hiring CTA ── */
function HiringCTA({ root }: { root: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Reveal root={root} delay={60} className="border-t border-gray-100 py-14">
      <div className="border border-gray-200 rounded-xl p-10">
        <p className="text-[14px] uppercase tracking-[0.18em] text-gray-400 mb-5">🚀 We're Hiring</p>
        <h3 className="text-[34px] text-gray-900 leading-tight mb-4" style={{ fontWeight: 500 }}>
          Build what comes after passive AI.
        </h3>
        <p className="text-[18px] text-gray-500 leading-[1.75] mb-8 max-w-lg">
          If you believe AI should move first, think independently, and deliver without hand-holding — we want to talk.
        </p>
        <a href="#" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-[14px] hover:bg-gray-700 transition-colors">
          Get in touch <ArrowUpRight size={14} />
        </a>
      </div>
    </Reveal>
  );
}

/* ── Black pill section label ── */
function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-8 ${className}`}>
      <span className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-[11px] uppercase tracking-[0.18em] px-4 py-1.5 rounded-full">
        {children}
      </span>
    </div>
  );
}

/* ── Hover card ── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${className} transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}>
      {children}
    </div>
  );
}

/* ── Collapsible press entry ── */
function PressEntry({
  title,
  date,
  location,
  children,
}: {
  title: string;
  date: string;
  location: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between p-8 text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-2">Press Release</p>
          <h3 className="text-[22px] text-gray-900 leading-tight" style={{ fontWeight: 500 }}>{title}</h3>
        </div>
        <div className="flex items-center gap-6 ml-8 flex-none">
          <div className="text-right">
            <p className="text-[13px] text-gray-400">{location}</p>
            <p className="text-[13px] text-gray-400">{date}</p>
          </div>
          <ChevronDown
            size={18}
            className="text-gray-400 transition-transform duration-300 flex-none"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <div
        style={{
          maxHeight: open ? "2000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div className="px-8 pb-8 border-t border-gray-100 pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "mission", label: "Mission" },
    { id: "team", label: "Team" },
    { id: "investments", label: "Investments" },
  ];

  const socials = [
    { href: "https://www.youtube.com/@real.akakAI", icon: <Youtube size={16} />, label: "YouTube" },
    { href: "https://www.instagram.com/real.akakai/", icon: <Instagram size={16} />, label: "Instagram" },
    { href: "https://x.com/real_akakAI", icon: <Twitter size={16} />, label: "X" },
  ];

  return (
    <div className="fixed inset-[10px] rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">

      {/* NAV */}
      <nav className="flex-none flex items-center justify-between px-8 h-[56px] border-b border-gray-100">
        <Image src="/logo-horizontal.png" alt="akakAI" width={120} height={30}
          style={{ filter: "invert(1) brightness(0)" }} className="h-6 w-auto" priority />
        <div className="flex items-center gap-8 text-[14px] text-gray-500">
          {tabs.map((t) => (
            <button key={t.id}
              onClick={() => { setActiveTab(t.id); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`transition-colors duration-150 ${activeTab === t.id ? "text-gray-900" : "hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
          <span className="text-gray-200">|</span>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800 transition-colors duration-150" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </nav>

      {/* SCROLLABLE BODY */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto page-scroll" style={{ scrollbarGutter: "stable" }}>

        {/* HERO */}
        <div className="px-8 border-b border-gray-100 flex items-stretch min-h-[220px]">
          {/* Badge logo — with right border */}
          <div className="flex-none flex items-center pr-10 py-10 border-r border-gray-100 mr-10">
            <Image src="/logo-badge.png" alt="akakAI badge" width={240} height={240}
              style={{ filter: "invert(1)" }} className="w-[200px] h-[200px] object-contain" />
          </div>
          {/* Hero text */}
          <div className="flex-1 flex flex-col justify-center py-10">
            <p className="text-[14px] uppercase tracking-[0.18em] text-gray-400 mb-5">
              {activeTab === "about" ? "Company Overview" : activeTab === "mission" ? "Our Mission" : activeTab === "team" ? "The Team" : "Investments"}
            </p>
            <h1 className="text-[62px] leading-[1.0] tracking-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
              {activeTab === "about" && <>AI that acts,<br /><span className="text-gray-300">not just reacts.</span></>}
              {activeTab === "mission" && <>Action is the<br /><span className="text-gray-300">default.</span></>}
              {activeTab === "team" && <>The people<br /><span className="text-gray-300">building it.</span></>}
              {activeTab === "investments" && <>Backing the<br /><span className="text-gray-300">next wave.</span></>}
            </h1>
            <p className="text-[19px] text-gray-500 leading-[1.7] max-w-2xl">
              {activeTab === "about" && "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes — with minimal human intervention."}
              {activeTab === "mission" && "Close the gap between intention and execution. Every system we build pushes toward one thing: AI that makes action the rule, not the exception."}
              {activeTab === "team" && "akakAI was started with a simple conviction. Here's the team putting in the work to prove it."}
              {activeTab === "investments" && "akakAI is building the infrastructure for autonomous AI action. For investment inquiries, reach us at investments@akakai.com."}
            </p>
          </div>
        </div>

        {/* ═══ ABOUT ═══ */}
        {activeTab === "about" && (
          <div className="px-8">
            <Section first root={scrollRef}>
              <SectionLabel>🏗️ What We Are</SectionLabel>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h2 className="text-[32px] leading-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                    A new class of intelligent systems.
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    akakAI is building AI agents that don't just respond to instructions — they think independently, take initiative, and execute tasks with purpose. Not assistants. Not autocomplete. Agents.
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    These are entities that understand what needs to happen, decide how to make it happen, and then do it — operating at a level of autonomy that changes what's possible.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    They navigate real-world complexity, make informed decisions without hand-holding, and carry out objectives from start to finish with minimal oversight.
                  </p>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <div className="border-l-2 border-gray-200 pl-8 py-2">
                <p className="text-[26px] text-gray-900 leading-[1.4]" style={{ fontWeight: 400 }}>
                  "AI shouldn't wait for direction — it should anticipate, adapt, and act."
                </p>
                <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mt-5">The core belief driving everything we build</p>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>⚙️ What Our Agents Do</SectionLabel>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🧠", label: "Independent Thinking", desc: "Real reasoning — not pattern-matching. Our agents decompose goals, weigh options, and find the right path even when the instructions stop short of telling them how." },
                  { emoji: "⚡", label: "Initiative", desc: "They move first. When there's work to be done, the agent doesn't wait for a signal. It identifies what's needed, builds a plan, and starts — without asking for permission." },
                  { emoji: "🎯", label: "Goal Execution", desc: "The distance between a stated objective and a real-world outcome is where most AI falls apart. Our agents bridge it — end-to-end, from the first step to the final delivery." },
                  { emoji: "🌐", label: "Cross-System Coordination", desc: "The work of the world spans dozens of tools, APIs, and platforms. Our agents coordinate across every system they need to, simultaneously, without losing the thread." },
                  { emoji: "🛡️", label: "Judgment Under Uncertainty", desc: "Plans break. Conditions change. The real test of an intelligent system is what it does when the world doesn't cooperate — and ours make the right call without escalating." },
                  { emoji: "📈", label: "Natural Scaling", desc: "More complexity doesn't mean more humans. Our agents compound in capability as scope grows — handling more, deciding more, without the overhead that comes with scaling teams." },
                ].map((c, i) => (
                  <Reveal key={i} root={scrollRef} delay={i * 40}>
                    <Card className="bg-gray-50 rounded-xl p-7 cursor-default">
                      <div className="text-2xl mb-4">{c.emoji}</div>
                      <p className="text-[17px] text-gray-900 mb-3" style={{ fontWeight: 500 }}>{c.label}</p>
                      <p className="text-[16px] text-gray-500 leading-[1.75]">{c.desc}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>🔬 The Technology</SectionLabel>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h2 className="text-[28px] leading-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                    Built from first principles for autonomous execution.
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    akakAI's technology is not a chatbot with extra steps. It's a purpose-built architecture designed from the ground up around a single question: what does a system need in order to act, not just respond?
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    The answer requires more than a better model. Goal comprehension. Dynamic planning. Real-time adaptation. Multi-system coordination. We've built each layer deliberately — as the core of what these agents are, not features bolted on top.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    The result: agents that become active participants in how work gets done, pushing through to completion without constant direction.
                  </p>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>💡 What We Believe</SectionLabel>
              <p className="text-[17px] text-gray-500 leading-[1.75] mb-8 max-w-2xl">
                Six ideas that cut through the noise. Not mission statements — operating principles that shape every decision we make.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🚫", text: "AI shouldn't wait for direction" },
                  { emoji: "🏃", text: "Move first, iterate faster" },
                  { emoji: "🔧", text: "Capability over complexity" },
                  { emoji: "🎯", text: "Outcomes, not just outputs" },
                  { emoji: "✂️", text: "Strip the gimmicks" },
                  { emoji: "⚡", text: "Action is the default" },
                ].map((b) => (
                  <span key={b.text} className="text-[15px] text-gray-600 border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-2 hover:border-gray-400 hover:text-gray-900 cursor-default transition-colors duration-150">
                    <span>{b.emoji}</span>{b.text}
                  </span>
                ))}
              </div>
            </Section>

            <HiringCTA root={scrollRef} />
          </div>
        )}

        {/* ═══ MISSION ═══ */}
        {activeTab === "mission" && (
          <div className="px-8">
            <Section first root={scrollRef}>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <SectionLabel>🎯 The Mission</SectionLabel>
                  <h2 className="text-[34px] leading-[1.2] text-gray-900 mb-7" style={{ fontWeight: 500 }}>
                    "Make action the default, not the exception."
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    We exist at the intersection of ambition and execution — building the systems that let ideas become outcomes without the human bottleneck that kills most of them.
                  </p>
                </div>
                <div className="pt-14">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    No intermediary. No endless iteration. No prompting. Just outcomes — delivered by agents that understand what matters and move without being told twice.
                  </p>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>💭 What We Believe</SectionLabel>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🌊", heading: "We are at an inflection point.", body: "Every decade, a new computing paradigm shifts what's possible. The internet connected information. Mobile connected people. AI is connecting intent to action — and we are at the very beginning of understanding what that means. akakAI exists to push that frontier forward, deliberately and without compromise." },
                  { emoji: "⚡", heading: "Passivity is a design choice — and the wrong one.", body: "The dominant model of AI today is reactive: you ask, it answers. You prompt, it generates. You iterate endlessly until the output is close enough. This is not intelligence — this is sophisticated autocomplete with a better interface. We chose differently. Our agents own objectives, not just respond to them." },
                  { emoji: "🔭", heading: "The gap between intention and execution is where potential dies.", body: "Most organizations have more good ideas than capacity to execute. Not because people aren't capable — but because the translation layer between knowing what needs to be done and actually doing it is slow, lossy, and human-bottlenecked. akakAI's mission is to eliminate that bottleneck entirely. Not reduce it. Eliminate it." },
                  { emoji: "🏗️", heading: "Autonomy is not a feature. It's the foundation.", body: "You can't bolt autonomy onto a system built for passivity. It requires rethinking the architecture from first principles — how an agent understands goals, how it reasons about context, when it acts and when it pauses. This is what we've built from the ground up. Every layer designed for independent, purposeful execution." },
                ].map((b, i) => (
                  <Reveal key={i} root={scrollRef} delay={i * 50}>
                    <Card className="bg-gray-50 rounded-xl p-8 cursor-default">
                      <div className="text-2xl mb-4">{b.emoji}</div>
                      <p className="text-[18px] text-gray-900 mb-5 leading-snug" style={{ fontWeight: 500 }}>{b.heading}</p>
                      <p className="text-[16px] text-gray-500 leading-[1.8]">{b.body}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>🧭 Four Principles</SectionLabel>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "👁️", word: "Anticipate", desc: "The most powerful move isn't reacting — it's already being in motion before the problem is named. Our agents see what's coming and act before anyone asks." },
                  { emoji: "🔄", word: "Adapt", desc: "The world doesn't hold still. Conditions change, systems fail, goals shift. Agents that can only follow scripts break the moment reality deviates from the plan. Ours don't." },
                  { emoji: "✅", word: "Act", desc: "Thinking without doing is just noise. Our agents close the loop — from high-level intent to real-world outcome, without waiting for permission, clarification, or a next step." },
                  { emoji: "📡", word: "Scale", desc: "Human attention is finite. Intelligent action shouldn't be. As complexity grows, the agents grow with it — compounding capability without compounding cost or headcount." },
                ].map((p, i) => (
                  <Reveal key={i} root={scrollRef} delay={i * 50}>
                    <Card className="border border-gray-100 rounded-xl p-8 cursor-default">
                      <div className="text-2xl mb-4">{p.emoji}</div>
                      <p className="text-[32px] text-gray-900 mb-4" style={{ fontWeight: 500 }}>{p.word}</p>
                      <p className="text-[16px] text-gray-500 leading-[1.8]">{p.desc}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>🌊 The Next Wave</SectionLabel>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h2 className="text-[28px] leading-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                    This is what the next generation of AI looks like.
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    The first wave of AI gave us better search, smarter recommendations, and generated content. Useful — but fundamentally reactive. The second wave brought conversational interfaces. Still reactive. You had to ask. You had to prompt.
                  </p>
                </div>
                <div className="pt-14">
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    The third wave — the one akakAI is building into — is agentic. It doesn't wait to be asked. It understands what needs to happen, builds the plan, executes the steps, and reports back when it's done. This is the wave that changes how organizations operate at a fundamental level.
                  </p>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>🚫 What akakAI Is Not</SectionLabel>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "💬", label: "A chatbot", desc: "Chatbots respond. Agents act. The architecture, the intent, and the outcome are entirely different." },
                  { emoji: "📝", label: "A workflow tool", desc: "We don't need pre-built workflows. The agent figures out the steps, adapts when they fail, and finds a way regardless." },
                  { emoji: "🎠", label: "An AI wrapper", desc: "Purpose-built for autonomous execution from the ground up — not a UI layer or another chatbot with a new coat of paint." },
                  { emoji: "🎪", label: "A hype product", desc: "No buzzwords, no fundraising theater. Just agents that work — reliably, independently, in the real world with real stakes." },
                ].map((item, i) => (
                  <Reveal key={i} root={scrollRef} delay={i * 40}>
                    <Card className="border border-gray-100 rounded-xl p-8 cursor-default">
                      <div className="text-2xl mb-4">{item.emoji}</div>
                      <p className="text-[18px] text-gray-300 line-through mb-4">{item.label}</p>
                      <p className="text-[16px] text-gray-500 leading-[1.8]">{item.desc}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Section>

            <HiringCTA root={scrollRef} />
          </div>
        )}

        {/* ═══ TEAM ═══ */}
        {activeTab === "team" && (
          <div className="px-8">
            {/* Zayd */}
            <Section first root={scrollRef}>
              <div className="grid grid-cols-[2fr_3fr] gap-8">
                <div>
                  <div className="mb-8">
                    <Image src="/zayd.png" alt="Zayd Malik" width={96} height={96}
                      className="w-24 h-24 rounded-full object-cover object-top" />
                  </div>
                  <p className="text-[14px] uppercase tracking-[0.18em] text-gray-400 mb-4">Co-founder & CEO</p>
                  <h2 className="text-[42px] leading-none text-gray-900 mb-3" style={{ fontWeight: 500 }}>Zayd Malik</h2>
                  <p className="text-[14px] text-gray-400 mb-8 uppercase tracking-[0.12em]">akakAI</p>
                  <p className="text-[22px] text-gray-900 leading-[1.4] mb-8" style={{ fontWeight: 400 }}>
                    "AI should act, not just react."
                  </p>
                  <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400">The conviction that started it all</p>
                </div>
                <div className="flex flex-col justify-center border-l border-gray-200 pl-8">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    Zayd started akakAI with a simple but uncomfortable observation: the AI tools people were using were passive. They waited. They asked for input. They responded. They never moved first.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    Frustrated with passive tools and overhyped tech, he set out to build something fundamentally different — AI that takes initiative, understands context, and actually follows through.
                  </p>
                </div>
              </div>
            </Section>

            {/* Abhiram */}
            <Section root={scrollRef} delay={60}>
              <div className="grid grid-cols-[2fr_3fr] gap-8">
                <div>
                  <div className="mb-8">
                    <Image src="/abhi.jpg" alt="Abhiram Vishnubhotla" width={96} height={96}
                      className="w-24 h-24 rounded-full object-cover object-top" />
                  </div>
                  <p className="text-[14px] uppercase tracking-[0.18em] text-gray-400 mb-4">Co-founder & Agent Developer</p>
                  <h2 className="text-[42px] leading-none text-gray-900 mb-3" style={{ fontWeight: 500 }}>Abhiram Vishnubhotla</h2>
                  <p className="text-[14px] text-gray-400 mb-8 uppercase tracking-[0.12em]">akakAI</p>
                  <p className="text-[22px] text-gray-900 leading-[1.4] mb-8" style={{ fontWeight: 400 }}>
                    "Agents that don't just execute — they understand."
                  </p>
                  <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-6">The engineering behind the autonomy</p>
                  <a
                    href="https://abhiramv09.replit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-gray-500 border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors duration-150 w-fit"
                  >
                    🌐 abhiramv09.replit.app <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className="flex flex-col justify-center border-l border-gray-200 pl-8">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    Abhiram brings the technical depth to turn akakAI's vision into working systems. His focus is on the hardest problem in the space: building agents that don't just run through steps, but genuinely reason about what needs to happen next.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    He architects the core agent runtime — the layer responsible for goal comprehension, dynamic planning, and real-time decision-making across complex, multi-system environments.
                  </p>
                </div>
              </div>
            </Section>

            {/* Approach */}
            <Section root={scrollRef} delay={60}>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <SectionLabel>🔬 The Approach</SectionLabel>
                  <h2 className="text-[28px] leading-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                    Capability over complexity — always.
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    Strip away the gimmicks. Focus on core functionality. Build agents that understand goals, take action without micromanagement, and deliver real results in dynamic environments.
                  </p>
                </div>
                <div className="pt-14">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                    No trends, no noise. Just AI that works with you and for you — reliably, autonomously, at the level of complexity that real work actually demands.
                  </p>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    This philosophy drives every product decision at akakAI: if it doesn't make the agent more capable or more autonomous, it doesn't ship.
                  </p>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>💡 What Drives This</SectionLabel>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🔍", title: "The Problem", text: "Passive tools, overhyped AI, systems that wait for input instead of taking initiative. The gap between what AI promised and what it delivered." },
                  { emoji: "🔭", title: "The Vision", text: "Agents that take initiative, understand context, and follow through from start to finish. AI that makes action the default, not the exception." },
                  { emoji: "📏", title: "The Standard", text: "No trends, no noise. Just AI that works reliably — without getting in the way, without needing a prompt for every decision." },
                  { emoji: "🏁", title: "The Goal", text: "Close the gap between what you want done and what gets done. Permanently. Without the intermediary layer that slows everything down." },
                ].map((item, i) => (
                  <Reveal key={i} root={scrollRef} delay={i * 40}>
                    <Card className="bg-gray-50 rounded-xl p-7 cursor-default">
                      <div className="text-2xl mb-4">{item.emoji}</div>
                      <p className="text-[16px] text-gray-900 mb-3" style={{ fontWeight: 500 }}>{item.title}</p>
                      <p className="text-[16px] text-gray-500 leading-[1.8]">{item.text}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel className="mb-6">🏷️ The Team in Tags</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🚫", text: "Anti-hype" },
                  { emoji: "⚡", text: "Action-first" },
                  { emoji: "🧠", text: "Systems thinkers" },
                  { emoji: "🎯", text: "Capability over complexity" },
                  { emoji: "🔧", text: "Builders" },
                  { emoji: "✂️", text: "No gimmicks" },
                ].map((tag) => (
                  <span key={tag.text} className="text-[14px] text-gray-500 border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-2 hover:border-gray-400 hover:text-gray-800 cursor-default transition-colors duration-150">
                    <span>{tag.emoji}</span>{tag.text}
                  </span>
                ))}
              </div>
            </Section>

            <HiringCTA root={scrollRef} />
          </div>
        )}

        {/* ═══ INVESTMENTS ═══ */}
        {activeTab === "investments" && (
          <div className="px-8">
            <Section first root={scrollRef}>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <SectionLabel>📬 Investment Inquiries</SectionLabel>
                  <h2 className="text-[32px] leading-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                    Interested in backing the next wave?
                  </h2>
                  <p className="text-[18px] text-gray-600 leading-[1.8]">
                    akakAI is building the infrastructure for autonomous AI action — agents that think independently, take initiative, and deliver outcomes without hand-holding.
                  </p>
                </div>
                <div className="pt-14">
                  <p className="text-[18px] text-gray-600 leading-[1.8] mb-8">
                    We're early, intentional, and moving fast. If you're interested in partnering with us on this mission, we'd love to connect.
                  </p>
                  <a href="mailto:investments@akakai.com"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-[14px] hover:bg-gray-700 transition-colors">
                    investments@akakai.com <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </Section>

            <Section root={scrollRef} delay={60}>
              <SectionLabel>📰 Press</SectionLabel>
              <div className="space-y-4">
                <PressEntry
                  title="akakAI Secures Pre-Seed Funding, Valued at $1.5 Million"
                  date="July 7, 2025"
                  location="Dallas, TX"
                >
                  <div className="space-y-6">
                    <p className="text-[17px] text-gray-600 leading-[1.85]">
                      akakAI, the AI startup building autonomous agents that proactively get work done, announced today that it has secured a pre-seed funding round from an undisclosed investor, bringing the company's valuation to <span className="text-gray-900" style={{ fontWeight: 500 }}>$1.5 million</span>.
                    </p>
                    <p className="text-[17px] text-gray-600 leading-[1.85]">
                      Founded by Zayd Malik, akakAI's first product is an AI email agent that integrates directly with Gmail and Outlook, drafting email replies autonomously without requiring prompts, commands, or a separate app. The funding marks an early vote of confidence in the company's vision of replacing passive tools with proactive, task-completing agents.
                    </p>
                    <div className="border-l-2 border-gray-200 pl-6 py-1">
                      <p className="text-[18px] text-gray-700 leading-[1.7] italic">
                        "This investment allows us to deepen our technical capabilities and grow our team as we continue building agents that work for people, not just with them. We're grateful for the backing and belief in our mission to redefine productivity through agentic AI."
                      </p>
                      <p className="text-[13px] text-gray-400 mt-3 uppercase tracking-[0.12em]">— Zayd Malik, Founder, akakAI</p>
                    </div>
                    <p className="text-[17px] text-gray-600 leading-[1.85]">
                      akakAI officially launched on July 3, 2025, and is currently onboarding early users.
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-2">Website</p>
                        <a href="https://akakai.com" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors">akakai.com</a>
                      </div>
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mb-2">Media Contact</p>
                        <a href="mailto:media@akakai.com" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors">media@akakai.com</a>
                      </div>
                    </div>
                  </div>
                </PressEntry>
              </div>
            </Section>

            <HiringCTA root={scrollRef} />
          </div>
        )}

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-8 py-6 flex items-center justify-between">
          <Image src="/logo-horizontal.png" alt="akakAI" width={80} height={20}
            style={{ filter: "invert(1) brightness(0)" }} className="h-5 w-auto opacity-20" />
          <div className="flex items-center gap-7 text-[13px] text-gray-400">
            <a href="mailto:investments@akakai.com" className="hover:text-gray-600 transition-colors">Investments</a>
            <a href="mailto:media@akakai.com" className="hover:text-gray-600 transition-colors">Press</a>
            <span className="text-gray-200">|</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
            <span className="text-gray-200">|</span>
            <span>© 2026 akakAI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
