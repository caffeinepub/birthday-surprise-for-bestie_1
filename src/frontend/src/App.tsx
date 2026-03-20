import { useCallback, useEffect, useState } from "react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  color: string;
  fallDur: number;
  fallDelay: number;
  shape: "square" | "circle" | "strip";
}

interface BurstPiece {
  id: number;
  dx: string;
  dy: string;
  dr: string;
  color: string;
  size: number;
  shape: "square" | "circle";
  delay: number;
  dur: number;
}

interface RisingBalloon {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  dur: number;
}

type Page = "home" | "letter" | "gallery" | "wishes";
const PAGE_ORDER: Page[] = ["home", "letter", "gallery", "wishes"];

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
// Dark jewel-tone confetti for magnetic dark theme
const CONFETTI_COLORS = [
  "#9B5DE5", // electric purple
  "#F72585", // hot pink
  "#C9184A", // deep rose
  "#FFD700", // gold
  "#4CC9F0", // electric cyan
  "#7209B7", // deep magenta
  "#F4A261", // warm gold
  "#B5179E", // vivid magenta
];

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/memory-1.dim_600x400.jpg",
    label: "Golden Hour Laughs ✨",
  },
  {
    src: "/assets/generated/memory-2.dim_600x400.jpg",
    label: "Birthday Selfie 🎈",
  },
  {
    src: "/assets/generated/memory-3.dim_600x400.jpg",
    label: "Cake O'Clock 🎂",
  },
  {
    src: "/assets/generated/memory-4.dim_600x400.jpg",
    label: "Garden Daydreams 🌸",
  },
  {
    src: "/assets/generated/memory-5.dim_600x400.jpg",
    label: "Dance All Night 🪩",
  },
  {
    src: "/assets/generated/memory-6.dim_600x400.jpg",
    label: "Always & Forever 💛",
  },
];

const WISH_CARDS = [
  {
    emoji: "💜",
    title: "Love",
    text: "May you always be surrounded by people who love you fiercely and truly.",
  },
  {
    emoji: "✨",
    title: "Dreams",
    text: "May every dream you've ever whispered to the stars finally come true this year.",
  },
  {
    emoji: "😂",
    title: "Laughter",
    text: "May every single day hold at least one moment that makes your heart laugh out loud.",
  },
];

const WISHES_EMOJIS = ["🎂", "🎉", "🎊", "💜", "✨"];

const FLOATING_BALLOONS = [
  { emoji: "🎈", left: "5%", top: "20%", delay: "0s" },
  { emoji: "🎀", left: "92%", top: "35%", delay: "0.8s" },
  { emoji: "🎈", left: "8%", top: "60%", delay: "1.6s" },
  { emoji: "💜", left: "88%", top: "65%", delay: "2.4s" },
  { emoji: "🎊", left: "3%", top: "80%", delay: "0.4s" },
  { emoji: "🎈", left: "95%", top: "80%", delay: "1.2s" },
];

const RISING_EMOJIS = ["🎈", "🎀", "🎊", "💜", "✨", "🌸"];

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function makeConfetti(count: number): ConfettiPiece[] {
  const shapes: ConfettiPiece["shape"][] = ["square", "circle", "strip"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 8 + 5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    fallDur: Math.random() * 5 + 4,
    fallDelay: Math.random() * 6,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));
}

