import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import dataPropTypes from '../../utils/types';

function Main({ data }) {
  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default Main;
