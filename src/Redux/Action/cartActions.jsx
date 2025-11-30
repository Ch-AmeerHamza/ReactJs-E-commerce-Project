// Redux/Action/cartActions.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const SET_CART_LOADING = 'SET_CART_LOADING';
export const SET_CART_ERROR = 'SET_CART_ERROR';
export const SYNC_CART_SUCCESS = 'SYNC_CART_SUCCESS';

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const updateCartQuantity = (productId, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { productId, quantity }
});

export const setCartLoading = (loading) => ({
  type: SET_CART_LOADING,
  payload: loading
});

export const setCartError = (error) => ({
  type: SET_CART_ERROR,
  payload: error
});

export const syncCartSuccess = (cartData) => ({
  type: SYNC_CART_SUCCESS,
  payload: cartData
});

// Async action to sync cart with backend
// In your cartActions.js - Update syncCartWithBackend to debug the response
export const syncCartWithBackend = () => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  if (!isAuthenticated || !token) {
    return { success: false, error: 'User not authenticated' };
  }

  try {
    dispatch(setCartLoading(true));
    
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('🛒 Sync Cart API Response:', data);
    
    if (data.success) {
      console.log('🛒 Cart Data Structure:', data.data);
      console.log('🛒 Cart Items:', data.data?.cartItems);
      console.log('🛒 Total Price:', data.data?.totalPrice);
      
      dispatch(syncCartSuccess(data.data));
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || 'Failed to sync cart');
    }
  } catch (error) {
    console.error('❌ Sync cart error:', error);
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};
// Redux/Action/cartActions.js - Add detailed debugging
// Redux/Action/cartActions.js - FIXED VERSION
export const addToBackendCart = (productId, quantity = 1) => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  console.log('🛒 addToBackendCart called with:', { productId, quantity, isAuthenticated });

  if (!isAuthenticated || !token) {
    return { success: false, error: 'Please login to add items to cart' };
  }

  try {
    dispatch(setCartLoading(true));
    
    console.log('🛒 Making API call to add to cart...');
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity })
    });

    console.log('🛒 API Response status:', response.status);
    
    // FIX: Handle both JSON and HTML responses
    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('🛒 Response is not JSON, it appears to be HTML');
      console.error('🛒 Response content:', responseText.substring(0, 200));
      
      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else if (response.status === 503) {
        throw new Error('Service temporarily unavailable. Please try again.');
      } else {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
    }
    
    console.log('🛒 Add to Cart API Response:', data);
    
    if (data.success) {
      console.log('🛒 Success! Cart data received:', data.data);
      dispatch(syncCartSuccess(data.data));
      return { success: true, data: data.data };
    } else {
      console.error('❌ API returned error:', data.message);
      throw new Error(data.message || 'Failed to add item to cart');
    }
  } catch (error) {
    console.error('❌ addToBackendCart error:', error);
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};
// Async action to update cart quantity in backend
export const updateBackendCartQuantity = (productId, change) => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  if (!isAuthenticated || !token) {
    return { success: false, error: 'User not authenticated' };
  }

  try {
    dispatch(setCartLoading(true));
    
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, change })
    });

    const data = await response.json();
    
    if (data.success) {
      dispatch(syncCartSuccess(data.data));
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || 'Failed to update cart');
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Async action to remove item from backend cart
export const removeFromBackendCart = (productId) => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  if (!isAuthenticated || !token) {
    return { success: false, error: 'User not authenticated' };
  }

  try {
    dispatch(setCartLoading(true));
    
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.success) {
      dispatch(syncCartSuccess(data.data));
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || 'Failed to remove item from cart');
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Async action to clear backend cart
export const clearBackendCart = () => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  if (!isAuthenticated || !token) {
    return { success: false, error: 'User not authenticated' };
  }

  try {
    dispatch(setCartLoading(true));
    
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.success) {
      dispatch(clearCart());
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || 'Failed to clear cart');
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};

// Async action to create order
export const createOrder = (orderData) => async (dispatch, getState) => {
  const state = getState();
  const { token, isAuthenticated } = state.auth;

  if (!isAuthenticated || !token) {
    return { success: false, error: 'Please login to place an order' };
  }

  try {
    dispatch(setCartLoading(true));
    
    const response = await fetch(`${API_BASE_URL}/orders/createOrder`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (data.success) {
      // Clear cart after successful order
      dispatch(clearCart());
      // Also clear backend cart
      await dispatch(clearBackendCart());
      
      return { success: true, data: data.data, order: data.data.order };
    } else {
      throw new Error(data.message || 'Failed to create order');
    }
  } catch (error) {
    dispatch(setCartError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setCartLoading(false));
  }
};