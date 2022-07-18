import { TIngredient } from "../../types";

export type TProps = {
	item: TIngredient;
	index: number;
	handleDeleteIngredient: (item: TIngredientWithProductId) => void;
	moveElement: (
		dragIndex: number,
		hoverIndex: number
	) => void;
}

export type TIngredientWithProductId = TIngredient & { productId?: string };