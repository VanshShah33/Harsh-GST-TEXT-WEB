import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaChevronRight, FaHeart, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function Footer({ openModal }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
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

  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
              <div className="logo-bg-wrapper" style={{ width: '36px', height: '36px', marginRight: '8px' }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '32px', width: '32px', position: 'relative', zIndex: 10 }}>
                  <circle cx="50" cy="50" r="46" fill="url(#logoGradFooter)" />
                  <path d="M28 32V68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
                  <path d="M28 50H56" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
                  <path d="M56 32V68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
                  <path d="M48 64L58 74L80 44" stroke="var(--emerald-pale)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="logoGradFooter" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="var(--emerald-dark)" />
                      <stop offset="100%" stopColor="var(--emerald)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="nav-logo-text">
                <span className="name" style={{ fontSize: '0.95rem' }}>Harsh Shah</span>
                <span className="tagline" style={{ fontSize: '0.6rem' }}>Tax Filing & GST Services</span>
              </div>
            </a>
            <p className="footer-desc">
              Simplifying complex financial regulations with dedicated expertise, strict accuracy, and complete transparency. Your trusted partner for individual tax returns, GST files, and corporate accounting.
            </p>
            <div className="social-links">
              <a href="https://wa.me/918735901813" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link">
                <FaWhatsapp size={15} />
              </a>
              <a href="mailto:hs9240875@gmail.com" aria-label="Email" className="social-link">
                <FaEnvelope size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}><FaChevronRight size={12} /> Home</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> Services</a></li>
              <li><a href="#calculator" onClick={(e) => handleLinkClick(e, 'calculator')}><FaChevronRight size={12} /> Tax Tool</a></li>
              <li><a href="#checklist" onClick={(e) => handleLinkClick(e, 'checklist')}><FaChevronRight size={12} /> Checklist</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}><FaChevronRight size={12} /> About</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}><FaChevronRight size={12} /> Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Services directory */}
          <div>
            <h3 className="footer-heading">Our Offerings</h3>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> Income Tax Returns</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> TDS Return Filing</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> GST Return Filing</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> GST Registration</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> MSME Registration</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}><FaChevronRight size={12} /> Trust Registration</a></li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h3 className="footer-heading">Direct Contact</h3>
            <div className="footer-contact-item">
              <FaPhoneAlt size={14} className="c-icon" />
              <a href="tel:+918735901813">+91 87359 01813</a>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope size={14} className="c-icon" />
              <a href="mailto:hs9240875@gmail.com">hs9240875@gmail.com</a>
            </div>
            
            <button className="footer-quote-btn" onClick={openModal}>
              Request a Quote
            </button>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {currentYear} <span>Harsh Shah</span>. All Rights Reserved.
          </div>
          <div className="footer-crafted">
            Crafted with <FaHeart size={12} className="heart-icon" /> for financial excellence
          </div>
        </div>

      </div>

      <style>{`
        footer {
          background: #050d18;
          color: rgba(255, 255, 255, 0.65);
          padding: 4.5rem 0 2rem;
          border-top: 1px solid rgba(201, 168, 76, 0.15);
          font-size: 0.88rem;
        }

        footer .nav-logo-text .name {
          color: #ffffff !important;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 3.5rem;
          margin-bottom: 3.5rem;
        }

        .footer-brand .nav-logo {
          margin-bottom: 1.2rem;
        }

        .footer-desc {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 0.6rem;
        }

        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(201, 168, 76, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: var(--transition);
        }

        .social-link:hover {
          background: var(--gold);
          color: var(--navy);
          border-color: var(--gold);
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 1.4rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.5);
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .footer-links a:hover {
          color: var(--gold-light);
          padding-left: 4px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-contact-item .c-icon {
          color: var(--gold);
          flex-shrink: 0;
        }

        .footer-contact-item a:hover {
          color: var(--gold-light);
        }

        .footer-quote-btn {
          width: 100%;
          background: rgba(255,255,255,0.02);
          color: var(--gold-light);
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 10px;
          padding: 0.7rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          margin-top: 1.2rem;
          transition: var(--transition);
        }

        .footer-quote-btn:hover {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--navy);
          border-color: var(--gold);
          box-shadow: 0 4px 15px rgba(201,168,76,0.25);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.35);
        }

        .footer-bottom span {
          color: var(--gold);
        }

        .footer-crafted {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .heart-icon {
          color: #e25555;
          animation: logoBgPulse 1.8s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
