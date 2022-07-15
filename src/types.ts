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