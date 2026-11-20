import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const ThumbnailSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(768);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            High-CTR Optimisation
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Before vs After Thumbnail Redesign
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Drag the interactive slider to see how high-contrast typography, bold visual hierarchy, and precise framing double click-through rates.
          </p>
        </div>

        {/* Interactive Comparison Box */}
        <div className="relative max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700 shadow-2xl bg-[#161F30]">
          <div
            ref={containerRef}
            className="relative w-full aspect-video select-none cursor-ew-resize overflow-hidden touch-none"
            onMouseMove={(e) => handleSliderMove(e.clientX)}
            onTouchMove={(e) => {
              if (e.touches && e.touches[0]) {
                handleSliderMove(e.touches[0].clientX);
              }
            }}
          >
            {/* After (Optimised) - Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-gray-900 to-[#161F30] flex flex-col items-center justify-center p-4 sm:p-8 text-center">
              <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#C9A24B] text-[#0B1220] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md">
                AFTER (Optimised)
              </span>
              <div className="space-y-1.5 sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[#C9A24B] text-xs sm:text-sm font-semibold bg-[#0B1220]/80 px-2.5 sm:px-3 py-1 rounded-lg border border-[#C9A24B]/40">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% CTR
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                  10X YOUR VIEWS FAST!
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-medium">Clear focal point • Bold contrast • 4K render</p>
              </div>
            </div>

            {/* Before (Original) - Clipped Overlay */}
            <div
              className="absolute inset-0 bg-[#0B1220] border-r-2 border-[#C9A24B] overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-center"
                style={{ width: `${containerWidth}px`, height: '100%' }}
              >
                <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gray-800 text-gray-400 text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full">
                  BEFORE (Standard)
                </span>
                <div className="space-y-1.5 sm:space-y-3 opacity-60">
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">Standard 3.1% CTR</span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-normal text-gray-400">
                    My Video Title Here
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">Cluttered text • Low contrast • Flat lighting</p>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C9A24B] cursor-ew-resize pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C9A24B] text-[#0B1220] flex items-center justify-center font-bold text-xs shadow-lg">
                ⇄
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThumbnailSlider;