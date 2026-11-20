import React, { useEffect } from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { downloadInvoicePdf } from '../utils/generateInvoicePdf';

const InvoiceModal = ({ isOpen, onClose, order }) => {
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen && order) {
      try {
        const fileName = downloadInvoicePdf(order);
        showToast(`Invoice downloaded to your laptop (${fileName})`, 'success', 'PDF Saved to Laptop');
      } catch (err) {
        console.error('Direct PDF download failed:', err);
      }
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const invoiceNumber = `INV-2026-${order._id ? order._id.slice(-6).toUpperCase() : 'AUTH'}`;
  const issueDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleManualDownload = () => {
    try {
      const fileName = downloadInvoicePdf(order);
      showToast(`Invoice downloaded: ${fileName}`, 'success', 'PDF Downloaded');
    } catch (err) {
      console.error('Download error:', err);
      showToast('Could not generate PDF. Please try Print.', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
    showToast('Print dialog initiated. You can save as PDF or print receipt.', 'info', 'Invoice Export');
  };

  const pkrEquivalent = Math.round((Number(order.price) || 0) * 280);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0B1220] border border-[#C9A24B]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl text-white max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="print:hidden absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white p-1 rounded-xl bg-gray-800/60 hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Bar (Hidden on Print) */}
        <div className="print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold text-[#C9A24B] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Official Tax Invoice & Receipt
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleManualDownload}
              className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 bg-[#C9A24B] hover:bg-[#E0B85C] text-[#0B1220] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
              title="Save PDF file directly to your laptop Downloads folder"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#161F30] hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Container */}
        <div className="p-6 sm:p-8 bg-[#161F30] border border-gray-800 rounded-2xl text-gray-200 print:bg-white print:text-black print:border-none print:p-0">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-gray-800 print:border-gray-300">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B1220] border border-[#C9A24B] flex items-center justify-center p-1.5 print:bg-gray-100">
                  <span className="text-[#C9A24B] font-extrabold text-sm">C</span>
                </div>
                <span className="text-xl font-extrabold tracking-wider text-white print:text-black">
                  CREATIVE<span className="text-[#C9A24B]">STUDIO</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 print:text-gray-600">
                Premium Media & Tech Agency<br />
                Global Production & Creator Hub<br />
                support@creativestudio.agency
              </p>
            </div>

            <div className="sm:text-right">
              <h2 className="text-2xl font-black text-white print:text-black uppercase tracking-tight">
                Tax Invoice
              </h2>
              <p className="text-xs font-mono font-bold text-[#C9A24B] mt-0.5">
                {invoiceNumber}
              </p>
              <p className="text-xs text-gray-400 print:text-gray-600 mt-1">
                Date: {issueDate}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 print:border-emerald-600 print:text-emerald-700">
                <CheckCircle2 className="w-3 h-3" />
                {order.paymentStatus === 'Paid' ? 'PAID IN FULL (SETTLED)' : 'VERIFIED INVOICE'}
              </div>
            </div>
          </div>

          {/* Client & Payment Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-gray-800 print:border-gray-300 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-gray-400 print:text-gray-600 block mb-1">
                Billed To:
              </span>
              <p className="text-sm font-extrabold text-white print:text-black">{order.clientName}</p>
              <p className="text-gray-300 print:text-gray-700">{order.clientEmail}</p>
              {order.channelLink && (
                <p className="text-gray-400 print:text-gray-600 mt-0.5">{order.channelLink}</p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="font-bold uppercase tracking-wider text-gray-400 print:text-gray-600 block mb-1">
                Payment Details:
              </span>
              <p className="font-bold text-gray-200 print:text-gray-800">
                Method: {order.paymentMethod || 'Credit Card Online'}
              </p>
              <p className="font-mono text-gray-400 print:text-gray-600">
                Ref: {order.transactionId || 'TXN-ONLINE-AUTH'}
              </p>
              <p className="text-gray-400 print:text-gray-600">
                Currency: USD ($) Charged
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-800 print:border-gray-300 text-gray-400 print:text-gray-600 uppercase font-semibold">
                <tr>
                  <th className="py-2.5">Service & Deliverables Description</th>
                  <th className="py-2.5 text-center">Tier</th>
                  <th className="py-2.5 text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 print:divide-gray-200">
                <tr>
                  <td className="py-3">
                    <p className="font-bold text-white print:text-black">{order.serviceName}</p>
                    <p className="text-[11px] text-gray-400 print:text-gray-600 mt-0.5">
                      Includes 2 revision rounds, 4K render, and thumbnail master.
                    </p>
                    {order.addons && order.addons.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {order.addons.map((ad, idx) => (
                          <span key={idx} className="text-[10px] bg-gray-800 print:bg-gray-100 text-gray-300 print:text-gray-700 px-2 py-0.5 rounded">
                            + {ad}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-3 text-center font-bold text-[#C9A24B]">
                    {order.packageTier}
                  </td>
                  <td className="py-3 text-right font-extrabold text-white print:text-black font-mono">
                    ${order.price}.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Calculation */}
          <div className="pt-4 border-t border-gray-800 print:border-gray-300 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono text-white print:text-black">${order.price}.00</span>
              </div>
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>Digital Export Tax (0%):</span>
                <span className="font-mono text-white print:text-black">$0.00</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-800 print:border-gray-300 text-sm font-extrabold text-white print:text-black">
                <span>Total Amount:</span>
                <span className="text-[#C9A24B] font-mono text-base">${order.price} USD</span>
              </div>
              <div className="text-right text-[11px] text-gray-400 print:text-gray-600 font-mono">
                (≈ ₨ {pkrEquivalent.toLocaleString()} PKR at standard bank rate)
              </div>
            </div>
          </div>

          {/* Copyright & IP Guarantee Clause (Section 10 & 15) */}
          <div className="mt-8 p-3.5 rounded-xl bg-[#0B1220] print:bg-gray-50 border border-gray-800 print:border-gray-200 flex items-start gap-2.5 text-[11px] text-gray-400 print:text-gray-700 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
            <p>
              <strong>Commercial Copyright Transfer:</strong> This document certifies that 100% of all commercial intellectual property rights, master deliverables, and broadcast licenses transfer unconditionally to <strong>{order.clientName}</strong> upon settlement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
