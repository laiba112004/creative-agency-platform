import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Clock, X, Zap, Sparkles, CreditCard, Landmark, Tag, Upload, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const packages = [
  {
    tier: 'Starter',
    badge: 'New Channels',
    price: 149,
    videoLength: 'Up to 8 min',
    style: 'Cuts, pacing, music, basic colour',
    thumbnails: '1 design',
    revisions: '1 round',
    turnaround: '4-5 days',
    extras: 'Intro & Outro template'
  },
  {
    tier: 'Pro',
    badge: 'Growing Channels',
    price: 299,
    popular: true,
    videoLength: 'Up to 20 min',
    style: 'Sound design, captions, motion graphics, b-roll',
    thumbnails: '3 A/B variants',
    revisions: '2 rounds',
    turnaround: '3-4 days',
    extras: '1 Shorts/Reels cut-down included'
  },
  {
    tier: 'Premium',
    badge: 'Established Creators',
    price: 549,
    videoLength: 'Up to 40 min',
    style: 'Advanced VFX, custom animation, storytelling pass',
    thumbnails: '3 A/B variants + 1 redesign',
    revisions: '3 rounds',
    turnaround: '2-3 days (Priority)',
    extras: '3 Shorts pack + Title/Description SEO'
  }
];

const availableAddons = [
  { id: 'rush', name: 'Rush Delivery (24-48 Hours)', price: 49, icon: Zap },
  { id: 'thumbnail', name: 'Extra A/B Thumbnail Variant', price: 29, icon: Sparkles },
  { id: 'shorts', name: 'Shorts / TikTok Repurposing Pack', price: 39, icon: Sparkles },
  { id: 'seo', name: 'SEO Title, Description & Tags Pack', price: 19, icon: ShieldCheck }
];

