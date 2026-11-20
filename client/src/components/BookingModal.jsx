import React, { useState } from 'react';
import {
  X, Calendar, Clock, Video, Globe, CheckCircle2, ArrowRight,
  Sparkles, User, Mail, Link as LinkIcon, MessageSquare
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const TIME_SLOTS = [
  '11:00 AM', '01:30 PM', '03:00 PM', '05:00 PM', '07:30 PM', '09:00 PM'
];

const SERVICES_OPTIONS = [
  { id: 'youtube', title: 'YouTube Complete Edit Package', duration: '30 min' },
  { id: 'content', title: 'Content Management Pipeline', duration: '45 min' },
  { id: 'branding', title: 'Personal Brand Identity', duration: '30 min' },
  { id: 'web', title: 'Web App & Portfolio Build', duration: '30 min' }
];

const BookingModal = ({ isOpen, onClose, preselectedService = null }) => {
  const { showToast } = useToast();
  const [selectedService, setSelectedService] = useState(preselectedService || 'youtube');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 3:00 PM');
  const [selectedSlot, setSelectedSlot] = useState('03:00 PM');
  const [step, setStep] = useState(1); // 1: Choose Slot, 2: Creator Info, 3: Confirmed

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [channelLink, setChannelLink] = useState('');
  const [goals, setGoals] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  // Generate next 5 active weekdays for booking
  const dates = [
    { day: 'Mon', date: 'Nov 24', label: 'Monday, Nov 24' },
    { day: 'Tue', date: 'Nov 25', label: 'Tuesday, Nov 25' },
    { day: 'Wed', date: 'Nov 26', label: 'Wednesday, Nov 26' },
    { day: 'Thu', date: 'Nov 27', label: 'Thursday, Nov 27' },
    { day: 'Fri', date: 'Nov 28', label: 'Friday, Nov 28' }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setStep(3);
    showToast(
      `Strategy Call booked with Lead Editor for ${selectedDate} (${selectedSlot})! Google Meet link generated.`,
      'success',
      'Call Scheduled'
    );
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#161F30] border border-[#C9A24B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white shadow-black/80 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-xl bg-gray-800/60 hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Creative Discovery Call
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Book a 1:1 Strategy Session
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Speak directly with our Creative Director to plan your editing style, turnaround, and content roadmap.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-[#C9A24B]' : 'bg-gray-800'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#C9A24B]' : 'bg-gray-800'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-emerald-400' : 'bg-gray-800'}`} />
        </div>

        {/* STEP 1: Select Service & Slot */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Service Chooser */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                1. Select Focus Topic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedService === s.id
                        ? 'border-[#C9A24B] bg-[#0B1220] shadow-md shadow-[#C9A24B]/10'
                        : 'border-gray-800 bg-[#0B1220]/40 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-white mb-0.5">{s.title}</p>
                    <span className="text-[11px] text-[#C9A24B] font-mono">{s.duration} Video Call</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker Grid */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  2. Choose Date
                </label>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <Globe className="w-3.5 h-3.5 text-[#C9A24B]" /> PKT (GMT+5)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.label)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedDate === d.label
                        ? 'border-[#C9A24B] bg-[#C9A24B] text-[#0B1220] font-bold'
                        : 'border-gray-800 bg-[#0B1220] text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider opacity-80">{d.day}</span>
                    <span className="text-sm font-extrabold">{d.date.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                3. Available Slots ({selectedDate})
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                      selectedSlot === slot
                        ? 'border-[#C9A24B] bg-[#0B1220] text-[#C9A24B] shadow-sm'
                        : 'border-gray-800 bg-[#0B1220]/50 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20 flex items-center justify-center gap-2"
            >
              Continue to Creator Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Creator Brief Form */}
        {step === 2 && (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#C9A24B]/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 block">Selected Slot:</span>
                <span className="text-[#C9A24B] font-bold">{selectedDate} @ {selectedSlot}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Change Slot
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Email Address (For Calendar Invite & Meet Link) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="alex@creatorhub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                YouTube Channel / Website / Portfolio Link
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://youtube.com/@yourchannel"
                  value={channelLink}
                  onChange={(e) => setChannelLink(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Current Goals or Pain Points (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need higher retention on 20-min documentary edits, looking for weekly turnaround..."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold uppercase tracking-wider text-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20 flex items-center justify-center gap-2"
              >
                Confirm Strategy Call
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmed State */}
        {step === 3 && (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Strategy Session Booked!</h4>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto mt-1">
                Calendar invite and Google Meet link dispatched to <strong>{email || 'your email'}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1220] border border-gray-800 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" /> Scheduled Date:
                </span>
                <span className="font-bold text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-[#C9A24B]" /> Time Slot:
                </span>
                <span className="font-bold text-white">{selectedSlot} (PKT)</span>
              </div>
              <div className="flex justify-between items-center text-gray-300 pt-1 border-t border-gray-800">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Video className="w-3.5 h-3.5 text-emerald-400" /> Meeting Room:
                </span>
                <span className="font-mono text-emerald-400 font-bold">meet.google.com/cre-ativ-stu</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
