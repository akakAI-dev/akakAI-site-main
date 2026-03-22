"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold, root: el.closest(".inset-scroll") }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const sections = [
  {
    label: "01 — What We Are",
    heading: "A new class of\nintelligent systems.",
    body: [
      "akakAI is building AI agents that don't just respond to instructions — they think independently, take initiative, and execute tasks with purpose.",
      "These are not passive models reacting to inputs. They are fully capable agents built to navigate complexity, make informed decisions in real time, and carry out objectives from start to finish with minimal oversight.",
    ],
  },
  {
    label: "02 — The Core Belief",
    heading: "AI shouldn't wait\nfor direction.",
    body: [
      "The conviction driving akakAI is simple but transformative: AI should anticipate, adapt, and act. Not wait for a prompt. Not ask for clarification. Move.",
      "Intelligence that doesn't sit still. It moves first, scales naturally, and transforms organizations by making action the default — not the exception.",
    ],
  },
  {
    label: "03 — The Technology",
    heading: "Closing the gap between\nintention and execution.",
    body: [
      "akakAI's technology translates high-level goals into real-world impact. These agents become active contributors in workflows, driving momentum without constant human intervention.",
      "Whether managing multi-step operations, coordinating across systems, or making judgment calls under uncertainty — they act with autonomy and purpose.",
    ],
  },
];

