import React from 'react';
import { Trophy, FileText } from 'lucide-react';
import { certCategories } from '../data';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section certs-section">
      <h2 className="section-title reveal">Certifications &amp; Learning</h2>
      <p className="certs-intro reveal">
        A growing collection of verified knowledge across health, technology, and social impact.
      </p>

      {certCategories.map((cat) =>
        cat.certs.length === 0 ? null : (
          <div
            key={cat.id}
            className={`cert-category reveal ${cat.small ? 'cert-category--small' : ''}`}
          >
            {/* Category Header */}
            <div className="cert-cat-header" style={{ '--cat-accent': cat.accent }}>
              <span className="cert-cat-icon">{cat.icon}</span>
              <h3 className="cert-cat-title">{cat.label}</h3>
              <span className="cert-cat-count">
                {cat.certs.length} certificate{cat.certs.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Cert Cards */}
            <div
              className={`cert-grid ${cat.main ? 'cert-grid--main' : ''} ${cat.small ? 'cert-grid--small' : ''}`}
            >
              {cat.certs.map((cert, i) => (
                <a
                  key={i}
                  href={cert.link || '#'}
                  className={`cert-card ${cert.special ? 'cert-card--special' : ''}`}
                  style={{
                    '--cat-accent': cat.accent,
                    '--cat-bg': cat.color,
                    animationDelay: `${i * 0.06}s`,
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cert-card-inner">
                    <div className="cert-top">
                      <span className="cert-icon">
                        {cert.special ? <Trophy size={16} /> : <FileText size={16} />}
                      </span>
                      <span className="cert-link-icon">↗</span>
                    </div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-meaning">{cert.meaning}</p>
                  </div>
                  <div className="cert-shine" />
                </a>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
}