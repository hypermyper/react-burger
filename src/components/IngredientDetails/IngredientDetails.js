import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ingredientdetails.module.css';

function IngredientDetails(props) {
	return (
		<div className={clsx(styles.content)}>
			<h2 className={clsx(styles.content__title, 'text', 'text_type_main-large')}>Детали ингредиента</h2>
			<div className={clsx(styles.element, 'pr-15', 'pl-15')}>
				<img src={props.image} alt={props.name} />
				<h3 className={clsx(styles.text, 'text', 'text_type_main-medium', 'mt-4', 'mb-8')}>{props.name}</h3>
				<ul className={clsx(styles.list)}>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
						<p className={clsx(styles.list__item_text)}>Калории, ккал</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{props.calories}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Белки, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{props.proteins}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Жиры, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{props.fat}</span>
					</li>
					<li className={clsx(styles.list__item, 'text', 'text_type_main-default', 'text_color_inactive')}>
            <p className={clsx(styles.list__item_text)}>Углеводы, г</p>
						<span className={clsx('mt-2', 'text_type_digits-default')}>{props.carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
}

export default IngredientDetails;