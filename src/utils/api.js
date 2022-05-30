import { API_URL } from './constants';
import { getCookie, setCookie, deleteCookie } from './functions';

export const getIngredients = () => {
	return fetch(`${API_URL}ingredients`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',    
	})
  .then((res) => checkResponse(res));
}

export const createOrder = (ingredients) => {
  return fetch(`${API_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { ingredients }
    )
  })
  .then((res) => checkResponse(res));
} 

export const signInRequest = ({ login, password }) => {
  return fetch(`${API_URL}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: login, password }),
  })
  .then((res) => checkResponse(res));
};

export const signUpRequest = ({ email, password, name }) => {
  return fetch(`${API_URL}auth/register`, {
		method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',    
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(
			{ email, password, name }
		),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'    
	})
  .then((res) => checkResponse(res));
}

export const forgotPassword = ({ email }) => {
  return fetch(`${API_URL}password-reset`, {
		method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',    
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(
			{ email }
		),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',    
	})
  .then((res) => checkResponse(res));
}

/* export const resetPassword = ({ password, token }) => {
  return fetch(`${API_URL}password-reset/reset`, {
		method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(
			{ password, token }
		),
	})
  .then((res) => checkResponse(res));
} */

export const getUserRequest = () => {
  return fetchWithRefreshToken(`${API_URL}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
};

export const forgotPasswordRequest = email => {
  return fetch(`${API_URL}password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  .then((res) => checkResponse(res));
};

export const resetPasswordRequest = ({ password, token }) => {
  return fetch(`${API_URL}password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, token }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  .then((res) => checkResponse(res));
};

export const signOutRequest = () => {
  return fetch(`${API_URL}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  .then((res) => checkResponse(res));
};

export const updateUserRequest = data => {
  return fetchWithRefreshToken(`${API_URL}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(data),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
};

export const refreshTokenRequest = () => {
  return fetch(`${API_URL}auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
  .then((res) => checkResponse(res));
};

const fetchWithRefreshToken = (url, options) => {
  return fetch(url, options)
  .then((res) => {
      return res.ok ? res : Promise.reject(res)
    })
    .catch((res) => {
      return res.json()
        .then(err => {
          if (err.message === 'jwt expired') {
            return refreshTokenRequest()
              .then(res => {
                localStorage.setItem('refreshToken', res.refreshToken)
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                options.headers.Authorization = res.accessToken
                return fetch(url, options)
                  .then((res) => checkResponse(res));
              })
          } else {
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
            // eslint-disable-next-line
            location.reload()
            return Promise.reject(err)
          }
        })
    })
}

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}