import React from 'react'
import "./Navbar.css"
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartState = useSelector((state) => state.cart || {});
  
  const cartItems = cartState.cartItems || [];
  const totalItems = cartState.totalItems || 0;

  const authState = useSelector((state) => state.auth || {});
  const user = authState.user || {};
  const isAuthenticated = authState.isAuthenticated || false;

  return (
    <div className='navbar-container'>
      <div className='mainOutline'>
        <div className='left'>
          <div className='left-tags'>
            <Link to="/kameez" className='nav-link'>Kameez Shalwar</Link>
            <Link to="/suiting" className='nav-link'>Suiting</Link>
            <Link to="/perfumes" className='nav-link'>Perfumes</Link>
          </div>
        </div>
        
        <div className='moon'>
          <img 
            src="https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-3d-crescent-moon-illustration-png-image_11481731.png" 
            alt="Zil-E-Noor Logo" 
            className='moon-logo'
          />
        </div>
        
        <div className='name'>
          <Link to="/" className='brand-link'>Zil-E-Noor</Link>
        </div>
        
        <div className='right'>
          <div className='search'>
            <input type="text" placeholder='Search products...' className='search-input' />
            <button className='search-btn'>Search</button>
            
            <div className="cart">
              <Link to="/cart" className="cart-link">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon className='cart-icon' />
                </Badge>
              </Link>
            </div>
          </div>
           
          <div className='profile'>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className='profile-link'>
              <PersonIcon className='profile-icon' />
              {isAuthenticated && (
                <span className="user-indicator">
                  {user.name || user.Name || 'User'}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar