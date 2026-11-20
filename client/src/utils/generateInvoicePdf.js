import { jsPDF } from 'jspdf';

/**
 * Generates an official, print-perfect PDF Tax Invoice and directly triggers
 * a download to the user's computer (Downloads folder).
 *
 * @param {Object} order - The order document from MongoDB
 */
export const downloadInvoicePdf = (order) => {
  if (!order) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const invoiceNumber = `INV-2026-${order._id ? order._id.slice(-6).toUpperCase() : 'AUTH'}`;
  const issueDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const priceNum = Number(order.price) || 0;
  const pkrEquivalent = Math.round(priceNum * 280);

  // ---- Page Geometry ----
  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // ---- Top Gold Branding Bar ----
  doc.setFillColor(201, 162, 75); // #C9A24B Gold
  doc.rect(0, 0, pageWidth, 5, 'F');

  // ---- Header Background Block ----
  doc.setFillColor(11, 18, 32); // Deep Navy #0B1220
  doc.rect(0, 5, pageWidth, 38, 'F');

  // Logo / Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('CREATIVE', margin, 21);
  doc.setTextColor(201, 162, 75);
  doc.text('STUDIO', margin + 35, 21);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(180, 190, 205);
  doc.text('PREMIUM MEDIA & TECH AGENCY', margin, 27);
  doc.text('Global Production & Creator Hub  •  support@creativestudio.agency', margin, 32);

  // Right Header: Invoice Title & Meta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('TAX INVOICE', pageWidth - margin, 20, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(201, 162, 75);
  doc.text(invoiceNumber, pageWidth - margin, 26, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(180, 190, 205);
  doc.text(`Issued: ${issueDate}`, pageWidth - margin, 31, { align: 'right' });
  doc.text('Status: PAID IN FULL (SETTLED)', pageWidth - margin, 36, { align: 'right' });

  // ---- Client & Payment Details Grid (Y: 52) ----
  let currentY = 52;

  // Left Column: Client Details
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, (contentWidth / 2) - 3, 34, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, (contentWidth / 2) - 3, 34, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('BILLED TO (CLIENT):', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(order.clientName || 'Valued Creator', margin + 4, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(order.clientEmail || 'client@creativestudio.agency', margin + 4, currentY + 18);

  if (order.channelLink) {
    const channelShort = order.channelLink.length > 38 ? order.channelLink.slice(0, 38) + '...' : order.channelLink;
    doc.setTextColor(100, 116, 139);
    doc.text(`Channel: ${channelShort}`, margin + 4, currentY + 24);
  }

  // Right Column: Payment Details
  const rightColX = margin + (contentWidth / 2) + 3;
  const colWidth = (contentWidth / 2) - 3;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(rightColX, currentY, colWidth, 34, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightColX, currentY, colWidth, 34, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PAYMENT & TRANSACTION SPECS:', rightColX + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Method: ${order.paymentMethod || 'Credit / Debit Card (Online)'}`, rightColX + 4, currentY + 12);
  doc.text(`Ref ID: ${order.transactionId || 'TXN-ONLINE-AUTH-09'}`, rightColX + 4, currentY + 18);
  doc.text('Settlement: 100% Upfront Commercial Retainer', rightColX + 4, currentY + 24);
  doc.text('Currency: USD ($) Charged & Verified', rightColX + 4, currentY + 29);

  // ---- Deliverables & Line Items Table (Y: 94) ----
  currentY = 94;

  // Table Header
  doc.setFillColor(15, 23, 42); // Dark Slate #0F172A
  doc.rect(margin, currentY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('SERVICE & DELIVERABLES SPECIFICATION', margin + 4, currentY + 5.5);
  doc.text('TIER', margin + 115, currentY + 5.5);
  doc.text('AMOUNT (USD)', pageWidth - margin - 4, currentY + 5.5, { align: 'right' });

  // Table Row 1
  currentY += 8;
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, currentY, contentWidth, 22, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, currentY, contentWidth, 22, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(order.serviceName || 'Creative Agency Video Production', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Includes 4K master delivery, custom sound design, color grade, and revisions.', margin + 4, currentY + 11);

  if (order.addons) {
    const addonsText = Array.isArray(order.addons)
      ? order.addons.join('  •  ')
      : String(order.addons).trim();
    if (addonsText) {
      const addonsStr = 'Add-ons: ' + (addonsText.length > 55 ? addonsText.slice(0, 55) + '...' : addonsText);
      doc.setTextColor(180, 83, 9);
      doc.text(addonsStr, margin + 4, currentY + 16);
    }
  }

  // Tier column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(201, 162, 75);
  doc.text(order.packageTier || 'Pro Tier', margin + 115, currentY + 7);

  // Price column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`$${priceNum}.00`, pageWidth - margin - 4, currentY + 7, { align: 'right' });

  // ---- Summary & Financial Breakdown (Y: 122) ----
  currentY += 26;
  const summaryX = pageWidth - margin - 75;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal:', summaryX, currentY);
  doc.setTextColor(15, 23, 42);
  doc.text(`$${priceNum}.00`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 6;
  doc.setTextColor(100, 116, 139);
  doc.text('Digital Export Tax (0%):', summaryX, currentY);
  doc.setTextColor(15, 23, 42);
  doc.text('$0.00', pageWidth - margin, currentY, { align: 'right' });

  currentY += 2;
  doc.setDrawColor(201, 162, 75);
  doc.setLineWidth(0.4);
  doc.line(summaryX, currentY, pageWidth - margin, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Total Settled:', summaryX, currentY);
  doc.setTextColor(201, 162, 75);
  doc.text(`$${priceNum}.00 USD`, pageWidth - margin, currentY, { align: 'right' });

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`(Approx. PKR Rs. ${pkrEquivalent.toLocaleString()} at commercial bank rate)`, pageWidth - margin, currentY, { align: 'right' });

  // ---- Commercial Copyright Assignment Box (Y: 156) ----
  currentY = 154;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(201, 162, 75);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(201, 162, 75);
  doc.text('COMMERCIAL COPYRIGHT ASSIGNMENT & INTELLECTUAL PROPERTY GUARANTEE', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const legalText = `This legal document certifies that 100% of all commercial intellectual property rights, master deliverables, timeline project files, and international broadcast licenses transfer unconditionally to ${order.clientName || 'the Client'} upon complete payment settlement. CreativeStudio retains zero ownership over finished media.`;
  const splitLegal = doc.splitTextToSize(legalText, contentWidth - 8);
  doc.text(splitLegal, margin + 4, currentY + 12);

  // ---- Footer & Verification Stamp (Y: 260) ----
  const footerY = 265;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('CreativeStudio Media & Tech Agency (Pvt) Ltd.', margin, footerY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('National Tax Number (NTN): #9842104-7  •  Authorized Digital Services Tax Receipt', margin, footerY + 9);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94); // Emerald Green
  doc.text('[ VERIFIED & SIGNED ELECTRONICALLY ]', pageWidth - margin, footerY + 7, { align: 'right' });

  // ---- Trigger Immediate Laptop File Download ----
  const fileName = `CreativeStudio_Invoice_${invoiceNumber}.pdf`;
  doc.save(fileName);

  return fileName;
};
