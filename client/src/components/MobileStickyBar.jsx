import React from 'react';
import { Layers, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const MobileStickyBar = ({ onOpenBooking }) => {
  const phoneNumber = '+923001234567';
  const defaultMessage = encodeURIComponent(
    'Hi CreativeStudio, I am interested in discussing a video editing / creative project for my channel.'
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Mobile Navigation and Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1220]/95 backdrop-blur-2xl border-t border-[#C9A24B]/30 px-3 py-2 shadow-2xl safe-bottom"
    >
      <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
        {/* Services Tab */}
        <button
          onClick={() => scrollTo('services')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-300 hover:text-[#C9A24B] active:bg-white/5 transition-colors min-h-[44px]"
        >
          <Layers className="w-4 h-4 mb-0.5 text-[#C9A24B]" />
          <span className="text-[10px] font-bold tracking-tight">Services</span>
        </button>

        {/* Client Portal Tab */}
        <button
          onClick={() => scrollTo('orders-dashboard')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-300 hover:text-[#C9A24B] active:bg-white/5 transition-colors min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-[#C9A24B]" />
          <span className="text-[10px] font-bold tracking-tight">Portal</span>
        </button>

        {/* WhatsApp Quick Chat */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with CreativeStudio on WhatsApp"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 active:bg-white/5 transition-colors min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Order Now Gold Pill Action */}
        <button
          onClick={() => scrollTo('pricing')}
          className="flex items-center gap-1.5 bg-[#C9A24B] hover:bg-[#E0B85C] active:scale-95 text-[#0B1220] font-black text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-full shadow-lg shadow-[#C9A24B]/25 transition-all min-h-[44px]"
        >
          <span>Order</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};

export default MobileStickyBar;
