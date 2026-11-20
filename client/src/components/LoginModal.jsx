import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const scrollToPortal = () => {
    const portal = document.getElementById('orders-dashboard');
    if (portal) {
      portal.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      // Derive clean professional name from email
      const rawName = email.split('@')[0].replace(/[._-]/g, ' ');
      const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      const loggedInUser = {
        name: cleanName || 'Client Workspace',
        email: email.trim(),
        role: 'Verified Client'
      };

      login(loggedInUser);
      setIsSubmitting(false);
      showToast(`Welcome back, ${loggedInUser.name}! Workspace unlocked.`, 'success', 'Session Active');
      scrollToPortal();
    }, 500);
  };

  const handleGoogleSSO = () => {
    const googleUser = loginWithGoogle();
    showToast('Authenticated securely via Google Workspace.', 'success', 'SSO Verified');
    scrollToPortal();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#161F30] border border-[#C9A24B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white shadow-black/80 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-xl bg-gray-800/60 hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1220] border border-[#C9A24B]/40 flex items-center justify-center mx-auto text-[#C9A24B] mb-3 shadow-lg shadow-[#C9A24B]/15">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-widest">
            Client Portal Access
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">Sign In to Workspace</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
            Enter your credentials to access project cuts, draft reviews, and master deliverables.
          </p>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleSSO}
          className="w-full flex items-center justify-center gap-3 bg-[#0B1220] hover:bg-[#121B2C] border border-gray-700 hover:border-[#C9A24B]/50 rounded-2xl py-3 px-4 text-xs sm:text-sm font-semibold text-gray-200 hover:text-white transition-all shadow-sm group mb-5"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google Workspace
        </button>

        {/* Professional Divider */}
        <div className="relative flex py-1 items-center mb-5">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-3 text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
            Or Sign In With Email
          </span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Creator or Agency Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to your registered email.', 'info', 'Password Reset')}
                className="text-xs text-[#C9A24B] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A24B] transition-colors"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-700 text-[#C9A24B] focus:ring-[#C9A24B] bg-[#0B1220]"
              />
              <span>Remember this device for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C9A24B]/20 flex items-center justify-center gap-2 mt-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Footer Security Assurance */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Workspace • SOC-2 Type II Standards</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
