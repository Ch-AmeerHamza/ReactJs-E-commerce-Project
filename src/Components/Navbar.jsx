import React from 'react'
import "./Navbar.css"
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
const getData = useSelector((state) => state.card.cart);
console.log("Data in header",getData);
  return (
    <div >
      <div className='mainOutline'>
        <div className='left'>
        <div className='left-tags'>
            <Link to="/kameez">Kameez Shalwar</Link>
            <Link to="/suiting">Suiting</Link>
            <Link to="/perfumes">Perfumes</Link>
        </div>
        </div>
        <div className='moon'>
            <img src="https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-3d-crescent-moon-illustration-png-image_11481731.png" alt="" />
        </div>
        <div className='name'><Link to="/">Zil-E-Noor</Link></div>
        <div className='right'>
           <div className='search'>
            <input type="text" placeholder='Search' />
            <button>Search</button>
           <div className="cart">
  <Link to="/cart" className="cart-link">
    <Badge badgeContent={getData.length} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  </Link>
</div>

           </div>
           
            <div className='profile'>
              <Link to="/login"><PersonIcon /></Link>
            </div>
            </div>
        </div>
      </div>

  )
}

export default Navbar
