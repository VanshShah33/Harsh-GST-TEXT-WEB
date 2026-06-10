import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaPaperPlane, FaInfoCircle, FaClipboardList, FaUndo } from 'react-icons/fa';

export default function ComplianceQuiz() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState({
    source: '',
    range: '',
    goal: ''
  });

  const incomeSources = [
    { id: 'salaried', label: 'Salaried Employee', desc: 'Recieve salary slip / Form 16' },
    { id: 'business', label: 'Business Owner / Freelancer', desc: 'Self-employed, GST billing, or professional consulting' },
    { id: 'investor', label: 'Investor (Capital Gains)', desc: 'Trading stocks, crypto, mutual funds, or selling property' },
    { id: 'other', label: 'Pension / Rental Income', desc: 'Retirees or landlords with multiple properties' }
  ];

  const incomeRanges = [
    { id: 'low', label: 'Up to ₹3 Lakhs', desc: 'No tax liability, file to claim refund' },
    { id: 'medium', label: '₹3L - ₹7 Lakhs', desc: 'Eligible for rebate under Section 87A' },
    { id: 'high', label: '₹7L - ₹15 Lakhs', desc: 'High scope for tax saving planning' },
    { id: 'very-high', label: 'Above ₹15 Lakhs', desc: 'Requires professional tax structuring' }
  ];

  const complianceGoals = [
    { id: 'itr', label: 'File Income Tax Return (ITR)', desc: 'Submit AY 2026-27 return safely' },
    { id: 'gst', label: 'Get New Business/GST Registration', desc: 'Incorporate partnership, MSME, or GSTIN' },
    { id: 'monthly', label: 'Monthly GST & Bookkeeping', desc: 'Outsource reconciliations and compliance' },
    { id: 'advice', label: 'Tax Advisory & Structuring', desc: 'Consultation to optimize personal tax slabs' }
  ];

  const handleSelect = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    // Auto-advance to next step for better UX
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 250);
  };

  const resetQuiz = () => {
    setStep(0);
    setName('');
    setAnswers({ source: '', range: '', goal: '' });
  };

  // Compute recommendations
  const getRecommendation = () => {
    let type = 'ITR-1 (Sahaj)';
    let tip = 'Invest up to ₹1.5L in 80C (PPF/ELSS) and ₹50k in NPS (80CCD) to maximize deductions.';
    let docs = ['Aadhaar Card & PAN Card', 'Form 16 from employer', 'Bank Statements (FY 2025-26)', 'Interest certificate from Bank'];

    if (answers.source === 'business') {
      type = 'ITR-3 / ITR-4 (Sugam)';
      tip = 'Opt for Presumptive Taxation under Sec 44AD/44ADA to declare 6%/50% profit without audit hassles.';
      docs = ['Aadhaar Card & PAN Card', 'GST Sales Ledger & Bank Statements', 'Expenses receipts (Broadband, rent, travel)', 'Capital assets purchase receipts'];
    } else if (answers.source === 'investor') {
      type = 'ITR-2 / Capital Gains Filing';
      tip = 'Offset short term capital losses against gains to minimize total taxable investment income.';
      docs = ['Aadhaar Card & PAN Card', 'Brokerage Profit & Loss statements', 'Capital gains statement from mutual funds', 'Bank statements'];
    }

    if (answers.goal === 'gst') {
      type = 'New Business Registration & Compliance';
      tip = 'Get MSME Udyam registration along with GST to claim interest rebate and credit benefits.';
      docs = ['Aadhaar Card & PAN Card', 'Electricity Bill of Business place', 'Rent Agreement / Consent Letter', 'Cancel Cheque of Bank Account'];
    } else if (answers.goal === 'monthly') {
      type = 'Monthly GST Returns & Accounting';
      tip = 'Perform regular monthly GSTR-2B reconciliation to capture full Input Tax Credit without blocks.';
      docs = ['PAN card of Proprietor/Directors', 'GST Portal Credentials', 'Purchase invoices & Sales ledgers', 'Bank statements'];
    }

    if (answers.range === 'very-high') {
      tip += ' Advanced planning: claim HRA exemption, interest on home loan (Sec 24), and corporate NPS schemes.';
    }

    return { type, tip, docs };
  };

  const handleWhatsAppSend = () => {
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const rec = getRecommendation();
    const sourceLabel = incomeSources.find(s => s.id === answers.source)?.label || 'Other';
    const rangeLabel = incomeRanges.find(r => r.id === answers.range)?.label || 'Other';
    const goalLabel = complianceGoals.find(g => g.id === answers.goal)?.label || 'Other';

    const text = `Name: ${name.trim()}
Goal: ${goalLabel}
Source: ${sourceLabel}
Range: ${rangeLabel}
Recommends: ${rec.type}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918735901813?text=${encodedText}`, '_blank');
  };

  const rec = getRecommendation();

  return (
    <section id="quiz-onboarding" className="quiz-section">
      <div className="container">
        <div className="section-label">Smart Onboarding</div>
        <h2 className="section-title">
          Interactive <span>Compliance Onboarding</span>
        </h2>
        <p className="section-desc">
          Answer a few basic questions to generate your custom tax document checklist and compliance roadmap.
        </p>

        <div className="quiz-container reveal-scale">
          {step === 0 && (
            <div className="quiz-step active">
              <div className="quiz-intro-card">
                <div className="quiz-icon-wrapper">
                  <FaClipboardList size={32} color="var(--emerald)" />
                </div>
                <h3>Quick Tax &amp; Business Structuring Wizard</h3>
                <p>
                  Not sure which ITR forms apply to you or what documents are needed for GST filing? Spend 1 minute answering these questions and get a custom onboarding plan.
                </p>
                <button className="btn-primary" onClick={() => setStep(1)}>
                  Start Smart Wizard <FaArrowRight size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="quiz-step active">
              <div className="quiz-card">
                <div className="quiz-header">
                  <button className="back-btn" onClick={() => setStep(0)} aria-label="Back">
                    <FaArrowLeft size={14} /> Back
                  </button>
                  <div className="progress-indicator">Step 1 of 3</div>
                </div>
                <h3 className="quiz-question">Select your primary source of income:</h3>
                <div className="quiz-options">
                  {incomeSources.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${answers.source === opt.id ? 'active' : ''}`}
                      onClick={() => handleSelect('source', opt.id)}
                    >
                      <div className="opt-marker"></div>
                      <div className="opt-info">
                        <span className="opt-title">{opt.label}</span>
                        <span className="opt-desc">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="quiz-step active">
              <div className="quiz-card">
                <div className="quiz-header">
                  <button className="back-btn" onClick={() => setStep(1)} aria-label="Back">
                    <FaArrowLeft size={14} /> Back
                  </button>
                  <div className="progress-indicator">Step 2 of 3</div>
                </div>
                <h3 className="quiz-question">Select your annual gross income range:</h3>
                <div className="quiz-options">
                  {incomeRanges.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${answers.range === opt.id ? 'active' : ''}`}
                      onClick={() => handleSelect('range', opt.id)}
                    >
                      <div className="opt-marker"></div>
                      <div className="opt-info">
                        <span className="opt-title">{opt.label}</span>
                        <span className="opt-desc">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="quiz-step active">
              <div className="quiz-card">
                <div className="quiz-header">
                  <button className="back-btn" onClick={() => setStep(2)} aria-label="Back">
                    <FaArrowLeft size={14} /> Back
                  </button>
                  <div className="progress-indicator">Step 3 of 3</div>
                </div>
                <h3 className="quiz-question">What is your main financial requirement?</h3>
                <div className="quiz-options">
                  {complianceGoals.map((opt) => (
                    <button
                      key={opt.id}
                      className={`quiz-option-btn ${answers.goal === opt.id ? 'active' : ''}`}
                      onClick={() => handleSelect('goal', opt.id)}
                    >
                      <div className="opt-marker"></div>
                      <div className="opt-info">
                        <span className="opt-title">{opt.label}</span>
                        <span className="opt-desc">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="quiz-step active">
              <div className="quiz-card results-card">
                <h3 className="results-card-title">Your Compliance Plan is Ready!</h3>

                <div className="result-block">
                  <span className="block-label">Recommended Service Filing</span>
                  <div className="rec-type-badge">{rec.type}</div>
                </div>

                <div className="result-grid">
                  <div className="result-column">
                    <span className="block-label">Required Documents Checklist</span>
                    <ul className="rec-docs-list">
                      {rec.docs.map((doc, idx) => (
                        <li key={idx}>
                          <FaCheck size={12} className="check-icon" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="result-column">
                    <span className="block-label">Key Tax Optimization Advice</span>
                    <div className="advice-box">
                      <FaInfoCircle size={16} className="info-icon" />
                      <p>{rec.tip}</p>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)', textAlign: 'left' }}>Your Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
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

                <div className="results-footer">
                  <button className="reset-btn" onClick={resetQuiz}>
                    <FaUndo size={12} /> Retake Quiz
                  </button>
                  
                  <button className="submit-wa-btn" onClick={handleWhatsAppSend} disabled={!name.trim()}>
                    <FaPaperPlane size={14} />
                    <span>Send Report &amp; Get Started on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-section {
          background: var(--cream);
          position: relative;
          z-index: 5;
        }

        .quiz-container {
          max-width: 800px;
          margin: 3rem auto 0;
        }

        .quiz-intro-card {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 3.5rem;
          text-align: center;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: var(--shadow-navy);
        }

        .quiz-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--emerald-pale);
          border: 1px solid rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .quiz-intro-card h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.8rem;
          font-weight: 750;
          color: var(--text-dark);
          margin-bottom: 1.2rem;
        }

        .quiz-intro-card p {
          font-size: 1rem;
          color: var(--text-mid);
          line-height: 1.7;
          margin-bottom: 2.2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .quiz-card {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 3rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: var(--shadow-navy);
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--navy-light);
          padding-bottom: 1rem;
        }

        .back-btn {
          background: none;
          color: var(--text-mid);
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .back-btn:hover {
          color: var(--navy);
        }

        .progress-indicator {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--emerald);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quiz-question {
          font-family: 'Inter', sans-serif;
          font-size: 1.45rem;
          font-weight: 750;
          color: var(--text-dark);
          margin-bottom: 2rem;
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }

        .quiz-option-btn {
          background: var(--white);
          border: 1.5px solid var(--navy-light);
          border-radius: 12px;
          padding: 1rem 1.4rem;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: var(--transition);
        }

        .quiz-option-btn:hover {
          background: var(--emerald-pale);
          border-color: var(--emerald);
          transform: translateX(4px);
        }

        .opt-marker {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--text-light);
          flex-shrink: 0;
          transition: var(--transition);
        }

        .quiz-option-btn:hover .opt-marker {
          border-color: var(--emerald);
        }

        .opt-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .opt-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .opt-desc {
          font-size: 0.78rem;
          color: var(--text-mid);
        }

        .results-card {
          min-height: auto;
        }

        .results-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.7rem;
          font-weight: 750;
          color: var(--text-dark);
          margin-bottom: 2.2rem;
          text-align: center;
        }

        .result-block {
          margin-bottom: 2rem;
        }

        .block-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          margin-bottom: 0.6rem;
        }

        .rec-type-badge {
          display: inline-block;
          background: var(--emerald-pale);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--emerald);
          font-weight: 800;
          font-size: 1.15rem;
          padding: 0.6rem 1.4rem;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.08);
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.2rem;
          margin-bottom: 2.5rem;
        }

        .rec-docs-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .rec-docs-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .rec-docs-list li .check-icon {
          color: var(--emerald-light);
          margin-top: 4px;
          flex-shrink: 0;
        }

        .rec-docs-list li span {
          font-size: 0.88rem;
          color: var(--text-mid);
          line-height: 1.5;
        }

        .advice-box {
          background: var(--gold-pale);
          border: 1px solid rgba(245, 158, 11, 0.15);
          border-radius: 10px;
          padding: 1.2rem;
          display: flex;
          gap: 12px;
        }

        .advice-box .info-icon {
          color: var(--gold-light);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .advice-box p {
          font-size: 0.85rem;
          color: var(--text-mid);
          line-height: 1.6;
        }

        .results-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid var(--navy-light);
          padding-top: 1.8rem;
          margin-top: 1.2rem;
          flex-wrap: wrap;
        }

        .reset-btn {
          background: none;
          color: var(--text-light);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .reset-btn:hover {
          color: var(--navy);
        }

        .submit-wa-btn {
          background: #25D366;
          color: #ffffff;
          font-weight: 750;
          font-size: 0.9rem;
          padding: 0.85rem 1.6rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25);
        }

        .submit-wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.45);
        }

        @media (max-width: 768px) {
          .result-grid {
            grid-template-columns: 1fr;
            gap: 1.8rem;
          }
          .quiz-intro-card {
            padding: 2.2rem 1.5rem;
          }
          .quiz-card {
            padding: 2.2rem 1.5rem;
          }
          .results-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 1.2rem;
          }
          .reset-btn {
            justify-content: center;
          }
          .submit-wa-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
