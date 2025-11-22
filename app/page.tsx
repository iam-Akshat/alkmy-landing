"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Ghost, Search, AlertTriangle, MessageSquare, LayoutGrid, Eye } from "lucide-react";
import Prism from "../components/Prism";
import TiltedCard from "../components/TiltedCard";
import LightRays from "../components/LightRays";
import CurvedLoop from "../components/CurvedLoop";
import AppHero from "../components/PipeFlowGlow";
import CardNav from "../components/CardNav";
import MagicBento from "../components/MagicBento";
import { Footer } from "../components/Footer";
import CardSwap, { Card } from "../components/CardSwap";

export default function ScrollSnapPage() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / sectionHeight);
      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  return (
    <>
      <div
        className="snap-container bg-gradient-to-br from-slate-900 to-slate-800 text-white"
        ref={containerRef}
      >
        <CardNav
          logoAlt="Alkmy AI"
          items={items}
          baseColor="#ffffff20"
          menuColor="white"
          buttonBgColor="white"
          buttonTextColor="black"
          ease="power3.out"
        />
        {/* Hero Section */}
        <section className="header-section relative">
          <div
            style={{
              width: "100%",
              height: "180vh",
              position: "absolute",
              top: "-15vh",
              zIndex: 10,
            }}
          >
            <Prism
              animationType="rotate"
              timeScale={0.1}
              height={3.5}
              baseWidth={5.5}
              scale={0.5}
              hueShift={0}
              colorFrequency={1}
              noise={0}
              glow={0.2}
              offset={{ y: 300, x: 0 }}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: "180vh",
              position: "absolute",
              zIndex: 5,
            }}
          >
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={0.5}
              followMouse={true}
              mouseInfluence={0.5}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
            />
          </div>
          <div
            style={{
              width: "100%",
              height: "100vh",
              position: "absolute",
              top: "78vh",
              zIndex: 10,
            }}
          >
            <AppHero />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
            }}
          >
            <TiltedCard
              imageSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              altText="Churn Risk Card"
              captionText=""
              containerHeight="200px"
              containerWidth="480px"
              imageHeight="160px"
              imageWidth="480px"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-full h-full bg-[#0f1117] rounded-[20px] p-6 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 via-purple-500/50 to-blue-500/50" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">URGENT • CHURN RISK</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">Checkout Failure on iOS 17</h3>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700 backdrop-blur-sm">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider text-center">IMPACT</div>
                      <div className="text-sm font-bold text-indigo-400">$14k<span className="text-slate-500 font-normal">/day</span></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex gap-3 items-start">
                      <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-300 italic leading-relaxed">"I've tried to buy the pro plan 3 times. It just freezes. Guess I'll use the other app." <span className="text-slate-600 not-italic block mt-1">— via Reddit</span></p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <AlertTriangle className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-300 italic leading-relaxed">"Support ticket #4920: Customer asking for refund due to crash..." <span className="text-slate-600 not-italic block mt-1">— via Zendesk</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button className="flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#5558dd] text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                      <LayoutGrid className="w-3 h-3" />
                      Push to Jira
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-lg border border-slate-700 transition-colors">
                      <Eye className="w-3 h-3" />
                      View Analysis
                    </button>
                  </div>
                </div>
              }
            />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full mix-blend-screen opacity-20 blur-3xl" />
            <div className="absolute bottom-50 left-10 w-72 h-72 bg-accent rounded-full mix-blend-screen opacity-20 blur-3xl" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl bottom-40 mb-16">
            <h1 className="text-6xl md:text-7xl text-white mb-4 animate-fade-in-up  headerMainText ">
              The Agentic Co-Pilot <br /> for Product Teams
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8 animate-fade-in-up stagger-1 ">
              Alkmy transforms chaotic customer voice from the deepest corners
              of the internet into clear, actionable product intelligence.
            </p>
            <button
              onClick={() => scrollToSection(1)}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 animate-fade-in-up stagger-2"
            >
              Know More
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="snap-section">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply opacity-10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 mt-40">
            <div className="text-center mb-16 max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Most PMs aren't building products. <br />
                <span className="text-slate-500">They're playing detective.</span>
              </h2>
              <p className="text-xl text-slate-400 animate-fade-in-up stagger-1">
                You're drowning in data but starving for insight. The "Voice of the Customer" is shattered
                across a thousand Reddit threads, support tickets, and angry tweets. You're essentially flying blind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="Silent Churn"
                captionText="Silent Churn"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[300px] h-[300px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <Ghost className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Silent Churn</h3>
                    <p className="text-slate-400 text-sm">
                      Users leaving for reasons you never even saw coming.
                    </p>
                  </div>
                }
              />

              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="Synthesis Failure"
                captionText="Synthesis Failure"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[300px] h-[300px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <Search className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Synthesis Failure</h3>
                    <p className="text-slate-400 text-sm">
                      Manual tagging in spreadsheets? That's not a strategy.
                    </p>
                  </div>
                }
              />

              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="HiPPO Decisions"
                captionText="HiPPO Decisions"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[300px] h-[300px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <AlertTriangle className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">HiPPO Decisions</h3>
                    <p className="text-slate-400 text-sm">
                      Roadmaps driven by the Highest Paid Person's Opinion, not data.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        {/* Content Section 1 */}
        <section className="snap-section">

          <div className="relative z-10 text-center max-w-6xl px-4">
                        <div className="text-center mb-4 max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Why Choose <span className="text-[#C39B65]">Alkmy Intelligence?</span>
              </h2>
            </div>
            <MagicBento />
          </div>
        </section>

        {/* Content Section 2 */}
        <section className="snap-section">

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <h3>Card 1</h3>
                <p>Your content here</p>
              </Card>
              <Card>
                <h3>Card 2</h3>
                <p>Your content here</p>
              </Card>
              <Card>
                <h3>Card 3</h3>
                <p>Your content here</p>
              </Card>
            </CardSwap>
          </div>
        </section>

        {/* Final Section */}
        <section className="snap-section">
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 mx-auto text-center">
            <h2 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl animate-fade-in-up">
              Dare to see what they're <br />
              <span className="text-[#C39B65]">really saying?</span>
            </h2>

            <p className="max-w-2xl mb-10 text-lg text-slate-400 animate-fade-in-up stagger-1">
              Enter your App Store or Google Play URL. We'll analyze your last 100 reviews
              and email you one actionable insight. Free.
            </p>

            <div className="flex flex-col items-center w-full max-w-xl gap-4 mb-6 sm:flex-row animate-fade-in-up stagger-2">
              <input
                type="text"
                placeholder="https://apps.apple.com/app/..."
                className="w-full px-6 py-4 text-white transition-all border border-slate-700 rounded-xl bg-slate-800/50 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
              />
              <button className="flex items-center justify-center w-full px-8 py-4 font-bold text-black transition-transform bg-white sm:w-auto rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap">
                Analyze Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            <p className="text-sm text-slate-500 animate-fade-in-up stagger-3">
              No credit card required. Results in ~45 seconds.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
