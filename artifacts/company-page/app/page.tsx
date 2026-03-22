"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";

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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.06, root: root.current }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [root]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type Tab = "about" | "mission" | "team";

const capabilities = [
  { emoji: "🧠", label: "Independent Thinking", desc: "Real reasoning — not pattern-matching dressed up as intelligence. Our agents decompose goals, weigh options, and identify the right path even when the instructions stop short of telling them how." },
  { emoji: "⚡", label: "Initiative", desc: "They move first. When there's work to be done, the agent doesn't wait for a prompt or a signal. It identifies what's needed, builds a plan, and starts — without needing permission." },
  { emoji: "🎯", label: "Goal Execution", desc: "The distance between a stated objective and a real-world outcome is where most AI falls apart. Our agents bridge it — end-to-end, from the first step to the final delivery." },
  { emoji: "🌐", label: "Cross-System Coordination", desc: "The work of the world spans dozens of tools, APIs, and platforms. Our agents don't operate in silos — they coordinate across every system they need to, simultaneously, with purpose." },
  { emoji: "🛡️", label: "Judgment Under Uncertainty", desc: "Plans break. Conditions change. APIs fail. The real test of an intelligent system is what it does when the world doesn't cooperate — and ours make the right call without escalating to a human." },
  { emoji: "📈", label: "Natural Scaling", desc: "More complexity doesn't mean more humans. Our agents compound in capability as the scope grows — handling more, coordinating more, deciding more, without the overhead that comes with scaling teams." },
];

const principles = [
  { emoji: "👁️", word: "Anticipate", desc: "The most powerful move isn't reacting — it's already being in motion before the problem is named. Our agents see what's coming and act before anyone asks." },
  { emoji: "🔄", word: "Adapt", desc: "The world doesn't hold still. Conditions change, systems fail, goals shift. Agents that can only follow scripts break the moment reality deviates from the plan. Ours don't." },
  { emoji: "✅", word: "Act", desc: "Thinking without doing is just noise. Our agents close the loop — from high-level intent to real-world outcome, without waiting for permission, clarification, or a next step." },
  { emoji: "📡", word: "Scale", desc: "Human attention is finite. Intelligent action shouldn't be. As the complexity grows, the agents grow with it — compounding capability without compounding cost or headcount." },
];

