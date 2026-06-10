import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaExclamationTriangle, FaArrowRight, FaBell } from 'react-icons/fa';

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      type: 'warning',
      icon: <FaExclamationTriangle size={24} color="var(--gold)" />,
      title: 'Income Tax Return (ITR) Filing Active',
      message: 'ITR filing for Assessment Year 2026-27 (Financial Year 2025-26) is active. File early to avoid late fees under Section 234F and secure fast refunds.',
      date: 'Deadline: 31st July'
    },
    {
      type: 'info',
      icon: <FaCalendarAlt size={24} color="var(--gold-light)" />,
      title: 'Monthly GST Compliance Warning',
      message: 'Ensure GSTR-1 & GSTR-3B filings are reconciled to claim full Input Tax Credit (ITC) without portal blockers. Contact us to compute your balances.',
      date: 'Monthly Deadline: 11th & 20th'
    }
  ];

  useEffect(() => {
    // Show announcement popup 1.5 seconds after page load, but only if not seen recently in session
    const seen = sessionStorage.getItem('harshshah_announcement_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('harshshah_announcement_seen', 'true');
  };

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const currentSlide = slides[slideIndex];

  return (
    <div className="ann-overlay" role="dialog" aria-modal="true">
      <div className="ann-box">
        
        {/* Close Button */}
        <button className="ann-close-btn" onClick={handleClose} aria-label="Dismiss announcement">
          <FaTimes size={16} />
        </button>

        {/* Counter Badge */}
        {slides.length > 1 && (
          <div className="ann-counter">
            {slideIndex + 1} of {slides.length}
          </div>
        )}

        {/* Slide Content */}
        <div className="ann-content">
          <div className="ann-icon-wrapper">
            {currentSlide.icon}
          </div>
          
          <div className="ann-badge-header">
            <FaBell size={12} className="bell-icon" />
            <span>Important Announcement</span>
          </div>

          <h3 className="ann-title">{currentSlide.title}</h3>
          <p className="ann-message">{currentSlide.message}</p>
          
          <div className="ann-date-badge">
            {currentSlide.date}
          </div>
        </div>

        {/* Footer actions */}
        <div className="ann-footer">
          <button className="ann-skip-btn" onClick={handleClose}>
            Skip Alerts
          </button>
          
          <button className="ann-next-btn" onClick={handleNext}>
            <span>{slideIndex === slides.length - 1 ? 'Got it' : 'Next Alert'}</span>
            <FaArrowRight size={14} />
          </button>
        </div>

      </div>

      <style>{`
        .ann-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 14, 26, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(6px);
          animation: pgFadeIn 0.4s ease both;
        }

        .ann-box {
          position: relative;
          background: var(--navy-mid);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          box-shadow: 0 30px 80px rgba(6, 14, 26, 0.7);
          max-width: 480px;
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: pgSlideUp 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .ann-close-btn {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(10, 22, 40, 0.75);
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          z-index: 10;
        }

        .ann-close-btn:hover {
          background: var(--gold);
          color: var(--navy);
          border-color: var(--gold);
        }

        .ann-counter {
          position: absolute;
          top: 14px; left: 14px;
          background: rgba(10, 22, 40, 0.75);
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: var(--gold-light);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
          z-index: 10;
          letter-spacing: 0.05em;
        }

        .ann-content {
          padding: 3.2rem 2.2rem 2.2rem;
          text-align: center;
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
        }

        .ann-icon-wrapper {
          width: 58px;
          height: 58px;
          background: rgba(201, 168, 76, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.2rem;
          border: 1px solid rgba(201, 168, 76, 0.25);
        }

        .ann-badge-header {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 0.9rem;
        }

        .bell-icon {
          animation: logoBgPulse 2s ease-in-out infinite;
        }

        .ann-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--white);
          line-height: 1.25;
          margin-bottom: 0.8rem;
        }

        .ann-message {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.65;
          margin-bottom: 1.4rem;
        }

        .ann-date-badge {
          display: inline-block;
          background: rgba(201, 168, 76, 0.12);
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 6px;
        }

        .ann-footer {
          padding: 0.9rem 2.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(10, 22, 40, 0.3);
        }

        .ann-skip-btn {
          background: none;
          color: rgba(255,255,255,0.45);
          font-size: 0.8rem;
          font-weight: 600;
          transition: var(--transition);
        }

        .ann-skip-btn:hover {
          color: var(--white);
        }

        .ann-next-btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--navy);
          font-weight: 750;
          font-size: 0.82rem;
          padding: 0.5rem 1.4rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .ann-next-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(201, 168, 76, 0.3);
        }
      `}</style>
    </div>
  );
}
