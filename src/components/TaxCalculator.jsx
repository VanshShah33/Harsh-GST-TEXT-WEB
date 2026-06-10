// import React, { useState } from 'react';
// import { FaCalculator, FaPercent, FaMagic, FaInfoCircle } from 'react-icons/fa';

// export default function TaxCalculator() {
//   const [activeTab, setActiveTab] = useState('itr');
  
//   // ITR States
//   const [income, setIncome] = useState(800000);
//   const [deductions80C, setDeductions80C] = useState(150000);
//   const [deductions80D, setDeductions80D] = useState(25000);
//   const [otherDeductions, setOtherDeductions] = useState(0);

//   // GST States
//   const [gstAmount, setGstAmount] = useState(10000);
//   const [gstRate, setGstRate] = useState(18);
//   const [gstType, setGstType] = useState('add');

//   const calculateOldRegime = () => {
//     const grossIncome = Number(income);
//     const standardDeduction = 50000;
    
//     const c80C = Math.min(Number(deductions80C), 150000);
//     const d80D = Math.min(Number(deductions80D), 25000);
//     const otherD = Number(otherDeductions);
    
//     const totalDeductions = standardDeduction + c80C + d80D + otherD;
//     const netTaxableIncome = Math.max(0, grossIncome - totalDeductions);

//     let tax = 0;
    
//     if (netTaxableIncome <= 250000) {
//       tax = 0;
//     } else if (netTaxableIncome <= 500000) {
//       tax = (netTaxableIncome - 250000) * 0.05;
//     } else if (netTaxableIncome <= 1000000) {
//       tax = 12500 + (netTaxableIncome - 500000) * 0.20;
//     } else {
//       tax = 112500 + (netTaxableIncome - 1000000) * 0.30;
//     }

//     if (netTaxableIncome <= 500000) {
//       tax = 0;
//     }

//     const cess = tax * 0.04;
//     return {
//       taxable: netTaxableIncome,
//       baseTax: tax,
//       cess: cess,
//       totalTax: tax + cess
//     };
//   };

//   const calculateNewRegime = () => {
//     const grossIncome = Number(income);
//     const standardDeduction = 75000;
//     const netTaxableIncome = Math.max(0, grossIncome - standardDeduction);

//     let tax = 0;

//     if (netTaxableIncome <= 300000) {
//       tax = 0;
//     } else if (netTaxableIncome <= 700000) {
//       tax = (netTaxableIncome - 300000) * 0.05;
//     } else if (netTaxableIncome <= 1000000) {
//       tax = 20000 + (netTaxableIncome - 700000) * 0.10;
//     } else if (netTaxableIncome <= 1200000) {
//       tax = 50000 + (netTaxableIncome - 1000000) * 0.15;
//     } else if (netTaxableIncome <= 1500000) {
//       tax = 80000 + (netTaxableIncome - 1200000) * 0.20;
//     } else {
//       tax = 140000 + (netTaxableIncome - 1500000) * 0.30;
//     }

//     if (netTaxableIncome <= 700000) {
//       tax = 0;
//     }

//     const cess = tax * 0.04;
//     return {
//       taxable: netTaxableIncome,
//       baseTax: tax,
//       cess: cess,
//       totalTax: tax + cess
//     };
//   };

//   const oldResult = calculateOldRegime();
//   const newResult = calculateNewRegime();
//   const difference = Math.abs(oldResult.totalTax - newResult.totalTax);
//   const bestRegime = oldResult.totalTax < newResult.totalTax ? 'Old' : 'New';

//   const calculateGst = () => {
//     const amt = Number(gstAmount);
//     const rate = Number(gstRate);
    
//     let baseAmount = 0;
//     let gstVal = 0;
//     let totalVal = 0;

//     if (gstType === 'add') {
//       baseAmount = amt;
//       gstVal = (amt * rate) / 100;
//       totalVal = amt + gstVal;
//     } else {
//       totalVal = amt;
//       baseAmount = (amt * 100) / (100 + rate);
//       gstVal = amt - baseAmount;
//     }

