import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './Home.css';


export default function Home({ addToCart }) {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [wishlist, setWishlist] = useState([]);


  // Hardcoded userId
  const userId = '660c5b8f0d3f2b001f3d3e4a';


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
        const data = await response.json();
        if (data.success) {
          setWishlist(data.wishlist.products.map(p => p.productId._id));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };


    fetchProducts();
    fetchWishlist();
  }, []);


  const handleWishlistToggle = async (plant) => {
    try {
      const isWishlisted = wishlist.includes(plant._id);
      const url = `http://localhost:5000/api/wishlist/${isWishlisted ? 'remove' : 'add'}`;
      const method = 'POST';


      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: plant._id
        })
      });


      const data = await response.json();
      if (data.success) {
        setWishlist(prev => isWishlisted
          ? prev.filter(id => id !== plant._id)
          : [...prev, plant._id]
        );
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };


  return (
    <div className="home">
      <h1>Potted Plants Collection</h1>
      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant._id} className="plant-card">
            <img src="/images/Plant1.jpg" alt={plant.name} className="plant-image" />
            <h3>{plant.name}</h3>
            <p>Rs {plant.price.toLocaleString()}</p>
            <div className="buttons">
              <button onClick={() => navigate('/checkout', { state: { items: [plant] } })}>
                Buy Now
              </button>
              <button onClick={() => addToCart({ ...plant, id: plant._id })}>
                Add to Cart
              </button>
              <FaHeart
                className={`wishlist-icon ${wishlist.includes(plant._id) ? 'active' : ''}`}
                onClick={() => handleWishlistToggle(plant)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





