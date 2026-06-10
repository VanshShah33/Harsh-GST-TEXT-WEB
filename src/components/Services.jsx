import React from 'react';
import { FaBuilding, FaFileContract, FaFileInvoiceDollar, FaChevronRight, FaCheckCircle } from 'react-icons/fa';

export default function Services({ openModal }) {
  const serviceItems = [
    {
      id: 'returns',
      icon: <FaFileInvoiceDollar size={24} />,
      title: 'Accurate Tax Returns',
      desc: 'We manage all your tax filing needs, ensuring complete accuracy, legal compliance, and timely filing.',
      bullets: [
        'Income Tax Returns (ITR-1 to ITR-7)',
        'TDS / TCS Filing & Correction',
        'GST Monthly / Quarterly Returns',
        'Tax Auditing Coordination',
        'Tax Dispute Resolution'
      ],
      preselect: 'Income Tax Returns'
    },
    {
      id: 'registrations',
      icon: <FaFileContract size={24} />,
      title: 'Business Registrations',
      desc: 'Handling all legal setups and governmental registrations for your peace of mind.',
      bullets: [
        'GST Registration & Amendments',
        'MSME Udyam Certification',
        '12A & 80G Charity Registration',
        'Darpan ID (NGOs & Trusts)',
        'PAN & TAN Registration'
      ],
      preselect: 'GST Registration'
    },
    {
      id: 'accounting',
      icon: <FaBuilding size={24} />,
      title: 'Dedicated Accounting',
      desc: 'Complete bookkeeping and financial support tailored to small businesses and startups.',
      bullets: [
        'End-to-End Bookkeeping',
        'GST Reconciliation & Filings',
        'Payroll & Salary Computations',
        'Financial Statements Preparation',
        'Dedicated Advisor Assistance'
      ],
      preselect: 'Accounting Services'
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <div className="text-center section-header reveal">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Professional <span>Financial Services</span></h2>
          <p className="section-desc">
            Comprehensive tax compliance and accounting solutions designed to simplify operations for individuals and businesses across India.
          </p>
        </div>

        <div className="services-grid">
          {serviceItems.map((s, idx) => (
            <div key={s.id} className={`service-card reveal delay-${idx * 100}`}>
              <div className="card-top-bar"></div>
              <div className="card-icon-wrapper">
                {s.icon}
              </div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-desc">{s.desc}</p>
              
              <ul className="card-list">
                {s.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <FaCheckCircle size={12} className="bullet-icon" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button 
                className="btn-card"
                onClick={() => openModal(s.preselect)}
              >
                <span>Get a Quotation</span>
                <FaChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #services {
          background: var(--cream);
          position: relative;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.2rem;
        }

        @media (max-width: 480px) {
          .service-card {
            padding: 1.8rem 1.4rem !important;
          }
          .services-grid {
            gap: 1.5rem;
          }
        }

        .service-card {
          background: var(--white);
          border-radius: var(--radius);
          padding: 2.5rem 2.2rem;
          border: 1px solid var(--navy-light);
          box-shadow: var(--shadow-navy);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--emerald);
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--transition);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
          border-color: rgba(15, 23, 42, 0.15);
        }

        .service-card:hover .card-top-bar {
          transform: scaleX(1);
        }

        .card-icon-wrapper {
          width: 52px;
          height: 52px;
          background: var(--emerald-pale);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--emerald);
          margin-bottom: 1.6rem;
          border: 1px solid rgba(16, 185, 129, 0.15);
          transition: var(--transition);
        }

        .service-card:hover .card-icon-wrapper {
          background: var(--emerald);
          color: var(--white);
          transform: scale(1.05);
        }

        .card-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.8rem;
          letter-spacing: -0.015em;
        }

        .card-desc {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.65;
          margin-bottom: 1.6rem;
          flex-grow: 1;
        }

        .card-list {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .card-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-mid);
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(15, 23, 42, 0.04);
        }

        .card-list li:last-child {
          border-bottom: none;
        }

        .bullet-icon {
          color: var(--emerald);
          flex-shrink: 0;
        }

        .btn-card {
          width: 100%;
          background: var(--cream);
          color: var(--navy);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid var(--navy-light);
        }

        .btn-card:hover {
          background: var(--emerald);
          color: var(--white);
          border-color: var(--emerald);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </section>
  );
}