//     return {
//       base: baseAmount,
//       gst: gstVal,
//       cgst: gstVal / 2,
//       sgst: gstVal / 2,
//       total: totalVal
//     };
//   };

//   const gstResult = calculateGst();

//   const formatCurrency = (val) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(val);
//   };

//   return (
//     <section id="calculator">
//       <div className="container">
//         <div className="text-center section-header reveal">
//           <div className="section-label">Interactive Tools</div>
//           <h2 className="section-title">Smart <span>Tax &amp; GST Tools</span></h2>
//           <p className="section-desc">
//             Estimate your filings or calculate tax amounts instantly to make informed financial plans.
//           </p>
//         </div>

//         {/* Tab Buttons */}
//         <div className="calc-tabs reveal delay-100">
//           <button 
//             className={`calc-tab-btn ${activeTab === 'itr' ? 'active' : ''}`}
//             onClick={() => setActiveTab('itr')}
//           >
//             <FaCalculator size={14} />
//             <span>Income Tax (Regime Comparison)</span>
//           </button>
//           <button 
//             className={`calc-tab-btn ${activeTab === 'gst' ? 'active' : ''}`}
//             onClick={() => setActiveTab('gst')}
//           >
//             <FaPercent size={14} />
//             <span>GST Calculator</span>
//           </button>
//         </div>

//         {/* Tab Content: Income Tax Calculator */}
//         {activeTab === 'itr' && (
//           <div className="calc-wrapper reveal-scale delay-200">
//             <div className="calc-grid">
              
//               {/* Inputs */}
//               <div className="calc-inputs">
//                 <h3 className="calc-panel-title">Enter Your Financial Details</h3>
                
//                 <div className="input-group">
//                   <label>Gross Annual Income (₹)</label>
//                   <input 
//                     type="number" 
//                     value={income} 
//                     onChange={(e) => setIncome(e.target.value)}
//                     placeholder="e.g. 800000"
//                   />
//                   <input 
//                     type="range" 
//                     min="100000" 
//                     max="5000000" 
//                     step="50000" 
//                     value={income}
//                     onChange={(e) => setIncome(e.target.value)}
//                   />
//                 </div>

//                 <div className="input-row">
//                   <div className="input-group">
//                     <label>Sec 80C Deductions (Max 1.5L) (₹)</label>
//                     <input 
//                       type="number" 
//                       value={deductions80C} 
//                       onChange={(e) => setDeductions80C(e.target.value)}
//                       placeholder="EPF, PPF, LIC, ELSS..."
//                     />
//                   </div>
//                   <div className="input-group">
//                     <label>Sec 80D Deductions (Max 25k) (₹)</label>
//                     <input 
//                       type="number" 
//                       value={deductions80D} 
//                       onChange={(e) => setDeductions80D(e.target.value)}
//                       placeholder="Health Insurance Premium..."
//                     />
//                   </div>
//                 </div>

//                 <div className="input-group">
//                   <label>Other Deductions (HRA, Interest, etc.) (₹)</label>
//                   <input 
//                     type="number" 
//                     value={otherDeductions} 
//                     onChange={(e) => setOtherDeductions(e.target.value)}
//                     placeholder="e.g. 50000"
//                   />
//                 </div>

//                 <div className="info-alert">
//                   <FaInfoCircle size={18} className="info-icon" />
//                   <span>Note: Deductions apply strictly under the <strong>Old Regime</strong>. The <strong>New Regime</strong> disables common deductions but grants higher exemptions and standard deductions.</span>
//                 </div>
//               </div>

//               {/* Output Analysis */}
//               <div className="calc-outputs-panel">
//                 <h3 className="calc-panel-title">Comparative Slab Analysis</h3>
                
//                 <div className="comparison-cards">
//                   {/* Old Regime Card */}
//                   <div className={`regime-card ${bestRegime === 'Old' ? 'recommended' : ''}`}>
//                     {bestRegime === 'Old' && <span className="recommendation-badge">Saves More</span>}
//                     <h4 className="regime-title">Old Tax Regime</h4>
//                     <div className="regime-value">{formatCurrency(oldResult.totalTax)}</div>
//                     <div className="regime-breakdown">
//                       <div><span>Taxable Income:</span> <strong>{formatCurrency(oldResult.taxable)}</strong></div>
//                       <div><span>Base Slab Tax:</span> <span>{formatCurrency(oldResult.baseTax)}</span></div>
//                       <div><span>Cess (4%):</span> <span>{formatCurrency(oldResult.cess)}</span></div>
//                     </div>
//                   </div>

