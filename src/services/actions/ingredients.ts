import { v4 as uuidv4 } from 'uuid';
import { getIngredients, createOrder, getOrderRequest, getUserOrderRequest } from '../../utils/api';
import { TIngredient, TOrderInfo, TOrder, TIngredientWithProductId, AppDispatch, AppThunk } from '../../types';

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

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const GET_USER_ORDER_REQUEST: 'GET_USER_ORDER_REQUEST' = 'GET_USER_ORDER_REQUEST';
export const GET_USER_ORDER_SUCCESS: 'GET_USER_ORDER_SUCCESS' = 'GET_USER_ORDER_SUCCESS';
export const GET_USER_ORDER_FAILED: 'GET_USER_ORDER_FAILED' = 'GET_USER_ORDER_FAILED';

export const TAB_SWITCH = 'TAB_SWITCH';

export interface IGetProdictsRequestAction {
  readonly type: typeof GET_PRODUCTS_REQUEST;
}

export interface IGetProdictsSuccessAction {
  readonly type: typeof GET_PRODUCTS_SUCCESS;
  readonly items: Array<TIngredient>;
}

export interface IGetProdictsFailedAction {
  readonly type: typeof GET_PRODUCTS_FAILED;
}

export interface IAddIngredientsAction {
	payload: any;
  readonly type: typeof ADD_INGREDIENTS;
  readonly item: TIngredientWithProductId
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string;
}

export interface ICurrentBurgerAction {
  readonly type: typeof CURRENT_BURGER;
  readonly item: TIngredient;
}

export interface IIncreaseIngredientAction {
  readonly type: typeof INCREASE_INGREDIENT;
  readonly key: string;
  readonly typeItem: string;
}

export interface IDecreaseIngredientAction {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly key: string,
  readonly typeItem: string,
}

export interface IUpdateOrderAction {
  readonly type: typeof UPDATE_CONSTRUCTOR;
  readonly toIndex: number,
  readonly fromIndex: number,
}

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly order: TOrderInfo & TOrder;
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IGetOrderOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface IGetOrderOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetUserOrderOrderRequestAction {
  readonly type: typeof GET_USER_ORDER_REQUEST;
}

export interface IGetUserOrderOrderSuccessAction {
  readonly type: typeof GET_USER_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface IGetUserOrderOrderFailedAction {
  readonly type: typeof GET_USER_ORDER_FAILED;
}

export type TIngredientsActions =
  | IGetProdictsRequestAction
  | IGetProdictsSuccessAction
  | IGetProdictsFailedAction
  | IAddIngredientsAction
  | IDeleteIngredientAction
  | ICurrentBurgerAction
  | IIncreaseIngredientAction
  | IDecreaseIngredientAction
  | IUpdateOrderAction
  | ICreateOrderRequestAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction
  | IGetOrderOrderRequestAction
  | IGetOrderOrderSuccessAction
  | IGetOrderOrderFailedAction
  | IGetUserOrderOrderRequestAction
  | IGetUserOrderOrderSuccessAction
  | IGetUserOrderOrderFailedAction;

export const addIngridients = (item: TIngredientWithProductId) => ({
  type: 'ADD_INGREDIENTS',
	item,
  payload: uuidv4()
});

// const filterArray = (arr) => {
// 	return arr.reduce((acc, curr) =>
// 	({
// 		...acc, [curr.type]: [...acc[curr.type] || [], curr]
// 	}), {})
// }

function getProductsFailed() {
  return { type: GET_PRODUCTS_FAILED }
}

function createOrderFailed() {
  return { type: CREATE_ORDER_FAILED }
}

export const getBurgerIngredients: AppThunk = () => {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_PRODUCTS_REQUEST
		});
		getIngredients().then((res) => {
//			const ingredientsObj = filterArray(res.data);
			if (res && res.success) {
				dispatch({
					type: GET_PRODUCTS_SUCCESS,
					items: res.data
				});
				console.log(res.data);
			} else {
				dispatch(getProductsFailed());
			}
		}).catch(err => {
			console.log(err)
			dispatch(getProductsFailed());
		})
	};
}

export const createBurgerOrder: AppThunk = (ingredientsId: Array<string>) => {
	return function (dispatch: AppDispatch) {
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

export const getOrder: AppThunk = (id: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.orders[0],
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

export const getUserOrder: AppThunk = (id: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_ORDER_REQUEST,
    });
    getUserOrderRequest(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_ORDER_SUCCESS,
            order: res.orders[0],
          });
        } else {
          dispatch({
            type: GET_USER_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};