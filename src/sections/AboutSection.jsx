import React from 'react';
import { QuoteRotator } from '../components';

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="about-layout">

        {/* Avatar */}
        <div className="about-visual reveal">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <img
                src="/avatar.jpg"
                alt="Saniha"
                className="avatar-img"
              />
            </div>
            <div className="orbit-dot od1" />
            <div className="orbit-dot od2" />
            <div className="orbit-dot od3" />
          </div>
        </div>

        {/* Text */}
        <div className="about-text reveal">
          <h2 className="section-title left-aligned">About Me</h2>
          <p>
            Saiyara Saniha is a higher secondary student and aspiring health professional with a
            deep passion for girls' well-being. She creates gentle, faith-aligned solutions
            that support young girls in balancing deen and dunya.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Her work sits at the intersection of technology, healthcare, and Islamic values —
            building tools that are beautiful, private, and purposeful.
          </p>
          <QuoteRotator />
        </div>

      </div>
    </section>
  );
}