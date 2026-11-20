import React, { useState } from 'react';
import { Play, ExternalLink, Sparkles, TrendingUp, X, Eye } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'The AI Economy Breakdown',
    category: 'youtube',
    categoryLabel: 'YouTube Edit',
    niche: 'Finance & Tech',
    stat: '+1.8M Views',
    subStat: '14.8% CTR',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Dynamic pacing, custom 2D motion graphics, 3D title tracking, and full sound design pass.'
  },
  {
    id: 2,
    title: '100-Hour Extreme Survival Challenge',
    category: 'youtube',
    categoryLabel: 'YouTube Edit',
    niche: 'Gaming & Vlogs',
    stat: '+2.4M Views',
    subStat: '17.2% CTR',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'High-energy storytelling, punchy meme zooms, color grading for high dynamic range, and licensed epic audio.'
  },
  {
    id: 3,
    title: '10X Crypto Portfolio Thumbnail A/B Variant',
    category: 'thumbnails',
    categoryLabel: 'High-CTR Thumbnail',
    niche: 'Crypto & Investing',
    stat: '+24.6% CTR',
    subStat: 'Tested on 350k Impressions',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    isImageOnly: true,
    description: 'High-contrast expression cut-out, custom 3D coin rendering, visual hierarchy optimized for mobile feeds.'
  },
  {
    id: 4,
    title: 'Venture Founder Personal Brand Kit',
    category: 'branding',
    categoryLabel: 'Personal Branding',
    niche: 'Executive & Creator',
    stat: '+85K Followers',
    subStat: 'Complete Identity Suite',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    isImageOnly: true,
    description: 'Monochrome luxury typography, bespoke media kit, LinkedIn banner suite, and authoritative founder positioning.'
  },
  {
    id: 5,
    title: 'SaaS Analytics Platform Landing Page',
    category: 'web',
    categoryLabel: 'Web Development',
    niche: 'Tech / SaaS',
    stat: '3.8x Conversion',
    subStat: '99 Lighthouse Score',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    isImageOnly: true,
    description: 'Built with React, Tailwind CSS, Framer Motion, and Stripe billing. Sub-1 second initial render speed.'
  },
  {
    id: 6,
    title: 'Deep-Dive Founder Podcast Multicam',
    category: 'youtube',
    categoryLabel: 'YouTube Edit',
    niche: 'Business & Podcasts',
    stat: '+640K Views',
    subStat: '52% Avg Duration',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Multi-cam camera switching, dynamic auto-captions, audio noise cleaning, and shorts cut-down package.'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'youtube', label: 'YouTube Edits' },
  { id: 'thumbnails', label: 'Thumbnails' },
  { id: 'web', label: 'Web Development' },
  { id: 'branding', label: 'Personal Branding' }
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Proven Client Results
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Production Portfolio
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            Every edit, thumbnail, and website is engineered with obsessive detail to maximize retention and conversion.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 sm:pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#C9A24B] text-[#0B1220] shadow-lg shadow-[#C9A24B]/20 scale-105 font-bold'
                    : 'bg-[#161F30] text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#161F30]/70 border border-gray-800 hover:border-[#C9A24B]/60 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Media Thumbnail Container */}
                <div
                  onClick={() => setActiveModalItem(item)}
                  className="relative aspect-video w-full overflow-hidden bg-gray-900 cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />

                  {/* Play / Inspect Overlay Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-[#C9A24B] text-[#0B1220] flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                      {item.videoUrl ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Badges on Thumbnail */}
                  <span className="absolute top-3 left-3 bg-[#0B1220]/90 text-[#C9A24B] text-xs font-bold px-3 py-1 rounded-full border border-[#C9A24B]/30 backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>

                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-3.5 h-3.5" /> {item.stat}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{item.niche}</span>
                    <span className="text-[#C9A24B] font-semibold">{item.subStat}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C9A24B] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-6 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs sm:text-sm">
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="text-gray-300 hover:text-[#C9A24B] font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {item.videoUrl ? 'Watch Preview Reel' : 'Inspect Case Study'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#161F30] border border-[#C9A24B]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col my-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-800 bg-[#0B1220] shrink-0">
              <div>
                <span className="text-[11px] sm:text-xs text-[#C9A24B] font-bold uppercase tracking-wider">
                  {activeModalItem.categoryLabel} Showcase
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[240px] sm:max-w-none">{activeModalItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Player or Large Image */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center shrink-0">
              {activeModalItem.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={activeModalItem.videoUrl}
                  title={activeModalItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeModalItem.thumbnail}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Details & CTA */}
            <div className="p-4 sm:p-6 bg-[#0B1220] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-800 overflow-y-auto">
              <div className="space-y-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm">{activeModalItem.stat}</span>
                  <span className="text-gray-400 text-xs">• {activeModalItem.subStat}</span>
                </div>
                <p className="text-xs text-gray-300 max-w-xl leading-relaxed">{activeModalItem.description}</p>
              </div>

              <button
                onClick={() => {
                  setActiveModalItem(null);
                  scrollToSection('quote-calculator');
                }}
                className="w-full sm:w-auto shrink-0 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md shadow-[#C9A24B]/20 text-center"
              >
                Order Similar Style
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;

