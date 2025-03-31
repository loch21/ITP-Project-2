import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const plants = [
  {
    id: 1,
    name: 'Philodendron Congo Rojo',
    price: 12500,
    image: '/images/plant1.jpg'
  },
  {
    id: 2,
    name: 'Monstera Deliciosa',
    price: 8500,
    image: '/images/plant2.jpg'
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    price: 9500,
    image: '/images/plant3.jpg'
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Potted Plants Collection</h1>
      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant.id} className="plant-card">
             <img src="/images/plant1.jpg" alt="Beautiful Plant 1" className="plant-image" />
            <h3>{plant.name}</h3>
            <p>Rs {plant.price.toLocaleString()}</p>
            <button onClick={() => navigate('/checkout', { state: { items: [plant] } })}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}