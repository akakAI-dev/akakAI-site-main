"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Zap, Brain, Target, Globe, Shield, Cpu, TrendingUp, Users } from "lucide-react";

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
      { threshold: 0.08, root: root.current }
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
  { icon: <Brain size={18} />, emoji: "🧠", label: "Independent Thinking", desc: "Agents that reason through goals without being told what to do step-by-step." },
  { icon: <Zap size={18} />, emoji: "⚡", label: "Initiative", desc: "Moves first. Identifies what needs to happen and starts, without waiting." },
  { icon: <Target size={18} />, emoji: "🎯", label: "Goal Execution", desc: "End-to-end task completion — from objective to real-world outcome." },
  { icon: <Globe size={18} />, emoji: "🌐", label: "Cross-System Coordination", desc: "Operates across tools, platforms, and APIs simultaneously." },
  { icon: <Shield size={18} />, emoji: "🛡️", label: "Judgment Under Uncertainty", desc: "Makes informed decisions even when the path forward isn't clear." },
  { icon: <TrendingUp size={18} />, emoji: "📈", label: "Natural Scaling", desc: "Intelligence that compounds as the complexity grows." },
];

const beliefs = [
  { emoji: "🚫", text: "AI shouldn't wait for direction" },
  { emoji: "🏃", text: "Move first, iterate faster" },
  { emoji: "🔧", text: "Capability over complexity" },
  { emoji: "🎯", text: "Outcomes, not just outputs" },
  { emoji: "🧹", text: "Strip the gimmicks" },
  { emoji: "⚙️", text: "Action is the default" },
];

const principles = [
  { emoji: "👁️", word: "Anticipate", desc: "See what's next, not just what's now." },
  { emoji: "🔄", word: "Adapt", desc: "Real-time decisions under real-world uncertainty." },
  { emoji: "✅", word: "Act", desc: "From instruction to outcome, without hand-holding." },
  { emoji: "📡", word: "Scale", desc: "Intelligence that compounds as work grows." },
];

