import { authReducer } from "./auth";

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

  resetPasswordSuccess: false,
  resetPasswordError: '',

  isTokenUpdated: false,
  tokenUpdateDate: false,
};

describe('auth reducer', () => {
	it('should return the initial state', () => {
		expect(authReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle REGISTER_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: REGISTER_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,
			registerRequest: true,	
		}))
	})

	it('should handle REGISTER_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: REGISTER_SUCCESS,
				user: {
					name: 'Test',
					email: 'test@test.ts'
				},
			})
		).toEqual(expect.objectContaining({
			...initialState,
			name: 'Test',
			email: 'test@test.ts',
		}))
	})

	it('should handle REGISTER_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: REGISTER_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			registerFailed: true,
		}))
	})

	it('should handle LOGIN_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: LOGIN_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,
			loginRequest: true,
		}))
	})

	it('should handle LOGIN_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: LOGIN_SUCCESS,
				user: {
					name: 'Test',
					email: 'test@test.ts'
				},
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			name: 'Test',
			email: 'test@test.ts',
		}))
	})

	it('should handle LOGIN_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: LOGIN_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			loginFailed: true,
		}))
	})

	it('should handle GET_USER_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: GET_USER_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,
			getUserRequest: true,
		}))
	})

	it('should handle GET_USER_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: GET_USER_SUCCESS,
				user: {
					name: 'Test',
					email: 'test@test.ts'
				},
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			name: 'Test',
			email: 'test@test.ts',
		}))
	})

	it('should handle GET_USER_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: GET_USER_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			getUserFailed: true,
		}))
	})

	it('should handle UPDATE_USER_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: UPDATE_USER_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,
			updateUserRequest: true,
		}))
	})

	it('should handle UPDATE_USER_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: UPDATE_USER_SUCCESS,
				user: {
					name: 'Test',
					email: 'test@test.ts'
				},
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			name: 'Test',
			email: 'test@test.ts',
		}))
	})

	it('should handle UPDATE_USER_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: UPDATE_USER_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			updateUserFailed: true,
		}))
	})

	it('should handle FORGOT_PASSWORD_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: FORGOT_PASSWORD_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			forgotPasswordRequest: true,
		}))
	})

	it('should handle FORGOT_PASSWORD_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: FORGOT_PASSWORD_SUCCESS,
			})
		).toEqual(expect.objectContaining({
			...initialState,
			isforgotPasswordRequest: true,
			isforgotPasswordSuccess: true,
		}))
	})

	it('should handle FORGOT_PASSWORD_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: FORGOT_PASSWORD_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			forgotPasswordFailed: true,
			isforgotPasswordRequest: true,
		}))
	})

	it('should handle RESET_PASSWORD_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: RESET_PASSWORD_REQUEST
			})
		).toEqual(initialState)
	})

	it('should handle RESET_PASSWORD_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: RESET_PASSWORD_SUCCESS,
			})
		).toEqual(initialState)
	})

	it('should handle RESET_PASSWORD_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: RESET_PASSWORD_FAILED
			})
		).toEqual(initialState)
	})

	it('should handle LOGOUT_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: LOGOUT_REQUEST
			})
		).toEqual(expect.objectContaining({
			...initialState,
			logoutRequest: true,
		}))
	})

	it('should handle LOGOUT_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: LOGOUT_SUCCESS
			})
		).toEqual(initialState)
	})

	it('should handle LOGOUT_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: LOGOUT_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,
			logoutFailed: true,
		}))
	})

	it('should handle REFRESH_TOKEN_REQUEST', () => {
		expect(
			authReducer(initialState, {
				type: REFRESH_TOKEN_REQUEST
			})
		).toEqual(initialState)
	})

	it('should handle REFRESH_TOKEN_SUCCESS', () => {
		expect(
			authReducer(initialState, {
				type: REFRESH_TOKEN_SUCCESS
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			isTokenUpdated: true,
			tokenUpdateDate: true,
		}))
	})

	it('should handle REFRESH_TOKEN_FAILED', () => {
		expect(
			authReducer(initialState, {
				type: REFRESH_TOKEN_FAILED
			})
		).toEqual(expect.objectContaining({
			...initialState,			
			isTokenUpdated: true,
		}))
	})
})
