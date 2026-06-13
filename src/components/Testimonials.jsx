import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaPen, FaCheckCircle } from 'react-icons/fa';

const SEED_REVIEWS = [
  {
    name: 'Nihir Surti',
    role: 'E-Commerce Vendor, Ahmedabad',
    service: 'GST Registration',
    quote: 'Harsh made my GST registration seamless and stress-free. His practical approach and attention to detail ensured everything was filed correctly.',
    rating: 5
  },
  {
    name: 'Bharat Kumavat',
    role: 'Salaried Individual, Ahmedabad',
    service: 'GST Registration & Income Tax Returns',
    quote: 'Highly recommend Harsh for ITR filing. He provided precise guidance and made the entire process clear and simple.',
    rating: 5
  },
  {
    name: 'Dev Gupta',
    role: 'Business Owner, Jaipur',
    service: 'TDS Returns',
    quote: 'Harsh is diligent and technically sound. He ensures our TDS compliance is always accurate and on time.',
    rating: 5
  },
  {
    name: 'Het Panchal',
    role: 'Salaried Individual, Mahesana',
    service: 'MSME Registration',
    quote: 'Efficient and transparent service. My MSME registration was completed quickly without any hassle.',
    rating: 5
  }
];

const LOCAL_STORAGE_KEY = 'harshshah_reviews_v1';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const trackRef = useRef(null);

  // Review Form States
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [service, setService] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const userReviews = stored ? JSON.parse(stored) : [];
      setReviews([...userReviews, ...SEED_REVIEWS]);
    } catch {
      setReviews(SEED_REVIEWS);
    }

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 650) setVisibleCards(1);
      else if (w < 1000) setVisibleCards(2);
      else setVisibleCards(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (reviews.length <= visibleCards) return;
    const timer = setInterval(() => {
      const maxIndex = reviews.length - visibleCards;
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [reviews.length, visibleCards]);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, reviews.length - visibleCards);
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!quote.trim() || quote.trim().length < 10) {
      alert('Please write a review (minimum 10 characters).');
      return;
    }

    const newReview = {
      name,
      role: role || 'Client',
      service,
      quote,
      rating,
      date: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const userReviews = stored ? JSON.parse(stored) : [];
      const updatedUserReviews = [newReview, ...userReviews];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserReviews));
      setReviews([newReview, ...reviews]);
    } catch (e) {
      setReviews([newReview, ...reviews]);
    }

    setName('');
    setRole('');
    setService('');
    setQuote('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const getInitials = (str) => {
    return str
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';
  };

  const getCardWidthPct = () => {
    if (visibleCards === 1) return 100;
    if (visibleCards === 2) return 50;
    return 33.333;
  };

  return (
    <section id="testimonials">
      <div className="container">
        <div className="text-center section-header reveal">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">What Our <span>Clients Say</span></h2>
          <p className="section-desc">
            Read real feedback from business owners and individuals who depend on Harsh Shah for regulatory filings.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="carousel-wrapper reveal-scale delay-100">
          <div 
            className="carousel-track" 
            ref={trackRef}
            style={{ 
              transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`
            }}
          >
            {reviews.map((r, index) => (
              <div 
                key={index} 
                className="testimonial-card"
                style={{ 
                  flex: `0 0 calc(${getCardWidthPct()}% - 1.2rem)`,
                  marginRight: '1.2rem'
                }}
              >
                <div className="t-stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      size={14} 
                      color={i < r.rating ? 'var(--gold)' : 'rgba(15, 23, 42, 0.12)'} 
                    />
                  ))}
                </div>
                <p className="t-quote">"{r.quote}"</p>
                
                <div className="t-author">
                  <div className="t-avatar">{getInitials(r.name)}</div>
                  <div>
                    <div className="t-name">{r.name}</div>
                    <div className="t-role">
                      {r.role} {r.service && `• ${r.service}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Buttons */}
        {reviews.length > visibleCards && (
          <div className="carousel-controls">
            <button 
              className="carousel-control-btn" 
              onClick={handlePrev} 
              disabled={carouselIndex === 0}
              aria-label="Previous Testimonial"
            >
              <FaChevronLeft size={14} />
            </button>
            <button 
              className="carousel-control-btn" 
              onClick={handleNext}
              disabled={carouselIndex >= reviews.length - visibleCards}
              aria-label="Next Testimonial"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Interactive Review Form */}
        <div className="review-form-wrapper reveal-scale delay-150">
          <div className="form-title-wrapper">
            <FaPen size={20} color="var(--emerald)" style={{ marginBottom: '8px' }} />
            <h3>Share Your Experience</h3>
            <p>Your reviews help others find reliable compliance partners. Submit your rating below.</p>
          </div>

          {submitted && (
            <div className="review-success-banner">
              <FaCheckCircle size={18} />
              <span>Thank you! Your testimonial has been submitted successfully and added to our wall.</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Nihir Surti" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Business Designation / Role</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  placeholder="e.g. Startup Founder, Freelancer" 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Service Opted</label>
                <input 
                  type="text" 
                  value={service} 
                  onChange={(e) => setService(e.target.value)} 
                  placeholder="e.g. GST Filing, MSME registration" 
                />
              </div>
              <div className="form-group">
                <label>Overall Rating *</label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-selector-btn"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FaStar 
                        size={22}
                        color={star <= (hoverRating || rating) ? 'var(--gold)' : 'rgba(15, 23, 42, 0.18)'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Your Review Message * (Min 10 characters)</label>
              <textarea 
                value={quote} 
                onChange={(e) => setQuote(e.target.value)} 
                rows="3" 
                placeholder="Share your experience working with Harsh. How did he assist you with your tax or compliance files?"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">
              Submit Testimonial
            </button>
          </form>
        </div>

      </div>

      <style>{`
        #testimonials {
          background: var(--cream);
          color: var(--text-mid);
          padding: 6.5rem 0;
          overflow: hidden;
        }

        #testimonials .section-header {
          margin-bottom: 3.5rem;
        }

        .carousel-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .testimonial-card {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 2.2rem;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-navy);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: auto;
          min-height: 250px;
        }

        .t-stars {
          margin-bottom: 1.2rem;
          display: flex;
          gap: 5px;
        }

        .t-quote {
          font-size: 0.95rem;
          color: var(--text-mid);
          line-height: 1.75;
          margin-bottom: 1.8rem;
          font-style: italic;
        }

        .t-author {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid var(--glass-border);
          padding-top: 1.1rem;
        }

        .t-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
          color: var(--white);
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .t-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .t-role {
          font-size: 0.72rem;
          color: var(--emerald);
          margin-top: 1px;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 2.5rem;
          margin-bottom: 4.5rem;
        }

        .carousel-control-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--glass-border);
          color: var(--emerald);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .carousel-control-btn:hover:not(:disabled) {
          background: var(--emerald);
          color: var(--white);
          box-shadow: var(--shadow-navy);
        }

        .carousel-control-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Review Form Styling */
        .review-form-wrapper {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: var(--shadow-navy);
          backdrop-filter: blur(10px);
        }

        .form-title-wrapper {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title-wrapper h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.45rem;
          color: var(--text-dark);
          margin-top: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .form-title-wrapper p {
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .review-success-banner {
          background: rgba(37, 211, 102, 0.1);
          border: 1px solid #25D366;
          color: #25D366;
          border-radius: var(--radius-sm);
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          margin-bottom: 1.8rem;
          animation: fadeIn 0.4s ease both;
        }

        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-mid);
        }

        .review-form input[type="text"], .review-form textarea {
          background: var(--cream);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.8rem 1.1rem;
          color: var(--text-dark);
          font-size: 0.9rem;
          font-family: inherit;
          transition: var(--transition);
        }

        .review-form input[type="text"]:focus, .review-form textarea:focus {
          border-color: var(--navy);
          background: var(--white);
          color: var(--text-dark);
        }

        .star-rating-selector {
          display: flex;
          align-items: center;
          gap: 5px;
          height: 44px;
        }

        .star-selector-btn {
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .review-form button[type="submit"] {
          align-self: center;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .review-form-wrapper {
            padding: 2.2rem 1.6rem;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}
