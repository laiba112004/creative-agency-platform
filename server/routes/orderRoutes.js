const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  addReviewComment,
  deleteOrder
} = require('../controllers/orderController');

// /api/orders
router.route('/')
  .post(createOrder)
  .get(getOrders);

// /api/orders/:id
router.route('/:id')
  .get(getOrderById)
  .delete(deleteOrder);

// /api/orders/:id/status
router.route('/:id/status')
  .patch(updateOrderStatus);

// /api/orders/:id/comments
router.route('/:id/comments')
  .post(addReviewComment);

module.exports = router;
