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
  { emoji: "🧠", label: "Independent Thinking", desc: "Agents that reason through goals without being told every step. They figure it out." },
  { emoji: "⚡", label: "Initiative", desc: "Moves first. Identifies what needs to happen and starts — without waiting for a prompt." },
  { emoji: "🎯", label: "Goal Execution", desc: "End-to-end task completion from objective to real-world outcome, start to finish." },
  { emoji: "🌐", label: "Cross-System Coordination", desc: "Operates across tools, platforms, and APIs simultaneously to get things done." },
  { emoji: "🛡️", label: "Judgment Under Uncertainty", desc: "Makes informed decisions even when the path forward isn't perfectly clear." },
  { emoji: "📈", label: "Natural Scaling", desc: "Intelligence that compounds as the complexity of the work grows over time." },
];

const principles = [
  { emoji: "👁️", word: "Anticipate", desc: "See what's next, not just what's now. Agents that look ahead and act before being asked." },
  { emoji: "🔄", word: "Adapt", desc: "Real-time decision-making under real-world uncertainty and changing conditions." },
  { emoji: "✅", word: "Act", desc: "From instruction to outcome, without hand-holding, micromanagement, or delay." },
  { emoji: "📡", word: "Scale", desc: "Intelligence that compounds naturally as the scope and complexity of work grows." },
];

const missionStats = [
  { emoji: "⏱️", value: "0ms", label: "Spent waiting for a prompt" },
  { emoji: "♾️", value: "∞", label: "Tasks that can run in parallel" },
  { emoji: "👤", value: "0", label: "Micromanagers required" },
  { emoji: "🚀", value: "2026", label: "Year agents go to work" },
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
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">🏗️ What We Are</p>
                <h2 className="text-[30px] font-black leading-tight tracking-tight mb-5">
                  A new class of intelligent systems.
                </h2>
                <p className="text-[15px] text-gray-300 leading-[1.85] font-medium mb-4">
                  akakAI is building AI agents that don&apos;t just respond to instructions — they think independently, take initiative, and execute tasks with purpose. These are not passive models reacting to inputs.
                </p>
                <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                  They are fully capable agents built to navigate complexity, make informed decisions in real time, and carry out objectives from start to finish with minimal oversight.
                </p>
              </div>
            </Reveal>

            {/* Core belief — inline black quote */}
            <Reveal root={scrollRef} delay={60}>
              <div className="border-l-4 border-gray-900 pl-6 py-2">
                <p className="text-[22px] font-black text-gray-900 leading-snug mb-2">
                  "AI shouldn&apos;t wait for direction — it should anticipate, adapt, and act."
                </p>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">The core belief driving akakAI</p>
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
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">🔬 The Technology</p>
                <h2 className="text-[28px] font-black leading-tight tracking-tight mb-5">
                  Closing the gap between intention and execution.
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                    akakAI&apos;s technology translates high-level goals into real-world impact. These agents become active contributors in workflows, driving momentum without constant human intervention.
                  </p>
                  <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                    Whether managing multi-step operations, coordinating across systems, or making judgment calls under uncertainty — they act with autonomy and purpose.
                  </p>
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

            {/* Core statement — black */}
            <Reveal root={scrollRef}>
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-6">🎯 The Mission</p>
                <p className="text-[32px] font-black text-white leading-tight mb-6">
                  "Make action the default,<br />not the exception."
                </p>
                <p className="text-[15px] text-gray-300 leading-[1.85] font-medium">
                  Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done. No intermediary. No endless iteration. Just outcomes.
                </p>
              </div>
            </Reveal>

            {/* Stats — 2 column */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">📊 By the numbers</p>
              <div className="grid grid-cols-2 gap-4">
                {missionStats.map((s, i) => (
                  <Reveal key={i} delay={i * 60} root={scrollRef} className="bg-gray-50 border border-gray-100 rounded-xl p-7">
                    <div className="text-3xl mb-4">{s.emoji}</div>
                    <div className="text-[40px] font-black text-gray-900 leading-none mb-2">{s.value}</div>
                    <div className="text-[14px] text-gray-400 font-medium leading-tight">{s.label}</div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Principles — 2 column */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">🧭 Four principles</p>
              <div className="grid grid-cols-2 gap-4">
                {principles.map((p, i) => (
                  <Reveal key={i} delay={i * 50} root={scrollRef} className={`rounded-xl p-7 ${i % 2 === 0 ? "bg-gray-900 text-white" : "border border-gray-100 bg-gray-50"}`}>
                    <div className="text-3xl mb-4">{p.emoji}</div>
                    <div className={`text-[22px] font-black mb-2 ${i % 2 === 0 ? "text-white" : "text-gray-900"}`}>{p.word}</div>
                    <div className={`text-[14px] leading-relaxed font-medium ${i % 2 === 0 ? "text-gray-300" : "text-gray-500"}`}>{p.desc}</div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* What we are not */}
            <Reveal root={scrollRef} delay={60}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">🚫 What akakAI is not</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "💬", label: "A chatbot", desc: "Chatbots respond. Agents act. The difference is everything." },
                  { emoji: "📝", label: "A workflow tool", desc: "We don't need pre-built workflows. Agents figure out the steps themselves." },
                  { emoji: "🎠", label: "An AI wrapper", desc: "Purpose-built for autonomous execution, not another layer on top of an LLM." },
                  { emoji: "🤹", label: "A hype product", desc: "No trends, no noise. Just capability that actually delivers in the real world." },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-6">
                    <div className="text-3xl mb-4">{item.emoji}</div>
                    <div className="text-[16px] font-black text-gray-300 line-through decoration-gray-400 mb-2">{item.label}</div>
                    <div className="text-[14px] text-gray-500 leading-relaxed font-medium">{item.desc}</div>
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
