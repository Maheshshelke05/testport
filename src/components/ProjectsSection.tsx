const projects = [
  { emoji: "🛍️", name: "LAL Sweets Ecom Website", tag: "E-commerce", desc: "Modern sweets store with responsive design.", url: "https://lalsweets.com" },
  { emoji: "💎", name: "Kirtilals Luxury Website", tag: "Jewellery", desc: "Premium diamond-jewellery store with elegant UX.", url: "https://kirtilals.com" },
  { emoji: "📈", name: "Tradescribe Platform", tag: "SaaS", desc: "Trade journaling platform with AI-backed analytics.", url: "#" },
  { emoji: "👗", name: "Murzban Clothing", tag: "Fashion", desc: "Luxury clothing brand with editorial website.", url: "#" },
  { emoji: "🌿", name: "Greenfeels Sustainable Ecom", tag: "Eco E-commerce", desc: "Sustainable product store with clean design.", url: "#" },
  { emoji: "🎉", name: "Momentz", tag: "Events", desc: "Event brand website with modern festive design.", url: "#" },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="py-20 lg:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Work</span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mt-2">
            Turning Visions Into Digital Reality
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Real projects, real results. Here's what we've built for our clients.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className="fade-up p-6 rounded-lg border border-border bg-background card-hover"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="text-5xl mb-4">{p.emoji}</div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                {p.tag}
              </span>
              <h3 className="font-heading font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View Live Site →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
