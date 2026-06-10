import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const handleChat = (e) => {
    e.preventDefault();
    const name = prompt("Please enter your name to start the chat on WhatsApp:") || "[Your Name]";
    const text = `Name: ${name}
Message: Hi Harsh! I need help with Tax Filing or GST registration. Can we chat?`;
    window.open(`https://wa.me/918735901813?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="float-wa">
      <div className="float-wa-tooltip">Hi! Need help with Tax Filing?</div>
      <a 
        href="#" 
        onClick={handleChat}
        className="float-wa-btn" 
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      <style>{`
        .float-wa {
          position: fixed;
          bottom: 2.2rem;
          right: 2.2rem;
          z-index: 900;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .float-wa-tooltip {
          background: var(--navy);
          color: var(--white);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.5rem 0.95rem;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: var(--shadow-navy);
          opacity: 0;
          transform: translateX(10px);
          transition: var(--transition);
          pointer-events: none;
          border: 1px solid var(--glass-border);
        }

        .float-wa:hover .float-wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        .float-wa-btn {
          width: 58px;
          height: 58px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          box-shadow: 0 6px 22px rgba(37,211,102,0.45);
          transition: var(--transition);
          animation: waPulse 2.2s ease-in-out infinite;
        }

        .float-wa-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 10px 30px rgba(37,211,102,0.6);
        }
      `}</style>
    </div>
  );
}
