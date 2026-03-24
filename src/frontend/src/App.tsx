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
        <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs tracking-widest uppercase font-sans text-muted-foreground">
        {label}
      </span>
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
    { label: "DETAILS", section: "details", ref: detailsRef },
  ] as const;

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
          style={{ background: "oklch(0.972 0.008 84)" }}
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
                className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors ${
                  activeSection === section
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
                      className={`w-full text-center py-2.5 font-sans text-xs tracking-[0.2em] uppercase transition-colors ${
                        activeSection === section
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
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
          style={{
            background:
              "linear-gradient(160deg, oklch(0.963 0.014 86) 0%, oklch(0.93 0.03 15) 50%, oklch(0.963 0.014 86) 100%)",
            minHeight: "480px",
          }}
        >
          {/* Floral banner top */}
          <div className="absolute inset-x-0 top-0 h-32 sm:h-40 opacity-60 pointer-events-none">
            <img
              src="/assets/generated/wedding-floral-banner.dim_1200x400.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          {/* Floral banner bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 opacity-60 pointer-events-none rotate-180">
            <img
              src="/assets/generated/wedding-floral-banner.dim_1200x400.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

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
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-20 sm:py-24">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-script mb-4"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "oklch(0.72 0.065 20)",
              }}
            >
              Together with their families
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="flex items-center gap-3 sm:gap-5 mb-6"
            >
              <div className="text-right">
                <div
                  className="font-serif font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.8rem, 7vw, 3.8rem)",
                    lineHeight: 1.1,
                  }}
                >
                  Abhinav
                </div>
                <div
                  className="font-script mt-1 text-muted-foreground hidden sm:block"
                  style={{ fontSize: "1.1rem" }}
                >
                  of the family
                </div>
              </div>
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
              <div className="text-left">
                <div
                  className="font-serif font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.8rem, 7vw, 3.8rem)",
                    lineHeight: 1.1,
                  }}
                >
                  Aakarsha
                </div>
                <div
                  className="font-script mt-1 text-muted-foreground hidden sm:block"
                  style={{ fontSize: "1.1rem" }}
                >
                  of the family
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px w-8 sm:w-12 bg-border" />
              <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground">
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
              Friday, the Third of April
              <br />
              <span
                className="font-script"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                  color: "oklch(0.72 0.065 20)",
                }}
              >
                Two Thousand &amp; Twenty Six
              </span>
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              onClick={() => scrollTo(detailsRef, "details")}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              data-ocid="hero.primary_button"
            >
              <span className="font-sans text-xs tracking-widest uppercase">
                See Details
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
              <h3 className="font-serif text-xl text-foreground mb-1 font-semibold">
                Wedding Ceremony
              </h3>
              <p
                className="font-script mb-5"
                style={{ fontSize: "1.3rem", color: "oklch(0.72 0.065 20)" }}
              >
                Auspicious Moments
              </p>
              <div className="space-y-3 text-sm font-sans">
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Calendar
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span>Friday, April 3, 2026</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Clock
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span>Time: TBD</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <div className="text-left">
                    <p className="text-foreground font-medium">
                      Shri Gujarati Pragati Samaj
                    </p>
                    <p>Kalyana Mandapam</p>
                    <p>Kacheguda, Hyderabad</p>
                  </div>
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
              <h3 className="font-serif text-xl text-foreground mb-1 font-semibold">
                Wedding Reception
              </h3>
              <p
                className="font-script mb-5"
                style={{ fontSize: "1.3rem", color: "oklch(0.72 0.065 20)" }}
              >
                An Evening to Remember
              </p>
              <div className="space-y-3 text-sm font-sans">
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Calendar
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span>Sunday, April 5, 2026</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <Clock
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <span>Time: TBD</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-muted-foreground">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.72 0.065 20)" }}
                  />
                  <div className="text-left">
                    <p className="text-foreground font-medium">
                      Hotel Murali Fortune
                    </p>
                    <p>Bandar Road</p>
                    <p>Vijayawada, Andhra Pradesh</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Floral accent strip ── */}
        <section
          className="border-t border-b border-border overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/generated/wedding-floral-banner.dim_1200x400.png"
            alt=""
            aria-hidden="true"
            className="w-full h-24 sm:h-32 object-cover opacity-70"
          />
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
              className="font-sans text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.972 0.008 84 / 0.8)" }}
            >
              April 3, 2026 &nbsp;·&nbsp; Kacheguda, Hyderabad
            </p>
            <div
              className="h-px w-24 mx-auto mb-4"
              style={{ background: "oklch(0.972 0.008 84 / 0.4)" }}
            />
            <p
              className="font-sans text-xs mb-1"
              style={{ color: "oklch(0.972 0.008 84 / 0.7)" }}
            >
              Shri Gujarati Pragati Samaj Kalyana Mandapam, Kacheguda
            </p>
            <p
              className="font-sans text-xs mb-6"
              style={{ color: "oklch(0.972 0.008 84 / 0.7)" }}
            >
              Hotel Murali Fortune, Bandar Road, Vijayawada
            </p>
            <p
              className="font-sans text-xs"
              style={{ color: "oklch(0.972 0.008 84 / 0.6)" }}
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
