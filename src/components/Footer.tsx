export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-fg py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-extrabold text-xl text-background mb-3">
              Cloud<span className="text-primary">Build</span>
            </h3>
            <p className="text-sm text-footer-fg/70 mb-4">We help businesses across India build powerful digital presence.</p>
            <div className="flex gap-3">
              {[
                { label: "IG", url: "https://instagram.com/cloud_build_" },
                { label: "LI", url: "#" },
                { label: "WA", url: "https://wa.me/" },
                { label: "MD", url: "https://medium.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-footer-fg/10 flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm text-background mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-footer-fg/70">
              {["Business Websites", "SaaS Products", "Admin Panels", "E-commerce", "Mobile Apps"].map((s) => (
                <li key={s}><a href="#services" className="hover:text-primary transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-sm text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-footer-fg/70">
              {[
                { label: "Our Work", href: "#work" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Blog", href: "#blog" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-primary transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-heading font-bold text-sm text-background mb-4">More</h4>
            <ul className="space-y-2 text-sm text-footer-fg/70">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
              <li><a href="https://instagram.com/cloud_build_" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Medium Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-footer-fg/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-footer-fg/50 gap-3">
          <p>© 2025 Cloud Build. All rights reserved. | Serving businesses across India.</p>
          <div className="flex gap-4 font-semibold">
            <span>Razorpay</span>
            <span>PayU</span>
            <span>PhonePe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
