import { API_URL } from './constants';

export const getIngredients = () => {
	return fetch(`${API_URL}ingredients`, {
		method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
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

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}