const principles = [
  ["Anticipate", "Agents that see what's next, not just what's now."],
  ["Adapt", "Real-time decision-making under real-world uncertainty."],
  ["Act", "From instruction to outcome, without hand-holding."],
  ["Scale", "Intelligence that compounds as the work grows."],
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<"about" | "team">("about");
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* NAV */}
      <nav className="flex-none flex items-center justify-between px-8 h-14 border-b border-gray-100">
        <Image
          src="/logo-horizontal.png"
          alt="akakAI"
          width={120}
          height={30}
          style={{ filter: "invert(1) brightness(0)" }}
          className="h-7 w-auto"
          priority
        />
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => setActiveTab("about")} className={`transition-colors ${activeTab === "about" ? "text-gray-900" : "hover:text-gray-700"}`}>About</button>
          <button onClick={() => setActiveTab("team")} className={`transition-colors ${activeTab === "team" ? "text-gray-900" : "hover:text-gray-700"}`}>Team</button>
          <span className="text-gray-200">|</span>
          <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">Sign In</a>
          <a href="#" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO — fixed outside the inset */}
      <div className="flex-none px-10 pt-10 pb-6">
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 border border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 inline-block" />
            Company Overview
          </span>
        </div>
        <h1 className="text-[56px] leading-[1.05] font-black tracking-tight text-gray-900 mb-4">
          {activeTab === "about" ? (
            <>
              AI that acts,<br />
              <span className="text-gray-300">not just reacts.</span>
            </>
          ) : (
            <>
              The people<br />
              <span className="text-gray-300">building it.</span>
            </>
          )}
        </h1>
        <p className="text-base text-gray-400 font-medium max-w-xl leading-relaxed">
          {activeTab === "about"
            ? "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes — with minimal human intervention."
            : "akakAI was started with a simple conviction. Here's the team putting in the work to prove it."}
        </p>
        {activeTab === "about" && (
          <div className="flex items-center gap-1.5 mt-5 text-xs text-gray-400 font-medium">
            <ChevronDown size={13} />
            Scroll to read
          </div>
        )}
      </div>

      {/* INSET SCROLLABLE CONTAINER */}
      <div className="flex-1 px-10 pb-10 min-h-0">
        <div className="h-full rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]">
          <div
            ref={scrollRef}
            className="inset-scroll h-full overflow-y-auto px-8 py-8"
          >
            {/* ═══ ABOUT TAB ═══ */}
            {activeTab === "about" && (
              <div className="max-w-2xl mx-auto space-y-0">
                {/* Long-form sections */}
                {sections.map((s, i) => (
                  <Reveal key={i} delay={i * 60} className="pb-12 border-b border-gray-200 mb-12 last:border-0 last:mb-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">{s.label}</p>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight tracking-tight mb-6 whitespace-pre-line">
                      {s.heading}
                    </h2>
                    <div className="space-y-4">
                      {s.body.map((p, j) => (
                        <p key={j} className="text-[15px] text-gray-500 leading-[1.8] font-medium">{p}</p>
                      ))}
                    </div>
                  </Reveal>
                ))}

                {/* Principles */}
                <Reveal delay={0} className="pb-12 border-b border-gray-200 mb-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">04 — Principles</p>
                  <h2 className="text-3xl font-black text-gray-900 leading-tight tracking-tight mb-8">
                    Four words.<br />Everything we build toward.
                  </h2>
                  <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                    {principles.map(([word, desc], i) => (
                      <div key={i} className="bg-gray-50 p-6">
                        <div className="text-xl font-black text-gray-900 mb-2">{word}</div>
                        <div className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Mission statement */}
                <Reveal delay={0} className="pb-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">05 — The Mission</p>
                  <blockquote className="text-2xl font-black text-gray-900 leading-snug tracking-tight border-l-4 border-gray-900 pl-6 mb-6">
                    "Make action the default, not the exception."
                  </blockquote>
                  <p className="text-[15px] text-gray-500 leading-[1.8] font-medium">
                    Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done. No intermediary. No endless iteration. Just outcomes.
                  </p>
                </Reveal>
              </div>
            )}

            {/* ═══ TEAM TAB ═══ */}
            {activeTab === "team" && (
              <div className="max-w-2xl mx-auto">
                {/* Zayd */}
                <Reveal className="border-b border-gray-200 pb-12 mb-12">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Founder</div>
                      <h2 className="text-4xl font-black text-gray-900 tracking-tight">Zayd Malik</h2>
                      <p className="text-sm text-gray-400 font-medium mt-1">akakAI</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xl font-black text-gray-900 flex-shrink-0">
                      Z
                    </div>
                  </div>

                  <div className="border-l-4 border-gray-900 pl-6 mb-8">
                    <p className="text-xl font-black text-gray-900 leading-snug">
                      "AI should act, not just react."
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-2 uppercase tracking-widest">The conviction that started it all</p>
                  </div>

                  <div className="space-y-5 mb-10">
                    <p className="text-[15px] text-gray-500 leading-[1.8] font-medium">
                      Zayd started akakAI with a simple but uncomfortable observation: the AI tools people were using were passive. They waited. They asked for input. They responded. They never moved first.
                    </p>
                    <p className="text-[15px] text-gray-500 leading-[1.8] font-medium">
                      Frustrated with passive tools and overhyped tech, he set out to build something different — AI that takes initiative, understands context, and actually follows through. Not a productivity app with a chatbot on top. A step toward a future where intelligent agents handle meaningful work on your behalf, autonomously and reliably.
                    </p>
                    <p className="text-[15px] text-gray-500 leading-[1.8] font-medium">
                      His approach strips away the gimmicks and focuses on core functionality: agents that understand goals, take action without micromanagement, and deliver real results in dynamic environments. Capability over complexity — always.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200 mb-8">
                    {[
                      ["The Problem", "Passive tools, overhyped AI, systems that wait instead of work."],
                      ["The Vision", "Agents that take initiative, understand context, and follow through."],
                      ["The Standard", "No trends, no noise. Just AI that works with you and for you."],
                    ].map(([title, text], i) => (
                      <div key={i} className="bg-gray-50 p-5">
                        <div className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">{title}</div>
                        <div className="text-xs text-gray-400 leading-relaxed font-medium">{text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Anti-hype", "Action-first", "Systems thinker", "Capability over complexity", "Builder", "No gimmicks"].map((tag) => (
                      <span key={tag} className="text-xs font-semibold border border-gray-200 text-gray-500 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>

                {/* Hiring */}
                <Reveal>
                  <div className="bg-gray-900 rounded-2xl p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">We&apos;re Hiring</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-3">
                      Build what comes<br />after passive AI.
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6">
                      If you believe AI should move first, think independently, and deliver without hand-holding — we want to talk.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                      Get in touch <ArrowUpRight size={14} />
                    </a>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex-none px-10 pb-4 flex items-center justify-between">
        <Image
          src="/logo-horizontal.png"
          alt="akakAI"
          width={80}
          height={20}
          style={{ filter: "invert(1) brightness(0)" }}
          className="h-5 w-auto opacity-30"
        />
        <div className="flex gap-5 text-[11px] text-gray-300 font-medium">
          <a href="#" className="hover:text-gray-500 transition-colors">Documentation</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Contact</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
          <span>© 2026 akakAI</span>
        </div>
      </div>
    </div>
  );
}
