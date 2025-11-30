import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToBackendCart, syncCartWithBackend } from '../Redux/Action/cartActions';

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const addToCart = async (product) => {
    if (!authState.isAuthenticated) {
      const shouldLogin = window.confirm('Please login to add items to cart. Would you like to login now?');
      if (shouldLogin) {
        navigate('/login');
      }
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await dispatch(addToBackendCart(product._id, 1));
      
      if (result.success) {
        alert(`${product.name} added to cart successfully!`);
        dispatch(syncCartWithBackend());
        return { success: true };
      } else {
        alert(`Failed to add to cart: ${result.error}`);
        return { success: false, error: result.error };
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      return { success: false, error: error.message };
    }
  };

  return { addToCart };
};