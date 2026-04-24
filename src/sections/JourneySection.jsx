import React from 'react';
import { GraduationCap, Zap, School, Calendar } from 'lucide-react';

const timelineItems = [
  {
    title: 'Higher Secondary',
    years: '2025 – 2027',
    school: 'Rajuk Uttara Model College',
    status: 'In Progress',
    active: true,
    icon: <Zap size={14} />,
  },
  {
    title: 'Secondary',
    years: '2020 – 2025',
    school: 'Rajuk Uttara Model College',
    icon: <GraduationCap size={14} />,
  },
  {
    title: 'Primary',
    years: '2015 – 2019',
    school: 'Safiuddin Sarker Academy & College',
    icon: <School size={14} />,
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="section journey-section">
      <h2 className="section-title reveal">Academic Journey</h2>
      <div className="timeline">
        {timelineItems.map((item, i) => (
          <div
            key={i}
            className={`timeline-item reveal ${item.active ? 'in-progress' : ''}`}
          >
            <div className="tl-dot">
              <div className="dot">
                <span className="tl-icon-wrapper">{item.icon}</span>
              </div>
            </div>
            <div className="timeline-content">
              <div className="tl-top">
                <strong>{item.title}</strong>
                {item.status && (
                  <span className="tl-badge pulse">{item.status}</span>
                )}
              </div>
              <p className="tl-years">
                <Calendar
                  size={12}
                  style={{ marginRight: '5px', display: 'inline-block', verticalAlign: 'middle' }}
                />
                {item.years}
              </p>
              <p className="tl-school">{item.school}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}