//                   {/* New Regime Card */}
//                   <div className={`regime-card ${bestRegime === 'New' ? 'recommended' : ''}`}>
//                     {bestRegime === 'New' && <span className="recommendation-badge">Saves More</span>}
//                     <h4 className="regime-title">New Tax Regime (FY 2024-25)</h4>
//                     <div className="regime-value">{formatCurrency(newResult.totalTax)}</div>
//                     <div className="regime-breakdown">
//                       <div><span>Taxable Income:</span> <strong>{formatCurrency(newResult.taxable)}</strong></div>
//                       <div><span>Base Slab Tax:</span> <span>{formatCurrency(newResult.baseTax)}</span></div>
//                       <div><span>Cess (4%):</span> <span>{formatCurrency(newResult.cess)}</span></div>
//                     </div>
//                   </div>
//                 </div>

//                 {difference > 0 ? (
//                   <div className="savings-banner">
//                     <FaMagic className="spark-icon" />
//                     <span>
//                       You save <strong>{formatCurrency(difference)}</strong> by filing under the <strong>{bestRegime} Regime</strong>!
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="savings-banner neutral">
//                     <span>Both regimes yield the same tax liability for your profile.</span>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         )}

//         {/* Tab Content: GST Calculator */}
//         {activeTab === 'gst' && (
//           <div className="calc-wrapper reveal-scale delay-200">
//             <div className="calc-grid">
              
//               {/* Inputs */}
//               <div className="calc-inputs">
//                 <h3 className="calc-panel-title">Enter Transaction Value</h3>
                
//                 <div className="input-group">
//                   <label>Amount (₹)</label>
//                   <input 
//                     type="number" 
//                     value={gstAmount} 
//                     onChange={(e) => setGstAmount(e.target.value)}
//                     placeholder="e.g. 10000"
//                   />
//                 </div>

//                 <div className="input-group">
//                   <label>Select GST Tax Rate</label>
//                   <div className="gst-rates">
//                     {[5, 12, 18, 28].map((rate) => (
//                       <button 
//                         key={rate}
//                         className={`gst-rate-btn ${gstRate === rate ? 'active' : ''}`}
//                         onClick={() => setGstRate(rate)}
//                       >
//                         {rate}%
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="input-group">
//                   <label>Calculation Option</label>
//                   <div className="gst-types">
//                     <button 
//                       className={`gst-type-btn ${gstType === 'add' ? 'active' : ''}`}
//                       onClick={() => setGstType('add')}
//                     >
//                       Exclusive (Add GST)
//                     </button>
//                     <button 
//                       className={`gst-type-btn ${gstType === 'remove' ? 'active' : ''}`}
//                       onClick={() => setGstType('remove')}
//                     >
//                       Inclusive (Extract GST)
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Outputs */}
//               <div className="calc-outputs-panel gst-panel">
//                 <h3 className="calc-panel-title">GST Breakdown Result</h3>
                
//                 <div className="gst-results-list">
//                   <div className="gst-result-row">
//                     <span>Net Base Amount (Excluding GST):</span>
//                     <strong className="emerald-text">{formatCurrency(gstResult.base)}</strong>
//                   </div>
                  
//                   <div className="gst-result-row sub-row">
//                     <span>CGST (Central Tax - {gstRate/2}%):</span>
//                     <span>{formatCurrency(gstResult.cgst)}</span>
//                   </div>
                  
//                   <div className="gst-result-row sub-row">
//                     <span>SGST (State Tax - {gstRate/2}%):</span>
//                     <span>{formatCurrency(gstResult.sgst)}</span>
//                   </div>

