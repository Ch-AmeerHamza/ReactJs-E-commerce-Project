import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser, logout } from '../Redux/Action/authActions'
import './Login.css'

const Login = () => {
    const [mode, setMode] = useState('register')
    const [registerData, setRegisterData] = useState({
        Name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [changePasswordData, setChangePasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { loading, error, user, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        setMessage(null)
    }, [mode])

    useEffect(() => {
        if (isAuthenticated && user) {
            handleUserRedirect(user)
        }
    }, [isAuthenticated, user, navigate])

    useEffect(() => {
        if (error) {
            setMessage({ type: 'error', text: error })
        }
    }, [error])

    const handleRegisterChange = (e) => {
        const { name, value } = e.target
        setRegisterData(prev => ({ ...prev, [name]: value }))
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
    }

    const handleChangePasswordChange = (e) => {
        const { name, value } = e.target
        setChangePasswordData(prev => ({ ...prev, [name]: value }))
    }

    const validateRegisterForm = () => {
        const { Name, email, phone, address, password } = registerData
        
        if (!Name.trim() || !email.trim() || !phone.trim() || !address.trim() || !password.trim()) {
            setMessage({ type: 'error', text: 'Please fill all fields.' })
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' })
            return false
        }

        const phoneRegex = /^\d{10,}$/
        const phoneDigits = phone.replace(/\D/g, '')
        if (!phoneRegex.test(phoneDigits)) {
            setMessage({ type: 'error', text: 'Please enter a valid phone number (at least 10 digits).' })
            return false
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' })
            return false
        }

        return true
    }

    const validateLoginForm = () => {
        const { email, password } = loginData
        
        if (!email.trim() || !password.trim()) {
            setMessage({ type: 'error', text: 'Please enter both email and password.' })
            return false
        }

        return true
    }

    const validateChangePasswordForm = () => {
        const { oldPassword, newPassword, confirmPassword } = changePasswordData
        
        if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setMessage({ type: 'error', text: 'Please fill all fields.' })
            return false
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' })
            return false
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New password and confirm password do not match.' })
            return false
        }

        if (oldPassword === newPassword) {
            setMessage({ type: 'error', text: 'New password must be different from old password.' })
            return false
        }

        return true
    }

    const handleUserRedirect = (user) => {
        if (!user) {
            navigate('/')
            return
        }

        const role = user.role || user.Role || user.userRole || 'user'
        const roleValue = role.toString().toLowerCase()

        const isAdminOrStaff = ['admin', 'staff', 'superadmin', 'manager'].includes(roleValue)

        if (isAdminOrStaff) {
            navigate('/dashboard')
        } else {
            navigate('/')
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateRegisterForm()) {
            return
        }

        setMessage(null)

        try {
            const requestData = {
                Name: registerData.Name.trim(),
                email: registerData.email.trim().toLowerCase(),
                password: registerData.password,
                phone: Number(registerData.phone.replace(/\D/g, '')),
                address: registerData.address.trim()
            }

            const result = await dispatch(registerUser(requestData))
            
            if (result.success) {
                setMessage({ type: 'success', text: 'Registered successfully! Please login.' })
                setRegisterData({ Name: '', email: '', phone: '', address: '', password: '' })
                setMode('login')
            } else {
                setMessage({ type: 'error', text: result.error || 'Registration failed. Please try again.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Registration failed. Please try again.' })
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateLoginForm()) {
            return
        }

        setMessage(null)

        try {
            const requestData = {
                email: loginData.email.trim().toLowerCase(),
                password: loginData.password
            }

            const result = await dispatch(loginUser(requestData))
            
            if (result.success) {
                setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
            } else {
                setMessage({ type: 'error', text: result.error || 'Login failed. Please check your credentials.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Login failed. Please try again.' })
        }
    }

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateChangePasswordForm()) {
            return
        }

        setMessage(null)

        try {
            const token = localStorage.getItem('authToken')
            if (!token) {
                setMessage({ type: 'error', text: 'You must be logged in to change password.' })
                return
            }

            const requestData = {
                oldPassword: changePasswordData.oldPassword,
                newPassword: changePasswordData.newPassword
            }

            const response = await fetch('http://localhost:8000/api/v1/users/change-password', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })

            const result = await response.json()

            if (response.ok) {
                setMessage({ type: 'success', text: result.message || 'Password changed successfully!' })
                setChangePasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
                
                setTimeout(() => {
                    dispatch(logout())
                    setMessage({ type: 'success', text: 'Please login again with your new password.' })
                    setMode('login')
                }, 2000)
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to change password. Please try again.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please check if the server is running.' })
        }
    }

    const isLoggedIn = isAuthenticated && user

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <button
                        className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => setMode('register')}
                    >
                        Register
                    </button>
                    <button
                        className={`mode-btn ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => setMode('login')}
                    >
                        Login
                    </button>
                </div>

                {message && (
                    <div className={`form-message ${message.type}`}>{message.text}</div>
                )}

                {mode === 'register' ? (
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <label>Name *</label>
                        <input 
                            name="Name"
                            value={registerData.Name} 
                            onChange={handleRegisterChange} 
                            placeholder="Enter your name"
                            disabled={loading}
                        />

                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={registerData.email} 
                            onChange={handleRegisterChange} 
                            placeholder="Enter your email"
                            disabled={loading}
                        />

                        <label>Phone *</label>
                        <input 
                            name="phone" 
                            value={registerData.phone} 
                            onChange={handleRegisterChange} 
                            placeholder="Enter your phone number"
                            disabled={loading}
                        />

                        <label>Address *</label>
                        <textarea 
                            name="address" 
                            value={registerData.address} 
                            onChange={handleRegisterChange} 
                            placeholder="Enter your address"
                            disabled={loading}
                        />

                        <label>Set Password *</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={registerData.password} 
                            onChange={handleRegisterChange} 
                            placeholder="Set your password"
                            disabled={loading}
                        />

                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                ) : mode === 'login' ? (
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={loginData.email} 
                            onChange={handleLoginChange} 
                            placeholder="Enter your email"
                            disabled={loading}
                        />

                        <label>Password *</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={loginData.password} 
                            onChange={handleLoginChange} 
                            placeholder="Enter your password"
                            disabled={loading}
                        />

                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {isLoggedIn && (
                            <div className="change-password-link">
                                <button 
                                    type="button"
                                    className="link-btn" 
                                    onClick={() => setMode('change-password')}
                                >
                                    Change Password
                                </button>
                            </div>
                        )}
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleChangePasswordSubmit}>
                        <h3>Change Your Password</h3>
                        
                        <label>Old Password *</label>
                        <input 
                            type="password" 
                            name="oldPassword"
                            value={changePasswordData.oldPassword} 
                            onChange={handleChangePasswordChange} 
                            placeholder="Enter your old password"
                            disabled={loading}
                        />

                        <label>New Password *</label>
                        <input 
                            type="password" 
                            name="newPassword"
                            value={changePasswordData.newPassword} 
                            onChange={handleChangePasswordChange} 
                            placeholder="Enter your new password"
                            disabled={loading}
                        />

                        <label>Confirm New Password *</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={changePasswordData.confirmPassword} 
                            onChange={handleChangePasswordChange} 
                            placeholder="Confirm your new password"
                            disabled={loading}
                        />

                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </form>
                )}

                <div className="login-footer">
                    {mode === 'register' ? (
                        <p>
                            Already have an account?{' '}
                            <button className="link-btn" onClick={() => setMode('login')}>Login</button>
                        </p>
                    ) : mode === 'login' ? (
                        <p>
                            Don't have an account?{' '}
                            <button className="link-btn" onClick={() => setMode('register')}>Register</button>
                        </p>
                    ) : (
                        <p>
                            <button className="link-btn" onClick={() => setMode('login')}>Back to Login</button>
                            {' '} | {' '}
                            <button className="link-btn" onClick={() => setMode('register')}>Register</button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login