import React from 'react'
import "./TermAndCondition.css"
const TermsAndCondition = () => {
  return (
    
     <div className="terms-container">
      <a href="#top" className="terms-scroll-top">↑</a>
      <h1 className="terms-header">ZIL-E-NOOR TERMS & CONDITIONS</h1>
      <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="terms-section">
        <h2>1. Introduction</h2>
        <p>Welcome to Zil-E-Noor ("we", "us", or "our"). These Terms & Conditions govern your use of our website 
        located at www.zil-e-noor.com ("Site") and all related services. By accessing our Site, you agree to be bound 
        by these Terms. If you disagree with any part of these Terms, please refrain from using our Site.</p>
        
        <div className="terms-highlight">
          <strong>Note:</strong> Zil-E-Noor is a fictional e-commerce platform created for demonstration purposes. 
          These terms have no legal binding.
        </div>
      </div>

      <div className="terms-section">
        <h2>2. Intellectual Property</h2>
        <p>All content on this Site, including text, graphics, logos, and images, is the property of Zil-E-Noor or 
        its content suppliers and is protected by international copyright laws. The "Zil-E-Noor" name and logo are 
        registered trademarks of our fictional corporation.</p>
      </div>

      <div className="terms-section">
        <h2>3. User Accounts</h2>
        <p>When you create an account with us, you guarantee that the information you provide is accurate and complete. 
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that 
        occur under your account.</p>
      </div>

      <div className="terms-section">
        <h2>4. Products & Pricing</h2>
        <p>We strive to display accurate product information and prices, but errors may occur. We reserve the right to 
        correct any errors and to update product information at any time without notice. All prices are in PKR and are 
        exclusive of applicable taxes.</p>
      </div>

      <div className="terms-section">
        <h2>5. Orders & Payments</h2>
        <p>By placing an order through our Site, you agree to pay the full amount indicated. We accept various payment 
        methods as displayed during checkout. All payments are processed through our secure third-party payment gateway.</p>
      </div>

      <div className="terms-section">
        <h2>6. Shipping & Delivery</h2>
        <p>Shipping times are estimates only. We are not responsible for delays caused by shipping carriers or unforeseen 
        circumstances. Risk of loss passes to you upon delivery to the shipping carrier.</p>
      </div>

      <div className="terms-section">
        <h2>7. Returns & Exchanges</h2>
        <p>We accept returns within 14 days of delivery for unused items in original packaging. Return shipping costs are 
        the responsibility of the customer unless the item arrived damaged or defective.</p>
      </div>

      <div className="terms-section">
        <h2>8. Limitation of Liability</h2>
        <p>In no event shall Zil-E-Noor, nor its directors, employees, or partners, be liable for any indirect, incidental, 
        special, or consequential damages arising out of or in connection with your use of the Site.</p>
      </div>

      <div className="terms-section">
        <h2>9. Privacy</h2>
        <p>Your use of the Site is also governed by our Privacy Policy, which explains how we collect, use, and protect 
        your personal information.</p>
      </div>

      <div className="terms-section">
        <h2>10. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, 
        without regard to its conflict of law provisions.</p>
      </div>

      <div className="terms-section">
        <h2>11. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. The updated version will be indicated by a revised 
        "Last Updated" date. Your continued use of the Site after changes constitutes acceptance.</p>
      </div>

      <footer className="terms-footer">
        <p>© {new Date().getFullYear()} Zil-E-Noor (Fictional E-commerce Platform). All rights reserved in the realm of imagination.</p>
        <p>These terms are for demonstration purposes only and have no legal validity.</p>
      </footer>
    </div>
  )
}

export default TermsAndCondition
