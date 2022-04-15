import React from 'react';
import clsx from 'clsx';
import styles from './main.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';


function Main(props) {
  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      <BurgerIngredients />
      <BurgerConstructor data={props.data} />
    </main>
  );
}

export default Main;
