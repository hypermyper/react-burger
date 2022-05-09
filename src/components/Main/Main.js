import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './main.module.css';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getBurgerIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_INGREDIENTS, INCREASE_INGREDIENT } from '../../services/actions/ingredients';

function Main() {

  const { visible, content } = useSelector(store => store.modal);
  const { isLoading, hasError, loaded } = useSelector(store => store.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [dispatch]);

  const handleDrop = (item) => {
    dispatch({
      type: ADD_INGREDIENTS,
      item
    })
    dispatch({
      type: INCREASE_INGREDIENT,
      key: item._id,
      typeItem: item.type
    })
  };    

  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      {isLoading && <Loader />}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError && loaded && 
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop} />
      </DndProvider>
      }
        {visible && <Modal>{content}</Modal>}
    </main>
  );
}

export default Main;
