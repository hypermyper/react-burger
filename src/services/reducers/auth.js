import {
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILED,
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED,
  GET_USER_REQUEST, 
  GET_USER_SUCCESS, 
  GET_USER_FAILED,
  UPDATE_USER_REQUEST, 
  UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS, 
  FORGOT_PASSWORD_FAILED,
  SET_RESET_PASSWORD_STATE,
  CLEAR_RESET_PASSWORD_STATE,
  RESET_PASSWORD_REQUEST, 
  RESET_PASSWORD_SUCCESS, 
  RESET_PASSWORD_FAILED,
  LOGOUT_REQUEST, 
  LOGOUT_SUCCESS, 
  LOGOUT_FAILED,
  REFRESH_TOKEN_REQUEST, 
  REFRESH_TOKEN_SUCCESS, 
  REFRESH_TOKEN_FAILED
} from '../actions/auth';

const initialState = {
  name: '',
  email: '',
  password: '',

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,

  isforgotPasswordRequest: false,
  isforgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,

  isTokenUpdated: false,
  tokenUpdateDate: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        name: action.user.name,
        email: action.user.email,
        registerRequest: false,
      };
    }
    case REGISTER_FAILED: {
      return { 
        ...state, 
        registerFailed: true, 
        registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        name: action.user.name,
        email: action.user.email,
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return { 
        ...state, 
        loginFailed: true, 
        loginRequest: false 
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        name: action.user.name,
        email: action.user.email,
        getUserRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return { 
        ...state, 
        getUserFailed: true, 
        getUserRequest: false 
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserFailed: false,
        name: action.user.name,
        email: action.user.email,
        updateUserRequest: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return { 
        ...state, 
        updateUserFailed: true, 
        updateUserRequest: false 
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
        isforgotPasswordRequest: false,
        isforgotPasswordSuccess: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        isforgotPasswordRequest: true,
        isforgotPasswordSuccess: true
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        isforgotPasswordSuccess: false,
        isforgotPasswordRequest: true
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
      };
    }
    case SET_RESET_PASSWORD_STATE: {
      return {
        ...state,
        resetPasswordSuccess: action.resetPasswordSuccess,
      }
    }
    case CLEAR_RESET_PASSWORD_STATE: {
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordError: ""
      }
    }  
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        name: '',
        email: '',
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return { 
        ...state, 
        logoutFailed: true, 
        logoutRequest: false 
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isTokenUpdated: true,
        tokenUpdateDate: true,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return { 
        ...state, 
        isTokenUpdated: true, 
        tokenUpdateDate: false
       };
    }
    default: {
      return state;
    }
  }
};