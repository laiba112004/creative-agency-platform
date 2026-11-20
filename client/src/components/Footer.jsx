import React from 'react';
import { Sparkles, ArrowUp, CheckCircle2 } from 'lucide-react';

const Footer = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  return (
    <footer className="bg-[#080D17] border-t border-gray-800 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[#161F30] border border-[#C9A24B]/40 flex items-center justify-center p-2 shadow-lg shadow-[#C9A24B]/15 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path
                    d="M28 8.5C25.5 6.5 22 5.5 18 5.5C10 5.5 4.5 11.5 4.5 20C4.5 28.5 10 34.5 18 34.5C22 34.5 25.5 33.5 28 31.5L25 26.5C23.2 28 20.8 28.8 18 28.8C13 28.8 9.5 25 9.5 20C9.5 15 13 11.2 18 11.2C20.8 11.2 23.2 12 25 13.5L28 8.5Z"
                    fill="url(#footerGoldGrad)"
                  />
                  <path d="M17 14L28 20L17 26V14Z" fill="url(#footerInnerGold)" />
                  <circle cx="31" cy="9" r="2" fill="#FFF2C2" />
                  <defs>
                    <linearGradient id="footerGoldGrad" x1="4.5" y1="5.5" x2="28" y2="34.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDE68A" />
                      <stop offset="0.45" stopColor="#C9A24B" />
                      <stop offset="1" stopColor="#87651C" />
                    </linearGradient>
                    <linearGradient id="footerInnerGold" x1="17" y1="14" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFF7D6" />
                      <stop offset="0.5" stopColor="#E0B85C" />
                      <stop offset="1" stopColor="#A47B22" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                CREATIVE<span className="text-[#C9A24B]">STUDIO</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Premium creative agency engineering high-retention video edits, click-driven thumbnails, personal brand kits, and modern web applications for ambitious creators.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C9A24B] font-medium pt-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full commercial IP ownership transferred upon project delivery.</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs sm:text-sm">Services</h4>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">YouTube Complete Edit</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">High-CTR Thumbnails</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Personal Branding</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Web Development</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Content Retainers</button></li>
            </ul>
          </div>

          {/* Tools & Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs sm:text-sm">Platform</h4>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('quote-calculator')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Instant Quote Tool</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Showcase Portfolio</button></li>
              <li><button onClick={() => scrollToSection('process')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">4-Step Production</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Pricing & Packages</button></li>
              <li><button onClick={() => scrollToSection('orders-dashboard')} className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm">Client Portal Tracker</button></li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs sm:text-sm">Governance & Trust</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onOpenLegal ? onOpenLegal('refund') : scrollToSection('faq')}
                  className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm"
                >
                  Revision & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal ? onOpenLegal('terms') : scrollToSection('faq')}
                  className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal ? onOpenLegal('privacy') : scrollToSection('faq')}
                  className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm"
                >
                  Privacy & Data Security (NDA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal ? onOpenLegal('ip') : scrollToSection('faq')}
                  className="text-gray-300 hover:text-[#C9A24B] transition-colors text-sm"
                >
                  Commercial IP & Copyright
                </button>
              </li>
              <li className="pt-2 text-[#C9A24B] text-xs font-semibold">Strict NDA & Confidentiality Guaranteed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} CreativeStudio Platform. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#C9A24B] text-xs sm:text-sm font-semibold transition-colors"
          >
            Back to Top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
