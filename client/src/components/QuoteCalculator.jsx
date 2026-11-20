import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Zap, Sparkles, Film, Globe, Clock, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const QuoteCalculator = () => {
  const { showToast } = useToast();
  const [calculatorType, setCalculatorType] = useState('youtube'); // 'youtube' | 'web'
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'PKR'
  const exchangeRate = 280; // 1 USD = ~280 PKR

  // YouTube State
  const [videoMinutes, setVideoMinutes] = useState(10);
  const [videoQuantity, setVideoQuantity] = useState(1);
  const [complexity, setComplexity] = useState('dynamic'); // 'clean' | 'dynamic' | 'cinematic'
  const [addons, setAddons] = useState({
    rushDelivery: false,
    customThumbnail: true,
    shortsCutdown: false,
    seoPack: false
  });

  // Web Dev State
  const [webType, setWebType] = useState('landing'); // 'landing' | 'business' | 'custom'
  const [webPages, setWebPages] = useState(3);
  const [webAddons, setWebAddons] = useState({
    cms: true,
    payments: false,
    seo: true,
    multilingual: false
  });

  // Modal / Order state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculation for YouTube
  const calculateYouTubeTotal = () => {
    // Base tier by length
    let basePerVideo = 100;
    if (videoMinutes <= 8) basePerVideo = 130;
    else if (videoMinutes <= 20) basePerVideo = 240;
    else basePerVideo = 400;

    // Complexity multiplier
    let complexityMultiplier = 1;
    if (complexity === 'clean') complexityMultiplier = 0.9;
    else if (complexity === 'dynamic') complexityMultiplier = 1.15;
    else if (complexity === 'cinematic') complexityMultiplier = 1.45;

    let perVideoCost = basePerVideo * complexityMultiplier;

    // Addons per video
    if (addons.rushDelivery) perVideoCost += 49;
    if (addons.customThumbnail) perVideoCost += 29;
    if (addons.shortsCutdown) perVideoCost += 39;
    if (addons.seoPack) perVideoCost += 19;

    let subtotal = perVideoCost * videoQuantity;

    // Volume bundle discount
    let discountPercent = 0;
    if (videoQuantity >= 8) discountPercent = 0.20; // 20% off
    else if (videoQuantity >= 4) discountPercent = 0.10; // 10% off

    const totalUSD = Math.round(subtotal * (1 - discountPercent));
    const savedUSD = Math.round(subtotal * discountPercent);

    // Turnaround
    let turnaround = '3-4 business days';
    if (addons.rushDelivery) turnaround = '24-48 hours (Rush priority)';
    else if (videoQuantity > 4) turnaround = '7-10 business days (Staggered delivery)';

    return { totalUSD, savedUSD, turnaround };
  };

  // Calculation for Web Dev
  const calculateWebTotal = () => {
    let base = 350;
    if (webType === 'landing') base = 300 + (webPages * 40);
    else if (webType === 'business') base = 550 + (webPages * 50);
    else if (webType === 'custom') base = 950 + (webPages * 60);

    if (webAddons.cms) base += 120;
    if (webAddons.payments) base += 150;
    if (webAddons.seo) base += 80;
    if (webAddons.multilingual) base += 100;

    return { totalUSD: base, turnaround: webType === 'custom' ? '2-3 weeks' : '5-7 business days' };
  };

  const ytResult = calculateYouTubeTotal();
  const webResult = calculateWebTotal();

  const currentTotalUSD = calculatorType === 'youtube' ? ytResult.totalUSD : webResult.totalUSD;
  const currentTotal = currency === 'USD' ? currentTotalUSD : Math.round(currentTotalUSD * exchangeRate);
  const currentTurnaround = calculatorType === 'youtube' ? ytResult.turnaround : webResult.turnaround;

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/orders', {
        serviceName: calculatorType === 'youtube' ? 'YouTube Instant Quote' : 'Web Dev Instant Quote',
        packageTier: calculatorType === 'youtube' ? `${videoQuantity}x Video (${videoMinutes}m, ${complexity})` : `${webType.toUpperCase()} Website (${webPages} pages)`,
        price: currentTotalUSD,
        clientName,
        clientEmail,
        channelLink: calculatorType === 'youtube' ? 'Provided in quote notes' : '',
        projectBrief: `Calculated Quote: $${currentTotalUSD} USD. Addons: ${JSON.stringify(calculatorType === 'youtube' ? addons : webAddons)}. Notes: ${additionalNotes}`
      });
      setSubmitted(true);
      showToast('Custom quote saved! Track project status live in the Client Hub below.', 'success', 'Quote Registered');
      setTimeout(() => {
        setSubmitted(false);
        setQuoteModalOpen(false);
        setClientName('');
        setClientEmail('');
        setAdditionalNotes('');
        // Smoothly scroll to Live Portal Tracker without URL hash
        const portal = document.getElementById('orders-dashboard');
        if (portal) {
          portal.scrollIntoView({ behavior: 'smooth' });
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      }, 1800);
    } catch (err) {
      showToast('Error booking quote. Please ensure backend server is running on port 5000.', 'error', 'Submission Failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote-calculator" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/80 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C9A24B]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] text-xs font-semibold uppercase">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Pricing Engine
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Instant Quote Calculator
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            Configure your exact deliverables and get an instant cost and turnaround estimate in real-time.
          </p>

          {/* Toggle Service & Currency */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="inline-flex p-1 bg-[#161F30] border border-gray-700 rounded-xl">
              <button
                onClick={() => setCalculatorType('youtube')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  calculatorType === 'youtube'
                    ? 'bg-[#C9A24B] text-[#0B1220] shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                YouTube Edit Package
              </button>
              <button
                onClick={() => setCalculatorType('web')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  calculatorType === 'web'
                    ? 'bg-[#C9A24B] text-[#0B1220] shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Web Development
              </button>
            </div>

            {/* Currency selector */}
            <div className="inline-flex p-1 bg-[#161F30] border border-gray-700 rounded-xl">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  currency === 'USD' ? 'bg-[#0B1220] text-[#C9A24B] border border-[#C9A24B]/40' : 'text-gray-400'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  currency === 'PKR' ? 'bg-[#0B1220] text-[#C9A24B] border border-[#C9A24B]/40' : 'text-gray-400'
                }`}
              >
                PKR (₨)
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#161F30]/80 border border-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 sm:space-y-7 shadow-xl">
            {calculatorType === 'youtube' ? (
              <>
                {/* 1. Video Length */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-white">Target Video Length</label>
                    <span className="text-[#C9A24B] font-extrabold text-sm bg-[#0B1220] px-3 py-1 rounded-full border border-[#C9A24B]/30">
                      {videoMinutes} Minutes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="45"
                    step="1"
                    value={videoMinutes}
                    onChange={(e) => setVideoMinutes(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
                  />
                  <div className="flex justify-between text-[11px] sm:text-xs text-gray-400 font-medium mt-1">
                    <span>3m (Short)</span>
                    <span>15m (Standard)</span>
                    <span>45m (Long-form)</span>
                  </div>
                </div>

                {/* 2. Number of Videos (Bundle discounts) */}
                <div>
                  <label className="text-sm font-semibold text-white block mb-3">
                    Video Quantity & Volume Discount
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {[
                      { qty: 1, label: 'Single Video', tag: 'Standard' },
                      { qty: 4, label: '4 Videos/mo', tag: '10% OFF' },
                      { qty: 8, label: '8 Videos/mo', tag: '20% OFF' }
                    ].map((item) => (
                      <button
                        key={item.qty}
                        onClick={() => setVideoQuantity(item.qty)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          videoQuantity === item.qty
                            ? 'border-[#C9A24B] bg-[#0B1220] text-white shadow-md'
                            : 'border-gray-700 bg-[#0B1220]/40 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-white">{item.label}</span>
                          <span className="text-xs font-bold text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">
                          {item.qty === 1 ? 'One-off delivery' : 'Creator monthly pipeline'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Editing Complexity */}
                <div>
                  <label className="text-sm font-semibold text-white block mb-3">
                    Editing Style & Motion Complexity
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'clean', title: 'Clean & Talking Head', desc: 'Jump cuts, pacing, music & basic color' },
                      { id: 'dynamic', title: 'Dynamic Retention', desc: 'Captions, sound design, memes, zooms, B-roll' },
                      { id: 'cinematic', title: 'Cinematic / 3D VFX', desc: 'High-end animations, 3D tracking, deep polish' }
                    ].map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => setComplexity(comp.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          complexity === comp.id
                            ? 'border-[#C9A24B] bg-[#0B1220] text-white shadow-md'
                            : 'border-gray-700 bg-[#0B1220]/40 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <p className="text-sm font-bold text-white mb-1">{comp.title}</p>
                        <p className="text-xs sm:text-[13px] text-gray-300 leading-snug">{comp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Add-ons Selection */}
                <div>
                  <label className="text-sm font-semibold text-white block mb-3">
                    Optional Add-ons & Boosters
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'rushDelivery', name: 'Rush 24-48h Delivery', price: '+$49/vid' },
                      { key: 'customThumbnail', name: 'Click-Optimized A/B Thumbnail', price: '+$29/vid' },
                      { key: 'shortsCutdown', name: 'Viral Shorts/Reel Cut-down', price: '+$39/vid' },
                      { key: 'seoPack', name: 'Title & SEO Description Optimization', price: '+$19/vid' }
                    ].map((add) => (
                      <div
                        key={add.key}
                        onClick={() => setAddons({ ...addons, [add.key]: !addons[add.key] })}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                          addons[add.key]
                            ? 'border-[#C9A24B] bg-[#0B1220]'
                            : 'border-gray-800 bg-[#0B1220]/30 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                              addons[add.key] ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B1220]' : 'border-gray-600'
                            }`}
                          >
                            {addons[add.key] && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-sm text-gray-200">{add.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#C9A24B]">{add.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Web Development Configurator */
              <>
                <div>
                  <label className="text-sm font-semibold text-white block mb-3">Website Category</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'landing', title: 'High-Converting Landing Page', desc: 'Single sales/lead page' },
                      { id: 'business', title: 'Full Business Website', desc: '5-8 Pages + Portfolio' },
                      { id: 'custom', title: 'Custom Web App / Portal', desc: 'Auth, Database & Dashboard' }
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setWebType(w.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          webType === w.id
                            ? 'border-[#C9A24B] bg-[#0B1220] text-white'
                            : 'border-gray-700 bg-[#0B1220]/40 text-gray-400'
                        }`}
                      >
                        <p className="text-xs font-bold text-white mb-1">{w.title}</p>
                        <p className="text-xs text-gray-400">{w.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-white">Estimated Number of Pages</label>
                    <span className="text-[#C9A24B] font-bold text-sm bg-[#0B1220] px-3 py-1 rounded-full border border-[#C9A24B]/30">
                      {webPages} Pages
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={webPages}
                    onChange={(e) => setWebPages(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white block mb-3">Included Technical Capabilities</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'cms', label: 'Headless CMS (Edit Content Easily)', price: '+$120' },
                      { key: 'payments', label: 'Payment Gateway Integration', price: '+$150' },
                      { key: 'seo', label: 'Comprehensive SEO & Speed Audit', price: '+$80' },
                      { key: 'multilingual', label: 'Multilingual (English + Urdu RTL)', price: '+$100' }
                    ].map((add) => (
                      <div
                        key={add.key}
                        onClick={() => setWebAddons({ ...webAddons, [add.key]: !webAddons[add.key] })}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                          webAddons[add.key] ? 'border-[#C9A24B] bg-[#0B1220]' : 'border-gray-800 bg-[#0B1220]/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                              webAddons[add.key] ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B1220]' : 'border-gray-600'
                            }`}
                          >
                            {webAddons[add.key] && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-sm text-gray-200">{add.label}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#C9A24B]">{add.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Live Estimate Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#161F30] to-[#0B1220] border-2 border-[#C9A24B]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative sticky top-28">
            <div className="flex items-center justify-between pb-5 border-b border-gray-800">
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">Estimated Project Total</span>
              <span className="text-xs text-gray-300 font-medium">Currency: {currency}</span>
            </div>

            {/* Price Callout */}
            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {currency === 'USD' ? `$${currentTotal}` : `₨ ${currentTotal.toLocaleString()}`}
                </span>
                <span className="text-xs text-gray-400">
                  {calculatorType === 'youtube' && videoQuantity > 1 ? `total for ${videoQuantity} videos` : 'estimated base'}
                </span>
              </div>

              {calculatorType === 'youtube' && ytResult.savedUSD > 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bundle Savings: ${ytResult.savedUSD} USD included
                </div>
              )}
            </div>

            {/* Spec Breakdown */}
            <div className="space-y-3 py-4 border-t border-b border-gray-800 text-xs text-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C9A24B]" /> Estimated Turnaround:
                </span>
                <span className="font-semibold text-white">{currentTurnaround}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" /> Revision Policy:
                </span>
                <span className="font-semibold text-white">2 Rounds Included</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#C9A24B]" /> Delivery Quality:
                </span>
                <span className="font-semibold text-white">Up to 4K Ultra-HD</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full py-4 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#C9A24B]/20"
              >
                Proceed With This Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-center text-gray-400 mt-3 font-medium">
                No immediate payment required. We will review your brief within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Submission Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-[#161F30] border border-[#C9A24B]/40 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 bg-[#C9A24B]/20 text-[#C9A24B] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Quote Request Received!</h3>
                <p className="text-xs text-gray-400">
                  Your estimated project has been synced with our live system. Check the tracker below!
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="border-b border-gray-800 pb-3">
                  <span className="text-xs font-semibold text-[#C9A24B] uppercase">Instant Project Intake</span>
                  <h3 className="text-xl font-bold text-white">
                    Submit Project for ${currentTotalUSD} USD
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Turnaround: {currentTurnaround}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                    placeholder="e.g. Salman Javed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                    placeholder="salman@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Project Details / Link to Footage</label>
                  <textarea
                    rows="3"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                    placeholder="Paste your YouTube link, Google Drive / Dropbox footage folder, or specific style references..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Quote...' : 'Confirm & Send to Production'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default QuoteCalculator;

