const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card'],
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'processing'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);