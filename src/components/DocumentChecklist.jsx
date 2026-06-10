import React, { useState } from 'react';
import { FaUserCheck, FaFileAlt, FaPrint, FaCopy, FaCheck } from 'react-icons/fa';

export default function DocumentChecklist() {
  const [profile, setProfile] = useState('salaried');
  const [service, setService] = useState('itr');
  const [copied, setCopied] = useState(false);

  const profiles = [
    { id: 'salaried', label: 'Salaried Individual' },
    { id: 'self-employed', label: 'Self-Employed / Trader' },
    { id: 'company', label: 'Company / LLP' },
    { id: 'trust', label: 'NGO / Trust / Society' }
  ];

  const services = [
    { id: 'itr', label: 'ITR Filing' },
    { id: 'gst-reg', label: 'GST Registration' },
    { id: 'msme', label: 'MSME Udyam Registration' }
  ];

  const getDocuments = () => {
    if (service === 'itr') {
      const common = [
        'PAN Card (Permanent Account Number)',
        'Aadhaar Card (linked with PAN)',
        'Bank Account Statements (For all active bank accounts - last financial year)',
        'Form 26AS & AIS (Tax Credit Statements - we will pull this for you)',
        'Interest Certificates from bank(s) for Savings Accounts & Fixed Deposits',
      ];
      
      switch (profile) {
        case 'salaried':
          return [
            ...common,
            'Form 16 (issued by your employer)',
            'Salary slips (for allowance and tax structure verification)',
            'Tax Saving Investment Proofs (PPF, ELSS, LIC, NPS, Health Insurance under Sec 80C/80D)',
            'Home Loan Interest Certificate (for housing loan deduction under Sec 24)',
            'Rent Receipts & Landlord PAN details (for HRA exemption claims)',
            'Capital Gains Statement / Mutual Fund Statements (if shares or mutual funds were sold)'
          ];
        case 'self-employed':
          return [
            ...common,
            'Bank account statements of all business & savings accounts (April 1 to March 31)',
            'Gross receipts / Sales invoice summary / Cash books',
            'Expense bills, purchase invoices, and business ledger accounts',
            'Closing Stock Valuation Summary (as of March 31)',
            'TDS Certificates (Form 16A) issued by clients for tax credit reconciliation',
            'Purchase and sales register copy',
            'Capital Gains Statement / Mutual Fund Statements (if trading shares or mutual funds)',
            'GST Return filings summary (GSTR-1 & GSTR-3B) for the financial year'
          ];
        case 'company':
          return [
            ...common,
            'Company/LLP PAN Card',
            'Financial Statements (Balance Sheet, Profit & Loss Account, and Notes to Accounts)',
            'Audit Report (Form 3CA/3CB & 3CD for tax audit, if applicable to business size)',
            'Director/Partner PAN & Aadhaar details',
            'Bank account statements of all corporate accounts (April 1 to March 31)',
            'Digital Signature Certificate (DSC) of the Authorized Signatory / Director',
            'GST Return filings summary (GSTR-1 & GSTR-3B) for the financial year'
          ];
        case 'trust':
          return [
            ...common,
            'Trust/NGO PAN Card',
            'Registration Certificate (issued by Registrar of Trusts/Societies)',
            '12A & 80G Tax Exemption Certificates (issued by Income Tax department)',
            'FCRA Registration Details (for trusts receiving foreign contributions)',
            'Statement of Income & Expenditure and Balance Sheet',
            'Bank account statements of all trust accounts',
            'Trustee details (PAN, Aadhaar, and photos)',
            'List of donors with PAN, address, and donation amounts (for the financial year)'
          ];
        default:
          return common;
      }
    }

    if (service === 'gst-reg') {
      const commonDocs = [
        'PAN Card of the Applicant / Entity',
        'Aadhaar Card of the Applicant / Directors / Partners',
        'Proof of Principal Place of Business (Electricity Bill / Property Tax Receipt)',
        'Bank account proof (Cancelled Cheque / Bank Statement / Passbook front page)'
      ];

      switch (profile) {
        case 'salaried':
        case 'self-employed':
          return [
            ...commonDocs,
            'Passport size photograph of the Proprietor',
            'Rent Agreement & Property Owner Consent Letter (for rented or shared premises)',
            'Shop & Establishment / Trade License copy (business permit)'
          ];
        case 'company':
          return [
            ...commonDocs,
            'Certificate of Incorporation (issued by MCA)',
            'LLP Agreement (for LLPs) or Partnership Deed (for partnership firms)',
            'Board Resolution / Letter of Authorization appointing Authorised Signatory',
            'Passport size photograph of all Directors / Partners',
            'Rent Agreement & NOC / Consent Letter from landlord (for rented office)'
          ];
        case 'trust':
          return [
            ...commonDocs,
            'Trust Deed / Registration Certificate of Society',
            'List of Trustees / Governing Body members with PAN & Aadhaar',
            'Resolution passed by the trust authorizing the signatory',
            'Rent Agreement or Consent Letter (NOC) of the premises'
          ];
        default:
          return commonDocs;
      }
    }

    if (service === 'msme') {
      return [
        'Aadhaar Card of the Proprietor / Director / Partner (must be linked to mobile)',
        'PAN Card of the Business Entity (or Proprietor PAN for sole proprietor)',
        'Official Address proof of the business (Electricity Bill or Rent agreement)',
        'Bank Account Details (Account Number and IFSC Code)',
        'Date of starting business / Date of Incorporation',
        'List of main business activities / services provided',
        'Number of employees working in the business',
        'Investment in Plant & Machinery / Equipment details',
        'Turnover details (from previous year\'s GST / ITR)'
      ];
    }

    return [];
  };

  const handleProfileChange = (pId) => {
    setProfile(pId);
  };

  const handleServiceChange = (sId) => {
    setService(sId);
  };

  const checklistDocs = getDocuments();

  const handleCopy = () => {
    const listString = checklistDocs.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n');
    const header = `DOCUMENT CHECKLIST - Harsh Shah Tax & Financial Services\nProfile: ${profiles.find(p=>p.id===profile)?.label}\nService: ${services.find(s=>s.id===service)?.label}\n\n`;
    navigator.clipboard.writeText(header + listString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="checklist">
      <div className="container">
        <div className="text-center section-header reveal">
          <div className="section-label">Filing Assistant</div>
          <h2 className="section-title">Document <span>Checklist Assistant</span></h2>
          <p className="section-desc">
            Select your entity profile and target service to generate a personalized document checklist required for your filings.
          </p>
        </div>

        <div className="checklist-card reveal-scale delay-100">
          <div className="checklist-config">
            <div className="config-group">
              <h4>1. Select Your Entity Type</h4>
              <div className="profile-chips">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    className={`chip-btn ${profile === p.id ? 'active' : ''}`}
                    onClick={() => handleProfileChange(p.id)}
                  >
                    <FaUserCheck size={14} />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config-group">
              <h4>2. Select Filing Service</h4>
              <div className="service-chips">
                {services.map((s) => (
                  <button
                    key={s.id}
                    className={`chip-btn ${service === s.id ? 'active' : ''}`}
                    onClick={() => handleServiceChange(s.id)}
                  >
                    <FaFileAlt size={14} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="checklist-results" id="printableArea">
            <div className="print-brand-header" style={{ display: 'none' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Harsh Shah</h2>
              <p style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tax &amp; Financial Services</p>
              <p style={{ fontSize: '0.75rem', color: '#555555', margin: '4px 0 1rem 0' }}>Phone: +91 87359 01813 | Email: hs9240875@gmail.com</p>
              <div style={{ height: '1.5px', background: '#0F172A', marginBottom: '1.5rem' }}></div>
            </div>

            <div className="results-header">
              <div>
                <h3>Required Documents Checklist</h3>
                <p>
                  Documents needed for {profiles.find(p => p.id === profile)?.label} to file {services.find(s => s.id === service)?.label}.
                </p>
              </div>
              <div className="action-buttons">
                <button className="btn-action" onClick={handleCopy} title="Copy list to clipboard">
                  {copied ? <FaCheck size={12} color="var(--emerald)" /> : <FaCopy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button className="btn-action" onClick={handlePrint} title="Print checklist">
                  <FaPrint size={12} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="results-list">
              {checklistDocs.map((doc, idx) => (
                <div key={idx} className="checklist-item">
                  <span className="checklist-index">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="checklist-text">{doc}</div>
                </div>
              ))}
            </div>

            <div className="checklist-tip">
              <strong>Tip:</strong> You can upload scanned copies or photos of these documents securely via WhatsApp or by emailing them directly to us. Let's make filing hassle-free!
            </div>
            
            <div className="print-brand-footer" style={{ display: 'none', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#64748B', textAlign: 'center' }}>
              <p>Thank you for choosing Harsh Shah Tax &amp; Financial Services. Please compile these documents and share them via WhatsApp (+91 87359 01813) or Email (hs9240875@gmail.com).</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #checklist {
          background: var(--cream);
          position: relative;
        }

        .checklist-card {
          background: var(--white);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: var(--radius);
          box-shadow: var(--shadow-navy);
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          overflow: hidden;
        }

        .checklist-config {
          padding: 3rem;
          background: rgba(15, 23, 42, 0.01);
          border-right: 1px solid rgba(15, 23, 42, 0.08);
        }

        .config-group {
          margin-bottom: 2.2rem;
        }

        .config-group h4 {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .profile-chips, .service-chips {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .chip-btn {
          background: var(--white);
          border: 1.5px solid rgba(15, 23, 42, 0.08);
          color: var(--text-mid);
          padding: 0.8rem 1.2rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          font-size: 0.85rem;
          text-align: left;
          transition: var(--transition);
        }

        .chip-btn.active, .chip-btn:hover {
          border-color: var(--emerald);
          background: var(--emerald);
          color: var(--white);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }

        .checklist-results {
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          padding-bottom: 1.2rem;
          margin-bottom: 1.8rem;
          gap: 1.5rem;
        }

        .results-header h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.3rem;
          letter-spacing: -0.015em;
        }

        .results-header p {
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .action-buttons {
          display: flex;
          gap: 0.6rem;
        }

        .btn-action {
          background: var(--cream);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: var(--navy);
          padding: 0.5rem 0.95rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 0.8rem;
          transition: var(--transition);
        }

        .btn-action:hover {
          background: var(--emerald);
          color: var(--white);
          border-color: var(--emerald);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.12);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          flex-grow: 1;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 0.3rem 0;
          transition: var(--transition);
        }

        .checklist-index {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--emerald);
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .checklist-text {
          font-size: 0.88rem;
          color: var(--text-mid);
          line-height: 1.6;
        }

        .checklist-tip {
          margin-top: 2rem;
          background: var(--emerald-pale);
          border-left: 3px solid var(--emerald);
          padding: 1rem 1.4rem;
          border-radius: 0 6px 6px 0;
          font-size: 0.8rem;
          color: var(--text-mid);
          line-height: 1.6;
          border-right: 1px solid rgba(16, 185, 129, 0.08);
          border-top: 1px solid rgba(16, 185, 129, 0.05);
          border-bottom: 1px solid rgba(16, 185, 129, 0.05);
        }

        @media (max-width: 900px) {
          .checklist-card {
            grid-template-columns: 1fr;
          }
          .checklist-config {
            padding: 2.2rem;
            border-right: none;
            border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          }
          .profile-chips, .service-chips {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .chip-btn {
            flex: 1 1 calc(50% - 0.5rem);
            min-width: 160px;
          }
          .checklist-results {
            padding: 2.2rem;
          }
        }

        @media (max-width: 600px) {
          .profile-chips, .service-chips {
            flex-direction: column;
          }
          .chip-btn {
            width: 100%;
          }
          .results-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .action-buttons {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .checklist-config {
            padding: 1.5rem 1rem !important;
          }
          .checklist-results {
            padding: 1.5rem 1rem !important;
          }
        }

        @media print {
          #navbar, #hero, #services, #quiz-onboarding, #about, #gallery, #testimonials, #faq, #contact, footer, .float-wa, .announcement-banner, .checklist-config {
            display: none !important;
          }
          body, html {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            color: #000000 !important;
          }
          #checklist {
            padding: 0 !important;
            background: #ffffff !important;
          }
          .checklist-card {
            display: block !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            grid-template-columns: 1fr !important;
          }
          .checklist-results {
            padding: 0 !important;
            width: 100% !important;
          }
          .print-brand-header { display: block !important; }
          .print-brand-footer { display: block !important; }
          .action-buttons { display: none !important; }
          .checklist-index {
            border: 1px solid #10b981 !important;
            background: #ecfdf5 !important;
            color: #047857 !important;
          }
          .checklist-item {
            page-break-inside: avoid;
            background: none !important;
          }
          .checklist-tip {
            background: #f0fdf4 !important;
            border-left: 3px solid #10b981 !important;
            border-top: 1px solid #d1fae5 !important;
            border-bottom: 1px solid #d1fae5 !important;
            border-right: 1px solid #d1fae5 !important;
            color: #1e293b !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </section>
  );
}
