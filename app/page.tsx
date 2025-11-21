"use client";

import { useEffect, useRef, useState } from "react";
import Prism from "../components/Prism";
import LightRays from "../components/LightRays";
import CurvedLoop from "../components/CurvedLoop";
import AppHero from "../components/PipeFlowGlow";
import CardNav from "../components/CardNav";

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
              height: "150vh",
              position: "absolute",
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
              height: "150vh",
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
              height: "78vh",
              position: "absolute",
              bottom: 0,
              zIndex: 10,
            }}
          >
            <AppHero />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full mix-blend-screen opacity-20 blur-3xl" />
            <div className="absolute bottom-50 left-10 w-72 h-72 bg-accent rounded-full mix-blend-screen opacity-20 blur-3xl" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mb-45">
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

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white animate-fade-in-up">
              Why Scroll Snapping?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smooth Experience",
                  description:
                    "Navigate through content seamlessly with locked sections",
                  icon: "✨",
                },
                {
                  title: "Engaging Animation",
                  description:
                    "Each section animates in smoothly as you scroll",
                  icon: "🎬",
                },
                {
                  title: "Full Control",
                  description:
                    "Stay focused on what matters with one section at a time",
                  icon: "🎯",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up border border-slate-700"
                  style={{ animationDelay: `${(i + 1) * 0.15}s` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section 1 */}
        <section className="snap-section">

          <div className="relative z-10 text-center max-w-3xl px-4">
            <div className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full mb-6 animate-fade-in-scale">
              <span className="text-accent font-semibold">Section 3</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Anchor your journey
            </h2>
            <p className="text-lg text-slate-300 animate-fade-in-up stagger-1">
              Each section locks into place, giving you time to absorb the
              content before moving to the next experience.
            </p>
          </div>
        </section>

        {/* Content Section 2 */}
        <section className="snap-section">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen opacity-20 blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-screen opacity-20 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-white animate-fade-in-up">
                  Beautiful Transitions
                </h2>
                <p className="text-lg text-slate-300 mb-8 animate-fade-in-up stagger-1">
                  Watch as content fades in, scales up, and slides into view.
                  Every interaction is crafted for delight.
                </p>
                <button
                  onClick={() => scrollToSection(5)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-2"
                >
                  Continue
                </button>
              </div>
              <div className="animate-fade-in-scale">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Final Section */}
        <section className="snap-section">
          <div className="relative z-10 text-center max-w-3xl px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to scroll?
            </h2>
            <p className="text-xl text-slate-400 mb-8 animate-fade-in-up stagger-1">
              Go back to the top and experience the smooth scroll-snapping in
              action.
            </p>
            <button
              onClick={() => scrollToSection(0)}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 animate-fade-in-up stagger-2"
            >
              Back to Top
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
