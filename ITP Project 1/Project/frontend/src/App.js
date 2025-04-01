import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Checkout from './Components/Checkout/Checkout';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import PayHereGateway from './Components/PayHereGateway/PayHereGateway';
import Nav from './Components/Nav/Nav';
import useCart from './Components/Cart/useCart';
import Cart from './Components/Cart/Cart';
import Success from './Components/Checkout/Success/Success';
import Wishlist from './Components/Wishlist/Wishlist';


function App() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [wishlist, setWishlist] = useState([]);


  const toggleWishlist = (plant) => {
    setWishlist(prevWishlist =>
      prevWishlist.some(item => item.id === plant.id)
        ? prevWishlist.filter(item => item.id !== plant.id)
        : [...prevWishlist, plant]
    );
  };


  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };


  return (
    <div>
      <Nav cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/payhere-gateway" element={<PayHereGateway />} />
        <Route
          path="/wishlist"
          element={<Wishlist wishlistItems={wishlist} removeFromWishlist={removeFromWishlist} />}
        />
        <Route path='/success' element={<Success />} />
      </Routes>
    </div>
  );
}


export default App;





