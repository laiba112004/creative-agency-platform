import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AI_KNOWLEDGE_BASE = [
  {
    triggers: ['package', 'recommend', 'tier', 'which', 'starter', 'pro', 'premium', 'choose'],
    reply: `Based on your channel goals, here is our recommended roadmap:
• **Starter Package ($149)**: Best for new channels posting up to 8-minute videos (clean pacing, music, 1 thumbnail, 4-5 days turnaround).
• **Pro Package ($299)**: Our most popular tier for growing channels (up to 20-minute videos, motion graphics, sound design, 3 A/B thumbnail variants, Shorts cutdown, 3-4 days turnaround).
• **Premium Package ($549)**: For established channels needing high-retention storytelling, advanced VFX, 3 A/B thumbnails + redesign, 2-3 days priority queue.

Use code **LAUNCH20** at checkout for 20% off!`,
    action: { label: 'Explore YouTube Packages', target: 'pricing' }
  },
  {
    triggers: ['turnaround', 'time', 'fast', 'delivery', 'deadline', 'how long', 'days'],
    reply: `Our turnaround SLAs are strictly enforced:
• **Starter Package**: 4–5 business days
• **Pro Package**: 3–4 business days
• **Premium Priority Queue**: 2–3 business days
• **Rush Delivery Add-on**: 24–48 hours turnaround is available at checkout for urgent uploads!`,
    action: { label: 'View Packages & Add-ons', target: 'pricing' }
  },
  {
    triggers: ['revision', 'refund', 'policy', 'changes', 'guarantee', 'money back'],
    reply: `We offer a risk-free creative guarantee:
• **2 Comprehensive Revision Rounds** are included with every single order. You can leave frame-accurate timecode comments on our draft player.
• **100% Pre-Production Refund**: If you cancel before editing begins, you receive an immediate full refund.
• **Full Commercial IP**: 100% copyright ownership transfers to you on final delivery.`,
    action: { label: 'Check Revision Policy', target: 'faq' }
  },
  {
    triggers: ['quote', 'custom', 'price', 'calculator', 'cost', 'web', 'pages', 'minutes'],
    reply: `For videos longer than 20 minutes, multi-video bundles, or custom Web Development projects, try our **Instant Quote Tool**. It gives you a real-time price in both USD and PKR with instant bundle savings!`,
    action: { label: 'Open Quote Calculator', target: 'quote-calculator' }
  },
  {
    triggers: ['call', 'meeting', 'speak', 'talk', 'consultation', 'strategy', 'zoom', 'google meet'],
    reply: `You can schedule a free 1-on-1 Strategy Session directly with our Lead Editor. We will analyze your channel pacing, discuss your target audience, and draft a tailored content plan.`,
    action: { label: 'Book 1:1 Strategy Call', actionType: 'booking' }
  },
  {
    triggers: ['payment', 'pay', 'method', 'raast', 'jazzcash', 'bank', 'card', 'pakistan'],
    reply: `We support both international and Pakistan domestic payments:
• **Credit / Debit Cards** (Instant checkout)
• **Pakistan Domestic Transfers**: Meezan Bank Ltd (IBAN), Raast ID, and JazzCash/Easypaisa with instant receipt verification!`,
    action: { label: 'Proceed to Payment Options', target: 'pricing' }
  }
];

const QUICK_CHIPS = [
  'Which package fits my channel?',
  'What is your delivery turnaround?',
  'Calculate a custom quote',
  'Book a free strategy session',
  'What payment methods are supported?'
];

// Helper to format bold **text** in AI replies
const renderFormattedText = (text) => {
  if (!text) return null;
  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    const parts = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        parts.push(line.substring(lastIdx, match.index));
      }
      parts.push(
        <strong key={match.index} className="text-[#C9A24B] font-bold">
          {match[1]}
        </strong>
      );
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < line.length) {
      parts.push(line.substring(lastIdx));
    }

    return (
      <span key={lIdx} className="block min-h-[1.2em]">
        {parts.length > 0 ? parts : line}
      </span>
    );
  });
};

const AiAssistant = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { showToast } = useToast();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Welcome to CreativeStudio! I'm your AI Creative Producer. Tell me about your video length, channel goals, or pick a question below for an instant recommendation.",
      action: null
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // AI Knowledge Matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = AI_KNOWLEDGE_BASE.find((k) =>
        k.triggers.some((t) => lower.includes(t))
      );

      let aiReply = match
        ? match.reply
        : `Thanks for sharing! For your project ("${query}"), our Pro Package ($299) or a custom quote via our Instant Calculator is typically the most effective starting point. You can also book a 1-on-1 strategy call with our team.`;

      let action = match ? match.action : { label: 'Calculate Instant Quote', target: 'quote-calculator' };

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiReply,
          action
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.actionType === 'booking' && onOpenBooking) {
      onOpenBooking('youtube');
      setIsOpen(false);
    } else if (action.target) {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#161F30] via-[#1E2C44] to-[#161F30] hover:border-[#C9A24B] border border-[#C9A24B]/50 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Ask CreativeStudio AI Assistant"
        >
          {/* Animated Gold Ring / Aura */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#C9A24B]/30 to-amber-500/20 blur-sm group-hover:opacity-100 opacity-60 transition duration-300 pointer-events-none" />

          <div className="w-8 h-8 rounded-full bg-[#0B1220] border border-[#C9A24B]/60 flex items-center justify-center text-[#C9A24B] shadow-inner shrink-0">
            <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>

          <div className="text-left hidden sm:block">
            <span className="block text-[10px] uppercase tracking-widest text-[#C9A24B] font-bold">
              AI Producer
            </span>
            <span className="block text-xs font-bold text-white">
              Ask CreativeStudio
            </span>
          </div>

          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </button>
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-[9990] w-[94vw] sm:w-[420px] h-[520px] max-h-[82vh] bg-[#161F30]/98 backdrop-blur-2xl border border-[#C9A24B]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-800 bg-[#0B1220]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#161F30] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1220]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  CreativeStudio AI <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                </h4>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Trained on 2026 Agency Specs
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1D2B44] border border-[#C9A24B]/40 text-white font-medium rounded-br-none shadow-md'
                      : 'bg-[#0B1220] text-gray-200 border border-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.sender === 'ai' ? (
                    <div>{renderFormattedText(m.text)}</div>
                  ) : (
                    <p className="whitespace-pre-line text-white font-medium">{m.text}</p>
                  )}
                </div>

                {/* Optional Action Pill inside AI message */}
                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] bg-[#0B1220] border border-[#C9A24B]/40 hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 px-3.5 py-1.5 rounded-full transition-all"
                  >
                    {m.action.label}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#0B1220] border border-gray-800 text-gray-400 px-3.5 py-2 rounded-2xl w-fit text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-gray-400 ml-1">Analyzing agency specs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Strip (Horizontal scroll with hidden scrollbar) */}
          <div className="px-4 py-2.5 bg-[#0B1220]/90 border-t border-gray-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#161F30] border border-gray-700 hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 text-xs font-medium text-gray-300 hover:text-white transition-all shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-gray-800 bg-[#0B1220] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about pricing, turnaround, or custom quotes..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#161F30] border border-gray-700 focus:border-[#C9A24B] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-10 h-10 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] disabled:opacity-40 disabled:hover:bg-[#C9A24B] text-[#0B1220] flex items-center justify-center shrink-0 transition-all font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
