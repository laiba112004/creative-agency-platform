import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, X, TrendingUp, CheckCircle2, Mail, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ARTICLES = [
  {
    id: 1,
    title: 'Scaling a Finance Channel from 4.2% to 14.8% CTR',
    category: 'Thumbnail CTR',
    readTime: '4 min read',
    date: 'Nov 2026',
    metric: '+350% Impressions',
    summary: 'How A/B testing 3 color-contrasted variants, facial expression framing, and 3-word curiosity hooks unlocked 2.4M organic views.',
    challenge: 'The creator was spending 40+ hours per video with exceptional research, but their thumbnails had low contrast, cluttered text, and suffered an average CTR of only 4.2%.',
    approach: 'We redesigned their thumbnail system from scratch: implemented the Rule of Thirds facial hierarchy, replaced 8-word titles with 3-word high-curiosity phrases, and saturated the background in high-contrast navy and gold.',
    deliverables: ['3 A/B Tested Thumbnail Variants', 'Photoshop PSD Template Pack', 'Title Optimization Analysis'],
    results: 'CTR spiked from 4.2% to an average of 14.8% within 14 days, driving over 2.4 million organic impressions and 18,000 new subscribers.',
    quote: '"CreativeStudio transformed our channel economics in under 2 weeks. The thumbnails alone 3x\'d our view count."'
  },
  {
    id: 2,
    title: 'The 2026 Retention Playbook: Pacing, Sound FX & Pattern Interrupts',
    category: 'YouTube Retention',
    readTime: '6 min read',
    date: 'Nov 2026',
    metric: '71% Avg View Duration',
    summary: 'Why 3-second hook structures, dynamic zoom keyframing, and custom riser SFX prevent audience drop-off in 20-minute long-form videos.',
    challenge: 'Viewer drop-off was steep in the first 45 seconds (down to 48%), causing YouTube\'s recommendation algorithm to stall impressions.',
    approach: 'We introduced rapid 3-second visual micro-hooks, custom whoosh/riser sound design layers, and dynamic zoom-ins every 8 seconds to reset viewer cognitive attention.',
    deliverables: ['Custom SFX Sound Library', 'Dynamic Color Grade LUT', 'Frame-accurate Hook Scripting Guide'],
    results: 'Average View Duration improved from 36% to a record 71%, triggering YouTube algorithm pushes into Browse and Suggested feeds.',
    quote: '"The edits feel like Netflix documentaries. The retention curve literally stopped dropping after the first 30 seconds."'
  },
  {
    id: 3,
    title: 'From Solo Creator to Media Brand: Personal Branding for Founders',
    category: 'Personal Branding',
    readTime: '5 min read',
    date: 'Nov 2026',
    metric: '4.5x Sponsor Deal Flow',
    summary: 'Transforming a tech founder\'s raw expertise into a consistent cross-platform visual identity, media kit, and authority website.',
    challenge: 'The founder had 100K followers on LinkedIn and Twitter but zero consistent visual branding, amateur slide decks, and missed 5-figure sponsorships.',
    approach: 'We designed a cohesive personal brand identity kit: signature typography, custom geometric monogram, media kit deck, and a bespoke portfolio landing page.',
    deliverables: ['Full Brand Identity Guide (PDF)', 'LinkedIn/X Social Profile Banners', 'High-Converting 1-Page Portfolio Site'],
    results: 'Secured 3 tier-1 enterprise brand sponsors within 60 days of relaunch, increasing inbound consulting deals by 450%.',
    quote: '"Having a unified brand system made us look like an established media company overnight."'
  }
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useToast();

  const categories = ['All', 'Thumbnail CTR', 'YouTube Retention', 'Personal Branding'];

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast(`Subscribed! The 2026 Creator Playbook dispatched to ${newsletterEmail}.`, 'success', 'Newsletter Confirmed');
    setNewsletterEmail('');
  };

  return (
    <section id="blog" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Creator Insights & Case Studies
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineered for High Retention & Record CTRs
          </h2>
          <p className="text-gray-400 text-xs sm:text-base leading-relaxed">
            Data-backed creative strategies, thumbnail A/B testing tear-downs, and viral editing playbooks from our senior production team.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#C9A24B] text-[#0B1220] shadow-md shadow-[#C9A24B]/20 scale-105'
                  : 'bg-[#161F30] text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-[#161F30] border border-gray-800 hover:border-[#C9A24B]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[#C9A24B]/10"
            >
              <div>
                {/* Meta Strip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#C9A24B] bg-[#C9A24B]/10 border border-[#C9A24B]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </span>
                </div>

                {/* Key Metric Highlight */}
                <div className="mb-4 inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {article.metric}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#C9A24B] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedArticle(article)}
                className="w-full py-3 rounded-xl bg-[#0B1220] hover:bg-[#C9A24B] text-gray-200 hover:text-[#0B1220] border border-gray-800 hover:border-[#C9A24B] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
              >
                Read Full Case Study
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Strip (Lead Magnet) */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#161F30] via-[#1A253A] to-[#161F30] border border-[#C9A24B]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Weekly 3-Minute Creator Blueprint
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                Get Curated Thumbnail Tear-Downs in Your Inbox
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                Every Tuesday, we break down top-performing YouTube hooks, CTR case studies, and retention edits. Zero fluff.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your creator email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B] placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20 shrink-0 whitespace-nowrap text-center"
                >
                  Subscribe Free
                </button>
              </form>
              <span className="text-[11px] text-gray-500 mt-2 block">
                🔒 No spam ever. Unsubscribe with 1 click anytime.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Detailed Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="relative w-full max-w-3xl bg-[#161F30] border border-[#C9A24B]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl text-white shadow-black/80 max-h-[92vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-1 rounded-xl bg-gray-800/60 hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">• {selectedArticle.readTime}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
                {selectedArticle.title}
              </h3>
            </div>

            {/* Key Metric Banner */}
            <div className="bg-[#0B1220] border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Measured Performance Lift</span>
                <span className="text-2xl font-extrabold text-emerald-400">{selectedArticle.metric}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block font-mono">Production Date</span>
                <span className="text-xs font-bold text-white">{selectedArticle.date}</span>
              </div>
            </div>

            {/* Content Breakdown: Challenge -> Approach -> Results */}
            <div className="space-y-6 text-sm leading-relaxed text-gray-300">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                  01. The Channel Challenge
                </h4>
                <p>{selectedArticle.challenge}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                  02. Our Production Strategy
                </h4>
                <p>{selectedArticle.approach}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                  03. Deliverables Shipped
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedArticle.deliverables.map((del, i) => (
                    <div key={i} className="bg-[#0B1220] p-3 rounded-xl border border-gray-800 text-xs font-medium text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                  04. Measurable Results
                </h4>
                <p>{selectedArticle.results}</p>
              </div>

              {/* Creator Quote */}
              <div className="bg-[#0B1220] border-l-4 border-[#C9A24B] p-4 rounded-r-2xl italic text-gray-200">
                {selectedArticle.quote}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400">Ready to engineer these results for your channel?</span>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  const pricingEl = document.getElementById('pricing');
                  if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20"
              >
                View Editing Packages
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
