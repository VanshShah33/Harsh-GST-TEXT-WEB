import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [diamondAnim, setDiamondAnim] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'services', 'calculator', 'checklist', 'about', 'testimonials', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerDiamond = () => {
    setDiamondAnim(true);
    setTimeout(() => setDiamondAnim(false), 800);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    triggerDiamond();
    setMobileMenuOpen(false);
    
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Services', target: 'services' },
    { label: 'Tax Tool', target: 'calculator' },
    { label: 'Checklist', target: 'checklist' },
    { label: 'About', target: 'about' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <>
      <div className={`nav-click-diamond ${diamondAnim ? 'spin' : ''}`} id="navDiamond1"></div>
      <div className={`nav-click-diamond-2 ${diamondAnim ? 'spin' : ''}`} id="navDiamond2"></div>

      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          <div className="logo-bg-wrapper">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-img" style={{ height: '38px', width: '38px', position: 'relative', zIndex: 10 }}>
              <circle cx="50" cy="50" r="46" fill="url(#logoGrad)" />
              <path d="M28 32V68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              <path d="M28 50H56" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              <path d="M56 32V68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              <path d="M48 64L58 74L80 44" stroke="var(--emerald-pale)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logoGrad" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--emerald-dark)" />
                  <stop offset="100%" stopColor="var(--emerald)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="name">Harsh Shah</span>
            <span className="tagline">Tax Filing & GST Services</span>
          </div>
        </a>

        <div className="nav-links" role="menubar">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={activeSection === link.target ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          ))}
          <button 
            className="nav-cta"
            onClick={() => {
              triggerDiamond();
              openModal();
            }}
          >
            Request Quote
          </button>
        </div>

        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes color="var(--text-dark)" size={20} /> : <FaBars color="var(--text-dark)" size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        {navLinks.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            onClick={(e) => handleLinkClick(e, link.target)}
          >
            {link.label}
          </a>
        ))}
        <button 
          className="m-cta" 
          onClick={() => {
            setMobileMenuOpen(false);
            openModal();
          }}
        >
          Request Quote
        </button>
      </div>

      <style>{`
        #navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition);
          background: transparent;
        }

        #navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: var(--shadow-navy);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .logo-bg-wrapper {
          position: relative;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          position: relative;
          z-index: 2;
          height: 38px;
          width: 38px;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
        }

        .nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          margin-left: 8px;
        }

        .nav-logo-text .name {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.01em;
        }

        #navbar:not(.scrolled) .nav-logo-text .name {
          color: #ffffff; /* Contrast on hero slider */
        }

        .nav-logo-text .tagline {
          font-size: 0.65rem;
          color: var(--emerald);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .nav-links a {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          transition: var(--transition);
          letter-spacing: 0.03em;
          position: relative;
        }

        #navbar.scrolled .nav-links a {
          color: var(--text-mid);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; right: 50%;
          height: 2px;
          background: var(--emerald);
          transition: var(--transition);
          border-radius: 2px;
        }

        .nav-links a:hover, .nav-links a.active {
          color: var(--emerald) !important;
        }

        .nav-links a:hover::after, .nav-links a.active::after {
          left: 12%; right: 12%;
        }

        #navbar:not(.scrolled) .nav-links a:hover, 
        #navbar:not(.scrolled) .nav-links a.active {
          color: var(--emerald-light) !important;
        }

        #navbar:not(.scrolled) .nav-links a:hover::after, 
        #navbar:not(.scrolled) .nav-links a.active::after {
          background: var(--emerald-light);
        }

        .nav-cta {
          background: var(--emerald);
          color: var(--white);
          padding: 0.55rem 1.4rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
          transition: var(--transition);
          margin-left: 1rem;
        }

        .nav-cta:hover {
          background: var(--emerald-dark);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.25);
        }

        .nav-click-diamond {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(45deg) scale(0);
          width: 60px; height: 60px;
          border-radius: 6px;
          background: var(--navy);
          opacity: 0;
          pointer-events: none;
          z-index: 1500;
          box-shadow: 0 0 40px rgba(15, 23, 42, 0.4);
        }

        .nav-click-diamond.spin {
          animation: diamondSpin 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .nav-click-diamond-2 {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(45deg) scale(0);
          width: 40px; height: 40px;
          border-radius: 6px;
          border: 2px solid var(--emerald);
          background: transparent;
          opacity: 0;
          pointer-events: none;
          z-index: 1499;
        }

        .nav-click-diamond-2.spin {
          animation: diamondSpin2 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.08s forwards;
        }

        .hamburger {
          display: none;
          background: none;
          padding: 8px;
          border-radius: 8px;
          z-index: 1001;
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(15px);
          z-index: 999;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu a {
          font-family: 'Inter', sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          transition: var(--transition);
        }

        .mobile-menu a:hover {
          color: var(--emerald-light);
          transform: scale(1.05);
        }

        .mobile-menu .m-cta {
          margin-top: 1rem;
          background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
          color: var(--white);
          padding: 0.8rem 2.5rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(30, 64, 175, 0.15);
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          #navbar:not(.scrolled) .nav-logo-text .name {
            color: #ffffff;
          }
          #navbar:not(.scrolled) .hamburger svg {
            color: #ffffff !important;
          }
        }

        @media (max-width: 480px) {
          #navbar {
            padding: 0 1rem;
          }
          .nav-logo-text .name {
            font-size: 1.05rem;
          }
          .nav-logo-text .tagline {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </>
  );
}
