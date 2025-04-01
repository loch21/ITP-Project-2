import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';


export default function Success() {
    const navigate = useNavigate();


    return (
        <div className="success-container">
            <div className="success-message">
                <h1>🎉 Your order is successful! 🎉</h1>
                <p>Thank you for your purchase. Your order is being processed.</p>
                <button onClick={() => navigate('/')} className="home-button">
                    Back to Home
                </button>
                <p className="delivery-link">
                    <a
                        onClick={() => navigate('/delivery-details')}
                        className="add-delivery-details"
                    >
                        Add Delivery Details
                    </a>
                </p>
            </div>
        </div>
    );
}





