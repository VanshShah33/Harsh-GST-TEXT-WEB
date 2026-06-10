import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';

export default function Hero({ openModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" aria-label="Hero section">
      <div className="hero-slider">
        {slides.map((url, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge" role="text">
          <FaStar size={10} style={{ marginRight: '6px', color: 'var(--gold)' }} />
          <span>Elite Tax &amp; Financial Services</span>
          <FaStar size={10} style={{ marginLeft: '6px', color: 'var(--gold)' }} />
        </div>
        
        <h1 className="hero-heading">
          Simplified Tax Filing &amp; <span>GST Compliance</span>
        </h1>
        
        <p className="hero-sub">
          Providing individuals, freelancers, and growing businesses with accurate tax return filing, GST registration, bookkeeping, and compliance support.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => openModal()} aria-label="Get Free Consultation">
            Get Consultation <FaChevronRight size={12} style={{ marginLeft: '4px' }} />
          </button>
        </div>

      </div>

      <div className="hero-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === currentSlide}
          />
        ))}
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>

      <style>{`
        #hero {
          position: relative;
          height: 100vh;
          min-height: 800px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Inter', sans-serif;
        }

        .hero-slider {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.4s ease;
          transform: scale(1.0);
        }

        .hero-slide.active {
          opacity: 1;
          animation: heroZoom 8s ease-in-out infinite alternate;
        }

        @keyframes heroZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.05); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.95) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          max-width: 880px;
          padding: 0 2rem;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.5rem 1.4rem;
          border-radius: 6px;
          margin-bottom: 1.8rem;
          backdrop-filter: blur(10px);
          animation: fadeInDown 0.8s ease both;
        }

        .hero-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.3rem, 6.2vw, 4.3rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 1.6rem;
          letter-spacing: -0.03em;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.9s ease 0.15s both;
        }

        .hero-heading span {
          color: var(--emerald);
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255, 255, 255, 0.75);
          max-width: 650px;
          margin: 0 auto 2.8rem;
          line-height: 1.75;
          animation: fadeInUp 0.9s ease 0.3s both;
        }

        .hero-btns {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.9s ease 0.45s both;
          width: 100%;
        }

        .btn-primary {
          background: var(--emerald);
          color: var(--white) !important;
          border-radius: 6px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.18);
        }

        .btn-primary:hover {
          background: var(--emerald-dark);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.28);
        }

        .btn-outline {
          color: #ffffff !important;
          border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 6px !important;
          font-weight: 600 !important;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: var(--white) !important;
        }

        .hero-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 10px;
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid transparent;
        }

        .hero-dot.active {
          background: var(--emerald);
          width: 24px;
          border-radius: 4px;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3.5rem;
          right: 3rem;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          animation: fadeIn 1.5s ease 1s both;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--emerald), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          #hero {
            min-height: 700px;
          }
        }

        @media (max-width: 600px) {
          .scroll-indicator {
            display: none;
          }
          .hero-btns {
            flex-direction: column;
            align-items: stretch;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
