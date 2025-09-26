import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const formData = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate form processing
        setShowSuccess(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setShowSuccess(false)
            setUserInfo({
                name: "",
                email: "",
                address: "",
                phone: "",
            })
        }, 3000)
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className={`login-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Toggle Button */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isSidebarOpen ? '✕' : '📝'}
            </button>

            {/* Success Message */}
            {showSuccess && (
                <div className="success-message">
                    <div className="success-content">
                        <span className="success-icon">✓</span>
                        <h3>Order Placed Successfully!</h3>
                        <p>Thank you for your purchase. Your order will be delivered soon.</p>
                    </div>
                </div>
            )}

            {/* Sidebar Form */}
            <div className="login-sidebar">
                <div className="sidebar-header">
                    <h2>Checkout Information</h2>
                    <p>Complete your order details</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="exampleInputName" className="form-label">
                            <span className="label-icon">👤</span>
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputName" 
                            name='name' 
                            value={userInfo.name}  
                            onChange={formData}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <span className="label-icon">📧</span>
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            name='email' 
                            value={userInfo.email} 
                            onChange={formData}
                            required
                        />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputAddress" className="form-label">
                            <span className="label-icon">🏠</span>
                            Delivery Address
                        </label>
                        <textarea 
                            className="form-control" 
                            id="exampleInputAddress" 
                            name='address' 
                            value={userInfo.address} 
                            onChange={formData}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPhone" className="form-label">
                            <span className="label-icon">📱</span>
                            Phone Number
                        </label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="exampleInputPhone" 
                            name='phone' 
                            value={userInfo.phone} 
                            onChange={formData}
                            required
                        />
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            I accept the terms and conditions
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">
                        Place Order
                        <span className="btn-icon">→</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login