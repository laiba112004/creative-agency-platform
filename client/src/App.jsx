import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ThumbnailSlider from './components/ThumbnailSlider';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import QuoteCalculator from './components/QuoteCalculator';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import OrdersDashboard from './components/OrdersDashboard';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileStickyBar from './components/MobileStickyBar';

// Day 5 Features
import LoginModal from './components/LoginModal';
import BookingModal from './components/BookingModal';
import CookieBanner from './components/CookieBanner';
import LegalModal from './components/LegalModal';

// Day 6 Features
import BlogSection from './components/BlogSection';
import AiAssistant from './components/AiAssistant';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('youtube');
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('terms');

  const handleOpenBooking = (serviceKey = 'youtube') => {
    setBookingService(serviceKey);
    setIsBookingOpen(true);
  };

  const handleOpenLegal = (tabKey = 'terms') => {
    setLegalTab(tabKey);
    setIsLegalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white selection:bg-[#C9A24B] selection:text-[#0B1220]">
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="pb-16 lg:pb-0">
        <Hero onOpenBooking={handleOpenBooking} />
        <ServicesSection onOpenBooking={handleOpenBooking} />
        <ThumbnailSlider />
        <PortfolioSection />
        <ProcessSection />
        <QuoteCalculator />
        <PricingSection />
        <TestimonialsSection />
        <BlogSection />
        <FaqSection />
        <OrdersDashboard />
      </main>
      <Footer onOpenLegal={handleOpenLegal} />
      <AiAssistant onOpenBooking={handleOpenBooking} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={handleOpenBooking} />

      {/* Global Modals & Notice Banners */}
      <LoginModal />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={bookingService}
      />
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        activeTab={legalTab}
      />
      <CookieBanner />
    </div>
  );
}

export default App;
