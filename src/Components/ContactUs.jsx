import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-section">
            <h3>Contact Information</h3>
            <p>Have questions or feedback? Reach out to us through any channel below:</p>
            
            <div className="contact-detail">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Our Location</h4>
                <p>123 Fashion Avenue, Gulberg III</p>
                <p>Lahore, Pakistan</p>
              </div>
            </div>
            
            <div className="contact-detail">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Phone Number</h4>
                <p>+92 300 123 4567</p>
                <p>Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
            
            <div className="contact-detail">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email Address</h4>
                <p>info@zil-e-noor.com</p>
                <p>support@zil-e-noor.com</p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">👔</a>
              <a href="#" className="social-icon">🎥</a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          
          {isSubmitted && (
            <div className="success-message">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required 
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3>What are your business hours?</h3>
            <p>Our customer support team is available Monday to Friday from 9:00 AM to 6:00 PM PKT. You can reach us via email 24/7.</p>
          </div>
          
          <div className="faq-card">
            <h3>How long does shipping take?</h3>
            <p>Standard shipping within Pakistan takes 3-5 business days. International shipping varies by location (7-14 business days).</p>
          </div>
          
          <div className="faq-card">
            <h3>Can I modify my order after placement?</h3>
            <p>Order modifications can be made within 1 hour of placement. Contact us immediately if you need changes.</p>
          </div>
          
          <div className="faq-card">
            <h3>Do you offer custom tailoring?</h3>
            <p>Yes! We offer custom tailoring services. Please contact us with your requirements for a personalized quote.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;