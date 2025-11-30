import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  removeFromCart, 
  updateCartQuantity, 
  clearCart,
  removeFromBackendCart,
  updateBackendCartQuantity,
  clearBackendCart,
  createOrder,
  syncCartWithBackend
} from '../Redux/Action/cartActions';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    country: 'Pakistan'
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(syncCartWithBackend());
    }
  }, [auth.isAuthenticated, dispatch]);

  const handleRemove = async (productId) => {
    if (auth.isAuthenticated) {
      const result = await dispatch(removeFromBackendCart(productId));
      if (!result.success) {
        alert(result.error);
      }
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemove(productId);
      return;
    }

    if (auth.isAuthenticated) {
      const currentItem = cart.cartItems.find(item => item._id === productId);
      const currentQuantity = currentItem?.quantity || 0;
      const change = newQuantity - currentQuantity;
      
      if (change !== 0) {
        const result = await dispatch(updateBackendCartQuantity(productId, change));
        if (!result.success) {
          alert(result.error);
        }
      }
    } else {
      dispatch(updateCartQuantity(productId, newQuantity));
    }
  };

  const handleClearCart = async () => {
    if (auth.isAuthenticated) {
      const result = await dispatch(clearBackendCart());
      if (!result.success) {
        alert(result.error);
      }
    } else {
      dispatch(clearCart());
    }
  };

  const handleProceedToCheckout = () => {
    if (!auth.isAuthenticated) {
      alert('Please login to proceed with your order');
      navigate('/login');
      return;
    }

    if (cart.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.address || !shippingAddress.city) {
      alert('Please fill in all required shipping details');
      return;
    }

    const orderData = {
      shippingAddress,
      paymentMethod: 'COD'
    };

    const result = await dispatch(createOrder(orderData));
    
    if (result.success) {
      setOrderSuccess(true);
      setShowCheckout(false);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      alert(`Order failed: ${result.error}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (orderSuccess) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <div className="success-icon" style={{ fontSize: '4rem', color: '#28a745' }}>✓</div>
                <h3 className="card-title mt-3">Order Confirmed!</h3>
                <p className="card-text">Your order has been placed successfully.</p>
                <p className="text-muted">You will be redirected to home page shortly...</p>
                <Link to="/" className="btn btn-dark mt-3">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Shipping Information</h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({cart.totalItems}):</span>
                  <span>Rs {cart.totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>Rs {cart.totalAmount > 5000 ? 0 : 200}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>Rs {cart.totalAmount + (cart.totalAmount > 5000 ? 0 : 200)}</strong>
                </div>
                <button 
                  className="btn btn-success w-100 mb-2"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowCheckout(false)}
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Shopping Cart</h2>
      
      {cart.loading && (
        <div className="text-center py-3">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Updating cart...</p>
        </div>
      )}
      
      {cart.error && (
        <div className="alert alert-danger" role="alert">
          {cart.error}
        </div>
      )}
      
      {cart.cartItems.length === 0 ? (
        <div className='text-center py-5'>
          <h4>Your cart is empty</h4>
          <p className="text-muted">Add some products to your cart to see them here.</p>
          <Link to="/" className='btn btn-dark mt-3'>Continue Shopping</Link>
        </div>
      ) : (
        <>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map(item => (
                <tr key={item._id}>
                  <td>
                    <img 
                      src={item.image || item.images?.[0] || '/default-product.jpg'} 
                      alt={item.name} 
                      width={80} 
                      height={80} 
                      className="img-thumbnail"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80/333/FFFFFF?text=No+Image';
                      }}
                    />
                  </td>
                  <td className='fw-bold'>{item.name}</td>
                  <td className='fw-bold'>Rs {item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button 
                        className='btn btn-outline-dark btn-sm'
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                        disabled={cart.loading}
                      >
                        -
                      </button>
                      <span className='mx-3'>{item.quantity || 1}</span>
                      <button 
                        className='btn btn-outline-dark btn-sm'
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                        disabled={cart.loading}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className='fw-bold'>Rs {item.price * (item.quantity || 1)}</td>
                  <td>
                    <button 
                      className='btn btn-danger btn-sm'
                      onClick={() => handleRemove(item._id)}
                      disabled={cart.loading}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <button 
                className="btn btn-outline-danger"
                onClick={handleClearCart}
                disabled={cart.loading || cart.cartItems.length === 0}
              >
                Clear Cart
              </button>
            </div>
            <div className="col-md-6 text-end">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Summary</h5>
                  <div className="d-flex justify-content-between">
                    <span>Total Items:</span>
                    <span>{cart.totalItems}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Subtotal:</span>
                    <span>Rs {cart.totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Shipping:</span>
                    <span>Rs {cart.totalAmount > 5000 ? 0 : 200}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mt-2">
                    <strong>Total Amount:</strong>
                    <strong>Rs {cart.totalAmount + (cart.totalAmount > 5000 ? 0 : 200)}</strong>
                  </div>
                  <div className="mt-3">
                    <button 
                      className='btn btn-success w-100'
                      onClick={handleProceedToCheckout}
                      disabled={cart.loading || cart.cartItems.length === 0}
                    >
                      {auth.isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </button>
                  </div>
                  {!auth.isAuthenticated && (
                    <div className="mt-2 text-center">
                      <small className="text-muted">
                        Please login to complete your purchase
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;