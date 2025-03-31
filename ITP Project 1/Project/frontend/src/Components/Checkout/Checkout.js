import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [items] = useState(state?.items || []);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const validateForm = () => {
    const newErrors = {};
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === 'card') {
      const orderId = `PP${Date.now()}${Math.floor(Math.random() * 1000)}`;
      navigate('/payhere-gateway', {
        state: {
          merchant: 'Plants & Plants Group',
          orderId,
          amount: total,
          items
        }
      });
    } else if (paymentMethod === 'cod') {
      // Create order for COD
      const order = {
        id: `ORD${Date.now()}`,
        items,
        total,
        paymentMethod: 'cod',
        status: 'pending',
        date: new Date().toISOString()
      };
      
      navigate('/order-confirmation', {
        state: { order }
      });
    }
  };

  const handleAddAddress = () => {
    navigate('/addDelivery');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h1>Checkout</h1>
        
        <div className="account-section">
          <p>Guest Checkout</p>
          <label>
            <input type="checkbox" defaultChecked />
            Email me with news and offers
          </label>
        </div>

        <div className="address-section">
          <h2>Delivery Information</h2>
          <button 
            className="add-address-btn"
            onClick={handleAddAddress}
          >
            + Add Delivery Address
          </button>
        </div>

        <div className="payment-section">
          <h2>Payment</h2>
          <p>All transactions are secure and encrypted.</p>
          
          <div className="payment-options">
            <div 
              className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
              onClick={() => {
                setPaymentMethod('card');
                setErrors(prev => ({ ...prev, paymentMethod: undefined }));
              }}
            >
              <h3>PayHere Payment Gateway</h3>
              <p>VISA • MASTER • Other Cards</p>
              <p>Secure card payment processed by PayHere</p>
              <div className="radio-container">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
              </div>
            </div>

            <div 
              className={`payment-method ${paymentMethod === 'cod' ? 'selected' : ''}`}
              onClick={() => {
                setPaymentMethod('cod');
                setErrors(prev => ({ ...prev, paymentMethod: undefined }));
              }}
            >
              <h3>Cash on Delivery (COD)</h3>
              <p>Pay when you receive your order</p>
              <div className="radio-container">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
              </div>
            </div>
          </div>
          {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}

          <button 
            type="submit" 
            className="pay-now-btn" 
            onClick={handleSubmit}
            disabled={!paymentMethod}
          >
            {paymentMethod === 'card' ? 'Proceed to Payment' : 'Place Order'}
          </button>
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        
        {items.map(item => (
          <div key={item.id} className="order-item">
            {item.image && (
              <img 
                src={`/images/${item.image.replace(/^\/?images\//, '')}`} 
                alt={item.name} 
              />
            )}
            <div>
              <h3>{item.name}</h3>
              <p>Rs {item.price.toFixed(2)} × {item.quantity || 1}</p>
            </div>
          </div>
        ))}

        <div className="price-breakdown">
          <div className="price-row">
            <span>Subtotal</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>LKR Rs {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="policy-links">
          <button className="policy-link">Refund policy</button>
          <button className="policy-link">Privacy policy</button>
          <button className="policy-link">Terms of service</button>
        </div>
      </div>
    </div>
  );
}