import React from 'react';
import { FlaskConical, Moon, Calculator, MessageCircle } from 'lucide-react';

const projects = [
  {
    icon: <FlaskConical size={22} />,
    tag: 'In Progress',
    tagClass: 'live',
    title: 'AzureFlow',
    subtitle: 'Privacy-focused menstruation tracker for girls',
    desc: 'A safe, beautiful space for girls to track their cycle with complete privacy, gentle reminders, and faith-aligned content.',
    tech: ['React', 'Supabase', 'Tailwind'],
    featured: true,
  },
  {
    icon: <Moon size={22} />,
    tag: 'Functional',
    tagClass: 'done',
    title: 'Pure Zakah',
    desc: 'Simple & accurate zakah calculator built with care for the Muslim community.',
    tech: ['React', 'Tailwind'],
  },
  {
    icon: <Calculator size={22} />,
    tag: 'Upcoming',
    tagClass: 'wip',
    title: 'StudySky',
    desc: 'Study time tracker with friendly competition — stay focused, stay motivated.',
    tech: ['React'],
  },
  {
    icon: <MessageCircle size={22} />,
    tag: 'Upcoming',
    tagClass: 'wip',
    title: 'SakoonSky',
    desc: 'Quran & Sunnah-based emotional guidance for peaceful hearts and minds.',
    tech: ['React', 'API'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title reveal">My Projects</h2>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div key={i} className={`project-card ${p.featured ? 'featured' : ''} reveal`}>
            {p.featured && <div className="project-glow" />}
            <div className="project-header">
              <span className="project-icon">{p.icon}</span>
              <span className={`project-tag ${p.tagClass}`}>{p.tag}</span>
            </div>
            <h3>{p.title}</h3>
            {p.subtitle && <p className="project-sub">{p.subtitle}</p>}
            <p>{p.desc}</p>
            <div className="tech-stack">
              {p.tech.map((t, j) => <span key={j}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}