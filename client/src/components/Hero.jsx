import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Play, X, Sparkles } from 'lucide-react';

const Hero = () => {
  const [showreelOpen, setShowreelOpen] = useState(false);

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
    <section className="relative overflow-hidden pt-20 pb-28 px-6">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A24B]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
          Premium Creative Agency
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
          Cinematic Edits, High-CTR Brands,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] via-yellow-200 to-[#C9A24B]">
            Engineered to Convert.
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-xl font-normal leading-relaxed px-2">
          We help elite creators and modern brands scale with high-retention video editing, thumbnail design, web development, and content pipelines.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button
            onClick={() => scrollToSection('services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-xl shadow-[#C9A24B]/25 hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
          </button>
          <button
            onClick={() => setShowreelOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#C9A24B] bg-[#161F30]/80 hover:bg-[#161F30] text-white font-medium px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all backdrop-blur-sm group text-sm sm:text-base"
          >
            <span className="w-7 h-7 rounded-full bg-[#C9A24B]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]" strokeWidth={1.5} />
            </span>
            Watch Showreel
          </button>
        </div>

        {/* Social Proof Stats Bar */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-7 rounded-3xl bg-[#161F30]/40 backdrop-blur-md border border-gray-800/80 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left divide-y-0 md:divide-x divide-gray-800/60">
          <div className="pt-2 md:pt-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#C9A24B]">50M+</p>
            <p className="text-xs sm:text-[13px] text-gray-300 mt-1 uppercase tracking-wider font-semibold">Views Generated</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#C9A24B]">12.8%</p>
            <p className="text-xs sm:text-[13px] text-gray-300 mt-1 uppercase tracking-wider font-semibold">Avg. CTR on Thumbnails</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#C9A24B]">48 hrs</p>
            <p className="text-xs sm:text-[13px] text-gray-300 mt-1 uppercase tracking-wider font-semibold">Fast Turnaround</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#C9A24B]">100%</p>
            <p className="text-xs sm:text-[13px] text-gray-300 mt-1 uppercase tracking-wider font-semibold">Satisfaction Guarantee</p>
          </div>
        </div>
      </div>

      {/* Video Showreel Lightbox Modal */}
      {showreelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#161F30] border border-[#C9A24B]/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0B1220]/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">Agency Cinematic Showreel (2026)</span>
              </div>
              <button
                onClick={() => setShowreelOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0"
                title="Agency Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#0B1220] flex items-center justify-between text-xs text-gray-400 border-t border-gray-800">
              <span>Featuring YouTube editing, motion graphics, and sound design pass</span>
              <button
                onClick={() => {
                  setShowreelOpen(false);
                  scrollToSection('pricing');
                }}
                className="text-[#C9A24B] hover:text-[#E0B85C] font-semibold flex items-center gap-1 transition-colors"
              >
                Book This Edit Style <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;