//                   <div className="gst-result-row main-gst-row">
//                     <span>Total GST Tax Amount ({gstRate}%):</span>
//                     <strong>{formatCurrency(gstResult.gst)}</strong>
//                   </div>

//                   <div className="gst-result-row grand-row">
//                     <span>Gross Amount (Total Price):</span>
//                     <strong className="grand-price">{formatCurrency(gstResult.total)}</strong>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         #calculator {
//           background: var(--cream);
//           color: var(--text-mid);
//           padding: 6.5rem 0;
//           position: relative;
//         }

//         .calc-tabs {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           margin-bottom: 3rem;
//           flex-wrap: wrap;
//         }

//         .calc-tab-btn {
//           background: var(--white);
//           border: 1.5px solid rgba(15, 23, 42, 0.08);
//           color: var(--text-mid);
//           padding: 0.8rem 1.6rem;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-weight: 600;
//           font-size: 0.9rem;
//           transition: var(--transition);
//           box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
//         }

//         .calc-tab-btn.active, .calc-tab-btn:hover {
//           background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
//           color: var(--white);
//           border-color: var(--emerald);
//           box-shadow: var(--shadow-navy);
//         }

//         .calc-wrapper {
//           background: var(--white);
//           border: 1px solid rgba(15, 23, 42, 0.06);
//           border-radius: var(--radius);
//           overflow: hidden;
//           box-shadow: var(--shadow-navy);
//         }

//         .calc-grid {
//           display: grid;
//           grid-template-columns: 1.1fr 0.9fr;
//         }

//         .calc-inputs {
//           padding: 3rem;
//           border-right: 1px solid rgba(15, 23, 42, 0.06);
//         }

//         .calc-outputs-panel {
//           padding: 3rem;
//           background: var(--cream);
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }

//         .calc-panel-title {
//           font-family: 'Inter', sans-serif;
//           font-size: 1.35rem;
//           font-weight: 700;
//           color: var(--emerald);
//           margin-bottom: 1.8rem;
//           border-bottom: 1px solid rgba(15, 23, 42, 0.06);
//           padding-bottom: 0.75rem;
//         }

//         .input-group {
//           margin-bottom: 1.6rem;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .input-group label {
//           font-size: 0.85rem;
//           font-weight: 600;
//           color: var(--text-dark);
//           letter-spacing: 0.02em;
//         }

//         .input-group input[type="number"] {
//           background: var(--white);
//           border: 1px solid rgba(15, 23, 42, 0.12);
//           border-radius: var(--radius-sm);
//           padding: 0.8rem 1.2rem;
//           color: var(--text-dark);
//           font-size: 1rem;
//           font-family: inherit;
//           transition: var(--transition);
//         }

//         .input-group input[type="number"]:focus {
//           border-color: var(--emerald);
//           box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
//           background: var(--white);
//         }

//         .input-group input[type="range"] {
//           accent-color: var(--emerald);
//           margin-top: 4px;
//         }

//         .input-row {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1.5rem;
//         }

//         .info-alert {
//           background: var(--emerald-pale);
//           border: 1.5px solid rgba(16, 185, 129, 0.15);
//           border-radius: var(--radius-sm);
//           padding: 1rem;
//           display: flex;
//           gap: 10px;
//           font-size: 0.78rem;
//           color: var(--text-mid);
//           line-height: 1.5;
//         }

//         .info-icon {
//           color: var(--emerald);
//           flex-shrink: 0;
//           margin-top: 2px;
//         }

//         .info-alert strong {
//           color: var(--emerald);
//         }

//         .comparison-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 1.2rem;
//         }

//         .regime-card {
//           border: 1px solid rgba(15, 23, 42, 0.08);
//           background: var(--white);
//           border-radius: var(--radius-sm);
//           padding: 1.4rem;
//           position: relative;
//           transition: var(--transition);
//         }

//         .regime-card.recommended {
//           border-color: var(--emerald);
//           background: var(--emerald-pale);
//           box-shadow: var(--shadow-navy);
//         }

//         .recommendation-badge {
//           position: absolute;
//           top: 14px; right: 14px;
//           background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
//           color: var(--white);
//           font-size: 0.65rem;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: 0.06em;
//           padding: 3px 8px;
//           border-radius: 4px;
//         }

