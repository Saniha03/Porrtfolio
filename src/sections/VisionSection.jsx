import React, { useState } from 'react';
import { TrendingUp, Scale, Heart, Globe } from 'lucide-react';

const visionItems = [
  {
    icon: TrendingUp,
    title: 'Strength',
    desc: 'Helping girls grow through life\'s challenges.',
    accent: '#534AB7',
    bg: 'rgba(83,74,183,0.08)',
    pct: 78,
    detail: 'Helping girls grow stronger through life\'s challenges with gentle, practical guidance rooted in compassion and faith. Every setback becomes a stepping stone.',
    tags: ['Resilience', 'Growth mindset', 'Gentle guidance'],
  },
  {
    icon: Scale,
    title: 'Balance',
    desc: 'Deen and dunya in graceful harmony.',
    accent: '#0F6E56',
    bg: 'rgba(15,110,86,0.08)',
    pct: 85,
    detail: 'Balancing deen and dunya with grace, wisdom, and spiritual grounding. A life well-lived honours both the world and the Hereafter — without sacrificing either.',
    tags: ['Spirituality', 'Islamic values', 'Mindfulness'],
  },
  {
    icon: Heart,
    title: 'Health',
    desc: 'Private, safe, and empowering resources.',
    accent: '#993556',
    bg: 'rgba(153,53,86,0.08)',
    pct: 90,
    detail: 'Creating health awareness resources that are private, safe, and empowering. Girls deserve accurate, faith-aligned information about their own bodies.',
    tags: ["Girls' health", 'Privacy', 'Awareness'],
  },
  {
    icon: Globe,
    title: 'Wellness',
    desc: 'Holistic well-being, science & Sunnah.',
    accent: '#185FA5',
    bg: 'rgba(24,95,165,0.08)',
    pct: 72,
    detail: 'Holistic well-being rooted in Islamic principles and modern science. True wellness encompasses the mind, body, and soul — a complete, beautiful picture.',
    tags: ['Holistic care', 'Science', 'Sunnah'],
  },
];

export default function VisionSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = visionItems[activeIdx];

  return (
    <section className="section vision-section">
      <div className="vision-header reveal">
        <p className="vision-eyebrow">What drives the work</p>
        <h2 className="section-title">Vision &amp; Impact</h2>
        <p className="vision-subtitle">
          Four pillars guiding every project, resource, and conversation.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="vision-grid reveal">
        {visionItems.map((v, i) => {
          const Icon = v.icon;
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              className={`vision-card ${isActive ? 'vision-card--active' : ''}`}
              style={{ '--v-accent': v.accent, '--v-bg': v.bg, '--v-pct': `${v.pct}%` }}
              onClick={() => setActiveIdx(i)}
            >
              <div className="vc-top">
                <div className="vc-icon-wrap">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="vc-title">{v.title}</h3>
              <p className="vc-desc">{v.desc}</p>
              <div className="vc-bar">
                <div className={`vc-bar-fill ${isActive ? 'vc-bar-fill--active' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div
        className="vision-detail reveal"
        style={{ '--v-accent': active.accent }}
        key={activeIdx}
      >
        <div className="vd-inner">
          <h3 className="vd-title">{active.title}</h3>
          <p className="vd-body">{active.detail}</p>
          <div className="vd-tags">
            {active.tags.map((tag, i) => (
              <span key={i} className="vd-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}