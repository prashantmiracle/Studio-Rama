import React, { useState, useEffect, useMemo } from "react";
import { Product, SlideData, BrandTheme, ThemeName } from "./types";
import { PRODUCTS, SLIDES, TIMELINE_EVENTS, THEMES } from "./data";
import StyleMatrimony from "./components/StyleMatrimony";
import LookbookGrid from "./components/LookbookGrid";
import CurationPanel from "./components/CurationPanel";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Calendar,
  Layers,
  Phone,
  Mail,
  ArrowRight,
  UserCheck,
  Briefcase,
  Compass,
  Palette,
  Eye,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  Plus,
  RefreshCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Globe2,
  Bookmark,
  Heart,
  Clock,
  ExternalLink
} from "lucide-react";

export default function App() {
  // Navigation & Interactive States
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeThemeName, setActiveThemeName] = useState<ThemeName>("crimsonGold");
  const [isPresenterView, setIsPresenterView] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isBoutiqueSound, setIsBoutiqueSound] = useState(false);
  const [isCurationOpen, setIsCurationOpen] = useState(false);
  
  // Custom user items liked or saved
  const [curatedIds, setCuratedIds] = useState<string[]>([]);
  
  // Slide details and total count
  const currentSlide: SlideData = SLIDES[currentSlideIndex];
  const activeTheme = THEMES[activeThemeName];
  
  // Simulated boutique sound effect (gentle harp/bell synthesized using Web Audio API safely)
  const playBoutiqueSound = () => {
    if (!isBoutiqueSound) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playNote = (freq: number, delay: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + dur);
      };

      // Play soft high chord (simulating boutique copper wind chime)
      playNote(523.25, 0, 1.2); // C5
      playNote(659.25, 0.15, 1.4); // E5
      playNote(783.99, 0.3, 1.6); // G5
      playNote(987.77, 0.45, 1.8); // B5
    } catch (e) {
      console.warn("Audio context failed or blocked by frame sandbox restrictions.");
    }
  };

  // Keyboard navigation listener (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return; // Avoid intercepting form typography typing
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        handlePrevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex]);

  // Autoplay clock loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoplay) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, currentSlideIndex]);

  const handleNextSlide = () => {
    playBoutiqueSound();
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    playBoutiqueSound();
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const selectSlide = (index: number) => {
    playBoutiqueSound();
    setCurrentSlideIndex(index);
  };

  // Curated products handler
  const curatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => curatedIds.includes(p.id));
  }, [curatedIds]);

  const toggleCuration = (product: Product) => {
    setCuratedIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const removeItemFromCuration = (product: Product) => {
    setCuratedIds((prev) => prev.filter((id) => id !== product.id));
  };

  const clearAllCurations = () => {
    setCuratedIds([]);
  };

  // Interactive booking form local states
  const [bookingName, setBookingName] = useState("");
  const [bookingContact, setBookingContact] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-05-28");
  const [bookingTime, setBookingTime] = useState("11:00");
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingContact) {
      setBookingStatus("Please complete contact details to register priority.");
      return;
    }
    setBookingStatus(`Thank you! Priority lock successfully generated. Code: SR-BJH-${Math.floor(Math.random() * 9000 + 1000)}. Our concierge team will reach out shortly.`);
    setTimeout(() => {
      setBookingName("");
      setBookingContact("");
      setBookingStatus(null);
    }, 8000);
  };

  // Slide 6 Patron profile selection state
  const [activePatronIndex, setActivePatronIndex] = useState(0);
  const patrons = [
    {
      title: "Senior Professionals & Doctors",
      demand: "Understated credential, premium fit-accuracy and breathable wear for multi-hour events.",
      styleFormula: "Gadwal Silk weaves paired with clean Cotton Designer Blouses. Highly structured look.",
      quote: "Needs clothing that represents precision, comfort, and quiet cultural authority."
    },
    {
      title: "IT Leaders & Corporate Executives",
      demand: "Transition styling matching professional poise with refined cultural heritage.",
      styleFormula: "Charcoal Kalamkari Silk Cotton Kurtas and classic high-contrast border Dupattas.",
      quote: "Enjoys effortless comfort suitable for festive corporate hosting and networking events."
    },
    {
      title: "Celebrities & Public Personalities",
      demand: "High-contrast weaving patterns, camera-ready finish, absolute exclusivity.",
      styleFormula: "One-of-a-kind Signature Gadwal sarees draping into bespoke handpainted floral motifs.",
      quote: "Demands outfits that photograph brilliantly while carrying unique craft storytelling."
    },
    {
      title: "Politicians & Public Leaders",
      demand: "Timeless dignity, deep cultural roots, sober yet prestigious textures.",
      styleFormula: "Cotton-khadi combinations paired with masterfully woven zari borders.",
      quote: "Communicates integrity, heritage preservation, and composed leadership style."
    },
    {
      title: "Textile Connoisseurs & Curators",
      demand: "Authenticity, original weave history, intricate Ajrakh/Bandhani placements.",
      styleFormula: "Gajji Silk Dupattas styled over minimal organic-dyed natural silhouettes.",
      quote: "Treasures rare weaves and design narratives directly signed off by master rural artisans."
    }
  ];

  // Slide 13 strategic pillar detailed lookup state
  const [hoverPlanPillar, setHoverPlanPillar] = useState<number | null>(null);
  const growthAvenues = [
    {
      id: 1,
      title: "Private Styling Appointments",
      desc: "Scaling 1:1 consultation sessions at our premium Banjara Hills boutique, offering bespoke layout options.",
      estImpact: "35% Volume Jump",
    },
    {
      id: 2,
      title: "E-Commerce Reach",
      desc: "Promoting secure handpicked lookbooks globally via StudioRamaOnline.com to the elite Indian diaspora.",
      estImpact: "2.5x Year-on-Year Growth",
    },
    {
      id: 3,
      title: "Artisanal Collaboration Capsule Runs",
      desc: "Introducing seasonal, numbered drops of organic cotton Kalamkari kurtas and Bandhani silk dupattas.",
      estImpact: "Immediate Buzz & Exclusivity",
    },
    {
      id: 4,
      title: "Bespoke Corporate VIP Gifting",
      desc: "Curating luxury hampers including Chanderi dupattas and designer blouses for corporate board directors.",
      estImpact: "Diversified Institutional Revenue",
    }
  ];

  return (
    <div className={`min-h-screen text-white font-sans ${activeTheme.bgClass} flex flex-col relative transition-colors duration-700 overflow-x-hidden`}>
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-rose-500/10 mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Floating lookbook curation sync bar */}
      {curatedIds.length > 0 && !isCurationOpen && (
        <button
          onClick={() => setIsCurationOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#1E0105] font-semibold text-xs py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 border border-amber-300/30 animate-bounce cursor-pointer group transition-all"
        >
          <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Curated Items ({curatedIds.length})</span>
          <span className="bg-[#1E0105] text-amber-400 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">
            {curatedIds.length}
          </span>
        </button>
      )}

      {/* Primary Brand Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] text-[#FCF3CF] font-bold">STUDIO RAMA</span>
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">HANDLOOM LUXURY</span>
          </div>
        </div>

        {/* Live Controls Bar */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans">
          {/* Theme custom selection trigger */}
          <div className="hidden md:flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/10">
            {Object.keys(THEMES).map((thName) => (
              <button
                key={thName}
                onClick={() => setActiveThemeName(thName as ThemeName)}
                className={`w-5 h-5 rounded-full transition-transform border border-white/20 relative cursor-pointer ${
                  thName === "crimsonGold"
                    ? "bg-[#32060A]"
                    : thName === "ivoryCharcoal"
                    ? "bg-[#FAF9F6]"
                    : thName === "forestSand"
                    ? "bg-[#0C1510]"
                    : "bg-[#15112B]"
                } ${activeThemeName === thName ? "scale-125 ring-2 ring-amber-400" : "hover:scale-110"}`}
                title={THEMES[thName as ThemeName].name}
              />
            ))}
          </div>

          {/* Simulated chime tool */}
          <button
            onClick={() => setIsBoutiqueSound(!isBoutiqueSound)}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              isBoutiqueSound
                ? "bg-amber-400/20 text-yellow-300 border-amber-400/30"
                : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
            }`}
            title="Toggle boutique audio cues"
          >
            {isBoutiqueSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline text-[10px] font-mono">Boutique Bell</span>
          </button>

          {/* Presenter view split toggle */}
          <button
            onClick={() => setIsPresenterView(!isPresenterView)}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              isPresenterView
                ? "bg-amber-400 text-[#1E0105] border-transparent font-medium"
                : "bg-white/5 text-white hover:bg-white/10 border-white/10"
            }`}
            title="Toggle Speaker Presentation Notes"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline text-[10px] font-semibold">Presenter Mode</span>
          </button>

          {/* Lookbook Direct Button */}
          <button
            onClick={() => selectSlide(7)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              currentSlideIndex === 7 ? "bg-[#D4AF37] text-[#1E0105]" : "bg-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Showroom
          </button>
        </div>
      </header>

      {/* Main presentation grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 items-stretch justify-center z-10">
        
        {/* Core Presentation Window Area */}
        <div className={`flex-1 flex flex-col justify-between transition-all duration-300`}>
          
          {/* Header of the current slide context */}
          <div className="flex justify-between items-center mb-4 text-xs font-mono text-white/50 px-2">
            <span className="uppercase tracking-widest text-[#D4AF37] border-l-2 border-amber-400 pl-2">
              Slide {currentSlideIndex + 1} of {SLIDES.length} — {currentSlide.category}
            </span>
            <span className="font-semibold text-white/70">
              Studio Rama Brand Pitch
            </span>
          </div>

          {/* Slide Box Shell */}
          <div className={`flex-1 rounded-3xl border border-white/10 p-6 md:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md transition-all duration-300 min-h-[460px] ${activeTheme.cardBg} shadow-2xl`}>
            
            {/* Soft inner texture glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-white/[0.01] pointer-events-none" />

            {/* Render Slide content by identification (1 to 14) */}
            <div className="z-10 flex-1 grid grid-cols-1 gap-6">

              {/* SLIDE 1: COVER SLIDE */}
              {currentSlideIndex === 0 && (
                <div id="slide-cover" className="flex flex-col justify-center items-center h-full text-center py-6">
                  <div className="space-y-4 max-w-2xl my-auto">
                    <span className="text-xs font-mono tracking-[0.4em] text-[#D4AF37] uppercase block animate-pulse">
                      HYDERABAD’S PRESTIGIOUS DESTINATION
                    </span>
                    <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-widest text-white leading-none">
                      STUDIO RAMA
                    </h1>
                    <div className="h-0.5 w-24 bg-[#D4AF37] mx-auto opacity-75 my-4" />
                    <h2 className="font-serif text-lg sm:text-2xl text-amber-100 font-medium tracking-wide">
                      Where Heritage Meets Modern Elegance
                    </h2>
                    <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
                      Hyderabad’s refined handloom luxury boutique, curated with absolute authenticity. Serving discerning patrons through limited-edition ethnic weaves and direct designer involvement.
                    </p>
                    <div className="pt-6 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={handleNextSlide}
                        className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#1E0105] font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded-lg shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        Explore Luxury Presentation <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => selectSlide(7)}
                        className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-white/5"
                      >
                        View Sample Collection Lookbook
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: BRAND ESSENCE */}
              {currentSlideIndex === 1 && (
                <div id="slide-essence" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Brand Essence</h2>
                    <p className="text-sm text-white/60 font-sans italic"> हैदराबाद का गौरव — Refined Authenticity </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <p className="text-sm text-white/80 leading-relaxed font-sans">
                        At Studio Rama, we do not follow generic mass-fashion schedules. We believe that handlooms represent a rhythmic conservation of artisan souls. 
                      </p>
                      <p className="text-sm text-white/80 leading-relaxed font-sans">
                        We offer meticulously styled <strong>Sarees, Kurtas, Designer Blouses, Anarkalis, and Dupattas</strong>. Every item balances deep structural comfort, fit certainty, and a vibrant design attitude—making it relevant for modern lifestyles.
                      </p>
                      
                      {/* Curated list tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {["Gadwal Silks", "Artisanal Kalamkari", "Jamdani", "Maheshwari", "Zari Edits", "Bespoke Tailoring"].map((item) => (
                          <span key={item} className="text-[10px] uppercase font-mono tracking-wider bg-white/5 text-amber-200 px-3 py-1.5 rounded-full border border-white/5">
                            ✦ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Visual quotes blocks */}
                    <div className="p-5 rounded-2xl bg-black/40 border border-[#D4AF37]/35 space-y-4">
                      <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block">Signature Creed</span>
                      <blockquote className="font-serif text-base text-white/90 italic leading-relaxed">
                        "Designed for the modern Indian woman of grace and audacity. Attire crafted with soul to make you stand out beautifully."
                      </blockquote>
                      <div className="pt-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/30 flex items-center justify-center font-serif text-[#D4AF37] font-bold">
                          SR
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">Studio Rama Editorial</span>
                          <span className="text-[10px] text-white/50 block font-mono">Banjara Hills Creative Portfolio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: THE MARKET GAP */}
              {currentSlideIndex === 2 && (
                <div id="slide-gap" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">The Market Challenge</h2>
                    <p className="text-xs text-white/55 font-mono uppercase tracking-wider mt-1">Bridging traditional craft and boutique-level excellence</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    {/* Column 1: Mass Ethnic */}
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                      <div className="w-8 h-8 rounded-full bg-red-400/20 text-red-300 flex items-center justify-center font-bold">✕</div>
                      <h4 className="font-serif text-sm font-semibold text-red-200">Mass-Produced Labels</h4>
                      <p className="text-white/70 leading-relaxed">
                        Compromised fabrics lacking handloom origin. Identical styles, robotic margins, and complete absence of design authority or exclusivity.
                      </p>
                      <span className="text-[10px] text-red-300 font-mono block">Result: Diluted identity and poor fitting</span>
                    </div>

                    {/* Column 2: Overpriced luxury */}
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                      <div className="w-8 h-8 rounded-full bg-red-400/20 text-red-300 flex items-center justify-center font-bold">✕</div>
                      <h4 className="font-serif text-sm font-semibold text-red-200">Overpriced Rigid Luxury</h4>
                      <p className="text-white/70 leading-relaxed">
                        Distant, unyielding sizing matrices with high designer-ego price spikes. Absolute disconnect during post-purchase tailoring or styling.
                      </p>
                      <span className="text-[10px] text-red-300 font-mono block">Result: High cost without personalized flexibility</span>
                    </div>

                    {/* Column 3: Studio Rama Solution */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/15 to-amber-950/20 border border-amber-400/35 space-y-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">✓</div>
                      <h4 className="font-serif text-sm font-semibold text-amber-200">The Studio Rama Choice</h4>
                      <p className="text-white/70 leading-relaxed">
                        Curated handloom luxury with fit-first ready measurements and direct designer consultation. Rare artisans meet meticulous finishing under ₹55,000.
                      </p>
                      <span className="text-[10px] text-emerald-300 font-mono block font-semibold">Result: Tailored exclusive comfort</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: OUR PHILOSOPHY */}
              {currentSlideIndex === 3 && (
                <div id="slide-philosophy" className="space-y-4 md:space-y-5">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Core Brand Philosophy</h2>
                    <p className="text-xs text-white/50 font-sans mt-0.5">The five central tenets of Studio Rama's mindful artistry</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs text-sans">
                    {[
                      { title: "Simple Yet Elegant", icon: "✦", text: "Handmade and limited-edition selections emphasizing grace over superficial volume." },
                      { title: "Artisanal Heritage", icon: "★", text: "Direct alliances with weaving clusters across India's legendary saree and artwork zones." },
                      { title: "Premium Quality", icon: "⚝", text: "Rigorous alignment on custom measurements, seam counts, and premium fall finish." },
                      { title: "Vibrant Expression", icon: "✸", text: "Bold and elegant color structures that establish unmistakable visual presence." },
                      { title: "Mindful Making", icon: "☘", text: "Moving closely towards a zero-waste workspace structure via restricted batch releases." }
                    ].map((phil, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 hover:border-[#D4AF37]/40 transition-colors">
                        <span className="text-lg text-[#D4AF37] block font-semibold">{phil.icon}</span>
                        <h4 className="font-serif text-xs font-bold text-white tracking-wide uppercase">{phil.title}</h4>
                        <p className="text-[11px] text-white/70 leading-relaxed">{phil.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: FOUNDER PROFILE */}
              {currentSlideIndex === 4 && (
                <div id="slide-founder" className="space-y-4 md:space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">The Founder’s Journey</h2>
                      <p className="text-xs text-white/60 font-mono uppercase">Three Decades of Indian Wear Design Authority</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Founder Bio Card */}
                    <div className="md:col-span-5 p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-red-700 p-0.5">
                            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center font-serif font-bold text-[#D4AF37] text-lg">
                              RR
                            </div>
                          </div>
                          <div>
                            <h4 className="font-serif text-lg font-semibold text-white">Rama Rrebbapragada</h4>
                            <span className="text-xxs font-mono text-amber-400 tracking-widest uppercase">Founder & Creative Director</span>
                          </div>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-sans">
                          Rama's nearly 30 years of design leadership guarantees that every handloom selection carries personal rigor. 
                        </p>
                        <p className="text-xs text-white/80 leading-relaxed font-sans">
                          From choosing fiber blends on the loom alongside original weavers, to overseeing tailoring precision, she coordinates custom styling wardrobes personally in the Banjara Hills boutique space.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 mt-4">
                        <span className="text-[10px] text-white/50 block font-mono">Boutique Guarantee</span>
                        <div className="font-serif text-xs text-amber-200 mt-1 italic">
                          "Each Studio Rama client receives designer-led individual styling."
                        </div>
                      </div>
                    </div>

                    {/* Interactive Founder Timeline */}
                    <div className="md:col-span-7 p-5 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-4">
                          Historical Timeline & Growth
                        </span>
                        <div className="space-y-3 font-sans">
                          {TIMELINE_EVENTS.map((evt, idx) => (
                            <div key={idx} className="flex gap-4 group">
                              <span className="text-xs font-bold text-amber-400 font-mono w-16 shrink-0 pt-0.5">
                                {evt.year}
                              </span>
                              <div className="space-y-0.5">
                                <h5 className="font-serif text-xs font-medium text-white group-hover:text-amber-300 transition-colors">
                                  {evt.title}
                                </h5>
                                <p className="text-[11px] text-white/60 leading-relaxed">{evt.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: TARGET AUDIENCE */}
              {currentSlideIndex === 5 && (
                <div id="slide-audience" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Patrons of Distinction</h2>
                    <p className="text-xs text-white/50 font-mono">Exploring Hyderabad’s Discerning Consumer Segments</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    {/* Visual Segment Tabs */}
                    <div className="md:col-span-5 space-y-2">
                      <span className="text-xs font-mono text-white/40 block mb-3 uppercase">Patron Segments</span>
                      {patrons.map((p, idx) => (
                        <button
                          key={idx}
                          id={`patron-btn-${idx}`}
                          onClick={() => setActivePatronIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 font-sans flex items-center justify-between cursor-pointer ${
                            activePatronIndex === idx
                              ? "bg-amber-400/15 border-amber-400 text-white font-semibold"
                              : "bg-black/20 border-white/5 text-white/70 hover:bg-white/5"
                          }`}
                        >
                          <span className="text-xs truncate">{p.title}</span>
                          <span className="text-[10px] font-mono text-[#D4AF37]">0{idx+1}</span>
                        </button>
                      ))}
                    </div>

                    {/* Interactive Profile Detail Box */}
                    <div className="md:col-span-7 p-6 rounded-2xl bg-black/40 border border-[#D4AF37]/30 flex flex-col justify-between">
                      <div className="space-y-4 font-sans">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <h4 className="font-serif text-lg font-medium text-[#FCF3CF]">
                            {patrons[activePatronIndex].title}
                          </h4>
                          <span className="bg-white/10 px-2.5 py-0.5 rounded text-xxs font-mono text-white/80">
                            Active Demography
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">Wardrobe Demand Criteria</span>
                            <p className="text-xs leading-relaxed text-white/90">
                              {patrons[activePatronIndex].demand}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-0.5">Recommended Styling Blueprint</span>
                            <p className="text-xs leading-relaxed text-[#FFA07A] font-medium italic">
                              {patrons[activePatronIndex].styleFormula}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/5 italic text-white/55 text-xs font-serif">
                        "{patrons[activePatronIndex].quote}"
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 7: THE PRODUCT UNIVERSE */}
              {currentSlideIndex === 6 && (
                <div id="slide-universe" className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">The Product Universe</h2>
                      <p className="text-xs text-white/60 font-sans">Artisanal curation with rigorous premium pricing hierarchy</p>
                    </div>
                    <div className="bg-black/30 px-4 py-2 rounded-xl text-center border border-white/5 shrink-0">
                      <span className="text-xxs font-mono text-[#D4AF37] block uppercase">Est. Portfolio Spectrum</span>
                      <span className="text-lg font-serif font-semibold text-white">₹3,500 – ₹55,000</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                    {[
                      { cat: "Premium Sarees", items: "Gadwal silks & zari weaves", rnge: "₹18,000 - ₹55,000", desc: "Crafted directly on artisanal loom setups, complete with historic checked motifs." },
                      { cat: "Artisanal Kurtas", items: "Silk cotton & floral sets", rnge: "₹6,000 - ₹12,000", desc: "A combination of soft breathing metrics and deep Kalamkari print character." },
                      { cat: "Designer Blouses", items: "Premium fit cotton coordinates", rnge: "₹4,000 - ₹8,500", desc: "Ready measurements optimized over decades to eliminate boutique fitting wear." },
                      { cat: "Premium Dupattas", items: "Gajji silk, Ikat & Chanderi", rnge: "₹3,500 - ₹18,000", desc: "A high-fashion accompaniment to lift standard festive tunics beautifully." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
                        <span className="text-[10px] font-mono uppercase text-[#D4AF37] block tracking-wider">Category Category</span>
                        <h4 className="font-serif text-sm font-semibold text-white leading-none">{item.cat}</h4>
                        <span className="text-xxs text-[#FFA07A] font-mono block font-semibold">{item.rnge}</span>
                        <p className="text-[11px] text-white/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <p className="text-white/80 font-sans leading-relaxed max-w-xl">
                      <strong>Exclusive Access Model:</strong> Because our weavings are handmade and certified original, multiple signature products are structured as single-run limited releases. Once a weaver's specific color lot is completed, it remains entirely unique.
                    </p>
                    <button
                      onClick={() => selectSlide(7)}
                      className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#1E0105] font-semibold text-xs uppercase tracking-widest py-2.5 px-5 rounded-lg shrink-0 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      Browse Interactive Showroom <ArrowRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 8: SAMPLE COLLECTION SHOWROOM */}
              {currentSlideIndex === 7 && (
                <div id="slide-showroom" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl text-white font-medium">Boutique Lookbook Display</h2>
                      <p className="text-xs text-white/60 font-sans">
                        Browse and filter through our actual boutique listings. Curate items to form a private proposal.
                      </p>
                    </div>
                    {curatedIds.length > 0 && (
                      <button
                        onClick={() => setIsCurationOpen(true)}
                        className="bg-amber-400/20 text-yellow-300 hover:bg-amber-400/30 font-bold font-mono text-[11px] py-1.5 px-3.5 rounded-lg border border-amber-400/30 flex items-center gap-1.5 transition-all"
                      >
                        <Layers className="w-3.5 h-3.5" /> Active Curation ({curatedIds.length})
                      </button>
                    )}
                  </div>

                  {/* Fully embedded LookbookGrid component */}
                  <div className="max-h-[380px] overflow-y-auto pr-1">
                    <LookbookGrid
                      theme={activeTheme}
                      curationIds={curatedIds}
                      onToggleCuration={toggleCuration}
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 9: WHAT SETS US APART */}
              {currentSlideIndex === 8 && (
                <div id="slide-apart" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Brand Differentiation</h2>
                    <p className="text-xs text-white/55 font-mono uppercase tracking-wider">The six pillars that guarantee Studio Rama wins</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
                    {[
                      { val: "01", title: "Original Heritage Weaves", text: "Authentic, certified handlooms from master award-winning weaver communities." },
                      { val: "02", title: "Fit-First Sizing Precision", text: "Proportionate custom ready measurements that completely alleviate blouse-wearing anxiety." },
                      { val: "03", title: "Audacious Understated Edge", text: "Sophisticated styling elements that avoid overly traditional clutter or noisy slogans." },
                      { val: "04", title: "Limited Run Exclusivity", text: "Strictly limited editions that ensure clients never encounter repetitive styling duplication." },
                      { val: "05", title: "Mindful Zero-Waste Path", text: "Responsible upcycling of pristine fabric cutoffs into styled pocket trims or children's vests." },
                      { val: "06", title: "Founder's Dedicated Audit", text: "Rama Rrebbapragada reviews and handpairs drape adjustments for every single high-ticket client." }
                    ].map((diff) => (
                      <div key={diff.val} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 hover:border-amber-400/35 transition-all">
                        <span className="text-xs font-mono font-bold text-[#D4AF37] block">{diff.val}</span>
                        <h4 className="font-serif text-xs font-bold text-white tracking-wide uppercase">{diff.title}</h4>
                        <p className="text-[11px] text-white/70 leading-relaxed">{diff.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 10: THE STUDIO RAMA EXPERIENCE */}
              {currentSlideIndex === 9 && (
                <div id="slide-experience" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl text-white font-medium">Bespoke Experience Flow</h2>
                      <p className="text-xs text-white/60 font-sans">The 4-step consumer journey toward refined styling custody</p>
                    </div>
                  </div>

                  {/* Flow Map Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
                    {[
                      { step: "01", name: "Private Appointment", desc: "Schedule exclusive 1:1 consultation at Banjara Hills boutique space." },
                      { step: "02", name: "Curated Curation", desc: "Explore restricted weaves suited exactly to occasion codes and sizing." },
                      { step: "03", name: "Personalized Styling", desc: "Direct pairing of blouses, custom draping cues, and coordination." },
                      { step: "04", name: "Seamless Handovers", desc: "Rigid tailoring alignment and reliable secure boutique packaging." }
                    ].map((st, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-[#D4AF37]/20 relative">
                        <span className="text-xs font-mono text-[#D4AF37] font-semibold block mb-0.5">Step {st.step}</span>
                        <h4 className="font-serif text-xs font-semibold text-white uppercase">{st.name}</h4>
                        <p className="text-[11px] text-white/65 mt-1 leading-snug">{st.desc}</p>
                        {idx < 3 && <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-amber-400/40 z-10" />}
                      </div>
                    ))}
                  </div>

                  {/* Integrate Interactive StyleMatrimony right inside slide to play with! */}
                  <div className="pt-2">
                    <StyleMatrimony
                      theme={activeTheme}
                      onAddToCuration={toggleCuration}
                      curationIds={curatedIds}
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 11: WHY STUDIO RAMA WINS */}
              {currentSlideIndex === 10 && (
                <div id="slide-win" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Why Studio Rama Wins</h2>
                    <p className="text-xs text-white/50 font-mono uppercase">Unlocking Long-Term Wardrobe & Intangible Value</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Visual metrics panel */}
                    <div className="md:col-span-4 p-5 rounded-2xl bg-black/40 border border-amber-400/25 flex flex-col justify-center text-center space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase block">Verified Retention</span>
                        <span className="text-4xl font-serif text-white font-bold block">98%</span>
                        <span className="text-[11px] text-white/60 font-sans block leading-none">Bespoke Repeat Cohort</span>
                      </div>
                      <div className="space-y-1 border-t border-white/5 pt-3">
                        <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase block">Tailoring Integrity</span>
                        <span className="text-4xl font-serif text-white font-bold block">1-of-1</span>
                        <span className="text-[11px] text-white/60 font-sans block leading-none">Exclusivity Guarantee</span>
                      </div>
                    </div>

                    {/* Core value vectors */}
                    <div className="md:col-span-8 p-5 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex gap-3">
                          <span className="text-amber-400 font-bold">✦</span>
                          <div>
                            <h5 className="font-serif text-xs font-bold uppercase text-white">Social Signaling Excellence</h5>
                            <p className="text-white/70 leading-relaxed text-[11px] mt-0.5">
                              Discerning patrons communicate quiet luxury, design intelligence, and cultural respect without needing noisy corporate labels.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <span className="text-amber-400 font-bold">✦</span>
                          <div>
                            <h5 className="font-serif text-xs font-bold uppercase text-white">Absolute Individuality Guaranteed</h5>
                            <p className="text-white/70 leading-relaxed text-[11px] mt-0.5">
                              Our zero-waste limited weaving means duplicate outfits are logistically impossible at any family or social gathering.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <span className="text-amber-400 font-bold">✦</span>
                          <div>
                            <h5 className="font-serif text-xs font-bold uppercase text-white">Unparalleled Multi-Hour Comfort</h5>
                            <p className="text-white/70 leading-relaxed text-[11px] mt-0.5">
                              Breathable organic silks and fine-cotton blends survive the heat of prolonged Hyderabadi afternoon weddings easily.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 12: PROVEN CREDIBILITY */}
              {currentSlideIndex === 11 && (
                <div id="slide-credibility" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Boutique Sanctuary</h2>
                    <p className="text-xs text-white/50 font-sans">Deep physical and digital footprint serving the global diaspora</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Location coordinates */}
                    <div className="md:col-span-7 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-4 font-sans text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">Physical Headquarters</span>
                        <h4 className="font-serif text-lg font-medium text-white flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-red-400" />
                          Banjara Hills, Road No. 3
                        </h4>
                        <p className="text-white/75 mt-2 leading-relaxed">
                          Aditya Residency, Flat No. 401, Sriniketan Colony Park,<br />
                          Banjara Hills, Hyderabad – 500034, Telangana, India.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 mt-4">
                        <span className="text-[10px] text-white/40 uppercase font-mono block">Operating Structure</span>
                        <div className="flex items-center gap-1.5 text-amber-200 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>11:00 AM – 7:30 PM (Private appointments preferred)</span>
                        </div>
                      </div>
                    </div>

                    {/* Online Portal Access */}
                    <div className="md:col-span-5 p-6 rounded-2xl bg-[#250508]/85 border border-[#D4AF37]/30 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">Digital Window</span>
                        <h4 className="font-serif text-lg font-medium text-white mt-1">StudioRamaOnline.com</h4>
                        <p className="text-xs text-white/70 font-sans mt-2 leading-relaxed">
                          Allowing secure regional and global ordering of selected Chanderi, Ikat, and signature Gadwal edits.
                        </p>
                      </div>

                      <a
                        href="https://studioramaonline.com"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 rounded-lg bg-[#D4AF37] text-[#1E0105] text-xs font-semibold uppercase font-sans tracking-wide flex items-center justify-center gap-1.5 hover:bg-[#C5A880] transition-all cursor-pointer"
                      >
                        <Globe2 className="w-4 h-4" /> Visit Brand Domain
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 13: GROWTH OPPORTUNITIES */}
              {currentSlideIndex === 12 && (
                <div id="slide-growth" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Strategic Scaling Vectors</h2>
                    <p className="text-xs text-white/50 font-mono">Four avenues projected to fuel Studio Rama's brand prominence</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    {growthAvenues.map((p, idx) => (
                      <div
                        key={p.id}
                        onMouseEnter={() => setHoverPlanPillar(idx)}
                        onMouseLeave={() => setHoverPlanPillar(null)}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                          hoverPlanPillar === idx
                            ? "bg-amber-400/10 border-amber-400/80 -translate-y-0.5"
                            : "bg-black/30 border-white/5"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#D4AF37]">STRATEGY 0{p.id}</span>
                            <span className="text-xxs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">
                              Pillar
                            </span>
                          </div>
                          <h4 className="font-serif text-sm font-semibold text-white">{p.title}</h4>
                          <p className="text-[11px] text-white/70 leading-relaxed">{p.desc}</p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-amber-200">
                          <span className="text-xxs font-mono uppercase tracking-widest text-[#D4AF37]/80">Projected Impact</span>
                          <span className="font-serif font-medium">{p.estImpact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 14: INVITATION / CALL TO ACTION */}
              {currentSlideIndex === 13 && (
                <div id="slide-cta" className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">Experience Studio Rama</h2>
                    <p className="text-xs text-white/50 font-mono uppercase tracking-wider">Join Hyderabad’s Refined Conversation in Handloom Luxury</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Information Grid */}
                    <div className="md:col-span-5 p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between font-sans text-xs space-y-4">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">Direct Concierge Link</span>
                        
                        <div className="flex items-center gap-3 text-white/80">
                          <Phone className="w-4 h-4 text-[#D4AF37]" />
                          <span>+91 6300 240845 (Booking Help Desk)</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-white/80">
                          <Mail className="w-4 h-4 text-[#D4AF37]" />
                          <span className="truncate">design@studioramaonline.com</span>
                        </div>

                        <div className="flex items-center gap-3 text-white/80">
                          <Globe2 className="w-4 h-4 text-[#D4AF37]" />
                          <span>StudioRamaOnline.com</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5 mt-4">
                        <span className="text-xxs font-mono text-amber-300 block">LITERAL BRAND CORE</span>
                        <p className="text-[11px] leading-relaxed text-white/80 italic">
                          "Studio Rama is Hyderabad’s handloom luxury boutique, combining certified weavers, styling consultancy and personalized fit elements for discerning women of taste."
                        </p>
                      </div>
                    </div>

                    {/* Booking Form Simulation */}
                    <div className="md:col-span-7 p-5 rounded-2xl bg-[#250508]/85 border border-[#D4AF37]/30 flex flex-col justify-between">
                      <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                        <span className="text-xs font-serif text-[#D4AF37] uppercase tracking-widest block">
                          Request Priority Boutique Slot
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans text-xs">
                          <div>
                            <label className="text-white/60 block mb-1">Patron Full Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Dr. Ananya Rao"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="w-full px-3 py-2 bg-black/35 border border-white/10 rounded focus:outline-none focus:border-amber-400 text-white placeholder-white/30 text-xs"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-white/60 block mb-1">Email / Mobile Contact</label>
                            <input
                              type="text"
                              placeholder="e.g. +91 99887 76655"
                              value={bookingContact}
                              onChange={(e) => setBookingContact(e.target.value)}
                              className="w-full px-3 py-2 bg-black/35 border border-white/10 rounded focus:outline-none focus:border-amber-400 text-white placeholder-white/30 text-xs"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-white/60 block mb-1">Date Requested</label>
                            <input
                              type="date"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full px-3 py-2 bg-black/35 border border-white/10 rounded focus:outline-none focus:border-amber-400 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-white/60 block mb-1">Time Preference</label>
                            <input
                              type="time"
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full px-3 py-2 bg-black/35 border border-white/10 rounded focus:outline-none focus:border-amber-400 text-white text-xs"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded bg-[#D4AF37] hover:bg-[#C5A880] text-[#1E0105] font-semibold text-xs font-sans uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          Lock Boutique Priority Appointment <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </form>

                      {bookingStatus && (
                        <div className="p-3 mt-4 rounded bg-amber-400/25 border border-amber-400/40 text-amber-200 text-xs font-sans animate-fade-in text-center">
                          {bookingStatus}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Slide Lower Dock Controls */}
            <div className="z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40">Visual Palette:</span>
                <span className="bg-white/10 text-amber-300 font-semibold px-2 py-0.5 rounded tracking-wide text-[10px]">
                  {activeTheme.name}
                </span>
              </div>

              {/* Autoplay controllers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    isAutoplay ? "bg-amber-400 text-[#1E0105] font-semibold" : "bg-white/10 text-white/75 hover:bg-white/15"
                  }`}
                  title="Toggle 5-second automatic slide timing"
                >
                  {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[10px] text-white/40 uppercase hidden sm:inline">
                  {isAutoplay ? "Autoplay Loop Running" : "Autoplay Sleep"}
                </span>
              </div>

              {/* Dynamic visual metric count */}
              {currentSlide.visualMetric && (
                <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded border border-white/5">
                  <span className="text-[#D4AF37] font-semibold font-serif leading-none">
                    {currentSlide.visualMetric.value}
                  </span>
                  <span className="text-[9px] text-white/50 uppercase leading-none">
                    {currentSlide.visualMetric.label}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Navigation Dots and Indicators */}
          <div className="mt-4 flex items-center justify-between gap-4 py-2 px-1">
            <button
              onClick={handlePrevSlide}
              className="p-2 sm:px-4 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center gap-1 transition-all cursor-pointer text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {/* Pagination Dots container */}
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-[450px] py-1 select-none scrollbar-none">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  id={`dot-${idx}`}
                  onClick={() => selectSlide(idx)}
                  className={`w-7 py-1 text-center font-mono rounded text-[9px] font-semibold tracking-tighter transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? "bg-[#D4AF37] text-[#1E0105] scale-110 shadow"
                      : "bg-black/30 text-white/40 border border-white/5 hover:text-white hover:bg-black/40"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="p-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A880] text-[#1E0105] flex items-center gap-1 transition-all cursor-pointer text-xs font-semibold shadow"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Presenter Split Notes view (optional panel appearing when presenterView is true) */}
        {isPresenterView && (
          <div className="w-full lg:w-80 p-5 rounded-3xl bg-[#1D0609] border border-white/10 flex flex-col justify-between space-y-4 shadow-2xl animate-fade-in shrink-0 text-left">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Presenter Workbook
                </span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-xxs text-white/50 font-mono">
                  Live Sync
                </span>
              </div>

              <div className="space-y-4">
                {/* Speaker Notes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                    Speaker Notes / Talking Points
                  </label>
                  <div className="space-y-2 text-xs text-white/80 font-sans leading-relaxed">
                    {currentSlide.speakerNotes.map((note, noteIdx) => (
                      <p key={noteIdx} className="p-2.5 rounded bg-black/30 border border-white/5 flex gap-2">
                        <span className="text-[#D4AF37] font-semibold shrink-0">•</span>
                        <span>{note}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Performance prompts */}
                <div className="space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                    Style Advisory Note
                  </span>
                  <div className="space-y-1 text-xxs font-sans text-white/60">
                    <p>• Avoid rush. Emphasize original design depth and weaving lot rarity.</p>
                    <p>• Pitch value as investment wardrobe pieces rather than disposable fashion shifts.</p>
                    <p>• Mention private styling bookings directly to show Banjara Hills exclusivity.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick slide jump lookup */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block">
                Slide Direct Jump
              </span>
              <div className="grid grid-cols-5 gap-1 text-[10px] font-mono font-bold">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    id={`jump-btn-${slide.id}`}
                    onClick={() => selectSlide(idx)}
                    className={`py-1 rounded text-center cursor-pointer transition-all ${
                      currentSlideIndex === idx
                        ? "bg-amber-400 text-amber-950"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Curation Proposals Sidebar (locks when isCurationOpen is true) */}
        {isCurationOpen && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] z-50 shadow-2xl bg-[#1A0306] animate-slide-in">
            <CurationPanel
              theme={activeTheme}
              curatedItems={curatedProducts}
              onRemoveItem={removeItemFromCuration}
              onClearCuration={clearAllCurations}
              onClose={() => setIsCurationOpen(false)}
            />
          </div>
        )}

      </main>

      {/* Elegant Footer Details */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-4 mt-auto border-t border-white/5 z-20 flex flex-col md:flex-row justify-between items-center gap-4 text-xxs font-mono text-white/40">
        <div>
          <span>© 2026 Studio Rama, Hyderabad. All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <span>Banjara Hills Block 3 HQ</span>
          <span>✦</span>
          <span>Rama Rrebbapragada Signature Direction</span>
          <span>✦</span>
          <span>Secure Online Portal Enabled</span>
        </div>
      </footer>
    </div>
  );
}
