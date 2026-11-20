import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  // Pre-filled WhatsApp message for fast conversions as requested in PDF Section 06
  const phoneNumber = '+923001234567'; // Placeholder that client can update
  const defaultMessage = encodeURIComponent(
    'Hi CreativeStudio, I am interested in discussing a video editing / creative project for my channel.'
  );

  return (
    <aside aria-label="Quick contact" className="hidden lg:block fixed bottom-6 right-6 z-40 group">
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold text-xs tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;

