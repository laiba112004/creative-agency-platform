import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem('creative_agency_cookie_consent');
    if (!consent) {
      // Small delay for clean entrance after first paint
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('creative_agency_cookie_consent', 'all');
    setIsVisible(false);
    showToast('Preferences saved. High-speed caching & portal storage enabled.', 'info', 'Cookie Policy');
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('creative_agency_cookie_consent', 'essential');
    setIsVisible(false);
    showToast('Only essential workspace cookies active.', 'info', 'Cookie Policy');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-5 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-[9990] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#161F30]/95 backdrop-blur-xl border border-[#C9A24B]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl shadow-black/80 text-white">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0B1220] border border-[#C9A24B]/30 flex items-center justify-center shrink-0 text-[#C9A24B]">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Privacy & Performance Notice
            </h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              We use encrypted session storage to keep your video timecode reviews, 50GB vault transfers, and quote estimates intact. No third-party data selling.
            </p>

            <div className="flex items-center gap-2.5 mt-4">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#C9A24B]/15"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-3.5 py-2 bg-[#0B1220] hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 text-xs font-semibold rounded-xl transition-all"
              >
                Essential Only
              </button>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-gray-400 hover:text-white p-1 -mr-1 -mt-1 rounded-lg"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
