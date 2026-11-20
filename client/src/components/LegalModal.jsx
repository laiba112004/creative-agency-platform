import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Scale, Lock } from 'lucide-react';

const POLICIES = {
  terms: {
    title: 'Terms of Service',
    badge: 'Service Agreement v1.0',
    icon: FileText,
    content: [
      {
        heading: '1. Service Scope & Deliverables',
        body: 'CreativeStudio provides high-retention video editing, click-optimised thumbnail design, personal brand identity assets, and bespoke web applications as described in the agreed package tier or custom quote.'
      },
      {
        heading: '2. Production Turnaround',
        body: 'Standard delivery turnaround begins upon receipt of all required assets (raw footage, brand brief, and Drive links). Starter tiers deliver within 4-5 business days; Pro within 3-4 days; Premium priority queue within 2-3 days.'
      },
      {
        heading: '3. Communication & Approvals',
        body: 'Official project communications, draft approvals, and timecode review feedback must be submitted through the CreativeStudio Client Portal or our verified agency WhatsApp channel.'
      }
    ]
  },
  refund: {
    title: 'Revision & Refund Policy',
    badge: 'Quality Guarantee',
    icon: Scale,
    content: [
      {
        heading: '1. Two Revision Rounds Included',
        body: 'Every YouTube package and brand package includes two comprehensive rounds of revisions. Clients can leave frame-accurate timecode notes directly on the review video player.'
      },
      {
        heading: '2. 100% Pre-Production Refund',
        body: 'If a project is cancelled prior to our senior editors ingesting raw footage and initiating timeline cutting, a full 100% refund is issued without penalty.'
      },
      {
        heading: '3. Post-Draft Milestone Protection',
        body: 'Once a v1.0 draft cut has been rendered and delivered for client review, refunds are prorated to cover editor production time, or credit is transferred toward future video projects.'
      }
    ]
  },
  ip: {
    title: 'Commercial IP & Copyright Ownership',
    badge: '100% Client Ownership',
    icon: CheckCircle2,
    content: [
      {
        heading: '1. Full Commercial Rights Transfer',
        body: 'Upon final invoice settlement and project delivery, 100% of the commercial intellectual property rights, copyright, and master files transfer unconditionally to the client.'
      },
      {
        heading: '2. Portfolio Showcase Opt-Out',
        body: 'By default, CreativeStudio reserves the right to feature delivered work in our public showcase. Clients with strict confidentiality requirements may opt out at any time with a signed NDA.'
      },
      {
        heading: '3. Raw Project Files (Premiere / After Effects)',
        body: 'Exported 4K ProRes and MP4 masters are included with every order. Native project files (.prproj / .aep) can be unbundled upon request.'
      }
    ]
  },
  privacy: {
    title: 'Privacy & NDA Security',
    badge: 'Enterprise Security',
    icon: Lock,
    content: [
      {
        heading: '1. Strict Non-Disclosure (NDA)',
        body: 'All unreleased raw footage, private audio stems, creator revenue numbers, and upcoming video scripts are treated with strict confidentiality.'
      },
      {
        heading: '2. 50GB Media Vault Lifecycle',
        body: 'Raw files uploaded to the Media Vault are encrypted in transit and at rest. After project completion and client master approval, raw footage is archived for 30 days before purge.'
      },
      {
        heading: '3. No Unauthorized Third-Party Sharing',
        body: 'Client data, channel analytics, and payment receipts are never sold, rented, or shared with external ad brokers.'
      }
    ]
  }
};

const LegalModal = ({ isOpen, onClose, activeTab = 'terms' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  if (!isOpen) return null;

  const currentPolicy = POLICIES[currentTab] || POLICIES.terms;
  const IconComponent = currentPolicy.icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#161F30] border border-[#C9A24B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white shadow-black/80 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-xl bg-gray-800/60 hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Legal Governance & Client Protection
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Agency Policies & Terms
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800/80 pb-3">
          {[
            { id: 'terms', label: 'Terms of Service' },
            { id: 'refund', label: 'Revision & Refund' },
            { id: 'ip', label: 'Commercial IP Rights' },
            { id: 'privacy', label: 'Privacy & NDA' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === tab.id
                  ? 'bg-[#C9A24B] text-[#0B1220] shadow-sm'
                  : 'bg-[#0B1220] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Policy Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          <div className="flex items-center justify-between bg-[#0B1220] p-3.5 rounded-2xl border border-[#C9A24B]/30">
            <div className="flex items-center gap-2.5">
              <IconComponent className="w-5 h-5 text-[#C9A24B]" />
              <h4 className="text-sm font-bold text-white">{currentPolicy.title}</h4>
            </div>
            <span className="text-xs bg-[#C9A24B]/15 text-[#C9A24B] px-2.5 py-0.5 rounded-full font-mono font-semibold">
              {currentPolicy.badge}
            </span>
          </div>

          {currentPolicy.content.map((sec, i) => (
            <div key={i} className="space-y-1.5 bg-[#0B1220]/50 p-4 rounded-2xl border border-gray-800/80">
              <h5 className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
                {sec.heading}
              </h5>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>Official Developer Build Module v1.0 Spec</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold rounded-xl transition-all"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
