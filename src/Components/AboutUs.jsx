import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Discover the journey behind Zil-E-Noor</p>
        </div>
      </div>

      <div className="about-section">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            Zil-E-Noor is more than just a fashion brand - we're a celebration of cultural heritage, modern 
            elegance, and personal expression. Founded in 2023, we've quickly become a destination for those 
            seeking premium Pakistani fashion that bridges traditional craftsmanship with contemporary design.
          </p>
          <p>
            Our name "Zil-E-Noor" translates to "Ray of Light" - reflecting our mission to help our customers 
            shine with confidence through clothing that celebrates their unique identity.
          </p>
        </div>
        <div className="about-image">
          <div className="placeholder-image" style={{ backgroundColor: '#f0e6f5' }}>
            <div className="placeholder-text">Traditional Craftsmanship</div>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="mission-card">
          <h3>Our Mission</h3>
          <p>
            To empower individuals to express their cultural pride and personal style through meticulously 
            crafted clothing that blends tradition with contemporary fashion.
          </p>
        </div>
        
        <div className="mission-card">
          <h3>Our Vision</h3>
          <p>
            To become the leading global ambassador of Pakistani fashion, preserving heritage techniques while 
            innovating for modern lifestyles.
          </p>
        </div>
      </div>

      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎨</div>
            <h4>Authenticity</h4>
            <p>Staying true to our cultural roots while embracing innovation</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🧵</div>
            <h4>Craftsmanship</h4>
            <p>Meticulous attention to detail in every stitch</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h4>Sustainability</h4>
            <p>Ethical production and eco-conscious practices</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">💖</div>
            <h4>Customer Love</h4>
            <p>Exceptional experiences beyond just transactions</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Family</h2>
        <p>
          Zil-E-Noor is powered by a passionate team of designers, artisans, and fashion enthusiasts who 
          bring diverse talents to create our collections. From our master tailors with decades of experience 
          to our digital innovators, we're united by our love for Pakistani fashion.
        </p>
        
        <div className="founder-highlight">
          <div className="founder-image">
            <div className="placeholder-image" style={{ backgroundColor: '#e8d4f0' }}>
              <div className="placeholder-text">Ameer Hamza</div>
            </div>
          </div>
          <div className="founder-bio">
            <h3>Ameer Hamza, Founder</h3>
            <p>
              "At 20 years old, I founded Zil-E-Noor with a vision to create a fashion brand that honors 
              our heritage while speaking to modern sensibilities. My diverse background in business, martial 
              arts, and creative pursuits informs our unique approach to design and customer experience."
            </p>
            <Link to="/founder" className="bio-link">Learn more about our founder →</Link>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Join Our Journey</h2>
        <p>
          Experience the Zil-E-Noor difference - where tradition meets contemporary elegance. 
          Explore our collections and become part of our story.
        </p>
        <div className="cta-buttons">
          <Link to="/kameez" className="cta-button">Shop Collections</Link>
          <Link to="/contact" className="cta-button-outline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;