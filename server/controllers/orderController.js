const Order = require('../models/Order');

// @desc    Create new order / project brief with add-ons & payment details
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      serviceName,
      packageTier,
      price,
      clientName,
      clientEmail,
      channelLink,
      projectBrief,
      footageLink,
      addons,
      couponCode,
      discountAmount,
      paymentMethod,
      transactionId,
      paymentProofUrl,
      paymentStatus
    } = req.body;

    if (!serviceName || !packageTier || !price || !clientName || !clientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: serviceName, packageTier, price, clientName, clientEmail'
      });
    }

    const newOrder = new Order({
      serviceName,
      packageTier,
      price,
      clientName,
      clientEmail,
      channelLink,
      projectBrief,
      footageLink,
      addons: addons || [],
      couponCode: couponCode || '',
      discountAmount: discountAmount || 0,
      paymentMethod: paymentMethod || 'Credit Card',
      transactionId: transactionId || '',
      paymentProofUrl: paymentProofUrl || '',
      paymentStatus: paymentStatus || (paymentMethod === 'Credit Card' ? 'Paid' : 'Pending Verification'),
      status: 'Received'
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching single order:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Received', 'Assets Verified', 'In Editing', 'Ready for Review', 'Approved', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const addReviewComment = async (req, res) => {
  try {
    const { timestamp, author, comment } = req.body;
    if (!comment) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.reviewComments.push({
      timestamp: timestamp || '00:00',
      author: author || 'Client',
      comment
    });

    await order.save();
    return res.status(201).json({ success: true, data: order.reviewComments });
  } catch (error) {
    console.error('Error adding review comment:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, message: 'Order successfully deleted' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  addReviewComment,
  deleteOrder
};
