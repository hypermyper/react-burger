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

export type TResetPassword = {
	password: string;
	token: string;
}

type TInputName = 'name' | 'email' | 'password';

export type TUpdateUserData = {
	[fw in TInputName]: string;
}

export type TError = {
	success: boolean;
	message?: string;
}

export type TIngredientWithProductId = TIngredient & { productId: string }

export type TOrder = {
	createdAt: string;
	ingredients: Array<string>;
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
}