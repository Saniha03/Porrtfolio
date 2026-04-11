// src/App.jsx  (Advanced & Enhanced)
import React, { useEffect, useRef, useState } from 'react';

// ---------- Typewriter Hook ----------
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex(c => c + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex));
        setCharIndex(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

// ---------- Scroll Observer Hook ----------
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ---------- Magnetic Cursor ----------
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', move);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.09);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.09);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const hoverEls = document.querySelectorAll('button, a, .project-card, .orb-tag');
    const enlarge = () => ringRef.current?.classList.add('cursor-hover');
    const shrink  = () => ringRef.current?.classList.remove('cursor-hover');
    hoverEls.forEach(el => { el.addEventListener('mouseenter', enlarge); el.addEventListener('mouseleave', shrink); });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ---------- Floating Particles ----------
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const N = 90;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random(),
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        p.a = 0.35 + 0.65 * Math.abs(Math.sin(Date.now() / (2000 + p.r * 400)));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 216, 255, ${p.a})`;
        ctx.shadowColor = '#A7D8FF';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // draw connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(77,166,255,${0.13 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ---------- Aurora Background ----------
function Aurora() {
  return (
    <div className="aurora-wrap" aria-hidden="true">
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />
    </div>
  );
}

// ---------- Stats Counter ----------
function Counter({ end, label, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const dur = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const prog = Math.min((timestamp - start) / dur, 1);
          setVal(Math.floor(prog * end));
          if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="stat-item reveal">
      <span className="stat-num">{val}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ---------- Certifications Data ----------
const certCategories = [
  {
    id: 'health',
    label: 'Health & Psychology',
    icon: '🩺',
    color: '#e8f4ff',
    accent: '#4DA6FF',
    main: true,
    certs: [
      { title: 'Diploma in Mental Health',          issuer: 'Alison',       meaning: 'Understanding emotional well-being',             link: '#' },
      { title: 'Basic Life Support',                issuer: 'NHCPS',       meaning: 'Emergency response and CPR',                     link: '#' },
      { title: 'Child & Adolescent Psychology',     issuer: 'Alison',       meaning: 'Developmental understanding',                    link: '#' },
      { title: 'Counselling',                       issuer: 'ELC elearning College',       meaning: 'Emotional support techniques',                   link: '#' },
      { title: 'Eating Disorder Awareness',         issuer: 'Oxford Home Study Center',       meaning: 'Mental and physical health insight',             link: '#' },
      { title: 'Intellectual Disability Caregiver', issuer: 'Alison',       meaning: 'Support systems knowledge',                     link: '#' },
      { title: 'Drug Use & Harm Reduction',         issuer: 'London School of Hygiene and Tropical Medicine',       meaning: 'Safer health practices',                        link: '#' },
      { title: '2nd Runner-Up — Biology Olympiad',  issuer: 'Regional Round · Bangladesh', meaning: 'Excellence in biological sciences', link: '#', special: true },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    icon: '💻',
    color: '#f0f8ff',
    accent: '#2492f0',
    certs: [
      { title: 'HTML & CSS',        issuer: 'Sololearn',  meaning: 'Web design basics',           link: '#' },
      { title: 'Python Developer',  issuer: 'Sololearn',  meaning: 'Structured programming',      link: '#' },
    ],
  },
  {
    id: 'social',
    label: 'Social Impact',
    icon: '🌸',
    color: '#fff8fe',
    accent: '#c47bff',
    certs: [
      {title: 'Prevention of Sexual Harassment', issuer: 'UNICEF' , meaning: 'Social Awarness' }
    ],
  },
  {
    id: 'additional',
    label: 'Additional',
    icon: '✨',
    color: '#f8fffc',
    accent: '#27ae60',
    small: true,
    certs: [
      { title: 'Digital Marketing', issuer: 'Google ', meaning: 'SEO and online presence',       link: '#' },
      { title: 'Finance Basics',    issuer: 'HP',            meaning: 'Financial understanding',       link: '#' },
                 
    ],
  },
];

// ---------- Testimonial / Quote Rotator ----------
const quotes = [
  { text: "Knowledge is the lost property of the believer.", source: "Prophet Muhammad ﷺ" },
  { text: "Educate a woman and you educate a generation.", source: "African Proverb" },
  { text: "The best among you are those who have the best character.", source: "Prophet Muhammad ﷺ" },
];

function QuoteRotator() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % quotes.length); setFade(true); }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`quote-rotator ${fade ? 'fade-in' : 'fade-out'}`}>
      <p className="quote-text">"{quotes[idx].text}"</p>
      <p className="quote-source">— {quotes[idx].source}</p>
    </div>
  );
}

// ---------- Main App ----------
export default function App() {
  const typed = useTypewriter([
    'Girls\' Health Advocate',
    'Aspiring Health Professional',
    'Faith-Driven Creator',
    'Tech & Deen Blender',
  ]);

  useScrollReveal();

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Cursor */}
      <MagneticCursor />

      {/* Background layers */}
      <Aurora />
      <Particles />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-s">S</span>aiyara
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['about','projects','certifications','journey','contact'].map(id => (
            <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge reveal">✨ Open to Collaborations</div>
          <h1 className="hero-name reveal">Saiyara<br /><em>Saniha</em></h1>
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
              View My Work <span className="btn-arrow">→</span>
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

        {/* Floating orb decoration */}
        <div className="hero-orb orb-lg" />
        <div className="hero-orb orb-sm" />
      </section>

      {/* ── Stats ── */}
      <section className="section stats-section">
        <div className="stats-grid">
          <Counter end={4} label="Projects Built" suffix="+" />
          <Counter end={2} label="Years of Coding" suffix="+" />
          <Counter end={5} label="Fields of Interest" />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section about-section">
        <div className="about-layout">
          <div className="about-visual reveal">
            <div className="avatar-ring">
              <div className="avatar-inner">
                <span className="avatar-emoji">🌸</span>
              </div>
              <div className="orbit-dot od1" />
              <div className="orbit-dot od2" />
              <div className="orbit-dot od3" />
            </div>
          </div>
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

      {/* ── Vision ── */}
      <section className="section vision-section">
        <h2 className="section-title reveal">Vision &amp; Impact</h2>
        <div className="vision-grid">
          {[
            { icon: '🌸', title: 'Strength', desc: 'Helping girls grow stronger through challenges of life with gentle guidance.' },
            { icon: '🕌', title: 'Balance', desc: 'Balancing deen and dunya with grace, wisdom, and spiritual grounding.' },
            { icon: '💖', title: 'Health', desc: 'Creating health awareness resources that are private, safe, and empowering.' },
            { icon: '🌿', title: 'Wellness', desc: 'Holistic well-being rooted in Islamic principles and modern science.' },
          ].map((v, i) => (
            <div key={i} className={`glass-card vision-card reveal`} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="vision-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section projects-section">
        <h2 className="section-title reveal">My Projects</h2>
        <div className="project-grid">

          <div className="project-card featured reveal">
            <div className="project-glow" />
            <div className="project-header">
              <span className="project-icon">🌊</span>
              <span className="project-tag live">In Progress</span>
            </div>
            <h3>AzureFlow</h3>
            <p className="project-sub">Privacy-focused menstruation tracker for girls</p>
            <p>A safe, beautiful space for girls to track their cycle with complete privacy, gentle reminders, and faith-aligned content.</p>
            <div className="tech-stack">
              <span>React</span><span>Supabase</span><span>Tailwind</span>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-header">
              <span className="project-icon">🕌</span>
              <span className="project-tag done">Functional</span>
            </div>
            <h3>Pure Zakah</h3>
            <p>Simple &amp; accurate zakah calculator built with care for the Muslim community.</p>
            <div className="tech-stack"><span>React</span><span>Tailwind</span></div>
          </div>

          <div className="project-card reveal">
            <div className="project-header">
              <span className="project-icon">📖</span>
              <span className="project-tag wip">Upcoming</span>
            </div>
            <h3>StudySky</h3>
            <p>Study time tracker with friendly competition — stay focused, stay motivated.</p>
            <div className="tech-stack"><span>React</span></div>
          </div>

          <div className="project-card reveal">
            <div className="project-header">
              <span className="project-icon">🕊️</span>
              <span className="project-tag wip">Upcoming</span>
            </div>
            <h3>SakoonSky</h3>
            <p>Quran &amp; Sunnah-based emotional guidance for peaceful hearts and minds.</p>
            <div className="tech-stack"><span>React</span><span>API</span></div>
          </div>

        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="section certs-section">
        <h2 className="section-title reveal">Certifications &amp; Learning</h2>
        <p className="certs-intro reveal">A growing collection of verified knowledge across health, technology, and social impact.</p>

        {certCategories.map((cat, ci) => (
          cat.certs.length === 0 ? null : (
            <div key={cat.id} className={`cert-category reveal ${cat.small ? 'cert-category--small' : ''}`}>
              <div className="cert-cat-header" style={{ '--cat-accent': cat.accent }}>
                <span className="cert-cat-icon">{cat.icon}</span>
                <h3 className="cert-cat-title">{cat.label}</h3>
                <span className="cert-cat-count">{cat.certs.length} certificate{cat.certs.length !== 1 ? 's' : ''}</span>
              </div>
              <div className={`cert-grid ${cat.main ? 'cert-grid--main' : ''} ${cat.small ? 'cert-grid--small' : ''}`}>
                {cat.certs.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.link}
                    className={`cert-card ${cert.special ? 'cert-card--special' : ''}`}
                    style={{ '--cat-accent': cat.accent, '--cat-bg': cat.color, animationDelay: `${i * 0.06}s` }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="cert-card-inner">
                      <div className="cert-top">
                        <span className="cert-icon">{cert.special ? '🏆' : '📜'}</span>
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
        ))}
      </section>

      {/* ── Journey ── */}
      <section id="journey" className="section journey-section">
        <h2 className="section-title reveal">Academic Journey</h2>
        <div className="timeline">
          {[
            { title: 'Higher Secondary', years: '2025 – 2027', school: 'Rajuk Uttara Model College', status: 'In Progress', active: true },
            { title: 'Secondary',        years: '2020 – 2025', school: 'Rajuk Uttara Model College' },
            { title: 'Primary',          years: '2015 – 2019', school: 'Safiuddin Sarker Academy & College' },
          ].map((item, i) => (
            <div key={i} className={`timeline-item reveal ${item.active ? 'in-progress' : ''}`}>
              <div className="tl-dot">
                <div className="dot" />
              </div>
              <div className="timeline-content">
                <div className="tl-top">
                  <strong>{item.title}</strong>
                  {item.status && <span className="tl-badge">{item.status}</span>}
                </div>
                <p className="tl-years">{item.years}</p>
                <p className="tl-school">{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section contact-section">
        <div className="glass-card contact-card reveal">
          <div className="contact-glow" />
          <h2 className="section-title">Let's Connect</h2>
          <p className="subtitle">Open to meaningful conversations, collaborations, and ideas for girls' growth.</p>

          <div className="contact-buttons">
            {[
              { icon: 'fab fa-facebook-f', label: 'Facebook',  href: '#', color: '#1877F2' },
              { icon: 'fab fa-whatsapp',   label: 'WhatsApp',  href: '#', color: '#25D366' },
              { icon: 'fab fa-telegram',   label: 'Telegram',  href: '#', color: '#0088cc' },
              { icon: 'fas fa-envelope',   label: 'Email',     href: 'mailto:saiyara.saniha@gmail.com', color: '#EA4335' },
            ].map((c, i) => (
              <a key={i} href={c.href} className="contact-btn" style={{ '--accent': c.color }}>
                <i className={c.icon} />
                {c.label}
              </a>
            ))}
          </div>

          <p className="closing">Let's create something beautiful and meaningful together 🤍</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>Crafted with 💙 by Saiyara Saniha · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}