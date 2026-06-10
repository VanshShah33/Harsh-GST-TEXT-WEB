import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaPaperPlane, FaWhatsapp, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Enquiry',
    message: ''
  });
  const [contactMethod, setContactMethod] = useState('whatsapp'); // 'whatsapp' or 'email'

  const servicesList = [
    'General Enquiry',
    'Income Tax Filing (ITR)',
    'GST Registration',
    'GST Return Filing',
    'TDS Returns',
    'MSME Udyam Registration',
    'NGO / Trust Registration',
    'Bookkeeping & Accounting'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, service, message } = formData;

    if (!name || !phone) {
      alert('Please fill out your Name and Phone number.');
      return;
    }

    const cleanMessage = `Name: ${name.trim()}
Phone: ${phone}
Email: ${email || 'Not Specified'}
Service: ${service}
Message: ${message || 'Need consultation'}`;

    if (contactMethod === 'whatsapp') {
      window.open(`https://wa.me/918735901813?text=${encodeURIComponent(cleanMessage)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:hs9240875@gmail.com?subject=Tax Service Enquiry: ${service}&body=${encodeURIComponent(cleanMessage)}`;
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-card-wrapper reveal-scale">
          <div className="contact-grid">
            
            {/* Left Info Panel */}
            <div className="contact-info-panel reveal-left delay-100">
              <div className="section-label" style={{ justifyContent: 'flex-start' }}>Get in touch</div>
              <h2 className="panel-title">Secure Your <span>Financial Future</span></h2>
              <p className="panel-desc">
                Contact our helpdesk today. Let us streamline your registrations and tax filings so you can focus on growing your business.
              </p>

              <div className="info-list">
                <a href="tel:+918735901813" className="info-link-item">
                  <div className="icon-box"><FaPhoneAlt size={18} /></div>
                  <div>
                    <span className="label">Call Directly</span>
                    <strong className="val">+91 87359 01813</strong>
                  </div>
                </a>

                <a href="mailto:hs9240875@gmail.com" className="info-link-item">
                  <div className="icon-box"><FaEnvelope size={18} /></div>
                  <div>
                    <span className="label">Send an Email</span>
                    <strong className="val">hs9240875@gmail.com</strong>
                  </div>
                </a>

              </div>
            </div>

            {/* Right Form Panel */}
            <div className="contact-form-panel reveal-right delay-200">
              <h3 className="form-heading">Send an Instant Enquiry</h3>
              
              <div className="method-selector">
                <button
                   type="button"
                   className={`method-btn ${contactMethod === 'whatsapp' ? 'active' : ''}`}
                   onClick={() => setContactMethod('whatsapp')}
                >
                  <FaWhatsapp size={16} />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                   type="button"
                   className={`method-btn ${contactMethod === 'email' ? 'active' : ''}`}
                   onClick={() => setContactMethod('email')}
                >
                  <FaEnvelope size={16} />
                  <span>Send via Email</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="lead-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleInputChange}
                      placeholder="e.g. +91 87359 01813" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleInputChange}
                      placeholder="e.g. name@example.com" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service of Interest</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    {servicesList.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message / Requirements</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3" 
                    placeholder="Describe your requirements (e.g. need to file ITR-1, need business GST registration)"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <FaPaperPlane size={16} />
                  <span>{contactMethod === 'whatsapp' ? 'Connect on WhatsApp' : 'Send Email Enquiry'}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        #contact {
          background: var(--cream);
          color: var(--text-mid);
          padding: 6.5rem 0;
          position: relative;
          overflow: hidden;
        }

        #contact::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(15, 23, 42, 0.02) 0%, transparent 65%);
          pointer-events: none;
        }

        .contact-card-wrapper {
          background: var(--white);
          border: 1px solid var(--navy-light);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-navy);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
        }

        .contact-info-panel {
          padding: 4rem;
          border-right: 1px solid var(--navy-light);
          background: rgba(15, 23, 42, 0.01);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .panel-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 3.8vw, 2.8rem);
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.2;
          margin-bottom: 1.2rem;
        }

        .panel-title span {
          color: var(--emerald);
        }

        .panel-desc {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .info-link-item {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-mid);
          transition: var(--transition);
        }

        .info-link-item:hover {
          color: var(--emerald);
        }

        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--emerald-pale);
          color: var(--emerald);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .info-link-item:hover .icon-box {
          background: var(--emerald);
          color: var(--white);
          border-color: var(--emerald);
        }

        .info-link-item .label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
        }

        .info-link-item .val {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .contact-form-panel {
          padding: 4rem;
          background: var(--white);
        }

        .form-heading {
          font-family: 'Inter', sans-serif;
          font-size: 1.45rem;
          color: var(--text-dark);
          margin-bottom: 1.6rem;
          border-bottom: 1px solid var(--navy-light);
          padding-bottom: 0.6rem;
        }

        .method-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 1.8rem;
        }

        .method-btn {
          flex: 1;
          background: var(--cream);
          border: 1px solid var(--navy-light);
          color: var(--text-mid);
          padding: 0.7rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.82rem;
          transition: var(--transition);
        }

        .method-btn.active, .method-btn:hover {
          background: var(--navy);
          color: var(--white);
          border-color: var(--navy);
        }

        .lead-form {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        .lead-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lead-form label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .lead-form input, .lead-form select, .lead-form textarea {
          background: var(--white);
          border: 1px solid var(--navy-light);
          border-radius: var(--radius-sm);
          padding: 0.8rem 1.1rem;
          color: var(--text-dark);
          font-size: 0.9rem;
          font-family: inherit;
          transition: var(--transition);
          outline: none;
        }

        .lead-form select option {
          background: var(--white);
          color: var(--text-dark);
        }

        .lead-form input:focus, .lead-form select:focus, .lead-form textarea:focus {
          border-color: var(--navy);
          background: var(--white);
        }

        .submit-btn {
          background: var(--navy);
          color: var(--white);
          font-weight: 750;
          font-size: 0.92rem;
          padding: 0.85rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 1rem;
          transition: var(--transition);
          box-shadow: var(--shadow-navy);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: var(--navy-mid);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-info-panel {
            padding: 3rem 2.2rem;
            border-right: none;
            border-bottom: 1px solid var(--navy-light);
          }
          .contact-form-panel {
            padding: 3rem 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .contact-info-panel {
            padding: 2rem 1.2rem !important;
          }
          .contact-form-panel {
            padding: 2rem 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