//         .regime-title {
//           font-size: 0.9rem;
//           color: var(--text-light);
//           margin-bottom: 0.4rem;
//         }

//         .regime-value {
//           font-size: 1.8rem;
//           font-weight: 850;
//           color: var(--text-dark);
//           margin-bottom: 0.8rem;
//           font-family: 'Inter', sans-serif;
//         }

//         .regime-card.recommended .regime-value {
//           color: var(--emerald);
//         }

//         .regime-breakdown {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//           font-size: 0.78rem;
//           color: var(--text-light);
//         }

//         .regime-breakdown div {
//           display: flex;
//           justify-content: space-between;
//         }

//         .savings-banner {
//           margin-top: 1.8rem;
//           background: linear-gradient(90deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.01));
//           border-left: 3px solid var(--emerald);
//           padding: 0.85rem 1.2rem;
//           border-radius: 0 8px 8px 0;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-size: 0.88rem;
//           color: var(--text-mid);
//         }

//         .savings-banner.neutral {
//           border-left-color: rgba(15, 23, 42, 0.2);
//           background: rgba(15, 23, 42, 0.03);
//         }

//         .savings-banner strong {
//           color: var(--emerald);
//         }

//         .spark-icon {
//           color: var(--emerald);
//           flex-shrink: 0;
//         }

//         /* GST Specific styles */
//         .gst-rates, .gst-types {
//           display: flex;
//           gap: 0.6rem;
//           width: 100%;
//         }

//         .gst-rate-btn, .gst-type-btn {
//           flex: 1;
//           background: var(--white);
//           border: 1px solid rgba(15, 23, 42, 0.08);
//           color: var(--text-mid);
//           padding: 0.75rem;
//           border-radius: var(--radius-sm);
//           font-weight: 600;
//           font-size: 0.88rem;
//           transition: var(--transition);
//         }

//         .gst-rate-btn.active, .gst-type-btn.active,
//         .gst-rate-btn:hover, .gst-type-btn:hover {
//           border-color: var(--emerald);
//           background: var(--emerald-pale);
//           color: var(--emerald);
//         }

//         .gst-results-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.9rem;
//         }

//         .gst-result-row {
//           display: flex;
//           justify-content: space-between;
//           font-size: 0.9rem;
//           color: var(--text-mid);
//           padding-bottom: 0.6rem;
//           border-bottom: 1px solid rgba(15, 23, 42, 0.04);
//         }

//         .gst-result-row.sub-row {
//           padding-left: 1rem;
//           font-size: 0.82rem;
//           color: var(--text-light);
//           border-bottom: none;
//         }

//         .gst-result-row.main-gst-row {
//           border-bottom: 1.5px solid rgba(15, 23, 42, 0.08);
//           padding-bottom: 0.8rem;
//           margin-bottom: 0.4rem;
//         }

//         .gst-result-row.main-gst-row strong {
//           color: var(--emerald);
//           font-size: 1.05rem;
//         }

//         .gst-result-row.grand-row {
//           border-bottom: none;
//           margin-top: 0.5rem;
//           align-items: center;
//         }

//         .gst-result-row.grand-row span {
//           font-size: 1rem;
//           font-weight: 600;
//           color: var(--text-dark);
//         }

//         .emerald-text {
//           color: var(--emerald);
//         }

//         .grand-price {
//           font-size: 1.8rem;
//           color: var(--emerald);
//           font-family: 'Inter', sans-serif;
//         }

//         .reveal-anim {
//           animation: fadeIn 0.5s ease both;
//         }

//         @media (max-width: 900px) {
//           .calc-grid {
//             grid-template-columns: 1fr;
//           }
//           .calc-inputs {
//             padding: 2.2rem;
//             border-right: none;
//             border-bottom: 1px solid rgba(15, 23, 42, 0.06);
//           }
//           .calc-outputs-panel {
//             padding: 2.2rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .input-row {
//             grid-template-columns: 1fr;
//           }
//           .gst-rates, .gst-types {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