const missionStats = [
  { emoji: "⏱️", value: "0ms", label: "Time spent waiting for a prompt" },
  { emoji: "♾️", value: "∞", label: "Tasks that can run in parallel" },
  { emoji: "👤", value: "0", label: "Micromanagers required" },
  { emoji: "🚀", value: "2026", label: "Year agents go to work" },
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: "about", label: "About", emoji: "🏢" },
    { id: "mission", label: "Mission", emoji: "🎯" },
    { id: "team", label: "Team", emoji: "👤" },
  ];

  return (
    <div className="fixed inset-[10px] rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">

      {/* NAV */}
      <nav className="flex-none flex items-center justify-between px-5 h-[52px] border-b border-gray-100">
        <Image
          src="/logo-horizontal.png"
          alt="akakAI"
          width={110}
          height={28}
          style={{ filter: "invert(1) brightness(0)" }}
          className="h-6 w-auto"
          priority
        />
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
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
          <a href="#" className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* SCROLLABLE BODY */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto page-scroll">

        {/* HERO */}
        <div className="px-5 pt-10 pb-8 border-b border-gray-100">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 border border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900 inline-block" />
              {tabs.find(t => t.id === activeTab)?.emoji} {activeTab === "about" ? "Company Overview" : activeTab === "mission" ? "Our Mission" : "The Team"}
            </span>
          </div>
          <h1 className="text-[50px] leading-[1.04] font-black tracking-tight text-gray-900 mb-4">
            {activeTab === "about" && <><span>AI that acts,</span><br /><span className="text-gray-200">not just reacts.</span></>}
            {activeTab === "mission" && <><span>Action is the</span><br /><span className="text-gray-200">default.</span></>}
            {activeTab === "team" && <><span>The people</span><br /><span className="text-gray-200">building it.</span></>}
          </h1>
          <p className="text-[15px] text-gray-400 font-medium max-w-2xl leading-relaxed">
            {activeTab === "about" && "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes — with minimal human intervention."}
            {activeTab === "mission" && "Close the gap between intention and execution. Not someday. Right now. Every system we build pushes toward one thing: AI that makes action the rule, not the exception."}
            {activeTab === "team" && "akakAI was started with a simple conviction. Here's the team putting in the work to prove it."}
          </p>
        </div>

        {/* ═══ ABOUT ═══ */}
        {activeTab === "about" && (
          <div className="px-5 py-10 space-y-12">

            {/* What we are */}
            <Reveal root={scrollRef}>
              <div className="flex items-start gap-3 mb-5">
                <span className="text-2xl">🏗️</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-0.5">01 — What We Are</p>
                  <h2 className="text-[26px] font-black text-gray-900 leading-tight tracking-tight">A new class of intelligent systems.</h2>
                </div>
              </div>
              <div className="pl-10 space-y-3">
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  akakAI is building AI agents that don&apos;t just respond to instructions — they think independently, take initiative, and execute tasks with purpose. The core belief driving akakAI is simple but transformative: <strong className="text-gray-800 font-semibold">AI shouldn&apos;t wait for direction — it should anticipate, adapt, and act.</strong>
                </p>
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  These are not passive models reacting to inputs. They are fully capable agents built to navigate complexity, make informed decisions in real time, and carry out objectives from start to finish with minimal oversight.
                </p>
              </div>
            </Reveal>

            {/* Capabilities grid */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">⚙️</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">What our agents do</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {capabilities.map((c, i) => (
                  <Reveal key={i} delay={i * 40} root={scrollRef} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{c.emoji}</span>
                      <span className="text-[11px] font-bold text-gray-700">{c.label}</span>
                    </div>
                    <p className="text-[12px] text-gray-400 leading-relaxed font-medium">{c.desc}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* What we believe */}
            <Reveal root={scrollRef} delay={80}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">💡</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">What we believe</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {beliefs.map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 text-[13px] font-semibold px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors cursor-default">
                    <span>{b.emoji}</span> {b.text}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Technology section */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-start gap-3 mb-5">
                <span className="text-2xl">🔬</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-0.5">02 — The Technology</p>
                  <h2 className="text-[26px] font-black text-gray-900 leading-tight tracking-tight">Closing the gap between<br />intention and execution.</h2>
                </div>
              </div>
              <div className="pl-10 space-y-3">
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  akakAI&apos;s technology is designed to translate high-level goals into real-world impact. These agents become active contributors in workflows, driving momentum without constant human intervention.
                </p>
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  Whether managing multi-step operations, coordinating across systems, or making judgment calls under uncertainty — they act with autonomy and purpose. This is intelligence that doesn&apos;t sit still.
                </p>
              </div>
              <div className="pl-10 mt-5 bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={14} className="text-gray-400" />
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">How it works</span>
                </div>
                <div className="flex items-center gap-0">
                  {[
                    { emoji: "🎯", label: "Goal set" },
                    { emoji: "🧠", label: "Agent reasons" },
                    { emoji: "⚡", label: "Takes action" },
                    { emoji: "✅", label: "Delivers outcome" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div className="text-center px-4">
                        <div className="text-xl mb-1">{step.emoji}</div>
                        <div className="text-[11px] font-semibold text-gray-500">{step.label}</div>
                      </div>
                      {i < 3 && <div className="text-gray-200 font-light text-xl">→</div>}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* ═══ MISSION ═══ */}
        {activeTab === "mission" && (
          <div className="px-5 py-10 space-y-12">

            {/* Core statement */}
            <Reveal root={scrollRef}>
              <div className="border-l-[3px] border-gray-900 pl-6 mb-6">
                <p className="text-[22px] font-black text-gray-900 leading-snug mb-2">
                  "Make action the default,<br />not the exception."
                </p>
                <p className="text-[11px] text-gray-300 font-bold uppercase tracking-[0.14em]">The mission in one line</p>
              </div>
              <div className="space-y-3">
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done. No intermediary. No endless iteration. Just outcomes.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">📊</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">By the numbers</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {missionStats.map((s, i) => (
                  <Reveal key={i} delay={i * 50} root={scrollRef} className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
                    <div className="text-2xl mb-2">{s.emoji}</div>
                    <div className="text-2xl font-black text-gray-900 mb-1">{s.value}</div>
                    <div className="text-[11px] text-gray-400 font-medium leading-tight">{s.label}</div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Principles */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">🧭</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">Four principles we build toward</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {principles.map((p, i) => (
                  <Reveal key={i} delay={i * 50} root={scrollRef} className="border border-gray-100 rounded-xl p-6 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{p.emoji}</span>
                    <div>
                      <div className="text-[17px] font-black text-gray-900 mb-1">{p.word}</div>
                      <div className="text-[13px] text-gray-400 leading-relaxed font-medium">{p.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* What this is not */}
            <Reveal root={scrollRef} delay={60}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">🚫</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">What akakAI is not</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: "💬", label: "A chatbot", desc: "Chatbots respond. Agents act." },
                  { emoji: "📝", label: "A workflow tool", desc: "We don't need workflows. Agents figure out the steps." },
                  { emoji: "🎠", label: "Another AI wrapper", desc: "This is purpose-built for autonomous execution." },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                    <div className="text-2xl mb-3">{item.emoji}</div>
                    <div className="text-[13px] font-black text-gray-700 mb-1 line-through decoration-gray-300">{item.label}</div>
                    <div className="text-[12px] text-gray-400 leading-relaxed font-medium">{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* ═══ TEAM ═══ */}
        {activeTab === "team" && (
          <div className="px-5 py-10 space-y-10">

            {/* Zayd */}
            <Reveal root={scrollRef} className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-start justify-between p-7 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-2">👤 Founder</p>
                  <h2 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-1">Zayd Malik</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Globe size={12} className="text-gray-300" />
                    <span className="text-[12px] text-gray-400 font-medium">akakAI</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-900 flex-shrink-0">
                  Z
                </div>
              </div>

              <div className="p-7 border-b border-gray-100 bg-gray-50">
                <div className="border-l-[3px] border-gray-900 pl-5">
                  <p className="text-[19px] font-black text-gray-900 leading-snug">
                    "AI should act, not just react."
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.14em] mt-2">The conviction that started it all</p>
                </div>
              </div>

              <div className="p-7 border-b border-gray-100 space-y-4">
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  🧩 Zayd started akakAI with a simple but uncomfortable observation: the AI tools people were using were passive. They waited. They asked for input. They responded. They never moved first.
                </p>
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  😤 Frustrated with passive tools and overhyped tech, he set out to build something different — AI that takes initiative, understands context, and actually follows through. Not a productivity app with a chatbot on top.
                </p>
                <p className="text-[14px] text-gray-500 leading-[1.85] font-medium">
                  🔬 His approach strips away the gimmicks and focuses on core functionality: agents that understand goals, take action without micromanagement, and deliver real results in dynamic environments. Capability over complexity — always.
                </p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { emoji: "🔍", title: "The Problem", text: "Passive tools, overhyped AI, systems that wait instead of work." },
                  { emoji: "🔭", title: "The Vision", text: "Agents that take initiative, understand context, and follow through." },
                  { emoji: "📏", title: "The Standard", text: "No trends, no noise. Just AI that works with you and for you." },
                ].map((item, i) => (
                  <div key={i} className="p-5">
                    <div className="text-xl mb-2">{item.emoji}</div>
                    <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">{item.title}</div>
                    <div className="text-[12px] text-gray-400 leading-relaxed font-medium">{item.text}</div>
                  </div>
                ))}
              </div>

              <div className="p-7 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-3">🏷️ In a few words</p>
                <div className="flex flex-wrap gap-2">
                  {["🚫 Anti-hype", "⚡ Action-first", "🧠 Systems thinker", "🎯 Capability over complexity", "🔧 Builder", "✂️ No gimmicks"].map((tag) => (
                    <span key={tag} className="text-[12px] font-semibold border border-gray-200 text-gray-500 px-3 py-1 rounded-full bg-gray-50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Hiring */}
            <Reveal root={scrollRef} delay={80}>
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="text-3xl mb-4">🚀</div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">We&apos;re Hiring</p>
                <h3 className="text-[22px] font-black text-white leading-tight mb-3">
                  Build what comes after passive AI.
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed font-medium mb-6 max-w-md">
                  If you believe AI should move first, think independently, and deliver without hand-holding — we want to talk.
                </p>
                <a href="#" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                  <Users size={13} /> Get in touch <ArrowUpRight size={13} />
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-5 py-5 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="akakAI"
            width={80}
            height={20}
            style={{ filter: "invert(1) brightness(0)" }}
            className="h-5 w-auto opacity-25"
          />
          <div className="flex gap-6 text-[11px] text-gray-300 font-medium">
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
