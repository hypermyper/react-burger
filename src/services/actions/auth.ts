import {
	signInRequest,
	signUpRequest,
	signOutRequest,
	getUserRequest,
	refreshTokenRequest,
	updateUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
} from '../../utils/api';

import { push } from 'connected-react-router';

import { deleteCookie, setCookie } from '../../utils/functions';

import { TUser, TUserData, AppDispatch, AppThunk } from '../../types';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const SET_RESET_PASSWORD_STATE = 'SET_RESET_PASSWORD_STATE';
export const CLEAR_RESET_PASSWORD_STATE = 'CLEAR_RESET_PASSWORD_STATE';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export interface IRegisterRequestAction {
	readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS;
	readonly user: TUser;
}

export interface IRegisterFailedAction {
	readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
	readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
	readonly type: typeof LOGIN_SUCCESS;
	readonly user: TUser;
}

export interface ILoginFailedAction {
	readonly type: typeof LOGIN_FAILED;
}

export interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly user: TUser;
}

export interface IGetUserFailedAction {
	readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly user: TUser;
}

export interface IUpdateUserFailedAction {
	readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
	readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
	readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
	readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordFailedAction {
	readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ILogoutRequestAction {
	readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
	readonly type: typeof LOGOUT_FAILED;
}

export interface IRefreshTokenRequestAction {
	readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccessAction {
	readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IRefreshTokenFailedAction {
	readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface ISetResetPasswordStateAction {
	readonly type: typeof SET_RESET_PASSWORD_STATE;
	readonly resetPasswordSuccess: boolean;
}

export interface IClearResetPasswordStateAction {
	readonly type: typeof CLEAR_RESET_PASSWORD_STATE;
}

export type TAuthActions =
	| IRegisterRequestAction
	| IRegisterSuccessAction
	| IRegisterFailedAction
	| ILoginRequestAction
	| ILoginSuccessAction
	| ILoginFailedAction
	| IGetUserRequestAction
	| IGetUserFailedAction
	| IGetUserSuccessAction
	| IUpdateUserRequestAction
	| IUpdateUserSuccessAction
	| IUpdateUserFailedAction
	| IForgotPasswordRequestAction
	| IForgotPasswordSuccessAction
	| IForgotPasswordFailedAction
	| IResetPasswordRequestAction
	| IResetPasswordSuccessAction
	| IResetPasswordFailedAction
	| ILogoutRequestAction
	| ILogoutFailedAction
	| ILogoutSuccessAction
	| IRefreshTokenRequestAction
	| IRefreshTokenSuccessAction
	| IRefreshTokenFailedAction
	| ISetResetPasswordStateAction
	| IClearResetPasswordStateAction;

export const register: AppThunk = (state: TUserData) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: REGISTER_REQUEST,
		});
		signUpRequest(state)
			.then((res) => {
				if (res && res.success) {
					const authToken = res.accessToken.split('Bearer ')[1];
					const refreshToken = res.refreshToken;
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', refreshToken);
					dispatch({
						type: REGISTER_SUCCESS,
						user: res.user,
					});
					dispatch(push('/'));
				} else {
					dispatch({
						type: REGISTER_FAILED,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: REGISTER_FAILED,
				});
			});
	};
};

export const login: AppThunk = (state) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: LOGIN_REQUEST,
		});
		signInRequest(state)
			.then((res) => {
				if (res && res.success) {
					const authToken = res.accessToken.split('Bearer ')[1];
					const refreshToken = res.refreshToken;
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', refreshToken);
					dispatch({
						type: LOGIN_SUCCESS,
						user: res.user,
					});
				} else {
					dispatch({
						type: LOGIN_FAILED,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: LOGIN_FAILED,
				});
			});
	};
};

export const getUser: AppThunk = () => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_USER_REQUEST,
		});
		getUserRequest()
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: GET_USER_SUCCESS,
						user: res.user,
					});
				} else {
					throw res;
				}
			})
			.catch((res) => {
				dispatch({
					type: GET_USER_FAILED,
				});
			});
	};
};

export const updateUser: AppThunk = (data) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_USER_REQUEST,
		});
		updateUserRequest(data)
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: UPDATE_USER_SUCCESS,
						user: res.user,
					});
				} else {
					throw res;
				}
			})
			.catch((res) => {
				dispatch({
					type: UPDATE_USER_FAILED,
				});
			});
	};
};

export const forgotPassword: AppThunk = (email) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
		forgotPasswordRequest(email)
			.then((res) => {
				dispatch({
					type: FORGOT_PASSWORD_SUCCESS,
				});
				dispatch(push('/reset-password'));
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: FORGOT_PASSWORD_FAILED,
				});
			});
	};
};

export const resetPassword: AppThunk = ({ password, token }) => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
		resetPasswordRequest({ password, token })
			.then((res) => {
				if (res && res.success) {
					console.log('Смена пароля прошла успешно');
					dispatch(push('/login'));
				} else {
					dispatch({
						type: RESET_PASSWORD_FAILED,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: RESET_PASSWORD_FAILED,
				});
			});
	};
};

export const logout: AppThunk = () => {
	console.log('exit');
	return function (dispatch: AppDispatch) {
		dispatch({
			type: LOGOUT_REQUEST,
		});
		signOutRequest()
			.then((res) => {
				if (res && res.success) {
					deleteCookie('token');
					console.log('res exit');
					localStorage.removeItem('refreshToken');
					dispatch({
						type: LOGOUT_SUCCESS,
					});
					dispatch(push('/login'));
				} else {
					dispatch({
						type: LOGOUT_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
				});
			});
	};
};

export const refreshToken: AppThunk = () => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: REFRESH_TOKEN_REQUEST,
		});
		refreshTokenRequest().then((res) => {
			if (res && res.success) {
				localStorage.setItem('refreshToken', res.refreshToken);
				const authToken = res.accessToken.split('Bearer ')[1];
				setCookie('token', authToken);
				dispatch({
					type: REFRESH_TOKEN_SUCCESS,
				});
			} else {
				dispatch({
					type: REFRESH_TOKEN_FAILED,
				});
			}
		}).catch((err) => {
			deleteCookie('token');
			localStorage.removeItem('refreshToken');
			dispatch({
				type: REFRESH_TOKEN_FAILED,
			});
		});
	};
};