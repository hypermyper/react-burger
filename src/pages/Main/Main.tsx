import React from 'react';
import clsx from 'clsx';
import styles from './main.module.css';
import Loader from '../../components/Loader/Loader';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { addIngridients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { INCREASE_INGREDIENT } from '../../services/actions/ingredients';
import { TIngredient } from "../../types";

function Main() {

  const { isLoading, hasError, loaded } = useSelector( (store: any) => store.ingredients);

  const dispatch = useDispatch();

  const handleDrop = (item: TIngredient) => {
    dispatch(addIngridients(item));
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
    </main>
  );
}

export default Main;
