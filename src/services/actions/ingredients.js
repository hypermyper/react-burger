import { getIngredients, createOrder } from '../../utils/api';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const CURRENT_BURGER = 'CURRENT_BURGER';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const TAB_SWITCH = 'TAB_SWITCH';

const filterArray = (arr) => {
	return arr.reduce((acc, curr) =>
	({
		...acc, [curr.type]: [...acc[curr.type] || [], curr]
	}), {})
}

function getProductsFailed() {
  return { type: GET_PRODUCTS_FAILED }
}

function createOrderFailed() {
  return { type: CREATE_ORDER_FAILED }
}

export const getBurgerIngredients = () => {
	return function (dispatch) {
		dispatch({
			type: GET_PRODUCTS_REQUEST
		});
		getIngredients().then((res) => {
			const ingredientsObj = filterArray(res.data);
			if (res && res.success) {
				dispatch({
					type: GET_PRODUCTS_SUCCESS,
					items: ingredientsObj
				});
				console.log(ingredientsObj);
			} else {
				dispatch(getProductsFailed());
			}
		}).catch(err => {
			console.log(err)
			dispatch(getProductsFailed());
		})
	};
}

export const createBurgerOrder = (ingredientsId) => {
	return function (dispatch) {
		dispatch({
			type: CREATE_ORDER_REQUEST
		})
		createOrder(ingredientsId).then((res) => {
			if (res && res.success) {
				dispatch({
					type: CREATE_ORDER_SUCCESS,
					order: res
				});
				console.log(res);
			} else {
				dispatch(createOrderFailed());
			}
		}).catch(err => {
			console.log(err)
			dispatch(createOrderFailed());
		})
	};
}