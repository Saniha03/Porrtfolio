import React, { useState } from 'react';

// Background & cursor
import { MagneticCursor, Particles, Aurora, Counter } from './components';

// Hooks
import { useScrollReveal } from './hooks';

// Sections
import HeroSection         from './sections/HeroSection';
import AboutSection        from './sections/AboutSection';
import VisionSection       from './sections/VisionSection';
import ProjectsSection     from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import JourneySection      from './sections/JourneySection';
import ContactSection      from './sections/ContactSection';

export default function App() {
  useScrollReveal();

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ['about', 'projects', 'certifications', 'journey', 'contact'];

  return (
    <>
      {/* ── Cursor ── */}
      <MagneticCursor />

      {/* ── Background Layers ── */}
      <Aurora />
      <Particles />

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-s">Saiyara</span>Saniha
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(id => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Sections ── */}
      <HeroSection scrollTo={scrollTo} />

      {/* Stats strip */}
      <section className="section stats-section">
        <div className="stats-grid">
          <Counter end={4} label="Projects Built"    suffix="+" />
          <Counter end={2} label="Years of Coding"   suffix="+" />
          <Counter end={5} label="Fields of Interest"            />
        </div>
      </section>

      <AboutSection />
      <VisionSection />
      <ProjectsSection />
      <CertificationsSection />
      <JourneySection />
      <ContactSection />

      {/* ── Footer ── */}
      <footer className="footer">
        <p>Crafted with 💙 by Saiyara Saniha · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}