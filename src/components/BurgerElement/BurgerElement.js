import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './burgerelement.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function BurgerElement({ item, renderModal }) { 

	const { counts, bun } = useSelector(store => store.ingredients.burgerIngredients);
	const count = (item.type === 'bun') && bun && bun._id === item._id ? 2 : counts[item._id] && counts[item._id];  

	const elementCard = {
		image: item.image,
		name: item.name,
		calories: item.calories,
		fat: item.fat,
		carbohydrates: item.carbohydrates,
		proteins: item.proteins,
		_id: item._id,
	}  

 	const handleClick = () => {
    console.log(elementCard);
    renderModal(elementCard);
	}

	const [{ isDrag }, dragRef] = useDrag({
		type: "ingredient",
		item,
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	});

  const border = isDrag ? { backgroundColor: '#801AB2', opacity: '0.2' } : { };

  return (
    <li className={clsx(styles.element, 'pl-4', 'pr-2')} onClick={handleClick} ref={dragRef} style={border}>
      <img src={item.image} alt={item.name} />
			{	count ?	<Counter count={count} size='small' /> : null}      
      <span className={clsx(styles.price, 'text', 'text_type_digits-default', 'pt-2', 'pb-2')}>{item.price} <CurrencyIcon type="primary" /></span>
      <p className={clsx('text', 'text_type_main-default')}>{item.name}</p>
    </li>
  )
}

BurgerElement.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		calories: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired
	}).isRequired,
	renderModal: PropTypes.func.isRequired
}

export default BurgerElement;