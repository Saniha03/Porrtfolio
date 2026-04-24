import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTypewriter } from '../hooks';

export default function HeroSection({ scrollTo }) {
  const typed = useTypewriter([
    'Girls\' Health Advocate',
    'Aspiring Health Professional',
    'Faith-Driven Creator',
    'Tech & Deen Blender',
  ]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge reveal">
          <Sparkles size={14} /> Open to Collaborations
        </div>
        <h1 className="hero-name reveal">
          Saiyara<br /><em>Saniha</em>
        </h1>
        <div className="typewriter-wrap reveal">
          <span className="typewriter-text">{typed}</span>
          <span className="cursor-blink">|</span>
        </div>
        <p className="intro reveal">
          A student blending knowledge, faith &amp; care to uplift young girls through
          health awareness and spiritual growth.
        </p>
        <div className="hero-cta reveal">
          <button onClick={() => scrollTo('projects')} className="btn btn-primary">
            View My Work <ArrowRight size={16} className="btn-arrow" />
          </button>
          <button onClick={() => scrollTo('contact')} className="btn btn-outline">
            Let's Connect
          </button>
        </div>
        <div className="scroll-indicator reveal">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </div>

      <div className="hero-orb orb-lg" />
      <div className="hero-orb orb-sm" />
    </section>
  );
}