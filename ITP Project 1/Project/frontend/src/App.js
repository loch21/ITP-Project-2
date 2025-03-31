import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Checkout from './Components/Checkout/Checkout';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import PayHereGateway from './Components/PayHereGateway/PayHereGateway';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/payhere-gateway" element={<PayHereGateway />} />
      </Routes>
    </div>
  );
}

export default App;