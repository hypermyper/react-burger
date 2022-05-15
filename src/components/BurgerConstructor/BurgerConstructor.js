import React, { useState, useEffect, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { API_URL } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import Modal from '../Modal/Modal';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import { createBurgerOrder, UPDATE_CONSTRUCTOR, DELETE_INGREDIENT, DECREASE_INGREDIENT } from '../../services/actions/ingredients';
import DraggableElement from '../DraggableElement/DraggableElement.js';
import { OPEN_MODAL, CLOSE_MODAL} from '../../services/actions/modal';
import { useDrop } from 'react-dnd';

function BurgerConstructor({ onDropHandler }) {

	const { bun, restBurgerIngredients } = useSelector(store => store.ingredients.burgerIngredients);
  const { currentOrder } = useSelector(store => store.ingredients);	
  const { content, visible } = useSelector(store => store.modal);

	const dispatch = useDispatch();

	const [{ canDrop, isHover }, dropTarget] = useDrop({
		accept: "ingredient",
		drop(itemId) {
			onDropHandler(itemId);
		},
		collect: monitor => ({
			isHover: monitor.isOver(),
			canDrop: monitor.canDrop(),
		})
	});  

  const priceTotal = (bun, restBurgerIngredients) => {
    const bunPrice = bun ? 2 * bun.price : 0;
    const burgerPrice = restBurgerIngredients.reduce((acc, curr) => acc += curr.price, 0);
      return bunPrice + burgerPrice;      
  }

  const handleDeleteIngredient = (item) => {
    console.log(item);
    dispatch({
      type: DELETE_INGREDIENT,
      id: item.productId
    });
    dispatch({
      type: DECREASE_INGREDIENT,
      key: item._id,
      typeItem: item.type
    });
  }

	const handleOpenModal = () => {
    const ingredientsId = restBurgerIngredients.map(el => el._id);

    dispatch(createBurgerOrder([bun._id, ...ingredientsId]));

    console.log(ingredientsId, bun._id);

    dispatch({
      type: OPEN_MODAL,
      content: <OrderDetails />
    })
   
	} 
  
  const onClose = () => {
		dispatch({
			type: CLOSE_MODAL
		});

    console.log(currentOrder);
    console.log('закрыли окно');
	}  

	const moveElement = useCallback((dragIndex, hoverIndex) => {
		dispatch({
			type: UPDATE_CONSTRUCTOR,
			toIndex: hoverIndex,
			fromIndex: dragIndex
		})
	}, [dispatch]);  

  const Rules = () => {
    return (
      <div className={clsx(styles.content, styles.content_rules, 'mt-4', 'mb-4')}>
        Выберите состав бургера
      </div>
    )
  }

  return (
    <section className={clsx(styles.section, 'pt-25', 'pl-4', 'pb-4')} ref={dropTarget}>
      <div className={clsx(styles.burger_section)}>
        {bun && <div className={clsx('pl-8', styles.bun_section)}>
          <ConstructorElement 
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            price={bun.price}
          />     
        </div>
        }
        {restBurgerIngredients.length || bun ? '' : <Rules />}
        <ul className={clsx(styles.content, 'mt-4', 'mb-4')}>
          {restBurgerIngredients.map((burger, i) => {
            return (
              <DraggableElement 
                item={burger} 
                index={i} 
                key={burger.productId} 
                handleDeleteIngredient={handleDeleteIngredient} 
                moveElement={moveElement} 
              />
            )
          })}
        </ul>    
        {bun && <div className={clsx('pl-8', styles.bun_section)}>
          <ConstructorElement 
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            price={bun.price}
          />     
        </div>
        }    
      </div>
      <div className={clsx(styles.total, 'pt-10')}>
        {bun && <>
          <span className={clsx(styles.price, 'mr-10', 'text_type_digits-medium')}>{priceTotal(bun, restBurgerIngredients)} <CurrencyIcon type="primary" /></span>
          <Button type="primary" size="large" onClick={handleOpenModal}>
            Оформить заказ
          </Button>
        </>}
        {currentOrder && visible && <Modal onClose={onClose}>{content}</Modal>}
      </div>     
    </section>
  )
}

export default BurgerConstructor;