import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';


export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [items] = useState(state?.items || []);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    rememberMe: false
  });
  const [codDetails, setCodDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState({});


  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const total = subtotal;


  const validateForm = () => { // validation for card payment details
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardDetails.nameOnCard.trim()) {
        newErrors.nameOnCard = 'Name on card is required';
      }
      if (!cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Enter expiry as MM/YY';
      }
      if (!cardDetails.cvv.match(/^\d{3}$/)) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
      if (!cardDetails.billingAddress.trim()) {
        newErrors.billingAddress = 'Billing address is required';
      }
    } else {
      if (!codDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!codDetails.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter a valid 10-digit phone number';
      if (!codDetails.address.trim()) newErrors.address = 'Address is required';
      if (!codDetails.city.trim()) newErrors.city = 'City is required';
      if (!codDetails.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;


    const orderId = `PP${Date.now()}${Math.floor(Math.random() * 1000)}`;


    if (paymentMethod === 'card') {
      navigate('/success');
    } else {
      navigate('/cod-confirmation', { // spcify the dilvery details path
        state: {
          orderId,
          amount: total,
          items,
          details: codDetails
        }
      });
    }
  };


  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>


        <div className="payment-method-selection">
          <button
            className={`payment-btn ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            Pay with Card
          </button>


          <button
            className={`payment-btn ${paymentMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            Cash on Delivery
          </button>
        </div>


        {paymentMethod === 'card' ? (
          <div className="checkout-form">
            <h2>Payment Details</h2>
            <label>Card Number</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}


            <label>Name on Card</label>
            <input
              type="text"
              value={cardDetails.nameOnCard}
              onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
              placeholder="John Doe"
            />
            {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}


            <div className="card-row">
              <div>
                <label>Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            </div>


            <label>Billing Address</label>
            <input
              type="text"
              value={cardDetails.billingAddress}
              onChange={(e) => setCardDetails({ ...cardDetails, billingAddress: e.target.value })}
              placeholder="123 Street, City, Country"
            />
            {errors.billingAddress && <p className="error">{errors.billingAddress}</p>}
          </div>
        ) : (
            <div className="checkout-form">
            <h2>Cash on Delivery Details</h2>
            <label>Full Name</label>
            <input
              type="text"
              value={codDetails.fullName}
              onChange={(e) => setCodDetails({ ...codDetails, fullName: e.target.value })}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}


            <label>Phone Number</label>
            <input
              type="text"
              value={codDetails.phone}
              onChange={(e) => setCodDetails({ ...codDetails, phone: e.target.value })}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}


            <label>Email Address</label>
            <input
              type="email"
              value={codDetails.email}
              onChange={(e) => setCodDetails({ ...codDetails, email: e.target.value })}
            />
            {errors.email && <p className="error">{errors.email}</p>}


            <label>Address</label>
            <input
              type="text"
              value={codDetails.address}
              onChange={(e) => setCodDetails({ ...codDetails, address: e.target.value })}
            />
            {errors.address && <p className="error">{errors.address}</p>}


            <label>City</label>
            <input
              type="text"
              value={codDetails.city}
              onChange={(e) => setCodDetails({ ...codDetails, city: e.target.value })}
            />
            {errors.city && <p className="error">{errors.city}</p>}


            <label>Postal Code</label>
            <input
              type="text"
              value={codDetails.postalCode}
              onChange={(e) => setCodDetails({ ...codDetails, postalCode: e.target.value })}
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>
        )}


        <button className="pay-now-btn" onClick={handleSubmit}>Proceed</button>
      </div>


      <div className="order-summary-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="order-item">
              <h3>{item.name}</h3>
              <p>Rs {item.price.toFixed(2)} × {item.quantity || 1}</p>
            </div>
          ))}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Total</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





