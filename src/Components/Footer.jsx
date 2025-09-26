import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (
    <div>
      <div className='BackGround'>
        <div className='Row1'>
            <div className='footer-Moon'>
                <img src="https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-3d-crescent-moon-illustration-png-image_11481731.png" alt="" />
                <div className='Zil-name'>Zil-E-Noor</div>
                <div className='founder'><Link to="/founder">Founder of Zil-E-Noor</Link></div>
                <div className='Founder-name'>Ameer Hamza</div>
                <div className='date'>Since(2023)</div>
            </div>
        </div>
        <div className='Row2'>
            <div className='quick'>Quick Links</div>
            <div className='quick-tags'>
                <ul>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="contact">Contact Us</Link></li>
                    <li><Link to="/term">Term and Conditions</Link></li>
                    <li><a href="">Blog</a></li>
                    
                </ul>
            </div>
        </div>
        <div className='Row3'>
            <div className='help'><a href="">Need Help?</a></div>
            <div className='work'>Working Hours: <b> Mon - Sat (9AM - 9PM) </b></div>
            <div className='phone'>Contact: +923110000500</div>
            <div className='mail'>IwillNotTell@gamil.com</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
