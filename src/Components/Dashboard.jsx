// src/Components/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Action/authActions'
import './Dashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, token } = useSelector(state => state.auth)
    
    const [activeSection, setActiveSection] = useState('dashboard')
    const [stockType, setStockType] = useState('perfume')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // State for data
    const [staff, setStaff] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
    })

    // Form states
    const [newStaff, setNewStaff] = useState({ 
        name: '', 
        email: '', 
        password: '',
        role: 'staff'
    })
    const [newProduct, setNewProduct] = useState({ 
        name: '', 
        description: '', 
        price: '', 
        category: 'perfume',
        stock: '',
        sizes: [],
        colors: [],
        material: '',
        images: []
    })

    const isAdmin = user?.role === 'admin'
    const isStaff = user?.role === 'staff' || isAdmin

    // Fetch dashboard data
    useEffect(() => {
        if (user && token) {
            fetchDashboardData()
        } else {
            navigate('/login')
        }
    }, [user, token, navigate])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            await Promise.all([
                fetchProducts(),
                fetchOrders(),
                fetchStats()
            ])
        } catch (error) {
            setError('Failed to load dashboard data')
            console.error('Dashboard data error:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/getProducts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            
            if (data.success) {
                setProducts(data.data?.products || [])
            } else {
                throw new Error(data.message || 'Failed to fetch products')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            throw error
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/getAllOrders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            
            if (data.success) {
                setOrders(data.data?.orders || [])
            } else {
                throw new Error(data.message || 'Failed to fetch orders')
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            // If not admin, try to get user's orders
            if (!isAdmin) {
                try {
                    const userOrdersResponse = await fetch(`${API_BASE_URL}/orders/my-orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const userOrdersData = await userOrdersResponse.json()
                    if (userOrdersData.success) {
                        setOrders(userOrdersData.data?.orders || [])
                    }
                } catch (userError) {
                    console.error('Error fetching user orders:', userError)
                }
            }
        }
    }

    const fetchStats = async () => {
        // Calculate stats from existing data
        const totalProducts = products.length
        const totalOrders = orders.length
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        
        setStats({
            totalProducts,
            totalOrders,
            totalUsers: 0, // You might want to create a users endpoint
            totalRevenue
        })
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    // Staff Management Functions
    const handleAddStaff = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newStaff)
            })
            const data = await response.json()
            
            if (data.success) {
                setNewStaff({ name: '', email: '', password: '', role: 'staff' })
                setError('')
                // Refresh staff list - you might need a getUsers endpoint
                alert('Staff member added successfully')
            } else {
                setError(data.message || 'Failed to add staff member')
            }
        } catch (error) {
            setError('Network error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // Product Management Functions
    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE_URL}/products/createProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            })
            const data = await response.json()
            
            if (data.success) {
                setNewProduct({ 
                    name: '', 
                    description: '', 
                    price: '', 
                    category: 'perfume',
                    stock: '',
                    sizes: [],
                    colors: [],
                    material: '',
                    images: []
                })
                setError('')
                await fetchProducts() // Refresh products list
                alert('Product added successfully')
            } else {
                setError(data.message || 'Failed to add product')
            }
        } catch (error) {
            setError('Network error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateProduct = async (productId, updateData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/updateProduct/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            })
            const data = await response.json()
            
            if (data.success) {
                await fetchProducts() // Refresh products list
                alert('Product updated successfully')
            } else {
                setError(data.message || 'Failed to update product')
            }
        } catch (error) {
            setError('Network error: ' + error.message)
        }
    }

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/products/deleteProduct/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                
                if (data.success) {
                    await fetchProducts() // Refresh products list
                    alert('Product deleted successfully')
                } else {
                    setError(data.message || 'Failed to delete product')
                }
            } catch (error) {
                setError('Network error: ' + error.message)
            }
        }
    }

    // Order Management Functions
    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            })
            const data = await response.json()
            
            if (data.success) {
                await fetchOrders() // Refresh orders list
                alert('Order status updated successfully')
            } else {
                setError(data.message || 'Failed to update order status')
            }
        } catch (error) {
            setError('Network error: ' + error.message)
        }
    }

    const handleCancelOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                
                if (data.success) {
                    await fetchOrders() // Refresh orders list
                    alert('Order cancelled successfully')
                } else {
                    setError(data.message || 'Failed to cancel order')
                }
            } catch (error) {
                setError('Network error: ' + error.message)
            }
        }
    }

    // Filter products by category
    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category)
    }

    if (loading && !products.length) {
        return (
            <div className="dashboard-wrapper">
                <div className="loading">Loading Dashboard...</div>
            </div>
        )
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Dashboard</h1>
                    <p>Welcome back, {user?.name || user?.Name}!</p>
                    <span className="user-role">Role: {user?.role || 'user'}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')} className="close-error">×</button>
                </div>
            )}

            <div className="dashboard-content">
                <div className="sidebar">
                    <button 
                        className={`sidebar-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveSection('dashboard')}
                    >
                        📊 Dashboard
                    </button>
                    
                    {isAdmin && (
                        <>
                            <button 
                                className={`sidebar-btn ${activeSection === 'staff' ? 'active' : ''}`}
                                onClick={() => setActiveSection('staff')}
                            >
                                👥 Manage Staff
                            </button>
                            <button 
                                className={`sidebar-btn ${activeSection === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveSection('users')}
                            >
                                👤 Manage Users
                            </button>
                        </>
                    )}
                    
                    {isStaff && (
                        <>
                            <button 
                                className={`sidebar-btn ${activeSection === 'products' ? 'active' : ''}`}
                                onClick={() => setActiveSection('products')}
                            >
                                🛍️ Manage Products
                            </button>
                            <button 
                                className={`sidebar-btn ${activeSection === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveSection('orders')}
                            >
                                📦 Manage Orders
                            </button>
                        </>
                    )}
                    
                    <button 
                        className={`sidebar-btn ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        👤 My Profile
                    </button>
                </div>

                <div className="main-content">
                    {activeSection === 'dashboard' && (
                        <div className="dashboard-stats">
                            <h2>📊 Overview</h2>
                            <div className="stats-grid">
                                {isAdmin && (
                                    <div className="stat-card">
                                        <h3>Total Staff</h3>
                                        <p>{staff.length}</p>
                                        <small>Active team members</small>
                                    </div>
                                )}
                                <div className="stat-card">
                                    <h3>Total Products</h3>
                                    <p>{stats.totalProducts}</p>
                                    <small>Across all categories</small>
                                </div>
                                <div className="stat-card">
                                    <h3>Total Orders</h3>
                                    <p>{stats.totalOrders}</p>
                                    <small>All time orders</small>
                                </div>
                                <div className="stat-card">
                                    <h3>Total Revenue</h3>
                                    <p>Rs. {stats.totalRevenue.toLocaleString()}</p>
                                    <small>Lifetime revenue</small>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="quick-actions">
                                <h3>Quick Actions</h3>
                                <div className="action-buttons">
                                    {isStaff && (
                                        <>
                                            <button 
                                                className="action-btn"
                                                onClick={() => setActiveSection('products')}
                                            >
                                                Add New Product
                                            </button>
                                            <button 
                                                className="action-btn"
                                                onClick={() => setActiveSection('orders')}
                                            >
                                                View Orders
                                            </button>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <button 
                                            className="action-btn"
                                            onClick={() => setActiveSection('staff')}
                                        >
                                            Manage Staff
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'staff' && isAdmin && (
                        <div className="staff-management">
                            <h2>👥 Staff Management</h2>
                            
                            <div className="add-staff-form">
                                <h3>Add New Staff Member</h3>
                                <form onSubmit={handleAddStaff}>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={newStaff.name}
                                        onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={newStaff.email}
                                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={newStaff.password}
                                        onChange={(e) => setNewStaff({...newStaff, password: e.target.value})}
                                        required
                                    />
                                    <select
                                        value={newStaff.role}
                                        onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                                    >
                                        <option value="staff">Staff</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button type="submit" className="primary-btn" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Staff Member'}
                                    </button>
                                </form>
                            </div>

                            <div className="staff-list">
                                <h3>Current Staff Members</h3>
                                {staff.length > 0 ? (
                                    staff.map(member => (
                                        <div key={member._id} className="staff-item">
                                            <div className="staff-info">
                                                <strong>{member.name}</strong>
                                                <span>{member.email}</span>
                                                <span className={`role-badge ${member.role}`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                            <div className="staff-actions">
                                                <button className="edit-btn">Edit</button>
                                                <button className="remove-btn">Remove</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No staff members found.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeSection === 'products' && isStaff && (
                        <div className="product-management">
                            <h2>🛍️ Product Management</h2>
                            
                            <div className="add-product-form">
                                <h3>Add New Product</h3>
                                <form onSubmit={handleAddProduct}>
                                    <div className="form-row">
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Product Description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                        required
                                    />
                                    <div className="form-row">
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        >
                                            <option value="perfume">Perfume</option>
                                            <option value="kameezShalwar">Kameez Shalwar</option>
                                            <option value="suiting">Suiting</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Stock Quantity"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Material (optional)"
                                        value={newProduct.material}
                                        onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                                    />
                                    <button type="submit" className="primary-btn" disabled={loading}>
                                        {loading ? 'Adding Product...' : 'Add Product'}
                                    </button>
                                </form>
                            </div>

                            <div className="products-list">
                                <h3>All Products ({products.length})</h3>
                                <div className="products-grid">
                                    {products.map(product => (
                                        <div key={product._id} className="product-card">
                                            <img 
                                                src={product.images?.[0] || product.image || '/default-product.jpg'} 
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            <div className="product-info">
                                                <h4>{product.name}</h4>
                                                <p className="product-price">Rs. {product.price}</p>
                                                <p className="product-category">{product.category}</p>
                                                <p className="product-stock">Stock: {product.stock}</p>
                                            </div>
                                            <div className="product-actions">
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleUpdateProduct(product._id, { 
                                                        ...product, 
                                                        price: prompt('Enter new price:', product.price) 
                                                    })}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'orders' && isStaff && (
                        <div className="order-management">
                            <h2>📦 Order Management</h2>
                            
                            <div className="orders-list">
                                <h3>All Orders ({orders.length})</h3>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <div key={order._id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-info">
                                                    <strong>Order #{order._id.slice(-6)}</strong>
                                                    <span>Customer: {order.userId?.name || 'N/A'}</span>
                                                    <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="order-status">
                                                    <span className={`status-badge ${order.status}`}>
                                                        {order.status}
                                                    </span>
                                                    <strong>Total: Rs. {order.totalAmount}</strong>
                                                </div>
                                            </div>
                                            
                                            <div className="order-items">
                                                <h4>Items:</h4>
                                                {order.items?.map((item, index) => (
                                                    <div key={index} className="order-item">
                                                        <span>{item.productId?.name || 'Product'} x {item.quantity}</span>
                                                        <span>Rs. {item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="order-actions">
                                                {isAdmin && (
                                                    <select 
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                        className="status-select"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                )}
                                                <button 
                                                    className="cancel-btn"
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    disabled={order.status === 'cancelled' || order.status === 'delivered'}
                                                >
                                                    Cancel Order
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No orders found.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeSection === 'profile' && (
                        <div className="profile-management">
                            <h2>👤 My Profile</h2>
                            <div className="profile-info">
                                <div className="profile-field">
                                    <label>Name:</label>
                                    <span>{user?.name || user?.Name}</span>
                                </div>
                                <div className="profile-field">
                                    <label>Email:</label>
                                    <span>{user?.email}</span>
                                </div>
                                <div className="profile-field">
                                    <label>Role:</label>
                                    <span className={`role-badge ${user?.role}`}>{user?.role}</span>
                                </div>
                                <div className="profile-field">
                                    <label>Phone:</label>
                                    <span>{user?.phone || 'Not provided'}</span>
                                </div>
                                <div className="profile-field">
                                    <label>Address:</label>
                                    <span>{user?.address || 'Not provided'}</span>
                                </div>
                            </div>
                            
                            <div className="profile-actions">
                                <button className="primary-btn">Edit Profile</button>
                                <button className="primary-btn">Change Password</button>
                            </div>
                        </div>
                    )}

                    {(!isAdmin && !isStaff) && (
                        <div className="user-dashboard">
                            <h2>Welcome to Your Account</h2>
                            <p>You are logged in as a regular user.</p>
                            <div className="user-info">
                                <h3>Your Information</h3>
                                <p><strong>Name:</strong> {user?.Name || user?.name}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                                <p><strong>Address:</strong> {user?.address || 'Not provided'}</p>
                            </div>
                            
                            <div className="user-orders">
                                <h3>Your Orders</h3>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <div key={order._id} className="user-order">
                                            <p><strong>Order #{order._id.slice(-6)}</strong> - {order.status} - Rs. {order.totalAmount}</p>
                                            <button 
                                                onClick={() => handleCancelOrder(order._id)}
                                                disabled={order.status === 'cancelled' || order.status === 'delivered'}
                                                className="cancel-btn"
                                            >
                                                Cancel Order
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No orders yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard