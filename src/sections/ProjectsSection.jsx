import React, { useMemo, useState } from 'react';
import { FlaskConical, Moon, Calculator, MessageCircle, HeartHandshake } from 'lucide-react';

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
    icon: <HeartHandshake size={22} />,
    tag: 'In Progress',
    tagClass: 'live',
    title: 'Noorcelia',
    subtitle: 'A social hub designed for Muslim women',
    desc: 'A React platform built as a thoughtful social hub for Muslim women, featuring spiritual, wellness, vision, empowerment, and community sections crafted for Muslim ladies.',
    tech: ['React', 'Community Feed', 'Wellness Toolkit'],
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
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'live', label: 'In Progress' },
    { id: 'done', label: 'Functional' },
    { id: 'wip', label: 'Upcoming' },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(project => project.tagClass === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title reveal">My Projects</h2>
      <p className="projects-subtitle reveal">
        Purpose-driven digital products blending faith, wellbeing, and meaningful impact.
      </p>
      <div className="project-filters reveal">
        {filterOptions.map(option => (
          <button
            key={option.id}
            type="button"
            className={`project-filter-btn ${activeFilter === option.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {filteredProjects.map((p, i) => (
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
