import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from './services/store';

import { TAuthActions } from './services/actions/auth';
import { TIngredientsActions } from './services/actions/ingredients';
import { TWSActionsAuthActions } from './services/actions/ws-actions-auth';
import { TWSActionsActions } from './services/actions/ws-actions';

type TApplicationActions = TAuthActions | TIngredientsActions | TWSActionsAuthActions | TWSActionsActions;
//type TApplicationActions = TAuthActions | TIngredientsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TIngredient = {
	readonly _id: string;
	readonly name: string;
	readonly type: string;
	readonly proteins: number;
	readonly fat: number;
	readonly carbohydrates: number;
	readonly calories: number;
	readonly price: number;
	readonly image: string;
	readonly image_mobile: string;
	readonly image_large: string;
	readonly __v?: number;
}

export type TIngredientsItem = {
	item: {
			image: string;
			price: number;
			name: string;
			type: string;
			calories: number;
			fat: number;
			carbohydrates: number;
			proteins: number;
			_id: string;
	};
}

export type TLocationTemplate = {
	background?: any;
  from?: any;
}

export type TUserData = {
	email: string;
	login: string;
	name?: string;
	password: string;
}

export type TUser = {
	name: string;
	email: string;
	password?: string;
}

export type TResetPassword = {
	password: string;
	token: string;
}

type TInputName = 'name' | 'email' | 'password';

export type TUpdateUserData = {
	[fw in TInputName]: string;
}

export type TSetCookieProps = {
	expires?: number | string;
	path?: string;
} & { [extraParams: string]: string | number | boolean; }

export type TError = {
	success: boolean;
	message?: string;
}

export type TIngredientWithProductId = TIngredient & { productId?: string }

export type TOrder = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
}

export type TOrders = {
	orders: Array<TOrder>;
	total: number;
	totalToday: number;
}

export type TOrderInfo = {
	name: string;
	order: { number: number };
	success: boolean;
}

export type TCountsIngredients = {
	[name: string]: number;
}

export type TBurgerIngredients = {
	bun: null | TIngredientWithProductId;
	restBurgerIngredients: Array<TIngredientWithProductId>;
	counts: TCountsIngredients
}

export type TWSAction = {
	wsInit: string,
	wsClose: string,
	wsSendMessage: string,
	onOpen: string,
	onClose: string,
	onError: string,
	onMessage: string
}