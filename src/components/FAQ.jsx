import React, { useState } from 'react';
import { FaSearch, FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

const FAQ_DATA = [
  {
    category: 'gst',
    question: 'How long does GST registration take?',
    answer: 'GST registration typically takes 7–10 working days, provided all required documents are submitted correctly. In some cases, it may take longer if additional clarifications are requested by the GST portal authorities.'
  },
  {
    category: 'itr',
    question: 'What documents are required for ITR filing?',
    answer: 'You typically need your PAN card, Aadhaar card, Form 16 (for salaried individuals), bank account details, investment proofs (under Section 80C, 80D, etc.), and interest certificates. Our Document Checklist tool can help you generate a customized list based on your profile.'
  },
  {
    category: 'gst',
    question: 'Is it mandatory for a new business to register for GST?',
    answer: 'GST registration is mandatory if your annual business turnover exceeds ₹40 Lakhs for goods suppliers (₹20 Lakhs in special category states) or ₹20 Lakhs for service providers (₹10 Lakhs in special category states). It is also mandatory for e-commerce sellers, interstate traders, and casual taxable persons regardless of turnover.'
  },
  {
    category: 'itr',
    question: 'What is AIS and TIS in income tax?',
    answer: 'AIS (Annual Information Statement) and TIS (Taxpayer Information Summary) are comprehensive statements issued by the Income Tax Department. They contain details of all financial transactions like salary, interest income, stock transactions, mutual funds, and taxes deducted at source (TDS). We cross-verify these statements before filing to avoid tax notices.'
  },
  {
    category: 'general',
    question: 'What is MSME Udyam Registration and its benefits?',
    answer: 'MSME Udyam Registration is a free government certification for Micro, Small, and Medium Enterprises. Benefits include access to collateral-free government loans, lower interest rates, priority sector lending, eligibility for subsidies, protection against delayed payments from buyers, and concession on electricity bills.'
  },
  {
    category: 'general',
    question: 'How does the quotation and service process work?',
    answer: 'You can choose your service and click "Get Quote". A dialog will allow you to send a pre-filled enquiry directly to Harsh Shah via WhatsApp. Once you agree on the pricing, you share documents online (WhatsApp/Email/Drive), we prepare the filing draft, obtain your final approval, file the returns, and share the official acknowledgement.'
  },
  {
    category: 'general',
    question: 'Can accounting and bookkeeping services be customized?',
    answer: 'Absolutely! Our accounting packages are highly scalable. Whether you need monthly bookkeeping, quarterly GST reconciliations, payroll processing for employees, or complete year-end balance sheet preparation, we formulate a package that fits your transaction volume and budget.'
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'itr', label: 'Income Tax (ITR)' },
    { id: 'gst', label: 'GST Services' },
    { id: 'general', label: 'General / Registrations' }
  ];

  const filteredFaq = FAQ_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq">
      <div className="container">
        <div className="text-center section-header reveal">
          <div className="section-label">Help Desk</div>
          <h2 className="section-title">Commonly Asked <span>Questions</span></h2>
          <p className="section-desc">
            Quickly find answers to regulatory queries about registrations, tax deductions, and files processing.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="faq-filters-wrapper reveal delay-100">
          <div className="faq-search-box">
            <FaSearch size={14} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search FAQ articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="faq-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(null);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-list reveal delay-150">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-question-btn" 
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="question-content">
                      <FaQuestionCircle size={15} className="help-icon" />
                      <span>{faq.question}</span>
                    </div>
                    <div className="faq-toggle-icon">
                      {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
                    </div>
                  </button>
                  
                  <div className="faq-answer-pane" style={{ maxHeight: isOpen ? '250px' : '0' }}>
                    <div className="faq-answer-inner">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results-msg">
              No matching questions found. Try typing another query or select "All Questions".
            </div>
          )}
        </div>
      </div>

      <style>{`
        #faq {
          background: var(--cream);
          position: relative;
        }
        
        .faq-filters-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto 3.2rem;
          align-items: center;
        }
        
        .faq-search-box {
          position: relative;
          width: 100%;
        }
        
        .faq-search-box .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        .faq-search-box input {
          width: 100%;
          padding: 0.9rem 1.2rem 0.9rem 3rem;
          border-radius: 12px;
          border: 1.5px solid var(--navy-light);
          background: var(--white);
          color: var(--text-dark);
          font-size: 0.95rem;
          font-family: inherit;
          transition: var(--transition);
          box-shadow: var(--shadow-navy);
        }
        
        .faq-search-box input:focus {
          border-color: var(--emerald);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
        }
        
        .faq-categories {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .category-btn {
          background: var(--white);
          border: 1.5px solid var(--navy-light);
          color: var(--text-mid);
          padding: 0.55rem 1.1rem;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .category-btn.active, .category-btn:hover {
          background: var(--navy);
          color: var(--white);
          border-color: var(--navy);
          box-shadow: var(--shadow-navy);
        }
        
        .faq-accordion-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .faq-item {
          border: 1px solid var(--navy-light);
          border-radius: var(--radius-sm);
          background: var(--card-bg);
          box-shadow: var(--shadow-navy);
          overflow: hidden;
          transition: var(--transition);
        }
        
        .faq-item:hover {
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
          border-color: rgba(15, 23, 42, 0.18);
        }
        
        .faq-question-btn {
          width: 100%;
          padding: 1.3rem 1.6rem;
          background: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          gap: 1rem;
          transition: var(--transition);
        }
        
        .question-content {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-dark);
        }
        
        .help-icon {
          color: var(--emerald);
          flex-shrink: 0;
        }
        
        .faq-toggle-icon {
          width: 28px;
          height: 28px;
          background: var(--emerald-pale);
          color: var(--emerald);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1.5px solid rgba(16, 185, 129, 0.2);
          transition: var(--transition);
        }
        
        .faq-item.open .faq-question-btn {
          background: rgba(16, 185, 129, 0.02);
        }
        
        .faq-item.open .faq-toggle-icon {
          background: var(--emerald);
          color: var(--white);
          border-color: var(--emerald);
          transform: rotate(180deg);
        }
        
        .faq-answer-pane {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-answer-inner {
          padding: 0 1.6rem 1.5rem 3.2rem;
          font-size: 0.92rem;
          color: var(--text-mid);
          line-height: 1.75;
          border-top: 1px solid var(--navy-light);
          padding-top: 1rem;
        }
        
        .no-results-msg {
          text-align: center;
          padding: 3rem;
          color: var(--text-light);
          font-style: italic;
          font-size: 0.92rem;
        }
      `}</style>
    </section>
  );
}