function makeBurst(count: number): BurstPiece[] {
  const shapes: BurstPiece["shape"][] = ["square", "circle"];
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 120 + Math.random() * 200;
    return {
      id: i,
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist - 100}px`,
      dr: `${Math.random() * 720 - 360}deg`,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 10 + 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      delay: Math.random() * 0.3,
      dur: 0.9 + Math.random() * 0.6,
    };
  });
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function ConfettiRain({ count = 60 }: { count?: number }) {
  const [pieces] = useState(() => makeConfetti(count));
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: `${p.x}%`,
              top: "-10px",
              width: p.shape === "strip" ? `${p.size * 0.4}px` : `${p.size}px`,
              height: p.shape === "strip" ? `${p.size * 2.5}px` : `${p.size}px`,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              background: p.color,
              "--fall-dur": `${p.fallDur}s`,
              "--fall-delay": `${p.fallDelay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function FloatingBalloons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {FLOATING_BALLOONS.map((b) => (
        <span
          key={`${b.left}-${b.top}`}
          className="balloon-ambient absolute text-4xl md:text-5xl"
          style={{ left: b.left, top: b.top, animationDelay: b.delay }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const [pieces] = useState(() => makeBurst(80));
  if (!active) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="burst-piece"
          style={
            {
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              background: p.color,
              "--dx": p.dx,
              "--dy": p.dy,
              "--dr": p.dr,
              "--burst-delay": `${p.delay}s`,
              "--burst-dur": `${p.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function RisingBalloons({ active }: { active: boolean }) {
  const [balloons, setBalloons] = useState<RisingBalloon[]>([]);
  useEffect(() => {
    if (!active) return;
    setBalloons(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        emoji: RISING_EMOJIS[Math.floor(Math.random() * RISING_EMOJIS.length)],
        delay: Math.random() * 2,
        dur: 2.5 + Math.random() * 2,
      })),
    );
  }, [active]);
  if (!active) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon-rising absolute text-3xl"
          style={
            {
              left: `${b.x}%`,
              bottom: "0",
              "--rise-delay": `${b.delay}s`,
              "--rise-dur": `${b.dur}s`,
            } as React.CSSProperties
          }
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}

function FlowerCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls = [
    pos === "tl" ? "top-3 left-3" : "",
    pos === "tr" ? "top-3 right-3 scale-x-[-1]" : "",
    pos === "bl" ? "bottom-3 left-3 scale-y-[-1]" : "",
    pos === "br" ? "bottom-3 right-3 scale-[-1]" : "",
  ].join(" ");
  return (
    <span className={`absolute text-2xl ${cls}`} aria-hidden="true">
      🌸
    </span>
  );
}

/* ─────────────────────────────────────────
   Page Dot Indicator
───────────────────────────────────────── */
function PageDots({ current }: { current: Page }) {
  return (
    <div className="flex gap-2 justify-center" aria-label="Page progress">
      {PAGE_ORDER.map((p) => (
        <div
          key={p}
          className="rounded-full transition-all duration-300"
          style={{
            width: current === p ? "20px" : "8px",
            height: "8px",
            background: current === p ? "#9B5DE5" : "rgba(155,93,229,0.25)",
            boxShadow:
              current === p
                ? "0 0 8px #9B5DE5, 0 0 16px rgba(155,93,229,0.5)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main App
───────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [_animDir, setAnimDir] = useState<"in" | "out">("in");
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((next: Page) => {
    setAnimDir("out");
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setAnimDir("in");
      setVisible(true);
      window.scrollTo(0, 0);
    }, 350);
  }, []);

  const wishesActive = page === "wishes";

  return (
    <div className="min-h-screen bg-background font-body">
      <style>{`
        .page-content {
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .page-content.hidden-page {
          opacity: 0;
          transform: translateY(24px);
        }
        .page-content.visible-page {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className={`page-content ${visible ? "visible-page" : "hidden-page"}`}
        style={{ minHeight: "100vh" }}
      >
        {page === "home" && <HomePage onNext={() => goTo("letter")} />}
        {page === "letter" && (
          <LetterPage
            onNext={() => goTo("gallery")}
            onBack={() => goTo("home")}
          />
        )}
        {page === "gallery" && (
          <GalleryPage
            onNext={() => goTo("wishes")}
            onBack={() => goTo("letter")}
          />
        )}
        {page === "wishes" && (
          <WishesPage wishesActive={wishesActive} onBack={() => goTo("home")} />
        )}
      </div>

      {/* Footer */}
      <footer
        className="py-4 px-4 text-center border-t"
        style={{
          background: "rgba(13,0,21,0.95)",
          borderColor: "rgba(155,93,229,0.3)",
        }}
      >
        <div className="mb-2">
          <PageDots current={page} />
        </div>
        <p
          className="font-body text-xs"
          style={{ color: "rgba(180,150,220,0.6)" }}
        >
          Made with{" "}
          <span className="text-pink-400" aria-hidden="true">
            ♥
          </span>{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-purple-300 transition-colors"
          >
            caffeine.ai
          </a>{" "}
          &middot; © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page: Home
───────────────────────────────────────── */
function HomePage({ onNext }: { onNext: () => void }) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0D0015 0%, #1A0030 50%, #0A001F 100%)",
      }}
    >
      {/* Glowing orb backgrounds */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(114,9,183,0.3) 0%, transparent 70%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(247,37,133,0.2) 0%, transparent 70%)",
          bottom: "15%",
          right: "10%",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <ConfettiRain count={70} />
      <FloatingBalloons />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4 flex justify-center gap-3 text-5xl md:text-6xl animate-bounce">
          <span>🎂</span>
          <span>✨</span>
          <span>🎈</span>
        </div>

        <h1
          className="font-display font-bold leading-tight mb-4"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            background:
              "linear-gradient(135deg, #E0B4FF 0%, #F72585 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(155,93,229,0.6))",
          }}
        >
          HAPPY BIRTHDAY!
        </h1>

        <p
          className="font-script text-2xl md:text-3xl mb-3"
          style={{ color: "#E0B4FF" }}
        >
          To the most wonderful human I know
        </p>

        <p
          className="font-body text-lg md:text-xl max-w-xl mx-auto mb-10 italic"
          style={{ color: "rgba(210,170,255,0.75)" }}
        >
          This little page was made with all my love, just for you 💌
        </p>

        <button
          type="button"
          data-ocid="hero.read_letter.button"
          onClick={onNext}
          className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-display font-semibold text-lg hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{
            background: "linear-gradient(135deg, #7209B7, #F72585)",
            border: "1px solid rgba(247,37,133,0.4)",
          }}
        >
          Read My Letter 💌
        </button>
      </div>

      {/* Dark wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#0D0015"
          />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Page: Letter
───────────────────────────────────────── */
function LetterPage({
  onNext,
  onBack,
}: { onNext: () => void; onBack: () => void }) {
  return (
    <section
      className="py-20 px-4"
      style={{
        background: "linear-gradient(180deg, #0D0015 0%, #1A0028 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-12"
          style={{
            background: "linear-gradient(135deg, #E0B4FF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          A Letter From My Heart 💌
        </h2>

        <div
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(30, 5, 50, 0.85)",
            backdropFilter: "blur(16px)",
            border: "2px solid rgba(155,93,229,0.5)",
            boxShadow:
              "0 0 40px rgba(114,9,183,0.3), 0 0 80px rgba(247,37,133,0.1), inset 0 0 40px rgba(114,9,183,0.05)",
          }}
        >
          <FlowerCorner pos="tl" />
          <FlowerCorner pos="tr" />
          <FlowerCorner pos="bl" />
          <FlowerCorner pos="br" />
          <span
            className="absolute top-8 right-12 sparkle text-xl"
            aria-hidden="true"
          >
            ✨
          </span>
          <span
            className="absolute bottom-10 left-10 sparkle text-xl"
            style={{ animationDelay: "0.7s" }}
            aria-hidden="true"
          >
            💫
          </span>

          <div
            className="font-body leading-relaxed space-y-5 text-base md:text-lg"
            style={{ color: "rgba(225,195,255,0.9)" }}
          >
            <p
              className="font-display text-xl italic"
              style={{ color: "#E0B4FF" }}
            >
              My dearest bestie,
            </p>
            <p>
              Where do I even begin? Every time I sit down to write this, my
              heart fills up so fast I can barely find the words. But today —
              your birthday — deserves every single one.
            </p>
            <p>
              Do you remember the day we first met? I had absolutely no idea
              that moment would quietly become one of the most important
              chapters of my life. You walked in like you already owned the
              room, and somehow, you also walked straight into my heart.
            </p>
            <p>
              The memories we&apos;ve made together read like the most beautiful
              novel — full of laughter that made our stomachs hurt, late-night
              conversations that somehow solved everything, spontaneous
              adventures that we still talk about, and quiet moments that meant
              more than words could say. Through every season, you have been my
              constant.
            </p>
            <p>
              When life got heavy, you were the one who held the other end of
              the weight without even being asked. When I celebrated, you
              celebrated louder than anyone. You have this rare and magical gift
              of making people feel truly seen — and you have given that gift to
              me, over and over and over again.
            </p>
            <p>
              I think about all the inside jokes that only we understand, the
              songs that instantly take us somewhere, the places that are
              &quot;ours.&quot; I think about how lucky I am to be the person
              who gets to call you their best friend. Not everyone gets a
              friendship like ours. I know that. And I am so, so grateful.
            </p>
            <p>
              On this birthday, I want you to know — truly know — how
              extraordinary you are. Not just to me, but to every single person
              whose life you touch. Your kindness is not a small thing. Your
              laughter is not a small thing. You are not a small thing. You are
              enormous, and bright, and the world is better with you in it.
            </p>
            <p>
              So here&apos;s my birthday wish for you: that this year brings you
              the kind of joy you so freely give to others. That every dream
              you&apos;ve been quietly holding finally finds its way to you.
              That you wake up every morning feeling loved — because you are.
              Deeply, endlessly, always.
            </p>
            <p>
              Thank you for existing. Thank you for being you. Thank you for
              being mine.
            </p>
            <p className="pt-4">
              <span
                className="font-display text-xl italic block mb-1"
                style={{ color: "#E0B4FF" }}
              >
                Forever and always your bestie,
              </span>
              <span
                className="font-script text-2xl"
                style={{ color: "#F72585" }}
              >
                With all my love 💜
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body transition-colors duration-200 text-sm"
            style={{
              color: "rgba(180,140,230,0.7)",
              border: "1px solid rgba(155,93,229,0.3)",
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            data-ocid="letter.gallery.button"
            onClick={onNext}
            className="btn-glow inline-flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-white hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #7209B7, #F72585)",
              border: "1px solid rgba(247,37,133,0.4)",
            }}
          >
            See Our Memories 📸
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Page: Gallery
───────────────────────────────────────── */
function GalleryPage({
  onNext,
  onBack,
}: { onNext: () => void; onBack: () => void }) {
  return (
    <section
      className="py-20 px-4"
      style={{
        background: "linear-gradient(180deg, #0D001A 0%, #1A0030 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
          style={{
            background: "linear-gradient(135deg, #E0B4FF, #F72585)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Favorite Moments 📸
        </h2>
        <p
          className="text-center font-body italic mb-12 text-lg"
          style={{ color: "rgba(180,140,230,0.65)" }}
        >
          A collection of us, through every season
        </p>

        <div
          data-ocid="gallery.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              data-ocid={`gallery.item.${i + 1}`}
              className="group relative rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{
                border: "1.5px solid rgba(155,93,229,0.5)",
                boxShadow: "0 8px 32px rgba(114,9,183,0.2)",
              }}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,0,40,0.9), transparent)",
                }}
              >
                <span className="font-display text-sm font-semibold text-white">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-12">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body transition-colors duration-200 text-sm"
            style={{
              color: "rgba(180,140,230,0.7)",
              border: "1px solid rgba(155,93,229,0.3)",
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            data-ocid="gallery.wishes.button"
            onClick={onNext}
            className="btn-glow inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-display font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #7209B7, #F72585)",
              border: "1px solid rgba(247,37,133,0.4)",
            }}
          >
            See Your Wishes 🎂
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Page: Wishes
───────────────────────────────────────── */
function WishesPage({
  wishesActive,
  onBack,
}: { wishesActive: boolean; onBack: () => void }) {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1A0030 0%, #0D0015 50%, #2D0040 100%)",
      }}
    >
      {/* Glowing orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(114,9,183,0.25) 0%, transparent 70%)",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(247,37,133,0.2) 0%, transparent 70%)",
          bottom: "0",
          left: "20%",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <ConfettiBurst active={wishesActive} />
      <RisingBalloons active={wishesActive} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-2 text-5xl mb-6">
          {WISHES_EMOJIS.map((e, i) => (
            <span
              key={e}
              className="inline-block"
              style={{
                animation: `balloon-float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>

        <h2
          className="font-display font-bold mb-6 leading-tight"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            background:
              "linear-gradient(135deg, #E0B4FF 0%, #F72585 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(155,93,229,0.5))",
          }}
        >
          Happy Birthday, Bestie!
        </h2>

        <p
          className="font-body text-xl md:text-2xl italic mb-8"
          style={{ color: "rgba(210,170,255,0.85)" }}
        >
          Wishing you endless joy, laughter, and all the cake in the world! 🎂
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {WISH_CARDS.map((w, i) => (
            <div
              key={w.title}
              data-ocid={`wishes.item.${i + 1}`}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(155,93,229,0.4)",
                boxShadow:
                  "0 4px 24px rgba(114,9,183,0.15), inset 0 0 20px rgba(155,93,229,0.05)",
              }}
            >
              <div className="text-3xl mb-2">{w.emoji}</div>
              <div
                className="font-display font-semibold mb-2"
                style={{ color: "#E0B4FF" }}
              >
                {w.title}
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(200,160,250,0.75)" }}
              >
                {w.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="rounded-3xl px-8 py-8 mb-10"
          style={{
            background: "rgba(30,0,50,0.6)",
            backdropFilter: "blur(16px)",
            border: "2px solid rgba(155,93,229,0.45)",
            boxShadow:
              "0 0 40px rgba(114,9,183,0.2), inset 0 0 30px rgba(114,9,183,0.05)",
          }}
        >
          <p
            className="font-display text-xl md:text-2xl italic leading-relaxed"
            style={{ color: "rgba(225,195,255,0.9)" }}
          >
            May this year bring you everything you deserve and more.
            <br />
            <span
              className="font-script text-2xl mt-2 inline-block"
              style={{ color: "#F72585" }}
            >
              Love you to the moon and back! 🌙✨
            </span>
          </p>
        </div>

        <button
          type="button"
          data-ocid="wishes.back_top.button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body transition-all duration-200"
          style={{
            color: "#E0B4FF",
            border: "2px solid rgba(155,93,229,0.5)",
          }}
        >
          ↑ Start Over
        </button>
      </div>
    </section>
  );
}
