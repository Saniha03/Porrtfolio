import React from 'react';

const contactLinks = [
  { icon: 'fa-brands fa-facebook-f', label: 'Facebook', href: '#',                                color: '#1877F2' },
  { icon: 'fa-brands fa-whatsapp',   label: 'WhatsApp', href: '#',                                color: '#25D366' },
  { icon: 'fa-brands fa-telegram',   label: 'Telegram', href: '#',                                color: '#0088cc' },
  { icon: 'fa-solid fa-envelope',    label: 'Email',    href: 'mailto:saiyara.saniha@gmail.com',  color: '#EA4335' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="glass-card contact-card reveal">
        <div className="contact-glow" />
        <h2 className="section-title">Let's Connect</h2>
        <p className="subtitle">
          Open to meaningful conversations, collaborations, and ideas for girls' growth.
        </p>

        <div className="contact-buttons">
          {contactLinks.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="contact-btn"
              style={{ '--accent': c.color }}
            >
              <i className={c.icon} />
              {c.label}
            </a>
          ))}
        </div>

        <p className="closing">Let's create something beautiful and meaningful together 🤍</p>
      </div>
    </section>
  );
}