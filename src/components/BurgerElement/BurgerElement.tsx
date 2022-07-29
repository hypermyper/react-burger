import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './burgerelement.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { useDrag } from 'react-dnd';
import { TIngredientsItem } from '../../types';

const BurgerElement: FC<TIngredientsItem> = ({ item }) => { 

	const { counts, bun } = useSelector((store) => store.ingredients.burgerIngredients);
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
    //renderModal(elementCard);
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

export default BurgerElement;