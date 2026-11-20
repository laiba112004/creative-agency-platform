import React from 'react';
import { Star, CheckCircle, Quote, TrendingUp, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Hamza Tariq',
    role: 'Tech & AI Creator (680K Subs)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
    stat: 'CTR grew from 4.2% to 11.8%',
    review: 'The difference in viewer retention was night and day. Their editing team knows exactly where modern viewers drop off and cuts accordingly. My average view duration jumped by 3 minutes on our first video together.',
    rating: 5,
    package: 'Pro YouTube Package'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Founder & Venture Coach',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    stat: '+$140k in client pipeline',
    review: 'They built my personal brand kit and full 1-page conversion website in 10 days flat. The aesthetic is ultra-luxurious, and high-ticket clients take my agency 10x more seriously now.',
    rating: 5,
    package: 'Personal Brand + Web'
  },
  {
    name: 'Zack Reynolds',
    role: 'Finance & Crypto Channel (420K Subs)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80',
    stat: '1.2M views on first collab',
    review: 'Finding reliable editors who understand sound design and custom graphics is nearly impossible. These guys deliver on time every single Friday. Rush delivery came in clutch when market news broke.',
    rating: 5,
    package: 'Premium Edit + A/B Thumbnails'
  }
];

const channelStats = [
  { label: 'Total Creator Views', value: '50,000,000+' },
  { label: 'Completed Projects', value: '1,450+' },
  { label: 'Average Thumbnail CTR', value: '12.8%' },
  { label: 'Client Retention Rate', value: '94%' }
];

const clientLogos = [
  'NEXUS MEDIA', 'CREATOR CORE', 'SCALE LABS', 'VENTURE PULSE', 'VELOCITY STUDIOS', 'ALPHA CONTENT'
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto">
        {/* Channel Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#161F30]/80 border border-gray-800 mb-12 sm:mb-20 shadow-xl">
          {channelStats.map((st, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="text-xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#C9A24B]">
                {st.value}
              </span>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {st.label}
              </p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest">Client Testimonials</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Trusted By Top Creators & Ambitious Brands
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            See what high-performing channel owners and entrepreneurs say about our turnaround, precision, and measurable CTR growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#161F30]/70 border border-gray-800 hover:border-[#C9A24B]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C9A24B]">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-700" />
                </div>

                {/* Growth Metric Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t.stat}
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{t.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C9A24B]/40"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-white text-base">{t.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B]/20" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-gray-300">{t.role}</p>
                  <span className="text-xs text-[#C9A24B] font-semibold">{t.package}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Channel Marquee Strip */}
        <div className="border-t border-b border-gray-800/80 py-8 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">
            Powering channels & companies across YouTube, LinkedIn & Web
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60">
            {clientLogos.map((brand, bIdx) => (
              <span key={bIdx} className="text-sm sm:text-base font-extrabold tracking-widest text-gray-400">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

