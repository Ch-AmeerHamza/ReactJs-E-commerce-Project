import React from 'react';
import { Link } from 'react-router-dom'; // Added missing import
import "./FounderInfo.css"

const FounderInfo = () => {
  return (
    <div className="founder-container">
      <div className="founder-header">
        <h1>Meet the Founder</h1>
        <p className="founder-tagline">Passion • Vision • Excellence</p>
      </div>

      <div className="founder-content">
        <div className="founder-profile">
          <div className="founder-image-container">
            <div className="founder-image-placeholder">
              <div className="initials">AH</div>
            </div>
          </div>
          
          <div className="founder-details">
            <h2>Ameer Hamza</h2>
            <p className="founder-title">Founder & CEO, Zil-E-Noor</p>
            <div className="founder-age-tag">20 Years Young</div>
            
            <div className="founder-quote">
              "Building Zil-E-Noor isn't just about fashion - it's about creating a legacy of excellence 
              and empowering others to shine with confidence."
            </div>
          </div>
        </div>

        <div className="founder-story">
          <h3>My Journey</h3>
          <p>
            At just 20 years old, I've embarked on an entrepreneurial journey fueled by passion and a relentless 
            drive to create something meaningful. Zil-E-Noor was born from my desire to blend traditional elegance 
            with contemporary style, offering premium fashion that helps our customers express their unique identity.
          </p>
          
          <p>
            Growing up, I was always fascinated by how clothing transforms confidence and perception. This insight, 
            combined with my passion for business, led to the creation of Zil-E-Noor - a brand that celebrates 
            individuality and craftsmanship.
          </p>
        </div>

        <div className="passion-grid">
          <h3>Beyond Business: My Passions</h3>
          <div className="passion-cards">
            <div className="passion-card">
              <div className="passion-icon">🥋</div>
              <h4>Martial Artist</h4>
              <p>Practicing discipline and focus through martial arts for 1+ year</p>
            </div>
            
            <div className="passion-card">
              <div className="passion-icon">♟️</div>
              <h4>Chess Player</h4>
              <p>Competitive chess enthusiast who sees business as a strategic game</p>
            </div>
            
            <div className="passion-card">
              <div className="passion-icon">🏃‍♂️</div>
              <h4>Long Distance Runner</h4>
              <p>Completed multiple half-marathons - endurance is my superpower</p>
            </div>
            
            <div className="passion-card">
              <div className="passion-icon">📚</div>
              <h4>Avid Reader</h4>
              <p>Constantly learning through business, philosophy, and biographies</p>
            </div>
            
            <div className="passion-card">
              <div className="passion-icon">🎤</div>
              <h4>Public Speaker</h4>
              <p>Sharing insights on youth entrepreneurship and personal development</p>
            </div>
            
            <div className="passion-card">
              <div className="passion-icon">💡</div>
              <h4>Startup Enthusiast</h4>
              <p>Actively mentoring young entrepreneurs and exploring new ventures</p>
            </div>
          </div>
        </div>

        <div className="founder-vision">
          <h3>The Zil-E-Noor Vision</h3>
          <p>
            I founded Zil-E-Noor with a clear vision: to create more than just a clothing brand. We're building 
            a community that celebrates cultural heritage while embracing modern design. Every piece we create 
            carries our commitment to quality, ethical production, and empowering self-expression.
          </p>
          
          <p>
            At 20, I'm just getting started. My journey as a young entrepreneur has taught me that age is no barrier 
            to creating something remarkable. With Zil-E-Noor, I'm determined to prove that passion, combined with 
            relentless execution, can build something truly special.
          </p>
        </div>

        <div className="connect-section">
          <h3>Connect With Me</h3>
          <p>
            I'm always open to connecting with fellow entrepreneurs, creators, and customers. 
            Let's build something great together!
          </p>
          <Link to="/contact" className="connect-button">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}

export default FounderInfo; // Corrected export name