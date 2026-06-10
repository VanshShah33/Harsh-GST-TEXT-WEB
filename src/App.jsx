import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
// import TaxCalculator from './components/TaxCalculator';
import ComplianceQuiz from './components/ComplianceQuiz';
import DocumentChecklist from './components/DocumentChecklist';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import AnnouncementPopup from './components/AnnouncementPopup';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Returns');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px -50px -50px 0px', // Trigger slightly before full entry for smoother feel
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          self.unobserve(entry.target); // Animates once and stays active
        }
      });
    }, observerOptions);

    // Scan for reveal classes dynamically
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    // Handle dynamically added components or route switches if any
    const intervalId = setInterval(() => {
      const activeRevealElements = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)');
      activeRevealElements.forEach((el) => observer.observe(el));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const openModal = (service = 'General Returns') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectService = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="app-container">
      {/* Dynamic Announcement Banner Popup */}
      <AnnouncementPopup />

      {/* Navigation Header */}
      <Navbar openModal={() => openModal()} />

      {/* Page Sections */}
      <Hero openModal={() => openModal()} />
      <Services openModal={openModal} />
      {/* <TaxCalculator /> */}
      <ComplianceQuiz />
      <DocumentChecklist />
      <About />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />

      {/* Page Footer */}
      <Footer openModal={() => openModal()} />

      {/* Floating Action Button */}
      <FloatingWhatsApp />

      {/* Global Quote Dialog Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedService={selectedService}
        selectService={selectService}
      />
    </div>
  );
}
