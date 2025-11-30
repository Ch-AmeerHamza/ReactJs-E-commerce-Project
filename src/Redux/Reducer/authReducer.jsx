const INITIAL_STATE = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    
    case "LOGIN_SUCCESS":
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      };
    
    case "LOGIN_FAILURE":
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
        isAuthenticated: false,
        user: null,
        token: null
      };
    
    case "LOGOUT":
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('reduxState');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };
    
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null
      };
    
    default: 
      return state;
  }
}