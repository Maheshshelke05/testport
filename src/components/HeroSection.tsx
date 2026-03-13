import founder1 from "@/assets/founder1.jpg";
import founder2 from "@/assets/founder2.jpg";

const rotatingWords = ["Stronger", "Smarter", "Bigger", "Better", "Faster"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid bg */}
      <div className="absolute inset-0 hero-grid opacity-40" />

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Websites • SaaS Platforms • Automation
          </span>
        </div>

        {/* Founder photos */}
        <div className="fade-up flex -space-x-6 mb-8">
          <img
            src={founder1}
            alt="Cloud Build Founder"
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-background shadow-lg"
          />
          <img
            src={founder2}
            alt="Cloud Build Co-Founder"
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-background shadow-lg"
          />
        </div>

        {/* Headline */}
        <h1 className="fade-up font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mb-4">
          Turn Your Business Idea
          <br />
          Into a Powerful{" "}
          <span className="text-gradient">Online Brand</span>
        </h1>

        {/* Ticker */}
        <div className="fade-up font-heading font-semibold text-lg sm:text-xl md:text-2xl text-foreground/80 mb-6 flex items-center gap-2 justify-center">
          <span>Build it Faster. Build it Smarter. Build it</span>
          <span className="h-8 overflow-hidden inline-flex">
            <span className="ticker-animate flex flex-col">
              {rotatingWords.map((w) => (
                <span key={w} className="h-8 flex items-center text-primary font-extrabold">
                  {w}
                </span>
              ))}
            </span>
          </span>
        </div>

        {/* Subtext */}
        <p className="fade-up max-w-2xl text-muted-foreground text-base md:text-lg mb-8">
          We help startups, local businesses, and growing brands launch websites, SaaS platforms, and digital systems designed to grow faster and work smarter — across India.
        </p>

        {/* CTAs */}
        <div className="fade-up flex flex-col sm:flex-row gap-4 mb-6">
          <a
            href="#services"
            className="px-8 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Explore Services →
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-foreground font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/cloud_build_"
          target="_blank"
          rel="noopener noreferrer"
          className="fade-up text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Follow us @cloud_build_ on Instagram ↗
        </a>

        {/* Trust bar */}
        <div className="fade-up mt-12 text-center">
          <p className="text-xs text-muted-foreground mb-2">Trusted by businesses across India</p>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-muted-foreground/60">
            {["Pune", "Surat", "Mumbai", "Delhi", "Bangalore", "All India"].map((c) => (
              <span key={c} className="px-3 py-1 rounded-full border border-border">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
