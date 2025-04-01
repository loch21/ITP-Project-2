import { useNavigate } from 'react-router-dom';
import './Nav.css';


function Nav({ cartCount }) {
  const navigate = useNavigate();


  return (
    <nav className="nav">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Shop</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/wishlist">Wishlist</a></li>
      </ul>
      <button className="cart-button" onClick={() => navigate('/cart')}>
        🛒 Cart <span className="cart-count">{cartCount}</span>
      </button>
    </nav>
  );
}


export default Nav;





