import React from 'react';
import clsx from 'clsx';
import styles from './ingredientdetails.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
	const { currentBurger } = useSelector(store => store.ingredients);
	return (
		<div className={clsx(styles.content)}>
			<h2 className={clsx(styles.content__title, 'text', 'text_type_main-large')}>Детали ингредиента</h2>
			<div className={clsx(styles.element, 'pr-15', 'pl-15')}>
				<img src={currentBurger.image} alt={currentBurger.name} />
				<h3 className={clsx(styles.text, 'text', 'text_type_main-medium', 'mt-4', 'mb-8')}>{currentBurger.name}</h3>
				<ul className={clsx(styles.list)}>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
						<p className={clsx(styles.list__item_text)}>Калории, ккал</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{currentBurger.calories}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Белки, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{currentBurger.proteins}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Жиры, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{currentBurger.fat}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Углеводы, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{currentBurger.carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default IngredientDetails;