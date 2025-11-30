export const loginRequest = () => ({
  type: "LOGIN_REQUEST"
});

export const loginSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: userData
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error
});

export const logout = () => ({
  type: "LOGOUT"
});

export const registerSuccess = () => ({
  type: "REGISTER_SUCCESS"
});

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  
  try {
    const response = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (data.success) {
      let userData, token;
      
      if (data.data && data.data.user) {
        userData = data.data.user;
        token = data.data.accessToken || data.data.token;
      } else if (data.user) {
        userData = data.user;
        token = data.accessToken || data.token;
      } else if (data.data && (data.data.Name || data.data.email)) {
        userData = data.data;
        token = data.data.accessToken || data.data.token;
      } else {
        userData = data;
        token = data.accessToken || data.token;
      }
      
      if (userData && token) {
        dispatch(loginSuccess({
          user: userData,
          token: token
        }));
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response format: missing user data or token');
      }
    } else {
      dispatch(loginFailure(data.message || 'Login failed'));
      return { success: false, error: data.message };
    }
  } catch (error) {
    dispatch(loginFailure('Network error: ' + error.message));
    return { success: false, error: 'Network error: ' + error.message };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      dispatch(registerSuccess());
      return { success: true };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: 'Network error: ' + error.message };
  }
};

export const refreshAccessToken = () => ({
  type: "REFRESH_ACCESS_TOKEN"
});

export const changeCurrentPassword = () => ({
  type: "CHANGE_CURRENT_PASSWORD"
});