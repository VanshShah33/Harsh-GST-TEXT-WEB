import React, { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaMagic, FaFileInvoiceDollar, FaFileAlt, FaBuilding, FaRegCheckSquare } from 'react-icons/fa';

export default function QuoteModal({ isOpen, onClose, selectedService, selectService }) {
  const [localService, setLocalService] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedService) {
      setLocalService(selectedService);
    }
  }, [selectedService]);

  const serviceCategories = [
    {
      group: 'Tax Filings',
      icon: <FaFileInvoiceDollar size={14} />,
      options: ['Income Tax Returns', 'TDS Returns', 'GST Returns']
    },
    {
      group: 'Registrations',
      icon: <FaRegCheckSquare size={14} />,
      options: ['GST Registration', 'MSME Udyam', '12A & 80G Registrations', 'Darpan ID Registration', 'PAN/TAN Registration']
    },
    {
      group: 'Accounting & Combos',
      icon: <FaBuilding size={14} />,
      options: ['Accounting Services', 'Accounting Combo Package']
    }
  ];

  const handleSelect = (service) => {
    setLocalService(service);
    selectService(service);
  };

  const handleSend = () => {
    if (!localService) {
      alert('Please select a service first.');
      return;
    }
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const cleanMessage = `Name: ${name.trim()}
Service: ${localService}
Message: Hi Harsh, I'd like a quotation for this service. Can you please help me with the process, required files, and estimated fees?`;
    window.open(`https://wa.me/918735901813?text=${encodeURIComponent(cleanMessage)}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay open') {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes size={16} />
        </button>
        <div className="modal-header">
          <FaMagic size={20} color="var(--gold)" className="spark-icon" />
          <h3 className="modal-title">Request a Quotation</h3>
          <p className="modal-sub">Select a compliance service, and we will connect you on WhatsApp instantly.</p>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>Your Name *</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name" 
            required
            style={{
              background: 'var(--white)',
              border: '1px solid var(--navy-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.8rem 1.1rem',
              color: 'var(--text-dark)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'var(--transition)'
            }}
          />
        </div>

        <div className="service-groups">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="service-group-section">
              <div className="group-label">
                {cat.icon}
                <span>{cat.group}</span>
              </div>
              <div className="service-options-grid">
                {cat.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`service-option-btn ${localService === opt ? 'selected' : ''}`}
                    onClick={() => handleSelect(opt)}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button 
          className="modal-cta-btn" 
          onClick={handleSend}
          disabled={!localService || !name.trim()}
        >
          <FaPaperPlane size={15} />
          <span>Get Quote via WhatsApp</span>
        </button>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 14, 26, 0.88);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(8px);
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
        }

        .modal-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .modal {
          background: var(--card-bg);
          border-radius: var(--radius);
          width: 100%;
          max-width: 550px;
          padding: 2.5rem;
          position: relative;
          transform: scale(0.9) translateY(20px);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--navy-light);
          box-shadow: 0 30px 80px rgba(6, 14, 26, 0.6);
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .modal-overlay.open .modal {
          transform: scale(1) translateY(0);
        }

        .modal-close {
          position: absolute;
          top: 1.2rem; right: 1.2rem;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(10, 22, 40, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dark);
          transition: var(--transition);
        }

        .modal-close:hover {
          background: var(--gold);
          color: var(--navy);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.45rem;
          font-weight: 750;
          color: var(--text-dark);
          margin-top: 0.4rem;
          margin-bottom: 0.3rem;
        }

        .modal-sub {
          font-size: 0.85rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .service-groups {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          margin-bottom: 2.2rem;
        }

        .service-group-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .group-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-light);
          border-bottom: 1px solid var(--navy-light);
          padding-bottom: 4px;
        }

        .service-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .service-option-btn {
          background: var(--cream);
          border: 1.5px solid rgba(15, 23, 42, 0.08);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-dark);
          transition: var(--transition);
          text-align: left;
        }

        .service-option-btn:hover, .service-option-btn.selected {
          border-color: var(--emerald);
          background: var(--emerald-pale);
          color: var(--emerald);
        }

        .modal-cta-btn {
          width: 100%;
          background: #25D366;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 750;
          padding: 0.85rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
        }

        .modal-cta-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.5);
        }

        .modal-cta-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 600px) {
          .service-options-grid {
            grid-template-columns: 1fr;
          }
          .modal {
            padding: 2rem 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
