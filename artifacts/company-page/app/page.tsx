"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Tab = "about" | "mission" | "team";

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
      <nav className="flex-none flex items-center justify-between px-8 h-[56px] border-b border-gray-100">
        <Image
          src="/logo-horizontal.png"
          alt="akakAI"
          width={120}
          height={30}
          style={{ filter: "invert(1) brightness(0)" }}
          className="h-6 w-auto"
          priority
        />
        <div className="flex items-center gap-8 text-[14px] text-gray-500">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`transition-colors ${activeTab === t.id ? "text-gray-900" : "hover:text-gray-700"}`}
            >
              {t.label}
            </button>
          ))}
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Sign In</a>
          <a href="#" className="bg-gray-900 text-white text-[13px] px-5 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* SCROLLABLE BODY */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto page-scroll">

        {/* HERO */}
        <div className="px-8 pt-12 pb-12 border-b border-gray-100">
          <div className="flex items-center gap-10">
            {/* Badge logo */}
            <div className="flex-none">
              <Image
                src="/logo-badge.png"
                alt="akakAI badge"
                width={180}
                height={180}
                style={{ filter: "invert(1)" }}
                className="w-[160px] h-[160px] object-contain"
              />
            </div>
            {/* Hero text */}
            <div className="flex-1">
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-6">
                {activeTab === "about" ? "Company Overview" : activeTab === "mission" ? "Our Mission" : "The Team"}
              </p>
              <h1 className="text-[62px] leading-[1.0] tracking-tight text-gray-900 mb-6" style={{ fontWeight: 500 }}>
                {activeTab === "about" && <>AI that acts,<br /><span className="text-gray-300">not just reacts.</span></>}
                {activeTab === "mission" && <>Action is the<br /><span className="text-gray-300">default.</span></>}
                {activeTab === "team" && <>The people<br /><span className="text-gray-300">building it.</span></>}
              </h1>
              <p className="text-[19px] text-gray-500 leading-[1.7] max-w-2xl">
                {activeTab === "about" && "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes — with minimal human intervention."}
                {activeTab === "mission" && "Close the gap between intention and execution. Every system we build pushes toward one thing: AI that makes action the rule, not the exception."}
                {activeTab === "team" && "akakAI was started with a simple conviction. Here's the team putting in the work to prove it."}
              </p>
            </div>
          </div>
        </div>

        {/* ═══ ABOUT ═══ */}
        {activeTab === "about" && (
          <div className="px-8 py-14 space-y-16">

            {/* What we are */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🏗️ What We Are</p>
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
            </div>

            {/* Pull quote */}
            <div className="border-l-2 border-gray-200 pl-8 py-2">
              <p className="text-[26px] text-gray-900 leading-[1.4]" style={{ fontWeight: 400 }}>
                "AI shouldn't wait for direction — it should anticipate, adapt, and act."
              </p>
              <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400 mt-5">The core belief driving everything we build</p>
            </div>

            {/* What our agents do */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">⚙️ What Our Agents Do</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🧠", label: "Independent Thinking", desc: "Real reasoning — not pattern-matching. Our agents decompose goals, weigh options, and find the right path even when the instructions stop short of telling them how." },
                  { emoji: "⚡", label: "Initiative", desc: "They move first. When there's work to be done, the agent doesn't wait for a signal. It identifies what's needed, builds a plan, and starts — without asking for permission." },
                  { emoji: "🎯", label: "Goal Execution", desc: "The distance between a stated objective and a real-world outcome is where most AI falls apart. Our agents bridge it — end-to-end, from the first step to the final delivery." },
                  { emoji: "🌐", label: "Cross-System Coordination", desc: "The work of the world spans dozens of tools, APIs, and platforms. Our agents coordinate across every system they need to, simultaneously, without losing the thread." },
                  { emoji: "🛡️", label: "Judgment Under Uncertainty", desc: "Plans break. Conditions change. The real test of an intelligent system is what it does when the world doesn't cooperate — and ours make the right call without escalating." },
                  { emoji: "📈", label: "Natural Scaling", desc: "More complexity doesn't mean more humans. Our agents compound in capability as scope grows — handling more, deciding more, without the overhead that comes with scaling teams." },
                ].map((c, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-7">
                    <div className="text-2xl mb-4">{c.emoji}</div>
                    <p className="text-[17px] text-gray-900 mb-3" style={{ fontWeight: 500 }}>{c.label}</p>
                    <p className="text-[16px] text-gray-500 leading-[1.75]">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The technology */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🔬 The Technology</p>
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
            </div>

            {/* Beliefs */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">💡 What We Believe</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🚫", text: "AI shouldn't wait for direction" },
                  { emoji: "🏃", text: "Move first, iterate faster" },
                  { emoji: "🔧", text: "Capability over complexity" },
                  { emoji: "🎯", text: "Outcomes, not just outputs" },
                  { emoji: "✂️", text: "Strip the gimmicks" },
                  { emoji: "⚡", text: "Action is the default" },
                ].map((b) => (
                  <span key={b.text} className="text-[15px] text-gray-600 border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-2">
                    <span>{b.emoji}</span>{b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ MISSION ═══ */}
        {activeTab === "mission" && (
          <div className="px-8 py-14 space-y-16">

            {/* Core statement */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🎯 The Mission</p>
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

            {/* What we believe */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">💭 What We Believe</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🌊", heading: "We are at an inflection point.", body: "Every decade, a new computing paradigm shifts what's possible. The internet connected information. Mobile connected people. AI is connecting intent to action — and we are at the very beginning of understanding what that means. akakAI exists to push that frontier forward, deliberately and without compromise." },
                  { emoji: "⚡", heading: "Passivity is a design choice — and the wrong one.", body: "The dominant model of AI today is reactive: you ask, it answers. You prompt, it generates. You iterate endlessly until the output is close enough. This is not intelligence — this is sophisticated autocomplete with a better interface. We chose differently. Our agents own objectives, not just respond to them." },
                  { emoji: "🔭", heading: "The gap between intention and execution is where potential dies.", body: "Most organizations have more good ideas than capacity to execute. Not because people aren't capable — but because the translation layer between knowing what needs to be done and actually doing it is slow, lossy, and human-bottlenecked. akakAI's mission is to eliminate that bottleneck entirely. Not reduce it. Eliminate it." },
                  { emoji: "🏗️", heading: "Autonomy is not a feature. It's the foundation.", body: "You can't bolt autonomy onto a system built for passivity. It requires rethinking the architecture from first principles — how an agent understands goals, how it reasons about context, when it acts and when it pauses. This is what we've built from the ground up. Every layer designed for independent, purposeful execution." },
                ].map((b, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-8">
                    <div className="text-2xl mb-4">{b.emoji}</div>
                    <p className="text-[18px] text-gray-900 mb-5 leading-snug" style={{ fontWeight: 500 }}>{b.heading}</p>
                    <p className="text-[16px] text-gray-500 leading-[1.8]">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Four principles */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🧭 Four Principles</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "👁️", word: "Anticipate", desc: "The most powerful move isn't reacting — it's already being in motion before the problem is named. Our agents see what's coming and act before anyone asks." },
                  { emoji: "🔄", word: "Adapt", desc: "The world doesn't hold still. Conditions change, systems fail, goals shift. Agents that can only follow scripts break the moment reality deviates from the plan. Ours don't." },
                  { emoji: "✅", word: "Act", desc: "Thinking without doing is just noise. Our agents close the loop — from high-level intent to real-world outcome, without waiting for permission, clarification, or a next step." },
                  { emoji: "📡", word: "Scale", desc: "Human attention is finite. Intelligent action shouldn't be. As complexity grows, the agents grow with it — compounding capability without compounding cost or headcount." },
                ].map((p, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-8">
                    <div className="text-2xl mb-4">{p.emoji}</div>
                    <p className="text-[32px] text-gray-900 mb-4" style={{ fontWeight: 500 }}>{p.word}</p>
                    <p className="text-[16px] text-gray-500 leading-[1.8]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The next wave */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🌊 The Next Wave</p>
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
            </div>

            {/* What we are not */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🚫 What akakAI Is Not</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "💬", label: "A chatbot", desc: "Chatbots respond. Agents act. The architecture, the intent, and the outcome are entirely different." },
                  { emoji: "📝", label: "A workflow tool", desc: "We don't need pre-built workflows. The agent figures out the steps, adapts when they fail, and finds a way regardless." },
                  { emoji: "🎠", label: "An AI wrapper", desc: "Purpose-built for autonomous execution from the ground up — not a UI layer or another chatbot with a new coat of paint." },
                  { emoji: "🎪", label: "A hype product", desc: "No buzzwords, no fundraising theater. Just agents that work — reliably, independently, in the real world with real stakes." },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-8">
                    <div className="text-2xl mb-4">{item.emoji}</div>
                    <p className="text-[18px] text-gray-300 line-through mb-4">{item.label}</p>
                    <p className="text-[16px] text-gray-500 leading-[1.8]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TEAM ═══ */}
        {activeTab === "team" && (
          <div className="px-8 py-14 space-y-16">

            {/* Founder */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">👤 Founder</p>
                <h2 className="text-[42px] leading-none text-gray-900 mb-3" style={{ fontWeight: 500 }}>Zayd Malik</h2>
                <p className="text-[14px] text-gray-400 mb-8 uppercase tracking-[0.12em]">akakAI</p>
                <p className="text-[22px] text-gray-900 leading-[1.4] mb-8" style={{ fontWeight: 400 }}>
                  "AI should act, not just react."
                </p>
                <p className="text-[13px] uppercase tracking-[0.15em] text-gray-400">The conviction that started it all</p>
              </div>
              <div className="pt-14">
                <p className="text-[18px] text-gray-600 leading-[1.8] mb-6">
                  Zayd started akakAI with a simple but uncomfortable observation: the AI tools people were using were passive. They waited. They asked for input. They responded. They never moved first.
                </p>
                <p className="text-[18px] text-gray-600 leading-[1.8]">
                  Frustrated with passive tools and overhyped tech, he set out to build something fundamentally different — AI that takes initiative, understands context, and actually follows through.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">🔬 The Approach</p>
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

            {/* What drives him */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-8">💡 What Drives This</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "🔍", title: "The Problem", text: "Passive tools, overhyped AI, systems that wait for input instead of taking initiative. The gap between what AI promised and what it delivered." },
                  { emoji: "🔭", title: "The Vision", text: "Agents that take initiative, understand context, and follow through from start to finish. AI that makes action the default, not the exception." },
                  { emoji: "📏", title: "The Standard", text: "No trends, no noise. Just AI that works reliably — without getting in the way, without needing a prompt for every decision." },
                  { emoji: "🏁", title: "The Goal", text: "Close the gap between what you want done and what gets done. Permanently. Without the intermediary layer that slows everything down." },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-7">
                    <div className="text-2xl mb-4">{item.emoji}</div>
                    <p className="text-[16px] text-gray-900 mb-3" style={{ fontWeight: 500 }}>{item.title}</p>
                    <p className="text-[16px] text-gray-500 leading-[1.8]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-6">🏷️ Zayd in Tags</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🚫", text: "Anti-hype" },
                  { emoji: "⚡", text: "Action-first" },
                  { emoji: "🧠", text: "Systems thinker" },
                  { emoji: "🎯", text: "Capability over complexity" },
                  { emoji: "🔧", text: "Builder" },
                  { emoji: "✂️", text: "No gimmicks" },
                ].map((tag) => (
                  <span key={tag.text} className="text-[14px] text-gray-500 border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-2">
                    <span>{tag.emoji}</span>{tag.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Hiring */}
            <div className="border border-gray-100 rounded-xl p-10">
              <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 mb-6">🚀 We're Hiring</p>
              <h3 className="text-[28px] text-gray-900 leading-tight mb-5" style={{ fontWeight: 500 }}>
                Build what comes after passive AI.
              </h3>
              <p className="text-[18px] text-gray-500 leading-[1.75] mb-8 max-w-lg">
                If you believe AI should move first, think independently, and deliver without hand-holding — we want to talk.
              </p>
              <a href="#" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-[14px] hover:bg-gray-700 transition-colors">
                Get in touch <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-8 py-6 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="akakAI"
            width={80}
            height={20}
            style={{ filter: "invert(1) brightness(0)" }}
            className="h-5 w-auto opacity-20"
          />
          <div className="flex gap-7 text-[13px] text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <span>© 2026 akakAI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
