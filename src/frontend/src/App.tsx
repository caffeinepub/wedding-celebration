import { Toaster } from "@/components/ui/sonner";
import {
  Calendar,
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Floral SVG decorations ─────────────────────────────────────────────────

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px flex-1 bg-border" />
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="10" r="3" fill="oklch(0.72 0.065 20)" />
        <circle
          cx="10"
          cy="10"
          r="2"
          fill="oklch(0.77 0.085 10)"
          opacity="0.7"
        />
        <circle
          cx="30"
          cy="10"
          r="2"
          fill="oklch(0.77 0.085 10)"
          opacity="0.7"
        />
        <circle
          cx="3"
          cy="10"
          r="1.5"
          fill="oklch(0.833 0.016 70)"
          opacity="0.6"
        />
        <circle
          cx="37"
          cy="10"
          r="1.5"
          fill="oklch(0.833 0.016 70)"
          opacity="0.6"
        />
        <path
          d="M14 7 Q17 4 20 7 Q23 4 26 7"
          stroke="oklch(0.69 0.065 145)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M14 13 Q17 16 20 13 Q23 16 26 13"
          stroke="oklch(0.69 0.065 145)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function FloralCornerTL({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute top-0 left-0 pointer-events-none ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      <circle cx="10" cy="10" r="4" fill="oklch(0.77 0.085 10)" opacity="0.5" />
      <circle cx="28" cy="12" r="6" fill="oklch(0.72 0.065 20)" opacity="0.4" />
      <circle
        cx="14"
        cy="28"
        r="5"
        fill="oklch(0.77 0.085 10)"
        opacity="0.45"
      />
      <circle cx="40" cy="22" r="3" fill="oklch(0.9 0.04 10)" opacity="0.6" />
      <circle cx="22" cy="42" r="4" fill="oklch(0.9 0.04 10)" opacity="0.5" />
      <path
        d="M5 5 Q30 20 20 50"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M5 5 Q20 30 50 22"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M15 35 Q25 28 35 38"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <ellipse
        cx="35"
        cy="8"
        rx="5"
        ry="3"
        fill="oklch(0.69 0.065 145)"
        opacity="0.35"
        transform="rotate(30 35 8)"
      />
      <ellipse
        cx="8"
        cy="38"
        rx="5"
        ry="3"
        fill="oklch(0.69 0.065 145)"
        opacity="0.35"
        transform="rotate(60 8 38)"
      />
    </svg>
  );
}

function FloralCornerBR({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute bottom-0 right-0 pointer-events-none ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      <circle
        cx="110"
        cy="110"
        r="4"
        fill="oklch(0.77 0.085 10)"
        opacity="0.5"
      />
      <circle
        cx="92"
        cy="108"
        r="6"
        fill="oklch(0.72 0.065 20)"
        opacity="0.4"
      />
      <circle
        cx="106"
        cy="92"
        r="5"
        fill="oklch(0.77 0.085 10)"
        opacity="0.45"
      />
      <circle cx="80" cy="98" r="3" fill="oklch(0.9 0.04 10)" opacity="0.6" />
      <circle cx="98" cy="78" r="4" fill="oklch(0.9 0.04 10)" opacity="0.5" />
      <path
        d="M115 115 Q90 100 100 70"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M115 115 Q100 90 70 98"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M105 85 Q95 92 85 82"
        stroke="oklch(0.69 0.065 145)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <ellipse
        cx="85"
        cy="112"
        rx="5"
        ry="3"
        fill="oklch(0.69 0.065 145)"
        opacity="0.35"
        transform="rotate(30 85 112)"
      />
      <ellipse
        cx="112"
        cy="82"
        rx="5"
        ry="3"
        fill="oklch(0.69 0.065 145)"
        opacity="0.35"
        transform="rotate(60 112 82)"
      />
    </svg>
  );
}