const PricingSection = () => {
  const { showToast } = useToast();
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Addons, 2: Brief, 3: Payment

  // Selected add-ons
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Form Brief Data
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    channelLink: '',
    footageLink: '',
    projectBrief: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank' | 'jazzcash'
  const [transactionId, setTransactionId] = useState('');
  const [paymentProofName, setPaymentProofName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Addon toggle
  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Price calculations
  const calculateBasePrice = () => (selectedPkg ? selectedPkg.price : 0);
  const calculateAddonsPrice = () => {
    return selectedAddons.reduce((sum, addId) => {
      const found = availableAddons.find((a) => a.id === addId);
      return sum + (found ? found.price : 0);
    }, 0);
  };

  const rawTotal = calculateBasePrice() + calculateAddonsPrice();
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  // Coupon handling
  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.trim().toUpperCase() === 'LAUNCH20' || couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
      showToast('Coupon code applied! 20% launch discount activated.', 'success', 'Coupon Applied');
    } else {
      setCouponError('Invalid coupon code. Try code: LAUNCH20');
      setDiscountPercent(0);
      setCouponApplied(false);
      showToast('Invalid coupon code. Try using LAUNCH20 for 20% off.', 'error', 'Invalid Coupon');
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const activeAddonNames = selectedAddons.map((id) => {
        const found = availableAddons.find((a) => a.id === id);
        return found ? found.name : id;
      });

      await axios.post('http://localhost:5000/api/orders', {
        serviceName: 'YouTube Complete Edit Package',
        packageTier: selectedPkg.tier,
        price: finalTotal,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        channelLink: formData.channelLink,
        footageLink: formData.footageLink,
        projectBrief: formData.projectBrief,
        addons: activeAddonNames,
        couponCode: couponApplied ? couponCode.toUpperCase() : '',
        discountAmount,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'bank' ? 'Bank Transfer (IBAN/Raast)' : 'JazzCash / Easypaisa',
        transactionId: transactionId || (paymentMethod === 'card' ? 'TXN-CARD-ONLINE' : 'PENDING'),
        paymentProofUrl: paymentProofName ? `Uploaded Receipt: ${paymentProofName}` : '',
        paymentStatus: paymentMethod === 'card' ? 'Paid' : 'Pending Verification'
      });

      setSubmitSuccess(true);
      showToast(`Order for ${selectedPkg.tier} Package booked successfully! Details logged to Live Client Hub.`, 'success', 'Order Confirmed');
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedPkg(null);
        setCheckoutStep(1);
        setSelectedAddons([]);
        setFormData({ clientName: '', clientEmail: '', channelLink: '', footageLink: '', projectBrief: '' });
        setTransactionId('');
        setPaymentProofName('');

        // Smoothly scroll to Live Portal Tracker without URL hash
        const portal = document.getElementById('orders-dashboard');
        if (portal) {
          portal.scrollIntoView({ behavior: 'smooth' });
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      }, 2000);
    } catch (err) {
      showToast('Error submitting order. Please ensure the backend server is running on port 5000.', 'error', 'Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B1220] border-t border-gray-800/60 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest">Pricing & Packages</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            YouTube Complete Edit Package
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            Transparent pricing without surprise charges. Includes high-retention video edit + click-optimised thumbnail.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-[#161F30] border-2 border-[#C9A24B] shadow-2xl shadow-[#C9A24B]/15 sm:scale-105 z-10'
                  : 'bg-[#161F30]/60 border border-gray-800 hover:border-gray-700'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A24B] text-[#0B1220] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.tier}</h3>
                  <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">{pkg.badge}</span>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">${pkg.price}</span>
                  <span className="text-xs text-gray-400">/ video</span>
                </div>

                <div className="space-y-3.5 text-sm text-gray-200 border-t border-gray-800 pt-6 mb-8">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#C9A24B]" />
                    <span>Turnaround: <strong>{pkg.turnaround}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                    <span>Revisions: <strong>{pkg.revisions}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C9A24B]" />
                    <span>Length: {pkg.videoLength}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C9A24B]" />
                    <span>Thumbnails: {pkg.thumbnails}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C9A24B]" />
                    <span>{pkg.extras}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPkg(pkg);
                  setCheckoutStep(1);
                }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] shadow-lg shadow-[#C9A24B]/20'
                    : 'border border-gray-700 hover:border-[#C9A24B] text-white hover:text-[#C9A24B]'
                }`}
              >
                Order {pkg.tier} Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Step Checkout Modal (PDF Section 07 & 10) */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161F30] border border-[#C9A24B]/40 rounded-3xl p-5 sm:p-8 max-w-xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl my-auto">
            <button
              onClick={() => setSelectedPkg(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#C9A24B]/20 text-[#C9A24B] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Order Received & Production Initialized!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Your project has been logged in our system. Redirecting you to the live Client Portal below...
                </p>
              </div>
            ) : (
              <div>
                {/* Checkout Stepper Header */}
                <div className="border-b border-gray-800 pb-4 mb-6">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-2">
                    <span className="text-[#C9A24B] uppercase tracking-wider">
                      {selectedPkg.tier} Package Checkout (${finalTotal} USD)
                    </span>
                    <span>Step {checkoutStep} of 3</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`h-1.5 rounded-full ${checkoutStep >= 1 ? 'bg-[#C9A24B]' : 'bg-gray-800'}`} />
                    <div className={`h-1.5 rounded-full ${checkoutStep >= 2 ? 'bg-[#C9A24B]' : 'bg-gray-800'}`} />
                    <div className={`h-1.5 rounded-full ${checkoutStep >= 3 ? 'bg-[#C9A24B]' : 'bg-gray-800'}`} />
                  </div>
                </div>

                {/* STEP 1: Add-ons & Scope */}
                {checkoutStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-bold text-white">Enhance Your Package with Add-ons</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Select optional add-ons for expedited delivery and multi-platform reach.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {availableAddons.map((addon) => {
                        const isChecked = selectedAddons.includes(addon.id);
                        const Icon = addon.icon;
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                              isChecked
                                ? 'border-[#C9A24B] bg-[#0B1220]'
                                : 'border-gray-800 bg-[#0B1220]/40 hover:border-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center border text-[11px] ${
                                  isChecked ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B1220]' : 'border-gray-600'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-sm text-gray-200">{addon.name}</span>
                            </div>
                            <span className="text-sm font-bold text-[#C9A24B]">+${addon.price}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Subtotal Callout */}
                    <div className="p-4 rounded-xl bg-[#0B1220] border border-gray-800 flex justify-between items-center text-sm">
                      <span className="text-gray-400">Current Total:</span>
                      <span className="text-xl font-extrabold text-white">${rawTotal} USD</span>
                    </div>

                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full py-4 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
                    >
                      Next: Project Brief Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: Project & Channel Brief */}
                {checkoutStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">Project Brief & Footage Links</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Tell us about your channel and drop your raw footage link (Google Drive / Dropbox / WeTransfer).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                          placeholder="e.g. Salman Javed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Your Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                          placeholder="salman@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">YouTube Channel URL</label>
                      <input
                        type="url"
                        value={formData.channelLink}
                        onChange={(e) => setFormData({ ...formData, channelLink: e.target.value })}
                        className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                        placeholder="https://youtube.com/@yourchannel"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Raw Footage Link (Google Drive / Dropbox)</label>
                      <input
                        type="url"
                        value={formData.footageLink}
                        onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                        className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                        placeholder="https://drive.google.com/drive/folders/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Editing Brief & Reference Links *</label>
                      <textarea
                        rows="3"
                        required
                        value={formData.projectBrief}
                        onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                        className="w-full bg-[#0B1220] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A24B]"
                        placeholder="Describe preferred pacing, reference video links, music mood, font style, and target deadline..."
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="py-3 px-5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        disabled={!formData.clientName || !formData.clientEmail}
                        onClick={() => setCheckoutStep(3)}
                        className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-bold text-sm tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        Proceed to Payment <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment Gateway & Pakistan Domestic Option (PDF Section 10) */}
                {checkoutStep === 3 && (
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">Payment Method & Confirmation</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        International card checkout or domestic Pakistan direct payment options.
                      </p>
                    </div>

                    {/* Payment Method Switcher */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'card', label: 'Credit Card', icon: CreditCard },
                        { id: 'bank', label: 'Bank / Raast (PKR)', icon: Landmark },
                        { id: 'jazzcash', label: 'JazzCash / EasyP', icon: Landmark }
                      ].map((pm) => {
                        const Icon = pm.icon;
                        return (
                          <button
                            type="button"
                            key={pm.id}
                            onClick={() => setPaymentMethod(pm.id)}
                            className={`p-3 rounded-2xl border text-center transition-all ${
                              paymentMethod === pm.id
                                ? 'border-[#C9A24B] bg-[#0B1220] text-white shadow-md'
                                : 'border-gray-800 bg-[#0B1220]/40 text-gray-400'
                            }`}
                          >
                            <Icon className="w-4 h-4 mx-auto mb-1 text-[#C9A24B]" />
                            <span className="text-xs font-semibold block">{pm.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Payment Method Specific Information */}
                    {paymentMethod === 'card' ? (
                      <div className="p-4 bg-[#0B1220] border border-gray-800 rounded-2xl space-y-3">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                          Instant Secure Card Checkout (Mock)
                        </span>
                        <div>
                          <label className="block text-xs text-gray-300 font-medium mb-1">Card Number</label>
                          <input
                            type="text"
                            defaultValue="4242 •••• •••• 4242"
                            readOnly
                            className="w-full bg-[#161F30] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-gray-300 font-medium mb-1">Expiry</label>
                            <input
                              type="text"
                              defaultValue="12/28"
                              readOnly
                              className="w-full bg-[#161F30] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-300 font-medium mb-1">CVC</label>
                            <input
                              type="text"
                              defaultValue="•••"
                              readOnly
                              className="w-full bg-[#161F30] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-[#0B1220] border border-[#C9A24B]/30 rounded-2xl space-y-3 text-xs sm:text-sm">
                        <span className="font-bold text-[#C9A24B] uppercase tracking-wider block text-xs">
                          Pakistan Domestic Transfer Details (PDF Section 10)
                        </span>
                        <div className="bg-[#161F30] p-3 rounded-xl space-y-1 text-gray-300">
                          <p><strong>Bank:</strong> Meezan Bank Ltd</p>
                          <p><strong>Account Title:</strong> Creative Studio Media</p>
                          <p><strong>IBAN:</strong> PK64MEZN0001234567890123</p>
                          <p><strong>Raast ID / JazzCash:</strong> 0300-1234567</p>
                          <p className="text-[#C9A24B] font-bold pt-1">
                            Amount in PKR: ₨ {(finalTotal * 280).toLocaleString()} (at ~280/USD)
                          </p>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1 font-medium">Transaction ID / Reference Number *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. TID-982347102"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full bg-[#161F30] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1 font-medium">Attach Screenshot Proof / Receipt</label>
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 bg-[#161F30] border border-gray-700 hover:border-[#C9A24B] text-gray-200 px-3 py-2 rounded-xl text-xs transition-colors">
                              <Upload className="w-3.5 h-3.5 text-[#C9A24B]" />
                              {paymentProofName || 'Upload Payment Slip'}
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setPaymentProofName(e.target.files[0].name);
                                  }
                                }}
                              />
                            </label>
                            {paymentProofName && (
                              <span className="text-emerald-400 text-xs font-semibold">✓ Attached</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Coupon Code Input */}
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Coupon code (e.g. LAUNCH20)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-[#C9A24B]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-semibold transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {couponApplied && (
                      <p className="text-xs text-emerald-400 font-semibold">
                        ✓ Coupon applied: 20% Discount (${discountAmount} USD saved!)
                      </p>
                    )}
                    {couponError && <p className="text-xs text-rose-400">{couponError}</p>}

                    {/* Final Total Summary */}
                    <div className="p-4 rounded-xl bg-[#0B1220] border border-[#C9A24B]/40 flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-400 block text-xs">Total Due</span>
                        <span className="text-2xl font-extrabold text-white">${finalTotal} USD</span>
                      </div>
                      <span className="text-xs text-[#C9A24B] font-bold">
                        {paymentMethod === 'card' ? 'Instant Access' : 'Verified via Bank Proof'}
                      </span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep(2)}
                        className="py-3 px-5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-xl bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-sm uppercase tracking-wider transition-all disabled:opacity-50 shadow-xl shadow-[#C9A24B]/20"
                      >
                        {isSubmitting ? 'Securing Order...' : `Confirm & Place Order ($${finalTotal})`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingSection;
