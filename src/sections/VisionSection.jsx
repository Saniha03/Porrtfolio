import React from 'react';
import { Zap, Moon, Heart, Globe } from 'lucide-react';

const visionItems = [
  {
    icon: <Zap size={22} />,
    title: 'Strength',
    desc: 'Helping girls grow stronger through challenges of life with gentle guidance.',
  },
  {
    icon: <Moon size={22} />,
    title: 'Balance',
    desc: 'Balancing deen and dunya with grace, wisdom, and spiritual grounding.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Health',
    desc: 'Creating health awareness resources that are private, safe, and empowering.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Wellness',
    desc: 'Holistic well-being rooted in Islamic principles and modern science.',
  },
];

export default function VisionSection() {
  return (
    <section className="section vision-section">
      <h2 className="section-title reveal">Vision &amp; Impact</h2>
      <div className="vision-grid">
        {visionItems.map((v, i) => (
          <div
            key={i}
            className="glass-card vision-card reveal"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="vision-icon">{v.icon}</div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}