// ─── Countdown Timer ────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): TimeLeft {
  const calculate = useCallback((): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none border border-border flex items-center justify-center shadow-xs"
        style={{ background: "oklch(0.972 0.008 84)" }}
      >
        <span
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground"
          style={{ fontWeight: 600 }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-2 text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground"
        style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.18em" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Story Timeline ──────────────────────────────────────────────────────────

const storyEvents = [
  {
    date: "06/10/2025",
    title: "First Meeting",
    description:
      "We met for the very first time — a marriage proposal that felt like destiny.",
    icon: "✦",
    highlight: false,
  },
  {
    date: "21/10/2025",
    title: "Second Meeting",
    description: "We met again to confirm what our hearts already knew.",
    icon: "✦",
    highlight: false,
  },
  {
    date: "23/11/2025",
    title: "We Got Engaged",
    description: "We said yes to forever, surrounded by love and blessings.",
    icon: "♥",
    highlight: false,
  },
  {
    date: "27/11/2025",
    title: "Our First Date",
    description:
      "Our first outing together — a beautiful memory we'll always cherish.",
    icon: "✦",
    highlight: false,
  },
  {
    date: "03/04/2026",
    title: "Our Wedding Day",
    description: "The most beautiful chapter begins.",
    icon: "♥",
    highlight: true,
  },
];

function StoryTimeline() {
  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* Vertical line */}
      <div
        className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
        style={{
          background: "oklch(0.833 0.016 70)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="space-y-8 sm:space-y-10">
        {storyEvents.map((event, i) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex items-start gap-4 sm:gap-0 ${
              i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Left spacer on desktop */}
            <div className="hidden sm:block sm:w-1/2" />

            {/* Dot on timeline */}
            <div
              className="absolute left-6 sm:left-1/2 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10"
              style={{
                transform: "translate(-50%, -50%) translateY(50%)",
                background: event.highlight
                  ? "oklch(0.72 0.065 20)"
                  : "oklch(0.963 0.014 86)",
                borderColor: event.highlight
                  ? "oklch(0.72 0.065 20)"
                  : "oklch(0.833 0.016 70)",
                width: event.highlight ? "18px" : "14px",
                height: event.highlight ? "18px" : "14px",
              }}
            />

            {/* Card */}
            <div
              className={`ml-12 sm:ml-0 sm:w-1/2 ${
                i % 2 === 0 ? "sm:pl-8" : "sm:pr-8"
              }`}
            >
              <div
                className="rounded-sm p-4 sm:p-5"
                style={{
                  background: event.highlight
                    ? "oklch(0.96 0.03 20 / 0.25)"
                    : "oklch(0.972 0.008 84 / 0.7)",
                  border: event.highlight
                    ? "1px solid oklch(0.72 0.065 20 / 0.4)"
                    : "1px solid oklch(0.833 0.016 70 / 0.6)",
                  boxShadow: event.highlight
                    ? "0 2px 12px oklch(0.72 0.065 20 / 0.12)"
                    : "0 1px 4px oklch(0.22 0 0 / 0.04)",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "oklch(0.72 0.065 20)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {event.date}
                </p>
                <h4
                  className="font-serif mb-1.5"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: event.highlight ? 700 : 600,
                    color: event.highlight
                      ? "oklch(0.62 0.065 20)"
                      : "oklch(0.22 0 0)",
                  }}
                >
                  <span
                    className="mr-2"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  >
                    {event.icon}
                  </span>
                  {event.title}
                </h4>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    color: "oklch(0.46 0.025 55)",
                    fontStyle: "italic",
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const weddingDate = new Date("2026-04-03T00:00:00");
  const timeLeft = useCountdown(weddingDate);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);

  const scrollTo = (
    ref: React.RefObject<HTMLElement | null>,
    section: string,
  ) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { label: "HOME", section: "home", ref: heroRef },
    { label: "OUR STORY", section: "story", ref: storyRef },
    { label: "DETAILS", section: "details", ref: detailsRef },
  ] as const;

  const parentageStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic" as const,
    fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
    color: "oklch(0.62 0.065 20)",
    lineHeight: 1.4,
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "oklch(0.935 0 0)" }}
    >
      <Toaster position="top-center" richColors />

      {/* ── Outer paper wrapper ── */}
      <div
        className="mx-auto w-full max-w-4xl shadow-invitation"
        style={{ background: "oklch(0.963 0.014 86)" }}
      >
        {/* ── Navigation ── */}
        <header
          className="sticky top-0 z-50 border-b border-border"
          style={{ background: "oklch(0.972 0.008 84 / 0.97)" }}
        >
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center justify-center gap-8 py-4 px-6">
            {navItems.map(({ label, section, ref }) => (
              <button
                key={section}
                type="button"
                onClick={() =>
                  scrollTo(ref as React.RefObject<HTMLElement>, section)
                }
                className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                  activeSection === section
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
                data-ocid={`nav.${section}.link` as string}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile nav */}
          <div className="flex sm:hidden items-center justify-between py-3 px-4">
            <span
              className="font-script"
              style={{ fontSize: "1.4rem", color: "oklch(0.72 0.065 20)" }}
            >
              A &amp; A
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden overflow-hidden border-t border-border"
                style={{ background: "oklch(0.972 0.008 84)" }}
              >
                <div className="flex flex-col items-center gap-1 py-3">
                  {navItems.map(({ label, section, ref }) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() =>
                        scrollTo(ref as React.RefObject<HTMLElement>, section)
                      }
                      className={`w-full text-center py-2.5 text-xs tracking-[0.2em] uppercase transition-colors ${
                        activeSection === section
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      style={{ fontFamily: "'Cinzel', serif" }}
                      data-ocid={`nav.mobile.${section}.link` as string}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          id="home"
          className="relative overflow-hidden"
          style={{ minHeight: "520px" }}
        >
          {/* Background image */}
          <img
            src="/assets/generated/wedding-bg-elegant.dim_1400x900.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          {/* Subtle overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "oklch(0.97 0.01 84 / 0.55)" }}
          />

          {/* Corner flourishes */}
          <FloralCornerTL className="opacity-80" />
          <FloralCornerBR className="opacity-80" />
          <svg
            aria-hidden="true"
            className="absolute top-0 right-0 pointer-events-none opacity-80"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
          >
            <circle
              cx="110"
              cy="10"
              r="4"
              fill="oklch(0.77 0.085 10)"
              opacity="0.5"
            />
            <circle
              cx="92"
              cy="12"
              r="6"
              fill="oklch(0.72 0.065 20)"
              opacity="0.4"
            />
            <circle
              cx="106"
              cy="28"
              r="5"
              fill="oklch(0.77 0.085 10)"
              opacity="0.45"
            />
            <circle
              cx="80"
              cy="22"
              r="3"
              fill="oklch(0.9 0.04 10)"
              opacity="0.6"
            />
            <circle
              cx="98"
              cy="42"
              r="4"
              fill="oklch(0.9 0.04 10)"
              opacity="0.5"
            />
            <path
              d="M115 5 Q90 20 100 50"
              stroke="oklch(0.69 0.065 145)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M115 5 Q100 30 70 22"
              stroke="oklch(0.69 0.065 145)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </svg>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-20 sm:py-28">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-script mb-4"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "oklch(0.62 0.065 20)",
              }}
            >
              Together with their families
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="flex flex-col xs:flex-row items-center gap-3 sm:gap-5 mb-6 w-full max-w-lg"
            >
              {/* Abhinav */}
              <div className="flex-1 flex flex-col items-center xs:items-end text-center xs:text-right min-w-0">
                <div
                  className="font-serif font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.6rem, 7vw, 4.2rem)",
                    lineHeight: 1.1,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  Abhinav
                </div>
                <p style={parentageStyle} className="mt-1 px-1 break-words">
                  S/o Sri. Pulipaka Murali Mohan
                  <br />
                  &amp; Smt. Lavanya (late)
                </p>
              </div>

              {/* & */}
              <div className="flex flex-col items-center shrink-0">
                <span
                  className="font-script"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: "oklch(0.72 0.065 20)",
                  }}
                >
                  &amp;
                </span>
              </div>

              {/* Aakarsha */}
              <div className="flex-1 flex flex-col items-center xs:items-start text-center xs:text-left min-w-0">
                <div
                  className="font-serif font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.6rem, 7vw, 4.2rem)",
                    lineHeight: 1.1,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  Aakarsha
                </div>
                <p style={parentageStyle} className="mt-1 px-1 break-words">
                  D/o Sri. Pochiraju Samba Siva Nagendra Rao
                  <br />
                  &amp; Smt. Bhaskara Ramalakshmi
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px w-8 sm:w-12 bg-border" />
              <p
                className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                are getting married
              </p>
              <div className="h-px w-8 sm:w-12 bg-border" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="font-serif text-lg sm:text-xl md:text-2xl text-foreground mb-8"
            >
              <span
                className="font-script"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                  color: "oklch(0.72 0.065 20)",
                }}
              >
                03 / 04 / 2026
              </span>
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              onClick={() => scrollTo(storyRef, "story")}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              data-ocid="hero.primary_button"
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Our Story
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.button>
          </div>
        </section>

        {/* ── Countdown ── */}
        <section
          className="py-12 sm:py-14 px-4 sm:px-6 border-b border-border"
          style={{ background: "oklch(0.972 0.008 84)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p
              className="font-script mb-2"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "oklch(0.72 0.065 20)",
              }}
            >
              Counting down to
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 sm:mb-8">
              Our Wedding Day
            </h2>
            <FloralDivider />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </motion.div>
        </section>

        {/* ── Our Story ── */}
        <section
          ref={storyRef}
          id="story"
          className="relative overflow-hidden py-14 sm:py-20 border-b border-border"
          style={{ background: "oklch(0.963 0.014 86)" }}
        >
          <FloralCornerTL className="opacity-20" />
          <FloralCornerBR className="opacity-20" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-14 px-4"
          >
            <p
              className="font-script mb-1"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "oklch(0.72 0.065 20)",
              }}
            >
              A love written in the stars
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              Our Story
            </h2>
            <FloralDivider />
          </motion.div>

          <StoryTimeline />
        </section>

        {/* ── Event Details ── */}
        <section
          ref={detailsRef}
          id="details"
          className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6"
        >
          <FloralCornerTL className="opacity-30" />
          <FloralCornerBR className="opacity-30" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-10"
          >
            <p
              className="font-script mb-1"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "oklch(0.72 0.065 20)",
              }}
            >
              Join us for
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              The Celebrations
            </h2>
            <FloralDivider />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-3xl mx-auto">
            {/* Ceremony */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center px-4 sm:px-8 py-8 border-b md:border-b-0 md:border-r border-border"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.9 0.04 10 / 0.4)" }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{ color: "oklch(0.72 0.065 20)" }}
                />
              </div>
              <h3
                className="font-serif text-xl text-foreground mb-1"
                style={{ fontWeight: 600 }}
              >
                Wedding Ceremony
              </h3>
              <p
                className="font-script mb-5"
                style={{ fontSize: "1.3rem", color: "oklch(0.72 0.065 20)" }}
              >
                Auspicious Moments
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Calendar
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                    }}
                  >
                    03/04/2026
                  </span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Clock
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                    }}
                  >
                    8:43 P.M.
                  </span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <div className="text-left">
                    <p
                      className="text-foreground"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Shri Gujarati Pragati Samaj
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                      }}
                    >
                      Kalyana Mandapam
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                      }}
                    >
                      Kacheguda, Hyderabad
                    </p>
                  </div>
                </div>
                <div className="flex justify-center pt-1">
                  <a
                    href="https://maps.app.goo.gl/k8N7eadohsvJ6k9XA?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: "oklch(0.72 0.065 20)",
                      letterSpacing: "0.15em",
                    }}
                    data-ocid="ceremony.directions.link"
                  >
                    <MapPin className="w-3 h-3" />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Reception */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center px-4 sm:px-8 py-8"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.9 0.04 10 / 0.4)" }}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.72 0.065 20)"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3
                className="font-serif text-xl text-foreground mb-1"
                style={{ fontWeight: 600 }}
              >
                Wedding Reception
              </h3>
              <p
                className="font-script mb-5"
                style={{ fontSize: "1.3rem", color: "oklch(0.72 0.065 20)" }}
              >
                An Evening to Remember
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Calendar
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                    }}
                  >
                    05/04/2026
                  </span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Clock
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                    }}
                  >
                    7:00 P.M. Onwards
                  </span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <div className="text-left">
                    <p
                      className="text-foreground"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Hotel Murali Fortune
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                      }}
                    >
                      Bandar Road
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                      }}
                    >
                      Vijayawada, Andhra Pradesh
                    </p>
                  </div>
                </div>
                <div className="flex justify-center pt-1">
                  <a
                    href="https://maps.app.goo.gl/rihvmpZNBhpMakXc9?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: "oklch(0.72 0.065 20)",
                      letterSpacing: "0.15em",
                    }}
                    data-ocid="reception.directions.link"
                  >
                    <MapPin className="w-3 h-3" />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="relative overflow-hidden px-4 sm:px-6 py-8 sm:py-10 text-center"
          style={{ background: "oklch(0.72 0.065 20)" }}
        >
          <FloralCornerTL className="opacity-20" />
          <FloralCornerBR className="opacity-20" />
          <div className="relative z-10">
            <p
              className="font-script mb-2"
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                color: "oklch(0.972 0.008 84)",
              }}
            >
              Abhinav &amp; Aakarsha
            </p>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "oklch(0.972 0.008 84 / 0.8)",
              }}
            >
              03 / 04 / 2026
            </p>
            <div
              className="h-px w-24 mx-auto mb-6"
              style={{ background: "oklch(0.972 0.008 84 / 0.4)" }}
            />
            <p
              className="text-xs"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "oklch(0.972 0.008 84 / 0.6)",
              }}
            >
              © {new Date().getFullYear()}. Built with{" "}
              <Heart className="inline w-3 h-3 fill-current" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-100 transition-opacity"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
