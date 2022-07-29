import React from 'react';
import clsx from 'clsx';
import styles from './ingredientdetails.module.css';
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader';
import { useSelector } from '../../utils/hooks';
import { TIngredient } from '../../types';

const IngredientDetails = () => {
	const { data } = useSelector( (store) => store.ingredients);
	let { id } = useParams<{ id: string }>();

	const currentBurger = data.find((el: TIngredient) => el._id === id);	

  if (!currentBurger) {
    return (<Loader />)
  }	

	const { image, name, calories, proteins, fat, carbohydrates } = currentBurger;

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