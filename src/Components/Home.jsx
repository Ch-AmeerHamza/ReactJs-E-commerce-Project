import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import "./Home.css";
import { Link } from 'react-router-dom';
const Home = () => {
  const typedElement = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedElement.current, {
      strings: [
        "Zil-e-Noor",
        "<i>Traditional Elegance</i>",
        "Luxury Suiting",
        "Crafted for Royalty",
        "Zil-e-Noor Collection"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => {
      typedInstance.current.destroy();
    };
  }, []);

  return (
    <div className='backGround'>
      <div className='Left'>
        <ul>
          <li><Link to="/kameez">Kameez Shalwar</Link></li>
          <li><Link to="/suiting">Suiting</Link></li>
          <li><Link to="/perfumes">Perfumes</Link></li>
        </ul>
      </div>
      <div className='Right'>
        <img 
          src="https://png.pngtree.com/png-clipart/20221007/ourmid/pngtree-gold-moon-png-image_6289922.png" 
          alt="Moon" 
        />
        <span ref={typedElement} className="typedText"></span>
      </div>
    </div>
  );
};

export default Home;
