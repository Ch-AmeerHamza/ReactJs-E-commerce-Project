import React, { useEffect, useState } from 'react';
import "./Kameez.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../Redux/Action/productActions';
import { addToBackendCart } from '../Redux/Action/cartActions';

const Kameez = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { kameezProducts, loading, error } = useSelector(state => state.products);
  const authState = useSelector((state) => state.auth);
  
  const [localData, setLocalData] = useState({
    firstRow: [],
    newArrival: [],
    allKameez: []
  });

 const send = async (product) => {
  if (!authState.isAuthenticated) {
    const shouldLogin = window.confirm('Please login to add items to cart. Would you like to login now?');
    if (shouldLogin) {
      navigate('/login');
    }
    return;
  }

  try {
    const result = await dispatch(addToBackendCart(product._id, 1));
  } catch (error) {
  }
};

  useEffect(() => {
    dispatch(fetchProducts('kameezShalwar'));
  }, [dispatch]);

  useEffect(() => {
    if (kameezProducts && kameezProducts.length > 0) {
      setLocalData({
        firstRow: kameezProducts.slice(0, 4),
        newArrival: kameezProducts.slice(4, 8),
        allKameez: kameezProducts.slice(8)
      });
    }
  }, [kameezProducts]);

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #c09b67',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p>Loading beautiful kameez collection...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: 'white',
        background: '#1a1a1a',
        minHeight: '50vh'
      }}>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          onClick={() => dispatch(fetchProducts('kameezShalwar'))}
          className="Cart-btn"
          style={{ marginTop: '1rem' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#0c0c0c', minHeight: '100vh', paddingTop: '2rem' }}>
      
      <div className='container'>
        <div className='row d-flex'>
          {localData.firstRow.length > 0 ? (
            localData.firstRow.map(prd => (
              <ProductCard key={prd._id || prd.id} product={prd} onAddToCart={send} buttonClass="Cart-btn" />
            ))
          ) : !loading && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No featured kameez available</p>
            </div>
          )}
        </div>
      </div>

      {localData.firstRow.length > 0 && <div className='Line1'>Featured Collection</div>}

      <div className='container'>
        <div className='row d-flex'>
          {localData.newArrival.length > 0 ? (
            localData.newArrival.map(prd => (
              <ProductCard key={prd._id || prd.id} product={prd} onAddToCart={send} buttonClass="Cart-btn1" />
            ))
          ) : localData.firstRow.length > 0 && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No new arrivals available</p>
            </div>
          )}
        </div>
      </div>

      {localData.newArrival.length > 0 && <div className='Line2'>New Arrivals</div>}

      <div className='container'>
        <div className='row d-flex'>
          {localData.allKameez.length > 0 ? (
            localData.allKameez.map(prd => (
              <ProductCard key={prd._id || prd.id} product={prd} onAddToCart={send} buttonClass="Cart-btn2" />
            ))
          ) : (localData.firstRow.length > 0 || localData.newArrival.length > 0) && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No additional kameez available</p>
            </div>
          )}
        </div>
      </div>

      {kameezProducts.length === 0 && !loading && (
        <div className="empty-state" style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: 'white'
        }}>
          <h3>No Kameez Available</h3>
          <p>We couldn't find any kameez products in the database.</p>
          <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '1rem' }}>
            Make sure you have products with category 'kameezShalwar' in your backend.
          </p>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, buttonClass }) => {
  const productName = product?.name || 'Unnamed Product';
  const productPrice = product?.price || 0;
  const productImage = product?.image || product?.images?.[0] || '/default-product.jpg';
  const productDescription = product?.description || '';
  const isInStock = (product?.stock !== undefined && product.stock > 0) || product?.inStock !== false;

  return (
    <div className="card m-2 border-0" style={{ width: '16rem' }}>
      <img 
        src={productImage} 
        className="card-img" 
        alt={productName}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x400/FFD700/000000?text=Kameez+Image';
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-price">Rs: {productPrice}</p>
        <p className="card-description" style={{ 
          fontSize: '0.9rem', 
          color: '#666', 
          minHeight: '40px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {productDescription}
        </p>
        <div style={{ 
          fontSize: '0.8rem', 
          color: isInStock ? '#4ade80' : '#f87171',
          marginBottom: '0.5rem'
        }}>
          {isInStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </div>
        <button 
          className={buttonClass} 
          onClick={() => onAddToCart(product)}
          disabled={!isInStock}
          style={{
            opacity: isInStock ? 1 : 0.6,
            cursor: isInStock ? 'pointer' : 'not-allowed'
          }}
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default Kameez;