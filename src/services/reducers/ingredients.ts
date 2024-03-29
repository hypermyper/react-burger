//import { v4 as uuidv4 } from 'uuid';
import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILED,
	ADD_INGREDIENTS,
	DELETE_INGREDIENT,
	CURRENT_BURGER,
	INCREASE_INGREDIENT,
	DECREASE_INGREDIENT,
	UPDATE_CONSTRUCTOR,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAILED	
} from '../actions/ingredients';

import { TIngredient, TBurgerIngredients, TOrder, TOrderInfo } from '../../types';
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  loaded: boolean;
  data: Array<TIngredient>;
  burgerIngredients: TBurgerIngredients;
	burgerBuns: null;
	burgerCounts: Array<string>;
  currentOrder: null | TOrder;
  createOrder: null | TOrderInfo;
	currentBurger: null | TIngredient;
  orderRequest: boolean;
  orderFailed: boolean;
  orderLoaded: boolean;
};

const initialState: TIngredientsState = {
	isLoading: false,
	hasError: false,
	loaded: false,
	data: [],
	burgerIngredients: {
		bun: null,
		restBurgerIngredients: [],
		counts: {}
	},
	burgerBuns: null,
	burgerCounts: [],
	currentOrder: null,
	currentBurger: null,
	orderRequest: false,
	orderFailed: false,
	createOrder: null,
	orderLoaded: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST: {
			return {
				...state,
				isLoading: true,
				hasError: false,
			};
		}
		case GET_PRODUCTS_SUCCESS: {
			return { ...state, 
        hasError: false, 
        data: action.items, 
        isLoading: false, 
        loaded: true };
		}
		case GET_PRODUCTS_FAILED: {
			return { ...state, 
        hasError: true, 
        isLoading: false };
		}
		case CREATE_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
				orderFailed: false,
			};
		}
		case CREATE_ORDER_SUCCESS: {
			return { ...state, 
        orderFailed: false, 
        currentOrder: action.order, 
        orderRequest: false };
		}
		case CREATE_ORDER_FAILED: {
			return { ...state, 
        orderFailed: true, 
        orderRequest: false };
		}
		case ADD_INGREDIENTS: {
			const { type } = action.item;
			if (type === 'bun') {
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						bun: action.item
					}
				}
			}
			const newItem = { 
				...action.item, 
//				productId: uuidv4() 
				productId: action.payload
			}
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					restBurgerIngredients: [...state.burgerIngredients.restBurgerIngredients, newItem]
				}
			}
		}
		case DELETE_INGREDIENT: {
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					restBurgerIngredients: [...state.burgerIngredients.restBurgerIngredients].filter(el => el.productId !== action.id)
				}
			}
		}
		case CURRENT_BURGER: {
			return {
				...state,
				currentBurger: action.item
			}
		}
		case INCREASE_INGREDIENT: {
			const { typeItem } = action;
			if (typeItem !== 'bun') {
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						counts: {
							...state.burgerIngredients.counts,
							[action.key]: (state.burgerIngredients.counts[action.key] || 0) + 1
						}
					}
				}
			} else return state;
		}
		case DECREASE_INGREDIENT: {
			const { typeItem } = action;
			if (typeItem !== 'bun') {
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						counts: {
							...state.burgerIngredients.counts,
							[action.key]: state.burgerIngredients.counts[action.key] - 1
						}
					}
				}
			} else return state;
		}
		case UPDATE_CONSTRUCTOR: {
			const restBurgerIngredients = [...state.burgerIngredients.restBurgerIngredients];
			restBurgerIngredients.splice(action.toIndex, 0, restBurgerIngredients.splice(action.fromIndex, 1)[0]);
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					restBurgerIngredients: restBurgerIngredients
				}
			}
		}
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        currentOrder: action.order,
        orderRequest: false,
        orderLoaded: true
      };
    }
    case GET_ORDER_FAILED: {
      return { 
				...state, 
				orderFailed: true, 
				orderRequest: false 
			};
    }
    case GET_USER_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      };
    }
    case GET_USER_ORDER_SUCCESS: {
      const data = action.order ? action.order : null
      return {
        ...state,
        orderFailed: false,
        currentOrder: data,
        orderRequest: false,
        orderLoaded: true
      };
    }
    case GET_USER_ORDER_FAILED: {
      return { 
				...state, 
				orderFailed: true, 
				orderRequest: false 
			};
    }		
		default: {
			return state;
		}
	}
};