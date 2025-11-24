"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Ghost, AlertTriangle, MessageSquare, LayoutGrid, Eye, EyeOff, BanknoteArrowUp, Zap } from "lucide-react";
import Prism from "../components/Prism";
import TiltedCard from "../components/TiltedCard";
import LightRays from "../components/LightRays";
import AppHero from "../components/PipeFlowGlow";
import CardNav from "../components/CardNav";
import MagicBento from "../components/MagicBento";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { 
  SiZendesk, SiReddit, SiApple, SiGoogleplay, SiX, SiDiscord, 
  SiSalesforce, SiHubspot, SiGithub, SiTrustpilot, SiTypeform, SiYoutube, 
  SiTiktok, SiInstagram, SiWhatsapp, SiGmail,
  SiJira, SiSlack, SiAsana, SiTrello, 
  SiNotion, SiClickup, SiGitlab, SiAirtable, SiGooglesheets, 
  SiDatadog, SiSnowflake
} from 'react-icons/si';
import ProcessFlow from "../components/ProcessFlow";

const MockBar = ({ label, width, color }: { label: string, width: string, color: string }) => (
  <div className="group/bar">
    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
      <span>{label}</span>
      <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity">{width}</span>
    </div>
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`} 
      />
    </div>
  </div>
);

const SolutionsSection = () => {
  const [activeTab, setActiveTab] = useState<'pm' | 'ceo' | 'comp'>('pm');

  const content = {
    pm: {
      title: "The Roadmap Architect",
      subtitle: "For Product Managers",
      tagline: "Ship with certainty.",
      desc: "Stop fighting for resources based on 'I think'. Walk into the meeting with 'The data says'. Alkmy ranks every request as per your business needs!",
      stats: [
        { label: "Planning Time", val: "-80%" },
        { label: "Feature Adoption", val: "+45%" }
      ],
      gradient: "from-blue-500 to-indigo-600"
    },
    ceo: {
      title: "The Bullshit Detector",
      subtitle: "For the CEO",
      tagline: "Unfiltered truth.",
      desc: "Middle management sanitizes the bad news. Alkmy gives you the raw, unfiltered pulse of your business. See the fires before they burn the house down.",
      stats: [
        { label: "Churn Prediction", val: "92%" },
        { label: "Crisis Alerts", val: "Real-time" }
      ],
      gradient: "from-violet-500 to-fuchsia-600"
    },
    comp: {
      title: "The War Room",
      subtitle: "For Strategists",
      tagline: "Offensive intelligence.",
      desc: "Your competitor's unhappy users are your best leads. We track their crashes, their pricing complaints, and their missing features so you can steal their market share.",
      stats: [
        { label: "Competitor Insights", val: "Live" },
        { label: "Opportunity Score", val: "High" }
      ],
      gradient: "from-rose-500 to-orange-600"
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 mx-4">
         <div>
           <div className="text-indigo-500 font-mono text-sm font-bold uppercase tracking-widest mb-2">Intelligence Suite</div>
           <h2 className="text-4xl md:text-5xl font-bold text-white">Three lenses.<br/>One source of truth.</h2>
         </div>
         
         {/* Tab Switcher */}
         <div className="flex flex-wrap bg-slate-900 p-1 rounded-xl border border-white/10 max-w-full justify-center md:justify-start">
            {(Object.keys(content) as Array<keyof typeof content>).map((key) => (
              <button 
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg text-sm my-1 mx-1 font-bold transition-all whitespace-nowrap ${
                  activeTab === key 
                  ? 'bg-white text-slate-950 shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {content[key].subtitle}
              </button>
            ))}
         </div>
      </div>

      {/* Feature Display */}
      <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl  mx-4">
         <div className="grid md:grid-cols-12 min-h-[500px]">
            
            {/* Visual Side (Left) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`md:col-span-7 relative bg-gradient-to-br ${content[activeTab].gradient} p-10 flex items-center justify-center overflow-hidden group`}
              >
                 {/* Decorative Circles */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-2xl -ml-20 -mb-20"></div>
                 
                 {/* Mock Interface */}
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative w-full max-w-md bg-slate-950/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 transform transition-transform duration-500 group-hover:-translate-y-2"
                 >
                    {/* Mock Header */}
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       </div>
                       <div className="text-[10px] font-mono text-slate-500">ALKMY_INTELLIGENCE_V1.0</div>
                    </div>
                    
                    {/* Dynamic Content Mock */}
                    <div className="space-y-3">
                       <div className="h-2 w-1/3 bg-slate-800 rounded mb-4"></div>
                       <MockBar label="Sentiment Velocity" width="80%" color="bg-indigo-500" />
                       <MockBar label="Feature Demand" width="65%" color="bg-purple-500" />
                       <MockBar label="Churn Risk" width="40%" color="bg-pink-500" />
                       
                       <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                             <Zap size={14} className="text-yellow-400" />
                             <span className="text-xs font-bold text-white">AI Recommendation</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                             Prioritize "Dark Mode" update. Competitor Y released it yesterday. User demand has spiked 240% in last 12 hours.
                          </p>
                       </div>
                    </div>
                 </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Content Side (Right) */}
            <div className="md:col-span-5 p-10 md:p-12 flex flex-col justify-center bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2 inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-indigo-400 border border-indigo-500/20">
                      {content[activeTab].tagline}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      {content[activeTab].title}
                    </h3>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                      {content[activeTab].desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
                       {content[activeTab].stats.map((stat, i) => (
                         <div key={i}>
                            <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
            </div>

         </div>
      </div>

    </div>
  );
};

const integrations = [
  { node: <SiApple />, title: "App Store", color: "text-gray-300" },
  { node: <SiGoogleplay />, title: "Google Play", color: "text-green-400" },
  { node: <SiReddit />, title: "Reddit", color: "text-orange-500" },
  { node: <SiX />, title: "X (Twitter)", color: "text-white" },
  { node: <SiZendesk />, title: "Zendesk", color: "text-green-600" },
  { node: <SiSalesforce />, title: "Salesforce", color: "text-blue-400" },
  { node: <SiHubspot />, title: "HubSpot", color: "text-orange-600" },
  { node: <SiDiscord />, title: "Discord", color: "text-indigo-400" },
  { node: <SiTrustpilot />, title: "Trustpilot", color: "text-green-500" },
  { node: <SiTypeform />, title: "Typeform", color: "text-gray-400" },
  { node: <SiYoutube />, title: "YouTube", color: "text-red-500" },
  { node: <SiTiktok />, title: "TikTok", color: "text-pink-500" },
  { node: <SiInstagram />, title: "Instagram", color: "text-pink-400" },
  { node: <SiGmail />, title: "Email", color: "text-red-400" },
    { node: <SiJira />, title: "Jira", color: "text-blue-500" },
  { node: <SiSlack />, title: "Slack", color: "text-purple-400" },
    { node: <SiAsana />, title: "Asana", color: "text-red-400" },
  { node: <SiTrello />, title: "Trello", color: "text-blue-400" },
  { node: <SiNotion />, title: "Notion", color: "text-white" },
  { node: <SiWhatsapp />, title: "Whatsapp", color: "text-green-400" },
  { node: <SiClickup />, title: "ClickUp", color: "text-purple-500" },
  { node: <SiGithub />, title: "GitHub Issues", color: "text-white" },
  { node: <SiGitlab />, title: "GitLab", color: "text-orange-500" },
  { node: <SiAirtable />, title: "Airtable", color: "text-yellow-400" },
  { node: <SiGooglesheets />, title: "Sheets", color: "text-green-500" },
  { node: <SiDatadog />, title: "Datadog", color: "text-purple-600" },
  { node: <SiSnowflake />, title: "Snowflake", color: "text-blue-300" },
];


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
          baseColor="#ffffff"
          menuColor="black"
          buttonBgColor="black"
          buttonTextColor="white"
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
            className="absolute w-full z-10"
            style={{
              height: "100vh",
              top: "78vh",
            }}
          >
            <AppHero />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 w-[90vw] max-w-[480px] bottom-[5%] md:bottom-0"
          >
            <TiltedCard
              imageSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              altText="Churn Risk Card"
              captionText=""
              containerHeight="200px"
              containerWidth="100%"
              imageHeight="160px"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-full h-full bg-[#0f1117] rounded-[20px] p-6 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-red-500/50" />
                  
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
          <div className="relative z-10 max-w-6xl mx-auto px-4 mt-32">
            <div className="text-center mb-16 max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 animate-fade-in-up">
                The Cost of being Deaf <br />
                <span className="text-slate-500">Stop playing detective. Be Ahead.</span>
              </h2>
              <p className="text-xl text-slate-400 animate-fade-in-up stagger-1 max-w-4xl mx-auto">
                You're either unaware of what your customers are saying or drowning in data but starving for insight.<br/><br/> <span className="text-[#C39B65]">The "Voice of the Customer" is shattered across a thousands of Reddit threads, Social Media, Support Tickets, and Angry Tweets.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="Silent Churn"
                captionText="Silent Churn"
                containerHeight="250px"
                containerWidth="250px"
                imageHeight="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[250px] h-[250px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <Ghost className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Silent<br />Churn</h3>
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
                containerHeight="250px"
                containerWidth="250px"
                imageHeight="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[250px] h-[250px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <AlertTriangle className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Wasted<br />Cycles</h3>
                    <p className="text-slate-400 text-sm">
                     Engineering spends months building features nobody wants.
                    </p>
                  </div>
                }
              />

              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="HiPPO Decisions"
                captionText="HiPPO Decisions"
                containerHeight="250px"
                containerWidth="250px"
                imageHeight="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[250px] h-[250px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <BanknoteArrowUp className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">HiPPO<br />Decisions</h3>
                    <p className="text-slate-400 text-sm">
                      Roadmaps driven by the Highest Paid Person's Opinion, not data.
                    </p>
                  </div>
                }
              />

              <TiltedCard
                imageSrc="https://placehold.co/300x300/0f172a/0f172a.png"
                altText="HiPPO Decisions"
                captionText="HiPPO Decisions"
                containerHeight="250px"
                containerWidth="250px"
                imageHeight="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-[250px] h-[250px] p-8 flex flex-col justify-end bg-slate-900/90 border border-slate-800 rounded-[15px]">
                    <EyeOff className="w-10 h-10 text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Competitive<br />Blindness</h3>
                    <p className="text-slate-400 text-sm">
                      You get blindsided by competitors who were actually listening.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        {/* Content Section 1 */}
        <section className="snap-section">

          <div className="relative z-10 text-center max-w-6xl px-4 mt-32">
                        <div className="text-center mb-4 max-w-6xl mx-auto ">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up ">
                Why Choose <span className="text-[#C39B65]">Alkmy Intelligence?</span>
              </h2>
            </div>
            <MagicBento />
          </div>
        </section>

        {/* Content Section 2 */}
        <section className="snap-section py-24 px-6 relative">
          <SolutionsSection />
          <ProcessFlow />
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
