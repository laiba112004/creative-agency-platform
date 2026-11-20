import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Services', target: 'services' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Process', target: 'process' },
  { label: 'Quote Tool', target: 'quote-calculator' },
  { label: 'Packages', target: 'pricing' },
  { label: 'Case Studies', target: 'blog' },
  { label: 'Reviews', target: 'testimonials' }
];

const Navbar = ({ onOpenBooking }) => {
  const { user, openLoginModal, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (e, sectionId) => {
    if (e) e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#0B1220]/95 backdrop-blur-xl border-b border-[#C9A24B]/20 shadow-2xl shadow-black/70'
          : 'bg-[#0B1220]/85 backdrop-blur-md border-b border-gray-800/80'
      }`}
    >
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Brand Monogram & Logo */}
        <div
          onClick={scrollToTop}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          title="Return to top"
        >
          {/* Custom Agency Monogram Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#161F30] border border-[#C9A24B]/40 flex items-center justify-center p-2 shadow-lg shadow-[#C9A24B]/15 group-hover:border-[#C9A24B] group-hover:scale-105 transition-all">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <path
                d="M28 8.5C25.5 6.5 22 5.5 18 5.5C10 5.5 4.5 11.5 4.5 20C4.5 28.5 10 34.5 18 34.5C22 34.5 25.5 33.5 28 31.5L25 26.5C23.2 28 20.8 28.8 18 28.8C13 28.8 9.5 25 9.5 20C9.5 15 13 11.2 18 11.2C20.8 11.2 23.2 12 25 13.5L28 8.5Z"
                fill="url(#cMonogramGold)"
              />
              <path d="M17 14L28 20L17 26V14Z" fill="url(#innerPlayGold)" />
              <circle cx="31" cy="9" r="2" fill="#FFF2C2" />
              <defs>
                <linearGradient id="cMonogramGold" x1="4.5" y1="5.5" x2="28" y2="34.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.45" stopColor="#C9A24B" />
                  <stop offset="1" stopColor="#87651C" />
                </linearGradient>
                <linearGradient id="innerPlayGold" x1="17" y1="14" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFF7D6" />
                  <stop offset="0.5" stopColor="#E0B85C" />
                  <stop offset="1" stopColor="#A47B22" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Logo Typography */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white leading-none">
              CREATIVE<span className="text-[#C9A24B]">STUDIO</span>
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-gray-300 font-bold mt-1">
              Premium Media & Tech
            </span>
          </div>
        </div>

        {/* Spacious, Highly Legible Navigation Links with Balanced Gaps */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-7 text-[15px] xl:text-[16px] font-semibold">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={(e) => scrollToSection(e, item.target)}
              className="relative text-gray-100 hover:text-[#C9A24B] transition-colors py-1.5 whitespace-nowrap hover:-translate-y-0.5 transform duration-150 tracking-normal group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A24B] transition-all duration-200 group-hover:w-full rounded-full" />
            </button>
          ))}
        </nav>

        {/* Clean Action Buttons (Portal, Auth & Order) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 bg-[#161F30] border border-[#C9A24B]/40 hover:border-[#C9A24B] rounded-full py-1.5 px-3.5 shadow-sm transition-all">
              <button
                onClick={(e) => scrollToSection(e, 'orders-dashboard')}
                className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#C9A24B] transition-colors"
                title="Go to Live Workspace"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="max-w-[85px] truncate">{user.name}</span>
                <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider font-semibold border-l border-gray-700 pl-2">
                  Portal
                </span>
              </button>
              <button
                type="button"
                onClick={logout}
                title="Sign Out of Portal"
                className="text-gray-400 hover:text-rose-400 transition-colors p-0.5 ml-0.5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#C9A24B] px-3 py-2 transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={(e) => scrollToSection(e, 'orders-dashboard')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C9A24B] hover:text-white px-3.5 py-2 rounded-full border border-[#C9A24B]/40 hover:border-[#C9A24B] bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 transition-all whitespace-nowrap shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Client Portal
              </button>
            </>
          )}

          <button
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="flex items-center gap-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-[#C9A24B]/25 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Order Package
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#161F30] border border-gray-700 text-gray-200 hover:text-[#C9A24B] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1220]/98 border-b border-[#C9A24B]/30 px-5 sm:px-6 py-5 sm:py-6 space-y-4 backdrop-blur-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={(e) => scrollToSection(e, item.target)}
                className="text-left text-lg font-bold text-gray-200 hover:text-[#C9A24B] py-2 border-b border-gray-800/60 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161F30] border border-[#C9A24B]/30">
                <span className="text-xs text-white font-bold">{user.name} ({user.role})</span>
                <button onClick={logout} className="text-xs text-rose-400 font-bold">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-3 rounded-xl border border-gray-700 text-gray-200 font-bold text-sm"
              >
                Sign In to Workspace
              </button>
            )}

            <button
              onClick={(e) => scrollToSection(e, 'orders-dashboard')}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-[#C9A24B] py-3 rounded-xl border border-[#C9A24B]/40 bg-[#C9A24B]/10"
            >
              <Sparkles className="w-4 h-4" />
              Client Portal Tracker
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking('youtube');
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white py-3 rounded-xl border border-gray-700 bg-gray-800/80"
            >
              Book 1:1 Strategy Call
            </button>
            <button
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20"
            >
              Order Package
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
