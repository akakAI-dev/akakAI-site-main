"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Youtube, Instagram, Twitter, ChevronDown, Menu, X } from "lucide-react";

type Tab = "about" | "mission" | "team" | "investments" | "projects" | "contact";
type ProjectView = null | "aegent" | "email";

const B = "#111";
const BORDER = "border-[#222]";
const CARD = "bg-[#191919]";
const TEXT = "text-white";
const MUTED = "text-[#666]";
const LABEL_TEXT = "text-[#555]";

/* Scroll-reveal */
function Reveal({ children, delay = 0, className = "", root }: {
  children: React.ReactNode; delay?: number; className?: string;
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
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Section({ children, first = false, root, delay = 0 }: {
  children: React.ReactNode; first?: boolean;
  root: React.RefObject<HTMLDivElement | null>; delay?: number;
}) {
  return (
    <Reveal root={root} delay={delay} className={`py-14 ${first ? "" : `border-t ${BORDER}`}`}>
      {children}
    </Reveal>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span className={`inline-flex items-center text-[11px] uppercase tracking-[0.18em] ${LABEL_TEXT} border border-[#2a2a2a] px-4 py-1.5 rounded-full`}>
        {children}
      </span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${className} transition-all duration-200 hover:-translate-y-1`}>
      {children}
    </div>
  );
}

function HiringCTA({ root }: { root: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Reveal root={root} delay={60} className={`border-t ${BORDER} py-14`}>
      <div className={`border ${BORDER} rounded-xl p-6 sm:p-10`}>
        <p className={`text-[13px] uppercase tracking-[0.18em] ${LABEL_TEXT} mb-5`}>We are Hiring</p>
        <h3 className={`text-[24px] sm:text-[34px] ${TEXT} leading-tight mb-4`} style={{ fontWeight: 500 }}>
          Build what comes after passive AI.
        </h3>
        <p className={`text-[16px] sm:text-[18px] ${MUTED} leading-[1.75] mb-8 max-w-lg`}>
          If you believe AI should move first and deliver without hand-holding, we want to talk.
        </p>
        <a href="mailto:media@akakai.com" className={`inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[14px] hover:bg-zinc-200 transition-colors`}>
          Get in touch <ArrowUpRight size={14} />
        </a>
      </div>
    </Reveal>
  );
}

function PressEntry({ title, date, location, children }: {
  title: string; date: string; location: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border ${BORDER} rounded-xl overflow-hidden`}>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex items-start justify-between p-8 text-left hover:bg-[#191919] transition-colors`}>
        <div>
          <p className={`text-[13px] uppercase tracking-[0.15em] ${LABEL_TEXT} mb-2`}>Press Release</p>
          <h3 className={`text-[22px] ${TEXT} leading-tight`} style={{ fontWeight: 500 }}>{title}</h3>
        </div>
        <div className="flex items-center gap-6 ml-8 flex-none">
          <div className="text-right">
            <p className={`text-[13px] ${MUTED}`}>{location}</p>
            <p className={`text-[13px] ${MUTED}`}>{date}</p>
          </div>
          <ChevronDown size={18} className={`${MUTED} transition-transform duration-300 flex-none`}
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? "2000px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div className={`px-8 pb-8 border-t ${BORDER} pt-8`}>{children}</div>
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [projectView, setProjectView] = useState<ProjectView>(null);
  const [navOpen, setNavOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    setProjectView(null);
    setNavOpen(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "mission", label: "Mission" },
    { id: "team", label: "Team" },
    { id: "investments", label: "Investments" },
    { id: "projects", label: "Products" },
    { id: "contact", label: "Get in touch" },
  ];

  const socials = [
    { href: "https://www.youtube.com/@real.akakAI", icon: <Youtube size={16} />, label: "YouTube" },
    { href: "https://www.instagram.com/real.akakai/", icon: <Instagram size={16} />, label: "Instagram" },
    { href: "https://x.com/real_akakAI", icon: <Twitter size={16} />, label: "X" },
  ];

  return (
    <>
      {/* Mobile nav overlay */}
      {navOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-[#111] flex flex-col">
          <div className={`flex items-center justify-between px-5 h-[52px] border-b ${BORDER}`}>
            <Image src="/logo-horizontal.png" alt="akakAI" width={100} height={24}
              style={{ filter: "brightness(0) invert(1)" }} className="h-5 w-auto" priority />
            <button onClick={() => setNavOpen(false)} className={`${MUTED} hover:text-white transition-colors p-1`}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => switchTab(t.id)}
                className={`text-left py-3 text-[22px] tracking-tight transition-colors ${activeTab === t.id ? "text-white" : "text-[#333] hover:text-[#888]"}`}
                style={{ fontWeight: 500 }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 px-8 pb-10">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`${MUTED} hover:text-white transition-colors`} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main container */}
      <div className={`sm:fixed sm:inset-[10px] sm:rounded-2xl bg-[#111] sm:border ${BORDER} sm:shadow-sm sm:overflow-hidden flex flex-col min-h-screen sm:min-h-0`}>

        {/* Nav */}
        <nav className={`sticky top-0 z-30 bg-[#111] flex-none border-b ${BORDER} shrink-0`}>
          <div className="flex items-center justify-between px-4 sm:px-8 h-[48px] sm:h-[56px]">
            <Image src="/logo-horizontal.png" alt="akakAI" width={120} height={30}
              style={{ filter: "brightness(0) invert(1)" }} className="h-5 sm:h-6 w-auto" priority />
            <div className={`hidden sm:flex items-center gap-8 text-[14px] ${MUTED}`}>
              {tabs.map((t) => (
                <button key={t.id} onClick={() => switchTab(t.id)}
                  className={`transition-colors duration-150 ${activeTab === t.id ? "text-white" : "hover:text-[#aaa]"}`}>
                  {t.label}
                </button>
              ))}
              <span className="text-[#2a2a2a]">|</span>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`${MUTED} hover:text-white transition-colors duration-150`} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
            <button className={`sm:hidden p-1 ${MUTED} hover:text-white transition-colors`}
              onClick={() => setNavOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
        </nav>

        {/* Scrollable body */}
        <div ref={scrollRef} className="sm:flex-1 sm:overflow-y-auto page-scroll" style={{ scrollbarGutter: "stable" }}>

          {/* Hero */}
          {projectView === null && (
            <div className={`px-4 sm:px-8 border-b ${BORDER} flex items-stretch min-h-[140px] sm:min-h-[220px]`}>
              <div className={`hidden sm:flex flex-none items-center pr-10 py-10 border-r ${BORDER} mr-10`}>
                <Image src="/logo-badge.png" alt="akakAI badge" width={240} height={240}
                  className="w-[200px] h-[200px] object-contain opacity-80" />
              </div>
              <div className="flex-1 flex flex-col justify-center py-7 sm:py-10">
                <p className={`text-[11px] sm:text-[14px] uppercase tracking-[0.18em] ${LABEL_TEXT} mb-3 sm:mb-5`}>
                  {activeTab === "about" ? "Company Overview" : activeTab === "mission" ? "Our Mission" : activeTab === "team" ? "The Team" : activeTab === "investments" ? "Investments" : activeTab === "projects" ? "Our Products" : "Contact"}
                </p>
                <h1 className={`text-[30px] sm:text-[62px] leading-[1.05] sm:leading-[1.0] tracking-tight ${TEXT} mb-3 sm:mb-6`} style={{ fontWeight: 500 }}>
                  {activeTab === "about" && <>AI that acts,<br /><span className="text-[#2a2a2a]">not just reacts.</span></>}
                  {activeTab === "mission" && <>Action is the<br /><span className="text-[#2a2a2a]">default.</span></>}
                  {activeTab === "team" && <>The people<br /><span className="text-[#2a2a2a]">building it.</span></>}
                  {activeTab === "investments" && <>Backing the<br /><span className="text-[#2a2a2a]">next wave.</span></>}
                  {activeTab === "projects" && <>What we&apos;ve<br /><span className="text-[#2a2a2a]">built.</span></>}
                  {activeTab === "contact" && <>Let&apos;s build<br /><span className="text-[#2a2a2a]">together.</span></>}
                </h1>
                <p className={`text-[15px] sm:text-[19px] ${MUTED} leading-[1.6] sm:leading-[1.7] max-w-2xl`}>
                  {activeTab === "about" && "Autonomous agents built to navigate complexity, make decisions, and deliver outcomes with minimal human intervention."}
                  {activeTab === "mission" && "Close the gap between intention and execution. Every system we build pushes toward AI that makes action the rule, not the exception."}
                  {activeTab === "team" && "akakAI was started with a simple conviction. Here is the team putting in the work to prove it."}
                  {activeTab === "investments" && "akakAI is building the infrastructure for autonomous AI action. For investment inquiries, reach us at investments@akakai.com."}
                  {activeTab === "projects" && "Many products. One conviction. Agents that understand, decide, and act."}
                  {activeTab === "contact" && "If you believe AI should move first and deliver without hand-holding, we want to talk."}
                </p>
              </div>
            </div>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <SectionLabel>What We Are</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h2 className={`text-[32px] leading-tight ${TEXT} mb-6`} style={{ fontWeight: 500 }}>
                      A new class of intelligent systems.
                    </h2>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      akakAI is building AI agents that don&apos;t just respond to instructions. They think independently, take initiative, and execute tasks with purpose. Not assistants. Not autocomplete. Agents.
                    </p>
                  </div>
                  <div>
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-6`}>
                      These are entities that understand what needs to happen, decide how to make it happen, and then do it — operating at a level of autonomy that changes what&apos;s possible.
                    </p>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      They navigate real-world complexity, make informed decisions without hand-holding, and carry out objectives from start to finish with minimal oversight.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <div className="border-l-2 border-[#2a2a2a] pl-8 py-2">
                  <p className={`text-[26px] ${TEXT} leading-[1.4]`} style={{ fontWeight: 400 }}>
                    &ldquo;AI shouldn&apos;t wait for direction. It should anticipate, adapt, and act.&rdquo;
                  </p>
                  <p className={`text-[13px] uppercase tracking-[0.15em] ${LABEL_TEXT} mt-5`}>The core belief driving everything we build</p>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>The Technology</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h2 className={`text-[28px] leading-tight ${TEXT} mb-6`} style={{ fontWeight: 500 }}>
                      Built from first principles for autonomous execution.
                    </h2>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      akakAI&apos;s technology is not a chatbot with extra steps. It&apos;s a purpose-built architecture designed around a single question: what does a system need in order to act, not just respond?
                    </p>
                  </div>
                  <div>
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-6`}>
                      The answer requires more than a better model. Goal comprehension. Dynamic planning. Real-time adaptation. Multi-system coordination. We built each layer deliberately as the core of what these agents are.
                    </p>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      The result: agents that become active participants in how work gets done, pushing through to completion without constant direction.
                    </p>
                  </div>
                </div>
              </Section>

              <HiringCTA root={scrollRef} />
            </div>
          )}

          {/* MISSION */}
          {activeTab === "mission" && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <SectionLabel>The Mission</SectionLabel>
                    <h2 className={`text-[34px] leading-[1.2] ${TEXT} mb-7`} style={{ fontWeight: 500 }}>
                      &ldquo;Make action the default, not the exception.&rdquo;
                    </h2>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      We exist at the intersection of ambition and execution, building the systems that let ideas become outcomes without the human bottleneck that kills most of them.
                    </p>
                  </div>
                  <div className="sm:pt-14">
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-6`}>
                      Every product decision, every line of code, every system we ship is in service of one thing: closing the gap between what you want done and what actually gets done.
                    </p>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      No intermediary. No endless iteration. No prompting. Just outcomes delivered by agents that understand what matters and move without being told twice.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Four Principles</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { word: "Anticipate", desc: "The most powerful move isn't reacting. It's already being in motion before the problem is named. Our agents see what's coming and act before anyone asks." },
                    { word: "Adapt", desc: "The world doesn't hold still. Conditions change, systems fail, goals shift. Agents that can only follow scripts break the moment reality deviates. Ours don't." },
                    { word: "Act", desc: "Thinking without doing is noise. Our agents close the loop from high-level intent to real-world outcome, without waiting for permission or clarification." },
                    { word: "Scale", desc: "Human attention is finite. Intelligent action shouldn't be. As complexity grows, the agents grow with it, compounding capability without compounding cost." },
                  ].map((p, i) => (
                    <Reveal key={i} root={scrollRef} delay={i * 50}>
                      <Card className={`border ${BORDER} rounded-xl p-8 cursor-default`}>
                        <p className={`text-[32px] ${TEXT} mb-4`} style={{ fontWeight: 500 }}>{p.word}</p>
                        <p className={`text-[16px] ${MUTED} leading-[1.8]`}>{p.desc}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Section>

              <HiringCTA root={scrollRef} />
            </div>
          )}

          {/* TEAM */}
          {activeTab === "team" && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-8">
                  <div>
                    <div className="mb-8">
                      <Image src="/zayd.png" alt="Zayd Malik" width={96} height={96}
                        className="w-24 h-24 rounded-full object-cover object-top" />
                    </div>
                    <p className={`text-[14px] uppercase tracking-[0.18em] ${LABEL_TEXT} mb-4`}>Co-founder & CEO</p>
                    <h2 className={`text-[26px] sm:text-[42px] leading-none ${TEXT} mb-3`} style={{ fontWeight: 500 }}>Zayd Malik</h2>
                    <p className={`text-[22px] ${TEXT} leading-[1.4] mb-4`} style={{ fontWeight: 400 }}>
                      &ldquo;AI should act, not just react.&rdquo;
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-8`}>
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-6`}>
                      Zayd started akakAI after observing that every AI tool people were using was passive. They waited. They asked for input. They responded. They never moved first.
                    </p>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      Frustrated with passive tools and overhyped tech, he set out to build something fundamentally different: AI that takes initiative, understands context, and actually follows through.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-8">
                  <div>
                    <div className="mb-8">
                      <Image src="/abhi.jpg" alt="Abhiram Vishnubhotla" width={96} height={96}
                        className="w-24 h-24 rounded-full object-cover object-top" />
                    </div>
                    <p className={`text-[14px] uppercase tracking-[0.18em] ${LABEL_TEXT} mb-4`}>Co-founder & Agent Developer</p>
                    <h2 className={`text-[26px] sm:text-[42px] leading-none ${TEXT} mb-3`} style={{ fontWeight: 500 }}>Abhiram Vishnubhotla</h2>
                    <p className={`text-[22px] ${TEXT} leading-[1.4] mb-4`} style={{ fontWeight: 400 }}>
                      &ldquo;Agents that don&apos;t just execute. They understand.&rdquo;
                    </p>
                    <a href="https://abhiramv09.replit.app/" target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-[13px] ${MUTED} border ${BORDER} px-4 py-1.5 rounded-full hover:border-[#444] hover:text-white transition-colors duration-150 w-fit`}>
                      abhiramv09.replit.app <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-8`}>
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-6`}>
                      Abhiram brings the technical depth to turn akakAI&apos;s vision into working systems. His focus is on the hardest problem in the space: building agents that don&apos;t just run through steps, but genuinely reason about what needs to happen next.
                    </p>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      He architects the core agent runtime, the layer responsible for goal comprehension, dynamic planning, and real-time decision-making across complex, multi-system environments.
                    </p>
                  </div>
                </div>
              </Section>

              <HiringCTA root={scrollRef} />
            </div>
          )}

          {/* INVESTMENTS */}
          {activeTab === "investments" && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <SectionLabel>Investment Inquiries</SectionLabel>
                    <h2 className={`text-[32px] leading-tight ${TEXT} mb-6`} style={{ fontWeight: 500 }}>
                      Interested in backing the next wave?
                    </h2>
                    <p className={`text-[18px] ${MUTED} leading-[1.8]`}>
                      akakAI is building the infrastructure for autonomous AI action. Agents that think independently, take initiative, and deliver outcomes without hand-holding.
                    </p>
                  </div>
                  <div className="sm:pt-14">
                    <p className={`text-[18px] ${MUTED} leading-[1.8] mb-8`}>
                      We are early, intentional, and moving fast. If you are interested in partnering with us on this mission, we would love to connect.
                    </p>
                    <a href="mailto:investments@akakai.com"
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[14px] hover:bg-zinc-200 transition-colors">
                      investments@akakai.com <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Press</SectionLabel>
                <div className="space-y-4">
                  <PressEntry
                    title="akakAI Secures Pre-Seed Funding, Valued at $1.5 Million"
                    date="July 7, 2025"
                    location="Dallas, TX"
                  >
                    <div className="space-y-6">
                      <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                        akakAI, the AI startup building autonomous agents that proactively get work done, announced today that it has secured a pre-seed funding round from an undisclosed investor, bringing the company&apos;s valuation to <span className="text-white" style={{ fontWeight: 500 }}>$1.5 million</span>.
                      </p>
                      <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                        Founded by Zayd Malik, akakAI&apos;s first product is an AI email agent that integrates directly with Gmail and Outlook, drafting email replies autonomously without requiring prompts, commands, or a separate app.
                      </p>
                      <div className={`border-l-2 border-[#2a2a2a] pl-6 py-1`}>
                        <p className={`text-[18px] text-[#aaa] leading-[1.7] italic`}>
                          &ldquo;This investment allows us to deepen our technical capabilities and grow our team as we continue building agents that work for people, not just with them.&rdquo;
                        </p>
                        <p className={`text-[13px] ${LABEL_TEXT} mt-3 uppercase tracking-[0.12em]`}>Zayd Malik, Founder, akakAI</p>
                      </div>
                      <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                        akakAI officially launched on July 3, 2025, and is currently onboarding early users.
                      </p>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 border-t ${BORDER} pt-6`}>
                        <div>
                          <p className={`text-[13px] uppercase tracking-[0.15em] ${LABEL_TEXT} mb-2`}>Website</p>
                          <a href="https://akakai.com" className={`text-[15px] ${MUTED} hover:text-white transition-colors`}>akakai.com</a>
                        </div>
                        <div>
                          <p className={`text-[13px] uppercase tracking-[0.15em] ${LABEL_TEXT} mb-2`}>Media Contact</p>
                          <a href="mailto:media@akakai.com" className={`text-[15px] ${MUTED} hover:text-white transition-colors`}>media@akakai.com</a>
                        </div>
                      </div>
                    </div>
                  </PressEntry>
                </div>
              </Section>

              <HiringCTA root={scrollRef} />
            </div>
          )}

          {/* PROJECTS LIST */}
          {activeTab === "projects" && projectView === null && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <SectionLabel>Products</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <Card className={`border ${BORDER} rounded-2xl overflow-hidden`}>
                    <div className={`px-8 py-10 border-b ${BORDER}`}>
                      <p className={`text-[11px] uppercase tracking-[0.2em] ${LABEL_TEXT} mb-3`}>01 — Autonomous Agent Platform</p>
                      <h2 className={`text-[26px] sm:text-[38px] ${TEXT} leading-none mb-2`} style={{ fontWeight: 500, fontStyle: "italic" }}>Aegent.</h2>
                      <p className={`text-[14px] ${LABEL_TEXT}`}>by akakAI</p>
                    </div>
                    <div className="px-8 py-8">
                      <p className={`text-[16px] ${MUTED} leading-[1.8] mb-6`}>
                        A no-code platform for building autonomous AI agents that listen to real-world triggers and act through a community-built integration library. No code. No prompting. Just outcomes.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {["Node.js", "React", "PostgreSQL", "LLMs"].map(t => (
                          <span key={t} className={`text-[12px] ${MUTED} border ${BORDER} px-3 py-1 rounded-full`}>{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {/* <button
                          onClick={() => { setProjectView("aegent"); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[13px] hover:bg-zinc-200 transition-colors">
                          Case Study <ArrowUpRight size={13} />
                        </button> */}
                        <a href="https://aegent.akakai.com" target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-[13px] ${MUTED} border ${BORDER} px-5 py-2.5 rounded-full hover:border-[#444] hover:text-white transition-colors`}>
                          aegent.akakai.com <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className={`border ${BORDER} rounded-2xl overflow-hidden`}>
                    <div className={`px-8 py-10 border-b ${BORDER}`}>
                      <p className={`text-[11px] uppercase tracking-[0.2em] ${LABEL_TEXT} mb-3`}>02 — Autonomous Email Agent</p>
                      <h2 className={`text-[26px] sm:text-[38px] ${TEXT} leading-none mb-2`} style={{ fontWeight: 500, fontStyle: "italic" }}>Email.</h2>
                      <p className={`text-[14px] ${LABEL_TEXT}`}>by akakAI</p>
                    </div>
                    <div className="px-8 py-8">
                      <p className={`text-[16px] ${MUTED} leading-[1.8] mb-6`}>
                        An AI agent that integrates directly with Gmail and Outlook, drafting autonomous email replies without prompts or commands. It reads your inbox, understands context, and responds before you even open the thread.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {["LLMs", "Gmail API", "Outlook API", "OAuth"].map(t => (
                          <span key={t} className={`text-[12px] ${MUTED} border ${BORDER} px-3 py-1 rounded-full`}>{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {/* <button
                          onClick={() => { setProjectView("email"); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[13px] hover:bg-zinc-200 transition-colors">
                          Case Study <ArrowUpRight size={13} />
                        </button> */}
                        <a href="https://email.akakai.com" target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-[13px] ${MUTED} border ${BORDER} px-5 py-2.5 rounded-full hover:border-[#444] hover:text-white transition-colors`}>
                          email.akakai.com <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </Card>

                </div>
              </Section>
              <HiringCTA root={scrollRef} />
            </div>
          )}

          {/* AEGENT CASE STUDY */}
          {activeTab === "projects" && projectView === "aegent" && (
            <div className="px-4 sm:px-8">
              <div className={`py-10 border-b ${BORDER}`}>
                <button onClick={() => { setProjectView(null); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`inline-flex items-center gap-2 text-[13px] ${MUTED} hover:text-white transition-colors mb-10`}>
                  Back to Products
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 sm:gap-12 items-start">
                  <div>
                    <h2 className={`text-[28px] sm:text-[56px] ${TEXT} leading-none mb-3`} style={{ fontWeight: 500, fontStyle: "italic" }}>Aegent.</h2>
                    <p className={`text-[18px] ${MUTED}`}>Autonomous AI Agent Platform</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { label: "Timeline", value: "2025 – 2026" },
                      { label: "Funding", value: "$1.5M Pre-Seed" },
                      { label: "Type", value: "Full-Stack AI Platform" },
                      { label: "Tech", value: "Node.js, React, PostgreSQL, LLMs" },
                      { label: "Status", value: "Live — Early Access" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className={`text-[11px] uppercase tracking-[0.15em] ${LABEL_TEXT} mb-1`}>{label}</p>
                        <p className={`text-[14px] ${MUTED}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Section first root={scrollRef}>
                <SectionLabel>Overview</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h3 className={`text-[26px] ${TEXT} leading-tight mb-6`} style={{ fontWeight: 500 }}>
                      A no-code platform for building agents that act on real-world events.
                    </h3>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      Aegent lets anyone build agents that listen to real-world triggers — email inboxes, cron schedules, Slack channels — and act autonomously through integrations, without writing a single line of code.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12 gap-5`}>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      akakAI closed $1.5M in pre-seed funding on the strength of Aegent&apos;s architecture and vision, demonstrating that production-grade autonomous AI doesn&apos;t require a team of engineers.
                    </p>
                    <a href="https://aegent.akakai.com" target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-[13px] ${MUTED} border ${BORDER} px-5 py-2.5 rounded-full hover:border-[#444] hover:text-white transition-colors w-fit`}>
                      Visit Aegent <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>The Challenge</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h3 className={`text-[24px] ${TEXT} leading-tight mb-5`} style={{ fontWeight: 500 }}>
                      Building AI agents today requires significant engineering.
                    </h3>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      LLM orchestration, tool calling, event listeners, integration management, and evaluation all need to be wired together manually. No platform made this accessible without code while still being powerful enough for production workflows.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      Non-technical users needed to configure complex agentic behavior — listeners, scripts, memory, escalation — without touching code. And every agent run needed to be fully observable.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Solution — Agent Builder</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <p className={`text-[17px] ${MUTED} leading-[1.85] mb-4`}>
                      Each agent has a configurable identity, behavior profile, and additional context. Agents are structured around a sidebar with separate tabs for Connections, Monitoring, and Developer tools.
                    </p>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      The agent builder is fully no-code and persists all configuration to a per-agent database, giving users complete control without writing a line of code.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <Image src="/aegent-thread.png" alt="Aegent thread monitoring" width={900} height={600}
                      className="w-full rounded-xl border border-[#222] object-cover" />
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Solution — Listeners</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <p className={`text-[17px] ${MUTED} leading-[1.85] mb-6`}>
                      Listeners are the trigger layer — they define when an agent runs. Aegent&apos;s listener architecture is extensible, allowing an infinite number of listener types to be connected to any agent.
                    </p>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Cron Job", desc: "Triggers the agent on a schedule defined by a cron expression." },
                        { label: "Webhook", desc: "Listens for incoming HTTP requests and triggers the agent the moment a payload arrives." },
                        { label: "Polling", desc: "Continuously checks an external source at a configurable interval and triggers on new data." },
                      ].map((item) => (
                        <Card key={item.label} className={`${CARD} rounded-xl p-5 cursor-default`}>
                          <p className={`text-[14px] ${TEXT} mb-1.5`} style={{ fontWeight: 500 }}>{item.label}</p>
                          <p className={`text-[14px] ${MUTED} leading-[1.75]`}>{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className={`flex flex-col gap-5 justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <Image src="/aegent-listener-email.png" alt="Email inbox listener" width={900} height={500}
                      className="w-full rounded-xl border border-[#222] object-cover" />
                    <Image src="/aegent-listener-cron.png" alt="Cron job listener" width={900} height={500}
                      className="w-full rounded-xl border border-[#222] object-cover" />
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Solution — Integration Library</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <p className={`text-[17px] ${MUTED} leading-[1.85] mb-4`}>
                      Integrations are the action layer. Aegent&apos;s community library includes integrations built by akakAI and contributors: Email Send, Slack, Database, Microsoft Teams, Twilio SMS, PayPal, Google Calendar, and more.
                    </p>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      Each integration has a structured parameter schema and can be added to any agent with one click. The community model enables the platform to scale capabilities without central engineering bottlenecks.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <Image src="/aegent-integrations.png" alt="Community integration library" width={900} height={600}
                      className="w-full rounded-xl border border-[#222] object-cover" />
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Solution — Thread Monitoring</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <p className={`text-[17px] ${MUTED} leading-[1.85] mb-4`}>
                      Every agent run produces a full thread: a timestamped, step-by-step trace of every event received, action taken, integration called, and interaction concluded.
                    </p>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      Each thread is evaluated by a secondary LLM that rates success, identifies what went right or wrong, and extracts key learnings that feed back into the agent&apos;s improvement loop.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <Image src="/aegent-evaluation.png" alt="Thread evaluation" width={900} height={600}
                      className="w-full rounded-xl border border-[#222] object-cover" />
                  </div>
                </div>
              </Section>
            </div>
          )}

          {/* EMAIL CASE STUDY */}
          {activeTab === "projects" && projectView === "email" && (
            <div className="px-4 sm:px-8">
              <div className={`py-10 border-b ${BORDER}`}>
                <button onClick={() => { setProjectView(null); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`inline-flex items-center gap-2 text-[13px] ${MUTED} hover:text-white transition-colors mb-10`}>
                  Back to Products
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 sm:gap-12 items-start">
                  <div>
                    <h2 className={`text-[28px] sm:text-[56px] ${TEXT} leading-none mb-3`} style={{ fontWeight: 500, fontStyle: "italic" }}>Email.</h2>
                    <p className={`text-[18px] ${MUTED}`}>Autonomous Email Agent</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { label: "Timeline", value: "2025" },
                      { label: "Type", value: "Autonomous Email Agent" },
                      { label: "Tech", value: "LLMs, Gmail API, Outlook API, OAuth" },
                      { label: "Status", value: "Live" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className={`text-[11px] uppercase tracking-[0.15em] ${LABEL_TEXT} mb-1`}>{label}</p>
                        <p className={`text-[14px] ${MUTED}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Section first root={scrollRef}>
                <div className="mb-8 rounded-2xl overflow-hidden border border-[#222]">
                  <Image src="/email-hero.png" alt="Email Agent" width={1200} height={600}
                    className="w-full object-cover" />
                </div>
                <SectionLabel>Overview</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h3 className={`text-[26px] ${TEXT} leading-tight mb-6`} style={{ fontWeight: 500 }}>
                      Your inbox, handled autonomously.
                    </h3>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      The Email Agent integrates directly with Gmail and Outlook, monitoring your inbox in real time and drafting contextually appropriate replies without requiring prompts, commands, or a separate app.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      It uses your calendar data and email history to craft personalized responses, intelligently routes messages to the right language model, and filters out promotional noise so only meaningful emails get auto-replied.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>How It Works</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {[
                    { label: "Intelligent Context Awareness", desc: "The agent uses information from your calendar and previous emails to craft personalized, contextually appropriate responses." },
                    { label: "Cognitive Routing", desc: "Incoming emails are analyzed and routed to the most suitable language model based on message type, complexity, and intent." },
                    { label: "Smart Response Filtering", desc: "Promotional emails are automatically ignored. Auto-responses are only sent to relevant, meaningful messages." },
                  ].map((c, i) => (
                    <Reveal key={i} root={scrollRef} delay={i * 30}>
                      <Card className={`${CARD} rounded-xl p-6 cursor-default`}>
                        <p className={`text-[15px] ${TEXT} mb-2`} style={{ fontWeight: 500 }}>{c.label}</p>
                        <p className={`text-[14px] ${MUTED} leading-[1.75]`}>{c.desc}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h3 className={`text-[24px] ${TEXT} leading-tight mb-5`} style={{ fontWeight: 500 }}>
                      Why It Matters
                    </h3>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      Email is one of the highest-friction surfaces in professional work. The Email Agent eliminates that friction entirely — not by helping you write faster, but by handling the work before you even see it.
                    </p>
                  </div>
                  <div className={`flex flex-col justify-center sm:border-l sm:border-[#222] sm:pl-12`}>
                    <p className={`text-[17px] ${MUTED} leading-[1.85]`}>
                      This is what agentic AI looks like in practice: not a tool you use, but a system that works while you focus on what only you can do.
                    </p>
                  </div>
                </div>
              </Section>

              <Section root={scrollRef} delay={60}>
                <SectionLabel>Core Features</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { label: "Gmail & Outlook Integration", desc: "Native OAuth-based integration with both major email platforms." },
                    { label: "Context-Aware Replies", desc: "Responses are informed by calendar events, email history, and user preferences." },
                    { label: "Multi-Model Routing", desc: "Each email is routed to the optimal LLM based on complexity and intent." },
                    { label: "Promotional Filtering", desc: "Newsletters, marketing, and automated messages are automatically skipped." },
                    { label: "Zero Interface Required", desc: "No app to open. No prompt to write. The agent works in the background." },
                    { label: "Lightweight Setup", desc: "Get started in minutes with simple setup and seamless compatibility with existing tools." },
                  ].map((c, i) => (
                    <Reveal key={i} root={scrollRef} delay={i * 30}>
                      <Card className={`${CARD} rounded-xl p-6 cursor-default`}>
                        <p className={`text-[15px] ${TEXT} mb-2`} style={{ fontWeight: 500 }}>{c.label}</p>
                        <p className={`text-[14px] ${MUTED} leading-[1.75]`}>{c.desc}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <div className="px-4 sm:px-8">
              <Section first root={scrollRef}>
                <div className={`border ${BORDER} rounded-xl p-6 sm:p-10`}>
                  <p className={`text-[13px] uppercase tracking-[0.18em] ${LABEL_TEXT} mb-5`}>We are Hiring</p>
                  <h3 className={`text-[24px] sm:text-[34px] ${TEXT} leading-tight mb-4`} style={{ fontWeight: 500 }}>
                    Build what comes after passive AI.
                  </h3>
                  <p className={`text-[16px] sm:text-[18px] ${MUTED} leading-[1.75] mb-8 max-w-lg`}>
                    If you believe AI should move first and deliver without hand-holding, we want to talk.
                  </p>
                  <a href="mailto:media@akakai.com" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[14px] hover:bg-zinc-200 transition-colors">
                    Get in touch <ArrowUpRight size={14} />
                  </a>
                </div>
              </Section>
            </div>
          )}

          {/* Footer */}
          <div className={`border-t ${BORDER} px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-4 flex-wrap`}>
            <Image src="/logo-horizontal.png" alt="akakAI" width={80} height={20}
              style={{ filter: "brightness(0) invert(1)" }} className="h-5 w-auto opacity-20" />
            <div className={`flex items-center gap-7 text-[13px] ${MUTED}`}>
              <a href="mailto:investments@akakai.com" className="hover:text-white transition-colors">Investments</a>
              <a href="mailto:media@akakai.com" className="hover:text-white transition-colors">Press</a>
              <span className="text-[#2a2a2a]">|</span>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
              <span className="text-[#2a2a2a]">|</span>
              <span>2026 akakAI</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