const missionBeliefs = [
  {
    emoji: "🌊",
    heading: "We are at an inflection point.",
    body: "Every decade or so, a new computing paradigm shifts what's possible. The internet connected information. Mobile connected people. AI is connecting intent to action — and we are at the very beginning of understanding what that means. akakAI exists to push that frontier forward, deliberately and without compromise.",
  },
  {
    emoji: "⚡",
    heading: "Passivity is a design choice — and the wrong one.",
    body: "The dominant model of AI today is reactive: you ask, it answers. You prompt, it generates. You iterate endlessly until the output is close enough to what you wanted. This is not intelligence — this is sophisticated autocomplete with a better interface. We chose differently. Our agents are designed to own objectives, not just respond to them.",
  },
  {
    emoji: "🔭",
    heading: "The gap between intention and execution is where potential dies.",
    body: "Most organizations have more good ideas than they have capacity to execute. Not because people aren't capable — but because the translation layer between knowing what needs to be done and actually doing it is slow, lossy, and human-bottlenecked. akakAI's mission is to eliminate that bottleneck entirely. Not reduce it. Eliminate it.",
  },
  {
    emoji: "🏗️",
    heading: "Autonomy is not a feature. It's the foundation.",
    body: "You can't bolt autonomy onto a system built for passivity. It requires rethinking the architecture from first principles — how an agent understands goals, how it reasons about context, how it decides when to act and when to pause. This is what we've built from the ground up. Every layer is designed for independent, purposeful execution.",
  },
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "mission", label: "Mission" },
    { id: "team", label: "Team" },
  ];

  return (
    <div className="fixed inset-[10px] rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">

      {/* NAV */}
      <nav className="flex-none flex items-center justify-between px-6 h-[52px] border-b border-gray-100">
        <Image
          src="/logo-horizontal.png"
          alt="akakAI"
          width={120}
          height={30}
          style={{ filter: "invert(1) brightness(0)" }}
          className="h-7 w-auto"
          priority
        />
        <div className="flex items-center gap-7 text-[13px] font-medium text-gray-400">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`transition-colors ${activeTab === t.id ? "text-gray-900 font-semibold" : "hover:text-gray-700"}`}
            >
              {t.label}
            </button>
          ))}
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Sign In</a>
          <a href="#" className="bg-gray-900 text-white text-[13px] px-4 py-1.5 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* SCROLLABLE BODY */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto page-scroll">

        {/* HERO */}
        <div className="px-6 pt-10 pb-8 border-b border-gray-100">
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 border border-gray-200 text-gray-400 text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900 inline-block" />
              {activeTab === "about" ? "Company Overview" : activeTab === "mission" ? "Our Mission" : "The Team"}
            </span>
          </div>
          <h1 className="text-[58px] leading-[1.02] font-black tracking-tight text-gray-900 mb-5">
            {activeTab === "about" && <><span>AI that acts,</span><br /><span className="text-gray-200">not just reacts.</span></>}
            {activeTab === "mission" && <><span>Action is the</span><br /><span className="text-gray-200">default.</span></>}
            {activeTab === "team" && <><span>The people</span><br /><span className="text-gray-200">building it.</span></>}
          </h1>
          <p className="text-[16px] text-gray-400 font-medium max-w-2xl leading-relaxed">
            {activeTab === "about" && "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes — with minimal human intervention."}
            {activeTab === "mission" && "Close the gap between intention and execution. Every system we build pushes toward one thing: AI that makes action the rule, not the exception."}
            {activeTab === "team" && "akakAI was started with a simple conviction. Here's the team putting in the work to prove it."}
          </p>
        </div>

        {/* ═══ ABOUT ═══ */}
        {activeTab === "about" && (
          <div className="px-6 py-10 space-y-10">

            {/* What we are — black callout */}
            <Reveal root={scrollRef}>
              <div className="bg-gray-900 rounded-2xl p-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">🏗️ What We Are</p>
                <h2 className="text-[32px] font-black leading-tight tracking-tight mb-6">
                  A new class of intelligent systems.
                </h2>
                <p className="text-[16px] text-gray-300 leading-[1.85] font-medium mb-5">
                  akakAI is building AI agents that don&apos;t just respond to instructions — they think independently, take initiative, and execute tasks with purpose. Not assistants. Not autocomplete. Not interfaces. These are agents: entities that understand what needs to happen, decide how to make it happen, and then do it.
                </p>
                <p className="text-[16px] text-gray-300 leading-[1.85] font-medium">
                  They are fully capable systems built to navigate real-world complexity, make informed decisions without hand-holding, and carry out objectives from start to finish — operating at a level of autonomy that changes what&apos;s possible for the people and organizations that use them.
                </p>
              </div>
            </Reveal>

            {/* Core belief — inline black quote */}
            <Reveal root={scrollRef} delay={60}>
              <div className="border-l-4 border-gray-900 pl-7 py-3">
                <p className="text-[24px] font-black text-gray-900 leading-snug mb-3">
                  "AI shouldn&apos;t wait for direction — it should anticipate, adapt, and act."
                </p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">The core belief driving everything we build</p>
              </div>
            </Reveal>

            {/* Capabilities — 2 column */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">⚙️ What our agents do</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((c, i) => (
                  <Reveal key={i} delay={i * 40} root={scrollRef} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                    <div className="text-3xl mb-4">{c.emoji}</div>
                    <div className="text-[16px] font-black text-gray-900 mb-2">{c.label}</div>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{c.desc}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Technology — black callout */}
            <Reveal root={scrollRef} delay={60}>
              <div className="bg-gray-900 rounded-2xl p-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">🔬 The Technology</p>
                <h2 className="text-[28px] font-black leading-tight tracking-tight mb-6">
                  Built from first principles for autonomous execution.
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[15px] text-gray-300 leading-[1.85] font-medium mb-4">
                      akakAI&apos;s technology is not a chatbot with extra steps. It&apos;s a purpose-built architecture for agentic execution — designed from the ground up around a single question: what does a system need in order to act, not just respond?
                    </p>
                    <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                      The answer is more demanding than it sounds. Goal comprehension. Dynamic planning. Real-time adaptation. Multi-system coordination. Uncertainty handling. We&apos;ve built each of these layers deliberately — not as features bolted on top, but as the core of what these agents are.
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-300 leading-[1.85] font-medium mb-4">
                      The result is agents that become active participants in how work gets done — not tools you pick up and put down, but collaborators that understand the goal, track the progress, and push through to completion without constant direction.
                    </p>
                    <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                      Whether managing multi-step operations across dozens of systems, navigating edge cases that no one anticipated, or making judgment calls under real uncertainty — they act with coherence, autonomy, and purpose.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Belief pills */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">💡 What we believe</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🚫", text: "AI shouldn't wait for direction" },
                  { emoji: "🏃", text: "Move first, iterate faster" },
                  { emoji: "🔧", text: "Capability over complexity" },
                  { emoji: "🎯", text: "Outcomes, not just outputs" },
                  { emoji: "🧹", text: "Strip the gimmicks" },
                  { emoji: "⚙️", text: "Action is the default" },
                ].map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-[14px] font-semibold px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 transition-colors">
                    <span>{b.emoji}</span> {b.text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* ═══ MISSION ═══ */}
        {activeTab === "mission" && (
          <div className="px-6 py-10 space-y-10">

            {/* Opening declaration — black */}
            <Reveal root={scrollRef}>
              <div className="bg-gray-900 rounded-2xl p-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-6">🎯 The Mission</p>
                <p className="text-[36px] font-black text-white leading-[1.1] mb-8">
                  "Make action the default,<br />not the exception."
                </p>
                <p className="text-[16px] text-gray-300 leading-[1.85] font-medium mb-4">
                  We exist at the intersection of ambition and execution — building the systems that let ideas become outcomes without the human bottleneck that kills most of them. Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done.
                </p>
                <p className="text-[16px] text-gray-300 leading-[1.85] font-medium">
                  No intermediary. No endless iteration. No prompting. Just outcomes — delivered by agents that understand what matters and move without being told twice.
                </p>
              </div>
            </Reveal>

            {/* The four big beliefs — alternating black/white 2-col */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">💭 What we believe</p>
              <div className="grid grid-cols-2 gap-4">
                {missionBeliefs.map((b, i) => (
                  <Reveal key={i} delay={i * 60} root={scrollRef}
                    className={`rounded-2xl p-8 ${i % 2 === 0 ? "bg-gray-900 text-white" : "bg-gray-50 border border-gray-100"}`}>
                    <div className="text-3xl mb-5">{b.emoji}</div>
                    <h3 className={`text-[18px] font-black leading-snug mb-4 ${i % 2 === 0 ? "text-white" : "text-gray-900"}`}>
                      {b.heading}
                    </h3>
                    <p className={`text-[14px] leading-[1.85] font-medium ${i % 2 === 0 ? "text-gray-300" : "text-gray-500"}`}>
                      {b.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Principles — 2 column */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">🧭 Four principles we build toward</p>
              <div className="grid grid-cols-2 gap-4">
                {principles.map((p, i) => (
                  <Reveal key={i} delay={i * 50} root={scrollRef}
                    className={`rounded-xl p-7 ${i % 2 === 0 ? "bg-gray-900" : "border border-gray-100 bg-gray-50"}`}>
                    <div className="text-3xl mb-4">{p.emoji}</div>
                    <div className={`text-[22px] font-black mb-3 ${i % 2 === 0 ? "text-white" : "text-gray-900"}`}>{p.word}</div>
                    <div className={`text-[14px] leading-[1.8] font-medium ${i % 2 === 0 ? "text-gray-300" : "text-gray-500"}`}>{p.desc}</div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* The next wave — full-width black */}
            <Reveal root={scrollRef} delay={60}>
              <div className="bg-gray-900 rounded-2xl p-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-6">🌊 The Next Wave</p>
                <h3 className="text-[28px] font-black text-white leading-tight mb-6">
                  This is what the next generation of AI looks like.
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                    The first wave of AI gave us better search, smarter recommendations, and generated content. Useful — but fundamentally reactive. The second wave brought conversational interfaces. Still reactive. You had to ask. You had to prompt. You had to check.
                  </p>
                  <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                    The third wave — the one akakAI is building into — is agentic. It doesn&apos;t wait to be asked. It understands what needs to happen, builds the plan, executes the steps, and reports back when it&apos;s done. This is the wave that changes how organizations operate at a fundamental level.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* What we are not */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">🚫 What akakAI is not</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "💬", label: "A chatbot", desc: "Chatbots respond. Agents act. Chatbots wait. Agents move. The architecture, the intent, and the outcome are entirely different." },
                  { emoji: "📝", label: "A workflow tool", desc: "We don't need pre-built workflows. The agent figures out the steps, adapts when they fail, and finds a way to the outcome regardless." },
                  { emoji: "🎠", label: "An AI wrapper", desc: "Purpose-built for autonomous execution from the ground up. Not a UI layer, not a prompt manager, not another chatbot with a new coat of paint." },
                  { emoji: "🎪", label: "A hype product", desc: "No buzzwords, no fundraising theater, no impossible promises. Just agents that work — reliably, independently, in the real world with real stakes." },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-7">
                    <div className="text-3xl mb-4">{item.emoji}</div>
                    <div className="text-[16px] font-black text-gray-300 line-through decoration-gray-400 mb-3">{item.label}</div>
                    <div className="text-[14px] text-gray-500 leading-[1.8] font-medium">{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* ═══ TEAM ═══ */}
        {activeTab === "team" && (
          <div className="px-6 py-10 space-y-8">

            {/* Zayd header — black */}
            <Reveal root={scrollRef}>
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">👤 Founder</p>
                    <h2 className="text-[36px] font-black text-white tracking-tight leading-none">Zayd Malik</h2>
                    <p className="text-[13px] text-gray-400 font-medium mt-2">akakAI</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gray-700 flex items-center justify-center text-2xl font-black text-white flex-shrink-0">
                    Z
                  </div>
                </div>
                <div className="border-l-[3px] border-gray-500 pl-5">
                  <p className="text-[21px] font-black text-white leading-snug">
                    "AI should act, not just react."
                  </p>
                  <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">The conviction that started it all</p>
                </div>
              </div>
            </Reveal>

            {/* Story — 2 column */}
            <Reveal root={scrollRef} delay={60}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-7">
                  <div className="text-3xl mb-4">🧩</div>
                  <p className="text-[14px] text-gray-600 leading-[1.85] font-medium">
                    Zayd started akakAI with a simple but uncomfortable observation: the AI tools people were using were passive. They waited. They asked for input. They responded. They never moved first.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-7">
                  <div className="text-3xl mb-4">😤</div>
                  <p className="text-[14px] text-gray-600 leading-[1.85] font-medium">
                    Frustrated with passive tools and overhyped tech, he set out to build something different — AI that takes initiative, understands context, and actually follows through.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Approach — black */}
            <Reveal root={scrollRef} delay={60}>
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <div className="text-3xl mb-4">🔬</div>
                <h3 className="text-[24px] font-black text-white leading-tight mb-4">
                  Capability over complexity — always.
                </h3>
                <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                  His approach strips away the gimmicks and focuses on core functionality: agents that understand goals, take action without micromanagement, and deliver real results in dynamic environments. No trends, no noise — just AI that works with you and for you.
                </p>
              </div>
            </Reveal>

            {/* 3 pillars */}
            <Reveal root={scrollRef} delay={60}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🔍", title: "The Problem", text: "Passive tools, overhyped AI, systems that wait for input instead of taking initiative." },
                  { emoji: "🔭", title: "The Vision", text: "Agents that take initiative, understand context, and follow through from start to finish." },
                  { emoji: "📏", title: "The Standard", text: "No trends, no noise. Just AI that works reliably and for you without getting in the way." },
                  { emoji: "🏁", title: "The Goal", text: "Make action the default. Close the gap between what you want done and what gets done." },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-6">
                    <div className="text-3xl mb-4">{item.emoji}</div>
                    <div className="text-[15px] font-black text-gray-900 mb-2">{item.title}</div>
                    <div className="text-[13px] text-gray-500 leading-relaxed font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tags */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">🏷️ Zayd in tags</p>
              <div className="flex flex-wrap gap-3">
                {["🚫 Anti-hype", "⚡ Action-first", "🧠 Systems thinker", "🎯 Capability over complexity", "🔧 Builder", "✂️ No gimmicks"].map((tag) => (
                  <span key={tag} className="text-[13px] font-semibold border border-gray-200 text-gray-500 px-4 py-2 rounded-full bg-gray-50">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Hiring — black */}
            <Reveal root={scrollRef} delay={60}>
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <div className="text-3xl mb-4">🚀</div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">We&apos;re Hiring</p>
                <h3 className="text-[26px] font-black text-white leading-tight mb-3">
                  Build what comes after passive AI.
                </h3>
                <p className="text-[15px] text-gray-400 leading-relaxed font-medium mb-7">
                  If you believe AI should move first, think independently, and deliver without hand-holding — we want to talk.
                </p>
                <a href="#" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-[14px] font-bold hover:bg-gray-100 transition-colors">
                  <Users size={14} /> Get in touch <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-6 py-5 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="akakAI"
            width={90}
            height={22}
            style={{ filter: "invert(1) brightness(0)" }}
            className="h-5 w-auto opacity-25"
          />
          <div className="flex gap-6 text-[12px] text-gray-300 font-medium">
            <a href="#" className="hover:text-gray-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
            <span>© 2026 akakAI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
