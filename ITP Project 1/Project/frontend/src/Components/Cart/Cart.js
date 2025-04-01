import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';


export default function Cart({ cartItems, addToCart, removeFromCart, clearCart }) {
    const navigate = useNavigate();


    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    const handleCheckout = () => {
        navigate('/checkout', { state: { items: cartItems, paymentMethod: 'card' } });
    };


    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src="/images/Plant1.jpg" alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>Rs {item.price.toLocaleString()}</p>
                                <div className="cart-controls">
                                    <button onClick={() => removeFromCart(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => addToCart(item)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h2>Total: Rs {totalPrice.toLocaleString()}</h2>


                    <button className="checkout-button" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                    <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
}





