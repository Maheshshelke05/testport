import { useState } from "react";

const serviceOptions = [
  "Website", "SaaS", "E-commerce", "Admin Panel", "Mobile App", "Payment Integration", "Automation", "Other",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mt-2">Let's Build Something Great</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left - contact info */}
          <div className="fade-up space-y-4">
            <div className="space-y-3 text-sm">
              <p>✉️ <span className="text-muted-foreground">hello@cloudbuild.in</span></p>
              <p>📞 <span className="text-muted-foreground">+91 XXXXX XXXXX</span></p>
              <p>💬 <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">WhatsApp</a></p>
              <p>💼 <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a></p>
              <p>📸 <a href="https://instagram.com/cloud_build_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">@cloud_build_</a></p>
              <p>📝 <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Medium</a></p>
              <p>📍 <span className="text-muted-foreground">Pune, Maharashtra, India</span></p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Pune", "Surat", "Mumbai", "All India"].map((c) => (
                <span key={c} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">📍 {c}</span>
              ))}
            </div>
          </div>

          {/* Right - form */}
          <div className="fade-up">
            {submitted ? (
              <div className="p-8 rounded-lg border border-border bg-background text-center">
                <p className="text-lg font-heading font-bold text-primary">✓ Message sent!</p>
                <p className="text-muted-foreground mt-2 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input placeholder="Name" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Phone / WhatsApp" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <select required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-muted-foreground">
                  <option value="">Select Service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea placeholder="Your message..." rows={4} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
