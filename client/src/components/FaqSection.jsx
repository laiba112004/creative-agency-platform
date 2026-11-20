import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    category: 'Turnaround & Revisions',
    question: 'How fast will I receive my completed video cut?',
    answer: 'Standard turnaround for YouTube videos is 3-4 business days for Pro tiers, and 4-5 days for Starter tiers. If you are on a tight publishing schedule, our 24-48 hour Rush Delivery option prioritizes your project in our edit queue.'
  },
  {
    category: 'Turnaround & Revisions',
    question: 'How do revisions work if I want changes?',
    answer: 'Every package includes 1 to 3 revision rounds. You receive a private review link where you can click anywhere on the video frame and leave timestamped comments. We turn around revisions within 24 hours.'
  },
  {
    category: 'Footage & Deliverables',
    question: 'How do I send my raw footage and media assets?',
    answer: 'You can upload directly through our portal for files up to 50 GB with pause/resume support, or simply paste a Google Drive, Dropbox, or WeTransfer link in the project intake brief.'
  },
  {
    category: 'Footage & Deliverables',
    question: 'What video editing software and formats do you support?',
    answer: 'Our senior editors work natively in Adobe Premiere Pro, After Effects, DaVinci Resolve, and Blender. Final masters are delivered in 4K Ultra-HD MP4 (H.264 / H.265) or Apple ProRes, ready for instant publication.'
  },
  {
    category: 'Billing & Payments',
    question: 'What payment methods do you accept, including in Pakistan?',
    answer: 'We support international credit/debit cards, PayPal, and Payoneer. For clients within Pakistan, we support direct IBAN bank transfers, Raast, JazzCash, and Easypaisa with automated receipt verification.'
  },
  {
    category: 'Billing & Payments',
    question: 'Do you offer monthly retainers for consistent creators?',
    answer: 'Yes! If you publish 4 or 8 videos per month, our monthly retainers give you guaranteed editor capacity, a dedicated Slack channel, and up to 20% bundle savings.'
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-semibold uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            Everything you need to know about our production workflows, revision policy, and delivery specs.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#161F30]/70 border border-gray-800 hover:border-[#C9A24B]/40 rounded-2xl transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 select-none"
                >
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#C9A24B] uppercase tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B1220] border border-gray-700 flex items-center justify-center text-gray-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#C9A24B]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-gray-200 text-xs sm:text-sm leading-relaxed border-t border-gray-800/60 bg-[#0B1220]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

