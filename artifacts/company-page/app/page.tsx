"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Zap, Brain, Target, Rocket, Users, Globe } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const beliefs = [
  {
    icon: <Zap size={20} />,
    label: "Act First",
    desc: "AI shouldn't wait for direction — it should move first",
    color: "from-yellow-50 to-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-100 text-orange-500",
  },
  {
    icon: <Brain size={20} />,
    label: "Think Independently",
    desc: "Navigate complexity and make real decisions in real time",
    color: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    iconBg: "bg-pink-100 text-pink-500",
  },
  {
    icon: <Target size={20} />,
    label: "Execute with Purpose",
    desc: "From high-level goals to real-world outcomes, start to finish",
    color: "from-purple-50 to-indigo-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100 text-purple-500",
  },
  {
    icon: <Rocket size={20} />,
    label: "Scale Naturally",
    desc: "Intelligence that compounds — zero micromanagement required",
    color: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100 text-blue-500",
  },
];

const stats = [
  { value: "0→1", label: "Built from conviction, not trends" },
  { value: "∞", label: "Tasks handled autonomously" },
  { value: "2026", label: "The year agents go to work" },
];

const missionPills = [
  "Close the gap between intention & execution",
  "Translate goals into real-world impact",
  "Make action the default, not the exception",
  "Intelligence that doesn't sit still",
  "Capability over complexity",
  "Minimal oversight, maximum output",
];

