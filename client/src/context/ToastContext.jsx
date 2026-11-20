import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Sparkles, X, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((msgOrOptions, typeOverride = 'info', titleOverride = null, durationOverride = 4500) => {
    let message = '';
    let type = typeOverride;
    let title = titleOverride;
    let duration = durationOverride;

    if (typeof msgOrOptions === 'object' && msgOrOptions !== null) {
      message = msgOrOptions.message || '';
      type = msgOrOptions.type || typeOverride;
      title = msgOrOptions.title || titleOverride;
      duration = msgOrOptions.duration || durationOverride;
    } else {
      message = String(msgOrOptions || '');
    }

    // Default titles based on type if not provided
    if (!title) {
      if (type === 'success') title = 'Success';
      else if (type === 'error') title = 'Action Required';
      else if (type === 'warning') title = 'Attention';
      else title = 'Creative Studio Notification';
    }

    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);

    const newToast = { id, message, type, title, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  // Convenience helper object
  const toast = {
    success: (msg, title) => showToast(msg, 'success', title),
    error: (msg, title) => showToast(msg, 'error', title),
    warning: (msg, title) => showToast(msg, 'warning', title),
    info: (msg, title) => showToast(msg, 'info', title)
  };

  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (alertMsg) => {
      const str = String(alertMsg || '');
      const isErr = str.toLowerCase().includes('error') || str.toLowerCase().includes('fail');
      showToast(str, isErr ? 'error' : 'info');
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, toast, removeToast }}>
      {children}

      {/* Floating Popup Container */}
      <div
        className="fixed top-4 left-0 right-0 sm:left-auto sm:right-6 sm:top-6 z-[99999] flex flex-col gap-2.5 sm:gap-3 max-w-md mx-auto sm:mx-0 w-full px-3 sm:px-4 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto w-full rounded-2xl p-4 shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 opacity-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 ${t.type === 'success'
                ? 'bg-[#12221B]/95 border-emerald-500/40 text-emerald-50 shadow-emerald-950/50'
                : t.type === 'error'
                  ? 'bg-[#251319]/95 border-rose-500/40 text-rose-50 shadow-rose-950/50'
                  : t.type === 'warning'
                    ? 'bg-[#241C10]/95 border-[#C9A24B]/50 text-amber-50 shadow-amber-950/50'
                    : 'bg-[#131C2D]/95 border-[#C9A24B]/40 text-white shadow-black/80'
              }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Type Icon Badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${t.type === 'success'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : t.type === 'error'
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      : t.type === 'warning'
                        ? 'bg-[#C9A24B]/20 border-[#C9A24B]/40 text-[#C9A24B]'
                        : 'bg-[#C9A24B]/15 border-[#C9A24B]/30 text-[#C9A24B]'
                  }`}
              >
                {t.type === 'success' && <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />}
                {t.type === 'error' && <AlertCircle className="w-5 h-5 stroke-[2.2]" />}
                {t.type === 'warning' && <AlertTriangle className="w-5 h-5 stroke-[2.2]" />}
                {t.type === 'info' && <Sparkles className="w-5 h-5 stroke-[2.2]" />}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold tracking-wide uppercase text-white/90">
                    {t.title}
                  </h4>
                  <button
                    onClick={() => removeToast(t.id)}
                    className="text-gray-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/10"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-relaxed font-medium break-words">
                  {t.message}
                </p>
              </div>
            </div>

            {/* Auto-Dismiss Progress Bar Indicator */}
            {t.duration > 0 && (
              <div className="w-full bg-white/10 h-0.5 mt-3 rounded-full overflow-hidden">
                <div
                  className={`h-full animate-[shrink_linear_forwards] ${t.type === 'success'
                      ? 'bg-emerald-400'
                      : t.type === 'error'
                        ? 'bg-rose-400'
                        : 'bg-[#C9A24B]'
                    }`}
                  style={{
                    animationDuration: `${t.duration}ms`,
                    animationName: 'toastProgress'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Embedded CSS for Toast Keyframe Animation */}
      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export default ToastContext;

