import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) {
    return (
      <div className="confirmation-container">
        <h2>Order Not Found</h2>
        <p>We couldn't find your order details.</p>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1>Order Confirmation</h1>
      <div className="confirmation-details">
        <h2>Thank you for your order!</h2>
        <p>Order ID: {order.id}</p>
        <p>Status: {order.status}</p>
        <p>Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
        
        {order.paymentMethod === 'card' && (
          <div className="payment-info">
            <p>Card: {order.cardInfo?.maskedNumber || '•••• •••• •••• ' + (order.cardInfo?.last4 || '')}</p>
          </div>
        )}

        <div className="order-summary">
          <h3>Order Summary</h3>
          {order.items?.map(item => (
            <div key={item.id} className="order-item">
              <p>{item.name} × {item.quantity || 1}</p>
              <p>Rs {item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="total-row">
            <p>Total:</p>
            <p>Rs {order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="delivery-info">
          <h3>Delivery Information</h3>
          <p>Your order will be delivered within 3-5 business days.</p>
          {order.paymentMethod === 'cod' && (
            <p>Please have the exact amount ready for the delivery person.</p>
          )}
        </div>
      </div>
    </div>
  );
}