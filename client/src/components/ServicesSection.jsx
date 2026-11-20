import React from 'react';
import { Video, CalendarCheck, UserCheck, Code, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'YouTube Complete Edit Package',
    tag: 'Flagship Offer',
    desc: 'Full video edit (cuts, pacing, sound design, motion graphics) paired with a click-optimised thumbnail.',
    icon: Video,
    features: ['High-retention editing', 'A/B tested thumbnails', 'Up to 4K delivery', '2-3 days turnaround'],
    linkText: 'Order Package'
  },
  {
    title: 'Content Management',
    tag: 'Retainer Plan',
    desc: 'End-to-end creator pipeline: content calendar planning, publishing, community management, and monthly reports.',
    icon: CalendarCheck,
    features: ['Dedicated content pipeline', 'Monthly strategy calls', 'Analytics reporting', 'Workflow automation'],
    linkText: 'Get Content Plan'
  },
  {
    title: 'Personal Branding',
    tag: 'Identity Kit',
    desc: 'Complete identity for founders and creators: positioning, logo, colour typography system, and social kits.',
    icon: UserCheck,
    features: ['Brand guidelines PDF', 'Social profile revamp', 'Media kit design', 'Typography & asset kit'],
    linkText: 'Build Brand'
  },
  {
    title: 'Web Development',
    tag: 'Custom Build',
    desc: 'High-performance landing pages, custom portfolios, and web applications built to convert visitors.',
    icon: Code,
    features: ['Modern responsive UI', 'SEO & Speed optimised', 'Client dashboard integration', 'Custom CMS setup'],
    linkText: 'Request Quote'
  }
];

const ServicesSection = ({ onOpenBooking }) => {
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
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest">Our Expertise</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            High-Performance Creative Solutions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every service is built with precision to save your time and maximize audience engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#161F30]/70 border border-gray-800 p-5 sm:p-7 flex flex-col justify-between hover:border-[#C9A24B]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-gray-700/80 flex items-center justify-center text-[#C9A24B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-3 py-1 rounded-full border border-[#C9A24B]/20">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C9A24B] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t border-gray-800/80 pt-4">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-[13px] text-gray-200 flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    if (srv.title.includes('Content') || srv.title.includes('Branding')) {
                      if (onOpenBooking) onOpenBooking(srv.title.includes('Content') ? 'content' : 'branding');
                    } else if (srv.title.includes('YouTube')) {
                      scrollToSection('pricing');
                    } else {
                      scrollToSection('quote-calculator');
                    }
                  }}
                  className="w-full mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-700 group-hover:border-[#C9A24B] text-white group-hover:text-[#C9A24B] text-xs sm:text-sm font-bold transition-all hover:bg-[#C9A24B]/10"
                >
                  {srv.linkText}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;