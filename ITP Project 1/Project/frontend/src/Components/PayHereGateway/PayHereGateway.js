import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PayHereGateway.css';

export default function PayHereGateway() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { merchant = 'Plants & Plants Group', orderId = '', amount = 0 } = state || {};
  
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [savedCards, setSavedCards] = useState([]);
  const [useSavedCard, setUseSavedCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [errors, setErrors] = useState({});
  const [saveCardOption, setSaveCardOption] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Load saved cards from localStorage on component mount
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    setSavedCards(storedCards);
  }, []);

  // Validate card details
  const validateCard = () => {
    const newErrors = {};
    
    if (useSavedCard) {
      if (!selectedCardId) {
        newErrors.savedCard = 'Please select a saved card';
      }
    } else {
      if (!cardDetails.name.trim()) {
        newErrors.name = 'Card holder name is required';
      }
      
      const cardNumber = cardDetails.number.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.number = 'Please enter a valid 16-digit card number';
      }
      
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Format card number with spaces
    if (name === 'number') {
      const formattedValue = value.replace(/\s/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim()
        .slice(0, 19);
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiry') {
      const cleaned = value.replace(/[^\d]/g, '');
      let formattedValue = cleaned;
      
      if (cleaned.length > 2) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setCardDetails(prev => ({ 
        ...prev, 
        [name]: formattedValue.slice(0, 5) 
      }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  // Save current card to storage
  const handleSaveCard = () => {
    if (!validateCard()) return;
    
    const newCard = {
      id: Date.now(),
      last4: cardDetails.number.slice(-4),
      name: cardDetails.name,
      expiry: cardDetails.expiry,
      maskedNumber: `•••• •••• •••• ${cardDetails.number.slice(-4)}`
    };
    
    const updatedCards = [...savedCards, newCard];
    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    alert('Card saved successfully!');
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (cardId) => {
    setCardToDelete(cardId);
    setShowDeleteModal(true);
  };

  // Delete a saved card
  const handleDeleteCard = () => {
    const updatedCards = savedCards.filter(card => card.id !== cardToDelete);
    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    
    if (selectedCardId === cardToDelete) {
      setSelectedCardId(null);
    }
    
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  // Process payment
  const handlePayment = (e) => {
    e.preventDefault();
    if (!validateCard()) return;
    
    const paymentData = useSavedCard
      ? savedCards.find(card => card.id === selectedCardId)
      : {
          ...cardDetails,
          last4: cardDetails.number.slice(-4),
          maskedNumber: `•••• •••• •••• ${cardDetails.number.slice(-4)}`
        };
    
    navigate('/payment-success', {
      state: {
        orderId,
        amount,
        paymentMethod: 'card',
        cardInfo: paymentData
      }
    });
  };

  return (
    <div className="payhere-container">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Card</h3>
            <p>Are you sure you want to delete this card?</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-button"
                onClick={handleDeleteCard}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="payhere-header">
        <h1>PayHere</h1>
        <div className="merchant-info">
          <h2>{merchant}</h2>
          <p>Order ID: {orderId || 'N/A'}</p>
          <p className="amount">Rs. {amount.toFixed(2)}</p>
        </div>
      </div>

      <div className="payment-options">
        <div className="payment-tabs">
          <button className="active">Bank Card</button>
          <button>Bank Account</button>
          <button>Other</button>
        </div>

        <form onSubmit={handlePayment} className="card-form">
          {/* Saved cards section */}
          {savedCards.length > 0 && (
            <div className="saved-cards-section">
              <label className="saved-cards-toggle">
                <input
                  type="checkbox"
                  checked={useSavedCard}
                  onChange={() => {
                    setUseSavedCard(!useSavedCard);
                    setErrors(prev => ({ ...prev, savedCard: undefined }));
                  }}
                />
                Use saved card
              </label>

              {useSavedCard && (
                <div className="saved-cards-list">
                  {savedCards.map(card => (
                    <div
                      key={card.id}
                      className={`saved-card ${selectedCardId === card.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedCardId(card.id);
                        setErrors(prev => ({ ...prev, savedCard: undefined }));
                      }}
                    >
                      <div className="card-info">
                        <span className="card-number">{card.maskedNumber}</span>
                        <span className="card-name">{card.name}</span>
                        <span className="card-expiry">Exp: {card.expiry}</span>
                      </div>
                      <button
                        type="button"
                        className="delete-card"
                        onClick={(e) => {
                          e.stopPropagation();
                          showDeleteConfirmation(card.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {errors.savedCard && <span className="error-message">{errors.savedCard}</span>}
                </div>
              )}
            </div>
          )}

          {/* New card form (shown when not using saved card) */}
          {!useSavedCard && (
            <>
              <div className="form-group">
                <label>Card Holder's Name</label>
                <input
                  type="text"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                  className={errors.number ? 'error' : ''}
                />
                {errors.number && <span className="error-message">{errors.number}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    className={errors.expiry ? 'error' : ''}
                  />
                  {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    required
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>

              <div className="save-card-option">
                <label>
                  <input
                    type="checkbox"
                    checked={saveCardOption}
                    onChange={() => setSaveCardOption(!saveCardOption)}
                  />
                  Save this card for future payments
                </label>
                {saveCardOption && (
                  <button
                    type="button"
                    className="save-card-button"
                    onClick={handleSaveCard}
                  >
                    Save Card
                  </button>
                )}
              </div>
            </>
          )}

          <button type="submit" className="pay-button">
            Pay {amount.toFixed(2)}
          </button>
        </form>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Site
      </button>
    </div>
  );
}