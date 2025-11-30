import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../Action/productActions';

const initialState = {
  products: [],
  kameezProducts: [],
  suitingProducts: [],
  perfumeProducts: [],
  allProducts: [],
  loading: false,
  error: null,
  lastUpdated: null,
  pagination: {}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      const { category, products, pagination } = action.payload;
      const now = new Date().toISOString();
      
      const newState = {
        ...state,
        loading: false,
        error: null,
        lastUpdated: now,
        pagination: pagination || state.pagination
      };
      
      switch (category) {
        case 'kameezShalwar':
        case 'kameez':
          newState.kameezProducts = products;
          break;
        case 'suiting':
          newState.suitingProducts = products;
          break;
        case 'perfume':
          newState.perfumeProducts = products;
          break;
        case 'all':
          newState.allProducts = products;
          break;
        default:
          newState.allProducts = products;
      }
      
      newState.products = products;
      
      return newState;

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
        kameezProducts: [],
        suitingProducts: [],
        perfumeProducts: []
      };

    default:
      return state;
  }
};

export default productReducer;