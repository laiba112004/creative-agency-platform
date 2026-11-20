import React from 'react';
import { UploadCloud, Scissors, MessageSquareCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Brief & Cloud Upload',
    subtitle: 'Takes ~3 minutes',
    desc: 'Select your package, submit your channel link, target audience, and drop raw footage (up to 50 GB) or paste your Google Drive / Dropbox link.',
    icon: UploadCloud,
    highlights: ['Google Drive & Dropbox sync', 'Intake brief questionnaire', 'Priority queue assignment']
  },
  {
    step: '02',
    title: 'Editorial & Motion Craft',
    subtitle: 'Turnaround: 48-72 hours',
    desc: 'Our senior editors craft high-retention cuts, custom sound design, animated subtitles, b-roll layering, and click-optimised thumbnail variants.',
    icon: Scissors,
    highlights: ['Retention-first pacing', 'Cinematic sound design', 'A/B tested thumbnail design']
  },
  {
    step: '03',
    title: 'Frame-Accurate Review',
    subtitle: 'Real-time collaborative pass',
    desc: 'Inspect your preview draft in our review player. Leave timestamped comments, pin notes directly on video frames, and request adjustments.',
    icon: MessageSquareCheck,
    highlights: ['Timestamped comments', 'Free revision rounds included', 'Instant editor notifications']
  },
  {
    step: '04',
    title: '4K Export & Handover',
    subtitle: 'Ready for upload',
    desc: 'Download your full-resolution 4K master files, optimized thumbnail files, and SEO metadata. Ready to publish and crush the algorithm.',
    icon: CheckCircle2,
    highlights: ['4K Ultra-HD MP4 & ProRes', 'High-res thumbnail files', '100% Satisfaction guarantee']
  }
];

const ProcessSection = () => {
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
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest">Frictionless Workflow</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How Your Project Moves From Raw Footage to Viral Master
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            No endless email threads or messy file transfers. A streamlined 4-step production pipeline engineered for creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((stg, idx) => {
            const Icon = stg.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#161F30]/70 border border-gray-800 hover:border-[#C9A24B]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-gray-700 group-hover:text-[#C9A24B] transition-colors">
                      {stg.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1220] border border-gray-700/80 flex items-center justify-center text-[#C9A24B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A24B] transition-colors">
                    {stg.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-[#C9A24B] block mb-3">
                    {stg.subtitle}
                  </span>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {stg.desc}
                  </p>

                  <ul className="space-y-2 border-t border-gray-800/80 pt-4 mb-4">
                    {stg.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-gray-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection('quote-calculator')}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-[#C9A24B] hover:text-white transition-colors"
          >
            Calculate Your Project Turnaround & Cost <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

