import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../Redux/Action/productActions';
import { addToBackendCart } from '../Redux/Action/cartActions';
import "./Perfumes.css";

const Perfumes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { perfumeProducts, loading, error } = useSelector(state => state.products);
  const authState = useSelector((state) => state.auth);
  
  const [localData, setLocalData] = useState({
    FirstRow: [],
    NewArrival: [],
    allperfumeData: []
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
    dispatch(fetchProducts('perfume'));
  }, [dispatch]);

  useEffect(() => {
    if (perfumeProducts && perfumeProducts.length > 0) {
      setLocalData({
        FirstRow: perfumeProducts.slice(0, 4),
        NewArrival: perfumeProducts.slice(4, 8),
        allperfumeData: perfumeProducts.slice(8)
      });
    }
  }, [perfumeProducts]);

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
        <p>Loading luxury perfumes collection...</p>
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
          onClick={() => dispatch(fetchProducts('perfume'))}
          className="Cart-Btn"
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
          {localData.FirstRow.length > 0 ? (
            localData.FirstRow.map(prod => (
              <ProductCard key={prod._id || prod.id} product={prod} onAddToCart={send} />
            ))
          ) : !loading && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No featured perfumes available</p>
            </div>
          )}
        </div>
      </div>

      {localData.FirstRow.length > 0 && <div className='LineOne'>Featured Collection</div>}

      <div className='container'>
        <div className='row d-flex'>
          {localData.NewArrival.length > 0 ? (
            localData.NewArrival.map(prod => (
              <ProductCard key={prod._id || prod.id} product={prod} onAddToCart={send} />
            ))
          ) : localData.FirstRow.length > 0 && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No new arrivals available</p>
            </div>
          )}
        </div>
      </div>

      {localData.NewArrival.length > 0 && <div className='Linetwo'>New Arrivals</div>}

      <div className='container'>
        <div className='row d-flex'>
          {localData.allperfumeData.length > 0 ? (
            localData.allperfumeData.map(prod => (
              <ProductCard key={prod._id || prod.id} product={prod} onAddToCart={send} />
            ))
          ) : (localData.FirstRow.length > 0 || localData.NewArrival.length > 0) && (
            <div style={{ textAlign: 'center', color: '#ccc', width: '100%', padding: '2rem' }}>
              <p>No additional perfumes available</p>
            </div>
          )}
        </div>
      </div>

      {perfumeProducts.length === 0 && !loading && (
        <div className="empty-state" style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: 'white'
        }}>
          <h3>No Perfumes Available</h3>
          <p>We couldn't find any perfume products in the database.</p>
          <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '1rem' }}>
            Make sure you have products with category 'perfume' in your backend.
          </p>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const productName = product?.name || 'Unnamed Product';
  const productPrice = product?.price || 0;
  const productImage = product?.image || product?.images?.[0] || '/default-product.jpg';
  const productDescription = product?.description || '';
  const isInStock = product?.inStock !== false;

  return (
    <div className="card m-2 border-0" style={{ width: '16rem' }}>
      <img 
        src={productImage} 
        className="card-img" 
        alt={productName}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x400/FFD700/000000?text=Perfume+Image';
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
        <button className='Cart-Btn' onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Perfumes;