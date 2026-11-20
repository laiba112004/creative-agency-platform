const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  serviceName: { type: String, required: true }, 
  packageTier: { type: String, required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  channelLink: { type: String },
  projectBrief: { type: String },
  footageLink: { type: String },
  addons: [{ type: String }],
  couponCode: { type: String },
  discountAmount: { type: Number, default: 0 },
  paymentMethod: { type: String, default: 'Credit Card' },
  transactionId: { type: String },
  paymentProofUrl: { type: String },
  paymentStatus: { 
    type: String, 
    enum: ['Pending Verification', 'Paid', 'Deposit Paid'], 
    default: 'Paid' 
  },
  status: { 
    type: String, 
    enum: ['Received', 'Assets Verified', 'In Editing', 'Ready for Review', 'Approved', 'Delivered'], 
    default: 'Received' 
  },
  price: { type: Number, required: true },
  reviewComments: [
    {
      timestamp: { type: String }, // e.g. "01:14"
      author: { type: String, default: 'Client' },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
