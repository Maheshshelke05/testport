const testimonials = [
  { name: "Priya Shah", role: "Founder, GreenFeels", text: "Cloud Build delivered our e-commerce website in just 10 days. The design is stunning and sales have gone up 40% since launch!" },
  { name: "Rohan Mehta", role: "CEO, Tradescribe", text: "Best dev team I've worked with. They understood our SaaS requirements perfectly and built a platform we're genuinely proud of." },
  { name: "Anjali Gupta", role: "Owner, Momentz", text: "Extremely professional, responsive, and talented. The admin panel they built is so easy to use. Highly recommend Cloud Build!" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Client Love</span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mt-2">Happy Clients, Real Results</h2>
          <p className="text-muted-foreground mt-3">Don't just take our word for it.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="fade-up p-6 rounded-lg border border-border bg-background card-hover"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="text-primary mb-3">★★★★★</div>
              <p className="text-sm italic text-muted-foreground mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
