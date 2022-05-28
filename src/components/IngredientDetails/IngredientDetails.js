import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ingredientdetails.module.css';
import { getIngredients } from '../../utils/api';
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader';
//import { useSelector } from 'react-redux';

function IngredientDetails() {
//	const { currentBurger } = useSelector(store => store.ingredients);

const [state, setState] = useState({
	image: '',
	name: '',
	calories: '',
	proteins: '',
	fat: '',
	carbohydrates: '',
	isLoading: false
});

let { id } = useParams();

useEffect(() => {
	setState((state) => {
		return {
			...state,
			isLoading: true,
		};
	});

	getIngredients().then((res) => {
		const currentBurger = res.data.find((el) => el._id === id)
		setState({
			image: currentBurger.image,
			name: currentBurger.name,
			calories: currentBurger.calories,
			proteins: currentBurger.proteins,
			fat: currentBurger.fat,
			carbohydrates: currentBurger.carbohydrates,
			isLoading: false,
		})
	}).catch((err) => {
		console.log(err)
		setState((state) => {
			return {
				...state,
				isLoading: false,
			}
		})
	})

}, [id]);

const { image, name, calories, proteins, fat, carbohydrates } = state;

if (state.isLoading) {
	return (<Loader />)
}

	return (
		<div className={clsx(styles.content, styles.text)}>
			<h2 className={clsx(styles.content__title, 'text', 'text_type_main-large')}>Детали ингредиента</h2>
			<div className={clsx(styles.element, 'pr-15', 'pl-15')}>
				<img src={image} alt={name} />
				<h3 className={clsx(styles.text, 'text', 'text_type_main-medium', 'mt-4', 'mb-8')}>{name}</h3>
				<ul className={clsx(styles.list)}>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
						<p className={clsx(styles.list__item_text)}>Калории, ккал</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{calories}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Белки, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{proteins}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Жиры, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{fat}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Углеводы, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default IngredientDetails;