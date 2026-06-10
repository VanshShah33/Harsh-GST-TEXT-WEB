import React from 'react';

export default function Gallery() {
  const galleryItems = [
    {
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      title: 'Income Tax Return (ITR)',
      desc: 'Accurate filing for salaried profiles, capital gains, & business income.'
    },
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      title: 'GST Registration',
      desc: 'Get your GSTIN quickly with complete business verification.'
    },
    {
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
      title: 'GST Monthly Returns',
      desc: 'Filing GSTR-1, GSTR-3B, & GSTR-2B Input Tax Credit reconciliation.'
    },
    {
      url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
      title: 'Tax Savings & Advisory',
      desc: 'Expert planning to optimize your deductions under current tax laws.'
    },
    {
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      title: 'TDS Returns & Filings',
      desc: 'Quarterly salary and non-salary TDS filings and certificate issues.'
    },
    {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      title: 'MSME & Business Setup',
      desc: 'Udyam certifications and business registration guidance.'
    }
  ];

  // Triplicate the array for seamless infinite looping
  const loopItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <section id="gallery" style={{ background: 'var(--cream)', padding: '5rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="text-center section-header reveal">
          <div className="section-label">Compliance Gallery</div>
          <h2 className="section-title">Services &amp; <span>Solutions</span></h2>
        </div>

        <div className="marquee-container reveal-scale delay-150">
          <div className="marquee-track">
            {loopItems.map((item, index) => (
              <div key={index} className="marquee-item">
                <div className="marquee-img-wrap">
                  <img src={item.url} alt={item.title} loading="lazy" />
                </div>
                <div className="marquee-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #gallery .section-header {
          margin-bottom: 3.5rem;
        }

        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scrollMarquee 38s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          flex: 0 0 320px;
          width: 320px;
          height: 290px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--navy-light);
          box-shadow: var(--shadow-navy);
          background: var(--white);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }

        .marquee-img-wrap {
          width: 100%;
          height: 180px;
          overflow: hidden;
          position: relative;
        }

        .marquee-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .marquee-info {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          background: var(--white);
          flex-grow: 1;
        }

        .marquee-info h4 {
          font-size: 0.95rem;
          font-weight: 750;
          color: var(--text-dark);
        }

        .marquee-info p {
          font-size: 0.75rem;
          color: var(--text-light);
          line-height: 1.4;
        }

        .marquee-item:hover {
          transform: translateY(-5px);
          border-color: var(--emerald);
        }

        .marquee-item:hover .marquee-img-wrap img {
          transform: scale(1.06);
        }

        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll by the width of one set of images (6 items * 320px + 6 * 20px gap = 2040px) */
            transform: translateX(-2040px);
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            flex: 0 0 260px;
            width: 260px;
            height: 250px;
          }
          .marquee-img-wrap {
            height: 150px;
          }
          @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-1680px); } /* 6 * 260px + 6 * 20px */
          }
        }
      `}</style>
    </section>
  );
}
