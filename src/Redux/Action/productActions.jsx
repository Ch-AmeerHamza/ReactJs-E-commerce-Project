const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST
});

export const fetchProductsSuccess = (category, products, pagination = {}) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { category, products, pagination }
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
});

export const fetchProducts = (category = 'all') => async (dispatch) => {
  dispatch(fetchProductsRequest());
  
  try {
    let url = `${API_BASE_URL}/products/getProducts`;
    const params = new URLSearchParams();
    
    if (category && category !== 'all') {
      params.append('category', category);
    }
    
    params.append('page', '1');
    params.append('limit', '50');
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    let products = [];
    let pagination = {};

    // Handle your specific API response structure
    if (data.success && data.data) {
      // If data.data is an array, use it directly
      if (Array.isArray(data.data)) {
        products = data.data;
      }
      // If data.data has a products array
      else if (data.data.products && Array.isArray(data.data.products)) {
        products = data.data.products;
        pagination = data.data.pagination || {};
      }
      // If data.data is an object with array properties, find the first array
      else if (typeof data.data === 'object') {
        const arrayKeys = Object.keys(data.data).filter(key => Array.isArray(data.data[key]));
        if (arrayKeys.length > 0) {
          products = data.data[arrayKeys[0]];
        }
      }
    }

    if (products.length > 0) {
      dispatch(fetchProductsSuccess(category, products, pagination));
    } else {
      dispatch(fetchProductsSuccess(category, [], pagination));
    }
    
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};