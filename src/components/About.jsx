import React, { useState, useEffect, useRef } from 'react';
import { FaShieldAlt, FaMagic, FaHandshake, FaUsers, FaAward } from 'react-icons/fa';

export default function About() {
  const [counts, setCounts] = useState({ returns: 0, regs: 0, clients: 0, exp: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const targets = { returns: 100, regs: 35, clients: 50, exp: 1.5 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        returns: Math.round(eased * targets.returns),
        regs: Math.round(eased * targets.regs),
        clients: Math.round(eased * targets.clients),
        exp: Number((eased * targets.exp).toFixed(1))
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, frameRate);
  };

  const highlights = [
    { title: 'Proficient Guidance', desc: 'Expert advice across direct & indirect tax laws.', icon: <FaAward size={14} /> },
    { title: 'Accurate Filing', desc: 'Meticulous verification to eliminate filing faults.', icon: <FaShieldAlt size={14} /> },
    { title: 'Secure Documentation', desc: 'Encrypted document handling for total privacy.', icon: <FaShieldAlt size={14} /> },
    { title: 'Transparent Costing', desc: 'Fixed rates with absolutely zero hidden charges.', icon: <FaHandshake size={14} /> }
  ];

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        
        {/* Achievements counters */}
        <div className="counters-wrapper reveal">
          <div className="counter-item">
            <div className="counter-number">{counts.returns}+</div>
            <div className="counter-label">Returns Filed</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{counts.regs}+</div>
            <div className="counter-label">Registrations Done</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{counts.clients}+</div>
            <div className="counter-label">Happy Clients</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{counts.exp}+</div>
            <div className="counter-label">Years Experience</div>
          </div>
        </div>

        <div className="about-grid">
          {/* About Visuals */}
          <div className="about-visual reveal-left">
            <div className="about-img-wrap">
              <img 
                src="https://i.ibb.co/TMQ3MB1S/scott-graham-OQMZw-Nd3-Th-U-unsplash.jpg" 
                alt="Harsh Shah Tax Services Consulting" 
              />
            </div>
            <div className="about-badge">
              <span className="num">1.5+</span>
              <span className="txt">Years of Compliance Excellence</span>
            </div>
          </div>

          {/* About Text */}
          <div className="about-text reveal-right">
            <div className="section-label" style={{ justifyContent: 'flex-start' }}>About the Practice</div>
            <h2 className="section-title">Professional Tax Solutions By <span>Harsh Shah</span></h2>
            <p className="about-desc">
              At our core, we believe that complex tax and accounting processes shouldn't stand in the way of your peace of mind or business growth. We simplify financial compliance with transparent communications and technical accuracy.
            </p>
            <p className="about-desc secondary">
              Combining in-depth regulatory updates with client-focused support, we ensure your income tax filing, GST compliance, and corporate bookkeeping are managed with the highest standards of reliability.
            </p>

            <div className="about-highlights-grid">
              {highlights.map((h, i) => (
                <div key={i} className={`about-highlight-card reveal delay-${i * 100}`}>
                  <div className="highlight-icon">
                    {h.icon}
                  </div>
                  <div>
                    <h5>{h.title}</h5>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        #about {
          background: var(--cream);
          position: relative;
        }

        .counters-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 3rem 2rem;
          margin-bottom: 5.5rem;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
          position: relative;
          z-index: 2;
        }

        .counter-item {
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
        }

        .counter-item:last-child {
          border-right: none;
        }

        .counter-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--emerald-light), #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .counter-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.82);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4.5rem;
          align-items: center;
        }

        .about-visual {
          position: relative;
        }

        .about-img-wrap {
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.1);
          border: 1px solid var(--navy-light);
        }

        .about-img-wrap img {
          width: 100%;
          display: block;
          transition: var(--transition);
        }

        .about-visual:hover .about-img-wrap img {
          transform: scale(1.03);
        }

        .about-badge {
          position: absolute;
          bottom: -1.8rem;
          right: -1.2rem;
          background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
          color: var(--white);
          padding: 1.2rem 1.6rem;
          border-radius: 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 750;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.18);
          max-width: 180px;
          text-align: center;
          line-height: 1.2;
        }

        .about-badge .num {
          font-size: 2.2rem;
          display: block;
          margin-bottom: 2px;
          font-weight: 800;
        }

        .about-badge .txt {
          font-size: 0.75rem;
          display: block;
          opacity: 0.9;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .about-text {
          display: flex;
          flex-direction: column;
        }

        .about-desc {
          font-size: 1.05rem;
          color: var(--text-dark);
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .about-desc.secondary {
          font-size: 0.95rem;
          color: var(--text-light);
          margin-bottom: 1.8rem;
        }

        .about-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .about-highlight-card {
          background: var(--card-bg);
          border: 1px solid var(--navy-light);
          border-radius: var(--radius-sm);
          padding: 1.2rem;
          display: flex;
          gap: 12px;
          transition: var(--transition);
          box-shadow: var(--shadow-navy);
        }

        .about-highlight-card:hover {
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.08);
          transform: translateY(-2px);
        }

        .highlight-icon {
          width: 32px;
          height: 32px;
          background: var(--emerald-pale);
          color: var(--emerald);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(16, 185, 129, 0.12);
        }

        .about-highlight-card h5 {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 2px;
        }

        .about-highlight-card p {
          font-size: 0.75rem;
          color: var(--text-light);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .counters-wrapper {
            grid-template-columns: repeat(2, 1fr);
            padding: 2.2rem 1.5rem;
            margin-bottom: 4rem;
          }
          .counter-item {
            border-right: none;
            padding: 1rem;
          }
          .counter-item:nth-child(odd) {
            border-right: 1px solid rgba(255, 255, 255, 0.15);
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .about-visual {
            order: -1;
            max-width: 450px;
            margin: 0 auto;
          }
          .about-badge {
            bottom: -1rem;
            right: 0.5rem;
          }
        }

        @media (max-width: 500px) {
          .counters-wrapper {
            grid-template-columns: 1fr;
          }
          .counter-item:nth-child(odd) {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          }
          .counter-item {
            padding: 1.2rem;
          }
          .counter-item:last-child {
            border-bottom: none;
          }
          .about-highlights-grid {
            grid-template-columns: 1fr;
          }
          .about-badge {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin: 1.5rem auto 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
