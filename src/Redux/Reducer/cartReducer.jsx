import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_QUANTITY,
  SET_CART_LOADING,
  SET_CART_ERROR,
  SYNC_CART_SUCCESS
} from '../Action/cartActions';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
  loading: false,
  error: null,
  lastSynced: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);
      
      let updatedCartItems;
      
      if (existingItem) {
        updatedCartItems = state.cartItems.map(item =>
          item._id === newItem._id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
      }
      
      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + (item.price * (item.quantity || 1)), 
        0
      );
      
      const updatedTotalItems = updatedCartItems.reduce(
        (total, item) => total + (item.quantity || 1), 
        0
      );
      
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
        totalItems: updatedTotalItems,
        error: null
      };

    case REMOVE_FROM_CART:
      const itemIdToRemove = action.payload;
      const filteredCartItems = state.cartItems.filter(item => item._id !== itemIdToRemove);
      
      const newTotalAmount = filteredCartItems.reduce(
        (total, item) => total + (item.price * (item.quantity || 1)), 
        0
      );
      
      const newTotalItems = filteredCartItems.reduce(
        (total, item) => total + (item.quantity || 1), 
        0
      );
      
      return {
        ...state,
        cartItems: filteredCartItems,
        totalAmount: newTotalAmount,
        totalItems: newTotalItems,
        error: null
      };

    case UPDATE_CART_QUANTITY:
      const { productId, quantity } = action.payload;
      const updatedItems = state.cartItems.map(item =>
        item._id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0);
      
      const updatedAmount = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      
      const updatedItemsCount = updatedItems.reduce(
        (total, item) => total + item.quantity, 
        0
      );
      
      return {
        ...state,
        cartItems: updatedItems,
        totalAmount: updatedAmount,
        totalItems: updatedItemsCount,
        error: null
      };

    case CLEAR_CART:
      return {
        ...initialState,
        error: null
      };

    case SET_CART_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

   case SYNC_CART_SUCCESS:
  const backendCart = action.payload;
  
  let cartItems = [];
  let totalPrice = 0;

  if (backendCart && backendCart.cartItems && Array.isArray(backendCart.cartItems)) {
    cartItems = backendCart.cartItems;
    totalPrice = backendCart.totalPrice || 0;
  } else if (backendCart && backendCart.data && backendCart.data.cartItems) {
    cartItems = backendCart.data.cartItems;
    totalPrice = backendCart.data.totalPrice || 0;
  }

  const mappedCartItems = cartItems.map(item => {
    return {
      _id: item.product?._id || item.product || item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.qnty || item.quantity || 1
    };
  });

  const totalItems = mappedCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return {
    ...state,
    cartItems: mappedCartItems,
    totalAmount: totalPrice,
    totalItems: totalItems,
    loading: false,
    error: null,
    lastSynced: new Date().toISOString()
  };

    default:
      return state;
  }
};

export default cartReducer;