const zaydTraits = [
  "Anti-hype",
  "Action-first",
  "Systems thinker",
  "Goal-driven",
  "No fluff",
  "Builder",
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<"about" | "team">("about");
  const [hoveredBelief, setHoveredBelief] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="akakAI"
            width={140}
            height={36}
            style={{ filter: "invert(1) brightness(0)" }}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <button
              onClick={() => setActiveTab("about")}
              className={`transition-colors ${activeTab === "about" ? "text-gray-900" : "hover:text-gray-900"}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`transition-colors ${activeTab === "team" ? "text-gray-900" : "hover:text-gray-900"}`}
            >
              Team
            </button>
            <a
              href="#"
              className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Get Started <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* HERO */}
        <AnimatedSection className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 animate-pulse" />
            akakAI · Company
          </span>
        </AnimatedSection>

        <AnimatedSection delay={100} className="text-center mb-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            AI that{" "}
            <span className="gradient-text">moves</span>
            <br />
            <span className="gradient-text">first.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200} className="text-center mb-16">
          <p className="text-lg text-gray-400 max-w-xl mx-auto font-medium">
            Not passive models. Not chatbots. Fully autonomous agents that
            anticipate, adapt, and act.
          </p>
        </AnimatedSection>

        {/* INSET CARD — Main content */}
        <AnimatedSection delay={300}>
          <div className="inset-card rounded-3xl p-8 md:p-12 mb-8">
            {/* Tab switcher inside card */}
            <div className="flex gap-2 mb-10 p-1 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
              {(["about", "team"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab === "about" ? "🏢 About" : "👤 Team"}
                </button>
              ))}
            </div>

            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {stats.map((s, i) => (
                    <AnimatedSection
                      key={i}
                      delay={i * 80}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
                    >
                      <div className="text-3xl font-black gradient-text mb-1">
                        {s.value}
                      </div>
                      <div className="text-xs text-gray-400 font-medium leading-tight">
                        {s.label}
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Core beliefs grid */}
                <AnimatedSection className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    What we believe
                  </p>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                  {beliefs.map((b, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredBelief(i)}
                      onMouseLeave={() => setHoveredBelief(null)}
                      className={`bg-gradient-to-br ${b.color} border ${b.border} rounded-2xl p-5 cursor-default transition-all duration-200 ${
                        hoveredBelief === i ? "scale-[1.02] shadow-md" : "scale-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${b.iconBg} p-2 rounded-xl flex-shrink-0`}>
                          {b.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 mb-1">
                            {b.label}
                          </div>
                          <div className="text-sm text-gray-500 leading-relaxed">
                            {b.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mission pills */}
                <AnimatedSection className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Our mission, condensed
                  </p>
                </AnimatedSection>
                <div className="flex flex-wrap gap-2">
                  {missionPills.map((pill, i) => (
                    <AnimatedSection key={i} delay={i * 60}>
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 cursor-default ${
                          i % 3 === 0
                            ? "bg-pink-50 border-pink-100 text-pink-600"
                            : i % 3 === 1
                              ? "bg-orange-50 border-orange-100 text-orange-600"
                              : "bg-gray-100 border-gray-200 text-gray-600"
                        }`}
                      >
                        {pill}
                      </span>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}

            {/* TEAM TAB */}
            {activeTab === "team" && (
              <div>
                <AnimatedSection className="mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                    The people building it
                  </p>
                </AnimatedSection>

                {/* Zayd's card */}
                <AnimatedSection delay={100}>
                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="h-2 bg-gradient-to-r from-pink-400 to-orange-400" />
                    <div className="p-8 md:p-10">
                      <div className="flex items-start gap-6 mb-8">
                        {/* Avatar placeholder */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center flex-shrink-0 border border-pink-100">
                          <span className="text-2xl font-black gradient-text">Z</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-gray-900 mb-1">
                            Zayd Malik
                          </h2>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-400">Founder</span>
                            <span className="text-gray-200">·</span>
                            <span className="inline-flex items-center gap-1 text-sm font-semibold gradient-text">
                              <Globe size={12} />
                              akakAI
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key statement */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 border border-gray-100 rounded-2xl p-6 mb-6">
                        <div className="text-2xl font-black text-gray-900 leading-tight mb-2">
                          "AI should{" "}
                          <span className="gradient-text">act</span>, not just{" "}
                          <span className="line-through text-gray-300">react</span>."
                        </div>
                        <p className="text-sm text-gray-400 font-medium">
                          The conviction that started it all
                        </p>
                      </div>

                      {/* Three pillars */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {[
                          {
                            title: "The Problem",
                            text: "Passive tools. Overhyped tech. AI that waits instead of works.",
                            color: "text-rose-500",
                            bg: "bg-rose-50 border-rose-100",
                          },
                          {
                            title: "The Vision",
                            text: "Agents that take initiative, understand context, and actually follow through.",
                            color: "text-orange-500",
                            bg: "bg-orange-50 border-orange-100",
                          },
                          {
                            title: "The Approach",
                            text: "Strip the gimmicks. Focus on core function. Deliver real results.",
                            color: "text-purple-500",
                            bg: "bg-purple-50 border-purple-100",
                          },
                        ].map((p, i) => (
                          <AnimatedSection
                            key={i}
                            delay={i * 80}
                            className={`${p.bg} border rounded-2xl p-4`}
                          >
                            <div className={`text-xs font-black uppercase tracking-widest ${p.color} mb-2`}>
                              {p.title}
                            </div>
                            <div className="text-sm text-gray-600 leading-relaxed font-medium">
                              {p.text}
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>

                      {/* Trait tags */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                          Zayd in tags
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {zaydTraits.map((trait, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold hover:scale-105 transition-transform cursor-default"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Hiring nudge */}
                <AnimatedSection delay={300} className="mt-6">
                  <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                      <div className="font-black text-gray-900 mb-1">
                        We&apos;re building the team.
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        If you believe AI should act, not react — let&apos;s talk.
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap ml-6">
                      <Users size={14} />
                      Join us
                    </button>
                  </div>
                </AnimatedSection>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Bottom CTA strip */}
        <AnimatedSection delay={100}>
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="text-3xl md:text-4xl font-black mb-3">
              Action is the{" "}
              <span className="gradient-text">default.</span>
            </div>
            <p className="text-gray-400 mb-6 font-medium">
              Not the exception. Build with agents that actually do things.
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-7 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity">
              Start Building <ArrowRight size={16} />
            </button>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <Image
            src="/logo-horizontal.png"
            alt="akakAI"
            width={100}
            height={26}
            style={{ filter: "invert(1) brightness(0)" }}
            className="h-6 w-auto opacity-40"
          />
          <div className="text-xs text-gray-400">© 2026 akakAI</div>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
